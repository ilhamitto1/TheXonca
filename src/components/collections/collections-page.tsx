"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { CollectionPlaceholder } from "@/components/shared/collection-placeholder";
import { Input } from "@/components/ui/input";
import { collectionCategories, collections } from "@/data/collections";
import { formatCurrency } from "@/lib/utils";
import { getCollectionPrice } from "@/lib/utils/pricing";

export function CollectionsPage() {
  const [category, setCategory] = useState("Hamısı");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    return collections.filter((c) => {
      const byCat = category === "Hamısı" || c.category === category;
      const byQuery =
        !query ||
        c.name.toLowerCase().includes(query.toLowerCase()) ||
        c.shortDescription.toLowerCase().includes(query.toLowerCase());
      return byCat && byQuery;
    });
  }, [category, query]);

  return (
    <div className="bg-ivory pb-28 sm:pb-24">
      <section className="px-[var(--xonca-gutter)] pt-28 pb-6 sm:pt-36 sm:pb-10">
        <div className="container-lux">
          <p className="font-body text-[10px] uppercase tracking-[0.4em] text-gold-deep">
            Kolleksiyalar
          </p>
          <h1 className="mt-3 font-display text-[clamp(2.4rem,7vw,4.8rem)] leading-[1.05] text-ink">
            Premium xonça seçimi
          </h1>
          <p className="mt-4 max-w-xl font-body text-base text-stone">
            Beğəndiyinizi seçin → rezervasiya edin. Hər kart aydın qiymət və
            sadə məlumat göstərir.
          </p>

          <div className="sticky top-[4.5rem] z-20 -mx-1 mt-8 space-y-3 bg-ivory/95 py-3 backdrop-blur-md sm:static sm:mx-0 sm:bg-transparent sm:py-0 sm:backdrop-blur-0">
            <div className="flex gap-2 overflow-x-auto px-1 pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {collectionCategories.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setCategory(c)}
                  className={`h-10 shrink-0 rounded-full px-4 font-body text-[11px] uppercase tracking-[0.16em] transition ${
                    category === c
                      ? "bg-ink text-ivory"
                      : "border border-ink/10 bg-pearl text-stone"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Axtarış: Imperial, Ivory..."
              className="h-12 max-w-md rounded-2xl text-base"
            />
          </div>
        </div>
      </section>

      <section className="container-lux grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {filtered.length === 0 ? (
          <p className="col-span-full py-16 text-center font-body text-stone">
            Nəticə tapılmadı. Filtri dəyişin və ya axtarışı silin.
          </p>
        ) : (
          filtered.map((collection, i) => (
            <article
              key={collection.id}
              className="flex h-full flex-col overflow-hidden rounded-3xl border border-ink/8 bg-pearl shadow-soft"
            >
              <Link
                href={`/collections/${collection.slug}`}
                className="block overflow-hidden"
              >
                <CollectionPlaceholder
                  title={collection.name}
                  index={i}
                  variant="card"
                />
              </Link>
              <div className="flex flex-1 flex-col p-5">
                <div className="flex items-center gap-2">
                  <span className="font-body text-[10px] uppercase tracking-[0.2em] text-stone">
                    {collection.category}
                  </span>
                  {collection.premium ? (
                    <span className="rounded-full border border-gold/40 px-2 py-0.5 font-body text-[9px] uppercase tracking-[0.15em] text-gold-deep">
                      Premium
                    </span>
                  ) : null}
                </div>
                <h2 className="mt-2 font-display text-2xl text-ink">
                  <Link href={`/collections/${collection.slug}`}>
                    {collection.name}
                  </Link>
                </h2>
                <p className="mt-2 line-clamp-2 font-body text-sm text-stone">
                  {collection.shortDescription}
                </p>
                <p className="mt-4 font-display text-2xl text-gold-deep">
                  {formatCurrency(getCollectionPrice(collection), "AZN")}
                </p>
                <p className="mt-2 font-body text-xs text-mist">
                  {collection.tumbaIncluded
                    ? "Tumba daxildir"
                    : collection.tumbaOptional
                      ? "Tumba opsional"
                      : "Yalnız xonça"}{" "}
                  · {collection.preparationTime}
                </p>
                <div className="mt-auto grid grid-cols-2 gap-2 pt-5">
                  <Link
                    href={`/collections/${collection.slug}`}
                    className="flex h-12 items-center justify-center rounded-2xl border border-ink/15 font-body text-[11px] uppercase tracking-[0.14em]"
                  >
                    Ətraflı
                  </Link>
                  <Link
                    href={`/booking?collection=${collection.slug}`}
                    className="flex h-12 items-center justify-center rounded-2xl gradient-gold font-body text-[11px] uppercase tracking-[0.14em] text-ink"
                  >
                    Rezerv et
                  </Link>
                </div>
              </div>
            </article>
          ))
        )}
      </section>
    </div>
  );
}
