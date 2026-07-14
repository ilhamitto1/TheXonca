"use client";

import Image from "next/image";
import Link from "next/link";
import { m } from "motion/react";
import { Reveal } from "@/components/animations/reveal";
import { TextReveal } from "@/components/animations/text-reveal";
import { homeContent } from "@/data/content";
import { useUIStore } from "@/stores/ui-store";

export function FeaturedEvents() {
  const setCursorLabel = useUIStore((s) => s.setCursorLabel);

  return (
    <section className="section-y bg-ivory">
      <div className="container-lux">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <Reveal>
              <p className="font-body text-[10px] uppercase tracking-[0.4em] text-gold-deep">
                Seçilmiş Tədbirlər
              </p>
            </Reveal>
            <TextReveal
              text="Son atmosferlər"
              as="h2"
              className="mt-4 font-display text-[clamp(2.4rem,5vw,4.2rem)] text-ink"
            />
          </div>
          <Reveal delay={0.15}>
            <Link
              href="/gallery"
              className="font-body text-xs uppercase tracking-[0.25em] text-stone transition hover:text-gold-deep"
            >
              Bütün fəsillərə bax →
            </Link>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {homeContent.featuredEvents.map((event, i) => (
            <Reveal key={event.id} delay={i * 0.1}>
              <Link
                href="/gallery"
                className="group block"
                onMouseEnter={() => setCursorLabel("Bax")}
                onMouseLeave={() => setCursorLabel(null)}
              >
                <div className="relative aspect-[3/4] overflow-hidden">
                  <m.div
                    className="h-full w-full"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <Image
                      src={event.image}
                      alt={event.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </m.div>
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/10 to-transparent opacity-80 transition group-hover:opacity-95" />
                  <div className="absolute inset-x-0 bottom-0 p-6 text-ivory">
                    <p className="font-body text-[10px] uppercase tracking-[0.28em] text-gold-soft">
                      {event.location} · {event.season}
                    </p>
                    <h3 className="mt-2 font-display text-3xl">{event.title}</h3>
                    <p className="mt-2 font-body text-sm text-ivory/75">
                      {event.theme}
                    </p>
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
