"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { AnimatePresence, m } from "motion/react";
import { Reveal } from "@/components/animations/reveal";
import { TextReveal } from "@/components/animations/text-reveal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  collections,
  getCollectionBySlug,
  getDemoUnavailableDates,
} from "@/data/collections";
import { formatCurrency } from "@/lib/utils";
import { calculateReservationTotal } from "@/lib/utils/pricing";
import { openReservationWhatsApp } from "@/lib/whatsapp";
import { useDeliveryStore } from "@/stores/delivery-store";
import type { Collection, ReservationPayload } from "@/types";
import { submitReservation } from "@/actions/reservation";

const steps = [
  "Kolleksiya",
  "Tarix",
  "Say",
  "Tumba",
  "Çatdırılma",
  "Məlumat",
  "Xülasə",
  "Rezerv",
] as const;

function Calendar({
  value,
  onChange,
  unavailable,
}: {
  value: string;
  onChange: (v: string) => void;
  unavailable: string[];
}) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const days = Array.from({ length: 42 }).map((_, i) => {
    const start = new Date(today);
    start.setDate(today.getDate() + i);
    return start;
  });

  return (
    <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-6">
      {days.map((day) => {
        const iso = day.toISOString().slice(0, 10);
        const disabled = unavailable.includes(iso);
        const selected = value === iso;
        return (
          <button
            key={iso}
            type="button"
            disabled={disabled}
            onClick={() => onChange(iso)}
            className={`min-h-16 border px-2 py-3 text-left transition ${
              disabled
                ? "cursor-not-allowed border-ink/5 bg-sand/40 text-mist"
                : selected
                  ? "border-gold bg-cream"
                  : "border-ink/10 hover:border-gold"
            }`}
          >
            <span className="block font-body text-[10px] uppercase tracking-[0.15em] text-stone">
              {day.toLocaleDateString("az-AZ", { weekday: "short" })}
            </span>
            <span className="mt-1 block font-display text-lg">
              {day.toLocaleDateString("az-AZ", {
                day: "2-digit",
                month: "short",
              })}
            </span>
          </button>
        );
      })}
    </div>
  );
}

export function ReservationWizard() {
  const searchParams = useSearchParams();
  const initialSlug = searchParams.get("collection") || collections[0].slug;
  const deliveryStore = useDeliveryStore();

  const [step, setStep] = useState(0);
  const [collectionSlug, setCollectionSlug] = useState(initialSlug);
  const [date, setDate] = useState("");
  const [xoncaQuantity, setXoncaQuantity] = useState(1);
  const [needTumba, setNeedTumba] = useState(false);
  const [tumbaQuantity, setTumbaQuantity] = useState(1);
  const [needDelivery, setNeedDelivery] = useState(false);
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [restaurantName, setRestaurantName] = useState("");
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [notes, setNotes] = useState("");
  const [error, setError] = useState<string | null>(null);

  const collection = (getCollectionBySlug(collectionSlug) ||
    collections[0]) as Collection;

  const unavailable = useMemo(() => {
    return [
      ...getDemoUnavailableDates(),
      ...collection.unavailableDates,
    ];
  }, [collection.unavailableDates]);

  const pricing = calculateReservationTotal({
    collection,
    xoncaQuantity,
    needTumba: collection.tumbaIncluded ? false : needTumba,
    tumbaQuantity: collection.tumbaIncluded ? 0 : tumbaQuantity,
    needDelivery: deliveryStore.enabled && needDelivery,
    deliveryPriceOverride: deliveryStore.price,
  });

  const canNext = () => {
    switch (step) {
      case 0:
        return Boolean(collectionSlug);
      case 1:
        return Boolean(date) && !unavailable.includes(date);
      case 2:
        return xoncaQuantity >= 1 && xoncaQuantity <= collection.maxQuantity;
      case 3:
        if (collection.tumbaIncluded) return true;
        if (!collection.tumbaOptional) return true;
        return !needTumba || tumbaQuantity >= 1;
      case 4:
        if (!needDelivery) return true;
        return deliveryAddress.trim().length > 3;
      case 5:
        return (
          name.trim().length > 1 &&
          surname.trim().length > 1 &&
          phone.trim().length > 6 &&
          restaurantName.trim().length > 1
        );
      default:
        return true;
    }
  };

  const next = () => {
    if (!canNext()) {
      setError("Zəhmət olmasa bu addımı tamamlayın.");
      return;
    }
    setError(null);
    setStep((s) => Math.min(s + 1, steps.length - 1));
  };

  const buildPayload = (): ReservationPayload => ({
    collectionId: collection.id,
    collectionSlug: collection.slug,
    collectionName: collection.name,
    date,
    xoncaQuantity,
    needTumba: collection.tumbaIncluded ? true : needTumba,
    tumbaQuantity: collection.tumbaIncluded
      ? xoncaQuantity
      : needTumba
        ? tumbaQuantity
        : 0,
    needDelivery: deliveryStore.enabled && needDelivery,
    deliveryFee: pricing.deliveryFee,
    name,
    surname,
    phone,
    email: email || undefined,
    restaurantName,
    deliveryAddress: needDelivery ? deliveryAddress : "",
    notes,
    unitPrice: pricing.unitPrice,
    tumbaUnitPrice: pricing.tumbaUnitPrice,
    subtotal: pricing.subtotal,
    total: pricing.total,
  });

  const reserve = async () => {
    const payload = buildPayload();
    await submitReservation(payload);
    openReservationWhatsApp(payload);
  };

  return (
    <div className="bg-ivory pb-24 pt-36">
      <div className="container-lux max-w-3xl">
        <Reveal>
          <p className="font-body text-[10px] uppercase tracking-[0.4em] text-gold-deep">
            Rezervasiya
          </p>
        </Reveal>
        <TextReveal
          text="Lüks rezervasiya axını"
          as="h1"
          className="mt-4 font-display text-[clamp(2.6rem,6vw,4.5rem)] text-ink"
        />

        <div className="mt-8 flex gap-1 overflow-x-auto pb-2">
          {steps.map((label, i) => (
            <div
              key={label}
              className={`min-w-[4.5rem] flex-1 border-b-2 pb-2 text-center font-body text-[10px] uppercase tracking-[0.12em] ${
                i === step
                  ? "border-gold text-ink"
                  : i < step
                    ? "border-gold/40 text-stone"
                    : "border-ink/10 text-mist"
              }`}
            >
              {String(i + 1).padStart(2, "0")}
              <span className="mt-1 hidden sm:block">{label}</span>
            </div>
          ))}
        </div>

        <div className="mt-10 min-h-[22rem] border border-ink/8 bg-pearl/80 p-5 backdrop-blur sm:p-8">
          <AnimatePresence mode="wait">
            <m.div
              key={step}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              {step === 0 && (
                <div className="grid gap-3">
                  <p className="font-display text-2xl">Kolleksiya seçin</p>
                  {collections.map((c) => (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() => setCollectionSlug(c.slug)}
                      className={`border p-4 text-left transition ${
                        collectionSlug === c.slug
                          ? "border-gold bg-cream"
                          : "border-ink/10"
                      }`}
                    >
                      <p className="font-display text-xl">{c.name}</p>
                      <p className="mt-1 font-body text-sm text-stone">
                        {c.shortDescription}
                      </p>
                      <p className="mt-2 text-sm text-gold-deep">
                        {formatCurrency(c.discountPrice ?? c.price, "AZN")}
                      </p>
                    </button>
                  ))}
                </div>
              )}

              {step === 1 && (
                <div>
                  <p className="font-display text-2xl">Tarix seçin</p>
                  <p className="mt-2 font-body text-sm text-stone">
                    Mövcud olmayan tarixlər deaktivdir.
                  </p>
                  <div className="mt-6">
                    <Calendar
                      value={date}
                      onChange={setDate}
                      unavailable={unavailable}
                    />
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-4">
                  <p className="font-display text-2xl">Xonça sayı</p>
                  <Label htmlFor="qty">Minimum 1 · Maksimum {collection.maxQuantity}</Label>
                  <Input
                    id="qty"
                    type="number"
                    min={1}
                    max={collection.maxQuantity}
                    value={xoncaQuantity}
                    onChange={(e) =>
                      setXoncaQuantity(
                        Math.min(
                          collection.maxQuantity,
                          Math.max(1, Number(e.target.value) || 1),
                        ),
                      )
                    }
                  />
                </div>
              )}

              {step === 3 && (
                <div className="space-y-5">
                  <p className="font-display text-2xl">Tumba (Stand) lazımdır?</p>
                  {collection.tumbaIncluded ? (
                    <p className="font-body text-sm text-stone">
                      Bu kolleksiyada tumba daxildir.
                    </p>
                  ) : !collection.tumbaOptional ? (
                    <p className="font-body text-sm text-stone">
                      Bu kolleksiyada tumba seçimi yoxdur.
                    </p>
                  ) : (
                    <>
                      <div className="flex gap-3">
                        {(["Bəli", "Xeyr"] as const).map((label) => {
                          const yes = label === "Bəli";
                          return (
                            <button
                              key={label}
                              type="button"
                              onClick={() => setNeedTumba(yes)}
                              className={`h-12 flex-1 border font-body text-xs uppercase tracking-[0.2em] ${
                                needTumba === yes
                                  ? "border-gold bg-cream"
                                  : "border-ink/10"
                              }`}
                            >
                              {label}
                            </button>
                          );
                        })}
                      </div>
                      {needTumba ? (
                        <div className="space-y-2">
                          <Label htmlFor="tumbaQty">Tumba sayı</Label>
                          <Input
                            id="tumbaQty"
                            type="number"
                            min={1}
                            max={collection.maxQuantity}
                            value={tumbaQuantity}
                            onChange={(e) =>
                              setTumbaQuantity(
                                Math.max(1, Number(e.target.value) || 1),
                              )
                            }
                          />
                          <p className="text-sm text-stone">
                            Qiymət:{" "}
                            {formatCurrency(collection.tumbaPrice, "AZN")} / ədəd
                          </p>
                        </div>
                      ) : null}
                    </>
                  )}
                </div>
              )}

              {step === 4 && (
                <div className="space-y-5">
                  <p className="font-display text-2xl">Çatdırılma lazımdır?</p>
                  {!deliveryStore.enabled || !collection.deliveryAvailable ? (
                    <p className="font-body text-sm text-stone">
                      Hal-hazırda çatdırılma deaktivdir.
                    </p>
                  ) : (
                    <>
                      <div className="flex gap-3">
                        {(["Bəli", "Xeyr"] as const).map((label) => {
                          const yes = label === "Bəli";
                          return (
                            <button
                              key={label}
                              type="button"
                              onClick={() => setNeedDelivery(yes)}
                              className={`h-12 flex-1 border font-body text-xs uppercase tracking-[0.2em] ${
                                needDelivery === yes
                                  ? "border-gold bg-cream"
                                  : "border-ink/10"
                              }`}
                            >
                              {label}
                            </button>
                          );
                        })}
                      </div>
                      {needDelivery ? (
                        <div className="space-y-3">
                          <p className="font-body text-sm text-gold-deep">
                            Çatdırılma haqqı:{" "}
                            {formatCurrency(deliveryStore.price, "AZN")}
                          </p>
                          <Label htmlFor="address">Çatdırılma ünvanı</Label>
                          <Textarea
                            id="address"
                            value={deliveryAddress}
                            onChange={(e) => setDeliveryAddress(e.target.value)}
                            placeholder="Küçə, bina, məkan"
                          />
                        </div>
                      ) : null}
                    </>
                  )}
                </div>
              )}

              {step === 5 && (
                <div className="grid gap-4 sm:grid-cols-2">
                  <p className="font-display text-2xl sm:col-span-2">
                    Müştəri məlumatları
                  </p>
                  <div className="space-y-2">
                    <Label htmlFor="name">Ad</Label>
                    <Input
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="surname">Soyad</Label>
                    <Input
                      id="surname"
                      value={surname}
                      onChange={(e) => setSurname(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Telefon</Label>
                    <Input
                      id="phone"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+994..."
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">E-poçt (opsional)</Label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2 sm:col-span-2">
                    <Label htmlFor="restaurant">Restoran adı</Label>
                    <Input
                      id="restaurant"
                      value={restaurantName}
                      onChange={(e) => setRestaurantName(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2 sm:col-span-2">
                    <Label htmlFor="notes">Qeyd</Label>
                    <Textarea
                      id="notes"
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                    />
                  </div>
                </div>
              )}

              {step === 6 && (
                <div className="space-y-3 font-body text-sm text-stone">
                  <p className="font-display text-2xl text-ink">Xülasə</p>
                  <p>
                    <span className="text-ink">Kolleksiya:</span>{" "}
                    {collection.name}
                  </p>
                  <p>
                    <span className="text-ink">Tarix:</span> {date}
                  </p>
                  <p>
                    <span className="text-ink">Xonça sayı:</span> {xoncaQuantity}
                  </p>
                  <p>
                    <span className="text-ink">Tumba:</span>{" "}
                    {collection.tumbaIncluded || needTumba ? "Bəli" : "Xeyr"}
                    {(collection.tumbaIncluded || needTumba) &&
                      ` (${collection.tumbaIncluded ? xoncaQuantity : tumbaQuantity})`}
                  </p>
                  <p>
                    <span className="text-ink">Çatdırılma:</span>{" "}
                    {needDelivery ? "Bəli" : "Xeyr"}
                  </p>
                  <div className="mt-4 space-y-1 border-t border-ink/10 pt-4">
                    <p>
                      Xonça: {formatCurrency(pricing.xoncaTotal, "AZN")}
                    </p>
                    <p>
                      Tumba: {formatCurrency(pricing.tumbaTotal, "AZN")}
                    </p>
                    <p>
                      Çatdırılma: {formatCurrency(pricing.deliveryFee, "AZN")}
                    </p>
                    <p className="pt-2 font-display text-2xl text-gold-deep">
                      Ümumi: {formatCurrency(pricing.total, "AZN")}
                    </p>
                  </div>
                </div>
              )}

              {step === 7 && (
                <div className="space-y-5 text-center">
                  <p className="font-display text-3xl text-ink">
                    WhatsApp ilə rezerv et
                  </p>
                  <p className="font-body text-sm text-stone">
                    Onlayn ödəniş yoxdur. “Rezerv et” düyməsi hazır mesajı
                    WhatsApp-da açacaq.
                  </p>
                  <Button type="button" variant="gold" size="lg" onClick={reserve}>
                    İndi rezerv et
                  </Button>
                </div>
              )}
            </m.div>
          </AnimatePresence>

          {error ? (
            <p className="mt-4 font-body text-sm text-red-700">{error}</p>
          ) : null}

          {step < 7 ? (
            <div className="mt-8 flex flex-wrap gap-3">
              {step > 0 ? (
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setError(null);
                    setStep((s) => s - 1);
                  }}
                >
                  Geri
                </Button>
              ) : null}
              <Button type="button" variant="gold" onClick={next}>
                Davam et
              </Button>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
