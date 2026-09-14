import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. Route Protection for Admin UI (/admin except /admin/login)
  if (pathname.startsWith("/admin") && pathname !== "/admin/login") {
    const sessionCookie = request.cookies.get("session_token");
    if (!sessionCookie?.value) {
      const loginUrl = new URL("/admin/login", request.url);
      loginUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  // 2. API Protection for Admin Endpoints (/api/admin/*)
  if (pathname.startsWith("/api/admin")) {
    const sessionCookie = request.cookies.get("session_token");
    if (!sessionCookie?.value) {
      return NextResponse.json({ error: "Unauthorized access. Valid credentials required." }, { status: 401 });
    }
  }

  // 3. CORS check for API requests
  const origin = request.headers.get("origin");
  const allowedOrigin = process.env.ALLOWED_ORIGIN || "http://localhost:3000";

  if (pathname.startsWith("/api") && origin && origin !== allowedOrigin && !origin.includes("localhost")) {
    return NextResponse.json({ error: "CORS policy violation" }, { status: 403 });
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except static files, _next/static, _next/image, favicon
     */
    "/((?!_next/static|_next/image|favicon.ico|images/|sounds/|robots.txt|sitemap.xml).*)",
  ],
};
