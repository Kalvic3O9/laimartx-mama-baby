"use client";

import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { MessageCircle } from "lucide-react";
import { formatUgx, whatsappUrl } from "@/lib/brand";
import { makeOrderNumber, type CustomerDetails, type Order } from "@/lib/orders";
import { useCart } from "@/components/cart/CartProvider";

const emptyCustomer: CustomerDetails = {
  name: "",
  phone: "",
  whatsapp: "",
  location: "",
  deliveryAddress: ""
};

export function CheckoutClient() {
  const router = useRouter();
  const { lines, subtotal, clearCart } = useCart();
  const [customer, setCustomer] = useState(emptyCustomer);
  const [paymentMethod, setPaymentMethod] = useState<Order["paymentMethod"]>("Mobile Money");

  const summary = useMemo(() => lines.map((line) => `${line.quantity} x ${line.name} - ${formatUgx(line.price * line.quantity)}`).join("\n"), [lines]);
  const whatsAppMessage = `New Laimartx order request\n\nCustomer: ${customer.name || "Not filled"}\nPhone: ${customer.phone || "Not filled"}\nWhatsApp: ${customer.whatsapp || "Not filled"}\nLocation: ${customer.location || "Not filled"}\nAddress: ${customer.deliveryAddress || "Not filled"}\nPayment: ${paymentMethod}\n\nItems:\n${summary || "Cart is empty"}\n\nTotal: ${formatUgx(subtotal)}`;

  function updateField(field: keyof CustomerDetails, value: string) {
    setCustomer((current) => ({ ...current, [field]: value }));
  }

  function submitOrder() {
    if (!customer.name || !customer.phone || !customer.location || !customer.deliveryAddress || lines.length === 0) return;
    const order: Order = {
      orderNumber: makeOrderNumber(),
      customer,
      paymentMethod,
      total: subtotal,
      status: "Pending",
      createdAt: new Date().toISOString(),
      items: lines.map((line) => ({ productId: line.productId, name: line.name, price: line.price, quantity: line.quantity }))
    };
    const saved = JSON.parse(window.localStorage.getItem("laimartx-orders") || "[]") as Order[];
    window.localStorage.setItem("laimartx-orders", JSON.stringify([order, ...saved]));
    clearCart();
    router.push(`/confirmation?order=${order.orderNumber}`);
  }

  return (
    <section className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[1fr_420px] lg:px-8">
      <div className="rounded-[28px] bg-white p-5 shadow-soft sm:p-8">
        <p className="text-2xl font-black">Delivery details</p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {[
            ["name", "Customer name"],
            ["phone", "Phone number"],
            ["whatsapp", "WhatsApp number"],
            ["location", "Location or town"],
            ["deliveryAddress", "Delivery address"]
          ].map(([field, label]) => (
            <label key={field} className={field === "deliveryAddress" ? "sm:col-span-2" : ""}>
              <span className="text-sm font-bold">{label}</span>
              <input
                className="focus-ring mt-2 min-h-12 w-full rounded-2xl border border-ink/10 bg-cream px-4"
                value={customer[field as keyof CustomerDetails]}
                onChange={(event) => updateField(field as keyof CustomerDetails, event.target.value)}
                placeholder={label}
              />
            </label>
          ))}
        </div>

        <div className="mt-8">
          <p className="text-sm font-bold">Payment method</p>
          <div className="mt-3 grid gap-3 sm:grid-cols-3">
            {(["Mobile Money", "Card", "Pay on Delivery"] as const).map((method) => (
              <button key={method} onClick={() => setPaymentMethod(method)} className={`focus-ring min-h-12 rounded-2xl border px-4 text-sm font-bold ${paymentMethod === method ? "border-ink bg-ink text-white" : "border-ink/10 bg-cream text-ink"}`}>
                {method}
              </button>
            ))}
          </div>
          <p className="mt-3 text-sm leading-6 text-ink/60">Pesapal, Flutterwave, and Mobile Money hooks are prepared as placeholders. Admin confirms payment manually for the MVP.</p>
        </div>

        <button onClick={submitOrder} className="focus-ring mt-8 min-h-12 w-full rounded-full bg-ink px-6 font-black text-white hover:bg-cocoa">
          Place order
        </button>
      </div>

      <aside className="h-fit rounded-[28px] bg-white p-6 shadow-soft">
        <p className="text-xl font-black">Checkout summary</p>
        <div className="mt-5 grid gap-3">
          {lines.map((line) => (
            <div key={line.productId} className="flex justify-between gap-4 text-sm">
              <span>
                {line.quantity} x {line.name}
              </span>
              <span className="font-bold">{formatUgx(line.price * line.quantity)}</span>
            </div>
          ))}
        </div>
        <div className="mt-5 flex justify-between border-t border-ink/10 pt-4">
          <span className="font-bold">Total</span>
          <span className="text-lg font-black">{formatUgx(subtotal)}</span>
        </div>
        <a href={whatsappUrl(whatsAppMessage)} target="_blank" rel="noreferrer" className="focus-ring mt-6 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-sage px-5 font-black text-ink">
          <MessageCircle className="size-5" />
          Send summary on WhatsApp
        </a>
      </aside>
    </section>
  );
}
