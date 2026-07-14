import type { Metadata } from "next";
import { ProductsPage } from "@/components/products/products-page";

export const metadata: Metadata = {
  title: "Kolleksiyalar",
  description:
    "The Xonca-nın lüks çiçək məhsulları, quraşdırmaları və masa dizayn kolleksiyaları.",
};

export default function Page() {
  return <ProductsPage />;
}
