import Link from "next/link";
import { ArrowLeft, FileText, Check, AlertTriangle, ShieldCheck } from "lucide-react";

export const metadata = {
  title: "Terms of Use | Aadrit Srivastava",
  description: "Terms and conditions of use for aadrit.dev",
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
            [LEGAL_FRAMEWORK]
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
              By accessing and using this website (<span className="font-mono text-zinc-900 font-medium">aadrit.dev</span>),
              you agree to adhere to these Terms of Use and all applicable laws and regulations. If you do not
              agree with any of these terms, you are prohibited from accessing this site.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base font-bold text-zinc-950 font-mono flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-accent-cyan" />
              <span>2. Intellectual Property & Code Licensing</span>
            </h2>
            <p>
              The source code of the individual open-source repositories linked from this website (such as SLM,
              Hemlock, SuperRAG) is governed by their respective repository licenses (e.g., MIT, Apache 2.0, or FOSS licenses)
              hosted on GitHub.
            </p>
            <p>
              The original written articles, personal branding, and portfolio layouts are the property of Aadrit
              Srivastava. Uncredited reproduction or verbatim imitation for commercial misrepresentation is strictly prohibited.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base font-bold text-zinc-950 font-mono flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-500" />
              <span>3. Acceptable Use & Security Boundaries</span>
            </h2>
            <p>
              Users agree not to engage in malicious activities directed toward this server infrastructure:
            </p>
            <ul className="list-disc list-inside space-y-1.5 pl-2 text-zinc-600 font-mono text-xs">
              <li>Denial of Service (DoS/DDoS) or high-frequency automated scraping designed to exhaust resources.</li>
              <li>Attempting to bypass authentication mechanisms or inject unauthorized payloads into API endpoints.</li>
              <li>Unauthorized vulnerability probing or exploitation without explicit prior written authorization.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-base font-bold text-zinc-950 font-mono flex items-center gap-2">
              <Check className="w-4 h-4 text-accent-emerald" />
              <span>4. Disclaimer & Limitation of Liability</span>
            </h2>
            <p>
              The materials and research code on this site are provided on an &quot;as is&quot; basis without warranties of
              any kind, either expressed or implied. Aadrit Srivastava shall not be held liable for any damages arising
              from the use or inability to use the research materials or demonstrations.
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
            <span>/</span>
            <Link href="/admin/login" className="hover:text-zinc-950 transition-colors">
              Console
            </Link>
          </div>

          <div>(c) {new Date().getFullYear()} Aadrit Srivastava. All rights reserved.</div>
        </div>
      </div>
    </div>
  );
}


