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
          id="site-menu"
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

          <div className="container-lux relative z-10 flex h-full min-h-0 flex-col overflow-y-auto overscroll-contain px-0 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-[calc(4.75rem+env(safe-area-inset-top))] sm:pt-[calc(5.25rem+env(safe-area-inset-top))]">
            <p className="shrink-0 font-body text-[10px] uppercase tracking-[0.4em] text-gold-soft">
              Menyü
            </p>

            <m.nav
              className="my-auto flex flex-col gap-0.5 py-6 sm:gap-1 sm:py-8"
              initial="closed"
              animate="open"
              variants={{
                open: {
                  transition: { staggerChildren: 0.06, delayChildren: 0.12 },
                },
                closed: {},
              }}
            >
              {NAV_LINKS.map((link, i) => (
                <m.div key={link.href} variants={menuItem}>
                  <Link
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="group flex min-h-12 items-center gap-4 py-1.5 sm:min-h-14 sm:gap-6 sm:py-2"
                  >
                    <span className="w-6 shrink-0 font-body text-[10px] tracking-[0.3em] text-gold/70">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="font-display text-[clamp(2rem,8.5vw,5.75rem)] leading-[0.95] tracking-[-0.04em] transition-colors group-hover:text-gold-soft">
                      {link.label}
                    </span>
                  </Link>
                </m.div>
              ))}
            </m.nav>

            <m.div
              className="mt-auto flex shrink-0 flex-col gap-3 border-t border-ivory/10 pt-6 sm:flex-row sm:items-end sm:justify-between sm:gap-4 sm:pt-8"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55, duration: 0.7 }}
            >
              <div>
                <p className="font-body text-[10px] uppercase tracking-[0.3em] text-mist">
                  Atelye
                </p>
                <p className="mt-2 font-display text-xl text-ivory/90 sm:text-2xl">
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
