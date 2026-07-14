"use client";

import Link from "next/link";
import { m } from "motion/react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/animations/reveal";
import { TextReveal } from "@/components/animations/text-reveal";
import { homeContent } from "@/data/content";

export function LuxuryCta() {
  const { cta } = homeContent;

  return (
    <section className="relative overflow-hidden section-y">
      <div className="absolute inset-0 bg-espresso" />
      <m.div
        aria-hidden
        className="absolute -left-20 top-0 h-80 w-80 rounded-full bg-gold/20 blur-3xl"
        animate={{ x: [0, 40, 0], y: [0, 20, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      <m.div
        aria-hidden
        className="absolute -right-10 bottom-0 h-72 w-72 rounded-full bg-blush/15 blur-3xl"
        animate={{ x: [0, -30, 0], y: [0, -25, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="container-lux relative z-10 text-center">
        <TextReveal
          text={cta.title}
          as="h2"
          className="mx-auto max-w-4xl font-display text-[clamp(2.4rem,6vw,4.8rem)] leading-[1.05] text-ivory"
        />
        <Reveal delay={0.15}>
          <p className="mx-auto mt-6 max-w-xl font-body text-base text-mist">
            {cta.body}
          </p>
        </Reveal>
        <Reveal delay={0.25} className="mt-10">
          <Button asChild variant="gold" size="lg">
            <Link href={cta.button.href}>{cta.button.label}</Link>
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
