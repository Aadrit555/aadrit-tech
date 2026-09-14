"use client";

import Link from "next/link";
import { ArrowRight, Mail, Github, Linkedin, ShieldCheck, Terminal } from "lucide-react";
import DecryptedText from "@/components/animations/DecryptedText";
import ShinyBadge from "@/components/animations/ShinyBadge";

export default function HeroSection() {
  return (
    <section className="pt-16 pb-20 md:pt-28 md:pb-28 border-b border-border-dim bg-background relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Top Badges */}
        <div className="flex flex-wrap items-center gap-3 mb-8">
          <ShinyBadge dotColor="bg-[#f9452d]">
            <span className="font-semibold text-white">Aadrit</span>
            <span className="text-text-muted mx-1">/</span>
            <span className="text-text-secondary">Senior Product Designer</span>
          </ShinyBadge>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded border border-border-dim bg-surface text-xs font-mono text-text-muted">
            <span className="w-1.5 h-1.5 rounded-full bg-[#f9452d] animate-pulse"></span>
            <span>I am Aadrit, AI first Product Designer.</span>
          </div>
        </div>

        {/* Large Statement Headline matching Akash Umang's exact copy */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-normal text-white font-sans tracking-tight leading-[1.18] mb-8 max-w-4xl">
          I design products across SaaS, AI, and enterprise, helping teams figure out what to build, why it matters, and how it should work - while balancing user needs, business goals, and product constraints
        </h1>

        {/* Sub-ticker bullet statements matching Akash's exact 4 ticker cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-10 text-xs font-mono">
          <div className="p-3 rounded border border-border-dim bg-surface/70 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#f9452d] flex-shrink-0"></span>
            <span className="text-text-secondary">AI first Product Designer.</span>
          </div>
          <div className="p-3 rounded border border-border-dim bg-surface/70 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-accent-cyan flex-shrink-0"></span>
            <span className="text-text-secondary">4 years in, still building.</span>
          </div>
          <div className="p-3 rounded border border-border-dim bg-surface/70 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-text-secondary flex-shrink-0"></span>
            <span className="text-text-secondary">From 0 to 4 million users.</span>
          </div>
          <div className="p-3 rounded border border-border-dim bg-surface/70 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 flex-shrink-0"></span>
            <span className="text-text-secondary">Built to ship at scale.</span>
          </div>
        </div>

        {/* Call-to-action buttons */}
        <div className="flex flex-wrap items-center gap-3 pt-2">
          <a href="#work" className="btn-primary flex items-center gap-2 group">
            <span>Selected Work</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
          </a>

          <a href="#contact" className="btn-secondary flex items-center gap-2">
            <Mail className="w-3.5 h-3.5" />
            <span>Say Hi!</span>
          </a>

          <a
            href="https://www.linkedin.com/in/aadrit-srivastava"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary flex items-center gap-2"
          >
            <Linkedin className="w-3.5 h-3.5" />
            <span>LinkedIn</span>
          </a>

          <a
            href="#experience"
            className="btn-secondary flex items-center gap-2"
          >
            <span>Resume / Experience</span>
          </a>
        </div>
      </div>
    </section>
  );
}

