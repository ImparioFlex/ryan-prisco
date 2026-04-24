import { NextResponse, type NextRequest } from "next/server";
import { isAuthenticatedFromCookie, ADMIN_COOKIE_NAME } from "@/lib/auth";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (pathname === "/admin/login" || pathname.startsWith("/admin/login/")) {
    return NextResponse.next();
  }

  if (pathname === "/admin" || pathname.startsWith("/admin/")) {
    const cookie = req.cookies.get(ADMIN_COOKIE_NAME)?.value;
    const ok = await isAuthenticatedFromCookie(cookie);
    if (!ok) {
      const loginUrl = new URL("/admin/login", req.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
