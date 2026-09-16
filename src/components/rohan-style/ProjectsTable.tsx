"use client";

import { useState } from "react";
import { ArrowUpRight, Github, ExternalLink, Zap, Trophy, X } from "lucide-react";
import { projects, Project } from "@/data/portfolio";

const PROJECT_DATES: Record<string, string> = {
  slm: "January, 2026",
  hemlock: "January, 2026",
  "primordial-void": "June, 2026",
  superrag: "February, 2026",
  "aadrit-tech": "September, 2026",
};

export default function ProjectsTable() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section id="projects" className="py-12 sm:py-16 max-w-5xl mx-auto px-4 sm:px-6 relative z-10">
      {/* Section Title */}
      <h2 className="py-3 sm:py-4 text-3xl sm:text-4xl mb-6 sm:mb-8 lowercase group cursor-pointer flex items-center">
        <span className="group-hover:underline underline-offset-2 font-medium">projects</span>
        <span className="inline-block group-hover:rotate-45 transition-transform duration-200 ml-1 text-emerald-600">
          ↑
        </span>
      </h2>

      {/* Table Container */}
      <div className="w-full border-t border-[var(--border)]">
        {/* Table Header Row */}
        <div className="hidden md:grid grid-cols-12 gap-4 py-3 border-b border-[var(--border)] sticky top-14 bg-[var(--background)]/90 backdrop-blur-md z-10 text-xs font-mono font-medium text-[var(--muted)] tracking-wider">
          <div className="col-span-3">/ DATE</div>
          <div className="col-span-5">/ NAME</div>
          <div className="col-span-3 text-right">/ TYPE</div>
          <div className="col-span-1 text-right"></div>
        </div>

        {/* Rows */}
        <div className="divide-y divide-[var(--border)]">
          {projects.map((proj) => {
            const dateStr = PROJECT_DATES[proj.id] || "2024";

            return (
              <div
                key={proj.id}
                onClick={() => setSelectedProject(proj)}
                className="group cursor-pointer py-3.5 sm:py-3 transition-colors duration-200 hover:bg-emerald-500/[0.04]"
              >
                {/* Mobile Row View */}
                <div className="md:hidden flex flex-col gap-1.5">
                  <div className="flex items-center justify-between">
                    <div className="font-medium text-base text-[var(--foreground)] group-hover:text-emerald-600 transition-colors flex items-center gap-2">
                      <span className="text-xs font-mono px-1.5 py-0.5 rounded bg-[var(--foreground)]/5 border border-[var(--border)]">
                        {proj.tmNumber}
                      </span>
                      <span>{proj.title.split("(")[0].trim()}</span>
                    </div>
                    <span className="text-xs group-hover:rotate-45 group-hover:text-emerald-600 transition-all duration-300">
                      ↑
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-xs text-[var(--muted)]">
                    <span>{dateStr}</span>
                    <span className="truncate max-w-[200px]">{proj.category}</span>
                  </div>
                </div>

                {/* Desktop 4-Column Grid */}
                <div className="hidden md:grid grid-cols-12 gap-4 items-center">
                  <div className="col-span-3 text-xs text-[var(--muted)] font-mono group-hover:text-emerald-600 transition-colors">
                    {dateStr}
                  </div>

                  <div className="col-span-5 font-medium text-base text-[var(--foreground)] group-hover:text-emerald-600 transition-colors flex items-center gap-2">
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[var(--foreground)]/5 border border-[var(--border)] text-[var(--muted)]">
                      {proj.tmNumber}
                    </span>
                    <span>{proj.title.split("(")[0].trim()}</span>
                    {proj.awardBadge && (
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-600 border border-amber-500/20 font-medium">
                        Award
                      </span>
                    )}
                  </div>

                  <div className="col-span-3 text-xs text-right text-[var(--muted)] group-hover:text-[var(--foreground)] transition-colors truncate">
                    {proj.category}
                  </div>

                  <div className="col-span-1 text-right text-xs pr-2">
                    <span className="inline-block group-hover:rotate-45 group-hover:text-emerald-600 transition-all duration-300 text-[var(--muted)]">
                      ↑
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Project Detail Modal */}
      {selectedProject && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-150"
          onClick={(e) => {
            if (e.target === e.currentTarget) setSelectedProject(null);
          }}
        >
          <div className="w-full max-w-2xl bg-[var(--background)] border border-[var(--border)] rounded-xl shadow-2xl p-6 sm:p-8 relative max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-150 space-y-6">
            {/* Header: TM badge, Category, Close Button */}
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded bg-zinc-900 text-emerald-400 font-mono text-xs font-bold">
                  {selectedProject.tmNumber}
                </span>
                <span className="text-xs font-mono text-[#f9452d] tracking-wider uppercase font-bold">
                  {selectedProject.category}
                </span>
              </div>

              <button
                type="button"
                onClick={() => setSelectedProject(null)}
                className="p-1 rounded text-[var(--muted)] hover:text-[var(--foreground)] hover:bg-[var(--foreground)]/5 transition-colors cursor-pointer"
                title="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Award Banner if present */}
            {selectedProject.awardBadge && (
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-amber-500/10 border border-amber-500/20 text-xs font-mono text-amber-700 dark:text-amber-300">
                <Trophy className="w-3.5 h-3.5 text-amber-500" />
                <span>{selectedProject.awardBadge}</span>
              </div>
            )}

            {/* Title & Description */}
            <div>
              <h3 className="text-2xl sm:text-3xl font-semibold text-[var(--foreground)] font-sans mb-2">
                {selectedProject.title}
              </h3>
              <p className="text-sm sm:text-base text-[var(--muted)] leading-relaxed font-sans">
                {selectedProject.description}
              </p>
            </div>

            {/* Bullet Points */}
            <div className="space-y-2">
              <div className="text-xs font-mono uppercase tracking-wider text-[var(--muted)] font-bold">
                Implementation Highlights
              </div>
              <ul className="space-y-1.5 text-xs sm:text-sm text-[var(--foreground)]/90 list-disc list-inside">
                {selectedProject.bullets.map((bullet, idx) => (
                  <li key={idx} className="leading-relaxed">
                    {bullet}
                  </li>
                ))}
              </ul>
            </div>

            {/* Technical Details Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              {selectedProject.technicalDetails.map((detail, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-lg border border-[var(--border)] bg-[var(--foreground)]/[0.02] space-y-0.5"
                >
                  <div className="text-[10px] font-mono text-[var(--muted)] uppercase tracking-wider flex items-center gap-1">
                    <Zap className="w-3 h-3 text-amber-500" />
                    <span>{detail.label}</span>
                  </div>
                  <div className="text-sm font-semibold text-[var(--foreground)]">
                    {detail.value}
                  </div>
                </div>
              ))}
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-1.5 pt-2">
              {selectedProject.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="px-2 py-0.5 rounded text-[11px] font-mono border border-[var(--border)] bg-[var(--foreground)]/5 text-[var(--foreground)]"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Footer Action Links */}
            <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-[var(--border)]">
              {selectedProject.githubUrl && (
                <a
                  href={selectedProject.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-zinc-900 text-white hover:bg-zinc-800 text-xs font-mono font-medium transition-colors"
                >
                  <Github className="w-3.5 h-3.5" />
                  <span>View on GitHub</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              )}
              {selectedProject.demoUrl && (
                <a
                  href={selectedProject.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-md border border-[var(--border)] hover:bg-[var(--foreground)]/5 text-xs font-mono font-medium transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Live Demo</span>
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
