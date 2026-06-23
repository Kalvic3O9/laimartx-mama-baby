export type OrderStatus = "Pending" | "Paid" | "Packed" | "Dispatched" | "Delivered" | "Cancelled";

export type CustomerDetails = {
  name: string;
  phone: string;
  whatsapp: string;
  location: string;
  deliveryAddress: string;
};

export type OrderItem = {
  productId: string;
  name: string;
  price: number;
  quantity: number;
};

export type Order = {
  orderNumber: string;
  customer: CustomerDetails;
  items: OrderItem[];
  total: number;
  paymentMethod: "Mobile Money" | "Card" | "Pay on Delivery";
  status: OrderStatus;
  createdAt: string;
};

export const sampleOrders: Order[] = [
  {
    orderNumber: "LMX-2401",
    customer: {
      name: "Amina N.",
      phone: "+256 701 234 567",
      whatsapp: "+256 701 234 567",
      location: "Ntinda",
      deliveryAddress: "Ntinda, near Capital Shoppers"
    },
    items: [{ productId: "pkg-hospital-bag", name: "Hospital Delivery Bag Pack", price: 245000, quantity: 1 }],
    total: 245000,
    paymentMethod: "Mobile Money",
    status: "Packed",
    createdAt: "2026-06-21"
  },
  {
    orderNumber: "LMX-2402",
    customer: {
      name: "Grace K.",
      phone: "+256 782 111 909",
      whatsapp: "+256 782 111 909",
      location: "Entebbe",
      deliveryAddress: "Entebbe Road, Kajjansi stage"
    },
    items: [{ productId: "pkg-school-girl", name: "School Girl Period Pack", price: 72000, quantity: 3 }],
    total: 216000,
    paymentMethod: "Pay on Delivery",
    status: "Dispatched",
    createdAt: "2026-06-22"
  }
];

export const makeOrderNumber = () => `LMX-${Math.floor(100000 + Math.random() * 900000)}`;
