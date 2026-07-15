"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { homeContent } from "@/data/collections";
import type { CmsSectionKey } from "@/types";

const sections: { key: CmsSectionKey; label: string }[] = [
  { key: "hero", label: "Hero" },
  { key: "story", label: "Hekayə" },
  { key: "collections", label: "Kolleksiyalar" },
  { key: "process", label: "Proses" },
  { key: "whyUs", label: "Niyə biz" },
  { key: "testimonials", label: "Rəylər" },
  { key: "cta", label: "CTA" },
];

export default function HomepageCmsPage() {
  const [enabled, setEnabled] = useState<Record<string, boolean>>(
    Object.fromEntries(sections.map((s) => [s.key, true])),
  );
  const [heroTitle, setHeroTitle] = useState<string>(homeContent.hero.title);
  const [heroSubtitle, setHeroSubtitle] = useState<string>(
    homeContent.hero.subtitle,
  );

  return (
    <div className="space-y-8">
      <div>
        <p className="font-body text-[10px] uppercase tracking-[0.35em] text-gold-soft">
          CMS
        </p>
        <h1 className="mt-2 font-display text-4xl">Ana səhifə qurucusu</h1>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-ivory/10 bg-charcoal/60 p-6">
          <h2 className="font-display text-2xl">Bölmələr</h2>
          <ul className="mt-6 space-y-3">
            {sections.map((section) => (
              <li
                key={section.key}
                className="flex items-center justify-between border-b border-ivory/5 pb-3"
              >
                <span className="text-sm">{section.label}</span>
                <button
                  type="button"
                  onClick={() =>
                    setEnabled((prev) => ({
                      ...prev,
                      [section.key]: !prev[section.key],
                    }))
                  }
                  className={`h-7 w-12 rounded-full transition ${
                    enabled[section.key] ? "bg-gold" : "bg-ivory/15"
                  }`}
                >
                  <span
                    className={`block h-5 w-5 rounded-full bg-ink transition ${
                      enabled[section.key] ? "translate-x-6" : "translate-x-1"
                    }`}
                  />
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-2xl border border-ivory/10 bg-charcoal/60 p-6">
          <h2 className="font-display text-2xl">Hero redaktoru</h2>
          <div className="mt-6 space-y-4">
            <div className="space-y-2">
              <Label className="text-mist">Başlıq</Label>
              <Input
                value={heroTitle}
                onChange={(e) => setHeroTitle(e.target.value)}
                className="border-ivory/15 bg-ink/40 text-ivory"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-mist">Alt başlıq</Label>
              <Textarea
                value={heroSubtitle}
                onChange={(e) => setHeroSubtitle(e.target.value)}
                className="border-ivory/15 bg-ink/40 text-ivory"
              />
            </div>
            <Button
              variant="gold"
              onClick={() => toast.success("Qaralama yadda saxlandı")}
            >
              Qaralamanı saxla
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
