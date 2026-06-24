import type { Metadata } from "next";
import "./globals.css";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { CartProvider } from "@/components/cart/CartProvider";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { MobileBottomNav } from "@/components/MobileBottomNav";
import { AdminToolbar } from "@/components/admin/AdminToolbar";
import { brand } from "@/lib/brand";

export const metadata: Metadata = {
  title: `${brand.name} | Mother, Baby & Menstrual Care Packages`,
  description: "Curated care packages for mothers, babies, girls, schools, and baby shower gifting in Uganda."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="min-h-screen font-sans antialiased">
        <CartProvider>
          <Header />
          <AdminToolbar />
          <main className="pb-24 lg:pb-0">{children}</main>
          <Footer />
          <FloatingWhatsApp />
          <MobileBottomNav />
        </CartProvider>
      </body>
    </html>
  );
}
