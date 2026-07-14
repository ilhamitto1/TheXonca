"use client";

import Image from "next/image";
import Link from "next/link";
import { m } from "motion/react";
import { Reveal } from "@/components/animations/reveal";
import { TextReveal } from "@/components/animations/text-reveal";
import { galleryItems } from "@/data/content";
import { useUIStore } from "@/stores/ui-store";

export function InteractiveGallery() {
  const setCursorLabel = useUIStore((s) => s.setCursorLabel);
  const items = galleryItems.slice(0, 8);

  return (
    <section className="section-y bg-espresso text-ivory">
      <div className="container-lux">
        <div className="mb-14 max-w-2xl">
          <Reveal>
            <p className="font-body text-[10px] uppercase tracking-[0.4em] text-gold-soft">
              İnteraktiv Qalereya
            </p>
          </Reveal>
          <TextReveal
            text="İşıqda dayandırılmış anlar"
            as="h2"
            className="mt-4 font-display text-[clamp(2.4rem,5vw,4.2rem)] text-ivory"
          />
        </div>

        <div className="columns-1 gap-4 sm:columns-2 lg:columns-3">
          {items.map((item, i) => (
            <Reveal key={item.id} delay={(i % 3) * 0.08} className="mb-4 break-inside-avoid">
              <Link
                href="/gallery"
                className="group relative block overflow-hidden"
                onMouseEnter={() => setCursorLabel("Aç")}
                onMouseLeave={() => setCursorLabel(null)}
              >
                <div
                  className={
                    item.aspect === "tall"
                      ? "aspect-[3/4]"
                      : item.aspect === "wide"
                        ? "aspect-[4/3]"
                        : "aspect-square"
                  }
                >
                  <m.div
                    whileHover={{ scale: 1.06 }}
                    transition={{ duration: 0.8 }}
                    className="h-full w-full"
                  >
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 50vw, 33vw"
                    />
                  </m.div>
                </div>
                <div className="absolute inset-0 flex items-end bg-gradient-to-t from-ink/60 to-transparent p-5 opacity-0 transition duration-500 group-hover:opacity-100">
                  <div>
                    <p className="font-body text-[10px] uppercase tracking-[0.25em] text-gold-soft">
                      {item.category}
                    </p>
                    <p className="font-display text-2xl">{item.title}</p>
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-12 text-center">
          <Link
            href="/gallery"
            className="inline-flex border border-ivory/20 px-8 py-4 font-body text-xs uppercase tracking-[0.25em] text-ivory transition hover:border-gold hover:text-gold-soft"
          >
            Tam qalereyaya keç
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
