export default function PrivacyPage() {
  return (
    <section className="mx-auto max-w-4xl px-4 py-14 sm:px-6 lg:px-8">
      <div className="rounded-[32px] bg-white p-8 shadow-soft">
        <h1 className="text-4xl font-black">Privacy Policy</h1>
        <p className="mt-5 leading-7 text-ink/70">Laimartx Mama & Baby collects customer name, phone number, WhatsApp number, location, delivery address, order items, and payment method so we can process and deliver orders. Customer details are used only for order communication, delivery, support, and basic sales records.</p>
        <p className="mt-4 leading-7 text-ink/70">Payment confirmation is manual in this MVP. Do not submit sensitive card information directly through WhatsApp. Full payment gateways should be enabled before live card processing.</p>
      </div>
    </section>
  );
}
