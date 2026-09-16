import { NextResponse } from "next/server";
import { z } from "zod";
import { sanitizeInput, getClientIp } from "@/lib/security";
import { checkRateLimit } from "@/lib/rate-limiter";
import { saveMessage } from "@/lib/storage";

const contactSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(80, "Name cannot exceed 80 characters"),
  email: z
    .string()
    .email("Please provide a valid email address")
    .max(120, "Email cannot exceed 120 characters"),
  subject: z
    .string()
    .min(2, "Subject must be at least 2 characters")
    .max(150, "Subject cannot exceed 150 characters"),
  message: z
    .string()
    .min(5, "Message must be at least 5 characters")
    .max(2500, "Message cannot exceed 2500 characters"),
  // Anti-spam honeypot field (bots fill this, legitimate users leave empty)
  hp_company: z.string().optional(),
});

export async function POST(request: Request) {
  try {
    const ip = getClientIp(request);
    const userAgent = request.headers.get("user-agent") || "unknown";

    // 1. Payload Size Guard (Max 32KB)
    const contentLength = request.headers.get("content-length");
    if (contentLength && parseInt(contentLength, 10) > 32 * 1024) {
      return NextResponse.json(
        { error: "Payload exceeds maximum allowed size (32KB)" },
        { status: 413 }
      );
    }

    // 2. IP Rate Limiting (Max 5 submissions per 10 minutes)
    const rateCheck = checkRateLimit(`contact:${ip}`, 5, 10 * 60 * 1000);
    if (!rateCheck.allowed) {
      const waitSeconds = Math.ceil((rateCheck.resetTime - Date.now()) / 1000);
      return NextResponse.json(
        {
          error: `Rate limit reached. Please wait ${waitSeconds} seconds before submitting again.`,
        },
        { status: 429 }
      );
    }

    // 3. Parse & Validate Payload
    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json({ error: "Invalid JSON body provided" }, { status: 400 });
    }

    const parseResult = contactSchema.safeParse(body);
    if (!parseResult.success) {
      const firstError = parseResult.error.errors[0]?.message || "Validation failed";
      return NextResponse.json({ error: firstError }, { status: 422 });
    }

    const { name, email, subject, message, hp_company } = parseResult.data;

    // 4. Anti-spam honeypot trigger: quietly discard automated bot submissions
    if (hp_company && hp_company.trim().length > 0) {
      return NextResponse.json({
        success: true,
        messageId: `msg_${Date.now()}_hp`,
        message: "Message received. I'll respond directly. Thank you.",
      });
    }

    // 5. Server-side defense-in-depth input normalization
    const sanitizedName = sanitizeInput(name);
    const sanitizedEmail = sanitizeInput(email);
    const sanitizedSubject = sanitizeInput(subject);
    const sanitizedMessage = sanitizeInput(message);

    // 6. Save message (without persisting visitor IP address to preserve privacy)
    const saved = saveMessage({
      name: sanitizedName,
      email: sanitizedEmail,
      subject: sanitizedSubject,
      message: sanitizedMessage,
      userAgent: sanitizeInput(userAgent).slice(0, 200),
    });

    return NextResponse.json({
      success: true,
      messageId: saved.id,
      message: "Message received. I'll respond directly. Thank you.",
    });
  } catch {
    return NextResponse.json(
      { error: "An unexpected server error occurred. Please try again later." },
      { status: 500 }
    );
  }
}

// Reject unsupported HTTP methods
export async function GET() {
  return NextResponse.json({ error: "Method Not Allowed" }, { status: 405 });
}

export async function PUT() {
  return NextResponse.json({ error: "Method Not Allowed" }, { status: 405 });
}

export async function DELETE() {
  return NextResponse.json({ error: "Method Not Allowed" }, { status: 405 });
}
