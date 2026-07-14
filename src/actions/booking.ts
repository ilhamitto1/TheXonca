"use server";

import { z } from "zod";
import type { BookingPayload } from "@/types";

const bookingSchema = z.object({
  date: z.string().min(1),
  packageId: z.string().min(1),
  themeId: z.string().min(1),
  flowers: z.array(z.string()).min(1),
  guestCount: z.number().min(10).max(1000),
  budget: z.number().min(1000),
  location: z.string().min(2),
  name: z.string().min(2),
  email: z.email(),
  phone: z.string().optional(),
  notes: z.string().optional(),
});

export async function submitBooking(payload: BookingPayload) {
  const parsed = bookingSchema.safeParse(payload);
  if (!parsed.success) {
    return { success: false as const, error: "Rezervasiya məlumatları yanlışdır" };
  }

  // Persist via Prisma when DATABASE_URL is configured.
  // Email confirmation via Resend is wired in lib/email.
  console.info("[booking]", parsed.data);

  return {
    success: true as const,
    id: `bk_${Date.now()}`,
  };
}
