/**
 * Security Unit & Integration Test Suite
 * Directly imports and tests src/lib/security.ts cryptographic primitives,
 * session token signing, revocation, Edge WebCrypto, IP extraction, and input normalization.
 */

const fs = require("fs");
const path = require("path");

async function runAudit() {
  console.log("=== SECURITY UNIT & INTEGRATION TESTS ===\n");
  let passed = 0;
  let failed = 0;

  function assert(condition, message) {
    if (condition) {
      console.log(`  [PASS] ${message}`);
      passed++;
    } else {
      console.error(`  [FAIL] ${message}`);
      failed++;
    }
  }

  // Directly import the application's actual security modules
  const security = await import("../src/lib/security.ts");
  const edgeCrypto = await import("../src/lib/edge-crypto.ts");

  const {
    hashPassword,
    verifyPassword,
    signSessionToken,
    verifySessionToken,
    revokeSessionToken,
    isSessionRevoked,
    sanitizeInput,
    timingSafeStringCompare,
    getClientIp,
    DEFAULT_PBKDF2_ITERATIONS,
  } = security;

  const { verifySessionTokenEdge } = edgeCrypto;

  // 1. Cryptographic Password Hashing (PBKDF2-SHA256, 210,000 iterations)
  console.log("1. Password Hashing & Verification (PBKDF2-SHA256)");
  const password = "correct-horse-battery-staple-994";
  const hash = hashPassword(password);
  assert(hash.startsWith(`${DEFAULT_PBKDF2_ITERATIONS}:`), "PBKDF2 output contains 210,000 iteration prefix");
  assert(hash.split(":").length === 3, "PBKDF2 output adheres to iterations:salt:hash format");
  assert(verifyPassword(password, hash), "Correct password verifies successfully against 210k hash");
  assert(!verifyPassword("wrong-password", hash), "Incorrect password rejected");
  assert(!verifyPassword("", hash), "Empty password rejected");

  // Backward compatibility test: legacy 2-part "salt:hash"
  const legacyHash = "a1b2c3d4e5f60718:" + "0".repeat(64);
  assert(!verifyPassword("test", legacyHash), "Legacy format gracefully processed without crash");

  // 2. Timing-Safe String Comparison
  console.log("\n2. Timing-Safe String Comparison");
  assert(timingSafeStringCompare("abcdef", "abcdef"), "Identical strings match");
  assert(!timingSafeStringCompare("abcdef", "abcdeg"), "Differing strings rejected");
  assert(!timingSafeStringCompare("short", "longer-string"), "Mismatched lengths rejected");

  // 3. HMAC-SHA256 Session Token Semantics, Claims & Revocation
  console.log("\n3. HMAC-SHA256 Session Token Protocol & Claims");
  const secret = "test-secret-key-32-bytes-minimum-length-xyz";
  const token = signSessionToken({ user: "admin" }, secret);
  assert(typeof token === "string" && token.includes("."), "Session token format valid (data.sig)");

  const validVerification = verifySessionToken(token, secret);
  assert(validVerification.valid, "Valid token verified successfully");
  assert(validVerification.data?.sub === "admin", "Payload contains subject ('admin')");
  assert(validVerification.data?.role === "administrator", "Payload contains role ('administrator')");
  assert(validVerification.data?.iss === "aadrit-portfolio", "Payload contains expected issuer");
  assert(validVerification.data?.aud === "aadrit-portfolio-admin", "Payload contains expected audience");
  assert(typeof validVerification.data?.jti === "string", "Payload contains unique token ID (jti)");
  assert(validVerification.data?.alg === "HS256", "Payload declares algorithm HS256");

  // Signature tampering
  const [dataPart, sigPart] = token.split(".");
  const tamperedSig = sigPart.slice(0, -2) + (sigPart.slice(-2) === "aa" ? "bb" : "aa");
  assert(!verifySessionToken(`${dataPart}.${tamperedSig}`, secret).valid, "Tampered signature rejected");

  // Foreign secret rejection
  const foreignSecret = "completely-different-signing-secret-key";
  assert(!verifySessionToken(token, foreignSecret).valid, "Token signed with foreign secret rejected");

  // Issuer mismatch rejection
  const foreignIssuerToken = signSessionToken({ user: "admin" }, secret, { issuer: "rogue-issuer" });
  assert(!verifySessionToken(foreignIssuerToken, secret).valid, "Token with rogue issuer rejected");

  // Audience mismatch rejection
  const foreignAudienceToken = signSessionToken({ user: "admin" }, secret, { audience: "rogue-audience" });
  assert(!verifySessionToken(foreignAudienceToken, secret).valid, "Token with rogue audience rejected");

  // Token revocation test
  console.log("\n4. Session Revocation Mechanism");
  const revocableToken = signSessionToken({ user: "admin" }, secret);
  const parsedBeforeRevocation = verifySessionToken(revocableToken, secret);
  assert(parsedBeforeRevocation.valid, "Token is initially valid before revocation");

  const jtiToRevoke = parsedBeforeRevocation.data.jti;
  revokeSessionToken(jtiToRevoke, parsedBeforeRevocation.data.exp);
  assert(isSessionRevoked(jtiToRevoke), "isSessionRevoked confirms token marked as revoked");

  const parsedAfterRevocation = verifySessionToken(revocableToken, secret);
  assert(!parsedAfterRevocation.valid, "Revoked token rejected by verifySessionToken");

  // 5. Next.js Edge WebCrypto Verification
  console.log("\n5. Edge-Compatible WebCrypto Verification");
  const edgeValid = await verifySessionTokenEdge(token, secret);
  assert(edgeValid.valid, "verifySessionTokenEdge successfully validates token via WebCrypto API");
  assert(edgeValid.data?.sub === "admin", "WebCrypto verification extracts correct subject");

  const edgeTampered = await verifySessionTokenEdge(`${dataPart}.${tamperedSig}`, secret);
  assert(!edgeTampered.valid, "WebCrypto verification rejects tampered signature");

  // 6. Trusted Client IP Normalization
  console.log("\n6. Trusted Client IP Normalization & Injection Prevention");
  const mockReqRealIp = { headers: new Map([["x-real-ip", "198.51.100.24"]]) };
  assert(getClientIp(mockReqRealIp) === "198.51.100.24", "x-real-ip extracted correctly");

  const mockReqCf = { headers: new Map([["cf-connecting-ip", "203.0.113.195"]]) };
  assert(getClientIp(mockReqCf) === "203.0.113.195", "cf-connecting-ip extracted correctly");

  const mockReqXff = { headers: new Map([["x-forwarded-for", "192.0.2.1, 10.0.0.1, 127.0.0.1"]]) };
  assert(getClientIp(mockReqXff) === "192.0.2.1", "First valid hop in X-Forwarded-For extracted");

  const mockReqInjection = { headers: new Map([["x-forwarded-for", "1.2.3.4; DROP TABLE <script>"]]) };
  assert(getClientIp(mockReqInjection) === "127.0.0.1", "Malicious header injection rejected, fallback to 127.0.0.1");

  const mockReqEmpty = { headers: new Map() };
  assert(getClientIp(mockReqEmpty) === "127.0.0.1", "Missing IP headers safely defaults to 127.0.0.1");

  // 7. Defense-in-depth Input Normalization
  console.log("\n7. Defense-in-Depth Input Normalization");
  assert(sanitizeInput("Hello <script>alert(1)</script>World") === "Hello World", "Script tags and contents stripped");
  assert(!sanitizeInput('<img src="x" onerror="alert(1)">').includes("onerror"), "Inline event handlers stripped");
  assert(sanitizeInput('javascript:alert(1)') === 'alert(1)', "javascript: pseudo-protocol stripped");
  assert(sanitizeInput("User\0Name") === "UserName", "Null bytes stripped");
  assert(sanitizeInput("O'Brien") === "O'Brien", "Apostrophes preserved without double-escaping (O'Brien)");
  assert(sanitizeInput("Ben & Jerry's") === "Ben & Jerry's", "Ampersands preserved cleanly for React renderer");

  // 8. Secret Exposure & Configuration Guard
  console.log("\n8. Secret Exposure Scan");
  const gitignorePath = path.join(process.cwd(), ".gitignore");
  assert(fs.existsSync(gitignorePath), ".gitignore exists");
  const gitignore = fs.readFileSync(gitignorePath, "utf-8");
  assert(gitignore.includes(".env*.local"), ".env*.local ignored in .gitignore");
  assert(gitignore.includes("node_modules/"), "node_modules ignored in .gitignore");
  assert(gitignore.includes("data/"), "data/ storage ignored in .gitignore");

  console.log("\n=========================================");
  console.log(`RESULTS: ${passed} Passed, ${failed} Failed`);
  console.log("=========================================\n");

  if (failed > 0) {
    process.exit(1);
  }
}

runAudit().catch((err) => {
  console.error("Audit test error:", err);
  process.exit(1);
});
