import Link from "next/link";
import { brand } from "@/lib/brand";

export function Footer() {
  return (
    <footer className="border-t border-ink/10 bg-white">
      <div className="mx-auto grid max-w-7xl gap-6 px-4 py-8 sm:px-6 md:grid-cols-4 lg:px-8">
        <div className="md:col-span-2">
          <p className="text-lg font-black">{brand.name}</p>
          <p className="mt-2 max-w-md text-sm leading-6 text-ink/65">Curated essentials for mothers & babies</p>
        </div>
        <div>
          <p className="font-bold">Shop</p>
          <div className="mt-3 grid gap-2 text-sm text-ink/65">
            <Link href="/shop">Shop</Link>
            <Link href="/track-order">Track Order</Link>
            <Link href="/contact">WhatsApp Support</Link>
          </div>
        </div>
        <div>
          <p className="font-bold">Legal</p>
          <div className="mt-3 grid gap-2 text-sm text-ink/65">
            <Link href="/privacy">Privacy Policy</Link>
            <Link href="/terms">Terms and Conditions</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
