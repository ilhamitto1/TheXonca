import { SITE } from "@/lib/constants/site";
import type { ReservationPayload } from "@/types";
import { formatCurrency } from "@/lib/utils";

export function buildReservationWhatsAppMessage(
  payload: ReservationPayload,
): string {
  const lines = [
    "Salam.",
    "",
    "Mən aşağıdakı sifarişi rezerv etmək istəyirəm.",
    "",
    "Kolleksiya:",
    payload.collectionName,
    "",
    "Tarix:",
    payload.date,
    "",
    "Xonça sayı:",
    String(payload.xoncaQuantity),
    "",
    "Tumba:",
    payload.needTumba ? "Bəli" : "Xeyr",
    "",
    "Tumba sayı:",
    payload.needTumba ? String(payload.tumbaQuantity) : "0",
    "",
    "Çatdırılma:",
    payload.needDelivery ? "Bəli" : "Xeyr",
    "",
    "Çatdırılma ünvanı:",
    payload.needDelivery ? payload.deliveryAddress || "—" : "—",
    "",
    "Restoran:",
    payload.restaurantName || "—",
    "",
    "Ad Soyad:",
    `${payload.name} ${payload.surname}`.trim(),
    "",
    "Telefon:",
    payload.phone,
    "",
    "Qeyd:",
    payload.notes?.trim() || "—",
    "",
    "Ümumi məbləğ:",
    formatCurrency(payload.total, "AZN"),
  ];

  return lines.join("\n");
}

export function openReservationWhatsApp(payload: ReservationPayload) {
  const text = buildReservationWhatsAppMessage(payload);
  const url = `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(text)}`;
  if (typeof window !== "undefined") {
    window.open(url, "_blank", "noopener,noreferrer");
  }
  return url;
}
