import { NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";
import { contactSchema } from "@/lib/contact-schema";
import { clientKey, isRateLimited } from "@/lib/rate-limit";

const payloadSchema = contactSchema.extend({
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
  const { name, email, message, company, startedAt } = parsed.data;

  // Honeypot filled, or the form was submitted implausibly fast: pretend success.
  if (company || (startedAt && Date.now() - startedAt < 2500)) {
    return NextResponse.json({ ok: true });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  if (apiKey && to) {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: "Shua.dev contact <onboarding@resend.dev>",
      to: [to],
      replyTo: email,
      subject: `Portfolio contact from ${name}`,
      // Plain text, not html: name/email/message are visitor-submitted,
      // and interpolating them into an HTML body would let a submission
      // inject markup into the email that lands in your inbox.
      text: `From: ${name} <${email}>\n\n${message}`,
    });
    if (error) {
      console.error("[contact] resend error", error);
      return NextResponse.json({ error: "Delivery failed" }, { status: 502 });
    }
    return NextResponse.json({ ok: true });
  }

  // No mail provider configured (local/dev): accept. Deliberately does not log
  // the message — that would put visitor PII in logs if prod ever loses the key.
  console.log("[contact] message received (no mail provider configured)");
  return NextResponse.json({ ok: true });
}
