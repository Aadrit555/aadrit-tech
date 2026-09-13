import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// In-memory IP hit counter for middleware rate limiting
const ipHits = new Map<string, { count: number; expiresAt: number }>();

function isRateLimited(ip: string, maxHits: number = 15, windowMs: number = 60000): boolean {
  const now = Date.now();
  const hit = ipHits.get(ip);

  if (!hit || now > hit.expiresAt) {
    ipHits.set(ip, { count: 1, expiresAt: now + windowMs });
    return false;
  }

  hit.count += 1;
  return hit.count > maxHits;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "127.0.0.1";

  // 1. Path Traversal & Malicious Probing Defense
  if (
    pathname.includes("..") ||
    pathname.includes(".env") ||
    pathname.includes(".git") ||
    pathname.toLowerCase().endsWith(".php") ||
    pathname.includes("/eval")
  ) {
    return new NextResponse("Access Denied", { status: 403 });
  }

  // 2. Route Protection for Admin UI (/admin except /admin/login)
  if (pathname.startsWith("/admin") && pathname !== "/admin/login") {
    const sessionCookie = request.cookies.get("session_token");
    if (!sessionCookie || !sessionCookie.value) {
      const loginUrl = new URL("/admin/login", request.url);
      loginUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  // 3. API Protection for Admin Endpoints (/api/admin/*)
  if (pathname.startsWith("/api/admin")) {
    const sessionCookie = request.cookies.get("session_token");
    const authHeader = request.headers.get("authorization");
    if (!sessionCookie?.value && !authHeader) {
      return NextResponse.json({ error: "Unauthorized access. Valid credentials required." }, { status: 401 });
    }
  }

  // 4. Rate Limiting on sensitive endpoints
  if (pathname.startsWith("/api/contact") || pathname.startsWith("/api/auth")) {
    if (isRateLimited(ip, 12, 60000)) {
      return NextResponse.json(
        { error: "Too many requests. Please wait a minute before retrying." },
        {
          status: 429,
          headers: {
            "Retry-After": "60",
          },
        }
      );
    }
  }

  // 5. CORS check for API requests
  const origin = request.headers.get("origin");
  const allowedOrigin = process.env.ALLOWED_ORIGIN || "http://localhost:3000";

  if (pathname.startsWith("/api") && origin && origin !== allowedOrigin && !origin.includes("localhost")) {
    return NextResponse.json({ error: "CORS policy violation" }, { status: 403 });
  }

  const response = NextResponse.next();

  // 6. Security Headers Injection
  response.headers.set("X-DNS-Prefetch-Control", "on");
  response.headers.set("Strict-Transport-Security", "max-age=63072000; includeSubDomains; preload");
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  response.headers.set("Permissions-Policy", "camera=(), microphone=(), geolocation=(), browsing-topics=()");

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except static files, _next/static, _next/image, favicon
     */
    "/((?!_next/static|_next/image|favicon.ico|images/|robots.txt|sitemap.xml).*)",
  ],
};
