import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const session = request.cookies.get("admin_session");
  const { pathname } = request.nextUrl;

  // If trying to access /admin and not authenticated, redirect to /login
  if (pathname.startsWith("/admin") && session?.value !== "authenticated") {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("from", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // If already authenticated and trying to visit /login, redirect to /admin
  if (pathname === "/login" && session?.value === "authenticated") {
    return NextResponse.redirect(new URL("/admin", request.url));
  }

  // Block unauthenticated POST/DELETE to protected API routes
  const protectedApis = ["/api/data", "/api/upload"];
  const isProtectedApi = protectedApis.some((api) => pathname.startsWith(api));

  if (isProtectedApi && request.method !== "GET" && session?.value !== "authenticated") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/login", "/api/data", "/api/upload"],
};
