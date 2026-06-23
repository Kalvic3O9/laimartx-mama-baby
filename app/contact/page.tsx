import { Mail, MapPin, Phone } from "lucide-react";
import { brand, whatsappUrl } from "@/lib/brand";

export default function ContactPage() {
  const contactItems = [
    { Icon: Phone, text: brand.phone },
    { Icon: Mail, text: brand.email },
    { Icon: MapPin, text: brand.location }
  ];

  return (
    <section className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="grid gap-6 md:grid-cols-[1fr_1fr]">
        <div className="rounded-[28px] bg-white p-6 shadow-soft sm:p-8">
          <p className="text-sm font-black uppercase text-cocoa">Contact</p>
          <h1 className="mt-2 text-3xl font-black sm:text-4xl">Talk to us</h1>
          <p className="mt-4 leading-7 text-ink/65">{brand.name} curates practical essentials for mothers, babies, gifts, and school period packs across Uganda.</p>
          <p className="mt-3 leading-7 text-ink/65">Need a custom pack, baby shower hamper, or bulk order? Send us the details and we will confirm availability.</p>
          <a href={whatsappUrl("Hello Laimartx Mama & Baby, I need help with an order.")} target="_blank" rel="noreferrer" className="focus-ring mt-6 inline-flex min-h-12 items-center justify-center rounded-full bg-sage px-6 font-black text-ink">
            Chat on WhatsApp
          </a>
        </div>
        <div className="grid gap-4">
          {contactItems.map(({ Icon, text }) => (
            <div key={text} className="flex items-center gap-4 rounded-3xl bg-white p-5 shadow-soft">
              <span className="grid size-12 place-items-center rounded-2xl bg-blush/60">
                <Icon className="size-5" />
              </span>
              <span className="font-bold">{text}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
