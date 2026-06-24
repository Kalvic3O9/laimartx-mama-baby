import { NextResponse } from "next/server";
import { adminCookieName } from "@/lib/adminAuth";

export async function POST(request: Request) {
  const response = NextResponse.redirect(new URL("/admin/login", request.url), { status: 303 });
  response.cookies.set({
    name: adminCookieName,
    value: "",
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 0
  });
  response.cookies.set({
    name: adminCookieName,
    value: "",
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/admin",
    maxAge: 0
  });

  return response;
}
