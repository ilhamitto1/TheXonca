"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function StickyMobileCta() {
  const pathname = usePathname();
  const hide =
    pathname.startsWith("/booking") ||
    pathname.startsWith("/admin") ||
    pathname.startsWith("/login");

  if (hide) return null;

  const collectionMatch = pathname.match(/^\/collections\/([^/]+)/);
  const href = collectionMatch
    ? `/booking?collection=${collectionMatch[1]}`
    : "/booking";
  const label = collectionMatch ? "Bu kolleksiyanı rezerv et" : "Rezervasiya et";

  return (
    <div className="fixed inset-x-0 bottom-0 z-[55] px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-2 sm:hidden">
      <Link
        href={href}
        className="flex h-12 items-center justify-center rounded-full gradient-gold font-body text-xs uppercase tracking-[0.18em] text-ink shadow-gold"
      >
        {label}
      </Link>
    </div>
  );
}
