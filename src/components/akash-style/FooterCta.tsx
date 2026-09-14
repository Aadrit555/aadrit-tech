"use client";

import { useState } from "react";
import Link from "next/link";
import { Mail, Copy, Check, Shield, ArrowUpRight, Github, Linkedin, MapPin } from "lucide-react";

export default function FooterCta() {
  const [copiedEmail, setCopiedEmail] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText("aadrit.yks@gmail.com");
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <footer id="contact" className="py-12 md:py-20 bg-transparent relative z-10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="bg-white/85 backdrop-blur-md border border-white/70 rounded-2xl p-6 sm:p-10 shadow-xl">
          {/* Minimal Typographic Headline */}
          <div className="max-w-2xl mb-12">
            <div className="text-xs font-mono text-[#dc2626] tracking-wider uppercase mb-3 font-bold flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              <span>Pokédex Transceiver // Direct Communication</span>
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-normal text-zinc-950 tracking-tight font-sans leading-tight mb-4">
              Stay <span className="font-serif italic font-normal text-zinc-500">connected.</span>
            </h2>
            <p className="text-sm sm:text-base text-zinc-600 font-sans leading-relaxed">
              Open to engineering opportunities, systems research collaborations, and open-source contributions.
            </p>
          </div>

          {/* Minimal Direct Action Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-16">
            {/* Email Quick Action Card */}
            <div className="p-6 rounded-md border border-border-dim bg-zinc-50/50 hover:bg-zinc-50 transition-colors space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-zinc-500 uppercase font-semibold flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-accent-emerald" />
                  <span>Email</span>
                </span>
                <button
                  onClick={copyEmail}
                  className="inline-flex items-center gap-1 text-[11px] font-mono text-zinc-600 hover:text-zinc-950 transition-colors px-2 py-0.5 rounded bg-white hover:bg-zinc-100 border border-zinc-200 cursor-pointer"
                  title="Copy Email"
                >
                  {copiedEmail ? <Check className="w-3 h-3 text-accent-emerald" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedEmail ? "Copied" : "Copy"}</span>
                </button>
              </div>
              <a
                href="mailto:aadrit.yks@gmail.com"
                className="block text-sm sm:text-base font-mono font-medium text-zinc-950 hover:text-[#f9452d] transition-colors truncate"
              >
                aadrit.yks@gmail.com
              </a>
            </div>

            {/* GitHub Profile Card */}
            <a
              href="https://github.com/Aadrit555"
              target="_blank"
              rel="noopener noreferrer"
              className="p-6 rounded-md border border-border-dim bg-zinc-50/50 hover:bg-zinc-50 transition-colors space-y-3 group block"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-zinc-500 uppercase font-semibold flex items-center gap-1.5">
                  <Github className="w-3.5 h-3.5 text-zinc-700" />
                  <span>GitHub</span>
                </span>
                <ArrowUpRight className="w-3.5 h-3.5 text-zinc-400 group-hover:text-zinc-950 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </div>
              <div className="text-sm sm:text-base font-mono font-medium text-zinc-950 group-hover:text-[#f9452d] transition-colors truncate">
                github.com/Aadrit555
              </div>
            </a>

            {/* LinkedIn Profile Card */}
            <a
              href="https://www.linkedin.com/in/skaoldi-ntlap"
              target="_blank"
              rel="noopener noreferrer"
              className="p-6 rounded-md border border-border-dim bg-zinc-50/50 hover:bg-zinc-50 transition-colors space-y-3 group block"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-zinc-500 uppercase font-semibold flex items-center gap-1.5">
                  <Linkedin className="w-3.5 h-3.5 text-accent-cyan" />
                  <span>LinkedIn</span>
                </span>
                <ArrowUpRight className="w-3.5 h-3.5 text-zinc-400 group-hover:text-zinc-950 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </div>
              <div className="text-sm sm:text-base font-mono font-medium text-zinc-950 group-hover:text-[#f9452d] transition-colors truncate">
                in/skaoldi-ntlap
              </div>
            </a>
          </div>

          {/* Minimal Sub-Footer */}
          <div className="pt-8 border-t border-border-dim flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-zinc-500">
            <div className="flex items-center gap-2">
              <span className="inline-block w-2 h-2 rounded-full bg-accent-emerald animate-pulse"></span>
              <span>Aadrit · SRM University AP</span>
            </div>

            <div className="flex items-center gap-4 text-zinc-600">
              <Link href="/privacy" className="hover:text-zinc-950 transition-colors">
                Privacy Policy
              </Link>
              <span>/</span>
              <Link href="/terms" className="hover:text-zinc-950 transition-colors">
                Terms of Use
              </Link>
              <span>/</span>
              <Link href="/admin/login" className="hover:text-zinc-950 transition-colors flex items-center gap-1">
                <Shield className="w-3 h-3" />
                <span>Console</span>
              </Link>
            </div>

            <div>(c) {new Date().getFullYear()} Aadrit. All rights reserved.</div>
          </div>
        </div>
      </div>
    </footer>
  );
}


