"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  MapPin,
  Mail,
  Github,
  Linkedin,
  ShieldCheck,
  ArrowRight,
  Copy,
  Check,
  Activity,
} from "lucide-react";
import DecryptedText from "@/components/animations/DecryptedText";
import ShinyBadge from "@/components/animations/ShinyBadge";
import SpotlightCard from "@/components/animations/SpotlightCard";

export default function Hero() {
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText("aadrit.yks@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="relative pt-12 pb-16 md:pt-20 md:pb-24 border-b border-border-dim bg-tech-grid">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Technical Profile & Headline */}
          <div className="lg:col-span-8 space-y-6">
            {/* Status & Verification Badges */}
            <div className="flex flex-wrap items-center gap-3">
              <ShinyBadge dotColor="bg-accent-emerald">
                <span>Undergraduate Researcher: SRM University AP</span>
                <span className="text-border-bright mx-1">/</span>
                <span className="text-accent-cyan font-semibold">B.Tech CSE</span>
              </ShinyBadge>

              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded border border-border-dim bg-surface text-[11px] font-mono text-text-muted">
                <Activity className="w-3 h-3 text-accent-emerald animate-pulse" />
                <span>LATENCY: 14ms</span>
                <span className="text-border-dim">|</span>
                <span className="text-accent-emerald">NOMINAL</span>
              </div>
            </div>

            {/* Direct & Authentic Hero Title with Decrypted Text Scramble */}
            <div className="space-y-2">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white font-sans">
                <DecryptedText
                  text="Aadrit Srivastava"
                  speed={35}
                  maxIterations={12}
                  className="text-white"
                />
              </h1>
              <p className="text-lg sm:text-xl text-text-secondary font-mono">
                <DecryptedText
                  text="AI/ML & Systems Engineer"
                  speed={25}
                  maxIterations={8}
                  className="text-text-secondary"
                />
              </p>
            </div>

            {/* Precise, non-vague description from resume */}
            <p className="text-sm sm:text-base text-text-secondary leading-relaxed max-w-2xl">
              Building working AI/ML systems and low-level software: lightweight NLP intent-classification models,
              adversarial simulation frameworks with continuous learning agents, and firmware-level cryptographic
              defenses in C. Focused on systems, information retrieval, and resource-constrained edge execution.
            </p>

            {/* Verified Meta Details with Click-to-Copy */}
            <div className="flex flex-wrap items-center gap-y-2 gap-x-4 text-xs font-mono text-text-muted">
              <div className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-text-secondary" />
                <span>Lucknow, Uttar Pradesh, India</span>
              </div>

              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-text-secondary" />
                <a
                  href="mailto:aadrit.yks@gmail.com"
                  className="hover:text-text-primary transition-colors"
                >
                  aadrit.yks@gmail.com
                </a>
                <button
                  onClick={copyEmail}
                  className="p-1 rounded bg-surface hover:bg-surface-raised border border-border-dim text-text-muted hover:text-white transition-colors"
                  title="Copy email to clipboard"
                >
                  {copied ? (
                    <Check className="w-3 h-3 text-accent-emerald" />
                  ) : (
                    <Copy className="w-3 h-3" />
                  )}
                </button>
                {copied && (
                  <span className="text-[10px] text-accent-emerald font-mono">COPIED</span>
                )}
              </div>
            </div>

            {/* Strict Micro-rounded Action Buttons - NO PILL BUTTONS */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a href="#projects" className="btn-primary flex items-center gap-2 group">
                <span>Explore Code & Systems</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
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
                href="https://www.linkedin.com/in/skaoldi-ntlap"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary flex items-center gap-2"
              >
                <Linkedin className="w-3.5 h-3.5" />
                <span>LinkedIn</span>
              </a>

              <a href="#contact" className="btn-secondary flex items-center gap-2">
                <Mail className="w-3.5 h-3.5" />
                <span>Direct Contact</span>
              </a>
            </div>
          </div>

          {/* Right Column: Genuine User Portrait inside Interactive Spotlight Card */}
          <div className="lg:col-span-4 flex justify-center lg:justify-end">
            <SpotlightCard className="p-3 w-64 sm:w-72 shadow-2xl">
              <div className="w-full aspect-square relative rounded border border-border-dim overflow-hidden bg-surface-raised">
                <Image
                  src="/images/aadrit.png"
                  alt="Aadrit Srivastava"
                  fill
                  priority
                  sizes="(max-width: 768px) 256px, 288px"
                  className="object-cover object-center grayscale contrast-105 hover:grayscale-0 transition-all duration-500"
                />

                {/* Technical Corner Accents */}
                <div className="absolute top-1 left-1 w-2.5 h-2.5 border-t-2 border-l-2 border-text-secondary pointer-events-none"></div>
                <div className="absolute top-1 right-1 w-2.5 h-2.5 border-t-2 border-r-2 border-text-secondary pointer-events-none"></div>
                <div className="absolute bottom-1 left-1 w-2.5 h-2.5 border-b-2 border-l-2 border-text-secondary pointer-events-none"></div>
                <div className="absolute bottom-1 right-1 w-2.5 h-2.5 border-b-2 border-r-2 border-text-secondary pointer-events-none"></div>
              </div>

              {/* Status Bar below photo */}
              <div className="mt-3 flex items-center justify-between px-1 text-[11px] font-mono text-text-muted">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-accent-emerald" />
                  <span className="text-text-secondary">IDENTITY VERIFIED</span>
                </span>
                <span className="text-accent-cyan font-mono">[SRM_AP]</span>
              </div>
            </SpotlightCard>
          </div>
        </div>
      </div>
    </section>
  );
}
