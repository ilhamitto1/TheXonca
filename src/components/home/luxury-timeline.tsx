"use client";

import { Reveal } from "@/components/animations/reveal";
import { TextReveal } from "@/components/animations/text-reveal";
import { homeContent } from "@/data/content";

export function LuxuryTimeline() {
  return (
    <section className="section-y bg-cream">
      <div className="container-lux">
        <div className="mb-16 max-w-xl">
          <Reveal>
            <p className="font-body text-[10px] uppercase tracking-[0.4em] text-gold-deep">
              Lüks Zaman Xətti
            </p>
          </Reveal>
          <TextReveal
            text="İlk söhbətdən son ləçəyə qədər"
            as="h2"
            className="mt-4 font-display text-[clamp(2.4rem,5vw,4rem)] text-ink"
          />
        </div>

        <div className="relative grid gap-10 md:grid-cols-4">
          <div className="gold-line absolute top-6 right-0 left-0 hidden md:block" />
          {homeContent.timeline.map((item, i) => (
            <Reveal key={item.year} delay={i * 0.12} className="relative">
              <div className="relative z-10 mb-6 flex h-12 w-12 items-center justify-center rounded-full border border-gold/40 bg-ivory font-display text-lg text-gold-deep">
                {item.year}
              </div>
              <h3 className="font-display text-2xl text-ink">{item.title}</h3>
              <p className="mt-3 font-body text-sm leading-relaxed text-stone">
                {item.body}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
