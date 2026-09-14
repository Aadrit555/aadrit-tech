import Link from "next/link";
import { ArrowLeft, Shield, Lock, EyeOff, Server } from "lucide-react";

export const metadata = {
  title: "Privacy Policy | Aadrit",
  description: "Privacy policy and data handling practices for aadrit.tech",
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
            [PRIVACY]
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
              <span>1. Overview</span>
            </h2>
            <p>
              This website (<span className="font-mono text-zinc-900 font-medium">aadrit.tech</span>) is the personal
              portfolio of Aadrit. It does not use third-party advertising cookies, commercial tracking pixels,
              or invasive behavioral analytics.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base font-bold text-zinc-950 font-mono flex items-center gap-2">
              <EyeOff className="w-4 h-4 text-accent-cyan" />
              <span>2. Information Collection</span>
            </h2>
            <p>
              No personal information is collected simply by browsing the site. The only data processed is:
            </p>
            <ul className="list-disc list-inside space-y-1.5 pl-2 text-zinc-600 font-mono text-xs">
              <li>Contact Form: Name, email address, subject, and message submitted voluntarily for correspondence.</li>
              <li>Rate Limiting: Client IP addresses processed temporarily in-memory to prevent rapid request bursts.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-base font-bold text-zinc-950 font-mono flex items-center gap-2">
              <Server className="w-4 h-4 text-accent-emerald" />
              <span>3. Data Handling & Security</span>
            </h2>
            <p>
              Messages submitted through the contact endpoint are validated and stored on the server so I can read
              and respond to inquiries. They are never sold, rented, or distributed to any third parties.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base font-bold text-zinc-950 font-mono flex items-center gap-2">
              <Lock className="w-4 h-4 text-accent-cyan" />
              <span>4. Data Rights & Inquiries</span>
            </h2>
            <p>
              If you have sent a message and would like your message history updated or removed, contact directly at:
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


