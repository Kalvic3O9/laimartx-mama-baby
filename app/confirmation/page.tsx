import Link from "next/link";
import { CheckCircle2 } from "lucide-react";

export default function ConfirmationPage({ searchParams }: { searchParams: { order?: string } }) {
  return (
    <section className="mx-auto max-w-3xl px-4 py-20 text-center sm:px-6">
      <div className="mx-auto grid size-20 place-items-center rounded-full bg-mint">
        <CheckCircle2 className="size-10" />
      </div>
      <h1 className="mt-6 text-4xl font-black">Order received</h1>
      <p className="mt-4 text-lg leading-8 text-ink/65">Your order number is <span className="font-black text-ink">{searchParams.order || "LMX-PENDING"}</span>. Our team can confirm delivery and payment manually.</p>
      <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
        <Link href={`/track-order?order=${searchParams.order || ""}`} className="focus-ring inline-flex min-h-12 items-center justify-center rounded-full bg-ink px-6 font-black text-white">
          Track order
        </Link>
        <Link href="/shop" className="focus-ring inline-flex min-h-12 items-center justify-center rounded-full bg-white px-6 font-black text-ink">
          Continue shopping
        </Link>
      </div>
    </section>
  );
}
