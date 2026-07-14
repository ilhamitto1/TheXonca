"use client";

import { useState } from "react";
import { AnimatePresence, m } from "motion/react";
import { Reveal } from "@/components/animations/reveal";
import { TextReveal } from "@/components/animations/text-reveal";
import { homeContent } from "@/data/content";

export function WeddingThemes() {
  const [active, setActive] = useState(0);
  const theme = homeContent.themes[active];

  return (
    <section id="themes" className="section-y relative overflow-hidden bg-marble">
      <div className="container-lux">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <Reveal>
              <p className="font-body text-[10px] uppercase tracking-[0.4em] text-gold-deep">
                Toy Temaları
              </p>
            </Reveal>
            <TextReveal
              text="Addım ata biləcəyiniz dünyalar"
              as="h2"
              className="mt-4 font-display text-[clamp(2.4rem,5vw,4.2rem)] text-ink"
            />

            <div className="mt-10 space-y-2">
              {homeContent.themes.map((item, i) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActive(i)}
                  className="group flex w-full items-center justify-between border-b border-ink/10 py-5 text-left transition"
                >
                  <span
                    className={`font-display text-2xl transition sm:text-3xl ${
                      active === i ? "text-ink" : "text-stone group-hover:text-ink"
                    }`}
                  >
                    {item.name}
                  </span>
                  <span
                    className={`h-px w-12 transition ${
                      active === i ? "gradient-gold" : "bg-transparent"
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          <Reveal>
            <div className="relative min-h-[22rem] overflow-hidden p-8 sm:p-12">
              <AnimatePresence mode="wait">
                <m.div
                  key={theme.id}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                  className="relative z-10"
                >
                  <p className="font-display text-4xl text-ink sm:text-5xl">
                    {theme.name}
                  </p>
                  <p className="mt-5 max-w-md font-body text-base leading-relaxed text-stone">
                    {theme.description}
                  </p>
                  <div className="mt-10 flex gap-3">
                    {theme.palette.map((color) => (
                      <span
                        key={color}
                        className="h-12 w-12 rounded-full border border-ink/10 shadow-soft"
                        style={{ background: color }}
                        title={color}
                      />
                    ))}
                  </div>
                </m.div>
              </AnimatePresence>

              <div
                className="absolute inset-0 transition-colors duration-700"
                style={{
                  background: `radial-gradient(circle at 80% 20%, ${theme.palette[2]}33, transparent 45%), linear-gradient(145deg, ${theme.palette[0]}, ${theme.palette[1]})`,
                }}
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
