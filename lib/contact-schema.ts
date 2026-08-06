import { z } from "zod";

// Same schema on both sides of the wire (client validation + API route).
export const contactSchema = z.object({
  name: z.string().trim().min(1, "Tell me what to call you."),
  email: z
    .string()
    .trim()
    .min(1, "An email address, so I can reply.")
    .regex(/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/, "That address doesn't look complete."),
  message: z
    .string()
    .trim()
    .min(12, "A sentence or two about the work helps."),
});

export type ContactPayload = z.infer<typeof contactSchema>;
