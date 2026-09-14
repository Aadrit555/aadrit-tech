"use client";

import { Award, Briefcase, GraduationCap, ArrowUpRight } from "lucide-react";
import SpotlightCard from "@/components/animations/SpotlightCard";
import ShinyBadge from "@/components/animations/ShinyBadge";

interface HistoryEntry {
  role: string;
  organization: string;
  description: string;
  period: string;
}

const historyEntries: HistoryEntry[] = [
  {
    role: "Associate",
    organization: "Next Tech Lab",
    description:
      "Trained and evaluated machine learning models in Python, tuning features and hyperparameters to improve classification performance. Cleaned and processed datasets to support ongoing ML experiments, cutting manual preprocessing effort by streamlining the pipeline. Identified and fixed bugs across live projects, improving pipeline reliability and delivering project milestones on schedule.",
    period: "2024 - Present",
  },
  {
    role: "B.Tech Computer Science",
    organization: "SRM University AP",
    description:
      "Undergraduate engineering coursework covering Data Structures & Algorithms, Object-Oriented Programming, Database Management Systems, and Machine Learning Fundamentals. Leading research on low-latency edge inference and low-level firmware defenses.",
    period: "2023 - 2027",
  },
  {
    role: "Systems & AI Developer",
    organization: "Open Source / Independent Builds",
    description:
      "Engineered and maintained open-source systems repositories including SLM (lightweight NLP intent model), Hemlock (firmware-level cryptographic validation in C), Chimera (adversarial AI simulation), and SuperRAG on GitHub.",
    period: "2024 - Present",
  },
];

export default function WorkHistory() {
  return (
    <section id="experience" className="py-20 md:py-28 border-b border-border-dim bg-background relative z-10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="mb-14 pb-6 border-b border-border-dim">
          <div className="text-xs font-mono text-accent-emerald tracking-wider uppercase mb-2">
            Work history
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white font-sans">
            Professional track record & research
          </h2>
        </div>

        {/* Tabular Work History matching Akash Umang's table layout */}
        <div className="border border-border-dim rounded-md bg-surface overflow-hidden shadow-xl mb-14">
          {/* Table Header */}
          <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-4 bg-surface-raised border-b border-border-dim text-xs font-mono text-text-muted uppercase tracking-wider font-semibold">
            <div className="col-span-3">Role & Organization</div>
            <div className="col-span-7">Description</div>
            <div className="col-span-2 text-right">Period</div>
          </div>

          {/* Table Rows */}
          <div className="divide-y divide-border-dim">
            {historyEntries.map((entry, idx) => (
              <div
                key={idx}
                className="grid grid-cols-1 md:grid-cols-12 gap-4 p-6 hover:bg-surface-raised/50 transition-colors"
              >
                <div className="md:col-span-3 space-y-1">
                  <div className="text-base font-bold text-white font-mono">
                    {entry.role}
                  </div>
                  <div className="text-xs font-mono text-accent-cyan">
                    {entry.organization}
                  </div>
                  <div className="text-xs font-mono text-text-muted md:hidden pt-1">
                    {entry.period}
                  </div>
                </div>

                <div className="md:col-span-7 text-xs sm:text-sm text-text-secondary leading-relaxed font-sans">
                  {entry.description}
                </div>

                <div className="md:col-span-2 hidden md:block text-right text-xs font-mono text-text-muted">
                  {entry.period}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Honors & Awards Section matching Akash Umang's credentials/certifications */}
        <div className="space-y-6">
          <h3 className="text-xl font-bold text-white font-sans">
            National Recognitions & Honors
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <SpotlightCard className="p-6">
              <div className="flex items-center justify-between mb-2">
                <div className="text-base font-bold text-white font-mono flex items-center gap-2">
                  <Award className="w-4 h-4 text-amber-400" />
                  <span>Manak Inspire Award</span>
                </div>
                <ShinyBadge dotColor="bg-amber-400" className="text-[10px]">
                  NATIONAL HONORS
                </ShinyBadge>
              </div>
              <div className="text-xs font-mono text-text-muted mb-2">
                National Department of Science & Technology
              </div>
              <p className="text-xs text-text-secondary leading-relaxed font-sans">
                Awarded for the Smart Garbage Management System engineering architecture and sensor telemetry design.
              </p>
            </SpotlightCard>

            <SpotlightCard className="p-6">
              <div className="flex items-center justify-between mb-2">
                <div className="text-base font-bold text-white font-mono flex items-center gap-2">
                  <Award className="w-4 h-4 text-accent-emerald" />
                  <span>FOSS United JUST A HACKATHON</span>
                </div>
                <ShinyBadge dotColor="bg-accent-emerald" className="text-[10px]">
                  WINNER
                </ShinyBadge>
              </div>
              <div className="text-xs font-mono text-text-muted mb-2">
                National Open Source Security Competition
              </div>
              <p className="text-xs text-text-secondary leading-relaxed font-sans">
                Recognized for Hemlock: firmware-level defenses in C protecting AI data pipelines from tampering and side-channel leakage.
              </p>
            </SpotlightCard>
          </div>
        </div>
      </div>
    </section>
  );
}
