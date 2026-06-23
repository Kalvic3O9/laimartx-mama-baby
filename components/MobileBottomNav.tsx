"use client";

import Link from "next/link";
import { Home, MapPinned, PackageSearch, Phone } from "lucide-react";

const items = [
  { href: "/", label: "Home", Icon: Home },
  { href: "/shop", label: "Shop", Icon: PackageSearch },
  { href: "/track-order", label: "Track", Icon: MapPinned },
  { href: "/contact", label: "Contact", Icon: Phone }
];

export function MobileBottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-ink/10 bg-white/95 px-3 pb-[calc(env(safe-area-inset-bottom)+0.5rem)] pt-2 shadow-[0_-12px_30px_rgba(39,33,31,0.08)] backdrop-blur lg:hidden" aria-label="Mobile navigation">
      <div className="mx-auto grid max-w-md grid-cols-4 gap-1">
        {items.map(({ href, label, Icon }) => (
          <Link key={href} href={href} className="focus-ring flex min-h-12 flex-col items-center justify-center gap-1 rounded-2xl text-xs font-bold text-ink/70 hover:bg-cream hover:text-ink">
            <Icon className="size-5" />
            <span>{label}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
}
