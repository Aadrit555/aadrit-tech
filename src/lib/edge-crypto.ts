/**
 * Edge-compatible Web Crypto utilities for Next.js Middleware.
 * Does not import Node.js 'crypto' or any Node-specific APIs.
 */

export interface EdgeSessionPayload {
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

function base64UrlToUint8Array(base64url: string): Uint8Array {
  const base64 = base64url.replace(/-/g, "+").replace(/_/g, "/");
  const pad = base64.length % 4;
  const padded = pad ? base64 + "=".repeat(4 - pad) : base64;
  const binary = atob(padded);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes;
}

function uint8ArrayToBase64Url(bytes: Uint8Array): string {
  let binary = "";
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function timingSafeEqualEdge(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let result = 0;
  for (let i = 0; i < a.length; i++) {
    result |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return result === 0;
}

export async function verifySessionTokenEdge(
  token: string,
  secret: string,
  options: {
    expectedIssuer?: string;
    expectedAudience?: string;
    clockToleranceSeconds?: number;
  } = {}
): Promise<{ valid: boolean; data?: EdgeSessionPayload; error?: string }> {
  try {
    if (!token || typeof token !== "string") return { valid: false, error: "Missing token" };
    const parts = token.split(".");
    if (parts.length !== 2) return { valid: false, error: "Malformed token structure" };
    const [dataB64, signatureB64] = parts;

    const encoder = new TextEncoder();
    const keyData = encoder.encode(secret);
    const subtle = globalThis.crypto?.subtle;
    if (!subtle) return { valid: false, error: "WebCrypto not available" };

    const cryptoKey = await subtle.importKey(
      "raw",
      keyData,
      { name: "HMAC", hash: "SHA-256" },
      false,
      ["sign"]
    );

    const signatureBuffer = await subtle.sign("HMAC", cryptoKey, encoder.encode(dataB64));
    const expectedSigB64 = uint8ArrayToBase64Url(new Uint8Array(signatureBuffer));

    if (!timingSafeEqualEdge(signatureB64, expectedSigB64)) {
      return { valid: false, error: "Signature mismatch" };
    }

    const payloadBytes = base64UrlToUint8Array(dataB64);
    const payloadStr = new TextDecoder().decode(payloadBytes);
    const payload: EdgeSessionPayload = JSON.parse(payloadStr);

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

    return { valid: true, data: payload };
  } catch {
    return { valid: false, error: "WebCrypto verification failed" };
  }
}

