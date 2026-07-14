import type { Metadata } from "next";
import Image from "next/image";
import { SITE } from "@/lib/constants/site";

export const metadata: Metadata = {
  title: "Hekayəmiz",
  description: SITE.tagline,
};

export default function AboutPage() {
  return (
    <div className="bg-ivory pb-24 pt-36">
      <div className="container-lux grid items-center gap-12 lg:grid-cols-2">
        <div>
          <p className="font-body text-[10px] uppercase tracking-[0.4em] text-gold-deep">
            Hekayəmiz
          </p>
          <h1 className="mt-4 font-display text-[clamp(2.8rem,7vw,5rem)] leading-[1.02] text-ink">
            Atmosfer sənətinə həsr olunmuş atelye
          </h1>
          <p className="mt-8 font-body text-lg leading-relaxed text-stone">
            Şəxsi dizayn evi kimi qurulan The Xonca, çiçəklərin memarlığa, işığın
            isə dilə çevrildiyi toy mühitləri bəstələyir. Hər mövsüm az sayda
            cütlüklə işləyirik — yaxınlığı, sənətkarlığı və kinematik niyyəti
            qoruyaraq.
          </p>
        </div>
        <div className="relative aspect-[4/5] overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=1400&q=85"
            alt="The Xonca hekayəsi"
            fill
            className="object-cover"
            sizes="50vw"
            priority
          />
        </div>
      </div>
    </div>
  );
}
