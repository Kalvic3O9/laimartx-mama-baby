import { NextResponse, type NextRequest } from "next/server";
import { adminCookieName, getAdminSessionValue } from "@/lib/adminAuth";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (!pathname.startsWith("/admin") || pathname === "/admin/login") {
    return NextResponse.next();
  }

  const expectedSession = getAdminSessionValue();
  const currentSession = request.cookies.get(adminCookieName)?.value;

  if (expectedSession && currentSession === expectedSession) {
    return NextResponse.next();
  }

  const loginUrl = new URL("/admin/login", request.url);
  loginUrl.searchParams.set("next", pathname);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ["/admin", "/admin/:path*"]
};
