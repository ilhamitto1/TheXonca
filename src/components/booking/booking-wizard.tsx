"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Reveal } from "@/components/animations/reveal";
import { TextReveal } from "@/components/animations/text-reveal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { homeContent, servicesContent } from "@/data/content";
import { submitBooking } from "@/actions/booking";

const schema = z.object({
  date: z.string().min(1, "Tarix seçin"),
  packageId: z.string().min(1),
  themeId: z.string().min(1),
  flowers: z.string().min(1),
  guestCount: z.number().min(10).max(1000),
  budget: z.number().min(1000),
  location: z.string().min(2),
  name: z.string().min(2),
  email: z.email(),
  phone: z.string().optional(),
  notes: z.string().optional(),
});

type FormValues = z.infer<typeof schema>;

const steps = ["Tarix", "Paket", "Tema", "Detallar", "Təsdiq"] as const;

export function BookingWizard() {
  const [step, setStep] = useState(0);
  const [pending, setPending] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      date: "",
      packageId: servicesContent.packages[1].id,
      themeId: homeContent.themes[0].id,
      flowers: "Bağ gülləri, ranunkulyus, orxideyalar",
      guestCount: 120,
      budget: 25000,
      location: "",
      name: "",
      email: "",
      phone: "",
      notes: "",
    },
  });

  const next = async () => {
    const fields: (keyof FormValues)[][] = [
      ["date"],
      ["packageId"],
      ["themeId"],
      ["flowers", "guestCount", "budget", "location", "name", "email"],
      [],
    ];
    const ok = await form.trigger(fields[step]);
    if (ok) setStep((s) => Math.min(s + 1, steps.length - 1));
  };

  const onSubmit = form.handleSubmit(async (values) => {
    setPending(true);
    try {
      const result = await submitBooking({
        ...values,
        flowers: values.flowers.split(",").map((f) => f.trim()),
      });
      if (result.success) {
        toast.success("Sorğu qəbul edildi", {
          description: "Beş gün ərzində şəxsi təklif göndərəcəyik.",
        });
        form.reset();
        setStep(0);
      } else {
        toast.error(result.error || "Xəta baş verdi");
      }
    } finally {
      setPending(false);
    }
  });

  return (
    <div className="bg-ivory pb-24 pt-36">
      <div className="container-lux max-w-3xl">
        <Reveal>
          <p className="font-body text-[10px] uppercase tracking-[0.4em] text-gold-deep">
            Rezervasiya
          </p>
        </Reveal>
        <TextReveal
          text="Tarixinizi rezerv edin"
          as="h1"
          className="mt-4 font-display text-[clamp(2.8rem,7vw,4.8rem)] text-ink"
        />

        <div className="mt-10 flex flex-wrap gap-3">
          {steps.map((label, i) => (
            <div
              key={label}
              className={`font-body text-[11px] uppercase tracking-[0.2em] ${
                i === step ? "text-ink" : "text-mist"
              }`}
            >
              {String(i + 1).padStart(2, "0")} {label}
            </div>
          ))}
        </div>

        <form onSubmit={onSubmit} className="mt-12 space-y-8 border border-ink/8 bg-pearl p-6 sm:p-10">
          {step === 0 && (
            <div className="space-y-3">
              <Label htmlFor="date">Bayram tarixi</Label>
              <Input id="date" type="date" {...form.register("date")} />
            </div>
          )}

          {step === 1 && (
            <div className="grid gap-4">
              {servicesContent.packages.map((pkg) => (
                <label
                  key={pkg.id}
                  className={`cursor-pointer border p-5 transition ${
                    form.watch("packageId") === pkg.id
                      ? "border-gold bg-cream"
                      : "border-ink/10"
                  }`}
                >
                  <input
                    type="radio"
                    value={pkg.id}
                    className="sr-only"
                    {...form.register("packageId")}
                  />
                  <p className="font-display text-2xl">{pkg.name}</p>
                  <p className="mt-1 font-body text-sm text-stone">
                    {pkg.description}
                  </p>
                </label>
              ))}
            </div>
          )}

          {step === 2 && (
            <div className="grid gap-4 sm:grid-cols-2">
              {homeContent.themes.map((theme) => (
                <label
                  key={theme.id}
                  className={`cursor-pointer border p-5 ${
                    form.watch("themeId") === theme.id
                      ? "border-gold bg-cream"
                      : "border-ink/10"
                  }`}
                >
                  <input
                    type="radio"
                    value={theme.id}
                    className="sr-only"
                    {...form.register("themeId")}
                  />
                  <p className="font-display text-xl">{theme.name}</p>
                  <p className="mt-2 font-body text-sm text-stone">
                    {theme.description}
                  </p>
                </label>
              ))}
            </div>
          )}

          {step === 3 && (
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="sm:col-span-2 space-y-3">
                <Label htmlFor="flowers">Seçilmiş güllər</Label>
                <Input id="flowers" {...form.register("flowers")} />
              </div>
              <div className="space-y-3">
                <Label htmlFor="guestCount">Qonaq sayı</Label>
                <Input
                  id="guestCount"
                  type="number"
                  {...form.register("guestCount", { valueAsNumber: true })}
                />
              </div>
              <div className="space-y-3">
                <Label htmlFor="budget">Büdcə (USD)</Label>
                <Input
                  id="budget"
                  type="number"
                  {...form.register("budget", { valueAsNumber: true })}
                />
              </div>
              <div className="sm:col-span-2 space-y-3">
                <Label htmlFor="location">Məkan / ünvan</Label>
                <Input id="location" {...form.register("location")} />
              </div>
              <div className="space-y-3">
                <Label htmlFor="name">Tam ad</Label>
                <Input id="name" {...form.register("name")} />
              </div>
              <div className="space-y-3">
                <Label htmlFor="email">E-poçt</Label>
                <Input id="email" type="email" {...form.register("email")} />
              </div>
              <div className="sm:col-span-2 space-y-3">
                <Label htmlFor="notes">Qeydlər</Label>
                <Textarea id="notes" {...form.register("notes")} />
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-3 font-body text-sm text-stone">
              <p>
                <span className="text-ink">Tarix:</span> {form.watch("date")}
              </p>
              <p>
                <span className="text-ink">Paket:</span>{" "}
                {form.watch("packageId")}
              </p>
              <p>
                <span className="text-ink">Tema:</span> {form.watch("themeId")}
              </p>
              <p>
                <span className="text-ink">Qonaqlar:</span>{" "}
                {form.watch("guestCount")} · Büdcə ${form.watch("budget")}
              </p>
              <p>
                <span className="text-ink">Məkan:</span>{" "}
                {form.watch("location")}
              </p>
              <p className="pt-4 text-xs uppercase tracking-[0.2em] text-gold-deep">
                Ödəniş hazırdır — Stripe checkout təklif təsdiqləndikdən sonra aktivləşir.
              </p>
            </div>
          )}

          <div className="flex flex-wrap gap-3 pt-4">
            {step > 0 && (
              <Button
                type="button"
                variant="outline"
                onClick={() => setStep((s) => s - 1)}
              >
                Geri
              </Button>
            )}
            {step < steps.length - 1 ? (
              <Button type="button" variant="gold" onClick={next}>
                Davam et
              </Button>
            ) : (
              <Button type="submit" variant="gold" disabled={pending}>
                {pending ? "Göndərilir..." : "Sorğunu göndər"}
              </Button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
