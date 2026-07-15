import { create } from "zustand";
import { SITE } from "@/lib/constants/site";

type DeliveryState = {
  enabled: boolean;
  price: number;
  setEnabled: (enabled: boolean) => void;
  setPrice: (price: number) => void;
};

export const useDeliveryStore = create<DeliveryState>((set) => ({
  enabled: SITE.delivery.enabled,
  price: SITE.delivery.defaultPrice,
  setEnabled: (enabled) => set({ enabled }),
  setPrice: (price) => set({ price }),
}));
