"use client";

import Image from "next/image";
import { ArrowUpRight, Award, FlaskConical, Users } from "lucide-react";
import SpotlightCard from "@/components/animations/SpotlightCard";
import ScrollReveal from "@/components/animations/ScrollReveal";
import { leadershipRoles, academicAndHonors } from "@/data/portfolio";

export default function WorkHistory() {
  return (
    <section id="experience" className="py-12 md:py-20 bg-transparent relative z-10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Section Header with Pokédex Styling */}
        <div className="mb-10 p-6 sm:p-8 bg-white/85 backdrop-blur-md border border-white/70 rounded-2xl shadow-md">
          <div className="text-xs font-mono text-[#dc2626] tracking-wider uppercase mb-2 font-bold flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            <span>Experience // Activity Record</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight text-zinc-950 font-sans">
            Experience
          </h2>
        </div>

        {/* Featured Interactive Cards for NTL & FOSS SRMAP */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {leadershipRoles.map((item, idx) => (
            <ScrollReveal key={item.slug} delay={idx * 100}>
              <SpotlightCard
                className="p-6 sm:p-8 border border-white/70 bg-white/85 backdrop-blur-md shadow-md hover:border-zinc-300 transition-all flex flex-col justify-between h-full"
              >
                <div className="space-y-5">
                  {/* Top Header: Decorative Logo & Action Button */}
                  <div className="flex items-start justify-between gap-4">
                    {/* Decorative Logo */}
                    <div
                      className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-md border border-zinc-200 bg-zinc-50 p-2 flex items-center justify-center overflow-hidden flex-shrink-0"
                      aria-hidden="true"
                    >
                      <Image
                        src={item.logoUrl}
                        alt={`${item.organization} logo`}
                        width={48}
                        height={48}
                        className="object-contain w-full h-full"
                      />
                    </div>

                    <div className="flex flex-col items-start sm:items-end gap-1.5">
                      <span className="text-xs font-mono text-zinc-500 font-medium">
                        {item.period}
                      </span>
                      <a
                        href={item.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-2 rounded-md bg-white hover:bg-zinc-100 border border-zinc-200 hover:border-zinc-300 text-xs font-mono font-bold text-zinc-900 transition-all shadow-2xs group/action min-h-[44px]"
                        title={item.actionText}
                      >
                        <span>{item.actionText}</span>
                        <ArrowUpRight className="w-3.5 h-3.5 flex-shrink-0 text-zinc-500 transition-transform group-hover/action:translate-x-0.5 group-hover/action:-translate-y-0.5" />
                      </a>
                    </div>
                  </div>

                  {/* Role & Organization */}
                  <div>
                    <h3 className="text-xl sm:text-2xl font-medium text-zinc-950 font-sans flex items-center gap-2">
                      {item.slug === "ntlap" ? (
                        <FlaskConical className="w-5 h-5 text-red-500" />
                      ) : (
                        <Users className="w-5 h-5 text-cyan-600" />
                      )}
                      <span>{item.role}</span>
                    </h3>
                    <div className="text-xs font-mono text-zinc-500 font-semibold mt-1">
                      {item.organization}
                    </div>
                  </div>

                  {/* Description & Bullets */}
                  <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed font-sans">
                    {item.description}
                  </p>

                  <ul className="space-y-1.5 text-xs text-zinc-600 font-sans list-disc list-inside">
                    {item.bullets.map((bullet, bIdx) => (
                      <li key={bIdx} className="leading-relaxed">
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Tags footer */}
                <div className="pt-6 border-t border-border-dim flex flex-wrap gap-1.5 mt-6">
                  {item.tags.map((tag, tIdx) => (
                    <span key={tIdx} className="code-badge text-[10px]">
                      {tag}
                    </span>
                  ))}
                </div>
              </SpotlightCard>
            </ScrollReveal>
          ))}
        </div>

        {/* Academic & Honors Context: Clear Hierarchy (Education Primary, Honors Supporting) */}
        <ScrollReveal>
          <div className="p-6 sm:p-8 rounded-2xl bg-white/85 backdrop-blur-md border border-white/70 shadow-md space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-border-dim">
              <h3 className="text-xl sm:text-2xl font-normal text-zinc-950 font-sans flex items-center gap-2">
                <Award className="w-5 h-5 text-amber-500" />
                <span>Education & <span className="font-serif italic text-zinc-600">recognitions</span></span>
              </h3>
              <span className="text-xs font-mono text-zinc-500 font-medium">SRM University AP</span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
              {/* Primary Education Card */}
              <div className="lg:col-span-6 p-6 rounded-xl border border-white/90 bg-white/70 shadow-sm space-y-3 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono text-[#dc2626] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-red-50 border border-red-200">
                      {academicAndHonors[0].category}
                    </span>
                    <span className="text-xs font-mono text-zinc-500 font-medium">
                      {academicAndHonors[0].period}
                    </span>
                  </div>
                  <div className="text-lg font-medium text-zinc-950 font-sans">
                    {academicAndHonors[0].title}
                  </div>
                  <div className="text-xs font-mono text-emerald-700 font-semibold">
                    {academicAndHonors[0].role}
                  </div>
                  <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed font-sans">
                    {academicAndHonors[0].description}
                  </p>
                </div>
                <div className="pt-3 border-t border-zinc-200/60 text-[11px] font-mono text-zinc-500">
                  Core: Systems · Algorithms · Operating Systems · Networks
                </div>
              </div>

              {/* Supporting Proof Points / Recognitions */}
              <div className="lg:col-span-6 grid grid-cols-1 gap-3">
                {academicAndHonors.slice(1).map((item, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-lg border border-white/80 bg-white/50 hover:bg-white/70 transition-colors shadow-2xs space-y-1.5"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono text-amber-700 uppercase font-bold tracking-wider">
                        {item.category}
                      </span>
                      <span className="text-[11px] font-mono text-zinc-500">
                        {item.period}
                      </span>
                    </div>
                    <div className="text-sm font-medium text-zinc-950 font-sans">
                      {item.title}
                    </div>
                    <div className="text-xs font-mono text-zinc-500">
                      {item.role}
                    </div>
                    <p className="text-xs text-zinc-600 leading-relaxed font-sans">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
