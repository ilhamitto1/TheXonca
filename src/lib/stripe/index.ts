import Stripe from "stripe";

export function getStripe() {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) {
    throw new Error("STRIPE_SECRET_KEY is not configured");
  }

  return new Stripe(key, {
    typescript: true,
  });
}

export async function createCheckoutSession(input: {
  priceAmount: number;
  productName: string;
  successUrl: string;
  cancelUrl: string;
  metadata?: Record<string, string>;
}) {
  const stripe = getStripe();

  return stripe.checkout.sessions.create({
    mode: "payment",
    success_url: input.successUrl,
    cancel_url: input.cancelUrl,
    line_items: [
      {
        quantity: 1,
        price_data: {
          currency: "usd",
          unit_amount: Math.round(input.priceAmount * 100),
          product_data: {
            name: input.productName,
          },
        },
      },
    ],
    metadata: input.metadata,
  });
}
