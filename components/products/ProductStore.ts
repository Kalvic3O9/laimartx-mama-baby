"use client";

import { useEffect, useState } from "react";
import { products as sampleProducts, type Product } from "@/lib/products";

const productStorageKey = "laimartx-products";
const productUpdateEvent = "laimartx-products-updated";

function readStoredProducts() {
  if (typeof window === "undefined") return sampleProducts;

  try {
    const saved = window.localStorage.getItem(productStorageKey);
    return saved ? (JSON.parse(saved) as Product[]) : sampleProducts;
  } catch {
    return sampleProducts;
  }
}

function writeStoredProducts(products: Product[]) {
  window.localStorage.setItem(productStorageKey, JSON.stringify(products));
  window.dispatchEvent(new Event(productUpdateEvent));
}

export function useManagedProducts() {
  const [products, setProducts] = useState<Product[]>(sampleProducts);

  useEffect(() => {
    setProducts(readStoredProducts());

    function refreshProducts() {
      setProducts(readStoredProducts());
    }

    window.addEventListener("storage", refreshProducts);
    window.addEventListener(productUpdateEvent, refreshProducts);

    return () => {
      window.removeEventListener("storage", refreshProducts);
      window.removeEventListener(productUpdateEvent, refreshProducts);
    };
  }, []);

  function saveProducts(nextProducts: Product[]) {
    setProducts(nextProducts);
    writeStoredProducts(nextProducts);
  }

  return { products, saveProducts };
}
