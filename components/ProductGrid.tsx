"use client";

import { ProductCard } from "@/components/ProductCard";
import { useManagedProducts } from "@/components/products/ProductStore";
import type { ProductCategory } from "@/lib/products";

export function ProductGrid({ category, compact = false }: { category?: ProductCategory | string; compact?: boolean }) {
  const { products } = useManagedProducts();
  const visibleProducts = category ? products.filter((product) => product.category === category) : products;

  return (
    <div className={`grid ${compact ? "gap-4" : "gap-6"} sm:grid-cols-2 lg:grid-cols-3`}>
      {visibleProducts.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
