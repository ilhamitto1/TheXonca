"use client";

import { Reveal } from "@/components/animations/reveal";
import { TextReveal } from "@/components/animations/text-reveal";
import { CollectionCover } from "@/components/shared/collection-media";
import { collections, homeContent } from "@/data/collections";

export function StorySection() {
  const { story } = homeContent;
  const storyCollection =
    collections.find((c) => c.slug === story.imageSlug) ?? collections[0];

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

        <div className="relative lg:col-span-7 min-w-0">
          <div className="overflow-hidden shadow-lift">
            <CollectionCover
              images={storyCollection?.images ?? []}
              videos={storyCollection?.videos ?? []}
              alt={storyCollection?.name ?? "The Xonca"}
              variant="gallery"
              sizes="(max-width: 1024px) 100vw, 55vw"
              className="!max-h-[min(52svh,28rem)] sm:!max-h-[min(58svh,34rem)] lg:!max-h-none"
            />
          </div>
          <Reveal
            delay={0.25}
            className="absolute -bottom-6 left-3 max-w-[min(100%-1.5rem,20rem)] glass p-4 sm:-bottom-8 sm:left-10 sm:max-w-xs sm:p-6"
          >
            <p className="font-display text-lg leading-snug text-ink sm:text-2xl">
              “Hər xonça mərasimin lüks imzasıdır.”
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
