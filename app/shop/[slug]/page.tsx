import Image from "next/image";
import { notFound } from "next/navigation";
import { MessageCircle, PackageCheck } from "lucide-react";
import { AddToCartButton } from "@/components/cart/AddToCartButton";
import { ProductCard } from "@/components/ProductCard";
import { formatUgx, whatsappUrl } from "@/lib/brand";
import { getProductBySlug, products } from "@/lib/products";

export default function ProductDetailsPage({ params }: { params: { slug: string } }) {
  const product = getProductBySlug(params.slug);
  if (!product) notFound();

  const related = products.filter((item) => item.category === product.category && item.id !== product.id).slice(0, 3);
  const message = `Hello, I want to order ${product.name} at ${formatUgx(product.price)}. Please confirm availability and delivery.`;

  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="relative aspect-[4/3] overflow-hidden rounded-[32px] bg-mint shadow-soft">
          <Image src={product.image} alt={product.name} fill priority className="object-cover" sizes="(min-width: 1024px) 50vw, 100vw" />
        </div>
        <div className="rounded-[32px] bg-white p-6 shadow-soft sm:p-8">
          <p className="inline-flex rounded-full bg-blush/60 px-4 py-2 text-sm font-bold text-ink">{product.category}</p>
          <h1 className="mt-5 text-4xl font-black leading-tight">{product.name}</h1>
          <p className="mt-4 text-lg leading-8 text-ink/65">{product.description}</p>
          <div className="mt-6 flex items-end gap-3">
            <p className="text-3xl font-black">{formatUgx(product.price)}</p>
            {product.compareAtPrice ? <p className="pb-1 text-sm text-ink/45 line-through">{formatUgx(product.compareAtPrice)}</p> : null}
          </div>
          <p className="mt-2 text-sm font-bold text-sage">{product.stock} packs available</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <AddToCartButton product={product} />
            <a href={whatsappUrl(message)} target="_blank" rel="noreferrer" className="focus-ring inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-sage px-6 font-black text-ink">
              <MessageCircle className="size-5" />
              Order on WhatsApp
            </a>
          </div>
          <div className="mt-8 rounded-3xl bg-cream p-5">
            <div className="flex items-center gap-2 font-black">
              <PackageCheck className="size-5" />
              What is included
            </div>
            <ul className="mt-4 grid gap-2 text-sm text-ink/70">
              {product.includes.map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {related.length > 0 ? (
        <div className="mt-12">
          <h2 className="text-2xl font-black">Related packages</h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>
        </div>
      ) : null}
    </section>
  );
}
