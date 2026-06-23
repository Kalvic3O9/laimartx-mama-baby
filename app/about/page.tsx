import { brand } from "@/lib/brand";

export default function AboutPage() {
  return (
    <section className="mx-auto max-w-4xl px-4 py-14 sm:px-6 lg:px-8">
      <div className="rounded-[32px] bg-white p-8 shadow-soft">
        <p className="text-sm font-black uppercase text-cocoa">About us</p>
        <h1 className="mt-2 text-4xl font-black">{brand.name}</h1>
        <p className="mt-5 text-lg leading-8 text-ink/70">We make it easier for families, friends, schools, and women to buy practical care essentials as ready-made packages. The store is designed for quick mobile browsing, simple WhatsApp support, and reliable delivery coordination across Uganda.</p>
      </div>
    </section>
  );
}
