import crypto from "crypto";

/**
 * Defense-in-depth input normalization.
 * Strips null bytes, dangerous script elements, and javascript: pseudo-protocols.
 * Primary XSS defense relies on Zod schema validation, React's automatic context-aware
 * string escaping during JSX rendering, and strict Content-Security-Policy headers.
 */
export function sanitizeInput(input: string): string {
  if (typeof input !== "string") return "";

  // 1. Remove null bytes and control characters (except common whitespace)
  let clean = input.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F]/g, "");

  // 2. Remove script tags and embedded content
  clean = clean.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "");

  // 3. Remove inline HTML event handlers (onload, onclick, onerror, etc.)
  clean = clean.replace(/on\w+\s*=\s*(['"]).*?\1/gi, "");
  clean = clean.replace(/on\w+\s*=\s*[^>\s]+/gi, "");

  // 4. Remove script pseudo-protocols
  clean = clean.replace(/javascript:/gi, "");
  clean = clean.replace(/vbscript:/gi, "");

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
      // Run dummy comparison to equalize timing profile
      crypto.timingSafeEqual(bufA, bufA);
      return false;
    }
    return crypto.timingSafeEqual(bufA, bufB);
  } catch {
    return false;
  }
}

/**
 * Recommended PBKDF2 iteration count (OWASP guideline for HMAC-SHA256).
 */
export const DEFAULT_PBKDF2_ITERATIONS = 210000;

/**
 * Hash a password using PBKDF2 with SHA-256 and configurable iterations.
 * Outputs versioned format: iterations:salt:hash
 */
export function hashPassword(
  password: string,
  customSalt?: string,
  iterations: number = DEFAULT_PBKDF2_ITERATIONS
): string {
  const salt = customSalt || crypto.randomBytes(16).toString("hex");
  const derivedKey = crypto.pbkdf2Sync(password, salt, iterations, 32, "sha256");
  return `${iterations}:${salt}:${derivedKey.toString("hex")}`;
}

/**
 * Verify a plaintext password against a stored hash string.
 * Supports both versioned "iterations:salt:hash" and legacy "salt:hash" (100k iterations).
 */
export function verifyPassword(password: string, storedSaltAndHash: string): boolean {
  try {
    const parts = storedSaltAndHash.split(":");
    if (parts.length === 3) {
      const [iterStr, salt, originalHash] = parts;
      const iterations = parseInt(iterStr, 10);
      if (isNaN(iterations) || iterations < 10000) return false;
      const testHash = crypto.pbkdf2Sync(password, salt, iterations, 32, "sha256").toString("hex");
      return timingSafeStringCompare(testHash, originalHash);
    } else if (parts.length === 2) {
      // Legacy backward compatibility (100,000 iterations)
      const [salt, originalHash] = parts;
      const testHash = crypto.pbkdf2Sync(password, salt, 100000, 32, "sha256").toString("hex");
      return timingSafeStringCompare(testHash, originalHash);
    }
    return false;
  } catch {
    return false;
  }
}

export interface SessionPayload {
  sub: string;
  role: string;
  iss: string;
  aud: string;
  jti: string;
  alg: string;
  iat: number;
  exp: number;
  [key: string]: any;
}

export const DEFAULT_TOKEN_ISSUER = "aadrit-portfolio";
export const DEFAULT_TOKEN_AUDIENCE = "aadrit-portfolio-admin";
export const DEFAULT_SESSION_TTL_SECONDS = 60 * 60 * 24; // 24 hours

// In-memory revocation set (jti -> expiration timestamp in seconds)
const revokedTokenMap = new Map<string, number>();

/**
 * Explicitly revokes a session token by unique identifier (JTI).
 */
export function revokeSessionToken(jti: string, exp?: number): void {
  const expiresAt = exp ?? Math.floor(Date.now() / 1000) + DEFAULT_SESSION_TTL_SECONDS;
  revokedTokenMap.set(jti, expiresAt);
}

/**
 * Checks if a session token has been revoked.
 */
export function isSessionRevoked(jti?: string): boolean {
  if (!jti) return false;
  const exp = revokedTokenMap.get(jti);
  if (!exp) return false;
  const now = Math.floor(Date.now() / 1000);
  if (now > exp) {
    revokedTokenMap.delete(jti);
    return false;
  }
  return true;
}

/**
 * Signs a session payload using HMAC-SHA256 with structured security claims
 * including subject, role, issuer, audience, algorithm, and token ID.
 */
export function signSessionToken(
  payload: Record<string, any>,
  secret: string,
  options: {
    issuer?: string;
    audience?: string;
    ttlSeconds?: number;
    subject?: string;
    role?: string;
  } = {}
): string {
  const now = Math.floor(Date.now() / 1000);
  const ttl = options.ttlSeconds ?? DEFAULT_SESSION_TTL_SECONDS;
  const fullPayload: SessionPayload = {
    sub: options.subject ?? payload.sub ?? payload.user ?? "admin",
    role: options.role ?? payload.role ?? "administrator",
    iss: options.issuer ?? DEFAULT_TOKEN_ISSUER,
    aud: options.audience ?? DEFAULT_TOKEN_AUDIENCE,
    jti: payload.jti ?? crypto.randomUUID(),
    alg: "HS256",
    ...payload,
    iat: now,
    exp: now + ttl,
  };
  const serialized = JSON.stringify(fullPayload);
  const dataB64 = Buffer.from(serialized, "utf8").toString("base64url");
  const signature = crypto.createHmac("sha256", secret).update(dataB64).digest("base64url");
  return `${dataB64}.${signature}`;
}

export interface VerifyTokenOptions {
  expectedIssuer?: string;
  expectedAudience?: string;
  clockToleranceSeconds?: number;
}

/**
 * Verifies an HMAC-SHA256 session token with full claim validation:
 * signature integrity, expiry, clock tolerance, issuer, audience, and revocation.
 */
export function verifySessionToken(
  token: string,
  secret: string,
  options: VerifyTokenOptions = {}
): { valid: boolean; data?: SessionPayload; error?: string } {
  try {
    if (!token || typeof token !== "string") return { valid: false, error: "Missing token" };
    const parts = token.split(".");
    if (parts.length !== 2) return { valid: false, error: "Malformed token structure" };
    const [dataB64, signature] = parts;

    const expectedSignature = crypto.createHmac("sha256", secret).update(dataB64).digest("base64url");
    if (!timingSafeStringCompare(signature, expectedSignature)) {
      return { valid: false, error: "Signature mismatch" };
    }

    const payload: SessionPayload = JSON.parse(Buffer.from(dataB64, "base64url").toString("utf8"));
    const now = Math.floor(Date.now() / 1000);
    const clockTolerance = options.clockToleranceSeconds ?? 10;

    // 1. Expiration check
    if (typeof payload.exp !== "number" || payload.exp < now - clockTolerance) {
      return { valid: false, error: "Token expired" };
    }

    // 2. Future issuance check
    if (typeof payload.iat === "number" && payload.iat > now + clockTolerance) {
      return { valid: false, error: "Token issued in future" };
    }

    // 3. Issuer binding check
    const expectedIss = options.expectedIssuer ?? DEFAULT_TOKEN_ISSUER;
    if (payload.iss && payload.iss !== expectedIss) {
      return { valid: false, error: "Issuer mismatch" };
    }

    // 4. Audience binding check
    const expectedAud = options.expectedAudience ?? DEFAULT_TOKEN_AUDIENCE;
    if (payload.aud && payload.aud !== expectedAud) {
      return { valid: false, error: "Audience mismatch" };
    }

    // 5. Session revocation check
    if (payload.jti && isSessionRevoked(payload.jti)) {
      return { valid: false, error: "Token has been revoked" };
    }

    return { valid: true, data: payload };
  } catch {
    return { valid: false, error: "Verification failed" };
  }
}

/**
 * Web Crypto API token verification for Next.js Edge Middleware.
 */
export async function verifySessionTokenWebCrypto(
  token: string,
  secret: string,
  options: VerifyTokenOptions = {}
): Promise<{ valid: boolean; data?: SessionPayload; error?: string }> {
  try {
    if (!token || typeof token !== "string") return { valid: false, error: "Missing token" };
    const parts = token.split(".");
    if (parts.length !== 2) return { valid: false, error: "Malformed token structure" };
    const [dataB64, signatureB64] = parts;

    const encoder = new TextEncoder();
    const keyData = encoder.encode(secret);
    const subtle = (globalThis.crypto && globalThis.crypto.subtle) || crypto.subtle;
    const cryptoKey = await subtle.importKey(
      "raw",
      keyData,
      { name: "HMAC", hash: "SHA-256" },
      false,
      ["sign"]
    );

    const signatureBuffer = await subtle.sign("HMAC", cryptoKey, encoder.encode(dataB64));
    const expectedSigB64 = Buffer.from(signatureBuffer).toString("base64url");

    if (!timingSafeStringCompare(signatureB64, expectedSigB64)) {
      return { valid: false, error: "Signature mismatch" };
    }

    const payload: SessionPayload = JSON.parse(Buffer.from(dataB64, "base64url").toString("utf8"));
    const now = Math.floor(Date.now() / 1000);
    const clockTolerance = options.clockToleranceSeconds ?? 10;

    if (typeof payload.exp !== "number" || payload.exp < now - clockTolerance) {
      return { valid: false, error: "Token expired" };
    }

    const expectedIss = options.expectedIssuer ?? DEFAULT_TOKEN_ISSUER;
    if (payload.iss && payload.iss !== expectedIss) {
      return { valid: false, error: "Issuer mismatch" };
    }

    const expectedAud = options.expectedAudience ?? DEFAULT_TOKEN_AUDIENCE;
    if (payload.aud && payload.aud !== expectedAud) {
      return { valid: false, error: "Audience mismatch" };
    }

    if (payload.jti && isSessionRevoked(payload.jti)) {
      return { valid: false, error: "Token revoked" };
    }

    return { valid: true, data: payload };
  } catch {
    return { valid: false, error: "WebCrypto verification failed" };
  }
}

const IPV4_REGEX = /^(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)\.){3}(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)$/;
const IPV6_REGEX = /^(?:[a-fA-F0-9]{1,4}:){7}[a-fA-F0-9]{1,4}$|^::1$|^[a-fA-F0-9:]+$/;

export function isValidIp(ip: string): boolean {
  if (!ip || ip.length > 45) return false;
  return IPV4_REGEX.test(ip) || IPV6_REGEX.test(ip);
}

/**
 * Extracts and strictly normalizes client IP address from trusted reverse-proxy headers.
 * Discards malformed, injected, or invalid IP strings, defaulting to 127.0.0.1.
 */
export function getClientIp(
  request: Request | { headers: Headers | { get: (name: string) => string | null } }
): string {
  try {
    const headers = request.headers;

    // 1. Direct trusted reverse proxy headers
    const xRealIp = headers.get("x-real-ip")?.trim();
    if (xRealIp && isValidIp(xRealIp)) return xRealIp;

    const cfConnectingIp = headers.get("cf-connecting-ip")?.trim();
    if (cfConnectingIp && isValidIp(cfConnectingIp)) return cfConnectingIp;

    const vercelIp = headers.get("x-vercel-forwarded-for")?.split(",")[0]?.trim();
    if (vercelIp && isValidIp(vercelIp)) return vercelIp;

    // 2. Standard X-Forwarded-For header
    const xff = headers.get("x-forwarded-for");
    if (xff) {
      const hops = xff.split(",").map((h) => h.trim());
      for (const hop of hops) {
        if (isValidIp(hop)) return hop;
      }
    }
  } catch {
    // Fallback to localhost
  }

  return "127.0.0.1";
}
