export const brand = {
  name: "Laimartx Mama & Baby",
  shortName: "Laimartx",
  tagline: "Ready-made care packages for mothers, babies, and girls.",
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "256700000000",
  email: "orders@laimartx.co.ug",
  phone: "+256 700 000 000",
  location: "Kampala, Uganda",
  deliveryNote: "Same-day Kampala delivery on selected orders. Upcountry delivery available by courier.",
  paymentProviders: ["Mobile Money", "Card", "Pay on Delivery", "Pesapal placeholder", "Flutterwave placeholder"]
};

export const formatUgx = (value: number) =>
  new Intl.NumberFormat("en-UG", {
    style: "currency",
    currency: "UGX",
    maximumFractionDigits: 0
  }).format(value);

export const whatsappUrl = (message: string) => `https://wa.me/${brand.whatsappNumber}?text=${encodeURIComponent(message)}`;
