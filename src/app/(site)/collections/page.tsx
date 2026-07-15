import type { Metadata } from "next";
import { CollectionsPage } from "@/components/collections/collections-page";

export const metadata: Metadata = {
  title: "Kolleksiyalar",
  description:
    "The Xonca premium xonça və tumba kolleksiyalarını kəşf edin və rezerv edin.",
};

export default function Page() {
  return <CollectionsPage />;
}
