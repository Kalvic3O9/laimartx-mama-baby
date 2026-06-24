import Link from "next/link";
import { cookies } from "next/headers";
import { adminCookieName, getAdminSessionValue } from "@/lib/adminAuth";

export function AdminToolbar() {
  const expectedSession = getAdminSessionValue();
  const currentSession = cookies().get(adminCookieName)?.value;
  const isAdmin = Boolean(expectedSession && currentSession === expectedSession);

  if (!isAdmin) return null;

  return (
    <div className="sticky top-[73px] z-30 border-b border-ink/10 bg-ink text-white shadow-sm">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-2 px-4 py-2 text-xs sm:px-6 lg:px-8">
        <p className="font-black uppercase tracking-normal text-white/70">Admin mode</p>
        <div className="flex flex-wrap items-center gap-2">
          <Link href="/admin" className="focus-ring rounded-full bg-white/10 px-3 py-2 font-bold hover:bg-white/20">
            Dashboard
          </Link>
          <Link href="/admin/products" className="focus-ring rounded-full bg-white/10 px-3 py-2 font-bold hover:bg-white/20">
            Manage Products
          </Link>
          <form action="/api/admin/logout" method="post">
            <button className="focus-ring rounded-full bg-white px-3 py-2 font-black text-ink hover:bg-cream" type="submit">
              Logout
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
