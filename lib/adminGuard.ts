import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { adminCookieName, getAdminSessionValue } from "@/lib/adminAuth";

export function requireAdminSession(nextPath = "/admin") {
  const expectedSession = getAdminSessionValue();
  const currentSession = cookies().get(adminCookieName)?.value;

  if (!expectedSession || currentSession !== expectedSession) {
    redirect(`/admin/login?next=${encodeURIComponent(nextPath)}`);
  }
}
