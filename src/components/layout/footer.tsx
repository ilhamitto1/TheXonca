"use client";

import Link from "next/link";
import { m } from "motion/react";
import { Logo } from "@/components/navigation/logo";
import { FOOTER_LINKS, SITE } from "@/lib/constants/site";
import { collections } from "@/data/collections";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-ink text-ivory">
      <m.div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-30"
        animate={{
          backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
        }}
        transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 20%, rgba(212,188,150,0.18), transparent 35%), radial-gradient(circle at 80% 70%, rgba(230,212,206,0.12), transparent 40%)",
          backgroundSize: "200% 200%",
        }}
      />

      <div className="container-lux relative z-10 pt-24 pb-10">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_1fr]">
          <div>
            <p className="font-body text-[10px] uppercase tracking-[0.4em] text-gold-soft">
              Premium Xonça Evi
            </p>
            <h2 className="mt-6 font-display text-[clamp(3rem,10vw,7rem)] leading-[0.9] tracking-[-0.04em]">
              The
              <br />
              Xonca
            </h2>
            <p className="mt-8 max-w-md font-body text-sm leading-relaxed text-mist">
              {SITE.tagline}
            </p>
          </div>

          <form
            className="glass-dark p-6 sm:p-8"
            onSubmit={(e) => e.preventDefault()}
          >
            <p className="font-display text-2xl">Atelye qeydləri</p>
            <p className="mt-2 font-body text-sm text-mist">
              Yeni kolleksiyalar və özəl açılışlar.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Input
                type="email"
                required
                placeholder="E-poçtunuz"
                className="border-ivory/15 bg-ink/40 text-ivory placeholder:text-mist/70"
              />
              <Button type="submit" variant="gold" className="shrink-0">
                Qoşul
              </Button>
            </div>
          </form>
        </div>

        <div className="mt-16 grid gap-10 border-y border-ivory/10 py-12 md:grid-cols-4">
          <div>
            <Logo inverted />
            <p className="mt-4 font-body text-sm text-mist">
              {SITE.address.line1}
              <br />
              {SITE.address.city}, {SITE.address.country}
            </p>
          </div>
          {(
            [
              ["Atelye", FOOTER_LINKS.atelier],
              ["Təcrübələr", FOOTER_LINKS.experiences],
              ["Ev", FOOTER_LINKS.atelierHouse],
            ] as const
          ).map(([title, links]) => (
            <div key={title}>
              <p className="font-body text-[10px] uppercase tracking-[0.3em] text-gold-soft">
                {title}
              </p>
              <ul className="mt-5 space-y-3">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="font-body text-sm text-mist transition hover:text-ivory"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap gap-3">
          {collections.slice(0, 6).map((c) => (
            <Link
              key={c.id}
              href={`/collections/${c.slug}`}
              className="border border-ivory/10 px-4 py-2 font-body text-xs text-mist transition hover:border-gold hover:text-ivory"
            >
              {c.name}
            </Link>
          ))}
        </div>

        <div className="mt-10 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <p className="font-body text-xs text-mist/70">
            © {new Date().getFullYear()} {SITE.name}. Bütün hüquqlar qorunur.
          </p>
          <div className="gold-line w-32" />
        </div>
      </div>
    </footer>
  );
}
