import Link from "next/link";
import { ArrowLeft, FileText, Check, AlertTriangle, ShieldCheck } from "lucide-react";

export const metadata = {
  title: "Terms of Use | Aadrit",
  description: "Terms and conditions of use for aadrit.tech",
};

export default function TermsPage() {
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
            [TERMS]
          </div>
          <h1 className="text-3xl sm:text-4xl font-normal tracking-tight text-zinc-950 font-sans">
            Terms of Use
          </h1>
          <p className="text-xs font-mono text-zinc-500 mt-2">
            Last modified: September 14, 2026 | Effective Date: September 14, 2026
          </p>
        </div>

        {/* Terms Content */}
        <div className="space-y-8 text-xs sm:text-sm text-zinc-700 leading-relaxed font-sans">
          <section className="space-y-3">
            <h2 className="text-base font-bold text-zinc-950 font-mono flex items-center gap-2">
              <FileText className="w-4 h-4 text-accent-emerald" />
              <span>1. Agreement & Acceptance</span>
            </h2>
            <p>
              By accessing and using this website (<span className="font-mono text-zinc-900 font-medium">aadrit.tech</span>),
              you agree to these Terms of Use and applicable regulations.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base font-bold text-zinc-950 font-mono flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-accent-cyan" />
              <span>2. Intellectual Property & Code Licensing</span>
            </h2>
            <p>
              The source code of the individual open-source repositories linked from this website (such as SLM,
              Hemlock, SuperRAG) is governed by their respective open-source licenses on GitHub.
            </p>
            <p>
              Original portfolio content, branding, and written material belong to Aadrit unless otherwise noted. Open-source repositories remain subject to their respective licenses.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base font-bold text-zinc-950 font-mono flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-500" />
              <span>3. Acceptable Use</span>
            </h2>
            <p>
              Users agree not to disrupt the availability of this website, abuse API endpoints with rapid automated requests,
              or attempt unauthorized access to administrative routes.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base font-bold text-zinc-950 font-mono flex items-center gap-2">
              <Check className="w-4 h-4 text-accent-emerald" />
              <span>4. Disclaimer & Limitation of Liability</span>
            </h2>
            <p>
              The materials and project demonstrations on this site are provided on an &quot;as is&quot; basis without warranties of
              any kind, either expressed or implied.
            </p>
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
            <Link href="/privacy" className="hover:text-zinc-950 transition-colors">
              Privacy Policy
            </Link>
          </div>

          <div>(c) {new Date().getFullYear()} Aadrit. All rights reserved.</div>
        </div>
      </div>
    </div>
  );
}


