"use client";

import { m } from "motion/react";
import { cn } from "@/lib/utils";

type Props = {
  title?: string;
  className?: string;
  variant?: "card" | "hero" | "gallery";
  index?: number;
};

export function CollectionPlaceholder({
  title = "The Xonca",
  className,
  variant = "card",
  index = 0,
}: Props) {
  const tones = [
    "from-[#2a2420] via-[#3a322c] to-[#1c1814]",
    "from-[#3a2f24] via-[#5c4a38] to-[#2a2118]",
    "from-[#2c2620] via-[#4a4036] to-[#1a1612]",
  ];

  return (
    <div
      className={cn(
        "relative overflow-hidden",
        variant === "hero" && "aspect-[4/5] w-full",
        variant === "card" && "aspect-[4/5] w-full",
        variant === "gallery" && "aspect-[16/11] w-full",
        className,
      )}
    >
      <div
        className={cn(
          "absolute inset-0 bg-gradient-to-br",
          tones[index % tones.length],
        )}
      />
      <m.div
        aria-hidden
        className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-gold/20 blur-3xl"
        animate={{ opacity: [0.35, 0.7, 0.35], scale: [1, 1.15, 1] }}
        transition={{ duration: 6 + index, repeat: Infinity, ease: "easeInOut" }}
      />
      <m.div
        aria-hidden
        className="absolute -bottom-8 left-6 h-32 w-32 rounded-full bg-blush/15 blur-2xl"
        animate={{ opacity: [0.2, 0.55, 0.2], y: [0, -12, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="absolute inset-0 noise-overlay opacity-40" />
      <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
        <span className="font-body text-[10px] uppercase tracking-[0.35em] text-gold-soft">
          Şəkil tezliklə
        </span>
        <p className="mt-3 font-display text-2xl text-ivory/90 sm:text-3xl">
          {title}
        </p>
        <div className="mt-5 h-px w-16 gradient-gold" />
      </div>
    </div>
  );
}
