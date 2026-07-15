"use client";

import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useDeliveryStore } from "@/stores/delivery-store";

export default function AdminDeliveryPage() {
  const { enabled, price, setEnabled, setPrice } = useDeliveryStore();

  return (
    <div className="space-y-8">
      <div>
        <p className="font-body text-[10px] uppercase tracking-[0.35em] text-gold-soft">
          Parametrlər
        </p>
        <h1 className="mt-2 font-display text-4xl">Çatdırılma</h1>
        <p className="mt-3 max-w-2xl text-sm text-mist">
          Standart qiymət 150 AZN-dir. Aktiv/deaktiv və qiymət rezervasiya
          axınına dərhal təsir edir.
        </p>
      </div>

      <div className="max-w-lg space-y-6 rounded-2xl border border-ivory/10 bg-charcoal/60 p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-display text-xl">Çatdırılma aktivdir</p>
            <p className="text-sm text-mist">
              {enabled ? "Müştərilər çatdırılma seçə bilər" : "Deaktiv"}
            </p>
          </div>
          <button
            type="button"
            onClick={() => setEnabled(!enabled)}
            className={`h-7 w-12 rounded-full transition ${
              enabled ? "bg-gold" : "bg-ivory/15"
            }`}
            aria-label="Çatdırılmanı dəyiş"
          >
            <span
              className={`block h-5 w-5 rounded-full bg-ink transition ${
                enabled ? "translate-x-6" : "translate-x-1"
              }`}
            />
          </button>
        </div>

        <div className="space-y-2">
          <Label className="text-mist">Çatdırılma qiyməti (AZN)</Label>
          <Input
            type="number"
            min={0}
            value={price}
            onChange={(e) => setPrice(Number(e.target.value) || 0)}
            className="border-ivory/15 bg-ink/40 text-ivory"
          />
        </div>

        <Button
          variant="gold"
          onClick={() =>
            toast.success("Çatdırılma parametrləri yadda saxlandı", {
              description: "Prisma SiteSetting ilə daimi saxlama əlavə olunacaq.",
            })
          }
        >
          Saxla
        </Button>
      </div>
    </div>
  );
}
