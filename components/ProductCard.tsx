import Image from "next/image";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { formatUgx } from "@/lib/brand";
import type { Product } from "@/lib/products";
import { AddToCartButton } from "@/components/cart/AddToCartButton";

export function ProductCard({ product }: { product: Product }) {
  return (
    <article className="overflow-hidden rounded-[28px] bg-white shadow-soft ring-1 ring-ink/5">
      <Link href={`/shop/${product.slug}`} className="block">
        <div className="relative aspect-[4/3] overflow-hidden bg-mint">
          <Image src={product.image} alt={product.name} fill className="object-cover transition duration-500 hover:scale-105" sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" />
          <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-ink">{product.category}</span>
        </div>
      </Link>
      <div className="grid gap-4 p-5">
        <div>
          <Link href={`/shop/${product.slug}`} className="text-lg font-black leading-tight hover:text-cocoa">
            {product.name}
          </Link>
          <p className="mt-2 line-clamp-2 text-sm leading-6 text-ink/65">{product.description}</p>
        </div>
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-lg font-black">{formatUgx(product.price)}</p>
            {product.compareAtPrice ? <p className="text-xs text-ink/45 line-through">{formatUgx(product.compareAtPrice)}</p> : null}
          </div>
          <AddToCartButton product={product} compact>
            <ShoppingCart className="size-4" />
            Add
          </AddToCartButton>
        </div>
      </div>
    </article>
  );
}
