"use client";

import Link from "next/link";
import { Reveal } from "@/components/animations/reveal";
import { TextReveal } from "@/components/animations/text-reveal";
import { CollectionPlaceholder } from "@/components/shared/collection-placeholder";
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

      <div className="space-y-20">
        {collections.slice(0, 4).map((collection, i) => {
          const reverse = i % 2 === 1;
          return (
            <Reveal key={collection.id} delay={0.05}>
              <div
                className={`container-lux grid items-center gap-8 lg:grid-cols-2 lg:gap-14 ${
                  reverse ? "lg:[&>*:first-child]:order-2" : ""
                }`}
              >
                <Link
                  href={`/collections/${collection.slug}`}
                  className="group block overflow-hidden shadow-lift"
                  onMouseEnter={() => setCursorLabel("Bax")}
                  onMouseLeave={() => setCursorLabel(null)}
                >
                  <CollectionPlaceholder
                    title={collection.name}
                    index={i}
                    variant="hero"
                  />
                </Link>

                <div>
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="font-body text-[10px] uppercase tracking-[0.3em] text-gold-deep">
                      {collection.category}
                    </span>
                    {collection.premium ? (
                      <span className="border border-gold/40 px-3 py-1 font-body text-[10px] uppercase tracking-[0.2em] text-gold-deep">
                        Premium
                      </span>
                    ) : null}
                  </div>
                  <h3 className="mt-4 font-display text-4xl text-ink sm:text-5xl">
                    {collection.name}
                  </h3>
                  <p className="mt-5 max-w-md font-body text-base leading-relaxed text-stone">
                    {collection.shortDescription}
                  </p>
                  <p className="mt-6 font-display text-3xl text-gold-deep">
                    {formatCurrency(getCollectionPrice(collection), "AZN")}-dən
                  </p>
                  <div className="mt-8 flex flex-wrap gap-3">
                    <Link
                      href={`/collections/${collection.slug}`}
                      className="inline-flex h-12 items-center px-6 font-body text-xs uppercase tracking-[0.2em] gradient-gold text-ink"
                    >
                      Ətraflı bax
                    </Link>
                    <Link
                      href={`/booking?collection=${collection.slug}`}
                      className="inline-flex h-12 items-center border border-ink/15 px-6 font-body text-xs uppercase tracking-[0.2em] text-ink transition hover:border-gold"
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
