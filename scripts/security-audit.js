/**
 * Security Unit & Integration Test Suite
 * Directly imports and tests src/lib/security.ts cryptographic primitives,
 * session token signing, and input sanitization without code duplication.
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

  // Directly import the application's actual security module
  const security = await import("../src/lib/security.ts");
  const {
    hashPassword,
    verifyPassword,
    signSessionToken,
    verifySessionToken,
    sanitizeInput,
    timingSafeStringCompare,
  } = security;

  // 1. Cryptographic Password Hashing (PBKDF2-SHA256)
  console.log("1. Password Hashing & Verification (PBKDF2)");
  const password = "correct-horse-battery-staple-994";
  const hash = hashPassword(password);
  assert(hash.includes(":"), "PBKDF2 output contains salt:hash delimiter");
  assert(verifyPassword(password, hash), "Correct password verifies successfully");
  assert(!verifyPassword("wrong-password", hash), "Incorrect password rejected");
  assert(!verifyPassword("", hash), "Empty password rejected");

  // 2. Timing-safe String Comparison
  console.log("\n2. Timing-Safe String Comparison");
  assert(timingSafeStringCompare("abcdef", "abcdef"), "Identical strings match");
  assert(!timingSafeStringCompare("abcdef", "abcdeg"), "Differing strings rejected");
  assert(!timingSafeStringCompare("short", "longer-string"), "Mismatched lengths rejected");

  // 3. HMAC-SHA256 Session Token Signing & Verification
  console.log("\n3. HMAC-SHA256 Session Tokens");
  const secret = "test-secret-key-32-bytes-minimum-length-xyz";
  const token = signSessionToken({ user: "admin" }, secret);
  assert(typeof token === "string" && token.includes("."), "Session token format valid (data.sig)");

  const validVerification = verifySessionToken(token, secret);
  assert(validVerification.valid && validVerification.data?.user === "admin", "Valid token verified with payload intact");

  const [dataPart, sigPart] = token.split(".");
  const tamperedSig = sigPart.slice(0, -2) + "aa";
  assert(!verifySessionToken(`${dataPart}.${tamperedSig}`, secret).valid, "Tampered signature rejected");

  const foreignSecret = "completely-different-signing-secret-key";
  assert(!verifySessionToken(token, foreignSecret).valid, "Token signed with foreign secret rejected");

  // 4. Input Sanitization (Defense-in-depth without double-escaping)
  console.log("\n4. Input Sanitization & XSS Defense");
  assert(sanitizeInput("Hello <script>alert(1)</script>World") === "Hello World", "Script tags and contents stripped");
  assert(!sanitizeInput('<img src="x" onerror="alert(1)">').includes("onerror"), "Inline event handlers stripped");
  assert(sanitizeInput('javascript:alert(1)') === 'alert(1)', "javascript: pseudo-protocol stripped");
  assert(sanitizeInput("User\0Name") === "UserName", "Null bytes stripped");

  // Crucial fix: Legitimate characters like apostrophes and ampersands must NOT be entity-encoded
  // because React automatically encodes them at render time.
  const nameWithApostrophe = "O'Brien";
  assert(sanitizeInput(nameWithApostrophe) === "O'Brien", "Apostrophes preserved without double-escaping (O'Brien)");

  const companyWithAmpersand = "Ben & Jerry's";
  assert(sanitizeInput(companyWithAmpersand) === "Ben & Jerry's", "Ampersands preserved for React renderer");

  // 5. Secret Exposure & Configuration Guard
  console.log("\n5. Secret Exposure Scan");
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
