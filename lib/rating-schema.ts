import { z } from "zod";

// Same schema on both sides of the wire, mirroring lib/contact-schema.ts.
export const ratingSchema = z.object({
  rating: z.number().int().min(1).max(5),
  // One line, not an essay. The cap is the meaningful abuse control: it bounds
  // how much a single request can put in the inbox. Collapsed to one line
  // server-side too, so a pasted block can't stretch the email.
  comment: z
    .string()
    .trim()
    .max(140, "Keep it to a line.")
    .transform((s) => s.replace(/\s+/g, " "))
    .optional(),
});

export type RatingPayload = z.infer<typeof ratingSchema>;
