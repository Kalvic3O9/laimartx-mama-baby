"use client";

import Link from "next/link";
import { useState } from "react";
import { Edit3, Plus, Trash2, X } from "lucide-react";
import { useManagedProducts } from "@/components/products/ProductStore";
import { formatUgx } from "@/lib/brand";
import { categories, type Product, type ProductCategory } from "@/lib/products";

type ProductDraft = {
  name: string;
  price: string;
  stock: string;
  category: ProductCategory;
  image: string;
};

const fallbackImage = "/images/hero-care-packages.png";

const emptyDraft: ProductDraft = {
  name: "",
  price: "",
  stock: "",
  category: categories[0],
  image: fallbackImage
};

function productToDraft(product: Product): ProductDraft {
  return {
    name: product.name,
    price: String(product.price),
    stock: String(product.stock),
    category: product.category,
    image: product.image || fallbackImage
  };
}

function slugify(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

export function AdminProductsClient() {
  const { products, saveProducts } = useManagedProducts();
  const [draft, setDraft] = useState<ProductDraft>(emptyDraft);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [editDraft, setEditDraft] = useState<ProductDraft>(emptyDraft);

  function addProduct() {
    if (!draft.name || !draft.price) return;
    const product: Product = {
      id: `pkg-${Date.now()}`,
      slug: slugify(draft.name),
      name: draft.name,
      price: Number(draft.price),
      stock: Number(draft.stock || 0),
      category: draft.category,
      image: draft.image || fallbackImage,
      description: "New package draft. Edit this description in the database after Supabase is connected.",
      includes: ["Item one", "Item two", "Item three"],
      tags: ["draft"]
    };
    saveProducts([product, ...products]);
    setDraft(emptyDraft);
  }

  function openEdit(product: Product) {
    setEditingProduct(product);
    setEditDraft(productToDraft(product));
  }

  function saveEdit() {
    if (!editingProduct || !editDraft.name || !editDraft.price) return;

    const updatedProduct: Product = {
      ...editingProduct,
      name: editDraft.name,
      slug: slugify(editDraft.name) || editingProduct.slug,
      price: Number(editDraft.price),
      stock: Number(editDraft.stock || 0),
      category: editDraft.category,
      image: editDraft.image || fallbackImage
    };

    saveProducts(products.map((product) => (product.id === editingProduct.id ? updatedProduct : product)));
    setEditingProduct(null);
  }

  function deleteProduct(productId: string) {
    saveProducts(products.filter((item) => item.id !== productId));
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
        <input className="focus-ring mt-3 min-h-12 w-full rounded-2xl border border-ink/10 bg-cream px-4" placeholder="Image path or URL" value={draft.image} onChange={(event) => setDraft({ ...draft, image: event.target.value })} />
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
              <button onClick={() => openEdit(product)} className="focus-ring grid size-10 place-items-center rounded-full bg-mint" aria-label={`Edit ${product.name}`}>
                <Edit3 className="size-4" />
              </button>
              <button onClick={() => deleteProduct(product.id)} className="focus-ring grid size-10 place-items-center rounded-full bg-blush/60" aria-label={`Delete ${product.name}`}>
                <Trash2 className="size-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {editingProduct ? (
        <div className="fixed inset-0 z-[80] bg-ink/45 px-4 py-6 backdrop-blur-sm" role="dialog" aria-modal="true" aria-label={`Edit ${editingProduct.name}`}>
          <div className="mx-auto flex min-h-full max-w-xl items-end sm:items-center">
            <div className="max-h-[90svh] w-full overflow-y-auto rounded-[28px] bg-white p-5 shadow-soft">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-black uppercase text-cocoa">Edit package</p>
                  <h2 className="mt-1 text-2xl font-black">{editingProduct.name}</h2>
                </div>
                <button onClick={() => setEditingProduct(null)} className="focus-ring grid size-10 place-items-center rounded-full bg-cream" aria-label="Cancel edit">
                  <X className="size-5" />
                </button>
              </div>

              <div className="mt-5 grid gap-4">
                <label>
                  <span className="text-sm font-bold">Product name</span>
                  <input className="focus-ring mt-2 min-h-12 w-full rounded-2xl border border-ink/10 bg-cream px-4" value={editDraft.name} onChange={(event) => setEditDraft({ ...editDraft, name: event.target.value })} />
                </label>
                <div className="grid gap-4 sm:grid-cols-2">
                  <label>
                    <span className="text-sm font-bold">Price</span>
                    <input className="focus-ring mt-2 min-h-12 w-full rounded-2xl border border-ink/10 bg-cream px-4" value={editDraft.price} onChange={(event) => setEditDraft({ ...editDraft, price: event.target.value })} />
                  </label>
                  <label>
                    <span className="text-sm font-bold">Stock</span>
                    <input className="focus-ring mt-2 min-h-12 w-full rounded-2xl border border-ink/10 bg-cream px-4" value={editDraft.stock} onChange={(event) => setEditDraft({ ...editDraft, stock: event.target.value })} />
                  </label>
                </div>
                <label>
                  <span className="text-sm font-bold">Category</span>
                  <select className="focus-ring mt-2 min-h-12 w-full rounded-2xl border border-ink/10 bg-cream px-4" value={editDraft.category} onChange={(event) => setEditDraft({ ...editDraft, category: event.target.value as ProductCategory })}>
                    {categories.map((category) => (
                      <option key={category}>{category}</option>
                    ))}
                  </select>
                </label>
                <label>
                  <span className="text-sm font-bold">Image</span>
                  <input className="focus-ring mt-2 min-h-12 w-full rounded-2xl border border-ink/10 bg-cream px-4" value={editDraft.image} onChange={(event) => setEditDraft({ ...editDraft, image: event.target.value })} />
                </label>
              </div>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <button onClick={saveEdit} className="focus-ring min-h-12 rounded-full bg-ink px-6 font-black text-white hover:bg-cocoa">
                  Save
                </button>
                <button onClick={() => setEditingProduct(null)} className="focus-ring min-h-12 rounded-full bg-cream px-6 font-black text-ink">
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}
