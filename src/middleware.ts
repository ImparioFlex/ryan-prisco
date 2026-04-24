import { NextResponse, type NextRequest } from "next/server";
import { isAuthenticatedFromCookie, ADMIN_COOKIE_NAME } from "@/lib/auth";

const RP_COMMERCIAL_HOSTS = new Set([
  "rpcommercialcapital.com",
  "www.rpcommercialcapital.com",
]);

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const host = req.headers.get("host")?.toLowerCase() ?? "";

  // On rpcommercialcapital.com (and www), always show the /commercial page content
  // while keeping the original URL in the address bar. Asset and admin paths pass through.
  if (RP_COMMERCIAL_HOSTS.has(host)) {
    const isAsset =
      pathname.startsWith("/_next") ||
      pathname.startsWith("/images") ||
      pathname.startsWith("/favicon") ||
      pathname === "/robots.txt" ||
      pathname === "/sitemap.xml";

    if (!isAsset && !pathname.startsWith("/commercial")) {
      const url = req.nextUrl.clone();
      url.pathname = "/commercial";
      return NextResponse.rewrite(url);
    }
  }

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
  // Run on all routes so we can catch rpcommercialcapital.com hostname rewrites,
  // but skip Next internals for perf.
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
