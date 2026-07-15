"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, m } from "motion/react";
import { useUIStore } from "@/stores/ui-store";

export function StickyMobileCta() {
  const pathname = usePathname();
  const isMenuOpen = useUIStore((s) => s.isMenuOpen);
  const [scrolledEnough, setScrolledEnough] = useState(false);
  const [nearFooter, setNearFooter] = useState(false);

  const hideRoute =
    pathname.startsWith("/booking") ||
    pathname.startsWith("/admin") ||
    pathname.startsWith("/login");

  useEffect(() => {
    const onScroll = () => setScrolledEnough(window.scrollY > 140);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setNearFooter(false);
    const footer = document.querySelector("footer");
    if (!footer) return;
    const io = new IntersectionObserver(
      ([entry]) => setNearFooter(entry.isIntersecting),
      { rootMargin: "80px 0px 0px 0px", threshold: 0.05 },
    );
    io.observe(footer);
    return () => io.disconnect();
  }, [pathname]);

  const collectionMatch = pathname.match(/^\/collections\/([^/]+)/);
  const href = collectionMatch
    ? `/booking?collection=${collectionMatch[1]}`
    : "/booking";
  const label = collectionMatch ? "Bu kolleksiyanı rezerv et" : "Rezervasiya et";

  const show = !hideRoute && scrolledEnough && !nearFooter && !isMenuOpen;

  return (
    <AnimatePresence>
      {show ? (
        <m.div
          className="pointer-events-none fixed inset-x-0 bottom-0 z-[55] xl:hidden"
          initial={{ y: 88, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 88, opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        >
          <div
            className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-ivory via-ivory/80 to-transparent"
            aria-hidden
          />
          <div className="relative px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-2 sm:px-5">
            <div className="container-lux">
              <Link
                href={href}
                className="pointer-events-auto flex h-12 w-full items-center justify-center rounded-full gradient-gold px-4 font-body text-[11px] uppercase tracking-[0.16em] text-ink shadow-gold transition active:scale-[0.98] sm:h-[3.25rem] sm:px-6 sm:text-xs sm:tracking-[0.18em]"
              >
                <span className="truncate">{label}</span>
              </Link>
            </div>
          </div>
        </m.div>
      ) : null}
    </AnimatePresence>
  );
}
