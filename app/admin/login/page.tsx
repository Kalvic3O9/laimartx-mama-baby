import { hasAdminCredentials } from "@/lib/adminAuth";

type AdminLoginPageProps = {
  searchParams: {
    error?: string;
    next?: string;
  };
};

export default function AdminLoginPage({ searchParams }: AdminLoginPageProps) {
  const errorMessage =
    searchParams.error === "invalid"
      ? "The email or password is incorrect."
      : searchParams.error === "missing-config"
        ? "Admin login is not configured yet."
        : "";

  return (
    <section className="mx-auto max-w-md px-4 py-16 sm:px-6">
      <div className="rounded-[32px] bg-white p-8 shadow-soft">
        <p className="text-sm font-black uppercase text-cocoa">Admin login</p>
        <h1 className="mt-2 text-3xl font-black">Store manager access</h1>

        {!hasAdminCredentials() ? (
          <p className="mt-5 rounded-2xl bg-blush/50 p-4 text-sm font-bold text-ink">Add ADMIN_EMAIL, ADMIN_PASSWORD, and ADMIN_SESSION_SECRET to enable admin login.</p>
        ) : null}

        {errorMessage ? <p className="mt-5 rounded-2xl bg-blush/50 p-4 text-sm font-bold text-ink">{errorMessage}</p> : null}

        <form action="/api/admin/login" method="post" className="mt-6 grid gap-4">
          <input type="hidden" name="next" value={searchParams.next || "/admin"} />
          <label>
            <span className="text-sm font-bold">Email</span>
            <input className="focus-ring mt-2 min-h-12 w-full rounded-2xl border border-ink/10 bg-cream px-4" name="email" type="email" autoComplete="email" placeholder="admin@laimartx.co.ug" required />
          </label>
          <label>
            <span className="text-sm font-bold">Password</span>
            <input className="focus-ring mt-2 min-h-12 w-full rounded-2xl border border-ink/10 bg-cream px-4" name="password" type="password" autoComplete="current-password" placeholder="Password" required />
          </label>
          <button className="focus-ring mt-2 inline-flex min-h-12 w-full items-center justify-center rounded-full bg-ink px-6 font-black text-white hover:bg-cocoa" type="submit">
            Sign in
          </button>
        </form>
      </div>
    </section>
  );
}
