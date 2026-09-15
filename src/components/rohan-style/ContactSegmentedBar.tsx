"use client";

import { useState } from "react";
import { Github, Linkedin, Mail, Terminal, Calendar, Check, Copy } from "lucide-react";

export default function ContactSegmentedBar() {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText("aadrit.yks@gmail.com");
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // ignore
    }
  };

  const scrollToTerminal = () => {
    const el = document.getElementById("terminal");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="contact" className="py-8 sm:py-16 max-w-5xl mx-auto px-4 sm:px-6 relative z-10">
      <h2 className="py-3 sm:py-4 text-3xl sm:text-4xl mb-4 sm:mb-8 lowercase font-medium">
        connect
      </h2>

      {/* Rohan-style Joined Segmented Bar */}
      <div className="flex w-full overflow-hidden rounded-lg shadow-2xs">
        {/* GitHub */}
        <a
          href="https://github.com/Aadrit555"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub"
          className="group flex-1 flex items-center justify-center gap-2 py-4 px-3 border border-[var(--border)] -ml-px first:ml-0 hover:bg-[var(--foreground)]/5 transition-all duration-200 bg-[var(--card)]"
        >
          <span className="group-hover:scale-110 transition-transform duration-200 text-[var(--foreground)]">
            <Github className="w-5 h-5" />
          </span>
          <span className="text-xs sm:text-sm font-medium hidden sm:inline text-[var(--foreground)]">
            GitHub
          </span>
        </a>

        {/* LinkedIn */}
        <a
          href="https://www.linkedin.com/in/skaoldi-ntlap"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
          className="group flex-1 flex items-center justify-center gap-2 py-4 px-3 border border-[var(--border)] -ml-px first:ml-0 hover:bg-[var(--foreground)]/5 transition-all duration-200 bg-[var(--card)]"
        >
          <span className="group-hover:scale-110 transition-transform duration-200 text-[#0077b5]">
            <Linkedin className="w-5 h-5" />
          </span>
          <span className="text-xs sm:text-sm font-medium hidden sm:inline text-[var(--foreground)]">
            LinkedIn
          </span>
        </a>

        {/* Email */}
        <button
          type="button"
          onClick={copyEmail}
          aria-label="Copy Email"
          className="group flex-1 flex items-center justify-center gap-2 py-4 px-3 border border-[var(--border)] -ml-px first:ml-0 hover:bg-[var(--foreground)]/5 transition-all duration-200 bg-[var(--card)] cursor-pointer"
        >
          <span className="group-hover:scale-110 transition-transform duration-200 text-[#f9452d]">
            {copied ? (
              <Check className="w-5 h-5 text-emerald-600" />
            ) : (
              <Mail className="w-5 h-5" />
            )}
          </span>
          <span className="text-xs sm:text-sm font-medium hidden sm:inline text-[var(--foreground)]">
            {copied ? "Copied!" : "Email"}
          </span>
        </button>

        {/* Terminal Jump */}
        <button
          type="button"
          onClick={scrollToTerminal}
          aria-label="Open Terminal"
          className="group flex-1 flex items-center justify-center gap-2 py-4 px-3 border border-[var(--border)] -ml-px first:ml-0 hover:bg-[var(--foreground)]/5 transition-all duration-200 bg-[var(--card)] cursor-pointer"
        >
          <span className="group-hover:scale-110 transition-transform duration-200 text-emerald-600">
            <Terminal className="w-5 h-5" />
          </span>
          <span className="text-xs sm:text-sm font-medium hidden sm:inline text-[var(--foreground)]">
            Terminal
          </span>
        </button>
      </div>
    </section>
  );
}
