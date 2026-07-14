"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { AnimatePresence, m } from "motion/react";
import { Reveal } from "@/components/animations/reveal";
import { TextReveal } from "@/components/animations/text-reveal";
import { galleryFilters, galleryItems } from "@/data/content";
import { useUIStore } from "@/stores/ui-store";

export function GalleryPage() {
  const [filter, setFilter] = useState<(typeof galleryFilters)[number]>("Hamısı");
  const [active, setActive] = useState<string | null>(null);
  const setCursorLabel = useUIStore((s) => s.setCursorLabel);

  const items = useMemo(
    () =>
      filter === "Hamısı"
        ? galleryItems
        : galleryItems.filter((item) => item.category === filter),
    [filter],
  );

  const activeItem = galleryItems.find((i) => i.id === active);

  return (
    <div className="bg-ivory pb-24">
      <section className="px-[var(--xonca-gutter)] pt-36 pb-12">
        <div className="container-lux">
          <Reveal>
            <p className="font-body text-[10px] uppercase tracking-[0.4em] text-gold-deep">
              Qalereya
            </p>
          </Reveal>
          <TextReveal
            text="Atmosferlərin canlı arxivi"
            as="h1"
            className="mt-4 font-display text-[clamp(2.8rem,7vw,5rem)] text-ink"
          />

          <div className="mt-10 flex flex-wrap gap-2">
            {galleryFilters.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setFilter(item)}
                className={`px-4 py-2 font-body text-[11px] uppercase tracking-[0.2em] transition ${
                  filter === item
                    ? "bg-ink text-ivory"
                    : "border border-ink/10 text-stone hover:border-gold hover:text-gold-deep"
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="container-lux">
        <div className="columns-1 gap-4 sm:columns-2 lg:columns-3">
          {items.map((item, i) => (
            <Reveal
              key={item.id}
              delay={(i % 6) * 0.04}
              className="mb-4 break-inside-avoid"
            >
              <button
                type="button"
                className="group relative block w-full overflow-hidden text-left"
                onClick={() => setActive(item.id)}
                onMouseEnter={() => setCursorLabel("Bax")}
                onMouseLeave={() => setCursorLabel(null)}
              >
                <div
                  className={
                    item.aspect === "tall"
                      ? "aspect-[3/4]"
                      : item.aspect === "wide"
                        ? "aspect-[5/4]"
                        : "aspect-square"
                  }
                >
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover transition duration-700 group-hover:scale-105"
                    sizes="(max-width: 1024px) 50vw, 33vw"
                  />
                </div>
              </button>
            </Reveal>
          ))}
        </div>
      </section>

      <AnimatePresence>
        {activeItem ? (
          <m.div
            className="fixed inset-0 z-[95] flex items-center justify-center bg-ink/90 p-4 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
          >
            <m.div
              className="relative max-h-[85vh] w-full max-w-4xl overflow-hidden"
              initial={{ scale: 0.94, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.96, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative aspect-[16/11] w-full">
                <Image
                  src={activeItem.image}
                  alt={activeItem.title}
                  fill
                  className="object-cover"
                  sizes="90vw"
                />
              </div>
              <div className="flex items-center justify-between bg-espresso px-6 py-4 text-ivory">
                <div>
                  <p className="font-body text-[10px] uppercase tracking-[0.25em] text-gold-soft">
                    {activeItem.category}
                  </p>
                  <p className="font-display text-2xl">{activeItem.title}</p>
                </div>
                <button
                  type="button"
                  onClick={() => setActive(null)}
                  className="font-body text-xs uppercase tracking-[0.25em]"
                >
                  Bağla
                </button>
              </div>
            </m.div>
          </m.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
