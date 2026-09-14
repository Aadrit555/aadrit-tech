"use client";

import { Award, Briefcase, GraduationCap, ArrowUpRight, CheckCircle2 } from "lucide-react";
import SpotlightCard from "@/components/animations/SpotlightCard";

interface HistoryEntry {
  role: string;
  organization: string;
  description: string;
  period: string;
}

const historyEntries: HistoryEntry[] = [
  {
    role: "Sr. Product Designer",
    organization: "CloudPrism Solutions",
    description:
      "Worked with Mastercard, Zennify & Plumto to design scalable fintech, banking & CRM products.",
    period: "March 2026 - Present",
  },
  {
    role: "UI/UX Designer",
    organization: "Digital Products Portfolio",
    description:
      "Designed 20+ digital products across B2B SaaS, CRM, banking & consumer platforms.",
    period: "Nov 2022 - March 2026",
  },
];

const certifications = [
  {
    title: "Design Psychology: Master the Art and Science of UX Design",
    year: "2026",
    issuer: "Credential",
  },
  {
    title: "The AI-Driven Product Designer",
    year: "2026",
    issuer: "Specialization",
  },
  {
    title: "Systems Thinking for Product Designers",
    year: "2025",
    issuer: "Professional Certificate",
  },
  {
    title: "Foundations of User Experience (UX) Design",
    year: "2025",
    issuer: "Google",
  },
  {
    title: "Visual Elements of User Interface Design",
    year: "2025",
    issuer: "California Institute of the Arts",
  },
];

export default function WorkHistory() {
  return (
    <section id="experience" className="py-20 md:py-28 border-b border-border-dim bg-background relative z-10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="mb-14 pb-6 border-b border-border-dim">
          <div className="text-xs font-mono text-[#f9452d] tracking-wider uppercase mb-2">
            Experience
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-white font-sans">
            Work <span className="font-serif italic font-normal text-text-primary">history</span>
          </h2>
        </div>

        {/* Tabular Work History matching Akash Umang's table layout */}
        <div className="border border-border-dim rounded-md bg-surface overflow-hidden shadow-xl mb-16">
          {/* Table Header */}
          <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-4 bg-surface-raised border-b border-border-dim text-xs font-mono text-text-muted uppercase tracking-wider font-semibold">
            <div className="col-span-4">Work</div>
            <div className="col-span-6">Description</div>
            <div className="col-span-2 text-right">Year</div>
          </div>

          {/* Table Rows */}
          <div className="divide-y divide-border-dim">
            {historyEntries.map((entry, idx) => (
              <div
                key={idx}
                className="grid grid-cols-1 md:grid-cols-12 gap-4 p-6 hover:bg-surface-raised/50 transition-colors items-baseline"
              >
                <div className="md:col-span-4 space-y-1">
                  <div className="text-base font-medium text-white font-sans">
                    {entry.role}
                  </div>
                  <div className="text-xs font-mono text-text-muted">
                    {entry.organization}
                  </div>
                  <div className="text-xs font-mono text-text-muted md:hidden pt-1">
                    {entry.period}
                  </div>
                </div>

                <div className="md:col-span-6 text-xs sm:text-sm text-text-secondary leading-relaxed font-sans">
                  {entry.description}
                </div>

                <div className="md:col-span-2 hidden md:block text-right text-xs font-mono text-text-muted">
                  {entry.period}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Certifications Section matching Akash Umang's certifications */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl sm:text-3xl font-medium text-white font-sans">
              Certifications
            </h3>
            <a
              href="https://www.linkedin.com/in/aadrit-srivastava"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-mono text-text-muted hover:text-white flex items-center gap-1 transition-colors"
            >
              <span>View on LinkedIn</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {certifications.map((cert, idx) => (
              <SpotlightCard key={idx} className="p-5 border border-border-dim bg-surface">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-mono text-[#f9452d] uppercase">
                    {cert.issuer}
                  </span>
                  <span className="text-xs font-mono text-text-muted">
                    {cert.year}
                  </span>
                </div>
                <div className="text-sm font-medium text-white font-sans leading-snug">
                  {cert.title}
                </div>
              </SpotlightCard>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

