import Image from "next/image";
import { ButtonLink } from "@/components/ButtonLink";
import { ProductGrid } from "@/components/ProductGrid";
import { brand } from "@/lib/brand";

export default function HomePage() {
  return (
    <>
      <section className="relative overflow-hidden bg-cream">
        <div className="relative min-h-[28svh] sm:min-h-[40svh]">
          <Image src="/images/hero-care-packages.png" alt="Curated mother, baby, and menstrual care packages" fill priority className="object-cover" sizes="100vw" />
          <div className="absolute inset-0 bg-gradient-to-r from-cream via-cream/88 to-cream/40" />
          <div className="relative mx-auto flex min-h-[28svh] max-w-7xl items-center px-4 py-5 sm:min-h-[40svh] sm:px-6 sm:py-7 lg:px-8">
            <div className="max-w-xl">
              <p className="mb-3 inline-flex rounded-full bg-white/90 px-4 py-2 text-xs font-bold text-cocoa shadow-sm">Uganda delivery</p>
              <h1 className="text-4xl font-black leading-[1.05] tracking-normal sm:text-5xl">{brand.name}</h1>
              <p className="mt-3 max-w-md text-base leading-7 text-ink/75 sm:text-lg">Curated essentials for mothers and babies.</p>
              <div className="mt-5">
                <ButtonLink href="/shop">Shop Packages</ButtonLink>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-4 sm:px-6 sm:py-5 lg:px-8">
        <ProductGrid compact />
      </section>
    </>
  );
}
