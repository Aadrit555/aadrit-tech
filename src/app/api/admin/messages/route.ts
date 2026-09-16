import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifySessionToken } from "@/lib/security";
import { getMessages, getRecentAuditLogs, getStorageMode } from "@/lib/storage";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get("session_token");
    const secret = process.env.SESSION_SECRET;

    if (!sessionCookie?.value || !secret) {
      return NextResponse.json({ error: "Unauthorized. Session required." }, { status: 401 });
    }

    const verification = verifySessionToken(sessionCookie.value, secret);
    if (!verification.valid) {
      return NextResponse.json(
        { error: verification.error || "Session token invalid, expired, or revoked." },
        { status: 401 }
      );
    }

    const messages = getMessages();
    const auditLogs = getRecentAuditLogs(30);

    return NextResponse.json({
      success: true,
      storageMode: getStorageMode(),
      messages,
      auditLogs,
      stats: {
        totalMessages: messages.length,
        storageMode: getStorageMode(),
        lastAuditCount: auditLogs.length,
        uptime: Math.floor(process.uptime()),
      },
    });
  } catch {
    return NextResponse.json({ error: "Failed to retrieve administrative records" }, { status: 500 });
  }
}

export async function POST() {
  return NextResponse.json({ error: "Method Not Allowed" }, { status: 405 });
}
