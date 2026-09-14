import Link from "next/link";
import { ArrowLeft, Shield, Lock, EyeOff, Server } from "lucide-react";

export const metadata = {
  title: "Privacy Policy | Aadrit Srivastava",
  description: "Privacy policy and data protection principles for aadrit.dev",
};

export default function PrivacyPage() {
  return (
    <div className="py-16 md:py-24 bg-background min-h-[calc(100vh-56px)]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        {/* Back Link */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-mono text-text-muted hover:text-white mb-8 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Return to Workstation</span>
        </Link>

        {/* Document Header */}
        <div className="pb-6 border-b border-border-dim mb-8">
          <div className="text-xs font-mono text-accent-emerald tracking-wider uppercase mb-1">
            [LEGAL_COMPLIANCE]
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-white font-sans">
            Privacy Policy
          </h1>
          <p className="text-xs font-mono text-text-muted mt-2">
            Last modified: September 14, 2026 | Effective Date: September 14, 2026
          </p>
        </div>

        {/* Content */}
        <div className="space-y-8 text-xs sm:text-sm text-text-secondary leading-relaxed font-sans">
          <section className="space-y-3">
            <h2 className="text-base font-bold text-white font-mono flex items-center gap-2">
              <Shield className="w-4 h-4 text-accent-emerald" />
              <span>1. Fundamental Principles</span>
            </h2>
            <p>
              This website (<span className="font-mono text-text-primary">aadrit.dev</span>) is the personal
              portfolio and engineering showcase of Aadrit Srivastava. I believe in zero unnecessary surveillance,
              zero tracking pixels, and absolute data minimization.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base font-bold text-white font-mono flex items-center gap-2">
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
            <ul className="list-disc list-inside space-y-1.5 pl-2 text-text-muted font-mono text-xs">
              <li>Contact Form Inputs: Name, email address, subject, and message content sent voluntarily.</li>
              <li>Network Diagnostics: Client IP addresses logged temporarily for sliding-window rate limiting and DDoS prevention.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-base font-bold text-white font-mono flex items-center gap-2">
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
            <ul className="list-disc list-inside space-y-1.5 pl-2 text-text-muted font-mono text-xs">
              <li>Mandatory TLS 1.3 encryption across all communication routes.</li>
              <li>Strict Content Security Policy (CSP) blocking unauthorized script injection.</li>
              <li>Cryptographic salt-and-hash algorithms (PBKDF2-SHA256) for system authentication.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-base font-bold text-white font-mono flex items-center gap-2">
              <Lock className="w-4 h-4 text-accent-cyan" />
              <span>4. Your Data Rights & Deletion</span>
            </h2>
            <p>
              You possess the absolute right to inspect, update, or permanently delete any message or email history
              you have submitted. To request immediate purge of your records, contact directly at:
            </p>
            <div className="p-3 rounded bg-surface border border-border-dim font-mono text-xs text-text-primary">
              aadrit.yks@gmail.com
            </div>
          </section>
        </div>

        {/* Bottom Legal Navigation */}
        <div className="mt-16 pt-8 border-t border-border-dim flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-text-muted">
          <Link
            href="/"
            className="text-text-secondary hover:text-white transition-colors flex items-center gap-1.5"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Workstation</span>
          </Link>

          <div className="flex items-center gap-4 text-text-secondary">
            <Link href="/terms" className="hover:text-white transition-colors">
              Terms of Use
            </Link>
            <span>/</span>
            <Link href="/admin/login" className="hover:text-white transition-colors">
              Console
            </Link>
          </div>

          <div>(c) {new Date().getFullYear()} Aadrit. All rights reserved.</div>
        </div>
      </div>
    </div>
  );
}

