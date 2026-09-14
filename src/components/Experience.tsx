"use client";

import { Award, Briefcase, GraduationCap } from "lucide-react";
import SpotlightCard from "@/components/animations/SpotlightCard";
import ShinyBadge from "@/components/animations/ShinyBadge";

export default function Experience() {
  return (
    <section id="experience" className="py-16 md:py-24 border-b border-border-dim bg-tech-grid relative z-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Experience */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <div className="text-xs font-mono text-accent-emerald tracking-wider uppercase mb-1">
                ENGINEERING EXPERIENCE
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white font-sans">
                Professional Background
              </h2>
            </div>

            {/* Next Tech Lab Role inside SpotlightCard */}
            <SpotlightCard className="p-6 border-l-4 border-l-accent-emerald">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
                <h3 className="text-lg font-bold text-white font-mono flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-accent-emerald" />
                  <span>Next Tech Lab</span>
                </h3>
                <span className="text-xs font-mono text-text-muted">Associate</span>
              </div>

              <div className="text-xs font-mono text-text-secondary mb-4">
                Domain: Machine Learning & Research Systems
              </div>

              <ul className="space-y-2.5 text-xs text-text-secondary leading-relaxed">
                <li className="flex items-start gap-2.5">
                  <span className="text-accent-emerald font-mono mt-0.5">&gt;</span>
                  <span>
                    Trained and evaluated machine learning models in Python, tuning features and hyperparameters to improve classification performance.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-accent-emerald font-mono mt-0.5">&gt;</span>
                  <span>
                    Cleaned and processed datasets to support ongoing ML experiments, cutting manual preprocessing effort by streamlining the pipeline.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-accent-emerald font-mono mt-0.5">&gt;</span>
                  <span>
                    Identified and fixed bugs across live projects, improving pipeline reliability and reducing repeat failures.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-accent-emerald font-mono mt-0.5">&gt;</span>
                  <span>
                    Worked alongside a cross-functional team of engineers and researchers to deliver project milestones on schedule.
                  </span>
                </li>
              </ul>
            </SpotlightCard>
          </div>

          {/* Right Column: Education & National Awards */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <div className="text-xs font-mono text-accent-cyan tracking-wider uppercase mb-1">
                ACADEMICS & RECOGNITION
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white font-sans">
                Education & Honors
              </h2>
            </div>

            {/* Education Card */}
            <SpotlightCard className="p-6">
              <div className="flex items-center gap-2 mb-2">
                <GraduationCap className="w-4 h-4 text-accent-cyan" />
                <h3 className="text-base font-bold text-white font-mono">
                  SRM University AP
                </h3>
              </div>

              <p className="text-xs font-mono text-text-secondary mb-3">
                Bachelor of Technology in Computer Science & Engineering
              </p>

              <div className="pt-3 border-t border-border-dim">
                <span className="text-[11px] font-mono text-text-muted block mb-2">
                  Relevant Coursework:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {[
                    "Data Structures & Algorithms",
                    "Object-Oriented Programming",
                    "Database Management Systems",
                    "Machine Learning Fundamentals",
                  ].map((course, idx) => (
                    <span key={idx} className="code-badge">
                      {course}
                    </span>
                  ))}
                </div>
              </div>
            </SpotlightCard>

            {/* Awards & Achievements Card */}
            <SpotlightCard className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-amber-400" />
                  <h3 className="text-base font-bold text-white font-mono">
                    Honors & Achievements
                  </h3>
                </div>
              </div>

              <div className="space-y-4 pt-2 border-t border-border-dim">
                {/* Manak Inspire Award */}
                <div className="space-y-1">
                  <div className="text-xs font-semibold text-text-primary font-mono flex items-center justify-between">
                    <span>Manak Inspire Award</span>
                    <ShinyBadge dotColor="bg-amber-400" className="px-1.5 py-0 text-[9px]">
                      NATIONAL HONORS
                    </ShinyBadge>
                  </div>
                  <div className="text-[11px] font-mono text-text-muted">
                    National Department of Science & Technology
                  </div>
                  <p className="text-xs text-text-secondary leading-normal">
                    Awarded for the Smart Garbage Management System engineering architecture.
                  </p>
                </div>

                {/* FOSS United Hackathon */}
                <div className="space-y-1 pt-3 border-t border-border-dim">
                  <div className="text-xs font-semibold text-text-primary font-mono flex items-center justify-between">
                    <span>FOSS United JUST A HACKATHON</span>
                    <ShinyBadge dotColor="bg-accent-emerald" className="px-1.5 py-0 text-[9px]">
                      RECOGNIZED
                    </ShinyBadge>
                  </div>
                  <div className="text-[11px] font-mono text-text-muted">
                    National Open Source Security Competition
                  </div>
                  <p className="text-xs text-text-secondary leading-normal">
                    Recognized for Hemlock: firmware-level defenses protecting AI pipelines from tampering.
                  </p>
                </div>
              </div>
            </SpotlightCard>
          </div>
        </div>
      </div>
    </section>
  );
}
