import crypto from "crypto";

/**
 * Sanitizes raw string input to eliminate XSS injection vectors,
 * stripping null bytes, script tags, event handlers, and escaping HTML entities.
 */
export function sanitizeInput(input: string): string {
  if (typeof input !== "string") return "";

  // Remove null bytes
  let clean = input.replace(/\0/g, "");

  // Remove script tags and contents
  clean = clean.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "");

  // Remove event handlers like onload, onclick, onerror, etc.
  clean = clean.replace(/on\w+\s*=\s*(['"]).*?\1/gi, "");
  clean = clean.replace(/on\w+\s*=\s*[^>\s]+/gi, "");

  // Remove javascript: and data: URIs
  clean = clean.replace(/javascript:/gi, "");
  clean = clean.replace(/vbscript:/gi, "");

  // Escape HTML entities
  clean = clean
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;")
    .replace(/\//g, "&#x2F;");

  return clean.trim();
}

/**
 * Constant-time comparison between two strings to prevent timing attacks.
 */
export function timingSafeStringCompare(a: string, b: string): boolean {
  try {
    const bufA = Buffer.from(a, "utf8");
    const bufB = Buffer.from(b, "utf8");
    if (bufA.length !== bufB.length) {
      // Run dummy comparison to equalize timing
      crypto.timingSafeEqual(bufA, bufA);
      return false;
    }
    return crypto.timingSafeEqual(bufA, bufB);
  } catch {
    return false;
  }
}

/**
 * Hash a password using PBKDF2 with SHA-256 and 100,000 iterations.
 */
export function hashPassword(password: string, customSalt?: string): string {
  const salt = customSalt || crypto.randomBytes(16).toString("hex");
  const derivedKey = crypto.pbkdf2Sync(password, salt, 100000, 32, "sha256");
  return `${salt}:${derivedKey.toString("hex")}`;
}

/**
 * Verify a plaintext password against a stored "salt:hash" string.
 */
export function verifyPassword(password: string, storedSaltAndHash: string): boolean {
  try {
    const parts = storedSaltAndHash.split(":");
    if (parts.length !== 2) return false;
    const [salt, originalHash] = parts;
    const testHash = crypto.pbkdf2Sync(password, salt, 100000, 32, "sha256").toString("hex");
    return timingSafeStringCompare(testHash, originalHash);
  } catch {
    return false;
  }
}

/**
 * Sign a session payload with HMAC-SHA256.
 */
export function signSessionToken(payload: Record<string, any>, secret: string): string {
  const serialized = JSON.stringify({
    ...payload,
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24, // 24 hours
  });
  const dataB64 = Buffer.from(serialized, "utf8").toString("base64url");
  const signature = crypto.createHmac("sha256", secret).update(dataB64).digest("base64url");
  return `${dataB64}.${signature}`;
}

/**
 * Verify an HMAC-SHA256 signed session token.
 */
export function verifySessionToken(token: string, secret: string): { valid: boolean; data?: any } {
  try {
    const parts = token.split(".");
    if (parts.length !== 2) return { valid: false };
    const [dataB64, signature] = parts;

    const expectedSignature = crypto.createHmac("sha256", secret).update(dataB64).digest("base64url");
    if (!timingSafeStringCompare(signature, expectedSignature)) {
      return { valid: false };
    }

    const payload = JSON.parse(Buffer.from(dataB64, "base64url").toString("utf8"));
    const now = Math.floor(Date.now() / 1000);
    if (payload.exp && payload.exp < now) {
      return { valid: false }; // Expired
    }

    return { valid: true, data: payload };
  } catch {
    return { valid: false };
  }
}

