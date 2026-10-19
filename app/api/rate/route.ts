import { NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";
import { ratingSchema } from "@/lib/rating-schema";
import { clientKey, isRateLimited } from "@/lib/rate-limit";

const payloadSchema = ratingSchema.extend({
  company: z.string().optional(), // honeypot — humans never fill this
  startedAt: z.number().optional(),
});

export async function POST(req: Request) {
  // Before the body is read: cheapest rejection, and the only control here that
  // a script cannot opt out of. `company` and `startedAt` below are both
  // optional and client-supplied, so omitting them skips that whole check.
  if (isRateLimited(clientKey(req))) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = payloadSchema.safeParse(body);
  if (!parsed.success) {
    // No `issues` echoed back: the client validates with the same schema and
    // only checks res.ok, so returning them describes the schema to a probe
    // and helps nobody legitimate.
    return NextResponse.json({ error: "Validation failed" }, { status: 400 });
  }
  const { rating, comment, company, startedAt } = parsed.data;

  // Honeypot filled, or submitted implausibly fast: pretend success so a
  // false positive never surfaces to a human.
  if (company || (startedAt && Date.now() - startedAt < 2500)) {
    return NextResponse.json({ ok: true });
  }

  const apiKey = process.env.RESEND_API_KEY;
  // Deliberately its own variable with NO fallback to CONTACT_TO_EMAIL.
  // Locally it is unset, so the console path below runs and iterating on the
  // widget can't mail anyone. In production, unsetting it in Vercel is a
  // one-click kill switch for ratings that leaves the contact form working —
  // which matters because both routes share one Resend quota.
  const to = process.env.RATING_TO_EMAIL;
  if (apiKey && to) {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: "Shua.dev ratings <onboarding@resend.dev>",
      to: [to],
      // `rating` is a zod-constrained integer, so it is safe in a header.
      // The visitor's comment stays out of the subject: a newline in a header
      // is a mail-injection primitive. Body is plain text for the same reason
      // the contact route avoids html — visitor input is interpolated in.
      subject: `Portfolio rating: ${rating}/5`,
      text: comment
        ? `Rating: ${rating}/5\n\n"${comment}"\n\n— shua.dev`
        : `Rating: ${rating}/5\n\n(no comment left)\n\n— shua.dev`,
    });
    if (error) {
      console.error("[rate] resend error", error);
      return NextResponse.json({ error: "Delivery failed" }, { status: 502 });
    }
    return NextResponse.json({ ok: true });
  }

  // No mail provider configured (local/dev): accept. Deliberately does not log
  // the comment — that would put visitor text in logs if prod ever loses the key.
  console.log("[rate] rating received (no mail provider configured)");
  return NextResponse.json({ ok: true });
}
