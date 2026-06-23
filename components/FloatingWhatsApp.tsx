import { brand, whatsappUrl } from "@/lib/brand";

export function FloatingWhatsApp() {
  return (
    <a
      href={whatsappUrl(`Hello ${brand.name}, I would like help choosing a care package.`)}
      className="focus-ring fixed bottom-24 right-4 z-50 inline-flex size-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-soft transition hover:scale-105 lg:bottom-5 lg:right-5"
      aria-label="Chat on WhatsApp"
      target="_blank"
      rel="noreferrer"
    >
      <svg viewBox="0 0 32 32" className="size-7" aria-hidden="true" fill="currentColor">
        <path d="M16.04 4.5C9.7 4.5 4.54 9.62 4.54 15.92c0 2.03.54 4.01 1.57 5.75L4.5 27.5l5.99-1.57a11.57 11.57 0 0 0 5.55 1.41c6.34 0 11.5-5.12 11.5-11.42S22.38 4.5 16.04 4.5Zm0 20.9c-1.75 0-3.45-.47-4.94-1.36l-.35-.21-3.55.93.95-3.45-.23-.36a9.4 9.4 0 0 1-1.45-5.03c0-5.22 4.29-9.48 9.57-9.48s9.57 4.26 9.57 9.48-4.29 9.48-9.57 9.48Zm5.25-7.1c-.29-.14-1.7-.83-1.96-.92-.26-.1-.45-.14-.64.14-.19.29-.74.92-.91 1.11-.17.19-.34.21-.63.07-.29-.14-1.22-.45-2.33-1.43-.86-.76-1.44-1.7-1.61-1.99-.17-.29-.02-.45.13-.59.13-.13.29-.34.43-.51.14-.17.19-.29.29-.48.1-.19.05-.36-.02-.51-.07-.14-.64-1.53-.88-2.1-.23-.55-.47-.48-.64-.49h-.55c-.19 0-.5.07-.76.36-.26.29-1 1-1 2.44s1.03 2.83 1.17 3.02c.14.19 2.03 3.09 4.93 4.33.69.3 1.22.48 1.64.61.69.22 1.32.19 1.82.12.56-.08 1.7-.69 1.94-1.36.24-.67.24-1.24.17-1.36-.07-.12-.26-.19-.55-.33Z" />
      </svg>
    </a>
  );
}
