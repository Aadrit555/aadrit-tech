const crypto = require("crypto");
const fs = require("fs");
const path = require("path");

const envPath = path.join(__dirname, "..", ".env.local");

if (!fs.existsSync(envPath)) {
  const sessionSecret = crypto.randomBytes(32).toString("hex");
  const salt = crypto.randomBytes(16).toString("hex");
  // Generate a random secure local credential or use provided environment variable
  const defaultPassword = process.env.INITIAL_ADMIN_PASSWORD || crypto.randomBytes(16).toString("hex");
  const hash = crypto.pbkdf2Sync(defaultPassword, salt, 100000, 32, "sha256").toString("hex");
  const storedSaltAndHash = `${salt}:${hash}`;

  const envContent = `# Auto-generated secure server configuration
# NEVER COMMIT THIS FILE TO GIT

SESSION_SECRET=${sessionSecret}
ADMIN_PASSWORD_HASH=${storedSaltAndHash}
TEST_ADMIN_PASSWORD=${defaultPassword}
ALLOWED_ORIGIN=http://localhost:3000
SITE_URL=http://localhost:3000
RATE_LIMIT_WINDOW_MS=60000
RATE_LIMIT_MAX_REQUESTS=10
NODE_ENV=production
`;

  fs.writeFileSync(envPath, envContent, { mode: 0o600, encoding: "utf-8" });
  console.log("Successfully generated .env.local with secure cryptographic tokens.");
} else {
  console.log(".env.local already exists, leaving existing secrets intact.");
}

