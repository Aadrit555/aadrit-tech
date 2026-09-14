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
          <ShinyBadge dotColor="bg-accent-emerald">
            <span className="font-semibold text-white">Aadrit</span>
            <span className="text-text-muted mx-1">/</span>
            <span className="text-accent-cyan">AI/ML & Systems Engineer</span>
          </ShinyBadge>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded border border-border-dim bg-surface text-xs font-mono text-text-muted">
            <span className="w-1.5 h-1.5 rounded-full bg-accent-emerald animate-pulse"></span>
            <span>Undergrad @ SRM University AP</span>
          </div>
        </div>

        {/* Large Statement Headline mirroring Akash Umang's editorial style */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-bold text-white font-sans tracking-tight leading-[1.15] mb-8 max-w-4xl">
          I build AI/ML systems and low-level software across NLP, adversarial simulations, and firmware security, helping teams figure out what to build, why it matters, and how it should work - while balancing performance, mathematical precision, and edge constraints.
        </h1>

        {/* Sub-ticker bullet statements matching Akash's ticker cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-10 text-xs font-mono">
          <div className="p-3 rounded border border-border-dim bg-surface/70 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-accent-emerald flex-shrink-0"></span>
            <span className="text-text-secondary">AI & Systems Engineer.</span>
          </div>
          <div className="p-3 rounded border border-border-dim bg-surface/70 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-accent-cyan flex-shrink-0"></span>
            <span className="text-text-secondary">SRM University AP CSE.</span>
          </div>
          <div className="p-3 rounded border border-border-dim bg-surface/70 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-text-secondary flex-shrink-0"></span>
            <span className="text-text-secondary">NLP to Firmware Security.</span>
          </div>
          <div className="p-3 rounded border border-border-dim bg-surface/70 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 flex-shrink-0"></span>
            <span className="text-text-secondary">Built to execute at edge.</span>
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
            href="https://github.com/Aadrit555"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary flex items-center gap-2"
          >
            <Github className="w-3.5 h-3.5" />
            <span>github.com/Aadrit555</span>
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
        </div>
      </div>
    </section>
  );
}
