"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Reveal } from "@/components/animations/reveal";
import { TextReveal } from "@/components/animations/text-reveal";
import { CollectionPlaceholder } from "@/components/shared/collection-placeholder";
import { Input } from "@/components/ui/input";
import {
  collectionCategories,
  collections,
} from "@/data/collections";
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
    <div className="bg-ivory pb-24">
      <section className="px-[var(--xonca-gutter)] pt-36 pb-10">
        <div className="container-lux">
          <Reveal>
            <p className="font-body text-[10px] uppercase tracking-[0.4em] text-gold-deep">
              Kolleksiyalar
            </p>
          </Reveal>
          <TextReveal
            text="Premium xonça dünyaları"
            as="h1"
            className="mt-4 font-display text-[clamp(2.8rem,7vw,5rem)] text-ink"
          />
          <Reveal delay={0.1}>
            <p className="mt-5 max-w-2xl font-body text-base text-stone">
              Şəkillər tezliklə əlavə olunacaq. İndi belə hər kolleksiya lüks
              placeholder və tam məlumatla təqdim olunur.
            </p>
          </Reveal>

          <div className="mt-10 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-wrap gap-2">
              {collectionCategories.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setCategory(c)}
                  className={`px-4 py-2 font-body text-[11px] uppercase tracking-[0.2em] ${
                    category === c
                      ? "bg-ink text-ivory"
                      : "border border-ink/10 text-stone"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Kolleksiya axtar..."
              className="max-w-sm"
            />
          </div>
        </div>
      </section>

      <section className="container-lux grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {filtered.map((collection, i) => (
          <Reveal key={collection.id} delay={(i % 3) * 0.06}>
            <article className="group flex h-full flex-col border border-ink/8 bg-pearl transition hover:shadow-lift">
              <Link href={`/collections/${collection.slug}`} className="block">
                <CollectionPlaceholder
                  title={collection.name}
                  index={i}
                  variant="card"
                />
              </Link>
              <div className="flex flex-1 flex-col p-6">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-body text-[10px] uppercase tracking-[0.22em] text-stone">
                    {collection.category}
                  </span>
                  {collection.premium ? (
                    <span className="border border-gold/40 px-2 py-0.5 font-body text-[9px] uppercase tracking-[0.18em] text-gold-deep">
                      Premium
                    </span>
                  ) : null}
                  <span className="ml-auto font-body text-[10px] uppercase tracking-[0.15em] text-stone">
                    {collection.availabilityLabel}
                  </span>
                </div>
                <h2 className="mt-3 font-display text-2xl text-ink">
                  <Link href={`/collections/${collection.slug}`}>
                    {collection.name}
                  </Link>
                </h2>
                <p className="mt-2 font-body text-sm text-stone">
                  {collection.shortDescription}
                </p>
                <p className="mt-4 font-display text-2xl text-gold-deep">
                  {formatCurrency(getCollectionPrice(collection), "AZN")}-dən
                </p>
                <ul className="mt-4 space-y-1 font-body text-xs text-charcoal">
                  <li>• Hədiyyələr: {collection.includedGifts.slice(0, 2).join(", ")}</li>
                  <li>• Xonça: {collection.xoncaIncluded ? "Daxildir" : "—"}</li>
                  <li>
                    • Tumba:{" "}
                    {collection.tumbaIncluded
                      ? "Daxildir"
                      : collection.tumbaOptional
                        ? "Opsional"
                        : "Yoxdur"}
                  </li>
                  <li>
                    • Çatdırılma:{" "}
                    {collection.deliveryAvailable ? "Mövcuddur" : "Yoxdur"}
                  </li>
                  <li>• Hazırlıq: {collection.preparationTime}</li>
                </ul>
                <div className="mt-6 flex gap-3">
                  <Link
                    href={`/collections/${collection.slug}`}
                    className="inline-flex h-11 flex-1 items-center justify-center border border-ink/15 font-body text-[11px] uppercase tracking-[0.18em]"
                  >
                    Ətraflı
                  </Link>
                  <Link
                    href={`/booking?collection=${collection.slug}`}
                    className="inline-flex h-11 flex-1 items-center justify-center gradient-gold font-body text-[11px] uppercase tracking-[0.18em] text-ink"
                  >
                    Rezerv et
                  </Link>
                </div>
              </div>
            </article>
          </Reveal>
        ))}
      </section>
    </div>
  );
}
