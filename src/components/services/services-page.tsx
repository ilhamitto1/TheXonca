"use client";

import Link from "next/link";
import { m } from "motion/react";
import { Reveal } from "@/components/animations/reveal";
import { TextReveal } from "@/components/animations/text-reveal";
import { Button } from "@/components/ui/button";
import { homeContent, servicesContent } from "@/data/content";
import { formatCurrency } from "@/lib/utils";

export function ServicesPage() {
  return (
    <div className="bg-ivory">
      <section className="gradient-hero noise-overlay px-[var(--xonca-gutter)] pb-20 pt-36">
        <div className="container-lux max-w-4xl">
          <Reveal>
            <p className="font-body text-[10px] uppercase tracking-[0.4em] text-gold-deep">
              Xidmətlər
            </p>
          </Reveal>
          <TextReveal
            text={servicesContent.hero.title}
            as="h1"
            className="mt-5 font-display text-[clamp(2.8rem,7vw,5.5rem)] leading-[1.02] text-ink"
          />
          <Reveal delay={0.15}>
            <p className="mt-6 max-w-2xl font-body text-lg text-stone">
              {servicesContent.hero.subtitle}
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section-y container-lux">
        <div className="grid gap-6 md:grid-cols-2">
          {homeContent.services.map((service, i) => (
            <Reveal key={service.id} delay={i * 0.08}>
              <m.article
                whileHover={{ y: -6 }}
                transition={{ duration: 0.45 }}
                className="group border border-ink/8 bg-cream/50 p-8 transition hover:shadow-lift"
                id={service.id}
              >
                <span className="font-body text-xs tracking-[0.3em] text-gold">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h2 className="mt-5 font-display text-3xl text-ink group-hover:text-gold-deep">
                  {service.title}
                </h2>
                <p className="mt-4 font-body text-sm leading-relaxed text-stone">
                  {service.description}
                </p>
              </m.article>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section-y bg-cream">
        <div className="container-lux">
          <TextReveal
            text="İnvestisiya"
            as="h2"
            className="font-display text-[clamp(2.4rem,5vw,4rem)] text-ink"
          />
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {servicesContent.packages.map((pkg, i) => (
              <Reveal key={pkg.id} delay={i * 0.1}>
                <article
                  className={`flex h-full flex-col border p-8 ${
                    pkg.featured
                      ? "border-gold bg-ink text-ivory shadow-gold"
                      : "border-ink/10 bg-ivory"
                  }`}
                >
                  <p
                    className={`font-body text-[10px] uppercase tracking-[0.3em] ${
                      pkg.featured ? "text-gold-soft" : "text-gold-deep"
                    }`}
                  >
                    {pkg.featured ? "Ən seçilən" : "Paket"}
                  </p>
                  <h3 className="mt-4 font-display text-3xl">{pkg.name}</h3>
                  <p className="mt-2 font-display text-4xl text-gold">
                    {formatCurrency(pkg.price)}-dən
                  </p>
                  <p
                    className={`mt-4 font-body text-sm ${
                      pkg.featured ? "text-mist" : "text-stone"
                    }`}
                  >
                    {pkg.description}
                  </p>
                  <ul className="mt-8 flex-1 space-y-3">
                    {pkg.features.map((f) => (
                      <li
                        key={f}
                        className={`font-body text-sm ${
                          pkg.featured ? "text-ivory/85" : "text-charcoal"
                        }`}
                      >
                        — {f}
                      </li>
                    ))}
                  </ul>
                  <Button
                    asChild
                    variant={pkg.featured ? "gold" : "outline"}
                    className="mt-8"
                  >
                    <Link href="/booking">Bu paketi rezerv et</Link>
                  </Button>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-y container-lux text-center">
        <TextReveal
          text="Gününüzü bəstələməyə hazırsınız?"
          as="h2"
          className="font-display text-[clamp(2rem,4vw,3.5rem)] text-ink"
        />
        <Reveal delay={0.15} className="mt-8">
          <Button asChild variant="gold" size="lg">
            <Link href="/booking">Rezervasiyaya başla</Link>
          </Button>
        </Reveal>
      </section>
    </div>
  );
}
