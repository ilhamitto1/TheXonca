import type { Metadata } from "next";
import { ServicesPage } from "@/components/services/services-page";

export const metadata: Metadata = {
  title: "Xidmətlər",
  description:
    "The Xonca ilə mərasim memarlığı, qəbul couture, çiçək atelyesi və tam təcrübə dizaynı.",
};

export default function Page() {
  return <ServicesPage />;
}
