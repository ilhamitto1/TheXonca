"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
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

function measureCenter(el: HTMLElement | null) {
  if (!el || typeof window === "undefined") {
    return { x: typeof window !== "undefined" ? window.innerWidth - 44 : 320, y: 44 };
  }
  const r = el.getBoundingClientRect();
  return {
    x: Math.round(r.left + r.width / 2),
    y: Math.round(r.top + r.height / 2),
  };
}

export function Navbar() {
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const { isMenuOpen, toggleMenu, setMenuOpen } = useUIStore();
  const keepVisible = pathname.startsWith("/booking");

  const menuBtnRef = useRef<HTMLButtonElement>(null);
  const [menuOrigin, setMenuOrigin] = useState({ x: 320, y: 44 });
  // Bağlanma animasiyası bitənə qədər navbar overlay-in ÜSTÜNDƏ qalır
  const [menuChrome, setMenuChrome] = useState(false);

  const onDark = menuChrome;
  const iconOpen = isMenuOpen;

  const syncOrigin = useCallback(() => {
    setMenuOrigin(measureCenter(menuBtnRef.current));
  }, []);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(latest > 24);
    if (keepVisible || menuChrome) {
      setHidden(false);
      return;
    }
    setHidden(latest > 160 && latest > prev);
  });

  useEffect(() => {
    if (menuChrome || keepVisible) setHidden(false);
  }, [menuChrome, keepVisible]);

  useEffect(() => {
    if (isMenuOpen) setMenuChrome(true);
  }, [isMenuOpen]);

  useEffect(() => {
    if (!menuChrome) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    const onResize = () => syncOrigin();
    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [menuChrome, setMenuOpen, syncOrigin]);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname, setMenuOpen]);

  useEffect(() => {
    syncOrigin();
  }, [syncOrigin]);

  const handleMenuToggle = () => {
    syncOrigin();
    toggleMenu();
  };

  return (
    <>
      <m.header
        className={cn(
          "fixed top-0 right-0 left-0 px-3 pt-[max(0.75rem,env(safe-area-inset-top))] sm:px-5 sm:pt-4",
          menuChrome ? "z-[90]" : "z-[70]",
        )}
        animate={{ y: hidden && !menuChrome ? -120 : 0 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      >
        <div
          className={cn(
            "container-lux grid grid-cols-[1fr_auto] items-center gap-2 rounded-full px-3 py-2 transition-colors duration-300 xl:grid-cols-[1fr_auto_1fr] xl:gap-4 xl:px-6 xl:py-2.5",
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
              ref={menuBtnRef}
              type="button"
              onClick={handleMenuToggle}
              className={cn(
                "relative flex h-11 w-11 shrink-0 items-center justify-center rounded-full border transition-colors duration-300 xl:hidden",
                onDark
                  ? "border-ivory/25 bg-ivory/10 text-ivory"
                  : "border-ink/10 bg-pearl/50 text-ink",
              )}
              aria-expanded={isMenuOpen}
              aria-controls="site-menu"
              aria-label={isMenuOpen ? "Menyünü bağla" : "Menyünü aç"}
            >
              <span className="relative block h-3.5 w-5" aria-hidden>
                <m.span
                  className="absolute inset-x-0 top-1/2 h-px origin-center bg-current"
                  style={{ marginTop: -0.5 }}
                  initial={false}
                  animate={{
                    rotate: iconOpen ? 45 : 0,
                    y: iconOpen ? 0 : -6,
                  }}
                  transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                />
                <m.span
                  className="absolute inset-x-0 top-1/2 h-px bg-current"
                  style={{ marginTop: -0.5 }}
                  initial={false}
                  animate={{ opacity: iconOpen ? 0 : 1 }}
                  transition={{ duration: 0.2 }}
                />
                <m.span
                  className="absolute inset-x-0 top-1/2 h-px origin-center bg-current"
                  style={{ marginTop: -0.5 }}
                  initial={false}
                  animate={{
                    rotate: iconOpen ? -45 : 0,
                    y: iconOpen ? 0 : 6,
                  }}
                  transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                />
              </span>
            </button>
          </div>
        </div>
      </m.header>
      <CinematicMenu
        origin={menuOrigin}
        onExitComplete={() => setMenuChrome(false)}
      />
    </>
  );
}
