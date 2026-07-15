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
  const { isMenuOpen, toggleMenu, setMenuOpen } = useUIStore();
  const keepVisible = pathname.startsWith("/booking");
  const onDark = isMenuOpen;

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

  // Menü açıq olanda scroll kilidi + Escape ilə bağlama
  useEffect(() => {
    if (!isMenuOpen) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [isMenuOpen, setMenuOpen]);

  // Route dəyişəndə menyünü bağla
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname, setMenuOpen]);

  return (
    <>
      <m.header
        className={cn(
          "fixed top-0 right-0 left-0 px-3 pt-[max(0.75rem,env(safe-area-inset-top))] sm:px-5 sm:pt-4",
          isMenuOpen ? "z-[90]" : "z-[70]",
        )}
        animate={{ y: hidden && !isMenuOpen ? -120 : 0 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      >
        <div
          className={cn(
            "container-lux grid grid-cols-[1fr_auto] items-center gap-2 rounded-full px-3 py-2 transition-colors duration-500 xl:grid-cols-[1fr_auto_1fr] xl:gap-4 xl:px-6 xl:py-2.5",
            onDark
              ? "bg-transparent"
              : scrolled || keepVisible
                ? "glass shadow-soft"
                : "bg-transparent",
          )}
        >
          <div className="min-w-0 justify-self-start">
            <Logo inverted={onDark} />
          </div>

          <nav className="hidden items-center justify-center gap-5 xl:flex">
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

          <div className="flex items-center justify-end gap-2 justify-self-end">
            <Button
              asChild
              variant="gold"
              size="sm"
              className={cn(
                "h-11 rounded-full px-4 text-[10px] tracking-[0.16em] sm:px-5",
                onDark && "shadow-none",
              )}
              magnetic={false}
            >
              <Link href="/booking" onClick={() => setMenuOpen(false)}>
                Rezervasiya
              </Link>
            </Button>

            <button
              type="button"
              onClick={toggleMenu}
              className={cn(
                "relative flex h-11 w-11 shrink-0 items-center justify-center rounded-full border transition-colors xl:hidden",
                onDark
                  ? "border-ivory/25 bg-ivory/10 text-ivory"
                  : "border-ink/10 bg-pearl/50 text-ink",
              )}
              aria-expanded={isMenuOpen}
              aria-controls="site-menu"
              aria-label={isMenuOpen ? "Menyünü bağla" : "Menyünü aç"}
            >
              {/* Mərkəzdən ±6px — açılanda eyni nöqtədə mükəmməl X */}
              <span className="relative block h-3.5 w-5" aria-hidden>
                <m.span
                  className="absolute inset-x-0 top-1/2 h-px origin-center bg-current"
                  style={{ marginTop: -0.5 }}
                  initial={false}
                  animate={{
                    rotate: isMenuOpen ? 45 : 0,
                    y: isMenuOpen ? 0 : -6,
                  }}
                  transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                />
                <m.span
                  className="absolute inset-x-0 top-1/2 h-px bg-current"
                  style={{ marginTop: -0.5 }}
                  initial={false}
                  animate={{ opacity: isMenuOpen ? 0 : 1 }}
                  transition={{ duration: 0.18 }}
                />
                <m.span
                  className="absolute inset-x-0 top-1/2 h-px origin-center bg-current"
                  style={{ marginTop: -0.5 }}
                  initial={false}
                  animate={{
                    rotate: isMenuOpen ? -45 : 0,
                    y: isMenuOpen ? 0 : 6,
                  }}
                  transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                />
              </span>
            </button>
          </div>
        </div>
      </m.header>
      <CinematicMenu />
    </>
  );
}
