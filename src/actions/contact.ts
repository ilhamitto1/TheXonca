"use server";

import { z } from "zod";
import type { ContactPayload } from "@/types";

const contactSchema = z.object({
  name: z.string().min(2),
  email: z.email(),
  subject: z.string().min(2),
  message: z.string().min(10),
});

export async function submitContact(payload: ContactPayload) {
  const parsed = contactSchema.safeParse(payload);
  if (!parsed.success) {
    return { success: false as const, error: "Mesaj yanlışdır" };
  }

  console.info("[contact]", parsed.data);

  return { success: true as const };
}
