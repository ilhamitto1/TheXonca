"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import type { Collection } from "@/types";
import {
  buildGalleryItems,
  CollectionGallery,
} from "@/components/collections/collection-gallery";
import { CollectionCover } from "@/components/shared/collection-media";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/utils";
import { getCollectionPrice } from "@/lib/utils/pricing";
import { SITE } from "@/lib/constants/site";

type Props = {
  collection: Collection;
  related: Collection[];
};

export function CollectionDetailView({ collection, related }: Props) {
  const price = getCollectionPrice(collection);
  const gallery = buildGalleryItems(
    collection.images,
    collection.videos,
    collection.name,
  );

  return (
    <div className="bg-ivory pb-[calc(7rem+env(safe-area-inset-bottom))] pt-24 sm:pb-24 sm:pt-32">
      <div className="container-lux">
        <nav className="flex flex-wrap items-center gap-x-2 gap-y-1 font-body text-[11px] text-stone">
          <Link href="/collections" className="transition hover:text-gold-deep">
            Kolleksiyalar
          </Link>
          <span className="text-mist">/</span>
          <span className="text-ink">{collection.name}</span>
        </nav>
      </div>

      <div className="container-lux mt-5 grid min-w-0 items-start gap-8 sm:mt-8 lg:mt-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-12 xl:gap-14">
        <div className="min-w-0">
          <CollectionGallery
            items={gallery}
            collectionName={collection.name}
          />
        </div>

        <aside className="min-w-0 lg:sticky lg:top-28">
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            <p className="font-body text-[10px] uppercase tracking-[0.28em] text-gold-deep sm:tracking-[0.35em]">
              {collection.category} · {collection.occasion}
            </p>
            {collection.premium ? (
              <span className="rounded-full border border-gold/40 px-2.5 py-1 font-body text-[9px] uppercase tracking-[0.18em] text-gold-deep sm:px-3 sm:text-[10px]">
                Premium
              </span>
            ) : null}
          </div>

          <h1 className="mt-3 font-display text-[clamp(2.2rem,8vw,3.8rem)] leading-[1.02] text-ink sm:mt-4">
            {collection.name}
          </h1>

          <p className="mt-3 font-body text-sm text-stone">
            {collection.availabilityLabel}
            {gallery.length > 0 ? (
              <>
                {" "}
                · {collection.images.length} foto
                {collection.videos.length > 0
                  ? ` · ${collection.videos.length} video`
                  : ""}
              </>
            ) : null}
          </p>

          <p className="mt-5 font-display text-[clamp(2rem,6vw,3rem)] text-gold-deep sm:mt-6">
            {formatCurrency(price, "AZN")}
            {collection.discountPrice ? (
              <span className="ml-2 text-xl text-mist line-through sm:ml-3 sm:text-2xl">
                {formatCurrency(collection.price, "AZN")}
              </span>
            ) : null}
          </p>

          <p className="mt-5 font-body text-[0.95rem] leading-relaxed text-stone sm:mt-6 sm:text-base">
            {collection.description}
          </p>

          <div className="mt-6 grid gap-2.5 rounded-2xl border border-ink/8 bg-pearl/80 p-4 font-body text-sm text-charcoal sm:mt-8 sm:grid-cols-2 sm:gap-3 sm:rounded-3xl sm:p-5">
            <p>Xonça: {collection.xoncaIncluded ? "Daxildir" : "—"}</p>
            <p>
              Tumba:{" "}
              {collection.tumbaIncluded
                ? "Daxildir"
                : collection.tumbaOptional
                  ? `Opsional (${formatCurrency(collection.tumbaPrice, "AZN")})`
                  : "Yoxdur"}
            </p>
            <p>
              Çatdırılma:{" "}
              {collection.deliveryAvailable
                ? `${SITE.delivery.defaultPrice} AZN`
                : "Yoxdur"}
            </p>
            <p>Hazırlıq: {collection.preparationTime}</p>
            <p className="sm:col-span-2">Ölçülər: {collection.dimensions}</p>
            <p className="sm:col-span-2">Rəng: {collection.colorTheme}</p>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-3 min-[420px]:grid-cols-2 sm:mt-8 sm:flex sm:flex-wrap">
            <Button asChild variant="gold" size="lg" magnetic={false} className="w-full sm:w-auto">
              <Link href={`/booking?collection=${collection.slug}`}>
                Rezerv et
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" magnetic={false} className="w-full sm:w-auto">
              <Link href="/collections">Bütün kolleksiyalar</Link>
            </Button>
          </div>
        </aside>
      </div>

      <div className="container-lux mt-14 grid min-w-0 gap-5 sm:mt-20 sm:gap-8 lg:grid-cols-3 lg:gap-10">
        <DetailBlock title="Daxil olan hədiyyələr">
          <ul className="space-y-2">
            {collection.includedGifts.map((g) => (
              <li key={g}>— {g}</li>
            ))}
          </ul>
        </DetailBlock>
        <DetailBlock title="Dekorasiya detalları">
          <ul className="space-y-2">
            {collection.decorationDetails.map((d) => (
              <li key={d}>— {d}</li>
            ))}
          </ul>
        </DetailBlock>
        <DetailBlock title="Material & çiçək">
          <ul className="space-y-2">
            <li>— Lent: {collection.ribbonType}</li>
            <li>— Material: {collection.premiumMaterials.join(", ")}</li>
            <li>— Çiçəklər: {collection.flowers.join(", ")}</li>
          </ul>
        </DetailBlock>
      </div>

      <div className="container-lux mt-8 grid min-w-0 gap-4 md:mt-10 md:grid-cols-2 md:gap-8">
        <div className="rounded-2xl border border-ink/8 bg-cream/60 p-5 sm:rounded-3xl sm:p-8">
          <h2 className="font-display text-xl sm:text-2xl">Rezervasiya</h2>
          <p className="mt-3 font-body text-sm leading-relaxed text-stone sm:mt-4">
            {collection.reservationInfo}
          </p>
        </div>
        <div className="rounded-2xl border border-ink/8 bg-cream/60 p-5 sm:rounded-3xl sm:p-8">
          <h2 className="font-display text-xl sm:text-2xl">Çatdırılma</h2>
          <p className="mt-3 font-body text-sm leading-relaxed text-stone sm:mt-4">
            {collection.deliveryInfo}
          </p>
        </div>
      </div>

      <div className="container-lux mt-12 max-w-3xl sm:mt-16">
        <h2 className="font-display text-2xl text-ink sm:text-3xl">FAQ</h2>
        <div className="mt-4 divide-y divide-ink/10 border-y border-ink/10 sm:mt-6">
          {collection.faq.map((item) => (
            <details key={item.q} className="group py-4 sm:py-5">
              <summary className="cursor-pointer list-none font-display text-lg text-ink marker:content-none sm:text-xl [&::-webkit-details-marker]:hidden">
                <span className="flex items-start justify-between gap-3 sm:gap-4">
                  <span className="min-w-0">{item.q}</span>
                  <span className="shrink-0 text-gold-deep transition group-open:rotate-45">
                    +
                  </span>
                </span>
              </summary>
              <p className="mt-3 font-body text-sm leading-relaxed text-stone">
                {item.a}
              </p>
            </details>
          ))}
        </div>
      </div>

      {related.length > 0 ? (
        <div className="container-lux mt-14 sm:mt-20">
          <p className="font-body text-[10px] uppercase tracking-[0.35em] text-gold-deep">
            Daha çox
          </p>
          <h2 className="mt-2 font-display text-2xl text-ink sm:text-3xl">
            Digər kolleksiyalar
          </h2>
          <div className="mt-6 grid min-w-0 gap-5 sm:mt-8 sm:grid-cols-2 sm:gap-6">
            {related.map((item) => (
              <Link
                key={item.id}
                href={`/collections/${item.slug}`}
                className="group min-w-0 overflow-hidden rounded-[1.25rem] border border-ink/8 bg-pearl shadow-soft sm:rounded-[1.5rem]"
              >
                <CollectionCover
                  images={item.images}
                  videos={item.videos}
                  alt={item.name}
                  preferVideo={item.videos.length > 0}
                  className="rounded-none"
                  sizes="(max-width: 640px) 100vw, 50vw"
                />
                <div className="p-4 sm:p-5">
                  <p className="font-body text-[10px] uppercase tracking-[0.2em] text-stone">
                    {item.category}
                  </p>
                  <p className="mt-2 font-display text-xl text-ink transition group-hover:text-gold-deep sm:text-2xl">
                    {item.name}
                  </p>
                  <p className="mt-2 font-body text-sm text-stone">
                    {item.images.length} foto
                    {item.videos.length > 0
                      ? ` · ${item.videos.length} video`
                      : ""}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      ) : null}

      <section className="container-lux mt-14 overflow-hidden rounded-[1.25rem] bg-espresso px-5 py-12 text-center text-ivory sm:mt-20 sm:rounded-[1.75rem] sm:px-16 sm:py-16">
        <h2 className="font-display text-[clamp(1.7rem,5vw,3.4rem)]">
          {collection.name} rezerv edin
        </h2>
        <p className="mx-auto mt-3 max-w-xl font-body text-sm text-mist sm:mt-4 sm:text-base">
          Tarix, say və tumba seçimini tamamlayın — WhatsApp ilə dərhal göndərin.
        </p>
        <div className="mt-7 sm:mt-8">
          <Button asChild variant="gold" size="lg" className="w-full max-w-xs sm:w-auto">
            <Link href={`/booking?collection=${collection.slug}`}>
              Rezervasiyaya başla
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}

function DetailBlock({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="min-w-0 rounded-2xl border border-ink/8 bg-pearl/50 p-5 sm:rounded-3xl sm:p-7">
      <h2 className="font-display text-xl text-ink sm:text-2xl">{title}</h2>
      <div className="mt-3 font-body text-sm leading-relaxed text-stone sm:mt-4">
        {children}
      </div>
    </section>
  );
}
