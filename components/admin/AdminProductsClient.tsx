"use client";

import Link from "next/link";
import { useState } from "react";
import { Edit3, Plus, Trash2 } from "lucide-react";
import { formatUgx } from "@/lib/brand";
import { categories, products as sampleProducts, type Product } from "@/lib/products";

export function AdminProductsClient() {
  const [products, setProducts] = useState<Product[]>(sampleProducts);
  const [draft, setDraft] = useState({ name: "", price: "", stock: "", category: categories[0] });

  function addProduct() {
    if (!draft.name || !draft.price) return;
    const product: Product = {
      id: `pkg-${Date.now()}`,
      slug: draft.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""),
      name: draft.name,
      price: Number(draft.price),
      stock: Number(draft.stock || 0),
      category: draft.category,
      image: "/images/hero-care-packages.png",
      description: "New package draft. Edit this description in the database after Supabase is connected.",
      includes: ["Item one", "Item two", "Item three"],
      tags: ["draft"]
    };
    setProducts((current) => [product, ...current]);
    setDraft({ name: "", price: "", stock: "", category: categories[0] });
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="text-sm font-black uppercase text-cocoa">Admin products</p>
          <h1 className="mt-2 text-4xl font-black">Packages and stock</h1>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Link href="/admin" className="focus-ring inline-flex min-h-12 items-center justify-center rounded-full bg-white px-6 font-black text-ink ring-1 ring-ink/10 hover:bg-cream">
            Dashboard
          </Link>
          <form action="/api/admin/logout" method="post">
            <button className="focus-ring inline-flex min-h-12 w-full items-center justify-center rounded-full bg-ink px-6 font-black text-white hover:bg-cocoa" type="submit">
              Logout
            </button>
          </form>
        </div>
      </div>

      <div className="mt-8 rounded-[28px] bg-white p-5 shadow-soft">
        <h2 className="text-xl font-black">Add package</h2>
        <div className="mt-5 grid gap-3 md:grid-cols-[1fr_160px_120px_1fr_auto]">
          <input className="focus-ring min-h-12 rounded-2xl border border-ink/10 bg-cream px-4" placeholder="Package name" value={draft.name} onChange={(event) => setDraft({ ...draft, name: event.target.value })} />
          <input className="focus-ring min-h-12 rounded-2xl border border-ink/10 bg-cream px-4" placeholder="Price" value={draft.price} onChange={(event) => setDraft({ ...draft, price: event.target.value })} />
          <input className="focus-ring min-h-12 rounded-2xl border border-ink/10 bg-cream px-4" placeholder="Stock" value={draft.stock} onChange={(event) => setDraft({ ...draft, stock: event.target.value })} />
          <select className="focus-ring min-h-12 rounded-2xl border border-ink/10 bg-cream px-4" value={draft.category} onChange={(event) => setDraft({ ...draft, category: event.target.value as Product["category"] })}>
            {categories.map((category) => (
              <option key={category}>{category}</option>
            ))}
          </select>
          <button onClick={addProduct} className="focus-ring inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-ink px-5 font-black text-white">
            <Plus className="size-4" />
            Add
          </button>
        </div>
        <p className="mt-3 text-sm text-ink/60">Image upload is represented in the UI and schema; connect Supabase Storage before launch.</p>
      </div>

      <div className="mt-6 grid gap-4">
        {products.map((product) => (
          <div key={product.id} className="grid gap-4 rounded-[24px] bg-white p-5 shadow-soft md:grid-cols-[1fr_auto_auto_auto] md:items-center">
            <div>
              <p className="font-black">{product.name}</p>
              <p className="mt-1 text-sm text-ink/60">{product.category}</p>
            </div>
            <p className="font-bold">{formatUgx(product.price)}</p>
            <p className="rounded-full bg-cream px-4 py-2 text-sm font-bold">{product.stock} in stock</p>
            <div className="flex gap-2">
              <button className="focus-ring grid size-10 place-items-center rounded-full bg-mint" aria-label="Edit product">
                <Edit3 className="size-4" />
              </button>
              <button onClick={() => setProducts((current) => current.filter((item) => item.id !== product.id))} className="focus-ring grid size-10 place-items-center rounded-full bg-blush/60" aria-label="Delete product">
                <Trash2 className="size-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
