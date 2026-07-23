"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { AnimatePresence, m } from "motion/react";
import { Minus, Plus, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  collections,
  getCollectionBySlug,
  getDemoUnavailableDates,
} from "@/data/collections";
import { cn, formatCurrency } from "@/lib/utils";
import { calculateReservationTotal } from "@/lib/utils/pricing";
import { openReservationWhatsApp } from "@/lib/whatsapp";
import { useDeliveryStore } from "@/stores/delivery-store";
import type { Collection, ReservationPayload } from "@/types";
import { submitReservation } from "@/actions/reservation";

const STEPS = [
  { id: "collection", label: "Kolleksiya", hint: "Beğəndiyiniz xonça kolleksiyasını seçin" },
  { id: "date", label: "Tarix", hint: "Uyğun günü seçin — dolu tarixlər bağlıdır" },
  { id: "qty", label: "Say", hint: "Neçə xonça lazımdır?" },
  { id: "tumba", label: "Tumba", hint: "Tumba olacaq? Olsa — neçə ədəd?" },
  { id: "delivery", label: "Çatdırılma", hint: "Ünvanınıza gətirək?" },
  { id: "info", label: "Məlumat", hint: "Sizinlə əlaqə saxlamaq üçün" },
  { id: "summary", label: "Xülasə", hint: "Hər şeyi bir dəfə yoxlayın" },
  { id: "reserve", label: "WhatsApp", hint: "Bir toxunuşla rezervasiyanı göndərin" },
] as const;

function QtyStepper({
  value,
  min,
  max,
  onChange,
  label,
}: {
  value: number;
  min: number;
  max: number;
  onChange: (v: number) => void;
  label: string;
}) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-2xl border border-ink/10 bg-cream/40 px-4 py-4">
      <span className="font-body text-sm text-stone">{label}</span>
      <div className="flex items-center gap-3">
        <button
          type="button"
          aria-label="Azalt"
          disabled={value <= min}
          onClick={() => onChange(Math.max(min, value - 1))}
          className="flex h-12 w-12 items-center justify-center rounded-full border border-ink/15 bg-pearl disabled:opacity-40"
        >
          <Minus className="h-4 w-4" />
        </button>
        <span className="min-w-10 text-center font-display text-3xl text-ink">
          {value}
        </span>
        <button
          type="button"
          aria-label="Artır"
          disabled={value >= max}
          onClick={() => onChange(Math.min(max, value + 1))}
          className="flex h-12 w-12 items-center justify-center rounded-full border border-ink/15 bg-pearl disabled:opacity-40"
        >
          <Plus className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

function YesNo({
  value,
  onChange,
}: {
  value: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <div className="grid grid-cols-2 gap-3">
      {[
        { label: "Bəli", v: true },
        { label: "Xeyr", v: false },
      ].map((opt) => (
        <button
          key={opt.label}
          type="button"
          onClick={() => onChange(opt.v)}
          className={cn(
            "flex h-14 items-center justify-center gap-2 rounded-2xl border font-body text-sm uppercase tracking-[0.18em] transition",
            value === opt.v
              ? "border-gold bg-cream text-ink shadow-soft"
              : "border-ink/10 bg-pearl text-stone",
          )}
        >
          {value === opt.v ? <Check className="h-4 w-4 text-gold-deep" /> : null}
          {opt.label}
        </button>
      ))}
    </div>
  );
}

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
  const days = Array.from({ length: 35 }).map((_, i) => {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    return d;
  });

  return (
    <div className="grid grid-cols-3 gap-2 xs:grid-cols-4 sm:grid-cols-5 md:grid-cols-7">
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
            className={cn(
              "flex min-h-[4.5rem] flex-col items-start justify-center rounded-xl border px-2.5 py-2 text-left transition active:scale-[0.98]",
              disabled && "cursor-not-allowed border-ink/5 bg-sand/30 text-mist line-through",
              !disabled && !selected && "border-ink/10 bg-pearl hover:border-gold",
              selected && "border-gold bg-cream shadow-soft",
            )}
          >
            <span className="font-body text-[10px] uppercase tracking-[0.12em] text-stone">
              {day.toLocaleDateString("az-AZ", { weekday: "short" })}
            </span>
            <span className="mt-1 font-display text-xl leading-none text-ink">
              {day.getDate()}
            </span>
            <span className="mt-1 font-body text-[10px] text-stone">
              {day.toLocaleDateString("az-AZ", { month: "short" })}
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
  const panelRef = useRef<HTMLDivElement>(null);

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
  const [sending, setSending] = useState(false);

  const collection = (getCollectionBySlug(collectionSlug) ||
    collections[0]) as Collection;

  const unavailable = useMemo(
    () => [...getDemoUnavailableDates(), ...collection.unavailableDates],
    [collection.unavailableDates],
  );

  const pricing = calculateReservationTotal({
    collection,
    xoncaQuantity,
    needTumba: collection.tumbaIncluded ? false : needTumba,
    tumbaQuantity: collection.tumbaIncluded ? 0 : tumbaQuantity,
    needDelivery: deliveryStore.enabled && needDelivery,
    deliveryPriceOverride: deliveryStore.price,
  });

  useEffect(() => {
    panelRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [step]);

  useEffect(() => {
    const slug = searchParams.get("collection");
    if (slug && getCollectionBySlug(slug)) {
      setCollectionSlug(slug);
    }
  }, [searchParams]);

  // Kolleksiya dəyişəndə tumba vəziyyətini sıfırla / uyğunlaşdır
  useEffect(() => {
    if (collection.tumbaIncluded) {
      setNeedTumba(true);
      setTumbaQuantity(xoncaQuantity);
    } else if (!collection.tumbaOptional) {
      setNeedTumba(false);
      setTumbaQuantity(0);
    } else {
      setNeedTumba(false);
      setTumbaQuantity(Math.max(1, xoncaQuantity));
    }
    // only when collection identity changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [collection.id]);

  // Xonça sayı dəyişəndə — tumba daxildirsə say avtomatik uyğunlaşır
  useEffect(() => {
    if (collection.tumbaIncluded) {
      setTumbaQuantity(xoncaQuantity);
    }
  }, [xoncaQuantity, collection.tumbaIncluded]);

  const tumbaDecision = collection.tumbaIncluded
    ? ("included" as const)
    : !collection.tumbaOptional
      ? ("unavailable" as const)
      : ("optional" as const);

  const effectiveTumbaQty = collection.tumbaIncluded
    ? xoncaQuantity
    : needTumba
      ? tumbaQuantity
      : 0;

  const validate = (): string | null => {
    switch (step) {
      case 0:
        return collectionSlug ? null : "Kolleksiya seçin";
      case 1:
        if (!date) return "Tarix seçin";
        if (unavailable.includes(date)) return "Bu tarix doludur";
        return null;
      case 2:
        if (xoncaQuantity < 1) return "Minimum 1 xonça";
        if (xoncaQuantity > collection.maxQuantity)
          return `Maksimum ${collection.maxQuantity}`;
        return null;
      case 3:
        if (tumbaDecision === "optional" && needTumba) {
          if (tumbaQuantity < 1) return "Tumba sayını seçin (minimum 1)";
          if (tumbaQuantity > collection.maxQuantity)
            return `Tumba maksimum ${collection.maxQuantity} ola bilər`;
        }
        return null;
      case 4:
        if (
          deliveryStore.enabled &&
          collection.deliveryAvailable &&
          needDelivery &&
          deliveryAddress.trim().length < 5
        )
          return "Çatdırılma ünvanını yazın";
        return null;
      case 5:
        if (name.trim().length < 2) return "Adınızı yazın";
        if (surname.trim().length < 2) return "Soyadınızı yazın";
        if (phone.replace(/\D/g, "").length < 9)
          return "Düzgün telefon nömrəsi yazın";
        if (restaurantName.trim().length < 2) return "Restoran adını yazın";
        return null;
      default:
        return null;
    }
  };

  const goNext = () => {
    const msg = validate();
    if (msg) {
      setError(msg);
      return;
    }
    setError(null);

    let next = step + 1;
    // Tumba addımı həmişə göstərilir — skip yoxdur
    // Çatdırılma deaktivdirsə keç
    if (
      next === 4 &&
      (!deliveryStore.enabled || !collection.deliveryAvailable)
    ) {
      next = 5;
    }
    setStep(Math.min(next, STEPS.length - 1));
  };

  const goBack = () => {
    setError(null);
    let prev = step - 1;
    if (
      prev === 4 &&
      (!deliveryStore.enabled || !collection.deliveryAvailable)
    ) {
      prev = 3;
    }
    setStep(Math.max(prev, 0));
  };

  const buildPayload = (): ReservationPayload => ({
    collectionId: collection.id,
    collectionSlug: collection.slug,
    collectionName: collection.name,
    date,
    xoncaQuantity,
    needTumba: collection.tumbaIncluded ? true : needTumba,
    tumbaQuantity: effectiveTumbaQty,
    needDelivery: deliveryStore.enabled && needDelivery,
    deliveryFee: pricing.deliveryFee,
    name: name.trim(),
    surname: surname.trim(),
    phone: phone.trim(),
    email: email.trim() || undefined,
    restaurantName: restaurantName.trim(),
    deliveryAddress: needDelivery ? deliveryAddress.trim() : "",
    notes: notes.trim(),
    unitPrice: pricing.unitPrice,
    tumbaUnitPrice: pricing.tumbaUnitPrice,
    subtotal: pricing.subtotal,
    total: pricing.total,
  });

  const reserve = async () => {
    setSending(true);
    try {
      const payload = buildPayload();
      await submitReservation(payload);
      openReservationWhatsApp(payload);
    } finally {
      setSending(false);
    }
  };

  const progress = ((step + 1) / STEPS.length) * 100;

  return (
    <div className="bg-ivory pb-[calc(6.5rem+env(safe-area-inset-bottom))] pt-28 sm:pt-36 sm:pb-24">
      <div className="container-lux max-w-5xl" ref={panelRef}>
        <div className="max-w-2xl">
          <p className="font-body text-[10px] uppercase tracking-[0.35em] text-gold-deep">
            Rezervasiya · {step + 1}/{STEPS.length}
          </p>
          <h1 className="mt-3 font-display text-[clamp(2.2rem,6vw,3.8rem)] leading-[1.05] text-ink">
            {STEPS[step].label}
          </h1>
          <p className="mt-3 font-body text-base text-stone">{STEPS[step].hint}</p>
        </div>

        {/* Progress */}
        <div className="mt-6">
          <div className="h-1.5 overflow-hidden rounded-full bg-sand">
            <m.div
              className="h-full rounded-full gradient-gold"
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>
          <div className="mt-3 flex gap-1 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {STEPS.map((s, i) => (
              <div
                key={s.id}
                className={cn(
                  "shrink-0 rounded-full px-3 py-1.5 font-body text-[10px] uppercase tracking-[0.14em]",
                  i === step && "bg-ink text-ivory",
                  i < step && "bg-gold/20 text-gold-deep",
                  i > step && "bg-transparent text-mist",
                )}
              >
                {String(i + 1).padStart(2, "0")} {s.label}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1.4fr_0.85fr]">
          <div className="rounded-3xl border border-ink/8 bg-pearl p-4 shadow-soft sm:p-7">
            <AnimatePresence mode="wait">
              <m.div
                key={step}
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -16 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="min-h-[18rem]"
              >
                {step === 0 && (
                  <div className="grid gap-3">
                    {collections.map((c) => {
                      const active = collectionSlug === c.slug;
                      const thumb = c.images[0] || c.videos[0];
                      return (
                        <button
                          key={c.id}
                          type="button"
                          onClick={() => setCollectionSlug(c.slug)}
                          className={cn(
                            "rounded-2xl border p-3 text-left transition active:scale-[0.995] sm:p-5",
                            active
                              ? "border-gold bg-cream shadow-soft"
                              : "border-ink/10 hover:border-gold/50",
                          )}
                        >
                          <div className="flex items-start gap-3 sm:gap-4">
                            {thumb ? (
                              <span className="relative h-16 w-14 shrink-0 overflow-hidden rounded-xl bg-ink/5 sm:h-20 sm:w-[4.5rem]">
                                {/\.mp4/i.test(thumb) ? (
                                  <video
                                    src={thumb}
                                    muted
                                    playsInline
                                    preload="metadata"
                                    className="absolute inset-0 h-full w-full object-cover"
                                  />
                                ) : (
                                  // eslint-disable-next-line @next/next/no-img-element
                                  <img
                                    src={thumb}
                                    alt=""
                                    className="absolute inset-0 h-full w-full object-cover"
                                  />
                                )}
                              </span>
                            ) : null}
                            <div className="min-w-0 flex-1">
                              <div className="flex items-start justify-between gap-2">
                                <div className="min-w-0">
                                  <p className="font-display text-xl text-ink sm:text-2xl">
                                    {c.name}
                                  </p>
                                  <p className="mt-1 line-clamp-2 font-body text-sm text-stone">
                                    {c.shortDescription}
                                  </p>
                                </div>
                                {active ? (
                                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gold text-ink">
                                    <Check className="h-4 w-4" />
                                  </span>
                                ) : null}
                              </div>
                              <p className="mt-2 font-body text-[11px] text-mist">
                                {c.images.length} foto
                                {c.videos.length > 0
                                  ? ` · ${c.videos.length} video`
                                  : ""}
                              </p>
                              <p className="mt-2 font-display text-lg text-gold-deep sm:text-xl">
                                {formatCurrency(
                                  c.discountPrice ?? c.price,
                                  "AZN",
                                )}
                              </p>
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                )}

                {step === 1 && (
                  <div>
                    <Calendar
                      value={date}
                      onChange={setDate}
                      unavailable={unavailable}
                    />
                    {date ? (
                      <p className="mt-4 rounded-xl bg-cream/70 px-4 py-3 font-body text-sm text-charcoal">
                        Seçilən tarix:{" "}
                        <strong>
                          {new Date(date + "T12:00:00").toLocaleDateString(
                            "az-AZ",
                            {
                              weekday: "long",
                              day: "numeric",
                              month: "long",
                            },
                          )}
                        </strong>
                      </p>
                    ) : null}
                  </div>
                )}

                {step === 2 && (
                  <div className="space-y-4">
                    <QtyStepper
                      label="Xonça sayı"
                      value={xoncaQuantity}
                      min={1}
                      max={collection.maxQuantity}
                      onChange={setXoncaQuantity}
                    />
                    <p className="font-body text-sm text-stone">
                      Maksimum bu kolleksiya üçün: {collection.maxQuantity} ədəd
                    </p>
                  </div>
                )}

                {step === 3 && (
                  <div className="space-y-5">
                    {/* Context banner */}
                    <div className="rounded-2xl border border-ink/8 bg-cream/60 p-4 sm:p-5">
                      <p className="font-body text-[10px] uppercase tracking-[0.25em] text-gold-deep">
                        Xonça seçiminiz
                      </p>
                      <p className="mt-2 font-display text-2xl text-ink">
                        {collection.name}
                      </p>
                      <p className="mt-1 font-body text-sm text-stone">
                        Seçilmiş xonça sayı:{" "}
                        <strong className="text-ink">{xoncaQuantity}</strong> ədəd
                      </p>
                    </div>

                    {tumbaDecision === "included" && (
                      <div className="space-y-4 rounded-2xl border border-gold/40 bg-pearl p-5">
                        <div className="flex items-start gap-3">
                          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gold/25 text-gold-deep">
                            <Check className="h-5 w-5" />
                          </span>
                          <div>
                            <p className="font-display text-2xl text-ink">
                              Tumba daxildir
                            </p>
                            <p className="mt-2 font-body text-sm leading-relaxed text-stone">
                              Bu kolleksiyada stand (tumba) qiymətə daxildir.
                              Əlavə seçim etməyinizə ehtiyac yoxdur.
                            </p>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-3 rounded-xl bg-cream/80 p-4">
                          <div>
                            <p className="font-body text-[10px] uppercase tracking-[0.2em] text-stone">
                              Tumba olacaq?
                            </p>
                            <p className="mt-1 font-display text-xl text-ink">
                              Bəli
                            </p>
                          </div>
                          <div>
                            <p className="font-body text-[10px] uppercase tracking-[0.2em] text-stone">
                              Tumba sayı
                            </p>
                            <p className="mt-1 font-display text-xl text-ink">
                              {xoncaQuantity} ədəd
                            </p>
                          </div>
                        </div>
                        <p className="font-body text-xs text-mist">
                          Tumba sayı xonça sayı ilə eyni götürülür (
                          {xoncaQuantity}). Davam edin.
                        </p>
                      </div>
                    )}

                    {tumbaDecision === "unavailable" && (
                      <div className="space-y-4 rounded-2xl border border-ink/10 bg-pearl p-5">
                        <p className="font-display text-2xl text-ink">
                          Bu kolleksiyada tumba yoxdur
                        </p>
                        <p className="font-body text-sm leading-relaxed text-stone">
                          Yalnız xonça sifariş olunur. Stand əlavə etmək üçün
                          digər kolleksiyaları seçə bilərsiniz.
                        </p>
                        <div className="grid grid-cols-2 gap-3 rounded-xl bg-cream/80 p-4">
                          <div>
                            <p className="font-body text-[10px] uppercase tracking-[0.2em] text-stone">
                              Tumba olacaq?
                            </p>
                            <p className="mt-1 font-display text-xl text-ink">
                              Xeyr
                            </p>
                          </div>
                          <div>
                            <p className="font-body text-[10px] uppercase tracking-[0.2em] text-stone">
                              Tumba sayı
                            </p>
                            <p className="mt-1 font-display text-xl text-ink">
                              0
                            </p>
                          </div>
                        </div>
                      </div>
                    )}

                    {tumbaDecision === "optional" && (
                      <div className="space-y-5">
                        <div>
                          <p className="font-display text-xl text-ink sm:text-2xl">
                            Tumba (stand) lazımdır?
                          </p>
                          <p className="mt-2 font-body text-sm text-stone">
                            İstəsəniz xonçalarınız üçün ayrıca tumba əlavə
                            edə bilərsiniz. Qiymət:{" "}
                            <strong className="text-gold-deep">
                              {formatCurrency(collection.tumbaPrice, "AZN")}
                            </strong>{" "}
                            / ədəd
                          </p>
                        </div>

                        <YesNo
                          value={needTumba}
                          onChange={(v) => {
                            setNeedTumba(v);
                            if (v) {
                              setTumbaQuantity((q) =>
                                q < 1 ? Math.max(1, xoncaQuantity) : q,
                              );
                            }
                            setError(null);
                          }}
                        />

                        {needTumba ? (
                          <div className="space-y-4 rounded-2xl border border-gold/35 bg-cream/50 p-4 sm:p-5">
                            <p className="font-display text-xl text-ink">
                              Neçə tumba olacaq?
                            </p>
                            <p className="font-body text-sm text-stone">
                              Adətən hər xonça üçün 1 tumba seçilir. İstəsəniz
                              fərqli say da yaza bilərsiniz.
                            </p>
                            <QtyStepper
                              label="Tumba sayı"
                              value={tumbaQuantity}
                              min={1}
                              max={collection.maxQuantity}
                              onChange={(v) => {
                                setTumbaQuantity(v);
                                setError(null);
                              }}
                            />
                            <button
                              type="button"
                              onClick={() => setTumbaQuantity(xoncaQuantity)}
                              className="h-11 w-full rounded-xl border border-ink/15 bg-pearl font-body text-xs uppercase tracking-[0.16em] text-ink"
                            >
                              Xonça sayı qədər et ({xoncaQuantity})
                            </button>
                            <div className="rounded-xl bg-pearl px-4 py-3 font-body text-sm text-charcoal">
                              <div className="flex justify-between gap-3">
                                <span>Tumba × {tumbaQuantity}</span>
                                <span className="text-gold-deep">
                                  {formatCurrency(
                                    tumbaQuantity * collection.tumbaPrice,
                                    "AZN",
                                  )}
                                </span>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div className="rounded-2xl border border-ink/10 bg-pearl p-4">
                            <p className="font-body text-sm text-stone">
                              Tumba seçilməyib. Yalnız{" "}
                              <strong className="text-ink">
                                {xoncaQuantity} xonça
                              </strong>{" "}
                              ilə davam edəcəksiniz.
                            </p>
                          </div>
                        )}

                        {/* Decision summary */}
                        <div className="grid grid-cols-2 gap-3 rounded-2xl border border-ink/10 bg-espresso p-4 text-ivory">
                          <div>
                            <p className="font-body text-[10px] uppercase tracking-[0.2em] text-gold-soft">
                              Tumba olacaq?
                            </p>
                            <p className="mt-1 font-display text-2xl">
                              {needTumba ? "Bəli" : "Xeyr"}
                            </p>
                          </div>
                          <div>
                            <p className="font-body text-[10px] uppercase tracking-[0.2em] text-gold-soft">
                              Tumba sayı
                            </p>
                            <p className="mt-1 font-display text-2xl">
                              {needTumba ? tumbaQuantity : 0}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {step === 4 && (
                  <div className="space-y-5">
                    {!deliveryStore.enabled || !collection.deliveryAvailable ? (
                      <p className="rounded-2xl bg-cream/70 p-5 font-body text-sm">
                        Çatdırılma hazırda aktiv deyil.
                      </p>
                    ) : (
                      <>
                        <YesNo
                          value={needDelivery}
                          onChange={setNeedDelivery}
                        />
                        {needDelivery ? (
                          <div className="space-y-3">
                            <p className="rounded-xl bg-cream px-4 py-3 font-body text-sm text-gold-deep">
                              Çatdırılma haqqı:{" "}
                              {formatCurrency(deliveryStore.price, "AZN")}
                            </p>
                            <Label htmlFor="address">Çatdırılma ünvanı</Label>
                            <Textarea
                              id="address"
                              value={deliveryAddress}
                              onChange={(e) =>
                                setDeliveryAddress(e.target.value)
                              }
                              placeholder="Küçə, bina, mərtəbə / restoran ünvanı"
                              className="min-h-28 text-base"
                            />
                          </div>
                        ) : null}
                      </>
                    )}
                  </div>
                )}

                {step === 5 && (
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="name">Ad *</Label>
                      <Input
                        id="name"
                        autoComplete="given-name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="h-12 text-base"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="surname">Soyad *</Label>
                      <Input
                        id="surname"
                        autoComplete="family-name"
                        value={surname}
                        onChange={(e) => setSurname(e.target.value)}
                        className="h-12 text-base"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Telefon *</Label>
                      <Input
                        id="phone"
                        type="tel"
                        inputMode="tel"
                        autoComplete="tel"
                        placeholder="+994 50 xxx xx xx"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="h-12 text-base"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">E-poçt (opsional)</Label>
                      <Input
                        id="email"
                        type="email"
                        autoComplete="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="h-12 text-base"
                      />
                    </div>
                    <div className="space-y-2 sm:col-span-2">
                      <Label htmlFor="restaurant">Restoran adı *</Label>
                      <Input
                        id="restaurant"
                        value={restaurantName}
                        onChange={(e) => setRestaurantName(e.target.value)}
                        className="h-12 text-base"
                        placeholder="Mərasim / restoran adı"
                      />
                    </div>
                    <div className="space-y-2 sm:col-span-2">
                      <Label htmlFor="notes">Əlavə qeyd</Label>
                      <Textarea
                        id="notes"
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        placeholder="Vaxt, xüsusi istək və s."
                        className="min-h-24 text-base"
                      />
                    </div>
                  </div>
                )}

                {step === 6 && (
                  <div className="space-y-3 rounded-2xl bg-cream/50 p-5 font-body text-sm text-charcoal">
                    <Row k="Kolleksiya" v={collection.name} />
                    <Row
                      k="Tarix"
                      v={
                        date
                          ? new Date(date + "T12:00:00").toLocaleDateString(
                              "az-AZ",
                            )
                          : "—"
                      }
                    />
                    <Row k="Xonça sayı" v={String(xoncaQuantity)} />
                    <Row
                      k="Tumba olacaq?"
                      v={effectiveTumbaQty > 0 ? "Bəli" : "Xeyr"}
                    />
                    <Row
                      k="Tumba sayı"
                      v={
                        effectiveTumbaQty > 0
                          ? `${effectiveTumbaQty} ədəd`
                          : "0"
                      }
                    />
                    <Row k="Çatdırılma" v={needDelivery ? "Bəli" : "Xeyr"} />
                    <Row k="Restoran" v={restaurantName || "—"} />
                    <Row k="Ad Soyad" v={`${name} ${surname}`.trim()} />
                    <Row k="Telefon" v={phone || "—"} />
                  </div>
                )}

                {step === 7 && (
                  <div className="space-y-5 text-center">
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gold/20">
                      <Check className="h-7 w-7 text-gold-deep" />
                    </div>
                    <p className="font-display text-3xl text-ink">
                      Hazırsınız
                    </p>
                    <p className="mx-auto max-w-md font-body text-sm leading-relaxed text-stone">
                      Onlayn ödəniş yoxdur. Düyməyə basanda WhatsApp açılacaq və
                      sifariş mesajınız avtomatik yazılacaq — sadəcə göndərin.
                    </p>
                    <Button
                      type="button"
                      variant="gold"
                      size="lg"
                      className="h-14 w-full max-w-sm text-sm"
                      disabled={sending}
                      onClick={reserve}
                      magnetic={false}
                    >
                      {sending ? "Hazırlanır..." : "WhatsApp ilə rezerv et"}
                    </Button>
                    <p className="font-body text-xs text-mist">
                      Problem olsa{" "}
                      <Link href="/contact" className="text-gold-deep underline">
                        əlaqə
                      </Link>{" "}
                      səhifəsinə yazın.
                    </p>
                  </div>
                )}
              </m.div>
            </AnimatePresence>

            {error ? (
              <p
                role="alert"
                className="mt-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 font-body text-sm text-red-700"
              >
                {error}
              </p>
            ) : null}

            {/* Desktop nav */}
            {step < 7 ? (
              <div className="mt-8 hidden gap-3 sm:flex">
                {step > 0 ? (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={goBack}
                    magnetic={false}
                    className="h-12 min-w-28"
                  >
                    Geri
                  </Button>
                ) : null}
                <Button
                  type="button"
                  variant="gold"
                  onClick={goNext}
                  magnetic={false}
                  className="h-12 min-w-40"
                >
                  Davam et
                </Button>
              </div>
            ) : null}
          </div>

          {/* Live summary */}
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <div className="rounded-3xl border border-ink/8 bg-espresso p-5 text-ivory sm:p-6">
              <p className="font-body text-[10px] uppercase tracking-[0.3em] text-gold-soft">
                Sifariş xülasəsi
              </p>
              <p className="mt-3 font-display text-2xl">{collection.name}</p>
              <div className="mt-5 space-y-2 border-t border-ivory/10 pt-4 font-body text-sm text-mist">
                <div className="flex justify-between gap-3">
                  <span>Xonça × {xoncaQuantity}</span>
                  <span>{formatCurrency(pricing.xoncaTotal, "AZN")}</span>
                </div>
                <div className="flex justify-between gap-3">
                  <span>
                    Tumba{" "}
                    {effectiveTumbaQty > 0
                      ? `× ${effectiveTumbaQty}`
                      : "(yox)"}
                  </span>
                  <span>{formatCurrency(pricing.tumbaTotal, "AZN")}</span>
                </div>
                <div className="flex justify-between gap-3">
                  <span>Çatdırılma</span>
                  <span>{formatCurrency(pricing.deliveryFee, "AZN")}</span>
                </div>
              </div>
              <div className="mt-4 flex items-end justify-between border-t border-ivory/10 pt-4">
                <span className="font-body text-xs uppercase tracking-[0.2em] text-gold-soft">
                  Ümumi
                </span>
                <span className="font-display text-3xl text-gold-soft">
                  {formatCurrency(pricing.total, "AZN")}
                </span>
              </div>
              {date ? (
                <p className="mt-4 font-body text-xs text-mist">
                  Tarix:{" "}
                  {new Date(date + "T12:00:00").toLocaleDateString("az-AZ")}
                </p>
              ) : (
                <p className="mt-4 font-body text-xs text-mist">
                  Tarix hələ seçilməyib
                </p>
              )}
            </div>
          </aside>
        </div>
      </div>

      {/* Mobile sticky actions */}
      {step < 7 ? (
        <div className="fixed inset-x-0 bottom-0 z-[60] border-t border-ink/10 bg-pearl/95 px-4 py-3 backdrop-blur-xl sm:hidden pb-[max(0.75rem,env(safe-area-inset-bottom))]">
          <div className="mb-2 flex items-center justify-between font-body text-xs text-stone">
            <span>
              {step + 1}/{STEPS.length} · {STEPS[step].label}
            </span>
            <span className="font-display text-lg text-gold-deep">
              {formatCurrency(pricing.total, "AZN")}
            </span>
          </div>
          <div className="flex gap-2">
            {step > 0 ? (
              <Button
                type="button"
                variant="outline"
                onClick={goBack}
                magnetic={false}
                className="h-12 flex-1"
              >
                Geri
              </Button>
            ) : null}
            <Button
              type="button"
              variant="gold"
              onClick={goNext}
              magnetic={false}
              className="h-12 flex-[1.4]"
            >
              Davam et
            </Button>
          </div>
        </div>
      ) : null}
    </div>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex justify-between gap-4 border-b border-ink/5 pb-2 last:border-0">
      <span className="text-stone">{k}</span>
      <span className="text-right text-ink">{v}</span>
    </div>
  );
}
