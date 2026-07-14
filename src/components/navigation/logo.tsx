"use client";

import Link from "next/link";
import { m } from "motion/react";
import { SITE } from "@/lib/constants/site";
import { cn } from "@/lib/utils";

export function Logo({
  className,
  inverted = false,
}: {
  className?: string;
  inverted?: boolean;
}) {
  return (
    <Link
      href="/"
      className={cn("group relative inline-flex items-center", className)}
      aria-label={SITE.name}
    >
      <m.span
        className={cn(
          "font-display text-2xl tracking-[-0.03em] transition-colors sm:text-[1.7rem]",
          inverted ? "text-ivory" : "text-ink group-hover:text-gold-deep",
        )}
        whileHover={{ letterSpacing: "0.02em" }}
        transition={{ duration: 0.5 }}
      >
        The{" "}
        <span className="relative inline-block">
          Xonca
          <m.span
            aria-hidden
            className="absolute -bottom-1 left-0 h-px w-full origin-left gradient-gold"
            initial={{ scaleX: 0.35 }}
            whileHover={{ scaleX: 1 }}
          />
        </span>
      </m.span>
    </Link>
  );
}
