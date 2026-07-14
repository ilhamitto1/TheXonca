"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function LoginPage() {
  const router = useRouter();
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setPending(true);
    setError(null);
    const form = new FormData(e.currentTarget);
    const res = await signIn("credentials", {
      email: String(form.get("email")),
      password: String(form.get("password")),
      redirect: false,
    });
    setPending(false);
    if (res?.error) {
      setError("Yanlış məlumatlar");
      return;
    }
    router.push("/admin");
    router.refresh();
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-espresso px-4">
      <form
        onSubmit={onSubmit}
        className="w-full max-w-md border border-ivory/10 bg-charcoal/80 p-8 text-ivory backdrop-blur"
      >
        <p className="font-body text-[10px] uppercase tracking-[0.35em] text-gold-soft">
          Atelye giriş
        </p>
        <h1 className="mt-3 font-display text-4xl">Daxil ol</h1>
        <div className="mt-8 space-y-5">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-mist">
              E-poçt
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              required
              className="border-ivory/15 bg-ink/40 text-ivory"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password" className="text-mist">
              Şifrə
            </Label>
            <Input
              id="password"
              name="password"
              type="password"
              required
              className="border-ivory/15 bg-ink/40 text-ivory"
            />
          </div>
          {error ? <p className="text-sm text-red-300">{error}</p> : null}
          <Button type="submit" variant="gold" className="w-full" disabled={pending}>
            {pending ? "Daxil olunur..." : "Panelə keç"}
          </Button>
        </div>
        <Link href="/" className="mt-6 inline-block text-sm text-mist hover:text-ivory">
          ← Sayta qayıt
        </Link>
      </form>
    </div>
  );
}
