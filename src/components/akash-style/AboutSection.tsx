"use client";

import Image from "next/image";
import { MapPin, GraduationCap, Briefcase, Award, ShieldCheck } from "lucide-react";
import SpotlightCard from "@/components/animations/SpotlightCard";

export default function AboutSection() {
  return (
    <section id="about" className="py-20 md:py-28 border-b border-border-dim bg-tech-grid relative z-10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="mb-14 pb-6 border-b border-border-dim">
          <div className="text-xs font-mono text-accent-cyan tracking-wider uppercase mb-2">
            About Aadrit
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white font-sans">
            Building knowledge beyond coursework
          </h2>
        </div>

        {/* 2-Column Split matching Akash Umang's layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Authentic Portrait Card */}
          <div className="lg:col-span-5">
            <SpotlightCard className="p-4 shadow-xl">
              <div className="w-full aspect-square relative rounded border border-border-dim overflow-hidden bg-surface-raised mb-4">
                <Image
                  src="/images/aadrit.png"
                  alt="Aadrit Srivastava"
                  fill
                  sizes="(max-width: 768px) 100vw, 360px"
                  className="object-cover object-center grayscale contrast-105 hover:grayscale-0 transition-all duration-500"
                />
              </div>

              <div className="space-y-3 px-1 font-mono text-xs text-text-secondary">
                <div className="flex items-center justify-between pb-2 border-b border-border-dim">
                  <span className="font-bold text-white">Aadrit Srivastava</span>
                  <span className="text-accent-emerald flex items-center gap-1 text-[11px]">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>VERIFIED</span>
                  </span>
                </div>

                <div className="flex items-center gap-2 text-text-muted text-[11px]">
                  <MapPin className="w-3.5 h-3.5 text-text-secondary" />
                  <span>Lucknow, Uttar Pradesh, India</span>
                </div>

                <div className="flex items-center gap-2 text-text-muted text-[11px]">
                  <GraduationCap className="w-3.5 h-3.5 text-accent-cyan" />
                  <span>SRM University AP (B.Tech CSE)</span>
                </div>

                <div className="flex items-center gap-2 text-text-muted text-[11px]">
                  <Briefcase className="w-3.5 h-3.5 text-accent-emerald" />
                  <span>Associate @ Next Tech Lab</span>
                </div>
              </div>
            </SpotlightCard>
          </div>

          {/* Right Column: Narrative Biography & Philosophy */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-4 text-base sm:text-lg text-text-secondary leading-relaxed font-sans">
              <p>
                Computer Science undergraduate at <strong className="text-white">SRM University AP</strong> who builds
                working AI/ML systems, not just coursework: an NLP intent-classification model, an adversarial simulation
                framework with self-improving agents, and firmware-level security defenses in C.
              </p>
              <p>
                Strong in Python, model training/evaluation, and object-oriented design, with proven experience taking
                projects from initial concept to a working, testable system.
              </p>
              <p className="text-sm sm:text-base text-text-muted">
                He is particularly interested in systems thinking, resource-constrained edge execution, and solving the kind
                of invisible low-level vulnerabilities and latency bottlenecks that shape real-world software performance.
              </p>
            </div>

            {/* Core Pillars */}
            <div className="pt-6 border-t border-border-dim grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded bg-surface border border-border-dim space-y-1">
                <div className="text-xs font-mono font-bold text-white uppercase">
                  Edge AI Optimization
                </div>
                <p className="text-xs text-text-secondary leading-relaxed font-sans">
                  Pruning and optimizing neural pipelines for deployment on resource-constrained micro-hardware.
                </p>
              </div>

              <div className="p-4 rounded bg-surface border border-border-dim space-y-1">
                <div className="text-xs font-mono font-bold text-white uppercase">
                  Firmware Cryptography
                </div>
                <p className="text-xs text-text-secondary leading-relaxed font-sans">
                  Mitigating physical side-channel and memory tampering attacks in bare-metal C.
                </p>
              </div>

              <div className="p-4 rounded bg-surface border border-border-dim space-y-1">
                <div className="text-xs font-mono font-bold text-white uppercase">
                  Adversarial Simulation
                </div>
                <p className="text-xs text-text-secondary leading-relaxed font-sans">
                  Designing multi-agent game-theoretic attacker and defender continuous training harnesses.
                </p>
              </div>

              <div className="p-4 rounded bg-surface border border-border-dim space-y-1">
                <div className="text-xs font-mono font-bold text-white uppercase">
                  Data Pipeline Engineering
                </div>
                <p className="text-xs text-text-secondary leading-relaxed font-sans">
                  Automating feature engineering, preprocessing workflows, and cross-validation harnesses.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
