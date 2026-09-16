import { NextResponse } from "next/server";

/**
 * Public health check endpoint.
 * Returns minimal operational status without leaking system uptime,
 * storage architecture, or internal software versions.
 */
export async function GET() {
  return NextResponse.json({
    status: "ok",
  });
}
