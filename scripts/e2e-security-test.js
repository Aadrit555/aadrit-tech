const http = require("http");
const fs = require("fs");
const path = require("path");

function request(url, options = {}, body = null) {
  return new Promise((resolve, reject) => {
    const parsed = new URL(url);
    const reqOptions = {
      hostname: parsed.hostname,
      port: parsed.port || 80,
      path: parsed.pathname + parsed.search,
      method: options.method || "GET",
      headers: options.headers || {},
    };

    const req = http.request(reqOptions, (res) => {
      let data = "";
      res.on("data", (chunk) => (data += chunk));
      res.on("end", () => {
        resolve({
          statusCode: res.statusCode,
          headers: res.headers,
          body: data,
        });
      });
    });

    req.on("error", reject);
    if (body) {
      req.write(typeof body === "string" ? body : JSON.stringify(body));
    }
    req.end();
  });
}

async function runE2ETests() {
  console.log("=== RUNNING LIVE ADVERSARIAL END-TO-END SECURITY VERIFICATION ===");
  let passed = 0;
  let failed = 0;

  function assert(cond, msg) {
    if (cond) {
      console.log(`  [PASS] ${msg}`);
      passed++;
    } else {
      console.error(`  [FAIL] ${msg}`);
      failed++;
    }
  }

  // Check if target server is reachable
  try {
    const healthCheck = await request("http://localhost:3000/api/health");
    assert(healthCheck.statusCode === 200, "Health check endpoint reachable (HTTP 200)");
    const healthJson = JSON.parse(healthCheck.body);
    assert(healthJson.status === "ok", "Health endpoint returns status 'ok'");
    assert(!healthJson.uptime, "Health endpoint does NOT leak server uptime");
    assert(!healthJson.storage, "Health endpoint does NOT leak internal storage mode");
    assert(!healthJson.version, "Health endpoint does NOT leak application version");
  } catch {
    console.error("\n[ERROR] Server is not running on http://localhost:3000.");
    console.error("Please start the server first with: npm start (or npm run dev)");
    console.error("Then re-run: npm run test:e2e\n");
    process.exit(1);
  }

  // Load test administrative credentials dynamically from environment or .env.local
  let testPassword = process.env.TEST_ADMIN_PASSWORD;
  if (!testPassword && fs.existsSync(path.join(__dirname, "..", ".env.local"))) {
    const envContent = fs.readFileSync(path.join(__dirname, "..", ".env.local"), "utf-8");
    const match = envContent.match(/TEST_ADMIN_PASSWORD=(.+)/);
    if (match) testPassword = match[1].trim();
  }

  try {
    // 1. Home Page & Security Headers
    console.log("\n1. Testing Home Page & Security Response Headers");
    const homeRes = await request("http://localhost:3000/");
    assert(homeRes.statusCode === 200, "Home page returned HTTP 200");
    assert(homeRes.headers["x-frame-options"] === "DENY", "X-Frame-Options: DENY present");
    assert(homeRes.headers["x-content-type-options"] === "nosniff", "X-Content-Type-Options: nosniff present");
    assert(homeRes.headers["strict-transport-security"]?.includes("max-age=63072000"), "HSTS header configured");
    assert(homeRes.headers["referrer-policy"] === "strict-origin-when-cross-origin", "Referrer-Policy header present");
    assert(homeRes.headers["content-security-policy"]?.includes("default-src 'self'"), "CSP header present");
    assert(!homeRes.headers["content-security-policy"]?.includes("unsafe-eval"), "CSP strictly eliminates 'unsafe-eval'");
    assert(!homeRes.headers["x-powered-by"], "X-Powered-By header suppressed");
    assert(homeRes.body.includes("aadrit"), "Home page contains Aadrit");
    assert(homeRes.body.includes("Skip to main content"), "Home page includes accessible skip-navigation link");

    // 2. Dedicated Pages
    console.log("\n2. Testing Legal & Custom Error Pages");
    const privacyRes = await request("http://localhost:3000/privacy");
    assert(privacyRes.statusCode === 200, "/privacy page returned HTTP 200");
    assert(privacyRes.body.includes("Privacy Policy"), "Privacy policy text present");
    assert(privacyRes.body.includes("not stored in message records"), "Privacy policy accurately states visitor IPs are not stored");

    const termsRes = await request("http://localhost:3000/terms");
    assert(termsRes.statusCode === 200, "/terms page returned HTTP 200");

    const notFoundRes = await request("http://localhost:3000/non-existent-route-xyz-404");
    assert(notFoundRes.statusCode === 404, "Unknown route returned HTTP 404");
    assert(notFoundRes.body.includes("Requested Resource Unreachable"), "Custom 404 terminal UI rendered");

    // 3. Admin Route Protection & Cryptographic Edge Verification
    console.log("\n3. Testing Admin Route Protection & Middleware Verification");
    const unauthAdmin = await request("http://localhost:3000/admin");
    assert(unauthAdmin.statusCode === 307 || unauthAdmin.statusCode === 302, "Unauthenticated /admin redirects to login");
    assert(unauthAdmin.headers.location?.includes("/admin/login"), "Redirect target is /admin/login");

    const forgedCookieAdmin = await request("http://localhost:3000/admin", {
      headers: { Cookie: "session_token=forged.bogus.signature" },
    });
    assert(forgedCookieAdmin.statusCode === 307 || forgedCookieAdmin.statusCode === 302, "Forged cookie redirected by middleware");

    const unauthApiAdmin = await request("http://localhost:3000/api/admin/messages");
    assert(unauthApiAdmin.statusCode === 401, "Unauthenticated /api/admin/messages returns 401");

    // 4. Adversarial Request & Method Abuse Tests
    console.log("\n4. Testing Adversarial Payloads & Method Abuse");
    const getContactRes = await request("http://localhost:3000/api/contact", { method: "GET" });
    assert(getContactRes.statusCode === 405, "GET on POST-only endpoint /api/contact rejected with 405 Method Not Allowed");

    const putContactRes = await request("http://localhost:3000/api/contact", { method: "PUT" });
    assert(putContactRes.statusCode === 405, "PUT on /api/contact rejected with 405 Method Not Allowed");

    const malformedJsonRes = await request("http://localhost:3000/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    }, "{ not: valid: json -- ");
    assert(malformedJsonRes.statusCode === 400, "Malformed JSON body rejected with HTTP 400");

    // Oversized body (>32KB)
    const oversizedBody = JSON.stringify({
      name: "Oversized Tester",
      email: "test@example.com",
      subject: "Large Request",
      message: "A".repeat(35 * 1024),
    });
    const oversizedRes = await request("http://localhost:3000/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Content-Length": Buffer.byteLength(oversizedBody).toString(),
      },
    }, oversizedBody);
    assert(oversizedRes.statusCode === 413, "Oversized payload (>32KB) rejected with HTTP 413 Payload Too Large");

    // 5. Anti-Spam Honeypot Bot Trap
    console.log("\n5. Testing Anti-Spam Honeypot Defense");
    const botPayload = {
      name: "Spam Bot",
      email: "bot@spammer.net",
      subject: "Buy SEO Services",
      message: "Special discount on automated traffic",
      hp_company: "SpamCorp Automated Solutions", // Bot fills the honeypot
    };
    const botRes = await request("http://localhost:3000/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    }, botPayload);
    assert(botRes.statusCode === 200, "Honeypot returns simulated 200 to neutralize bot probing");

    // 6. Valid Contact Submission & Privacy Verification
    console.log("\n6. Testing Valid Contact Submission & Input Normalization");
    const uniqueSubject = `Systems Integrity Test ${Date.now()}`;
    const contactPayload = {
      name: "Dr. O'Brien & Associates",
      email: `recruiter-${Date.now()}@university.edu`,
      subject: uniqueSubject,
      message: "Hello Aadrit, <script>alert('xss')</script> We reviewed DidSomethinSLM and Hemlock. Don't hesitate to follow up.",
    };

    const contactRes = await request("http://localhost:3000/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    }, contactPayload);
    assert(contactRes.statusCode === 200, "Legitimate contact submission accepted with HTTP 200");

    // 7. Rate Limiter Engagement
    console.log("\n7. Testing Sliding-Window Rate Limiting");
    let rateLimited = false;
    const burstIp = `203.0.113.${100 + (Date.now() % 100)}`;
    for (let i = 0; i < 7; i++) {
      const burstRes = await request("http://localhost:3000/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Forwarded-For": burstIp,
        },
      }, contactPayload);
      if (burstRes.statusCode === 429) {
        rateLimited = true;
        break;
      }
    }
    assert(rateLimited, "Rate limiter engaged with HTTP 429 under burst traffic");

    // 8. Admin Authentication, Session Issuance & Privacy-Preserving Storage Flow
    console.log("\n8. Testing Admin Authentication & Storage Privacy");
    const invalidAuthRes = await request("http://localhost:3000/api/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    }, { password: "WrongPassword99!" });
    assert(invalidAuthRes.statusCode === 401, "Invalid password rejected with 401 Unauthorized");

    let sessionCookieVal = null;
    if (testPassword) {
      const validAuthRes = await request("http://localhost:3000/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      }, { password: testPassword });
      assert(validAuthRes.statusCode === 200, "Valid password accepted with HTTP 200");
      const setCookieHeader = validAuthRes.headers["set-cookie"];
      assert(setCookieHeader && setCookieHeader[0].includes("session_token"), "Set-Cookie issues session_token");
      assert(setCookieHeader[0].includes("HttpOnly"), "Session cookie marked HttpOnly");
      assert(/SameSite=strict/i.test(setCookieHeader[0]), "Session cookie marked SameSite=Strict");

      sessionCookieVal = setCookieHeader[0].split(";")[0];

      // Verify authenticated admin read
      const authAdminRes = await request("http://localhost:3000/api/admin/messages", {
        method: "GET",
        headers: { Cookie: sessionCookieVal },
      });
      assert(authAdminRes.statusCode === 200, "Authenticated request to /api/admin/messages returns 200");
      const adminData = JSON.parse(authAdminRes.body);

      // Verify honeypot submission was NOT persisted to message store
      const botMsg = adminData.messages.find(m => m.name === "Spam Bot");
      assert(!botMsg, "Honeypot bot submission was NOT stored in messages store");

      // Verify legitimate submission was persisted without IP address
      const retrievedMsg = adminData.messages.find(m => m.subject === uniqueSubject);
      assert(!!retrievedMsg, "Newly submitted contact message retrieved via Admin API");
      if (retrievedMsg) {
        assert(!retrievedMsg.message.includes("<script>"), "Script tag stripped by input normalization");
        assert(retrievedMsg.message.includes("We reviewed DidSomethinSLM"), "Legitimate text preserved");
        assert(!retrievedMsg.message.includes("&#x27;"), "Apostrophe not double-escaped");
        assert(retrievedMsg.message.includes("Don't hesitate"), "Apostrophe preserved cleanly");
        assert(!retrievedMsg.ip, "Visitor IP address is NOT stored in contact message record (Privacy Confirmed)");
      }

      // 9. Session Revocation on Logout
      console.log("\n9. Testing Cryptographic Session Revocation on Logout");
      const logoutRes = await request("http://localhost:3000/api/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Cookie: sessionCookieVal,
        },
      }, { action: "logout" });
      assert(logoutRes.statusCode === 200, "Admin logout returns HTTP 200");

      // Attempt to access protected endpoint with the previous session token
      const postLogoutRes = await request("http://localhost:3000/api/admin/messages", {
        method: "GET",
        headers: { Cookie: sessionCookieVal },
      });
      assert(postLogoutRes.statusCode === 401, "Previously issued session token rejected after logout (Revocation Verified)");
    } else {
      console.log("  [SKIP] TEST_ADMIN_PASSWORD not set — skipping authenticated admin test flow");
    }

    console.log("\n=========================================");
    console.log(`LIVE ADVERSARIAL E2E RESULTS: ${passed} Passed, ${failed} Failed`);
    console.log("=========================================\n");

    if (failed > 0) process.exit(1);
  } catch (err) {
    console.error("E2E Test Error:", err);
    process.exit(1);
  }
}

runE2ETests();
