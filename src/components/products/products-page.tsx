"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { Heart } from "lucide-react";
import { Reveal } from "@/components/animations/reveal";
import { TextReveal } from "@/components/animations/text-reveal";
import { Input } from "@/components/ui/input";
import { products } from "@/data/content";
import { formatCurrency } from "@/lib/utils";

const categories = ["Hamısı", ...Array.from(new Set(products.map((p) => p.category)))];

export function ProductsPage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("Hamısı");
  const [favorites, setFavorites] = useState<string[]>([]);

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const matchesCategory = category === "Hamısı" || p.category === category;
      const matchesQuery =
        !query ||
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.description.toLowerCase().includes(query.toLowerCase());
      return matchesCategory && matchesQuery;
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
            text="Atmosfer obyektləri"
            as="h1"
            className="mt-4 font-display text-[clamp(2.8rem,7vw,5rem)] text-ink"
          />

          <div className="mt-10 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-wrap gap-2">
              {categories.map((c) => (
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
              placeholder="Kolleksiyaları axtar..."
              className="max-w-sm"
            />
          </div>
        </div>
      </section>

      <section className="container-lux grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((product, i) => (
          <Reveal key={product.id} delay={(i % 3) * 0.08}>
            <article className="group relative border border-ink/8 bg-pearl transition hover:shadow-lift">
              <button
                type="button"
                aria-label="Sevimlilərə əlavə et"
                className="absolute top-4 right-4 z-10 flex h-10 w-10 items-center justify-center bg-ivory/80 backdrop-blur"
                onClick={() =>
                  setFavorites((prev) =>
                    prev.includes(product.id)
                      ? prev.filter((id) => id !== product.id)
                      : [...prev, product.id],
                  )
                }
              >
                <Heart
                  className={`h-4 w-4 ${
                    favorites.includes(product.id)
                      ? "fill-gold text-gold"
                      : "text-ink"
                  }`}
                />
              </button>
              <Link href={`/products/${product.slug}`} className="block">
                <div className="relative aspect-[4/5] overflow-hidden">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover transition duration-700 group-hover:scale-105"
                    sizes="(max-width: 1024px) 50vw, 33vw"
                  />
                </div>
                <div className="p-6">
                  <p className="font-body text-[10px] uppercase tracking-[0.25em] text-stone">
                    {product.category}
                  </p>
                  <h2 className="mt-2 font-display text-2xl text-ink">
                    {product.name}
                  </h2>
                  <div className="mt-4 flex items-center justify-between">
                    <p className="font-body text-sm text-gold-deep">
                      {formatCurrency(product.price)}
                    </p>
                    <p className="font-body text-[11px] uppercase tracking-[0.15em] text-stone">
                      {product.stock > 0
                        ? `${product.stock} mövcud`
                        : "Gözləmə siyahısı"}
                    </p>
                  </div>
                </div>
              </Link>
            </article>
          </Reveal>
        ))}
      </section>
    </div>
  );
}
