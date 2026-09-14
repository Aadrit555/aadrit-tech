"use client";

import Image from "next/image";
import { MapPin, GraduationCap, Briefcase, Award, ShieldCheck } from "lucide-react";
import SpotlightCard from "@/components/animations/SpotlightCard";

export default function AboutSection() {
  return (
    <section id="about" className="py-20 md:py-28 border-b border-border-dim bg-tech-grid relative z-10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Section Header mirroring Akash Umang's exact copy & Instrument Serif */}
        <div className="mb-14 pb-6 border-b border-border-dim">
          <div className="text-xs font-mono text-[#f9452d] tracking-wider uppercase mb-2">
            About me
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-white font-sans">
            Building knowledge <span className="font-serif italic font-normal text-text-primary">beyond the work.</span>
          </h2>
        </div>

        {/* 2-Column Split matching Akash Umang's layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Authentic Portrait Card */}
          <div className="lg:col-span-5">
            <SpotlightCard className="p-4 shadow-xl border border-border-dim bg-surface">
              <div className="w-full aspect-square relative rounded border border-border-dim overflow-hidden bg-surface-raised mb-4">
                <Image
                  src="/images/aadrit.png"
                  alt="Aadrit"
                  fill
                  sizes="(max-width: 768px) 100vw, 360px"
                  className="object-cover object-center grayscale contrast-105 hover:grayscale-0 transition-all duration-500"
                />
              </div>

              <div className="space-y-2 px-1 font-mono text-xs text-text-secondary">
                <div className="flex items-center justify-between pb-2 border-b border-border-dim">
                  <span className="font-bold text-white text-sm">Aadrit</span>
                  <span className="text-[#f9452d] flex items-center gap-1 text-[11px] font-semibold">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>VERIFIED</span>
                  </span>
                </div>

                <div className="flex items-center justify-between text-text-muted text-xs">
                  <span>Role</span>
                  <span className="text-white">Product Designer</span>
                </div>

                <div className="flex items-center justify-between text-text-muted text-xs">
                  <span>Experience</span>
                  <span className="text-white">4+ Years</span>
                </div>

                <div className="flex items-center justify-between text-text-muted text-xs">
                  <span>Location</span>
                  <span className="text-white">India (Global Remote)</span>
                </div>
              </div>
            </SpotlightCard>
          </div>

          {/* Right Column: Exact Narrative Biography & Philosophy from Akash Umang */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-5 text-base sm:text-lg text-text-secondary leading-relaxed font-sans font-light">
              <p>
                Senior Product Designer with <strong className="text-white font-medium">4 years of experience</strong> designing digital products across enterprise, fintech, B2B SaaS, CRM, and consumer platforms. Skilled at turning complex business requirements into intuitive, scalable, and user-centered experiences across web and mobile.
              </p>
              <p>
                Experienced in collaborating with product managers, engineers, and clients to solve complex UX problems and deliver products from concept to development. Contributing to large-scale ecosystems including <strong className="text-white font-medium">Mastercard</strong> and banking platforms with <strong className="text-white font-medium">Zennify (Affinity FCU, USA)</strong>.
              </p>
              <p className="text-sm sm:text-base text-text-muted leading-relaxed">
                He is particularly interested in systems thinking, reducing friction in user journeys, and solving the kind of invisible product problems that quietly shape user behavior and business outcomes.
              </p>
            </div>

            {/* Core Competencies matching Akash's exact domain focus */}
            <div className="pt-6 border-t border-border-dim grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded bg-surface border border-border-dim space-y-1">
                <div className="text-xs font-mono font-bold text-white uppercase">
                  Fintech & Banking Systems
                </div>
                <p className="text-xs text-text-secondary leading-relaxed font-sans">
                  Scalable user journeys for multi-currency travel cards, transaction transparency, and fraud controls.
                </p>
              </div>

              <div className="p-4 rounded bg-surface border border-border-dim space-y-1">
                <div className="text-xs font-mono font-bold text-white uppercase">
                  Conversational AI Workspaces
                </div>
                <p className="text-xs text-text-secondary leading-relaxed font-sans">
                  Low-code dashboards to configure, train, brand, and evaluate multi-lingual AI voice agents.
                </p>
              </div>

              <div className="p-4 rounded bg-surface border border-border-dim space-y-1">
                <div className="text-xs font-mono font-bold text-white uppercase">
                  Design Systems & Tokens
                </div>
                <p className="text-xs text-text-secondary leading-relaxed font-sans">
                  Establishing reusable patterns and accessible component foundations adopted across multiple teams.
                </p>
              </div>

              <div className="p-4 rounded bg-surface border border-border-dim space-y-1">
                <div className="text-xs font-mono font-bold text-white uppercase">
                  Omnichannel Continuity
                </div>
                <p className="text-xs text-text-secondary leading-relaxed font-sans">
                  Connected user journeys across consumer mobile apps, web portals, and internal servicing desks.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

