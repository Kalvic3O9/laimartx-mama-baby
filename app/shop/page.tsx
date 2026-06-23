import { ProductCard } from "@/components/ProductCard";
import { categories, products } from "@/lib/products";

export default function ShopPage({ searchParams }: { searchParams: { category?: string } }) {
  const selected = searchParams.category;
  const visibleProducts = selected ? products.filter((product) => product.category === selected) : products;

  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="max-w-2xl">
        <p className="text-sm font-black uppercase text-cocoa">Shop packages</p>
        <h1 className="mt-2 text-4xl font-black">Care packages ready for delivery</h1>
        <p className="mt-4 leading-7 text-ink/65">Choose a bundle, add it to cart, or order directly on WhatsApp from the package page.</p>
      </div>
      <div className="mt-7 flex gap-2 overflow-x-auto pb-2">
        <a href="/shop" className={`shrink-0 rounded-full px-4 py-2 text-sm font-bold ${!selected ? "bg-ink text-white" : "bg-white text-ink"}`}>
          All
        </a>
        {categories.map((category) => (
          <a key={category} href={`/shop?category=${encodeURIComponent(category)}`} className={`shrink-0 rounded-full px-4 py-2 text-sm font-bold ${selected === category ? "bg-ink text-white" : "bg-white text-ink"}`}>
            {category}
          </a>
        ))}
      </div>
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {visibleProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
