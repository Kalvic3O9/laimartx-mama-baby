"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Package, Search, ShoppingBag, TrendingUp, Users } from "lucide-react";
import { formatUgx } from "@/lib/brand";
import { sampleOrders, type Order, type OrderStatus } from "@/lib/orders";

const statuses: OrderStatus[] = ["Pending", "Paid", "Packed", "Dispatched", "Delivered", "Cancelled"];

export function AdminDashboardClient() {
  const [orders, setOrders] = useState<Order[]>(sampleOrders);
  const [query, setQuery] = useState("");

  const filtered = orders.filter((order) => `${order.orderNumber} ${order.customer.name} ${order.customer.location}`.toLowerCase().includes(query.toLowerCase()));
  const metrics = useMemo(() => {
    const deliveredRevenue = orders.filter((order) => order.status !== "Cancelled").reduce((sum, order) => sum + order.total, 0);
    return [
      { label: "Revenue", value: formatUgx(deliveredRevenue), Icon: TrendingUp },
      { label: "Orders", value: String(orders.length), Icon: ShoppingBag },
      { label: "Customers", value: String(new Set(orders.map((order) => order.customer.phone)).size), Icon: Users },
      { label: "Active packs", value: String(orders.filter((order) => !["Delivered", "Cancelled"].includes(order.status)).length), Icon: Package }
    ];
  }, [orders]);

  function updateStatus(orderNumber: string, status: OrderStatus) {
    setOrders((current) => current.map((order) => (order.orderNumber === orderNumber ? { ...order, status } : order)));
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="text-sm font-black uppercase text-cocoa">Admin dashboard</p>
          <h1 className="mt-2 text-4xl font-black">Sales and orders</h1>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Link href="/admin/products" className="focus-ring inline-flex min-h-12 items-center justify-center rounded-full bg-ink px-6 font-black text-white">
            Manage products
          </Link>
          <form action="/api/admin/logout" method="post">
            <button className="focus-ring inline-flex min-h-12 w-full items-center justify-center rounded-full bg-white px-6 font-black text-ink ring-1 ring-ink/10 hover:bg-cream" type="submit">
              Logout
            </button>
          </form>
        </div>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {metrics.map(({ label, value, Icon }) => (
          <div key={label} className="rounded-[28px] bg-white p-5 shadow-soft">
            <div className="flex items-center justify-between">
              <p className="text-sm font-bold text-ink/55">{label}</p>
              <span className="grid size-10 place-items-center rounded-2xl bg-mint">
                <Icon className="size-5" />
              </span>
            </div>
            <p className="mt-4 text-2xl font-black">{value}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 rounded-[28px] bg-white p-5 shadow-soft">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-xl font-black">Customer orders</h2>
          <label className="relative">
            <Search className="absolute left-4 top-1/2 size-4 -translate-y-1/2 text-ink/40" />
            <input className="focus-ring min-h-11 w-full rounded-full border border-ink/10 bg-cream pl-11 pr-4 sm:w-80" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search orders" />
          </label>
        </div>
        <div className="mt-5 overflow-x-auto">
          <table className="w-full min-w-[760px] border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-ink/10 text-ink/55">
                <th className="py-3 pr-4">Order</th>
                <th className="py-3 pr-4">Customer</th>
                <th className="py-3 pr-4">Location</th>
                <th className="py-3 pr-4">Payment</th>
                <th className="py-3 pr-4">Total</th>
                <th className="py-3 pr-4">Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((order) => (
                <tr key={order.orderNumber} className="border-b border-ink/10">
                  <td className="py-4 pr-4 font-black">{order.orderNumber}</td>
                  <td className="py-4 pr-4">{order.customer.name}</td>
                  <td className="py-4 pr-4">{order.customer.location}</td>
                  <td className="py-4 pr-4">{order.paymentMethod}</td>
                  <td className="py-4 pr-4 font-bold">{formatUgx(order.total)}</td>
                  <td className="py-4 pr-4">
                    <select className="focus-ring rounded-full border border-ink/10 bg-cream px-3 py-2 font-bold" value={order.status} onChange={(event) => updateStatus(order.orderNumber, event.target.value as OrderStatus)}>
                      {statuses.map((status) => (
                        <option key={status}>{status}</option>
                      ))}
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
