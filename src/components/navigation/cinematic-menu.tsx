"use client";

import Link from "next/link";
import { AnimatePresence, m } from "motion/react";
import { useUIStore } from "@/stores/ui-store";
import { NAV_LINKS, SITE } from "@/lib/constants/site";
import { menuItem, menuOverlay } from "@/lib/animations/variants";

export function CinematicMenu() {
  const { isMenuOpen, setMenuOpen } = useUIStore();

  return (
    <AnimatePresence>
      {isMenuOpen ? (
        <m.div
          className="fixed inset-0 z-[80] flex flex-col overflow-hidden bg-espresso text-ivory"
          variants={menuOverlay}
          initial="closed"
          animate="open"
          exit="closed"
          role="dialog"
          aria-modal="true"
          aria-label="Əsas menyü"
        >
          <div className="pointer-events-none absolute inset-0 opacity-40">
            <div className="absolute -top-32 -right-20 h-[28rem] w-[28rem] rounded-full bg-gold/20 blur-3xl" />
            <div className="absolute bottom-0 left-0 h-[22rem] w-[22rem] rounded-full bg-blush/10 blur-3xl" />
            <div className="absolute inset-0 noise-overlay" />
          </div>

          <div className="container-lux relative z-10 flex h-full flex-col overflow-y-auto overscroll-contain py-6 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-[max(1.5rem,env(safe-area-inset-top))]">
            <div className="flex items-center justify-between">
              <p className="font-body text-[10px] uppercase tracking-[0.4em] text-gold-soft">
                Menyü
              </p>
              <button
                type="button"
                onClick={() => setMenuOpen(false)}
                className="flex h-11 items-center rounded-full border border-ivory/15 px-5 font-body text-xs uppercase tracking-[0.25em] text-ivory/90"
              >
                Bağla
              </button>
            </div>

            <m.nav
              className="my-auto flex flex-col gap-1 py-8 sm:gap-2"
              initial="closed"
              animate="open"
              variants={{
                open: { transition: { staggerChildren: 0.06, delayChildren: 0.15 } },
                closed: {},
              }}
            >
              {NAV_LINKS.map((link, i) => (
                <m.div key={link.href} variants={menuItem}>
                  <Link
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="group flex min-h-14 items-center gap-4 py-2 sm:gap-6"
                  >
                    <span className="font-body text-[10px] tracking-[0.3em] text-gold/70">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="font-display text-[clamp(2.2rem,9vw,6.5rem)] leading-[0.95] tracking-[-0.04em] transition-colors group-hover:text-gold-soft">
                      {link.label}
                    </span>
                  </Link>
                </m.div>
              ))}
            </m.nav>

            <m.div
              className="flex flex-col gap-4 border-t border-ivory/10 pt-8 sm:flex-row sm:items-end sm:justify-between"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.8 }}
            >
              <div>
                <p className="font-body text-[10px] uppercase tracking-[0.3em] text-mist">
                  Atelye
                </p>
                <p className="mt-2 font-display text-2xl text-ivory/90">
                  {SITE.address.line1}, {SITE.address.city}
                </p>
              </div>
              <a
                href={`mailto:${SITE.email}`}
                className="font-body text-sm tracking-wide text-gold-soft transition hover:text-ivory"
              >
                {SITE.email}
              </a>
            </m.div>
          </div>
        </m.div>
      ) : null}
    </AnimatePresence>
  );
}
