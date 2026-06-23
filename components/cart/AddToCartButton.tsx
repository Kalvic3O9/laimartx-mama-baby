"use client";

import type { ReactNode } from "react";
import type { Product } from "@/lib/products";
import { useCart } from "@/components/cart/CartProvider";

export function AddToCartButton({ product, children, compact = false }: { product: Product; children?: ReactNode; compact?: boolean }) {
  const { addItem } = useCart();

  return (
    <button
      onClick={() => addItem(product)}
      className={`focus-ring inline-flex items-center justify-center gap-2 rounded-full bg-ink font-bold text-white transition hover:bg-cocoa ${compact ? "min-h-10 px-4 text-sm" : "min-h-12 px-6"}`}
    >
      {children || "Add to cart"}
    </button>
  );
}
