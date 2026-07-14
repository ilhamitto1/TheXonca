"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { useUIStore } from "@/stores/ui-store";
import { usePrefersReducedMotion } from "@/hooks/use-media-query";

export function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const reduced = usePrefersReducedMotion();
  const setScrollProgress = useUIStore((s) => s.setScrollProgress);
  const isMenuOpen = useUIStore((s) => s.isMenuOpen);

  useEffect(() => {
    if (reduced) return;

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.2,
    });

    let frame = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);

    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(max > 0 ? window.scrollY / max : 0);
    };

    lenis.on("scroll", onScroll);
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
      window.removeEventListener("scroll", onScroll);
    };
  }, [reduced, setScrollProgress]);

  useEffect(() => {
    document.documentElement.classList.toggle("overflow-hidden", isMenuOpen);
    document.body.classList.toggle("overflow-hidden", isMenuOpen);
  }, [isMenuOpen]);

  return <>{children}</>;
}
