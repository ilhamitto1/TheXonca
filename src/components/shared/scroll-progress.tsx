"use client";

import { m, useSpring } from "motion/react";
import { useUIStore } from "@/stores/ui-store";

export function ScrollProgress() {
  const progress = useUIStore((s) => s.scrollProgress);
  const scaleX = useSpring(progress, { stiffness: 120, damping: 28 });

  return (
    <div className="pointer-events-none fixed top-0 right-0 left-0 z-[90] h-[2px]">
      <m.div
        className="h-full origin-left gradient-gold"
        style={{ scaleX }}
      />
    </div>
  );
}
