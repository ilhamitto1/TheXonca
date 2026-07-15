"use server";

import { z } from "zod";
import type { ReservationPayload } from "@/types";

const schema = z.object({
  collectionId: z.string().min(1),
  collectionSlug: z.string().min(1),
  collectionName: z.string().min(1),
  date: z.string().min(1),
  xoncaQuantity: z.number().min(1),
  needTumba: z.boolean(),
  tumbaQuantity: z.number().min(0),
  needDelivery: z.boolean(),
  deliveryFee: z.number().min(0),
  name: z.string().min(1),
  surname: z.string().min(1),
  phone: z.string().min(6),
  email: z.string().optional(),
  restaurantName: z.string().min(1),
  deliveryAddress: z.string(),
  notes: z.string().optional(),
  unitPrice: z.number(),
  tumbaUnitPrice: z.number(),
  subtotal: z.number(),
  total: z.number(),
});

export async function submitReservation(payload: ReservationPayload) {
  const parsed = schema.safeParse(payload);
  if (!parsed.success) {
    return { success: false as const, error: "Rezervasiya məlumatları yanlışdır" };
  }

  // Prisma Reservation create when DATABASE_URL is connected.
  console.info("[reservation]", {
    ...parsed.data,
    number: `RSV-${Date.now().toString().slice(-8)}`,
    status: "PENDING",
  });

  return {
    success: true as const,
    number: `RSV-${Date.now().toString().slice(-8)}`,
  };
}
