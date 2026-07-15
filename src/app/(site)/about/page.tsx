import type { Metadata } from "next";
import { SITE } from "@/lib/constants/site";
import { CollectionPlaceholder } from "@/components/shared/collection-placeholder";

export const metadata: Metadata = {
  title: "Haqqımızda",
  description: SITE.tagline,
};

const timeline = [
  { year: "2018", title: "Başlanğıc", body: "Kiçik atelyedə ilk premium xonça sifarişləri." },
  { year: "2021", title: "Tumba sistemi", body: "Xonça stand (tumba) xidməti rəsmi portfelə əlavə olundu." },
  { year: "2024", title: "Kolleksiya evi", body: "Imperial, Ivory, Midnight kimi imza seriyalar formalaşdı." },
  { year: "2026", title: "Rəqəmsal rezervasiya", body: "WhatsApp əsaslı lüks rezervasiya platforması." },
];

const why = [
  "Əl işi premium keyfiyyət",
  "Xonça + tumba vahid konsepsiya",
  "Şəffaf qiymət və çatdırılma",
  "Sürətli WhatsApp rezervasiya",
];

export default function AboutPage() {
  return (
    <div className="bg-ivory pb-24 pt-36">
      <div className="container-lux grid items-center gap-12 lg:grid-cols-2">
        <div>
          <p className="font-body text-[10px] uppercase tracking-[0.4em] text-gold-deep">
            Haqqımızda
          </p>
          <h1 className="mt-4 font-display text-[clamp(2.8rem,7vw,5rem)] leading-[1.02] text-ink">
            Premium xonça sənətinin evi
          </h1>
          <p className="mt-8 font-body text-lg leading-relaxed text-stone">
            The Xonca toy və mərasimlər üçün əl ilə hazırlanan xonça kolleksiyaları
            və tumba (stand) sistemləri təqdim edir. Missiyamız sadədir: hər
            masaya lüks, hər rezervasiyaya rahatlıq.
          </p>
        </div>
        <div className="overflow-hidden shadow-lift">
          <CollectionPlaceholder title="The Xonca" variant="hero" index={2} />
        </div>
      </div>

      <div className="container-lux mt-24 grid gap-8 md:grid-cols-2">
        <div className="border border-ink/8 bg-cream/40 p-8">
          <h2 className="font-display text-3xl">Missiya</h2>
          <p className="mt-4 font-body text-stone">
            Mərasimləri unudulmaz edən premium xonça kompozisiyaları yaratmaq.
          </p>
        </div>
        <div className="border border-ink/8 bg-cream/40 p-8">
          <h2 className="font-display text-3xl">Vizyon</h2>
          <p className="mt-4 font-body text-stone">
            Azərbaycanda xonça və tumba sahəsində ən prestijli atelye olmaq.
          </p>
        </div>
      </div>

      <div className="container-lux mt-24">
        <h2 className="font-display text-4xl text-ink">Zaman xətti</h2>
        <div className="mt-10 grid gap-8 md:grid-cols-4">
          {timeline.map((item) => (
            <div key={item.year}>
              <p className="font-body text-xs tracking-[0.25em] text-gold">
                {item.year}
              </p>
              <h3 className="mt-3 font-display text-2xl">{item.title}</h3>
              <p className="mt-2 font-body text-sm text-stone">{item.body}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="container-lux mt-24">
        <h2 className="font-display text-4xl">Niyə bizi seçirlər</h2>
        <ul className="mt-8 grid gap-4 sm:grid-cols-2">
          {why.map((item) => (
            <li
              key={item}
              className="border border-ink/8 bg-pearl px-5 py-4 font-body text-sm text-charcoal"
            >
              — {item}
            </li>
          ))}
        </ul>
      </div>

      <div className="container-lux mt-24 grid grid-cols-3 gap-4 border-y border-ink/10 py-12 text-center">
        {[
          { value: "120+", label: "Xonça" },
          { value: "6", label: "Kolleksiya" },
          { value: "150", label: "AZN çatdırılma" },
        ].map((stat) => (
          <div key={stat.label}>
            <p className="font-display text-4xl text-ink sm:text-5xl">
              {stat.value}
            </p>
            <p className="mt-2 font-body text-[10px] uppercase tracking-[0.2em] text-stone">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
