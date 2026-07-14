"use client";

import Image from "next/image";
import { m } from "motion/react";
import { Reveal } from "@/components/animations/reveal";
import { TextReveal } from "@/components/animations/text-reveal";
import { homeContent } from "@/data/content";
import { SITE } from "@/lib/constants/site";

export function InstagramFeed() {
  return (
    <section className="section-y bg-cream">
      <div className="container-lux">
        <div className="mb-12 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <Reveal>
              <p className="font-body text-[10px] uppercase tracking-[0.4em] text-gold-deep">
                Instagram
              </p>
            </Reveal>
            <TextReveal
              text="@thexonca"
              as="h2"
              className="mt-4 font-display text-[clamp(2.4rem,5vw,4rem)] text-ink"
            />
          </div>
          <Reveal>
            <a
              href={SITE.social.instagram}
              target="_blank"
              rel="noreferrer"
              className="font-body text-xs uppercase tracking-[0.25em] text-stone hover:text-gold-deep"
            >
              Atelyeni izlə →
            </a>
          </Reveal>
        </div>

        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
          {homeContent.instagram.map((src, i) => (
            <Reveal key={src} delay={i * 0.05}>
              <a
                href={SITE.social.instagram}
                target="_blank"
                rel="noreferrer"
                className="group relative block aspect-square overflow-hidden"
              >
                <m.div
                  whileHover={{ scale: 1.08 }}
                  transition={{ duration: 0.7 }}
                  className="h-full w-full"
                >
                  <Image
                    src={src}
                    alt={`The Xonca Instagram ${i + 1}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 50vw, 16vw"
                  />
                </m.div>
                <div className="absolute inset-0 bg-ink/0 transition group-hover:bg-ink/25" />
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
