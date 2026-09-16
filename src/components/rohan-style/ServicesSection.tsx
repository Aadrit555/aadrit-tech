"use client";

import { Cpu, Terminal, Shield, Zap, Mail, ArrowUpRight } from "lucide-react";

export default function ServicesSection() {
  const services = [
    {
      title: "Systems & Low-Level C",
      desc: "High-performance C algorithms, memory management, POSIX systems, and embedded hardware interfaces.",
      icon: <Cpu className="w-5 h-5 text-emerald-600" />,
    },
    {
      title: "Lightweight ML & Small Models",
      desc: "PyTorch character-level models, REINFORCE policy networks, and CPU-optimized local inference pipelines.",
      icon: <Zap className="w-5 h-5 text-cyan-600" />,
    },
    {
      title: "Cryptographic Media Integrity",
      desc: "Perceptual hashing (pHash), ECDSA digital signatures, and adversarial defense against automated tampering.",
      icon: <Shield className="w-5 h-5 text-amber-600" />,
    },
    {
      title: "Research & Rapid Prototyping",
      desc: "Translating research concepts and algorithm specifications into functional, well-tested codebases.",
      icon: <Terminal className="w-5 h-5 text-purple-600" />,
    },
  ];

  const reasons = [
    "deep focus on low-level efficiency and local computation on standard hardware",
    "proven track record: National MANAK Inspire Award & FOSS United Hackathon",
    "clean, well-structured, production-ready C and Python implementations",
    "active leader in student developer communities (Next Tech Lab & FOSS SRMAP)",
    "fast turnaround time and transparent technical communication",
  ];

  return (
    <section id="services" className="py-8 sm:py-16 max-w-5xl mx-auto px-4 sm:px-6 relative z-10">
      <h2 className="py-3 sm:py-4 text-3xl sm:text-4xl mb-4 sm:mb-8 lowercase font-medium">
        services & collab
      </h2>

      <div className="border border-[var(--border)] p-6 sm:p-8 bg-[var(--card)] rounded-lg space-y-8">
        <p className="text-sm sm:text-base text-[var(--muted)] leading-relaxed">
          looking to engineer something robust? i am available for systems development, machine learning engineering, algorithmic research, and technical collaborations.
        </p>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {services.map((svc, idx) => (
            <div key={idx} className="flex gap-3.5 items-start">
              <div className="flex-shrink-0 mt-0.5 p-2 rounded-md bg-[var(--foreground)]/5 border border-[var(--border)]">
                {svc.icon}
              </div>
              <div>
                <h4 className="font-semibold text-sm sm:text-base mb-1 text-[var(--foreground)]">
                  {svc.title}
                </h4>
                <p className="text-xs sm:text-sm text-[var(--muted)] leading-relaxed">
                  {svc.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Why Work With Me Checklist */}
        <div className="pt-6 border-t border-[var(--border)]">
          <h3 className="text-base sm:text-lg font-semibold mb-4 lowercase text-[var(--foreground)]">
            why work with me
          </h3>
          <ul className="space-y-2.5">
            {reasons.map((reason, idx) => (
              <li key={idx} className="flex gap-2.5 text-xs sm:text-sm text-[var(--foreground)]/90">
                <span className="text-emerald-600 font-bold flex-shrink-0">→</span>
                <span>{reason}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-[var(--border)]">
          <a
            href="mailto:aadrit.yks@gmail.com"
            className="flex items-center justify-center gap-2 bg-zinc-900 text-white dark:bg-white dark:text-zinc-950 font-medium py-2.5 px-5 rounded-md hover:opacity-90 transition-opacity text-sm font-mono"
          >
            <Mail className="w-4 h-4" />
            <span>Send an Email</span>
          </a>

          <a
            href="https://github.com/Aadrit555"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 border border-[var(--border)] hover:bg-[var(--foreground)]/5 font-medium py-2.5 px-5 rounded-md transition-colors text-sm font-mono text-[var(--foreground)]"
          >
            <span>Explore GitHub</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
