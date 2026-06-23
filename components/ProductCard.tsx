"use client";

import Image from "next/image";
import { MessageCircle, X } from "lucide-react";
import { useState } from "react";
import { brand, formatUgx, whatsappUrl } from "@/lib/brand";
import type { Product } from "@/lib/products";
import { AddToCartButton } from "@/components/cart/AddToCartButton";

export function ProductCard({ product }: { product: Product }) {
  const [open, setOpen] = useState(false);
  const message = `Hello ${brand.name}, I would like to order ${product.name} at ${formatUgx(product.price)}.`;

  return (
    <>
      <article className="grid grid-cols-[116px_1fr] overflow-hidden rounded-[22px] bg-white shadow-soft ring-1 ring-ink/5 sm:block sm:rounded-[24px]">
        <div className="relative min-h-full overflow-hidden bg-mint sm:aspect-[4/3]">
          <Image src={product.image} alt={product.name} fill className="object-cover" sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" />
        </div>
        <div className="grid gap-2 p-3 sm:gap-3 sm:p-4">
          <div>
            <h3 className="text-base font-black leading-tight">{product.name}</h3>
            <div className="mt-1 flex items-end gap-2">
              <p className="text-lg font-black">{formatUgx(product.price)}</p>
              {product.compareAtPrice ? <p className="pb-0.5 text-xs text-ink/45 line-through">{formatUgx(product.compareAtPrice)}</p> : null}
            </div>
          </div>
          <button onClick={() => setOpen(true)} className="focus-ring min-h-11 rounded-full bg-ink px-5 text-sm font-black text-white transition hover:bg-cocoa">
            View Details
          </button>
        </div>
      </article>

      {open ? (
        <div className="fixed inset-0 z-[70] bg-ink/45 px-4 py-6 backdrop-blur-sm" role="dialog" aria-modal="true" aria-label={`${product.name} details`}>
          <div className="mx-auto flex min-h-full max-w-xl items-end sm:items-center">
            <div className="max-h-[88svh] w-full overflow-y-auto rounded-[28px] bg-white shadow-soft">
              <div className="sticky top-0 z-10 flex items-center justify-between border-b border-ink/10 bg-white px-5 py-4">
                <p className="font-black">{product.name}</p>
                <button onClick={() => setOpen(false)} className="focus-ring grid size-10 place-items-center rounded-full bg-cream" aria-label="Close details">
                  <X className="size-5" />
                </button>
              </div>
              <div className="p-5">
                <div className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-mint">
                  <Image src={product.image} alt={product.name} fill className="object-cover" sizes="(min-width: 640px) 520px, 100vw" />
                </div>
                <p className="mt-4 text-2xl font-black">{formatUgx(product.price)}</p>
                <p className="mt-3 text-sm leading-6 text-ink/70">{product.description}</p>
                <div className="mt-5 rounded-3xl bg-cream p-4">
                  <p className="font-black">Package contents</p>
                  <ul className="mt-3 grid gap-2 text-sm text-ink/70">
                    {product.includes.map((item) => (
                      <li key={item}>- {item}</li>
                    ))}
                  </ul>
                </div>
                <div className="mt-5 grid gap-3 sm:grid-cols-3">
                  <a href={whatsappUrl(message)} target="_blank" rel="noreferrer" className="focus-ring inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-sage px-5 font-black text-ink">
                    <MessageCircle className="size-5" />
                    WhatsApp Order
                  </a>
                  <AddToCartButton product={product} compact>
                    Add to Cart
                  </AddToCartButton>
                  <button onClick={() => setOpen(false)} className="focus-ring min-h-12 rounded-full bg-ink px-5 font-black text-white">
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
