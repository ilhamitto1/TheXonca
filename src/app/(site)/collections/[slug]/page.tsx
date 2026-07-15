import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  collections,
  getCollectionBySlug,
  getRelatedCollections,
} from "@/data/collections";
import { CollectionPlaceholder } from "@/components/shared/collection-placeholder";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/utils";
import { getCollectionPrice } from "@/lib/utils/pricing";
import { SITE } from "@/lib/constants/site";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return collections.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const collection = getCollectionBySlug(slug);
  if (!collection) return { title: "Kolleksiya" };
  return {
    title: collection.seoTitle || collection.name,
    description: collection.seoDescription || collection.shortDescription,
  };
}

export default async function CollectionDetailPage({ params }: Props) {
  const { slug } = await params;
  const collection = getCollectionBySlug(slug);
  if (!collection) notFound();

  const related = getRelatedCollections(slug);
  const price = getCollectionPrice(collection);

  return (
    <div className="bg-ivory pb-24 pt-36">
      <div className="container-lux grid gap-12 lg:grid-cols-2">
        <div className="space-y-4">
          <div className="overflow-hidden shadow-lift">
            <CollectionPlaceholder
              title={collection.name}
              variant="hero"
              index={0}
            />
          </div>
          <div className="grid grid-cols-3 gap-3">
            {[1, 2, 3].map((n) => (
              <CollectionPlaceholder
                key={n}
                title={`${collection.name} ${n}`}
                variant="gallery"
                index={n}
                className="aspect-square"
              />
            ))}
          </div>
        </div>

        <div>
          <div className="flex flex-wrap items-center gap-3">
            <p className="font-body text-[10px] uppercase tracking-[0.35em] text-gold-deep">
              {collection.category} · {collection.occasion}
            </p>
            {collection.premium ? (
              <span className="border border-gold/40 px-3 py-1 font-body text-[10px] uppercase tracking-[0.2em] text-gold-deep">
                Premium
              </span>
            ) : null}
          </div>
          <h1 className="mt-4 font-display text-5xl text-ink">{collection.name}</h1>
          <p className="mt-4 font-body text-stone">{collection.availabilityLabel}</p>
          <p className="mt-6 font-display text-4xl text-gold-deep">
            {formatCurrency(price, "AZN")}
            {collection.discountPrice ? (
              <span className="ml-3 text-2xl text-mist line-through">
                {formatCurrency(collection.price, "AZN")}
              </span>
            ) : null}
          </p>
          <p className="mt-6 font-body text-base leading-relaxed text-stone">
            {collection.description}
          </p>

          <div className="mt-8 grid gap-3 font-body text-sm text-charcoal sm:grid-cols-2">
            <p>• Xonça: {collection.xoncaIncluded ? "Daxildir" : "—"}</p>
            <p>
              • Tumba:{" "}
              {collection.tumbaIncluded
                ? "Daxildir"
                : collection.tumbaOptional
                  ? `Opsional (${formatCurrency(collection.tumbaPrice, "AZN")})`
                  : "Yoxdur"}
            </p>
            <p>
              • Çatdırılma:{" "}
              {collection.deliveryAvailable
                ? `Mövcuddur (${SITE.delivery.defaultPrice} AZN)`
                : "Yoxdur"}
            </p>
            <p>• Hazırlıq: {collection.preparationTime}</p>
            <p>• Ölçülər: {collection.dimensions}</p>
            <p>• Rəng: {collection.colorTheme}</p>
          </div>

          <div className="mt-10 flex flex-wrap gap-4">
            <Button asChild variant="gold" size="lg">
              <Link href={`/booking?collection=${collection.slug}`}>
                Rezerv et
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/collections">Kolleksiyalara qayıt</Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="container-lux mt-20 grid gap-10 lg:grid-cols-3">
        <section>
          <h2 className="font-display text-2xl text-ink">Daxil olan hədiyyələr</h2>
          <ul className="mt-4 space-y-2 font-body text-sm text-stone">
            {collection.includedGifts.map((g) => (
              <li key={g}>— {g}</li>
            ))}
          </ul>
        </section>
        <section>
          <h2 className="font-display text-2xl text-ink">Dekorasiya detalları</h2>
          <ul className="mt-4 space-y-2 font-body text-sm text-stone">
            {collection.decorationDetails.map((d) => (
              <li key={d}>— {d}</li>
            ))}
          </ul>
        </section>
        <section>
          <h2 className="font-display text-2xl text-ink">Material & çiçək</h2>
          <ul className="mt-4 space-y-2 font-body text-sm text-stone">
            <li>— Lent: {collection.ribbonType}</li>
            <li>— Material: {collection.premiumMaterials.join(", ")}</li>
            <li>— Çiçəklər: {collection.flowers.join(", ")}</li>
          </ul>
        </section>
      </div>

      <div className="container-lux mt-16 grid gap-8 md:grid-cols-2">
        <div className="border border-ink/8 bg-cream/50 p-8">
          <h2 className="font-display text-2xl">Rezervasiya məlumatı</h2>
          <p className="mt-4 font-body text-sm leading-relaxed text-stone">
            {collection.reservationInfo}
          </p>
        </div>
        <div className="border border-ink/8 bg-cream/50 p-8">
          <h2 className="font-display text-2xl">Çatdırılma məlumatı</h2>
          <p className="mt-4 font-body text-sm leading-relaxed text-stone">
            {collection.deliveryInfo}
          </p>
        </div>
      </div>

      <div className="container-lux mt-16 max-w-3xl">
        <h2 className="font-display text-3xl text-ink">FAQ</h2>
        <div className="mt-6 divide-y divide-ink/10 border-y border-ink/10">
          {collection.faq.map((item) => (
            <details key={item.q} className="py-5">
              <summary className="cursor-pointer font-display text-xl text-ink">
                {item.q}
              </summary>
              <p className="mt-3 font-body text-sm text-stone">{item.a}</p>
            </details>
          ))}
        </div>
      </div>

      <div className="container-lux mt-20">
        <h2 className="font-display text-3xl text-ink">Oxşar kolleksiyalar</h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-3">
          {related.map((item, i) => (
            <Link key={item.id} href={`/collections/${item.slug}`} className="group">
              <CollectionPlaceholder title={item.name} index={i} />
              <p className="mt-4 font-display text-xl">{item.name}</p>
            </Link>
          ))}
        </div>
      </div>

      <section className="container-lux mt-20 overflow-hidden bg-espresso px-8 py-16 text-center text-ivory sm:px-16">
        <h2 className="font-display text-[clamp(2rem,4vw,3.5rem)]">
          Bu kolleksiyanı rezerv edin
        </h2>
        <p className="mx-auto mt-4 max-w-xl font-body text-mist">
          Tarix, say və tumba seçimini rezervasiya axınında tamamlayın — WhatsApp
          ilə dərhal göndərin.
        </p>
        <div className="mt-8">
          <Button asChild variant="gold" size="lg">
            <Link href={`/booking?collection=${collection.slug}`}>
              Rezervasiyaya başla
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
