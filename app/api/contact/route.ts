import { NextResponse } from "next/server";
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
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Shua.dev contact <onboarding@resend.dev>",
        to: [to],
        reply_to: email,
        subject: `Portfolio contact from ${name}`,
        text: `From: ${name} <${email}>\n\n${message}`,
      }),
    });
    if (!res.ok) {
      return NextResponse.json({ error: "Delivery failed" }, { status: 502 });
    }
    return NextResponse.json({ ok: true });
  }

  // No mail provider configured (local/dev): accept and log server-side.
  console.log("[contact] message received", { name, email, message });
  return NextResponse.json({ ok: true });
}
