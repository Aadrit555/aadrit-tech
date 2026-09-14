import { NextResponse } from "next/server";
import { getStorageMode } from "@/lib/storage";

export async function GET() {
  return NextResponse.json({
    status: "ok",
    timestamp: new Date().toISOString(),
    uptime: Math.floor(process.uptime()),
    storage: getStorageMode(),
    version: "1.0.0",
  });
}

