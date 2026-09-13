"use client";

import { useState } from "react";
import { Mail, Phone, MapPin, Send, CheckCircle2, AlertCircle, ShieldAlert } from "lucide-react";

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [responseMsg, setResponseMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setResponseMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
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
      setResponseMsg("Network or transport error. Please verify your connection or email directly.");
    }
  };

  return (
    <section id="contact" className="py-16 md:py-24 border-b border-border-dim bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Direct Coordinates & Security Notice */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <div className="text-xs font-mono text-accent-emerald tracking-wider uppercase mb-1">
                [06. SECURE_CHANNELS]
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white font-sans">
                Contact & Inquiries
              </h2>
            </div>

            <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
              For research collaboration, systems development, model training inquiries, or general communication.
              All incoming messages are sanitized against XSS and rate-limited to preserve server integrity.
            </p>

            <div className="space-y-4 pt-4 border-t border-border-dim text-xs font-mono">
              <div className="flex items-start gap-3 text-text-secondary">
                <Mail className="w-4 h-4 text-accent-emerald mt-0.5" />
                <div>
                  <span className="text-text-muted block text-[11px]">Direct Electronic Mail</span>
                  <a
                    href="mailto:aadrit.yks@gmail.com"
                    className="text-text-primary hover:text-white transition-colors"
                  >
                    aadrit.yks@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3 text-text-secondary">
                <Phone className="w-4 h-4 text-accent-cyan mt-0.5" />
                <div>
                  <span className="text-text-muted block text-[11px]">Direct Voice / WhatsApp</span>
                  <span className="text-text-primary">+91 7233023333</span>
                </div>
              </div>

              <div className="flex items-start gap-3 text-text-secondary">
                <MapPin className="w-4 h-4 text-text-muted mt-0.5" />
                <div>
                  <span className="text-text-muted block text-[11px]">Primary Location</span>
                  <span className="text-text-primary">Lucknow, Uttar Pradesh, India</span>
                </div>
              </div>
            </div>

            {/* Privacy & Anti-Spam Notice */}
            <div className="p-4 rounded-md bg-surface border border-border-dim text-[11px] font-mono text-text-muted space-y-2">
              <div className="flex items-center gap-2 text-text-secondary font-semibold">
                <ShieldAlert className="w-3.5 h-3.5 text-accent-emerald" />
                <span>Zero Tracking & Anti-Spam</span>
              </div>
              <p className="leading-normal">
                Submissions are stored in an encrypted local database. No advertising pixels or analytics trackers are used.
              </p>
            </div>
          </div>

          {/* Right Column: Sanitized Contact Form */}
          <div className="lg:col-span-7">
            <div className="tech-card p-6 sm:p-8 bg-surface">
              <h3 className="text-base font-bold text-white font-mono mb-4">
                Transmit Secure Message
              </h3>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name Input */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-text-secondary block">
                      Name <span className="text-accent-emerald">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      maxLength={80}
                      placeholder="Your Name or Org"
                      className="w-full px-3 py-2 rounded-md bg-surface-raised border border-border-dim text-xs font-mono text-text-primary placeholder:text-zinc-700 focus:outline-none focus:border-border-bright"
                    />
                  </div>

                  {/* Email Input */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-text-secondary block">
                      Email <span className="text-accent-emerald">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      maxLength={100}
                      placeholder="name@domain.com"
                      className="w-full px-3 py-2 rounded-md bg-surface-raised border border-border-dim text-xs font-mono text-text-primary placeholder:text-zinc-700 focus:outline-none focus:border-border-bright"
                    />
                  </div>
                </div>

                {/* Subject Input */}
                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-text-secondary block">
                    Subject <span className="text-accent-emerald">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    maxLength={150}
                    placeholder="Project inquiry / Research discussion"
                    className="w-full px-3 py-2 rounded-md bg-surface-raised border border-border-dim text-xs font-mono text-text-primary placeholder:text-zinc-700 focus:outline-none focus:border-border-bright"
                  />
                </div>

                {/* Message Input */}
                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-text-secondary block">
                    Message <span className="text-accent-emerald">*</span>
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    maxLength={2500}
                    placeholder="Provide relevant details or technical requirements..."
                    className="w-full px-3 py-2 rounded-md bg-surface-raised border border-border-dim text-xs font-mono text-text-primary placeholder:text-zinc-700 focus:outline-none focus:border-border-bright resize-none"
                  ></textarea>
                </div>

                {/* Status Messages */}
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

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="btn-primary w-full flex items-center justify-center gap-2"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>
                    {status === "loading" ? "Transmitting..." : "Send Message"}
                  </span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

