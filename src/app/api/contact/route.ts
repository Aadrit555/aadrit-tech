import { NextResponse } from "next/server";
import { z } from "zod";
import { sanitizeInput } from "@/lib/security";
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
});

export async function POST(request: Request) {
  try {
    const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "127.0.0.1";
    const userAgent = request.headers.get("user-agent") || "unknown";

    // 1. IP Rate Limiting (Max 5 submissions per 10 minutes)
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

    // 2. Parse & Validate Payload
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

    const { name, email, subject, message } = parseResult.data;

    // 3. Strict Server-Side Sanitization
    const sanitizedName = sanitizeInput(name);
    const sanitizedEmail = sanitizeInput(email);
    const sanitizedSubject = sanitizeInput(subject);
    const sanitizedMessage = sanitizeInput(message);

    // 4. Save to secure server storage
    const saved = saveMessage({
      name: sanitizedName,
      email: sanitizedEmail,
      subject: sanitizedSubject,
      message: sanitizedMessage,
      ip,
      userAgent: sanitizeInput(userAgent).slice(0, 200),
    });

    return NextResponse.json({
      success: true,
      messageId: saved.id,
      message: "Message received securely. I will respond to your inquiry directly.",
    });
  } catch {
    return NextResponse.json(
      { error: "An unexpected server error occurred. Please try again later." },
      { status: 500 }
    );
  }
}

// Reject all other HTTP methods
export async function GET() {
  return NextResponse.json({ error: "Method Not Allowed" }, { status: 405 });
}

