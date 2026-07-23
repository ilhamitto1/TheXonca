"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { CollectionCover } from "@/components/shared/collection-media";
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
    <div className="bg-ivory pb-[calc(7rem+env(safe-area-inset-bottom))] sm:pb-24">
      <section className="pt-28 pb-5 sm:pt-36 sm:pb-10">
        <div className="container-lux">
          <p className="font-body text-[10px] uppercase tracking-[0.4em] text-gold-deep">
            Kolleksiyalar
          </p>
          <h1 className="mt-3 font-display text-[clamp(2.1rem,8vw,4.8rem)] leading-[1.05] text-ink">
            Hər kolleksiya ayrıca dünya
          </h1>
          <p className="mt-3 max-w-xl font-body text-sm text-stone sm:mt-4 sm:text-base">
            Birini seçin — yalnız həmin kolleksiyanın foto və videolarını tam
            görəcəksiniz.
          </p>

          <div className="sticky top-[4.5rem] z-20 mt-6 space-y-3 bg-ivory/95 py-3 backdrop-blur-md sm:static sm:mt-8 sm:bg-transparent sm:py-0 sm:backdrop-blur-0">
            <div className="touch-scroll-x">
              {collectionCategories.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setCategory(c)}
                  className={`h-10 shrink-0 snap-start rounded-full px-4 font-body text-[11px] uppercase tracking-[0.16em] transition ${
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
              placeholder="Axtarış: Elizabeth, Şahzadə..."
              className="h-12 w-full max-w-md rounded-2xl text-base"
            />
          </div>
        </div>
      </section>

      <section className="container-lux space-y-6 sm:space-y-10">
        {filtered.length === 0 ? (
          <p className="py-16 text-center font-body text-stone">
            Nəticə tapılmadı. Filtri dəyişin və ya axtarışı silin.
          </p>
        ) : (
          filtered.map((collection, i) => (
            <article
              key={collection.id}
              className="min-w-0 overflow-hidden rounded-[1.25rem] border border-ink/8 bg-pearl shadow-soft sm:rounded-[1.75rem] lg:grid lg:grid-cols-2"
            >
              <Link
                href={`/collections/${collection.slug}`}
                className="group relative block min-w-0 overflow-hidden"
              >
                <CollectionCover
                  images={collection.images}
                  videos={collection.videos}
                  alt={collection.name}
                  variant="hero"
                  preferVideo={collection.videos.length > 0}
                  priority={i === 0}
                  className="rounded-none !max-h-[min(68svh,34rem)] lg:!max-h-none lg:min-h-[26rem] xl:min-h-[28rem]"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                {collection.videos.length > 0 ? (
                  <span className="absolute left-3 top-3 rounded-full bg-ink/55 px-2.5 py-1 font-body text-[9px] uppercase tracking-[0.16em] text-ivory backdrop-blur-md sm:left-4 sm:top-4 sm:px-3 sm:py-1.5 sm:text-[10px]">
                    {collection.videos.length} video
                  </span>
                ) : null}
              </Link>

              <div className="flex min-w-0 flex-col justify-center p-5 sm:p-8 lg:p-10">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-body text-[10px] uppercase tracking-[0.2em] text-stone">
                    {collection.category}
                  </span>
                  {collection.premium ? (
                    <span className="rounded-full border border-gold/40 px-2 py-0.5 font-body text-[9px] uppercase tracking-[0.15em] text-gold-deep">
                      Premium
                    </span>
                  ) : null}
                </div>

                <h2 className="mt-3 font-display text-[clamp(1.75rem,5vw,2.8rem)] text-ink">
                  <Link
                    href={`/collections/${collection.slug}`}
                    className="transition hover:text-gold-deep"
                  >
                    {collection.name}
                  </Link>
                </h2>

                <p className="mt-3 max-w-md font-body text-sm leading-relaxed text-stone sm:mt-4 sm:text-base">
                  {collection.shortDescription}
                </p>

                <p className="mt-4 font-body text-xs text-mist sm:mt-5">
                  {collection.images.length} foto
                  {collection.videos.length > 0
                    ? ` · ${collection.videos.length} video`
                    : ""}{" "}
                  · {collection.preparationTime}
                </p>

                <p className="mt-4 font-display text-[clamp(1.75rem,4vw,1.875rem)] text-gold-deep sm:mt-5 sm:text-3xl">
                  {formatCurrency(getCollectionPrice(collection), "AZN")}
                </p>

                <div className="mt-6 grid grid-cols-1 gap-2.5 min-[400px]:grid-cols-2 sm:mt-8 sm:max-w-md sm:gap-3">
                  <Link
                    href={`/collections/${collection.slug}`}
                    className="flex h-12 items-center justify-center rounded-2xl border border-ink/15 px-3 text-center font-body text-[10px] uppercase tracking-[0.12em] transition hover:border-gold sm:text-[11px] sm:tracking-[0.14em]"
                  >
                    Kolleksiyaya bax
                  </Link>
                  <Link
                    href={`/booking?collection=${collection.slug}`}
                    className="flex h-12 items-center justify-center rounded-2xl gradient-gold px-3 text-center font-body text-[10px] uppercase tracking-[0.12em] text-ink sm:text-[11px] sm:tracking-[0.14em]"
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
