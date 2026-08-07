import { NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";
import { contactSchema } from "@/lib/contact-schema";

const payloadSchema = contactSchema.extend({
  company: z.string().optional(), // honeypot — humans never fill this
  startedAt: z.number().optional(),
});

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = payloadSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed", issues: parsed.error.issues },
      { status: 400 },
    );
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

  // No mail provider configured (local/dev): accept and log server-side.
  console.log("[contact] message received", { name, email, message });
  return NextResponse.json({ ok: true });
}
