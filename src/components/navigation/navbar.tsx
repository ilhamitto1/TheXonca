"use client";

import Link from "next/link";
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
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const { isMenuOpen, toggleMenu } = useUIStore();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(latest > 40);
    setHidden(latest > 180 && latest > prev);
  });

  useEffect(() => {
    if (isMenuOpen) setHidden(false);
  }, [isMenuOpen]);

  return (
    <>
      <m.header
        className="fixed top-0 right-0 left-0 z-[70] px-3 pt-3 sm:px-5 sm:pt-4"
        animate={{
          y: hidden && !isMenuOpen ? -120 : 0,
        }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      >
        <m.div
          className={cn(
            "container-lux flex items-center justify-between rounded-full px-4 py-3 transition-all duration-700 sm:px-6",
            scrolled || isMenuOpen ? "glass shadow-soft" : "bg-transparent",
          )}
          layout
        >
          <Logo inverted={isMenuOpen && !scrolled} />

          <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-6 xl:flex">
            {DESKTOP_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="group relative font-body text-[11px] uppercase tracking-[0.22em] text-ink/80 transition hover:text-ink"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 gradient-gold transition-transform duration-500 group-hover:scale-x-100" />
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <Button
              asChild
              variant="gold"
              size="sm"
              className="hidden sm:inline-flex"
              magnetic={false}
            >
              <Link href="/booking">Rezervasiya</Link>
            </Button>

            <button
              type="button"
              onClick={toggleMenu}
              className="group relative flex h-11 w-11 items-center justify-center"
              aria-expanded={isMenuOpen}
              aria-label={isMenuOpen ? "Menyünü bağla" : "Menyünü aç"}
            >
              <span className="sr-only">Menyü</span>
              <span className="relative flex h-4 w-6 flex-col justify-between">
                <m.span
                  className="h-px w-full bg-ink origin-center"
                  animate={
                    isMenuOpen ? { rotate: 45, y: 7.5 } : { rotate: 0, y: 0 }
                  }
                />
                <m.span
                  className="h-px w-full bg-ink"
                  animate={isMenuOpen ? { opacity: 0 } : { opacity: 1 }}
                />
                <m.span
                  className="h-px w-full bg-ink origin-center"
                  animate={
                    isMenuOpen ? { rotate: -45, y: -7.5 } : { rotate: 0, y: 0 }
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
