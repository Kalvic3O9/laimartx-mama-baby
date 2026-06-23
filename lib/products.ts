export type ProductCategory =
  | "Newborn Starter Packs"
  | "Hospital Delivery Bag Packs"
  | "Mother Recovery Packs"
  | "Baby Monthly Essentials Packs"
  | "Baby Gift Hampers"
  | "Menstrual Care Packs"
  | "School Girl Period Packs";

export type Product = {
  id: string;
  slug: string;
  name: string;
  category: ProductCategory;
  price: number;
  compareAtPrice?: number;
  stock: number;
  featured?: boolean;
  image: string;
  description: string;
  includes: string[];
  tags: string[];
};

export const categories: ProductCategory[] = [
  "Newborn Starter Packs",
  "Hospital Delivery Bag Packs",
  "Mother Recovery Packs",
  "Baby Monthly Essentials Packs",
  "Baby Gift Hampers",
  "Menstrual Care Packs",
  "School Girl Period Packs"
];

export const products: Product[] = [
  {
    id: "pkg-newborn-starter",
    slug: "newborn-starter-pack",
    name: "Newborn Starter Pack",
    category: "Newborn Starter Packs",
    price: 185000,
    compareAtPrice: 210000,
    stock: 24,
    featured: true,
    image: "/images/hero-care-packages.png",
    description: "A ready pack of soft newborn essentials for the first days at home.",
    includes: ["Diapers size 1", "Baby wipes", "Cotton wool", "Baby soap", "Receiving blanket", "Two soft onesies"],
    tags: ["newborn", "essentials", "giftable"]
  },
  {
    id: "pkg-hospital-bag",
    slug: "hospital-delivery-bag-pack",
    name: "Hospital Delivery Bag Pack",
    category: "Hospital Delivery Bag Packs",
    price: 245000,
    compareAtPrice: 275000,
    stock: 16,
    featured: true,
    image: "/images/hero-care-packages.png",
    description: "A practical delivery-day bundle for mum and baby, organized for hospital admission.",
    includes: ["Maternity pads", "Nursing pads", "Baby diapers", "Baby blanket", "Sanitizer", "Toiletry pouch", "Reusable bag"],
    tags: ["pregnancy", "hospital", "delivery"]
  },
  {
    id: "pkg-mother-recovery",
    slug: "mother-recovery-pack",
    name: "Mother Recovery Pack",
    category: "Mother Recovery Packs",
    price: 155000,
    stock: 20,
    featured: true,
    image: "/images/hero-care-packages.png",
    description: "Comfort-focused after-birth care items for new mothers recovering at home.",
    includes: ["Maternity pads", "Nursing pads", "Comfort tea", "Body wipes", "Gentle soap", "Storage pouch"],
    tags: ["mother care", "postpartum", "comfort"]
  },
  {
    id: "pkg-baby-monthly",
    slug: "baby-monthly-essentials-pack",
    name: "Baby Monthly Essentials Pack",
    category: "Baby Monthly Essentials Packs",
    price: 198000,
    stock: 32,
    image: "/images/hero-care-packages.png",
    description: "A monthly refill pack for busy parents who want baby basics delivered together.",
    includes: ["Diapers", "Wipes", "Baby jelly", "Laundry soap", "Baby wash", "Cotton buds"],
    tags: ["monthly", "refill", "parents"]
  },
  {
    id: "pkg-gift-hamper",
    slug: "baby-gift-hamper",
    name: "Baby Gift Hamper",
    category: "Baby Gift Hampers",
    price: 295000,
    compareAtPrice: 330000,
    stock: 12,
    featured: true,
    image: "/images/hero-care-packages.png",
    description: "A premium baby shower hamper with practical essentials and a polished gift finish.",
    includes: ["Baby blanket", "Onesies", "Diapers", "Wipes", "Baby towel", "Greeting card", "Gift basket"],
    tags: ["baby shower", "gift", "premium"]
  },
  {
    id: "pkg-menstrual-care",
    slug: "menstrual-care-pack",
    name: "Menstrual Care Pack",
    category: "Menstrual Care Packs",
    price: 58000,
    stock: 45,
    image: "/images/hero-care-packages.png",
    description: "A discreet period care pack for home, travel, campus, and workplace use.",
    includes: ["Sanitary pads", "Panty liners", "Wipes", "Pain relief placeholder", "Storage pouch", "Disposal bags"],
    tags: ["period care", "discreet", "women"]
  },
  {
    id: "pkg-school-girl",
    slug: "school-girl-period-pack",
    name: "School Girl Period Pack",
    category: "School Girl Period Packs",
    price: 72000,
    stock: 60,
    featured: true,
    image: "/images/hero-care-packages.png",
    description: "A school-ready period pack for parents, guardians, and school administrators.",
    includes: ["Sanitary pads", "Spare underwear", "Wipes", "Small pouch", "Period calendar card", "Disposal bags"],
    tags: ["school", "girls", "parents"]
  }
];

export const getProductBySlug = (slug: string) => products.find((product) => product.slug === slug);
export const featuredProducts = products.filter((product) => product.featured);
