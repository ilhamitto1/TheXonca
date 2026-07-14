import type { Metadata } from "next";
import { GalleryPage } from "@/components/gallery/gallery-page";

export const metadata: Metadata = {
  title: "Qalereya",
  description:
    "The Xonca-nın kinematik toy atmosferləri, çiçəkləri və masa dizaynlarını kəşf edin.",
};

export default function Page() {
  return <GalleryPage />;
}
