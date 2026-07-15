"use client";

import Link from "next/link";
import { collections } from "@/data/collections";
import { formatCurrency } from "@/lib/utils";
import { getCollectionPrice } from "@/lib/utils/pricing";

export default function AdminCollectionsPage() {
  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="font-body text-[10px] uppercase tracking-[0.35em] text-gold-soft">
            CMS
          </p>
          <h1 className="mt-2 font-display text-4xl">Kolleksiyalar</h1>
          <p className="mt-3 max-w-2xl text-sm text-mist">
            Şəkil/video yükləmə, qiymət, hədiyyə, dekorasiya, SEO və mövcudluq
            kalendarı — Prisma bağlananda tam CRUD aktiv olacaq.
          </p>
        </div>
        <button
          type="button"
          className="h-11 px-5 font-body text-xs uppercase tracking-[0.2em] gradient-gold text-ink"
          onClick={() =>
            alert("Yeni kolleksiya formu DATABASE_URL ilə aktivləşəcək.")
          }
        >
          + Yeni kolleksiya
        </button>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-ivory/10">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-charcoal/80 text-mist">
            <tr>
              <th className="px-4 py-3 font-body text-xs uppercase tracking-[0.15em]">
                Ad
              </th>
              <th className="px-4 py-3 font-body text-xs uppercase tracking-[0.15em]">
                Kateqoriya
              </th>
              <th className="px-4 py-3 font-body text-xs uppercase tracking-[0.15em]">
                Qiymət
              </th>
              <th className="px-4 py-3 font-body text-xs uppercase tracking-[0.15em]">
                Status
              </th>
              <th className="px-4 py-3 font-body text-xs uppercase tracking-[0.15em]">
                Tumba
              </th>
              <th className="px-4 py-3 font-body text-xs uppercase tracking-[0.15em]">
                Əməliyyat
              </th>
            </tr>
          </thead>
          <tbody>
            {collections.map((c) => (
              <tr key={c.id} className="border-t border-ivory/5">
                <td className="px-4 py-4">
                  <p className="font-display text-lg">{c.name}</p>
                  <p className="text-xs text-mist">{c.slug}</p>
                </td>
                <td className="px-4 py-4 text-mist">{c.category}</td>
                <td className="px-4 py-4 text-gold-soft">
                  {formatCurrency(getCollectionPrice(c), "AZN")}
                </td>
                <td className="px-4 py-4">{c.availabilityLabel}</td>
                <td className="px-4 py-4 text-mist">
                  {c.tumbaIncluded
                    ? "Daxildir"
                    : c.tumbaOptional
                      ? "Opsional"
                      : "Yox"}
                </td>
                <td className="px-4 py-4">
                  <Link
                    href={`/collections/${c.slug}`}
                    className="text-xs uppercase tracking-[0.15em] text-gold-soft"
                  >
                    Bax
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
