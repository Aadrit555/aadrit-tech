import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifySessionToken } from "@/lib/security";
import { getMessages, getRecentAuditLogs, getStorageMode } from "@/lib/storage";

export async function GET(request: Request) {
  try {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get("session_token");
    const secret = process.env.SESSION_SECRET;

    if (!sessionCookie?.value || !secret) {
      return NextResponse.json({ error: "Unauthorized. Session required." }, { status: 401 });
    }

    const verification = verifySessionToken(sessionCookie.value, secret);
    if (!verification.valid) {
      return NextResponse.json({ error: "Session token invalid or expired." }, { status: 401 });
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
      },
    });
  } catch {
    return NextResponse.json({ error: "Failed to retrieve administrative records" }, { status: 500 });
  }
}
