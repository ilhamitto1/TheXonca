"use client";

import { Reveal } from "@/components/animations/reveal";
import { TextReveal } from "@/components/animations/text-reveal";
import { homeContent } from "@/data/collections";

export function WhyUsSection() {
  return (
    <section className="section-y bg-cream">
      <div className="container-lux">
        <Reveal>
          <p className="font-body text-[10px] uppercase tracking-[0.4em] text-gold-deep">
            Niyə The Xonca
          </p>
        </Reveal>
        <TextReveal
          text="Premium təcrübənin dörd prinsipi"
          as="h2"
          className="mt-4 font-display text-[clamp(2.4rem,5vw,4rem)] text-ink"
        />
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {homeContent.whyUs.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.08}>
              <article className="h-full border border-ink/8 bg-ivory p-6">
                <span className="font-body text-xs tracking-[0.3em] text-gold">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-5 font-display text-2xl text-ink">
                  {item.title}
                </h3>
                <p className="mt-3 font-body text-sm leading-relaxed text-stone">
                  {item.body}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
