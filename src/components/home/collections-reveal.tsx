"use client";

import Link from "next/link";
import { Reveal } from "@/components/animations/reveal";
import { TextReveal } from "@/components/animations/text-reveal";
import { CollectionCover } from "@/components/shared/collection-media";
import { collections } from "@/data/collections";
import { formatCurrency } from "@/lib/utils";
import { getCollectionPrice } from "@/lib/utils/pricing";
import { useUIStore } from "@/stores/ui-store";

export function CollectionsReveal() {
  const setCursorLabel = useUIStore((s) => s.setCursorLabel);

  return (
    <section className="section-y bg-ivory">
      <div className="container-lux mb-14">
        <Reveal>
          <p className="font-body text-[10px] uppercase tracking-[0.4em] text-gold-deep">
            Kolleksiyalar
          </p>
        </Reveal>
        <TextReveal
          text="Bir-bir açılan eksklüziv xonça dünyaları"
          as="h2"
          className="mt-4 max-w-3xl font-display text-[clamp(2.4rem,5vw,4.2rem)] text-ink"
        />
      </div>

      <div className="space-y-12 sm:space-y-16 lg:space-y-20">
        {collections.map((collection, i) => {
          const reverse = i % 2 === 1;
          return (
            <Reveal key={collection.id} delay={0.05}>
              <div
                className={`container-lux grid min-w-0 items-center gap-6 sm:gap-8 lg:grid-cols-2 lg:gap-14 ${
                  reverse ? "lg:[&>*:first-child]:order-2" : ""
                }`}
              >
                <Link
                  href={`/collections/${collection.slug}`}
                  className="group block min-w-0 overflow-hidden shadow-lift"
                  onMouseEnter={() => setCursorLabel("Bax")}
                  onMouseLeave={() => setCursorLabel(null)}
                >
                  <CollectionCover
                    images={collection.images}
                    videos={collection.videos}
                    alt={collection.name}
                    variant="hero"
                    preferVideo={collection.videos.length > 0}
                    priority={i === 0}
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </Link>

                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                    <span className="font-body text-[10px] uppercase tracking-[0.3em] text-gold-deep">
                      {collection.category}
                    </span>
                    {collection.premium ? (
                      <span className="border border-gold/40 px-3 py-1 font-body text-[10px] uppercase tracking-[0.2em] text-gold-deep">
                        Premium
                      </span>
                    ) : null}
                  </div>
                  <h3 className="mt-3 font-display text-[clamp(1.9rem,5vw,3rem)] text-ink sm:mt-4 sm:text-5xl">
                    {collection.name}
                  </h3>
                  <p className="mt-4 max-w-md font-body text-sm leading-relaxed text-stone sm:mt-5 sm:text-base">
                    {collection.shortDescription}
                  </p>
                  <p className="mt-4 font-body text-xs text-mist sm:mt-5">
                    {collection.images.length} foto
                    {collection.videos.length > 0
                      ? ` · ${collection.videos.length} video`
                      : ""}
                  </p>
                  <p className="mt-4 font-display text-[clamp(1.6rem,4vw,1.875rem)] text-gold-deep sm:mt-6 sm:text-3xl">
                    {formatCurrency(getCollectionPrice(collection), "AZN")}-dən
                  </p>
                  <div className="mt-6 flex flex-col gap-2.5 min-[420px]:flex-row min-[420px]:flex-wrap sm:mt-8 sm:gap-3">
                    <Link
                      href={`/collections/${collection.slug}`}
                      className="inline-flex h-12 items-center justify-center px-5 font-body text-[11px] uppercase tracking-[0.16em] gradient-gold text-ink sm:px-6 sm:text-xs sm:tracking-[0.2em]"
                    >
                      Ətraflı bax
                    </Link>
                    <Link
                      href={`/booking?collection=${collection.slug}`}
                      className="inline-flex h-12 items-center justify-center border border-ink/15 px-5 font-body text-[11px] uppercase tracking-[0.16em] text-ink transition hover:border-gold sm:px-6 sm:text-xs sm:tracking-[0.2em]"
                    >
                      Rezerv et
                    </Link>
                  </div>
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>

      <Reveal className="container-lux mt-16 text-center">
        <Link
          href="/collections"
          className="inline-flex border border-ink/15 px-8 py-4 font-body text-xs uppercase tracking-[0.25em] text-ink transition hover:border-gold hover:text-gold-deep"
        >
          Bütün kolleksiyalar
        </Link>
      </Reveal>
    </section>
  );
}
