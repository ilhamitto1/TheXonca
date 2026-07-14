import type { Metadata } from "next";
import { ContactPage } from "@/components/contact/contact-page";

export const metadata: Metadata = {
  title: "Əlaqə",
  description:
    "Şəxsi məsləhətləşmə və sorğular üçün The Xonca atelyesi ilə əlaqə saxlayın.",
};

export default function Page() {
  return <ContactPage />;
}
