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
  console.log("=== RUNNING LIVE END-TO-END SECURITY VERIFICATION ===");
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
    await request("http://localhost:3000/api/health");
  } catch {
    console.error("\n[ERROR] Server is not running on http://localhost:3000.");
    console.error("Please start the server first with: npm start (or npm run dev)");
    console.error("Then re-run: npm run test:e2e\n");
    process.exit(1);
  }

  // Load test administrative credentials dynamically from environment
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
    assert(!homeRes.headers["x-powered-by"], "X-Powered-By is suppressed (no fingerprinting)");
    assert(homeRes.body.includes("Aadrit"), "Home page contains Aadrit");
    assert(homeRes.body.includes("/images/aadrit.png"), "Home page references authentic portrait image");

    // 2. Dedicated Pages
    console.log("\n2. Testing Legal & Custom Error Pages");
    const privacyRes = await request("http://localhost:3000/privacy");
    assert(privacyRes.statusCode === 200, "/privacy page returned HTTP 200");
    assert(privacyRes.body.includes("Privacy Policy"), "Privacy policy text present");

    const termsRes = await request("http://localhost:3000/terms");
    assert(termsRes.statusCode === 200, "/terms page returned HTTP 200");
    assert(termsRes.body.includes("Terms of Use"), "Terms of use text present");

    const notFoundRes = await request("http://localhost:3000/some-random-route-xyz-404");
    assert(notFoundRes.statusCode === 404, "Unknown route returned HTTP 404");
    assert(notFoundRes.body.includes("Requested Resource Unreachable") || notFoundRes.body.includes("ROUTER_EXCEPTION"), "Custom 404 terminal UI rendered");

    // 3. Admin Route Protection
    console.log("\n3. Testing Admin Route Protection");
    const unauthAdmin = await request("http://localhost:3000/admin");
    assert(unauthAdmin.statusCode === 307 || unauthAdmin.statusCode === 302, "Unauthenticated /admin redirects to login");
    assert(unauthAdmin.headers.location?.includes("/admin/login"), "Redirect target is /admin/login");

    const unauthApiAdmin = await request("http://localhost:3000/api/admin/messages");
    assert(unauthApiAdmin.statusCode === 401, "Unauthenticated /api/admin/messages returns 401 Unauthorized");

    const fakeAuthAdmin = await request("http://localhost:3000/api/admin/messages", {
      headers: { Authorization: "Bearer arbitrary_bogus_token_12345" },
    });
    assert(fakeAuthAdmin.statusCode === 401, "Unverified Authorization header rejected with 401 Unauthorized");

    // 4. Contact Form API & Sanitization
    console.log("\n4. Testing Contact Form API & XSS Sanitization");
    const uniqueSubject = `AI Systems Evaluation ${Date.now()}`;
    const contactPayload = {
      name: "Dr. O'Brien & Co.",
      email: `recruiter-${Date.now()}@university.edu`,
      subject: uniqueSubject,
      message: "Hello Aadrit, <script>alert('xss')</script> We reviewed your SLM and Hemlock projects. Don't hesitate to reach out.",
    };

    const contactRes = await request("http://localhost:3000/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    }, contactPayload);

    assert(contactRes.statusCode === 200, "Valid contact submission accepted with HTTP 200");
    const contactJson = JSON.parse(contactRes.body);
    assert(contactJson.success === true, "Response JSON has success: true");

    // 5. Rate Limiting Test
    console.log("\n5. Testing Rate Limiting on Contact Form");
    let rateLimited = false;
    const burstIp = `203.0.113.${100 + (Date.now() % 50)}`;
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
    assert(rateLimited, "Rate limiter engaged with HTTP 429 Too Many Requests under burst traffic");

    // 6. Admin Authentication & Session Generation
    console.log("\n6. Testing Admin Authentication");
    const invalidAuthRes = await request("http://localhost:3000/api/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    }, { password: "WrongMasterKey!" });
    assert(invalidAuthRes.statusCode === 401, "Invalid master password rejected with 401");

    let setCookieHeader = null;
    if (testPassword) {
      const validAuthRes = await request("http://localhost:3000/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      }, { password: testPassword });
      assert(validAuthRes.statusCode === 200, "Valid master password accepted with 200");
      setCookieHeader = validAuthRes.headers["set-cookie"];
      assert(setCookieHeader && setCookieHeader[0].includes("session_token"), "Set-Cookie issues session_token");
      assert(setCookieHeader && setCookieHeader[0].includes("HttpOnly"), "Session cookie has HttpOnly flag");
      assert(setCookieHeader && /SameSite=strict/i.test(setCookieHeader[0]), "Session cookie has SameSite=strict flag");
    } else {
      console.log("  [SKIP] TEST_ADMIN_PASSWORD not set in environment or .env.local — skipping authenticated tests");
    }

    // 7. Authenticated Admin Access & End-to-End Storage Verification
    if (setCookieHeader) {
      console.log("\n7. Testing Authenticated Admin Session & Stored Data Flow");
      const cookieVal = setCookieHeader[0].split(";")[0];
      const authAdminRes = await request("http://localhost:3000/api/admin/messages", {
        method: "GET",
        headers: { Cookie: cookieVal },
      });
      assert(authAdminRes.statusCode === 200, "Authenticated request to /api/admin/messages returns 200");
      const adminData = JSON.parse(authAdminRes.body);
      assert(Array.isArray(adminData.messages), "Admin receives messages list");
      assert(Array.isArray(adminData.auditLogs), "Admin receives audit logs");
      assert(adminData.stats && adminData.stats.storageMode === "filesystem", "Admin receives descriptive storageMode status");

      // Verify sanitization through the application's actual data retrieval flow
      const retrievedMsg = adminData.messages.find(m => m.subject === uniqueSubject);
      assert(!!retrievedMsg, "Newly submitted contact message retrieved via Admin API");
      if (retrievedMsg) {
        assert(!retrievedMsg.message.includes("<script>"), "Script tag was completely stripped in stored record");
        assert(retrievedMsg.message.includes("We reviewed your SLM"), "Legitimate message content preserved");
        assert(!retrievedMsg.message.includes("&#x27;"), "Apostrophe not double-escaped as &#x27;");
        assert(retrievedMsg.message.includes("Don't hesitate"), "Apostrophe preserved cleanly in stored record");
        assert(!retrievedMsg.name.includes("&amp;"), "Ampersand not double-escaped as &amp;");
        assert(retrievedMsg.name.includes("O'Brien & Co."), "Name with apostrophe and ampersand preserved cleanly");
      }
    }

    console.log("\n=========================================");
    console.log(`LIVE E2E RESULTS: ${passed} Passed, ${failed} Failed`);
    console.log("=========================================\n");

    if (failed > 0) process.exit(1);
  } catch (err) {
    console.error("E2E Test Error:", err);
    process.exit(1);
  }
}

runE2ETests();
