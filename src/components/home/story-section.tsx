"use client";

import Image from "next/image";
import { Reveal, RevealImage } from "@/components/animations/reveal";
import { TextReveal } from "@/components/animations/text-reveal";
import { homeContent } from "@/data/content";

export function StorySection() {
  const { story } = homeContent;

  return (
    <section className="section-y relative overflow-hidden bg-cream">
      <div className="container-lux grid items-center gap-14 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <Reveal>
            <p className="font-body text-[10px] uppercase tracking-[0.4em] text-gold-deep">
              {story.eyebrow}
            </p>
          </Reveal>
          <TextReveal
            text={story.title}
            as="h2"
            className="mt-5 font-display text-[clamp(2.4rem,5vw,4.5rem)] leading-[1.02] text-ink"
            delay={0.1}
          />
          <Reveal delay={0.2}>
            <p className="mt-8 max-w-md font-body text-base leading-relaxed text-stone">
              {story.body}
            </p>
          </Reveal>

          <div className="mt-12 grid grid-cols-3 gap-4 border-t border-ink/10 pt-8">
            {story.stats.map((stat, i) => (
              <Reveal key={stat.label} delay={0.15 * i}>
                <p className="font-display text-3xl text-ink sm:text-4xl">
                  {stat.value}
                </p>
                <p className="mt-2 font-body text-[10px] uppercase tracking-[0.2em] text-stone">
                  {stat.label}
                </p>
              </Reveal>
            ))}
          </div>
        </div>

        <div className="relative lg:col-span-7">
          <RevealImage className="aspect-[16/11] w-full shadow-lift">
            <Image
              src="https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=1600&q=85"
              alt="The Xonca atelye atmosferi"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 55vw"
            />
          </RevealImage>
          <Reveal delay={0.25} className="absolute -bottom-8 left-6 max-w-xs glass p-6 sm:left-10">
            <p className="font-display text-2xl leading-snug text-ink">
              “Atmosfer qonaqların əbədi xatırladığı sakit lüksdür.”
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
