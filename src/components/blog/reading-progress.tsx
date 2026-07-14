"use client";

import { m, useScroll, useSpring } from "motion/react";

export function ReadingProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  return (
    <m.div
      className="fixed top-0 right-0 left-0 z-[85] h-[2px] origin-left gradient-gold"
      style={{ scaleX }}
    />
  );
}
