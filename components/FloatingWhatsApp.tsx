import { MessageCircle } from "lucide-react";
import { brand, whatsappUrl } from "@/lib/brand";

export function FloatingWhatsApp() {
  return (
    <a
      href={whatsappUrl(`Hello ${brand.name}, I would like help choosing a care package.`)}
      className="focus-ring fixed bottom-5 right-5 z-50 inline-flex size-14 items-center justify-center rounded-full bg-sage text-ink shadow-soft transition hover:scale-105"
      aria-label="Chat on WhatsApp"
      target="_blank"
      rel="noreferrer"
    >
      <MessageCircle className="size-6" />
    </a>
  );
}
