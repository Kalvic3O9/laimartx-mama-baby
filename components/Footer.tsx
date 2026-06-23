import Link from "next/link";
import { brand } from "@/lib/brand";

export function Footer() {
  return (
    <footer className="border-t border-ink/10 bg-white">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 md:grid-cols-4 lg:px-8">
        <div className="md:col-span-2">
          <p className="text-lg font-black">{brand.name}</p>
          <p className="mt-3 max-w-md text-sm leading-6 text-ink/65">{brand.tagline} Built for fast TikTok and WhatsApp shoppers who need clear prices, trusted delivery, and easy checkout.</p>
        </div>
        <div>
          <p className="font-bold">Shop</p>
          <div className="mt-3 grid gap-2 text-sm text-ink/65">
            <Link href="/shop">All packages</Link>
            <Link href="/track-order">Track order</Link>
            <Link href="/contact">WhatsApp support</Link>
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
