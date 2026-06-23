import type { Order } from "@/lib/orders";

export type PaymentProvider = "mobile-money" | "pesapal" | "flutterwave" | "pay-on-delivery";

export type PaymentIntent = {
  provider: PaymentProvider;
  reference: string;
  status: "manual_confirmation_required" | "redirect_placeholder" | "cash_on_delivery";
  message: string;
};

export function createPaymentIntent(order: Order, provider: PaymentProvider): PaymentIntent {
  if (provider === "pay-on-delivery") {
    return {
      provider,
      reference: order.orderNumber,
      status: "cash_on_delivery",
      message: "Pay on Delivery selected. Admin should confirm service area before dispatch."
    };
  }

  if (provider === "mobile-money") {
    return {
      provider,
      reference: order.orderNumber,
      status: "manual_confirmation_required",
      message: "Mobile Money selected. Admin should verify the transaction ID before marking the order Paid."
    };
  }

  return {
    provider,
    reference: order.orderNumber,
    status: "redirect_placeholder",
    message: `${provider} checkout placeholder. Add provider keys and redirect/webhook handling before live payments.`
  };
}
