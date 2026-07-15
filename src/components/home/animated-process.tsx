"use client";

import { m, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { Reveal } from "@/components/animations/reveal";
import { TextReveal } from "@/components/animations/text-reveal";
import { homeContent } from "@/data/content";

export function AnimatedProcess() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-35%"]);

  return (
    <section id="process" ref={ref} className="section-y overflow-hidden bg-ink text-ivory">
      <div className="container-lux mb-12">
        <Reveal>
          <p className="font-body text-[10px] uppercase tracking-[0.4em] text-gold-soft">
            Rezervasiya prosesi
          </p>
        </Reveal>
        <TextReveal
          text="Seçimdən WhatsApp təsdiqinə"
          as="h2"
          className="mt-4 font-display text-[clamp(2.4rem,5vw,4.2rem)] text-ivory"
        />
      </div>

      <m.div style={{ x }} className="flex w-max gap-6 px-[var(--xonca-gutter)]">
        {homeContent.process.map((step) => (
          <div
            key={step.step}
            className="w-[78vw] max-w-md border border-ivory/10 bg-charcoal/60 p-8 backdrop-blur-sm sm:w-[28rem]"
          >
            <p className="font-body text-xs tracking-[0.3em] text-gold">{step.step}</p>
            <h3 className="mt-6 font-display text-4xl">{step.title}</h3>
            <p className="mt-4 font-body text-sm text-mist">{step.detail}</p>
          </div>
        ))}
      </m.div>
    </section>
  );
}
