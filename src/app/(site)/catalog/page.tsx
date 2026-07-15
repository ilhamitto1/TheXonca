"use client";

import { useMemo, useState } from "react";
import { Reveal } from "@/components/animations/reveal";
import { TextReveal } from "@/components/animations/text-reveal";
import { Input } from "@/components/ui/input";
import { catalogItems, collectionCategories } from "@/data/collections";
import { SITE } from "@/lib/constants/site";

const categories = ["Hamısı", ...Array.from(new Set(catalogItems.map((c) => c.category)))];

export default function CatalogPage() {
  const [category, setCategory] = useState("Hamısı");
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<"new" | "az">("new");

  const items = useMemo(() => {
    let list = catalogItems.filter((item) => {
      const byCat = category === "Hamısı" || item.category === category;
      const byQuery =
        !query ||
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.description.toLowerCase().includes(query.toLowerCase());
      return byCat && byQuery;
    });
    if (sort === "az") {
      list = [...list].sort((a, b) => a.title.localeCompare(b.title, "az"));
    } else {
      list = [...list].sort((a, b) => b.year.localeCompare(a.year));
    }
    return list;
  }, [category, query, sort]);

  return (
    <div className="bg-ivory pb-24 pt-36">
      <div className="container-lux">
        <Reveal>
          <p className="font-body text-[10px] uppercase tracking-[0.4em] text-gold-deep">
            Kataloq
          </p>
        </Reveal>
        <TextReveal
          text="Rəqəmsal lüks kataloq"
          as="h1"
          className="mt-4 font-display text-[clamp(2.8rem,7vw,5rem)] text-ink"
        />
        <Reveal delay={0.1}>
          <p className="mt-5 max-w-2xl font-body text-stone">
            Kolleksiyalar kateqoriyalara görə qruplaşdırılıb. Admin PDF və broşür
            yükləyəndə bu kartlar avtomatik yenilənəcək.
          </p>
        </Reveal>

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
          <div className="flex flex-wrap gap-3">
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Kataloq axtar..."
              className="max-w-xs"
            />
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as "new" | "az")}
              className="h-12 border border-ink/10 bg-pearl px-3 font-body text-sm"
            >
              <option value="new">Ən yeni</option>
              <option value="az">A–Z</option>
            </select>
          </div>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {items.map((item, i) => (
            <Reveal key={item.id} delay={(i % 2) * 0.08}>
              <article className="group flex h-full flex-col border border-ink/8 bg-pearl p-6 transition hover:shadow-lift sm:p-8">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-body text-[10px] uppercase tracking-[0.25em] text-gold-deep">
                      {item.category} · {item.type === "pdf" ? "PDF" : "Broşür"}
                    </p>
                    <h2 className="mt-3 font-display text-3xl text-ink">
                      {item.title}
                    </h2>
                  </div>
                  <span className="font-body text-xs text-stone">{item.year}</span>
                </div>
                <p className="mt-4 flex-1 font-body text-sm text-stone">
                  {item.description}
                </p>
                <p className="mt-3 font-body text-xs text-mist">
                  {item.pages ? `${item.pages} səhifə · ` : ""}
                  Fayl admin tərəfindən yüklənəcək
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <button
                    type="button"
                    className="h-11 px-5 font-body text-[11px] uppercase tracking-[0.18em] gradient-gold text-ink"
                    onClick={() =>
                      alert(
                        "Kataloq faylı hələ yüklənməyib. Admin panelindən əlavə olunacaq.",
                      )
                    }
                  >
                    Bax / Yüklə
                  </button>
                  <a
                    href={`https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(
                      `Salam, "${item.title}" kataloqu haqqında məlumat almaq istəyirəm.`,
                    )}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex h-11 items-center border border-ink/15 px-5 font-body text-[11px] uppercase tracking-[0.18em]"
                  >
                    Paylaş
                  </a>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <div className="mt-16">
          <h2 className="font-display text-3xl">Kolleksiya kateqoriyaları</h2>
          <div className="mt-6 flex flex-wrap gap-3">
            {collectionCategories
              .filter((c) => c !== "Hamısı")
              .map((c) => (
                <span
                  key={c}
                  className="border border-ink/10 px-4 py-2 font-body text-xs uppercase tracking-[0.2em] text-stone"
                >
                  {c}
                </span>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
