import { NextResponse } from "next/server";
import { verifyPassword, signSessionToken } from "@/lib/security";
import { checkRateLimit } from "@/lib/rate-limiter";
import { logSecurityEvent } from "@/lib/storage";

export async function POST(request: Request) {
  try {
    const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "127.0.0.1";

    // 1. Brute-Force Rate Limiting (5 failed attempts per 15 minutes)
    const rateCheck = checkRateLimit(`login:${ip}`, 5, 15 * 60 * 1000);
    if (!rateCheck.allowed) {
      logSecurityEvent("RATE_LIMIT_LOGIN", `IP ${ip} locked out due to excessive attempts`);
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

    // Logout action
    if (action === "logout") {
      logSecurityEvent("ADMIN_LOGOUT", `Admin logged out from IP ${ip}`);
      const response = NextResponse.json({ success: true, message: "Logged out successfully" });
      response.cookies.delete("session_token");
      return response;
    }

    // Login action
    if (!password || typeof password !== "string") {
      return NextResponse.json({ error: "Password is required" }, { status: 400 });
    }

    const storedHash = process.env.ADMIN_PASSWORD_HASH;
    const sessionSecret = process.env.SESSION_SECRET;

    if (!storedHash || !sessionSecret) {
      return NextResponse.json(
        { error: "Server authentication is not properly configured. Check environment variables." },
        { status: 500 }
      );
    }

    const isValid = verifyPassword(password, storedHash);

    if (!isValid) {
      logSecurityEvent("ADMIN_LOGIN_FAIL", `Failed login attempt from IP ${ip}`);
      return NextResponse.json({ error: "Invalid admin credentials." }, { status: 401 });
    }

    logSecurityEvent("ADMIN_LOGIN_SUCCESS", `Successful admin authentication from IP ${ip}`);

    // Generate signed session token
    const token = signSessionToken({ user: "admin", role: "administrator", ip }, sessionSecret);

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

