"use client";

import Image from "next/image";
import Link from "next/link";
import { m, useMotionValue, useSpring, useTransform } from "motion/react";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";
import { homeContent } from "@/data/content";
import { useUIStore } from "@/stores/ui-store";

const FloralScene = dynamic(
  () =>
    import("@/components/three/floral-scene").then((m) => m.FloralScene),
  { ssr: false },
);

export function HeroSection() {
  const hasLoaded = useUIStore((s) => s.hasLoaded);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const springX = useSpring(mx, { stiffness: 60, damping: 18 });
  const springY = useSpring(my, { stiffness: 60, damping: 18 });
  const imgX = useTransform(springX, [-0.5, 0.5], [18, -18]);
  const imgY = useTransform(springY, [-0.5, 0.5], [12, -12]);
  const glowX = useTransform(springX, [-0.5, 0.5], ["35%", "65%"]);
  const glowY = useTransform(springY, [-0.5, 0.5], ["25%", "55%"]);

  const onMove = (e: React.MouseEvent) => {
    const { innerWidth, innerHeight } = window;
    mx.set(e.clientX / innerWidth - 0.5);
    my.set(e.clientY / innerHeight - 0.5);
  };

  const { hero } = homeContent;

  return (
    <section
      onMouseMove={onMove}
      className="relative min-h-[100svh] overflow-hidden gradient-hero noise-overlay"
    >
      <FloralScene />

      <m.div
        aria-hidden
        className="pointer-events-none absolute h-[32rem] w-[32rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/15 blur-3xl"
        style={{ left: glowX, top: glowY }}
      />

      <div className="container-lux relative z-10 grid min-h-[100svh] items-end gap-10 pb-16 pt-32 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:pb-24 lg:pt-28">
        <div className="max-w-3xl">
          <m.p
            className="font-body text-[10px] uppercase tracking-[0.42em] text-stone"
            initial={{ opacity: 0, y: 20 }}
            animate={hasLoaded ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.15, duration: 0.9 }}
          >
            {hero.eyebrow}
          </m.p>

          <m.h1
            className="mt-6 font-display text-[clamp(3.2rem,9vw,7.5rem)] leading-[0.92] tracking-[-0.04em] text-ink text-balance"
            initial={{ opacity: 0, y: 50 }}
            animate={hasLoaded ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.28, duration: 1.15, ease: [0.22, 1, 0.36, 1] }}
          >
            {hero.title}
          </m.h1>

          <m.div
            className="mt-8 h-px w-24 gradient-gold origin-left"
            initial={{ scaleX: 0 }}
            animate={hasLoaded ? { scaleX: 1 } : {}}
            transition={{ delay: 0.55, duration: 1 }}
          />

          <m.p
            className="mt-8 max-w-xl font-body text-base leading-relaxed text-stone sm:text-lg"
            initial={{ opacity: 0, y: 24 }}
            animate={hasLoaded ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.65, duration: 0.9 }}
          >
            {hero.subtitle}
          </m.p>

          <m.div
            className="mt-10 flex flex-wrap items-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={hasLoaded ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            <Button asChild variant="gold" size="lg">
              <Link href={hero.primaryCta.href}>{hero.primaryCta.label}</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href={hero.secondaryCta.href}>{hero.secondaryCta.label}</Link>
            </Button>
          </m.div>
        </div>

        <m.div
          className="relative mx-auto aspect-[4/5] w-full max-w-md lg:max-w-none"
          style={{ x: imgX, y: imgY }}
          initial={{ opacity: 0, scale: 1.06 }}
          animate={hasLoaded ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.45, duration: 1.3, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-gold/20 via-transparent to-blush/30 blur-2xl" />
          <div className="relative h-full overflow-hidden rounded-[1.5rem] shadow-lift">
            <Image
              src="https://images.unsplash.com/photo-1519741497674-611481863552?w=1400&q=85"
              alt="The Xonca tərəfindən lüks toy çiçək quraşdırması"
              fill
              priority
              className="object-cover"
              sizes="(max-width: 1024px) 90vw, 42vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/35 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 glass rounded-2xl px-5 py-4">
              <p className="font-body text-[10px] uppercase tracking-[0.3em] text-stone">
                Seçilmiş Atmosfer
              </p>
              <p className="mt-1 font-display text-2xl text-ink">Villa Aurelia</p>
            </div>
          </div>

          <m.div
            className="absolute -left-6 top-1/3 hidden h-28 w-28 rounded-full border border-gold/30 sm:block"
            animate={{ rotate: 360 }}
            transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
          />
        </m.div>
      </div>

      <m.div
        className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-3"
        initial={{ opacity: 0 }}
        animate={hasLoaded ? { opacity: 1 } : {}}
        transition={{ delay: 1.2 }}
      >
        <span className="font-body text-[10px] uppercase tracking-[0.35em] text-stone">
          {hero.scrollHint}
        </span>
        <m.span
          className="h-10 w-px origin-top bg-gradient-to-b from-gold to-transparent"
          animate={{ scaleY: [0.4, 1, 0.4], opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
        />
      </m.div>
    </section>
  );
}
