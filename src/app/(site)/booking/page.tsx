import type { Metadata } from "next";
import { BookingWizard } from "@/components/booking/booking-wizard";

export const metadata: Metadata = {
  title: "Rezerv et",
  description:
    "Şəxsi məsləhətləşmə rezerv edin və The Xonca ilə toy atmosferinizi dizayn edin.",
};

export default function BookingPage() {
  return <BookingWizard />;
}
