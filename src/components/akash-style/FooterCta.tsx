"use client";

import { useState } from "react";
import Link from "next/link";
import { Mail, Phone, MapPin, Send, CheckCircle2, AlertCircle, Copy, Check, Shield, ArrowUpRight } from "lucide-react";
import SpotlightCard from "@/components/animations/SpotlightCard";

export default function FooterCta() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [responseMsg, setResponseMsg] = useState("");
  const [copiedEmail, setCopiedEmail] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText("aadrit.yks@gmail.com");
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setResponseMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        setStatus("error");
        setResponseMsg(data.error || "Failed to transmit message.");
        return;
      }

      setStatus("success");
      setResponseMsg("Message received securely. Your inquiry has been logged and I will respond directly.");
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch {
      setStatus("error");
      setResponseMsg("Network or transport error. Please email directly to aadrit.yks@gmail.com.");
    }
  };

  return (
    <footer id="contact" className="pt-20 pb-12 border-t border-border-dim bg-surface relative z-10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Massive Typographic Headline mirroring Akash Umang's "Stay connected" */}
        <div className="mb-14 pb-10 border-b border-border-dim">
          <div className="text-xs font-mono text-[#f9452d] tracking-wider uppercase mb-3">
            Contact
          </div>
          <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-normal text-white tracking-tight font-sans leading-none">
            Stay <span className="font-serif italic font-normal text-text-muted">connected</span>
          </h2>
          <p className="text-sm sm:text-base text-text-secondary font-sans mt-4 max-w-xl">
            Whether it’s a new project or a quick question, we’re here to connect.
          </p>
        </div>

        {/* 2-Column Split: Direct Coordinates on left, Sanitized Form on right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-16">
          {/* Coordinates Column */}
          <div className="lg:col-span-5 space-y-6">
            <div className="text-2xl font-bold text-white font-mono flex items-center gap-2">
              <span>Aadrit</span>
              <span className="text-[#f9452d] text-3xl leading-none">*</span>
            </div>

            <div className="space-y-4 text-xs sm:text-sm font-mono text-text-secondary">
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-accent-emerald" />
                <div className="flex items-center gap-2">
                  <a
                    href="mailto:aadrit.yks@gmail.com"
                    className="hover:text-white transition-colors"
                  >
                    aadrit.yks@gmail.com
                  </a>
                  <button
                    onClick={copyEmail}
                    className="p-1 rounded bg-surface-raised hover:bg-border-dim text-text-muted hover:text-white transition-colors"
                    title="Copy email"
                  >
                    {copiedEmail ? (
                      <Check className="w-3 h-3 text-accent-emerald" />
                    ) : (
                      <Copy className="w-3 h-3" />
                    )}
                  </button>
                  {copiedEmail && (
                    <span className="text-[10px] text-accent-emerald font-mono">COPIED</span>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-accent-cyan" />
                <span>+91 7233023333</span>
              </div>

              <div className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-text-muted" />
                <span>Lucknow, Uttar Pradesh, India</span>
              </div>
            </div>

            <div className="pt-4 border-t border-border-dim space-y-2">
              <div className="text-xs font-mono text-text-muted uppercase">Networks & Profiles</div>
              <div className="flex flex-wrap gap-4 text-xs font-mono">
                <a
                  href="https://github.com/Aadrit555"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-text-primary hover:text-white flex items-center gap-1 transition-colors"
                >
                  <span>GitHub</span>
                  <ArrowUpRight className="w-3 h-3" />
                </a>

                <a
                  href="https://www.linkedin.com/in/aadrit-srivastava"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-text-primary hover:text-white flex items-center gap-1 transition-colors"
                >
                  <span>LinkedIn</span>
                  <ArrowUpRight className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form Column */}
          <div className="lg:col-span-7">
            <SpotlightCard className="p-6 sm:p-8 bg-surface-raised/40">
              <h3 className="text-base font-bold text-white font-mono mb-4">
                Say Hi! Send a direct message
              </h3>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-mono text-text-secondary block">
                      Name <span className="text-accent-emerald">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      maxLength={80}
                      placeholder="Your Name"
                      className="w-full px-3 py-2 rounded-md bg-surface border border-border-dim text-xs font-mono text-white placeholder:text-zinc-700 focus:outline-none focus:border-border-bright"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-mono text-text-secondary block">
                      Email <span className="text-accent-emerald">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      maxLength={100}
                      placeholder="your@email.com"
                      className="w-full px-3 py-2 rounded-md bg-surface border border-border-dim text-xs font-mono text-white placeholder:text-zinc-700 focus:outline-none focus:border-border-bright"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-mono text-text-secondary block">
                    Subject <span className="text-accent-emerald">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    maxLength={150}
                    placeholder="Collaboration / Project / Inquiries"
                    className="w-full px-3 py-2 rounded-md bg-surface border border-border-dim text-xs font-mono text-white placeholder:text-zinc-700 focus:outline-none focus:border-border-bright"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-mono text-text-secondary block">
                    Message <span className="text-accent-emerald">*</span>
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    maxLength={2500}
                    placeholder="Provide details..."
                    className="w-full px-3 py-2 rounded-md bg-surface border border-border-dim text-xs font-mono text-white placeholder:text-zinc-700 focus:outline-none focus:border-border-bright resize-none"
                  ></textarea>
                </div>

                {status === "error" && (
                  <div className="p-3 rounded-md bg-red-950/40 border border-red-900/60 text-red-300 text-xs font-mono flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                    <span>{responseMsg}</span>
                  </div>
                )}

                {status === "success" && (
                  <div className="p-3 rounded-md bg-emerald-950/40 border border-emerald-900/60 text-emerald-300 text-xs font-mono flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                    <span>{responseMsg}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="btn-primary w-full flex items-center justify-center gap-2"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{status === "loading" ? "Transmitting..." : "Send Message"}</span>
                </button>
              </form>
            </SpotlightCard>
          </div>
        </div>

        {/* Sub-Footer Links */}
        <div className="pt-8 border-t border-border-dim flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-text-muted">
          <div className="flex items-center gap-3">
            <span className="inline-block w-2 h-2 rounded-full bg-accent-emerald animate-pulse"></span>
            <span>Aadrit Srivastava Portfolio</span>
            <span className="text-border-dim">|</span>
            <span>TLS 1.3 / HSTS / CSP Active</span>
          </div>

          <div className="flex items-center gap-4 text-text-secondary">
            <Link href="/privacy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <span>/</span>
            <Link href="/terms" className="hover:text-white transition-colors">
              Terms of Use
            </Link>
            <span>/</span>
            <Link href="/admin/login" className="hover:text-white transition-colors flex items-center gap-1">
              <Shield className="w-3 h-3" />
              <span>Console</span>
            </Link>
          </div>

          <div>(c) {new Date().getFullYear()} Aadrit. All rights reserved.</div>
        </div>
      </div>
    </footer>
  );
}

