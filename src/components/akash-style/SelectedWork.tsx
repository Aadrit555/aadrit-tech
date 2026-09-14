"use client";

import Link from "next/link";
import { ArrowUpRight, Layers, ArrowRight } from "lucide-react";
import SpotlightCard from "@/components/animations/SpotlightCard";

interface CaseStudy {
  id: string;
  category: string;
  title: string;
  description: string;
  tags: string[];
  metrics: { label: string; value: string }[];
  linkUrl: string;
}

const caseStudies: CaseStudy[] = [
  {
    id: "mastercard",
    category: "CX Refresh",
    title: "Mastercard Cashpassport experience",
    description:
      "Reimagining Mastercard Cash Passport as a smart travel companion that makes every moment matter in the new world",
    tags: ["Product design", "OMNICHANNEL DESIGN", "UX RESEARCH"],
    metrics: [
      { value: "50+", label: "Flows designed" },
      { value: "3M+", label: "Users served" },
      { value: "500+", label: "Screens designed" },
    ],
    linkUrl: "/mastercard",
  },
  {
    id: "devnagri_ai",
    category: "Dashboard experience",
    title: "Multilingual Conversational AI Agents - Created Saas Management Dashboard",
    description:
      "Created human-centered, low‑code workspace to create, brand, integrate, and measure AI voice agents - increased customer engagement by 51%.",
    tags: ["DESIGN SYSTEM", "CONVERSATIONAL AI", "SAAS"],
    metrics: [
      { value: "51%", label: "engagement boost" },
      { value: "32%", label: "Painpoints resolved" },
      { value: "100+", label: "components adopted across multiple products" },
    ],
    linkUrl: "/devnagri_ai",
  },
];

export default function SelectedWork() {
  return (
    <section id="work" className="py-20 md:py-28 border-b border-border-dim bg-background relative z-10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Section Header mirroring Akash Umang's exact copy & Instrument Serif */}
        <div className="mb-14 pb-6 border-b border-border-dim flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="text-xs font-mono text-[#f9452d] tracking-wider uppercase mb-2">
              Selected work
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-white font-sans">
              Proven results, <span className="font-serif italic font-normal text-text-primary">stunning designs</span>
            </h2>
          </div>
          <div className="text-xs font-mono text-text-muted">
            All cases <span className="text-white font-bold font-mono">04</span>
          </div>
        </div>

        {/* Vertical Case Study Presentation Cards */}
        <div className="space-y-12">
          {caseStudies.map((study) => (
            <SpotlightCard key={study.id} className="p-8 sm:p-10 border border-border-dim bg-surface/80">
              <div className="space-y-6">
                {/* Category & Tags */}
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <span className="text-xs font-mono text-[#f9452d] tracking-wider uppercase font-semibold">
                    {study.category}
                  </span>
                  <div className="flex flex-wrap items-center gap-2">
                    {study.tags.map((tag, idx) => (
                      <span key={idx} className="code-badge text-[10px]">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Case Study Title */}
                <div>
                  <h3 className="text-2xl sm:text-3xl font-medium text-white font-sans mb-3">
                    {study.title}
                  </h3>
                  <p className="text-sm sm:text-base text-text-secondary leading-relaxed font-sans max-w-3xl">
                    {study.description}
                  </p>
                </div>

                {/* Metrics / Technical Impact Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-border-dim">
                  {study.metrics.map((metric, idx) => (
                    <div key={idx} className="p-4 rounded bg-surface-raised border border-border-dim space-y-1">
                      <div className="text-2xl sm:text-3xl font-normal text-white font-sans">
                        {metric.value}
                      </div>
                      <div className="text-xs font-mono text-text-muted">
                        {metric.label}
                      </div>
                    </div>
                  ))}
                </div>

                {/* View Case Study Link */}
                <div className="pt-2">
                  <Link
                    href={study.linkUrl}
                    className="btn-primary inline-flex items-center gap-2 group"
                  >
                    <span>View case study</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            </SpotlightCard>
          ))}

          {/* Technical Systems Extension Card */}
          <SpotlightCard className="p-8 border border-border-dim bg-surface/60">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="text-xs font-mono text-accent-cyan uppercase">
                  Systems & AI Models
                </div>
                <div className="text-base font-bold text-white font-sans">
                  Looking for low-level software, SLM NLP models, and firmware security?
                </div>
                <div className="text-xs text-text-secondary font-mono">
                  Inspect Hemlock (C defense suite) & DIDsomethin_SLM (Python intent model) in the interactive console.
                </div>
              </div>
              <a
                href="#terminal"
                className="btn-secondary whitespace-nowrap self-start sm:self-center"
              >
                Launch Console
              </a>
            </div>
          </SpotlightCard>
        </div>
      </div>
    </section>
  );
}

