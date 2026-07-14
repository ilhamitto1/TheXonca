"use client";

import { useState } from "react";
import { AnimatePresence, m } from "motion/react";
import { Reveal } from "@/components/animations/reveal";
import { TextReveal } from "@/components/animations/text-reveal";
import { homeContent } from "@/data/content";

export function CustomerStories() {
  const [index, setIndex] = useState(0);
  const story = homeContent.testimonials[index];

  return (
    <section className="section-y bg-ivory">
      <div className="container-lux">
        <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <Reveal>
              <p className="font-body text-[10px] uppercase tracking-[0.4em] text-gold-deep">
                Müştəri Hekayələri
              </p>
            </Reveal>
            <TextReveal
              text="Koridordan gələn sözlər"
              as="h2"
              className="mt-4 font-display text-[clamp(2.4rem,5vw,4.2rem)] text-ink"
            />
          </div>
          <div className="flex gap-3">
            <button
              type="button"
              aria-label="Əvvəlki hekayə"
              onClick={() =>
                setIndex((v) =>
                  v === 0 ? homeContent.testimonials.length - 1 : v - 1,
                )
              }
              className="h-12 w-12 border border-ink/15 font-display text-xl transition hover:border-gold hover:text-gold-deep"
            >
              ←
            </button>
            <button
              type="button"
              aria-label="Növbəti hekayə"
              onClick={() =>
                setIndex((v) => (v + 1) % homeContent.testimonials.length)
              }
              className="h-12 w-12 border border-ink/15 font-display text-xl transition hover:border-gold hover:text-gold-deep"
            >
              →
            </button>
          </div>
        </div>

        <Reveal>
          <div className="relative min-h-[16rem] overflow-hidden border border-ink/8 bg-cream/60 p-8 sm:p-14">
            <AnimatePresence mode="wait">
              <m.blockquote
                key={story.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              >
                <p className="font-display text-[clamp(1.6rem,3.5vw,2.8rem)] leading-snug text-ink">
                  “{story.quote}”
                </p>
                <footer className="mt-10">
                  <p className="font-body text-sm uppercase tracking-[0.2em] text-ink">
                    {story.name}
                  </p>
                  <p className="mt-2 font-body text-sm text-stone">{story.event}</p>
                </footer>
              </m.blockquote>
            </AnimatePresence>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
