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
  description: string;
  includes: string;
};

const fallbackImage = "/images/hero-care-packages.png";

const emptyDraft: ProductDraft = {
  name: "",
  price: "",
  stock: "",
  category: categories[0],
  image: fallbackImage,
  description: "",
  includes: ""
};

function productToDraft(product: Product): ProductDraft {
  return {
    name: product.name,
    price: String(product.price),
    stock: String(product.stock),
    category: product.category,
    image: product.image || fallbackImage,
    description: product.description,
    includes: product.includes.join("\n")
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
      description: draft.description || "New package draft.",
      includes: draft.includes.split("\n").map((item) => item.trim()).filter(Boolean),
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
      image: editDraft.image || fallbackImage,
      description: editDraft.description,
      includes: editDraft.includes.split("\n").map((item) => item.trim()).filter(Boolean)
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
        <textarea className="focus-ring mt-3 min-h-24 w-full rounded-2xl border border-ink/10 bg-cream px-4 py-3" placeholder="Short description" value={draft.description} onChange={(event) => setDraft({ ...draft, description: event.target.value })} />
        <textarea className="focus-ring mt-3 min-h-28 w-full rounded-2xl border border-ink/10 bg-cream px-4 py-3" placeholder="Package contents, one item per line" value={draft.includes} onChange={(event) => setDraft({ ...draft, includes: event.target.value })} />
        <p className="mt-3 text-sm text-ink/60">Image upload is represented in the UI and schema; connect Supabase Storage before launch.</p>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {products.map((product) => (
          <div key={product.id} className="overflow-hidden rounded-[24px] bg-white shadow-soft ring-1 ring-ink/5">
            <div className="relative aspect-[4/3] bg-mint">
              <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
            </div>
            <div className="grid gap-3 p-4">
              <div>
                <p className="text-xs font-black uppercase text-cocoa">{product.category}</p>
                <h2 className="mt-1 text-lg font-black leading-tight">{product.name}</h2>
                <p className="mt-1 text-lg font-black">{formatUgx(product.price)}</p>
                <p className="mt-2 line-clamp-2 text-sm leading-5 text-ink/65">{product.description}</p>
                <p className="mt-2 text-sm font-bold text-sage">{product.stock} in stock</p>
              </div>
              <div className="grid gap-2 sm:grid-cols-[1fr_auto_auto]">
                <Link href="/shop" className="focus-ring inline-flex min-h-11 items-center justify-center rounded-full bg-ink px-4 text-sm font-black text-white">
                  View Products
                </Link>
                <button onClick={() => openEdit(product)} className="focus-ring inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-mint px-4 text-sm font-black text-ink" aria-label={`Edit ${product.name}`}>
                  <Edit3 className="size-4" />
                  Edit
                </button>
                <button onClick={() => deleteProduct(product.id)} className="focus-ring inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-blush/60 px-4 text-sm font-black text-ink" aria-label={`Delete ${product.name}`}>
                  <Trash2 className="size-4" />
                  Delete
                </button>
              </div>
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
                <label>
                  <span className="text-sm font-bold">Short description</span>
                  <textarea className="focus-ring mt-2 min-h-24 w-full rounded-2xl border border-ink/10 bg-cream px-4 py-3" value={editDraft.description} onChange={(event) => setEditDraft({ ...editDraft, description: event.target.value })} />
                </label>
                <label>
                  <span className="text-sm font-bold">Package contents</span>
                  <textarea className="focus-ring mt-2 min-h-32 w-full rounded-2xl border border-ink/10 bg-cream px-4 py-3" value={editDraft.includes} onChange={(event) => setEditDraft({ ...editDraft, includes: event.target.value })} />
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
