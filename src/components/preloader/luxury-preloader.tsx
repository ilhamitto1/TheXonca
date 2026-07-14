"use client";

import { AnimatePresence, m } from "motion/react";
import { useEffect, useState } from "react";
import { useUIStore } from "@/stores/ui-store";
import { homeContent } from "@/data/content";

export function LuxuryPreloader() {
  const { isLoading, setLoading, setHasLoaded, hasLoaded } = useUIStore();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (hasLoaded) {
      setLoading(false);
      return;
    }

    let value = 0;
    const interval = setInterval(() => {
      value += Math.random() * 12 + 4;
      if (value >= 100) {
        value = 100;
        clearInterval(interval);
        setTimeout(() => {
          setLoading(false);
          setHasLoaded(true);
        }, 450);
      }
      setProgress(Math.min(100, Math.floor(value)));
    }, 90);

    return () => clearInterval(interval);
  }, [hasLoaded, setHasLoaded, setLoading]);

  return (
    <AnimatePresence>
      {isLoading ? (
        <m.div
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center marble-vein noise-overlay"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            transition: { duration: 0.9, ease: [0.65, 0, 0.35, 1] },
          }}
        >
          <m.div
            className="absolute inset-x-0 top-0 h-px gradient-gold origin-left"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: progress / 100 }}
            transition={{ ease: "linear", duration: 0.2 }}
          />

          <m.p
            className="font-body text-[10px] uppercase tracking-[0.45em] text-stone"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.8 }}
          >
            {homeContent.preloader.phrase}
          </m.p>

          <m.h1
            className="mt-6 font-display text-5xl tracking-[-0.03em] text-ink sm:text-7xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            {homeContent.preloader.brand}
          </m.h1>

          <div className="mt-12 flex items-end gap-3">
            <span className="font-display text-4xl text-gold tabular-nums">
              {String(progress).padStart(3, "0")}
            </span>
            <span className="mb-1 font-body text-[10px] uppercase tracking-[0.3em] text-stone">
              yükləndi
            </span>
          </div>

          <m.div
            className="absolute bottom-12 left-1/2 h-16 w-px -translate-x-1/2 origin-top bg-gradient-to-b from-gold to-transparent"
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ delay: 0.4, duration: 1.1 }}
          />
        </m.div>
      ) : null}
    </AnimatePresence>
  );
}
