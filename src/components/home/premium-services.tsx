"use client";

import Link from "next/link";
import { m } from "motion/react";
import { Reveal } from "@/components/animations/reveal";
import { TextReveal } from "@/components/animations/text-reveal";
import { homeContent } from "@/data/content";

export function PremiumServices() {
  return (
    <section className="section-y bg-ivory">
      <div className="container-lux">
        <div className="max-w-2xl">
          <Reveal>
            <p className="font-body text-[10px] uppercase tracking-[0.4em] text-gold-deep">
              Premium Xidmətlər
            </p>
          </Reveal>
          <TextReveal
            text="Sədaqət fənləri"
            as="h2"
            className="mt-4 font-display text-[clamp(2.4rem,5vw,4.2rem)] text-ink"
          />
        </div>

        <div className="mt-14 divide-y divide-ink/10 border-y border-ink/10">
          {homeContent.services.map((service, i) => (
            <Reveal key={service.id} delay={i * 0.08}>
              <Link
                href={service.href}
                className="group grid gap-4 py-8 transition md:grid-cols-[5rem_1fr_auto] md:items-center md:gap-8"
              >
                <span className="font-body text-xs tracking-[0.25em] text-gold">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="font-display text-3xl text-ink transition group-hover:text-gold-deep sm:text-4xl">
                    {service.title}
                  </h3>
                  <p className="mt-3 max-w-xl font-body text-sm leading-relaxed text-stone md:text-base">
                    {service.description}
                  </p>
                </div>
                <m.span
                  className="font-body text-xs uppercase tracking-[0.25em] text-stone"
                  whileHover={{ x: 6 }}
                >
                  Kəşf et →
                </m.span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
