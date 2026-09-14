"use client";

import { ShieldCheck, Cpu, Terminal, Shield, Network } from "lucide-react";
import SpotlightCard from "@/components/animations/SpotlightCard";
import ScrollReveal from "@/components/animations/ScrollReveal";

export default function AboutSection() {
  return (
    <section id="about" className="py-12 md:py-20 bg-transparent relative z-10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Section Header with Pokédex Trainer Styling */}
        <div className="mb-10 p-6 sm:p-8 bg-white/85 backdrop-blur-md border border-white/70 rounded-2xl shadow-md">
          <div className="text-xs font-mono text-[#dc2626] tracking-wider uppercase mb-2 font-bold flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            <span>Pokédex Trainer Specification // Technical Identity</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight text-zinc-950 font-sans">
            Building engineering depth <span className="font-serif italic font-normal text-zinc-600">beyond the models.</span>
          </h2>
        </div>

        {/* 2-Column Split: Trainer Card + Engineering Pillars */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Pokédex Trainer Identity Card */}
          <div className="lg:col-span-5">
            <ScrollReveal delay={0}>
              <SpotlightCard className="p-6 shadow-md border border-white/70 bg-white/85 backdrop-blur-md">
                <div className="flex items-center justify-between pb-4 mb-4 border-b border-border-dim">
                  <div>
                    <div className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider">
                      TRAINER CARD // NO. 0384
                    </div>
                    <div className="font-mono font-bold text-zinc-950 text-base">Aadrit Srivastava</div>
                    <div className="text-xs font-mono text-zinc-500">AI/ML & Systems Undergrad</div>
                  </div>
                  <span className="text-[#dc2626] flex items-center gap-1 text-[11px] font-mono font-bold px-2 py-0.5 rounded bg-red-50 border border-red-200">
                    <ShieldCheck className="w-3.5 h-3.5 text-red-600" />
                    <span>VERIFIED</span>
                  </span>
                </div>

                <div className="space-y-3 font-mono text-xs text-zinc-600">
                  <div className="flex items-center justify-between pb-1.5 border-b border-zinc-100">
                    <span className="text-zinc-400">Affiliation</span>
                    <span className="text-zinc-900 font-medium">SRM University AP</span>
                  </div>

                  <div className="flex items-center justify-between pb-1.5 border-b border-zinc-100">
                    <span className="text-zinc-400">Lab</span>
                    <a
                      href="https://www.ntlap.in"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-zinc-900 hover:text-[#dc2626] font-medium transition-colors"
                    >
                      Next Tech Lab (Member)
                    </a>
                  </div>

                  <div className="flex items-center justify-between pb-1.5 border-b border-zinc-100">
                    <span className="text-zinc-400">Community</span>
                    <span className="text-zinc-900 font-medium">FOSS SRMAP (Co-Lead)</span>
                  </div>

                  <div className="flex items-center justify-between pb-1.5 border-b border-zinc-100">
                    <span className="text-zinc-400">Degree Focus</span>
                    <span className="text-zinc-900 font-medium">B.Tech CSE (2023 - 2027)</span>
                  </div>

                  <div className="flex items-center justify-between pb-1.5 border-b border-zinc-100">
                    <span className="text-zinc-400">Base Location</span>
                    <span className="text-zinc-900 font-medium">Lucknow, UP, India</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-zinc-400">Pokédex Region</span>
                    <span className="text-emerald-700 font-bold">Hoenn // No. 0384</span>
                  </div>
                </div>
              </SpotlightCard>
            </ScrollReveal>
          </div>

          {/* Right Column: Narrative Biography in Frosted Glass Container */}
          <div className="lg:col-span-7">
            <ScrollReveal delay={120}>
              <SpotlightCard className="p-6 sm:p-8 shadow-md border border-white/70 bg-white/85 backdrop-blur-md space-y-6">
                <div className="flex items-center justify-between pb-3 border-b border-border-dim">
                  <div className="text-xs font-mono text-zinc-400 uppercase tracking-wider">
                    ENGINEERING DOSSIER // ABOUT
                  </div>
                  <span className="text-xs font-mono text-emerald-600 font-semibold">
                    STATUS: ACTIVE
                  </span>
                </div>

                <div className="space-y-4 text-sm sm:text-base text-zinc-700 leading-relaxed font-sans">
                  <p>
                    I am a Computer Science student at <strong className="text-zinc-950 font-medium">SRM University AP</strong>, a member at <strong className="text-zinc-950 font-medium">Next Tech Lab (ntlap)</strong>, and co-lead at <strong className="text-zinc-950 font-medium">FOSS SRMAP</strong>.
                  </p>
                  <p>
                    I like writing clean, secure C for microcontrollers and embedded systems, and using Python to build lightweight machine learning models that run quickly on regular devices.
                  </p>
                  <p className="text-zinc-600">
                    Recipient of the national <strong className="text-zinc-950 font-medium">Manak Inspire Award</strong> by DST and recognized at <strong className="text-zinc-950 font-medium">FOSS United JUST A HACKATHON</strong>.
                  </p>
                </div>

                {/* Core Focus Areas */}
                <div className="pt-4 border-t border-border-dim grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="p-3 rounded bg-white/60 border border-white/80 space-y-1 shadow-xs">
                    <div className="text-xs font-mono font-bold text-zinc-900 flex items-center gap-1.5">
                      <Cpu className="w-3.5 h-3.5 text-[#dc2626]" />
                      <span>Machine Learning</span>
                    </div>
                    <p className="text-xs text-zinc-600 leading-relaxed font-sans">
                      Small, fast text classification models in Python that run quickly on standard CPU devices.
                    </p>
                  </div>

                  <div className="p-3 rounded bg-white/60 border border-white/80 space-y-1 shadow-xs">
                    <div className="text-xs font-mono font-bold text-zinc-900 flex items-center gap-1.5">
                      <Shield className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Systems & Security</span>
                    </div>
                    <p className="text-xs text-zinc-600 leading-relaxed font-sans">
                      Low-level C code to protect device memory, prevent tampering, and verify data safely.
                    </p>
                  </div>

                  <div className="p-3 rounded bg-white/60 border border-white/80 space-y-1 shadow-xs">
                    <div className="text-xs font-mono font-bold text-zinc-900 flex items-center gap-1.5">
                      <Terminal className="w-3.5 h-3.5 text-cyan-600" />
                      <span>Agent Simulations</span>
                    </div>
                    <p className="text-xs text-zinc-600 leading-relaxed font-sans">
                      Python simulations where competing AI agents learn and improve strategies across rounds.
                    </p>
                  </div>

                  <div className="p-3 rounded bg-white/60 border border-white/80 space-y-1 shadow-xs">
                    <div className="text-xs font-mono font-bold text-zinc-900 flex items-center gap-1.5">
                      <Network className="w-3.5 h-3.5 text-amber-600" />
                      <span>Search & Retrieval</span>
                    </div>
                    <p className="text-xs text-zinc-600 leading-relaxed font-sans">
                      Fast document search combining keyword filtering and vector search using Python and FastAPI.
                    </p>
                  </div>
                </div>
              </SpotlightCard>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
