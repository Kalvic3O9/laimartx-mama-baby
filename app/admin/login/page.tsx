import Link from "next/link";

export default function AdminLoginPage() {
  return (
    <section className="mx-auto max-w-md px-4 py-16 sm:px-6">
      <div className="rounded-[32px] bg-white p-8 shadow-soft">
        <p className="text-sm font-black uppercase text-cocoa">Admin login</p>
        <h1 className="mt-2 text-3xl font-black">Store manager access</h1>
        <div className="mt-6 grid gap-4">
          <label>
            <span className="text-sm font-bold">Email</span>
            <input className="focus-ring mt-2 min-h-12 w-full rounded-2xl border border-ink/10 bg-cream px-4" placeholder="admin@laimartx.co.ug" />
          </label>
          <label>
            <span className="text-sm font-bold">Password</span>
            <input className="focus-ring mt-2 min-h-12 w-full rounded-2xl border border-ink/10 bg-cream px-4" type="password" placeholder="••••••••" />
          </label>
        </div>
        <Link href="/admin" className="focus-ring mt-6 inline-flex min-h-12 w-full items-center justify-center rounded-full bg-ink px-6 font-black text-white">
          Sign in demo
        </Link>
        <p className="mt-4 text-sm leading-6 text-ink/60">Connect Supabase Auth before launch. This demo link opens the admin dashboard for MVP preview.</p>
      </div>
    </section>
  );
}
