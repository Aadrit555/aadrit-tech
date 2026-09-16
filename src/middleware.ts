import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifySessionTokenEdge } from "@/lib/edge-crypto";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const sessionSecret = process.env.SESSION_SECRET;

  // 1. Route Protection for Admin UI (/admin except /admin/login)
  if (pathname.startsWith("/admin") && pathname !== "/admin/login") {
    const sessionCookie = request.cookies.get("session_token");
    let isValid = false;

    if (sessionCookie?.value && sessionSecret) {
      const verification = await verifySessionTokenEdge(sessionCookie.value, sessionSecret);
      isValid = verification.valid;
    }

    if (!isValid) {
      const loginUrl = new URL("/admin/login", request.url);
      loginUrl.searchParams.set("redirect", pathname);
      const response = NextResponse.redirect(loginUrl);
      if (sessionCookie) {
        response.cookies.delete("session_token");
      }
      return response;
    }
  }

  // 2. API Protection for Admin Endpoints (/api/admin/*)
  if (pathname.startsWith("/api/admin")) {
    const sessionCookie = request.cookies.get("session_token");
    let isValid = false;

    if (sessionCookie?.value && sessionSecret) {
      const verification = await verifySessionTokenEdge(sessionCookie.value, sessionSecret);
      isValid = verification.valid;
    }

    if (!isValid) {
      return NextResponse.json(
        { error: "Unauthorized access. Valid credentials required." },
        { status: 401 }
      );
    }
  }

  // 3. Exact Origin Validation for API requests
  const origin = request.headers.get("origin");
  const allowedOrigins = new Set([
    "https://aadrit.tech",
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    process.env.ALLOWED_ORIGIN,
  ].filter(Boolean));

  if (pathname.startsWith("/api") && origin && !allowedOrigins.has(origin)) {
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
