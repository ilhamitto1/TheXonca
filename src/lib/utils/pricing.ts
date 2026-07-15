import { SITE } from "@/lib/constants/site";
import type { Collection } from "@/types";

export function getCollectionPrice(collection: Collection) {
  return collection.discountPrice ?? collection.price;
}

export function getDeliveryFee(
  collection: Collection,
  needDelivery: boolean,
  adminDeliveryPrice?: number,
) {
  if (!needDelivery || !collection.deliveryAvailable || !SITE.delivery.enabled) {
    return 0;
  }
  return (
    adminDeliveryPrice ??
    collection.deliveryPrice ??
    SITE.delivery.defaultPrice
  );
}

export function calculateReservationTotal(input: {
  collection: Collection;
  xoncaQuantity: number;
  needTumba: boolean;
  tumbaQuantity: number;
  needDelivery: boolean;
  deliveryPriceOverride?: number;
}) {
  const unitPrice = getCollectionPrice(input.collection);
  const xoncaTotal = unitPrice * input.xoncaQuantity;

  const tumbaQty =
    input.collection.tumbaIncluded
      ? 0
      : input.needTumba
        ? Math.max(0, input.tumbaQuantity)
        : 0;
  const tumbaTotal = tumbaQty * input.collection.tumbaPrice;

  const deliveryFee = getDeliveryFee(
    input.collection,
    input.needDelivery,
    input.deliveryPriceOverride,
  );

  const subtotal = xoncaTotal + tumbaTotal;
  const total = subtotal + deliveryFee;

  return {
    unitPrice,
    tumbaUnitPrice: input.collection.tumbaPrice,
    xoncaTotal,
    tumbaTotal,
    deliveryFee,
    subtotal,
    total,
  };
}
