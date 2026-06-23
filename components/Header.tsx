"use client";

import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { brand } from "@/lib/brand";
import { useCart } from "@/components/cart/CartProvider";

const nav = [
  { href: "/", label: "Home" },
  { href: "/shop", label: "Shop" },
  { href: "/track-order", label: "Track" },
  { href: "/contact", label: "Contact" }
];

export function Header() {
  const { itemCount } = useCart();

  return (
    <header className="sticky top-0 z-40 border-b border-ink/10 bg-cream/92 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3">
          <span className="grid size-10 place-items-center rounded-2xl bg-blush text-base font-black text-ink shadow-sm">Lx</span>
          <span className="leading-tight">
            <span className="block text-sm font-black sm:text-base">{brand.name}</span>
            <span className="block text-xs text-cocoa">Curated essentials for mothers & babies</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {nav.map((item) => (
            <Link key={item.href} href={item.href} className="focus-ring rounded-full px-4 py-2 text-sm font-semibold text-ink/75 hover:bg-white hover:text-ink">
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link href="/cart" className="focus-ring relative grid size-11 place-items-center rounded-full bg-white text-ink shadow-sm" aria-label="Cart">
            <ShoppingBag className="size-5" />
            {itemCount > 0 ? (
              <span className="absolute -right-1 -top-1 grid min-w-5 place-items-center rounded-full bg-rose px-1 text-xs font-bold text-white">{itemCount}</span>
            ) : null}
          </Link>
        </div>
      </div>
    </header>
  );
}
