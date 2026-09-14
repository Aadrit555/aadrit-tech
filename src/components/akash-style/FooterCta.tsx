"use client";

import { useState } from "react";
import Link from "next/link";
import { Mail, Copy, Check, Shield, ArrowUpRight, Github, Linkedin, Send, AlertCircle, CheckCircle2 } from "lucide-react";

export default function FooterCta() {
  const [copyStatus, setCopyStatus] = useState<"idle" | "copied" | "error">("idle");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText("aadrit.yks@gmail.com");
      setCopyStatus("copied");
      setTimeout(() => setCopyStatus("idle"), 2000);
    } catch {
      setCopyStatus("error");
      setTimeout(() => setCopyStatus("idle"), 2000);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (submitError) setSubmitError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitError("");
    setSubmitSuccess(false);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        setSubmitError(data.error || "Failed to transmit message.");
        return;
      }

      setSubmitSuccess(true);
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch {
      setSubmitError("Network error transmitting message. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <footer id="contact" className="py-12 md:py-20 bg-transparent relative z-10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="bg-white/85 backdrop-blur-md border border-white/70 rounded-2xl p-6 sm:p-10 shadow-xl space-y-12">
          {/* Section Headline */}
          <div className="max-w-2xl">
            <div className="text-xs font-mono text-[#dc2626] tracking-wider uppercase mb-3 font-bold flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              <span>Pokédex Transceiver // Direct Communication</span>
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-normal text-zinc-950 tracking-tight font-sans leading-tight mb-4">
              Stay <span className="font-serif italic font-normal text-zinc-500">connected.</span>
            </h2>
            <p className="text-sm sm:text-base text-zinc-600 font-sans leading-relaxed">
              Open to engineering opportunities, systems research collaborations, and open-source contributions. Submit a message directly or connect via links below.
            </p>
          </div>

          {/* Quick Contact Link Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Email Quick Action Card */}
            <div className="p-6 rounded-md border border-border-dim bg-zinc-50/50 hover:bg-zinc-50 transition-colors space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-zinc-500 uppercase font-semibold flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-accent-emerald" />
                  <span>Email</span>
                </span>
                <button
                  type="button"
                  onClick={copyEmail}
                  className="inline-flex items-center gap-1 text-[11px] font-mono text-zinc-600 hover:text-zinc-950 transition-colors px-2.5 py-1 rounded bg-white hover:bg-zinc-100 border border-zinc-200 cursor-pointer min-h-[32px]"
                  title="Copy Email"
                >
                  {copyStatus === "copied" ? (
                    <Check className="w-3 h-3 text-accent-emerald" />
                  ) : (
                    <Copy className="w-3 h-3" />
                  )}
                  <span aria-live="polite">
                    {copyStatus === "copied"
                      ? "Copied ✓"
                      : copyStatus === "error"
                        ? "Unable to copy"
                        : "Copy"}
                  </span>
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

          {/* Interactive Pokédex Contact Form */}
          <div className="p-6 sm:p-8 rounded-xl border border-zinc-200 bg-zinc-50/70 shadow-inner space-y-5">
            <div className="flex items-center justify-between border-b border-zinc-200 pb-3">
              <div className="flex items-center gap-2 font-mono text-xs font-bold text-zinc-800 uppercase tracking-wider">
                <Send className="w-3.5 h-3.5 text-emerald-600" />
                <span>Transmit Signal // Direct Message</span>
              </div>
              <span className="font-mono text-[10px] text-zinc-500 hidden sm:inline-block">
                RATE LIMITED · SANITIZED STORAGE
              </span>
            </div>

            {submitSuccess ? (
              <div className="p-4 rounded-md bg-emerald-50 border border-emerald-200 text-emerald-900 font-mono text-xs flex items-center gap-3 animate-in fade-in duration-200">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                <div>
                  <div className="font-bold">Transmission Dispatched Successfully</div>
                  <div className="text-emerald-700 text-[11px] mt-0.5">
                    Your message has been verified, stored in the administration log, and queued for review.
                  </div>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 font-mono text-xs">
                {submitError && (
                  <div className="p-3 rounded bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0" />
                    <span>{submitError}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label htmlFor="contact-name" className="block text-zinc-600 font-medium">
                      Trainer / Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="contact-name"
                      name="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Your name or handle"
                      className="w-full px-3 py-2 rounded-md bg-white border border-zinc-300 text-zinc-900 placeholder:text-zinc-400 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition-colors"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="contact-email" className="block text-zinc-600 font-medium">
                      Return Frequency / Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="your.email@example.com"
                      className="w-full px-3 py-2 rounded-md bg-white border border-zinc-300 text-zinc-900 placeholder:text-zinc-400 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition-colors"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="contact-subject" className="block text-zinc-600 font-medium">
                    Subject Header <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="contact-subject"
                    name="subject"
                    type="text"
                    required
                    value={formData.subject}
                    onChange={handleInputChange}
                    placeholder="Brief inquiry or collaboration topic"
                    className="w-full px-3 py-2 rounded-md bg-white border border-zinc-300 text-zinc-900 placeholder:text-zinc-400 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition-colors"
                  />
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="contact-message" className="block text-zinc-600 font-medium">
                    Message Payload <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={4}
                    required
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Details about your inquiry, proposal, or feedback..."
                    className="w-full px-3 py-2 rounded-md bg-white border border-zinc-300 text-zinc-900 placeholder:text-zinc-400 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition-colors resize-y"
                  />
                </div>

                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-2">
                  <span className="text-[11px] text-zinc-500">
                    Protected by server-side rate limiter and HTML sanitization.
                  </span>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="px-5 py-2.5 rounded-md bg-zinc-950 hover:bg-zinc-800 disabled:opacity-50 text-white font-bold transition-all shadow-sm flex items-center gap-2 cursor-pointer min-h-[38px]"
                  >
                    {submitting ? (
                      <>
                        <span className="w-3.5 h-3.5 border-2 border-emerald-400 border-t-transparent rounded-full animate-spin" />
                        <span>Transmitting...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Send Transmission</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
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
                <span>Admin</span>
              </Link>
            </div>

            <div>(c) {new Date().getFullYear()} Aadrit. All rights reserved.</div>
          </div>
        </div>
      </div>
    </footer>
  );
}
