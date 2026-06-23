import Image from "next/image";
import { ArrowRight, BadgeCheck, Gift, PackageCheck, Truck } from "lucide-react";
import { ButtonLink } from "@/components/ButtonLink";
import { ProductCard } from "@/components/ProductCard";
import { brand } from "@/lib/brand";
import { categories, featuredProducts } from "@/lib/products";

export default function HomePage() {
  const trustItems = [
    { Icon: PackageCheck, title: "Curated bundles", text: "Ready packages with clear inclusions." },
    { Icon: Truck, title: "Kampala delivery", text: brand.deliveryNote },
    { Icon: BadgeCheck, title: "Manual confirmation", text: "Admin confirms payment and order status." }
  ];

  return (
    <>
      <section className="relative overflow-hidden bg-cream">
        <div className="relative min-h-[78svh]">
          <Image src="/images/hero-care-packages.png" alt="Curated mother, baby, and menstrual care packages" fill priority className="object-cover" sizes="100vw" />
          <div className="absolute inset-0 bg-gradient-to-r from-cream via-cream/78 to-cream/20" />
          <div className="relative mx-auto flex min-h-[78svh] max-w-7xl items-center px-4 py-14 sm:px-6 lg:px-8">
            <div className="max-w-2xl">
              <p className="mb-4 inline-flex rounded-full bg-white/90 px-4 py-2 text-sm font-bold text-cocoa shadow-sm">Uganda delivery • WhatsApp friendly</p>
              <h1 className="text-4xl font-black leading-[1.05] tracking-normal sm:text-5xl lg:text-6xl">{brand.name}</h1>
              <p className="mt-5 max-w-xl text-lg leading-8 text-ink/75">{brand.tagline} Browse, add to cart, checkout, then receive fast delivery or confirm through WhatsApp.</p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <ButtonLink href="/shop">
                  Shop care packages <ArrowRight className="ml-2 size-4" />
                </ButtonLink>
                <ButtonLink href="/track-order" variant="secondary">
                  Track an order
                </ButtonLink>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-6">
        <div className="mx-auto grid max-w-7xl gap-3 px-4 sm:grid-cols-3 sm:px-6 lg:px-8">
          {trustItems.map(({ Icon, title, text }) => (
            <div key={title} className="flex gap-3 rounded-3xl bg-cream p-4">
              <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-mint">
                <Icon className="size-5" />
              </span>
              <div>
                <p className="font-black">{title}</p>
                <p className="mt-1 text-sm leading-6 text-ink/60">{text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-black uppercase text-cocoa">Featured packages</p>
            <h2 className="mt-2 text-3xl font-black">Popular this week</h2>
          </div>
          <ButtonLink href="/shop" variant="ghost">
            View all
          </ButtonLink>
        </div>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featuredProducts.slice(0, 3).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <section className="bg-mint py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <Gift className="size-6" />
            <h2 className="text-3xl font-black">Shop by need</h2>
          </div>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map((category) => (
              <a key={category} href={`/shop?category=${encodeURIComponent(category)}`} className="focus-ring rounded-3xl bg-white p-5 font-black shadow-sm transition hover:-translate-y-1">
                {category}
              </a>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
