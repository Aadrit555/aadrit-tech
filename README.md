# aadrit.tech

> Personal engineering portfolio for **Aadrit** — AI/ML & Systems Developer · Computer Science Undergraduate at SRM University AP.

[![Next.js](https://img.shields.io/badge/Next.js-14-black.svg)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue.svg)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8.svg)](https://tailwindcss.com/)
[![CI](https://github.com/Aadrit555/aadrit-tech/actions/workflows/ci.yml/badge.svg)](https://github.com/Aadrit555/aadrit-tech/actions)

---

## Overview

A responsive personal engineering portfolio featuring:
- **Design System**: Minimalist, typography-first layout with smooth interactions, custom keyboard command palette (`Ctrl+K`), and subtle retro easter eggs.
- **Selected Systems & Experiments**: Writeups of machine learning models (DidSomethinSLM), C image defense and provenance (Hemlock with ECDSA and perceptual hashing), autonomous systems exploration (primordial-void), and search pipelines (SuperRAG).
- **Interactive Terminal Console**: Screen-reader accessible client-side command shell with built-in commands (`whoami`, `projects`, `skills`, `experience`, `security`, `contact`).
- **Engineered Security Controls**:
  - **HMAC-SHA256 Session Tokens**: Structured tokens (`sub`, `role`, `iss`, `aud`, `jti`, `exp`) with cryptographic signature verification, clock skew tolerance, and active session revocation (`jti` blocklist).
  - **Edge Route Protection**: Next.js Edge Middleware validates session tokens cryptographically using standard Web Crypto (`crypto.subtle`) before granting access to `/admin` routes.
  - **Password Hashing**: PBKDF2-SHA256 with 210,000 iterations (OWASP recommendation) and constant-time string comparison (`timingSafeEqual`).
  - **Input Validation & Escaping**: Strict server-side Zod schema validation, defense-in-depth input normalization, and context-aware React render-time escaping.
  - **HTTP Security Headers**: Strict Content-Security-Policy (without `'unsafe-eval'`), HSTS (`max-age=63072000`), `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, and `Referrer-Policy`.
  - **Trusted Client-IP Normalization**: Edge proxy header extraction (`x-real-ip`, `cf-connecting-ip`, `x-vercel-forwarded-for`) with strict regex validation to prevent header injection.
  - **Anti-Spam Defenses**: Honeypot bot trap field silently drops automated spam without persisting overhead.

---

## Architecture & Deployment Considerations

### Storage Model
- Contact messages and audit logs are stored locally in `data/messages.json` and `data/audit.log` with `0600` file permissions.
- In serverless read-only container environments, storage falls back gracefully to `os.tmpdir()`.
- *Production Note*: For high-concurrency multi-instance serverless deployments, a persistent cloud datastore (such as PostgreSQL or Supabase) would replace local file storage.
- *Privacy Alignment*: In accordance with privacy best practices, visitor IP addresses are **not** persisted in contact message records. Client IP is used strictly in volatile memory for the sliding-window rate limiter.

### Rate Limiting Scope
- Application-level rate limiting operates via an in-memory sliding window buffer.
- *Production Note*: In autoscaled, multi-region, or serverless deployments with multiple independent execution instances, distributed rate limiting requires an external shared cache (such as Redis or Upstash).

---

## Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) 14 (App Router, Turbopack)
- **Language**: [TypeScript](https://www.typescriptlang.org/) 5.7
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) 3.4
- **Icons**: [Lucide React](https://lucide.dev/)
- **Validation**: [Zod](https://zod.dev/)

---

## Getting Started

### Prerequisites
- Node.js 18.17+ or 20+
- npm, pnpm, or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/Aadrit555/aadrit-tech.git

# Navigate to project directory
cd aadrit-tech

# Install dependencies
npm install

# Initialize local environment configuration
node scripts/init-env.js

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application in your browser.

---

## Testing & Verification

### Security Unit Tests
Validates PBKDF2 (210,000 iterations), HMAC token claims, cryptographic revocation, Edge WebCrypto verification, trusted IP extraction, and input normalization:
```bash
npm run test:security
```

### Type Checking
Performs strict TypeScript verification across all application routes and utilities:
```bash
npm run typecheck
```

### Live Adversarial End-to-End Tests
Tests live HTTP response headers, CSP directives, rate limiter under burst traffic, oversized payload rejection (413), malformed JSON handling (400), method guards (405), honeypot spam traps, and authenticated session revocation:
```bash
# In Terminal 1: Build & start production server
npm run build
npm run start

# In Terminal 2: Run adversarial test suite
npm run test:e2e
```

---

## Scripts

| Script | Description |
| :--- | :--- |
| `npm run dev` | Starts local Next.js development server with Turbopack |
| `npm run build` | Builds optimized production bundle |
| `npm run start` | Runs production server |
| `npm run lint` | Runs Next.js ESLint rules |
| `npm run typecheck` | Validates TypeScript types across the entire project |
| `npm run test:security` | Executes cryptographic and security unit test suite (42 assertions) |
| `npm run test:e2e` | Runs live end-to-end security and adversarial test suite |

---

## License

MIT © [Aadrit](https://github.com/Aadrit555)
