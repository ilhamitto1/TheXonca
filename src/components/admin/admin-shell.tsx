"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import {
  LayoutDashboard,
  CalendarDays,
  Images,
  Package,
  FileText,
  Users,
  MessageSquare,
  Settings,
  Sparkles,
  Truck,
  Sun,
  Moon,
  LogOut,
  Menu,
  X,
  BookOpen,
} from "lucide-react";
import { useState } from "react";
import { signOut } from "next-auth/react";
import { cn } from "@/lib/utils";
import { m, AnimatePresence } from "motion/react";

const links = [
  { href: "/admin", label: "Ümumi baxış", icon: LayoutDashboard },
  { href: "/admin/collections", label: "Kolleksiyalar", icon: Package },
  { href: "/admin/reservations", label: "Rezervasiyalar", icon: CalendarDays },
  { href: "/admin/delivery", label: "Çatdırılma", icon: Truck },
  { href: "/admin/catalog", label: "Kataloq", icon: BookOpen },
  { href: "/admin/gallery", label: "Qalereya", icon: Images },
  { href: "/admin/homepage", label: "Ana səhifə CMS", icon: Sparkles },
  { href: "/admin/messages", label: "Mesajlar", icon: MessageSquare },
  { href: "/admin/users", label: "İstifadəçilər", icon: Users },
  { href: "/admin/blog", label: "Bloq", icon: FileText },
  { href: "/admin/settings", label: "Parametrlər", icon: Settings },
];

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);

  const Nav = (
    <nav className="space-y-1">
      {links.map((link) => {
        const active =
          link.href === "/admin"
            ? pathname === "/admin"
            : pathname.startsWith(link.href);
        const Icon = link.icon;
        return (
          <Link
            key={link.href}
            href={link.href}
            onClick={() => setOpen(false)}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition",
              active
                ? "bg-gold/20 text-gold-soft"
                : "text-mist hover:bg-ivory/5 hover:text-ivory",
            )}
          >
            <Icon className="h-4 w-4" />
            {link.label}
          </Link>
        );
      })}
    </nav>
  );

  return (
    <div className="min-h-screen bg-espresso text-ivory">
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 border-r border-ivory/10 bg-charcoal/80 p-5 backdrop-blur lg:block">
        <Link href="/admin" className="font-display text-2xl tracking-tight">
          Xonca <span className="text-gold">Admin</span>
        </Link>
        <div className="mt-8">{Nav}</div>
      </aside>

      <div className="lg:pl-64">
        <header className="sticky top-0 z-30 flex items-center justify-between border-b border-ivory/10 bg-espresso/80 px-4 py-3 backdrop-blur sm:px-6">
          <button
            type="button"
            className="lg:hidden"
            onClick={() => setOpen(true)}
            aria-label="Menyünü aç"
          >
            <Menu className="h-5 w-5" />
          </button>
          <p className="font-body text-xs uppercase tracking-[0.25em] text-mist">
            Xonça Rezervasiya Paneli
          </p>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-ivory/10"
              aria-label="Temanı dəyiş"
            >
              {theme === "dark" ? (
                <Sun className="h-4 w-4" />
              ) : (
                <Moon className="h-4 w-4" />
              )}
            </button>
            <button
              type="button"
              onClick={() => signOut({ callbackUrl: "/" })}
              className="flex h-9 items-center gap-2 rounded-full border border-ivory/10 px-3 text-xs uppercase tracking-[0.15em]"
            >
              <LogOut className="h-3.5 w-3.5" />
              Çıxış
            </button>
          </div>
        </header>
        <main className="p-4 sm:p-6 lg:p-8">{children}</main>
      </div>

      <AnimatePresence>
        {open ? (
          <m.div
            className="fixed inset-0 z-50 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <button
              type="button"
              className="absolute inset-0 bg-ink/70"
              onClick={() => setOpen(false)}
              aria-label="Menyünü bağla"
            />
            <m.aside
              className="absolute inset-y-0 left-0 w-72 bg-charcoal p-5"
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
            >
              <div className="mb-6 flex items-center justify-between">
                <p className="font-display text-xl">Menyü</p>
                <button type="button" onClick={() => setOpen(false)}>
                  <X className="h-5 w-5" />
                </button>
              </div>
              {Nav}
            </m.aside>
          </m.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
