import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { products } from "@/data/content";
import { formatCurrency } from "@/lib/utils";
import { Button } from "@/components/ui/button";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);
  if (!product) return { title: "Məhsul" };
  return {
    title: product.name,
    description: product.description,
  };
}

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);
  if (!product) notFound();

  const related = products.filter((p) => p.id !== product.id).slice(0, 3);

  return (
    <div className="bg-ivory pb-24 pt-36">
      <div className="container-lux grid gap-12 lg:grid-cols-2">
        <div className="relative aspect-[4/5] overflow-hidden">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover"
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>
        <div className="flex flex-col justify-center">
          <p className="font-body text-[10px] uppercase tracking-[0.35em] text-gold-deep">
            {product.category}
          </p>
          <h1 className="mt-4 font-display text-5xl text-ink">{product.name}</h1>
          <p className="mt-6 font-display text-3xl text-gold-deep">
            {formatCurrency(product.price)}
          </p>
          <p className="mt-6 max-w-md font-body text-base leading-relaxed text-stone">
            {product.description}
          </p>
          <p className="mt-4 font-body text-sm text-charcoal">
            Stok:{" "}
            {product.stock > 0
              ? `${product.stock} mövcud`
              : "Gözləmə siyahısı"}
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Button asChild variant="gold" size="lg">
              <Link href="/booking">Rezerv üçün sorğu</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/products">Kolleksiyalara qayıt</Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="container-lux mt-24">
        <h2 className="font-display text-3xl text-ink">Oxşar</h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-3">
          {related.map((item) => (
            <Link key={item.id} href={`/products/${item.slug}`} className="group">
              <div className="relative aspect-[4/5] overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover transition duration-700 group-hover:scale-105"
                  sizes="33vw"
                />
              </div>
              <p className="mt-4 font-display text-xl">{item.name}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
