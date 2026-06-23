"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { Product } from "@/lib/products";

export type CartLine = {
  productId: string;
  slug: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
};

type CartContextValue = {
  lines: CartLine[];
  itemCount: number;
  subtotal: number;
  addItem: (product: Product, quantity?: number) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  removeItem: (productId: string) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);
const storageKey = "laimartx-cart";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);

  useEffect(() => {
    const saved = window.localStorage.getItem(storageKey);
    if (saved) setLines(JSON.parse(saved));
  }, []);

  useEffect(() => {
    window.localStorage.setItem(storageKey, JSON.stringify(lines));
  }, [lines]);

  const value = useMemo<CartContextValue>(() => {
    const itemCount = lines.reduce((sum, line) => sum + line.quantity, 0);
    const subtotal = lines.reduce((sum, line) => sum + line.price * line.quantity, 0);

    return {
      lines,
      itemCount,
      subtotal,
      addItem(product, quantity = 1) {
        setLines((current) => {
          const existing = current.find((line) => line.productId === product.id);
          if (existing) {
            return current.map((line) => (line.productId === product.id ? { ...line, quantity: line.quantity + quantity } : line));
          }
          return [
            ...current,
            {
              productId: product.id,
              slug: product.slug,
              name: product.name,
              price: product.price,
              image: product.image,
              quantity
            }
          ];
        });
      },
      updateQuantity(productId, quantity) {
        setLines((current) => current.map((line) => (line.productId === productId ? { ...line, quantity: Math.max(1, quantity) } : line)));
      },
      removeItem(productId) {
        setLines((current) => current.filter((line) => line.productId !== productId));
      },
      clearCart() {
        setLines([]);
      }
    };
  }, [lines]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const value = useContext(CartContext);
  if (!value) throw new Error("useCart must be used inside CartProvider");
  return value;
}
