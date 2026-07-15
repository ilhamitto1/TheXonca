import type { Metadata } from "next";
import { Suspense } from "react";
import { ReservationWizard } from "@/components/booking/reservation-wizard";

export const metadata: Metadata = {
  title: "Rezervasiya",
  description:
    "The Xonca kolleksiyasını seçin, tarix və tumba seçimini edin — WhatsApp ilə rezerv edin.",
};

export default function BookingPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-[50vh] items-center justify-center pt-36 font-body text-stone">
          Rezervasiya yüklənir...
        </div>
      }
    >
      <ReservationWizard />
    </Suspense>
  );
}
