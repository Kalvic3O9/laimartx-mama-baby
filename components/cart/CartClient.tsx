"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2 } from "lucide-react";
import { formatUgx } from "@/lib/brand";
import { useCart } from "@/components/cart/CartProvider";
import { ButtonLink } from "@/components/ButtonLink";

export function CartClient() {
  const { lines, subtotal, updateQuantity, removeItem } = useCart();

  if (lines.length === 0) {
    return (
      <section className="mx-auto max-w-3xl px-4 py-20 text-center">
        <p className="text-3xl font-black">Your cart is empty</p>
        <p className="mt-3 text-ink/65">Start with a curated package and come back here when you are ready.</p>
        <ButtonLink href="/shop" className="mt-8">
          Browse packages
        </ButtonLink>
      </section>
    );
  }

  return (
    <section className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[1fr_380px] lg:px-8">
      <div className="grid gap-4">
        {lines.map((line) => (
          <div key={line.productId} className="grid grid-cols-[88px_1fr] gap-4 rounded-[24px] bg-white p-4 shadow-soft sm:grid-cols-[120px_1fr_auto]">
            <div className="relative aspect-square overflow-hidden rounded-2xl bg-mint">
              <Image src={line.image} alt={line.name} fill className="object-cover" sizes="120px" />
            </div>
            <div>
              <Link href={`/shop/${line.slug}`} className="font-black hover:text-cocoa">
                {line.name}
              </Link>
              <p className="mt-1 text-sm text-ink/60">{formatUgx(line.price)}</p>
              <div className="mt-4 inline-flex items-center rounded-full bg-cream p-1">
                <button className="focus-ring grid size-9 place-items-center rounded-full bg-white" onClick={() => updateQuantity(line.productId, line.quantity - 1)} aria-label="Reduce quantity">
                  <Minus className="size-4" />
                </button>
                <span className="grid w-10 place-items-center text-sm font-bold">{line.quantity}</span>
                <button className="focus-ring grid size-9 place-items-center rounded-full bg-white" onClick={() => updateQuantity(line.productId, line.quantity + 1)} aria-label="Increase quantity">
                  <Plus className="size-4" />
                </button>
              </div>
            </div>
            <button className="focus-ring grid size-10 place-items-center rounded-full bg-blush/60 text-ink sm:self-center" onClick={() => removeItem(line.productId)} aria-label="Remove item">
              <Trash2 className="size-4" />
            </button>
          </div>
        ))}
      </div>
      <aside className="h-fit rounded-[28px] bg-white p-6 shadow-soft">
        <p className="text-xl font-black">Order summary</p>
        <div className="mt-5 flex justify-between border-b border-ink/10 pb-4 text-sm">
          <span>Subtotal</span>
          <span className="font-black">{formatUgx(subtotal)}</span>
        </div>
        <p className="mt-4 text-sm leading-6 text-ink/60">Delivery is confirmed by WhatsApp or phone after checkout. Admin can manually confirm Mobile Money, Pesapal, Flutterwave, or cash payments.</p>
        <ButtonLink href="/checkout" className="mt-6 w-full">
          Continue to checkout
        </ButtonLink>
      </aside>
    </section>
  );
}
