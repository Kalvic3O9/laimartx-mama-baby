"use client";

import { useEffect, useState } from "react";
import type { Order, OrderStatus } from "@/lib/orders";
import { sampleOrders } from "@/lib/orders";
import { formatUgx } from "@/lib/brand";

const statuses: OrderStatus[] = ["Pending", "Paid", "Packed", "Dispatched", "Delivered"];

export function TrackOrderClient({ initialOrder }: { initialOrder: string }) {
  const [query, setQuery] = useState(initialOrder);
  const [orders, setOrders] = useState<Order[]>(sampleOrders);

  useEffect(() => {
    const saved = JSON.parse(window.localStorage.getItem("laimartx-orders") || "[]") as Order[];
    setOrders([...saved, ...sampleOrders]);
  }, []);

  const order = orders.find((item) => item.orderNumber.toLowerCase() === query.toLowerCase());
  const currentIndex = order ? statuses.indexOf(order.status) : -1;

  return (
    <section className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="rounded-[32px] bg-white p-6 shadow-soft sm:p-8">
        <p className="text-sm font-black uppercase text-cocoa">Order tracking</p>
        <h1 className="mt-2 text-4xl font-black">Track your package</h1>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <input className="focus-ring min-h-12 flex-1 rounded-2xl border border-ink/10 bg-cream px-4" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Enter order number, e.g. LMX-2401" />
          <button className="focus-ring min-h-12 rounded-full bg-ink px-6 font-black text-white">Check status</button>
        </div>

        {order ? (
          <div className="mt-8">
            <div className="flex flex-wrap items-center justify-between gap-3 rounded-3xl bg-cream p-5">
              <div>
                <p className="font-black">{order.orderNumber}</p>
                <p className="text-sm text-ink/60">{order.customer.name} • {order.customer.location}</p>
              </div>
              <p className="rounded-full bg-sage px-4 py-2 text-sm font-black">{order.status}</p>
            </div>
            <div className="mt-7 grid gap-3 sm:grid-cols-5">
              {statuses.map((status, index) => (
                <div key={status} className={`rounded-2xl p-4 text-sm font-bold ${index <= currentIndex ? "bg-ink text-white" : "bg-cream text-ink/50"}`}>
                  {status}
                </div>
              ))}
            </div>
            <div className="mt-7 rounded-3xl bg-cream p-5">
              <p className="font-black">Items</p>
              <div className="mt-3 grid gap-2 text-sm text-ink/70">
                {order.items.map((item) => (
                  <div key={item.productId} className="flex justify-between gap-3">
                    <span>{item.quantity} x {item.name}</span>
                    <span className="font-bold">{formatUgx(item.price * item.quantity)}</span>
                  </div>
                ))}
              </div>
              <p className="mt-4 text-right text-lg font-black">{formatUgx(order.total)}</p>
            </div>
          </div>
        ) : (
          <p className="mt-6 rounded-3xl bg-cream p-5 text-sm leading-6 text-ink/65">Enter an order number to see the latest status. Try sample order LMX-2401 or LMX-2402.</p>
        )}
      </div>
    </section>
  );
}
