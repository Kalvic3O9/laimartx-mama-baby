import { Mail, MapPin, Phone } from "lucide-react";
import { brand, whatsappUrl } from "@/lib/brand";

export default function ContactPage() {
  const contactItems = [
    { Icon: Phone, text: brand.phone },
    { Icon: Mail, text: brand.email },
    { Icon: MapPin, text: brand.location }
  ];

  return (
    <section className="mx-auto max-w-5xl px-4 py-14 sm:px-6 lg:px-8">
      <div className="grid gap-6 md:grid-cols-[1fr_1fr]">
        <div className="rounded-[32px] bg-white p-8 shadow-soft">
          <p className="text-sm font-black uppercase text-cocoa">Contact</p>
          <h1 className="mt-2 text-4xl font-black">Talk to us</h1>
          <p className="mt-4 leading-7 text-ink/65">Need a custom school pack, baby shower hamper, or bulk monthly order? Send us the details and we will confirm availability.</p>
          <a href={whatsappUrl("Hello Laimartx Mama & Baby, I need help with an order.")} target="_blank" rel="noreferrer" className="focus-ring mt-8 inline-flex min-h-12 items-center justify-center rounded-full bg-sage px-6 font-black text-ink">
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
