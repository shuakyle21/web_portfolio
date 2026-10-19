import { z } from "zod";

// Same schema on both sides of the wire (client validation + API route).
export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Tell me what to call you.")
    // Capped and collapsed to a single line because `name` is interpolated
    // into the outgoing email's Subject, which is a header: a newline in a
    // header is a mail-injection primitive, not a cosmetic problem.
    .max(80, "That name is longer than a name.")
    .transform((s) => s.replace(/\s+/g, " ")),
  email: z
    .string()
    .trim()
    .min(1, "An email address, so I can reply.")
    // 254 is the RFC 5321 maximum for an address.
    .max(254, "That address is too long.")
    .regex(/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/, "That address doesn't look complete."),
  message: z
    .string()
    .trim()
    .min(12, "A sentence or two about the work helps.")
    // The cap is the abuse control: it bounds how much one request can put in
    // the inbox, same reasoning as the comment limit in rating-schema.ts.
    .max(2000, "That's more than a few paragraphs — email me instead."),
});

export type ContactPayload = z.infer<typeof contactSchema>;
