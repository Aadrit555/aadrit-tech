const crypto = require("crypto");
const fs = require("fs");
const path = require("path");

const envPath = path.join(__dirname, "..", ".env.local");

if (!fs.existsSync(envPath)) {
  const sessionSecret = crypto.randomBytes(32).toString("hex");
  const salt = crypto.randomBytes(16).toString("hex");
  const iterations = 210000; // OWASP recommendation for PBKDF2-HMAC-SHA256
  const defaultPassword = process.env.INITIAL_ADMIN_PASSWORD || crypto.randomBytes(16).toString("hex");
  const hash = crypto.pbkdf2Sync(defaultPassword, salt, iterations, 32, "sha256").toString("hex");
  const storedSaltAndHash = `${iterations}:${salt}:${hash}`;

  const isDev = process.env.NODE_ENV !== "production";
  const testPasswordLine = isDev ? `TEST_ADMIN_PASSWORD=${defaultPassword}\n` : "";

  const envContent = `# Auto-generated server configuration
# NEVER COMMIT THIS FILE TO VERSION CONTROL

SESSION_SECRET=${sessionSecret}
ADMIN_PASSWORD_HASH=${storedSaltAndHash}
${testPasswordLine}ALLOWED_ORIGIN=http://localhost:3000
SITE_URL=http://localhost:3000
RATE_LIMIT_WINDOW_MS=60000
RATE_LIMIT_MAX_REQUESTS=10
NODE_ENV=development
`;

  fs.writeFileSync(envPath, envContent, { mode: 0o600, encoding: "utf-8" });
  console.log("Successfully generated .env.local with 210,000 PBKDF2 iterations and secure session tokens.");
} else {
  console.log(".env.local already exists, leaving existing secrets intact.");
}
