import Link from "next/link";
import { ArrowLeft, Shield, Lock, EyeOff, Server } from "lucide-react";

export const metadata = {
  title: "Privacy Policy | Aadrit",
  description: "Privacy policy and data protection principles for aadrit.dev",
};

export default function PrivacyPage() {
  return (
    <div className="py-16 md:py-24 bg-white min-h-[calc(100vh-64px)] relative z-10">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        {/* Back Link */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-mono text-zinc-500 hover:text-zinc-950 mb-8 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Return to Workstation</span>
        </Link>

        {/* Document Header */}
        <div className="pb-6 border-b border-border-dim mb-8">
          <div className="text-xs font-mono text-[#f9452d] tracking-wider uppercase mb-1 font-semibold">
            [LEGAL_COMPLIANCE]
          </div>
          <h1 className="text-3xl sm:text-4xl font-normal tracking-tight text-zinc-950 font-sans">
            Privacy Policy
          </h1>
          <p className="text-xs font-mono text-zinc-500 mt-2">
            Last modified: September 14, 2026 | Effective Date: September 14, 2026
          </p>
        </div>

        {/* Content */}
        <div className="space-y-8 text-xs sm:text-sm text-zinc-700 leading-relaxed font-sans">
          <section className="space-y-3">
            <h2 className="text-base font-bold text-zinc-950 font-mono flex items-center gap-2">
              <Shield className="w-4 h-4 text-accent-emerald" />
              <span>1. Fundamental Principles</span>
            </h2>
            <p>
              This website (<span className="font-mono text-zinc-900 font-medium">aadrit.dev</span>) is the personal
              portfolio and engineering showcase of Aadrit. I believe in zero unnecessary surveillance,
              zero tracking pixels, and absolute data minimization.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base font-bold text-zinc-950 font-mono flex items-center gap-2">
              <EyeOff className="w-4 h-4 text-accent-cyan" />
              <span>2. Data Collection & Analytics</span>
            </h2>
            <p>
              When browsing this website, <strong>no cookies</strong> are placed on your browser for advertising,
              re-targeting, or invasive telemetry. We do not use Google Analytics, Facebook Pixel, or any third-party
              behavioral tracking software.
            </p>
            <p>
              The only information gathered is strictly operational:
            </p>
            <ul className="list-disc list-inside space-y-1.5 pl-2 text-zinc-600 font-mono text-xs">
              <li>Contact Form Inputs: Name, email address, subject, and message content sent voluntarily.</li>
              <li>Network Diagnostics: Client IP addresses logged temporarily for sliding-window rate limiting and DDoS prevention.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-base font-bold text-zinc-950 font-mono flex items-center gap-2">
              <Server className="w-4 h-4 text-accent-emerald" />
              <span>3. Data Storage & Security Controls</span>
            </h2>
            <p>
              Messages transmitted through the contact endpoint are sanitized against Cross-Site Scripting (XSS)
              and stored on an access-restricted server. They are never sold, rented, or distributed to data brokers.
            </p>
            <p>
              Security enforcement includes:
            </p>
            <ul className="list-disc list-inside space-y-1.5 pl-2 text-zinc-600 font-mono text-xs">
              <li>Mandatory TLS 1.3 encryption across all communication routes.</li>
              <li>Strict Content Security Policy (CSP) blocking unauthorized script injection.</li>
              <li>Cryptographic salt-and-hash algorithms (PBKDF2-SHA256) for system authentication.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-base font-bold text-zinc-950 font-mono flex items-center gap-2">
              <Lock className="w-4 h-4 text-accent-cyan" />
              <span>4. Your Data Rights & Deletion</span>
            </h2>
            <p>
              You possess the absolute right to inspect, update, or permanently delete any message or email history
              you have submitted. To request immediate purge of your records, contact directly at:
            </p>
            <div className="p-3 rounded bg-zinc-50 border border-border-dim font-mono text-xs text-zinc-900 font-medium">
              aadrit.yks@gmail.com
            </div>
          </section>
        </div>

        {/* Bottom Legal Navigation */}
        <div className="mt-16 pt-8 border-t border-border-dim flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-zinc-500">
          <Link
            href="/"
            className="text-zinc-600 hover:text-zinc-950 transition-colors flex items-center gap-1.5"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Workstation</span>
          </Link>

          <div className="flex items-center gap-4 text-zinc-600">
            <Link href="/terms" className="hover:text-zinc-950 transition-colors">
              Terms of Use
            </Link>
            <span>/</span>
            <Link href="/admin/login" className="hover:text-zinc-950 transition-colors">
              Console
            </Link>
          </div>

          <div>(c) {new Date().getFullYear()} Aadrit. All rights reserved.</div>
        </div>
      </div>
    </div>
  );
}


