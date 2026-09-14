# aadrit.tech

> Personal portfolio and interactive Pokédex-inspired technical dossier for **Aadrit Srivastava** — AI/ML & Systems Engineering Undergrad at SRM University AP.

[![Security Audit](https://img.shields.io/badge/Security%20Audit-33%2F33%20Passed-emerald.svg)](scripts/security-audit.js)
[![Next.js](https://img.shields.io/badge/Next.js-14-black.svg)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue.svg)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8.svg)](https://tailwindcss.com/)

---

## Overview

A modern, tactile, and highly responsive personal engineering portfolio featuring:
- **Pokédex Console Interface**: Hoenn Devon Corp. OS design system with glassmorphic cards, custom Pokeball cursors, and authentic 8-bit Pokédex audio synthesis.
- **Minimal Scroll Dynamics**: Lightweight, hardware-accelerated scroll reveal (`IntersectionObserver`) with subtle depth parallax and real-time telemetry scroll tracking.
- **Interactive Terminal REPL**: Client-side command shell with built-in commands (`$whoami`, `$projects`, `$skills`, `$security`, `$contact`).
- **Cryptographic Security Hardening**: PBKDF2 password hashing, HMAC-SHA256 tamper-proof signed session tokens, strict XSS sanitization, and automated anti-vibecoder audit suite (33/33 tests).

---

## Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router, Turbopack)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) with custom Devon Corp / Emerald color palette
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

## Scripts

| Script | Description |
| :--- | :--- |
| `npm run dev` | Starts local Next.js development server |
| `npm run build` | Builds optimized production bundle |
| `npm run start` | Runs production server |
| `npm run audit:security` | Executes full 33-point security and anti-vibecoder test suite |

---

## License

MIT © [Aadrit Srivastava](https://github.com/Aadrit555)
