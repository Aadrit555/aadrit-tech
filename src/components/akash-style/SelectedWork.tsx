"use client";

import { ArrowUpRight, GitBranch, Zap } from "lucide-react";
import SpotlightCard from "@/components/animations/SpotlightCard";
import ShinyBadge from "@/components/animations/ShinyBadge";
import ScrollReveal from "@/components/animations/ScrollReveal";
import { projects } from "@/data/portfolio";

export default function SelectedWork() {
  return (
    <section id="work" className="py-12 md:py-20 bg-transparent relative z-10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="mb-10 p-6 sm:p-8 bg-white/85 backdrop-blur-md border border-white/70 rounded-2xl shadow-md flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="text-xs font-mono text-[#dc2626] tracking-wider uppercase mb-2 font-bold flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              <span>Pokédex Memory Bank // Technical Machines (TMs)</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight text-zinc-950 font-sans">
              Selected systems <span className="font-serif italic font-normal text-zinc-600">& experiments</span>
            </h2>
          </div>
          <div className="text-xs font-mono text-zinc-500">
            04 <span className="text-zinc-950 font-bold font-mono">PROJECTS</span>
          </div>
        </div>

        {/* Selected Projects Presentation */}
        <div className="space-y-10">
          {projects.map((project) => (
            <ScrollReveal key={project.id}>
              <SpotlightCard className="p-6 sm:p-9 border border-white/70 bg-white/85 backdrop-blur-md shadow-md">
                <div className="space-y-5">
                  {/* Top Line: TM Badge, Category & Award */}
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded bg-zinc-900 text-emerald-400 font-mono text-xs font-bold border border-zinc-950">
                        {project.tmNumber}
                      </span>
                      <span className="text-xs font-mono text-[#dc2626] tracking-wider uppercase font-bold">
                        {project.category}
                      </span>
                    </div>

                    {project.awardBadge && (
                      <ShinyBadge dotColor="bg-amber-500" className="text-[10px]">
                        {project.awardBadge}
                      </ShinyBadge>
                    )}
                  </div>

                  {/* Project Title & Overview - Arrives Immediately */}
                  <div>
                    <h3 className="text-2xl sm:text-3xl font-medium text-zinc-950 font-sans mb-2">
                      {project.title}
                    </h3>
                    <p className="text-sm sm:text-base text-zinc-600 leading-relaxed font-sans max-w-3xl">
                      {project.description}
                    </p>
                  </div>

                  {/* Implementation Highlights */}
                  <ul className="space-y-1.5 text-xs sm:text-sm text-zinc-600 font-sans list-disc list-inside">
                    {project.bullets.map((bullet, idx) => (
                      <li key={idx} className="leading-relaxed">
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Clean 3-4 Project Tags */}
                  <div className="flex flex-wrap items-center gap-1.5 pt-1">
                    {project.tags.map((tag, idx) => (
                      <span key={idx} className="code-badge text-[10px]">
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Grounded Technical Details: Label + Value format */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-5 border-t border-zinc-200">
                    {project.technicalDetails.map((detail, idx) => (
                      <div
                        key={idx}
                        className="p-3 rounded-md bg-zinc-50/90 border border-zinc-200/80 space-y-0.5 shadow-2xs"
                      >
                        <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider flex items-center gap-1">
                          <Zap className="w-3 h-3 text-amber-500 flex-shrink-0" />
                          <span>{detail.label}</span>
                        </div>
                        <div className="text-sm font-semibold text-zinc-900 font-sans">
                          {detail.value}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Action Links (Live Demo + GitHub) */}
                  <div className="flex flex-wrap items-center gap-2.5 pt-1">
                    {project.demoUrl && (
                      <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="pokedex-btn-action bg-[#dc2626] hover:bg-[#b91c1c] text-white border border-red-500 inline-flex items-center gap-1.5 font-mono text-xs font-bold shadow-xs"
                      >
                        <span>Live Demo</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </a>
                    )}
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="pokedex-btn-action bg-white text-zinc-900 hover:bg-zinc-100 border border-zinc-300 inline-flex items-center gap-1.5 font-mono text-xs font-medium shadow-2xs"
                      >
                        <GitBranch className="w-3.5 h-3.5 text-zinc-700" />
                        <span>View on GitHub</span>
                        <ArrowUpRight className="w-3 h-3 text-zinc-400" />
                      </a>
                    )}
                  </div>
                </div>
              </SpotlightCard>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
