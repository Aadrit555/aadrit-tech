# aadrit.tech

> Personal portfolio and interactive Pokédex-inspired technical dossier for **Aadrit** — AI/ML & Systems Developer · Computer Science Undergraduate at SRM University AP.

[![Next.js](https://img.shields.io/badge/Next.js-14-black.svg)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue.svg)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8.svg)](https://tailwindcss.com/)

---

## Overview

A responsive personal engineering portfolio featuring:
- **Pokédex Interface**: Hoenn Devon Corp. OS design system with glassmorphic cards, custom Pokeball cursor, and Pokédex-inspired audio with browser speech synthesis fallback.
- **Selected Systems & Experiments**: Detailed writeups of machine learning intent models (DidSomethinSLM), C image defense and provenance (Hemlock with ECDSA and perceptual hashing), multi-agent simulations (Chimera), and modular search pipelines (SuperRAG).
- **Interactive Terminal Console**: Client-side command shell with built-in commands (`whoami`, `projects`, `skills`, `experience`, `security`, `contact`).
- **Implemented Security Controls**: Server-side input validation via Zod, HMAC-SHA256 signed session tokens, configured security headers (CSP, HSTS, X-Frame-Options, nosniff), and application-level request rate limiting.

---

## Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) 14 (App Router, Turbopack)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
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

# Initialize local environment variables
node scripts/init-env.js

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application in your browser.

---

## Testing & Verification

### Security Unit Tests
Executes unit checks for cryptographic primitives (PBKDF2, HMAC-SHA256, timing-safe comparison) and input sanitization:
```bash
npm run test:security
```

### Live End-to-End Tests
Tests live HTTP security headers, endpoint rate limiting, and authenticated admin sessions against a running server:
```bash
# In Terminal 1: Build & start production server
npm run build
npm run start

# In Terminal 2: Run end-to-end suite
npm run test:e2e
```

---

## Scripts

| Script | Description |
| :--- | :--- |
| `npm run dev` | Starts local Next.js development server with Turbopack |
| `npm run build` | Builds optimized production bundle |
| `npm run start` | Runs production server |
| `npm run test:security` | Executes cryptographic and security unit test suite via tsx |
| `npm run test:e2e` | Runs live end-to-end security and endpoint verification |

---

## License

MIT © [Aadrit](https://github.com/Aadrit555)
