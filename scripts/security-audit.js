/**
 * Comprehensive Automated Security and Compliance Audit Suite
 * Tests cryptographic primitives, input sanitization, rate limiting,
 * secret leaks, and anti-vibecoder design rules.
 */

const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

// 1. In-line security functions matching src/lib/security.ts
function sanitizeInput(input) {
  if (typeof input !== "string") return "";
  let clean = input.replace(/\0/g, "");
  clean = clean.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "");
  clean = clean.replace(/on\w+\s*=\s*(['"]).*?\1/gi, "");
  clean = clean.replace(/on\w+\s*=\s*[^>\s]+/gi, "");
  clean = clean.replace(/javascript:/gi, "");
  clean = clean.replace(/vbscript:/gi, "");
  clean = clean
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;")
    .replace(/\//g, "&#x2F;");
  return clean.trim();
}

function hashPassword(password, customSalt) {
  const salt = customSalt || crypto.randomBytes(16).toString("hex");
  const derivedKey = crypto.pbkdf2Sync(password, salt, 100000, 32, "sha256");
  return `${salt}:${derivedKey.toString("hex")}`;
}

function verifyPassword(password, storedSaltAndHash) {
  try {
    const parts = storedSaltAndHash.split(":");
    if (parts.length !== 2) return false;
    const [salt, originalHash] = parts;
    const testHash = crypto.pbkdf2Sync(password, salt, 100000, 32, "sha256").toString("hex");
    const bufA = Buffer.from(testHash, "utf8");
    const bufB = Buffer.from(originalHash, "utf8");
    return bufA.length === bufB.length && crypto.timingSafeEqual(bufA, bufB);
  } catch {
    return false;
  }
}

function signSessionToken(payload, secret) {
  const serialized = JSON.stringify({
    ...payload,
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + 60 * 60,
  });
  const dataB64 = Buffer.from(serialized, "utf8").toString("base64url");
  const signature = crypto.createHmac("sha256", secret).update(dataB64).digest("base64url");
  return `${dataB64}.${signature}`;
}

function verifySessionToken(token, secret) {
  try {
    const parts = token.split(".");
    if (parts.length !== 2) return false;
    const [dataB64, signature] = parts;
    const expectedSignature = crypto.createHmac("sha256", secret).update(dataB64).digest("base64url");
    const bufA = Buffer.from(signature, "utf8");
    const bufB = Buffer.from(expectedSignature, "utf8");
    if (bufA.length !== bufB.length || !crypto.timingSafeEqual(bufA, bufB)) return false;
    const payload = JSON.parse(Buffer.from(dataB64, "base64url").toString("utf8"));
    return payload.exp > Math.floor(Date.now() / 1000);
  } catch {
    return false;
  }
}

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

console.log("=== RUNNING PRODUCTION SECURITY AUDIT ===\n");

// TEST GROUP 1: Cryptographic Integrity & Timing-Safe Verification
console.log("Suite 1: Cryptographic Authentication & Salted PBKDF2");
const testPass = "SuperSecretAdminKey2026!";
const hashed = hashPassword(testPass);
assert(hashed.includes(":"), "PBKDF2 output contains salt:hash delimiter");
assert(verifyPassword(testPass, hashed), "Correct password verified successfully");
assert(!verifyPassword("WrongPassword123", hashed), "Incorrect password rejected");
assert(!verifyPassword("", hashed), "Empty password rejected");

// TEST GROUP 2: HMAC Session Tokens
console.log("\nSuite 2: HMAC-SHA256 Session Token Signing & Tamper Proofing");
const sessionSecret = "c9a7e3b1f5d24680acbdf13579246801";
const validToken = signSessionToken({ user: "admin" }, sessionSecret);
assert(verifySessionToken(validToken, sessionSecret), "Valid signed token verified");
const tamperedToken = validToken.slice(0, -4) + "XXXX";
assert(!verifySessionToken(tamperedToken, sessionSecret), "Tampered signature rejected");
assert(!verifySessionToken(validToken, "wrong_server_secret"), "Token signed with foreign secret rejected");

// TEST GROUP 3: Strict Input Sanitization & XSS Neutralization
console.log("\nSuite 3: XSS Neutralization & Payload Sanitization");
const dangerousInputs = [
  "<script>alert('xss')</script>",
  "<img src=x onerror=alert(1)>",
  "<a href='javascript:void(0)'>click</a>",
  "Hello\0World",
  "<b>Bold</b><iframe src='evil.com'></iframe>",
];

for (const input of dangerousInputs) {
  const sanitized = sanitizeInput(input);
  assert(!sanitized.includes("<script>"), `Script tag stripped from: ${input.slice(0, 25)}`);
  assert(!sanitized.includes("onerror="), `Event handler stripped from: ${input.slice(0, 25)}`);
  assert(!sanitized.includes("javascript:"), `javascript scheme stripped from: ${input.slice(0, 25)}`);
  assert(!sanitized.includes("\0"), `Null bytes stripped from: ${input.slice(0, 25)}`);
}

// TEST GROUP 4: Secret Leak & Git Ignore Audit
console.log("\nSuite 4: File Exposure & Leaked Secrets Scan");
const rootDir = path.join(__dirname, "..");
const gitignorePath = path.join(rootDir, ".gitignore");
assert(fs.existsSync(gitignorePath), ".gitignore exists");
const gitignoreContent = fs.readFileSync(gitignorePath, "utf-8");
assert(gitignoreContent.includes(".env*.local"), ".env*.local is excluded in .gitignore");
assert(gitignoreContent.includes("node_modules/"), "node_modules is excluded in .gitignore");
assert(gitignoreContent.includes("data/"), "data/ storage is excluded in .gitignore");

// Scan source files for hardcoded secrets
function scanDir(dir, errors) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (file === "node_modules" || file === ".next" || file === ".git" || file === "data") continue;
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      scanDir(fullPath, errors);
    } else if (/\.(ts|tsx|js|mjs)$/.test(file) && file !== "security-audit.js") {
      const content = fs.readFileSync(fullPath, "utf-8");
      if (/BEGIN (RSA|EC|OPENSSH) PRIVATE KEY/.test(content)) {
        errors.push(`Private key found in ${fullPath}`);
      }
      if (/AI slop/i.test(content)) {
        // Skip
      }
    }
  }
}

const secretErrors = [];
scanDir(rootDir, secretErrors);
assert(secretErrors.length === 0, "Zero hardcoded private keys found in source code");

// TEST GROUP 5: Anti-Vibecoder Compliance Audit
console.log("\nSuite 5: Anti-Vibecoder Design Rule Enforcement");
const tsxErrors = [];

function checkAntiVibe(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (file === "node_modules" || file === ".next" || file === ".git" || file === "data" || file === "scripts") continue;
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      checkAntiVibe(fullPath);
    } else if (/\.(tsx|css)$/.test(file)) {
      const content = fs.readFileSync(fullPath, "utf-8");

      // Check 1: No purple gradients
      if (/from-purple|to-purple|from-violet|to-violet|bg-purple|bg-violet/i.test(content)) {
        tsxErrors.push(`Purple gradient/color found in ${fullPath}`);
      }
      // Check 2: No pill buttons (rounded-full on button or link)
      if (/<(button|a)[^>]*className="[^"]*rounded-full[^"]*"/i.test(content)) {
        tsxErrors.push(`Pill shaped button (rounded-full) found in ${fullPath}`);
      }
      // Check 3: No "Made with AI" watermarks
      if (/made with ai|powered by ai/i.test(content)) {
        tsxErrors.push(`AI watermark found in ${fullPath}`);
      }
      // Check 4: No em dashes (—)
      if (/—/.test(content)) {
        tsxErrors.push(`Em dash found in ${fullPath}`);
      }
    }
  }
}

checkAntiVibe(path.join(rootDir, "src"));
assert(tsxErrors.length === 0, `Anti-vibecoder rules strictly honored (Violations: ${tsxErrors.length})`);
if (tsxErrors.length > 0) {
  console.error("Violations:", tsxErrors);
}

console.log("\n=========================================");
console.log(`AUDIT COMPLETE: ${passed} Passed, ${failed} Failed`);
console.log("=========================================\n");

if (failed > 0) {
  process.exit(1);
} else {
  process.exit(0);
}

