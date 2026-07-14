"use client";

import { m, useMotionValue, useSpring } from "motion/react";
import { useEffect } from "react";
import { useUIStore } from "@/stores/ui-store";
import { useIsFinePointer, usePrefersReducedMotion } from "@/hooks/use-media-query";

export function LuxuryCursor() {
  const fine = useIsFinePointer();
  const reduced = usePrefersReducedMotion();
  const label = useUIStore((s) => s.cursorLabel);
  const isMenuOpen = useUIStore((s) => s.isMenuOpen);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 420, damping: 32 });
  const sy = useSpring(y, { stiffness: 420, damping: 32 });
  const ringX = useSpring(x, { stiffness: 180, damping: 24 });
  const ringY = useSpring(y, { stiffness: 180, damping: 24 });

  useEffect(() => {
    if (!fine || reduced) return;

    document.documentElement.classList.add("cursor-none-desktop");

    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };

    window.addEventListener("mousemove", move);
    return () => {
      window.removeEventListener("mousemove", move);
      document.documentElement.classList.remove("cursor-none-desktop");
    };
  }, [fine, reduced, x, y]);

  if (!fine || reduced) return null;

  return (
    <>
      <m.div
        aria-hidden
        className="pointer-events-none fixed top-0 left-0 z-[100] h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold mix-blend-difference"
        style={{ x: sx, y: sy }}
      />
      <m.div
        aria-hidden
        className="pointer-events-none fixed top-0 left-0 z-[100] flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-gold/50 mix-blend-difference"
        style={{
          x: ringX,
          y: ringY,
          scale: label || isMenuOpen ? 1.6 : 1,
        }}
      >
        {label ? (
          <span className="font-body text-[9px] uppercase tracking-[0.2em] text-ivory">
            {label}
          </span>
        ) : null}
      </m.div>
    </>
  );
}
