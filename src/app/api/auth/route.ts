import { NextResponse } from "next/server";
import {
  verifyPassword,
  signSessionToken,
  verifySessionToken,
  revokeSessionToken,
  getClientIp,
} from "@/lib/security";
import { checkRateLimit } from "@/lib/rate-limiter";
import { logSecurityEvent, maskIp } from "@/lib/storage";

export async function POST(request: Request) {
  try {
    const ip = getClientIp(request);
    const masked = maskIp(ip);

    // 1. Brute-Force Rate Limiting (5 failed attempts per 15 minutes)
    const rateCheck = checkRateLimit(`login:${ip}`, 5, 15 * 60 * 1000);
    if (!rateCheck.allowed) {
      logSecurityEvent("RATE_LIMIT_LOGIN", `Client ${masked} locked out due to excessive attempts`);
      return NextResponse.json(
        { error: "Too many authentication attempts. Please try again after 15 minutes." },
        { status: 429 }
      );
    }

    let body: any;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json({ error: "Invalid JSON format" }, { status: 400 });
    }

    const { action, password } = body;
    const sessionSecret = process.env.SESSION_SECRET;

    // Logout action with cryptographic revocation
    if (action === "logout") {
      const cookieHeader = request.headers.get("cookie") || "";
      const match = cookieHeader.match(/session_token=([^;]+)/);
      if (match && sessionSecret) {
        const token = match[1];
        const verification = verifySessionToken(token, sessionSecret);
        if (verification.valid && verification.data?.jti) {
          revokeSessionToken(verification.data.jti, verification.data.exp);
        }
      }

      logSecurityEvent("ADMIN_LOGOUT", `Admin logged out from ${masked}`);
      const response = NextResponse.json({ success: true, message: "Logged out successfully" });
      response.cookies.delete("session_token");
      return response;
    }

    // Login action
    if (!password || typeof password !== "string") {
      return NextResponse.json({ error: "Password is required" }, { status: 400 });
    }

    const storedHash = process.env.ADMIN_PASSWORD_HASH;

    if (!storedHash || !sessionSecret) {
      return NextResponse.json(
        { error: "Server authentication is not properly configured. Check environment variables." },
        { status: 500 }
      );
    }

    const isValid = verifyPassword(password, storedHash);

    if (!isValid) {
      logSecurityEvent("ADMIN_LOGIN_FAIL", `Failed login attempt from ${masked}`);
      return NextResponse.json({ error: "Invalid admin credentials." }, { status: 401 });
    }

    logSecurityEvent("ADMIN_LOGIN_SUCCESS", `Successful admin authentication from ${masked}`);

    // Generate signed session token with structured claims
    const token = signSessionToken(
      { sub: "admin", role: "administrator" },
      sessionSecret
    );

    const response = NextResponse.json({
      success: true,
      message: "Authentication successful",
    });

    // Set strict secure HTTP-only cookie
    response.cookies.set("session_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 24, // 24 hours
    });

    return response;
  } catch {
    return NextResponse.json({ error: "Authentication system error" }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ error: "Method Not Allowed" }, { status: 405 });
}
