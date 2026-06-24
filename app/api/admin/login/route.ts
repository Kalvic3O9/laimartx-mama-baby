import { NextResponse } from "next/server";
import { adminCookieName, getAdminSessionValue, hasAdminCredentials } from "@/lib/adminAuth";

export async function POST(request: Request) {
  const formData = await request.formData();
  const email = String(formData.get("email") || "").trim();
  const password = String(formData.get("password") || "");
  const next = String(formData.get("next") || "/admin");

  if (!hasAdminCredentials()) {
    return NextResponse.redirect(new URL("/admin/login?error=missing-config", request.url), { status: 303 });
  }

  if (email !== process.env.ADMIN_EMAIL || password !== process.env.ADMIN_PASSWORD) {
    return NextResponse.redirect(new URL("/admin/login?error=invalid", request.url), { status: 303 });
  }

  const redirectTarget = next.startsWith("/admin") && next !== "/admin/login" ? next : "/admin";
  const response = NextResponse.redirect(new URL(redirectTarget, request.url), { status: 303 });

  response.cookies.set({
    name: adminCookieName,
    value: getAdminSessionValue(),
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/admin",
    maxAge: 60 * 60 * 8
  });

  return response;
}
