"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { m, useMotionValueEvent, useScroll } from "motion/react";
import { Logo } from "@/components/navigation/logo";
import { CinematicMenu } from "@/components/navigation/cinematic-menu";
import { Button } from "@/components/ui/button";
import { useUIStore } from "@/stores/ui-store";
import { cn } from "@/lib/utils";

const DESKTOP_LINKS = [
  { label: "Ana səhifə", href: "/" },
  { label: "Kolleksiyalar", href: "/collections" },
  { label: "Haqqımızda", href: "/about" },
  { label: "Kataloq", href: "/catalog" },
  { label: "Əlaqə", href: "/contact" },
];

export function Navbar() {
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const { isMenuOpen, toggleMenu } = useUIStore();
  const keepVisible = pathname.startsWith("/booking");

  useMotionValueEvent(scrollY, "change", (latest) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(latest > 24);
    if (keepVisible || isMenuOpen) {
      setHidden(false);
      return;
    }
    setHidden(latest > 160 && latest > prev);
  });

  useEffect(() => {
    if (isMenuOpen || keepVisible) setHidden(false);
  }, [isMenuOpen, keepVisible]);

  return (
    <>
      <m.header
        className="fixed top-0 right-0 left-0 z-[70] px-3 pt-3 sm:px-5 sm:pt-4"
        animate={{ y: hidden && !isMenuOpen ? -120 : 0 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      >
        <m.div
          className={cn(
            "container-lux flex items-center justify-between rounded-full px-3 py-2.5 transition-all duration-500 sm:px-6 sm:py-3",
            scrolled || isMenuOpen || keepVisible
              ? "glass shadow-soft"
              : "bg-transparent",
          )}
          layout
        >
          <Logo inverted={isMenuOpen && !scrolled} />

          <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-5 xl:flex">
            {DESKTOP_LINKS.map((link) => {
              const active =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "group relative font-body text-[11px] uppercase tracking-[0.2em] transition",
                    active ? "text-ink" : "text-ink/70 hover:text-ink",
                  )}
                >
                  {link.label}
                  <span
                    className={cn(
                      "absolute -bottom-1 left-0 h-px w-full origin-left gradient-gold transition-transform duration-500",
                      active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100",
                    )}
                  />
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <Button
              asChild
              variant="gold"
              size="sm"
              className="h-10 px-4 text-[10px] sm:h-10 sm:px-5"
              magnetic={false}
            >
              <Link href="/booking">Rezervasiya</Link>
            </Button>

            <button
              type="button"
              onClick={toggleMenu}
              className="relative flex h-11 w-11 items-center justify-center rounded-full border border-ink/10 bg-pearl/50 xl:hidden"
              aria-expanded={isMenuOpen}
              aria-label={isMenuOpen ? "Menyünü bağla" : "Menyünü aç"}
            >
              <span className="relative flex h-3.5 w-5 flex-col justify-between">
                <m.span
                  className="h-px w-full origin-center bg-ink"
                  animate={isMenuOpen ? { rotate: 45, y: 6.5 } : { rotate: 0, y: 0 }}
                />
                <m.span
                  className="h-px w-full bg-ink"
                  animate={isMenuOpen ? { opacity: 0 } : { opacity: 1 }}
                />
                <m.span
                  className="h-px w-full origin-center bg-ink"
                  animate={
                    isMenuOpen ? { rotate: -45, y: -6.5 } : { rotate: 0, y: 0 }
                  }
                />
              </span>
            </button>
          </div>
        </m.div>
      </m.header>
      <CinematicMenu />
    </>
  );
}
