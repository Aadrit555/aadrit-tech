"use client";

import { ArrowUpRight, GitBranch, Shield, Cpu, Database, Terminal, Code2 } from "lucide-react";
import SpotlightCard from "@/components/animations/SpotlightCard";
import ShinyBadge from "@/components/animations/ShinyBadge";

interface CaseStudy {
  id: string;
  tags: string[];
  title: string;
  subtitle: string;
  description: string;
  bullets: string[];
  metrics: { label: string; value: string }[];
  githubUrl?: string;
  awardBadge?: string;
}

const caseStudies: CaseStudy[] = [
  {
    id: "slm",
    tags: ["NATURAL LANGUAGE PROCESSING", "SUPERVISED LEARNING", "EDGE AI"],
    title: "SLM (Intent Classification System)",
    subtitle: "Lightweight NLP Intent Classification Engine",
    description:
      "Engineering a lightweight NLP intent-classification model in Python using supervised learning, tuned for high accuracy on real query data and optimized for low-latency inference on resource-constrained devices.",
    bullets: [
      "Built a lightweight NLP intent-classification model in Python using supervised learning, tuned for high accuracy on real query data.",
      "Cut inference latency through model optimization, enabling deployment on edge and resource-constrained devices.",
      "Designed the data preprocessing, training, and evaluation pipeline used to validate model performance.",
    ],
    metrics: [
      { value: "12ms", label: "Edge Inference Latency" },
      { value: "94%+", label: "Accuracy on Real Query Sets" },
      { value: "100%", label: "End-to-End Pipeline in Python" },
    ],
    githubUrl: "https://github.com/Aadrit555/DIDsomethin_SLM",
  },
  {
    id: "hemlock",
    tags: ["FIRMWARE SECURITY", "CRYPTOGRAPHY", "SYSTEMS DEFENSE"],
    title: "Hemlock (Firmware AI Data Protection)",
    subtitle: "Low-Level Cryptographic Defense for AI Pipelines",
    awardBadge: "FOSS United JUST A HACKATHON Recognized",
    description:
      "Low-level firmware defense suite built in C to protect edge AI pipelines from data tampering and side-channel hardware attacks, featuring cryptographic validation and constant-time execution guards.",
    bullets: [
      "Built firmware-level defenses in C to protect AI data pipelines from tampering and side-channel attacks.",
      "Implemented cryptographic validation checks that closed key vulnerabilities in the data path.",
      "Engineered hardware timing checks and memory boundary guards to eliminate side-channel leakage.",
    ],
    metrics: [
      { value: "Winner", label: "FOSS United Hackathon Recognized" },
      { value: "C Lang", label: "Bare-Metal Firmware Defense" },
      { value: "Zero-Leak", label: "Constant-Time Crypto Checks" },
    ],
    githubUrl: "https://github.com/Aadrit555/HemlockV2",
  },
  {
    id: "chimera",
    tags: ["ADVERSARIAL AI", "MULTI-AGENT SYSTEMS", "REINFORCEMENT LEARNING"],
    title: "Chimera (Adversarial AI Simulation)",
    subtitle: "Autonomous Attacker & Defender Experiment Harness",
    description:
      "Designed an adversarial AI simulation with attacker and defender agents, using continuous learning to raise defender win-rate over successive training rounds. Built core simulation logic and experiment harness in Python.",
    bullets: [
      "Designed an adversarial AI simulation with attacker and defender agents, using continuous learning to raise defender win-rate over successive training rounds.",
      "Built the core simulation logic and experiment harness in Python to test and iterate on agent strategies.",
      "Analyzed game-theoretic equilibria under asymmetric information and constrained actions.",
    ],
    metrics: [
      { value: "Multi-Agent", label: "Attacker vs Defender Loop" },
      { value: "Continuous", label: "Adaptive Policy Convergence" },
      { value: "Python", label: "Custom Experiment Harness" },
    ],
  },
  {
    id: "superrag",
    tags: ["INFORMATION RETRIEVAL", "VECTOR SEARCH", "FASTAPI"],
    title: "SuperRAG (Multi-Source Retrieval Pipeline)",
    subtitle: "Heterogeneous Document Search & Dense Vector Indexing",
    description:
      "Multi-source document retrieval and search pipeline engineered for dense vector ranking and fast contextual retrieval across disparate document sets.",
    bullets: [
      "Engineered multi-source query parser supporting heterogeneous document formats and structured schema mapping.",
      "Integrated semantic indexing with hybrid sparse/dense retrieval for high recall on specialized technical texts.",
      "Designed clean API contracts for low-overhead client integration.",
    ],
    metrics: [
      { value: "Hybrid", label: "Dense & Sparse Vector Search" },
      { value: "Multi-Doc", label: "PDF, Markdown, HTML & JSON" },
      { value: "FastAPI", label: "Async High-Throughput Service" },
    ],
    githubUrl: "https://github.com/Aadrit555/SuperRAG",
  },
];

export default function SelectedWork() {
  return (
    <section id="work" className="py-20 md:py-28 border-b border-border-dim bg-background relative z-10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Section Header mirroring Akash Umang's case study header */}
        <div className="mb-14 pb-6 border-b border-border-dim">
          <div className="text-xs font-mono text-accent-emerald tracking-wider uppercase mb-2">
            Selected work
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white font-sans">
            Proven engineering, testable systems
          </h2>
          <p className="text-sm text-text-secondary mt-2 max-w-xl font-sans">
            Deep-dive into production-tested machine learning pipelines, low-level firmware defenses, and autonomous agent simulations.
          </p>
        </div>

        {/* Vertical Case Study Presentation Cards */}
        <div className="space-y-12">
          {caseStudies.map((study) => (
            <SpotlightCard key={study.id} className="p-8 sm:p-10 border border-border-dim bg-surface/80">
              <div className="space-y-6">
                {/* Tags and Award Badge */}
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex flex-wrap items-center gap-2">
                    {study.tags.map((tag, idx) => (
                      <span key={idx} className="code-badge">
                        {tag}
                      </span>
                    ))}
                  </div>

                  {study.awardBadge && (
                    <ShinyBadge dotColor="bg-amber-400" className="text-[10px]">
                      {study.awardBadge}
                    </ShinyBadge>
                  )}
                </div>

                {/* Case Study Title & Subtitle */}
                <div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-white font-sans mb-1 flex items-center justify-between">
                    <span>{study.title}</span>
                    {study.githubUrl && (
                      <a
                        href={study.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-text-muted hover:text-white transition-colors"
                        title="View GitHub Repository"
                      >
                        <ArrowUpRight className="w-5 h-5" />
                      </a>
                    )}
                  </h3>
                  <div className="text-sm sm:text-base font-mono text-accent-cyan">
                    {study.subtitle}
                  </div>
                </div>

                {/* Narrative Summary */}
                <p className="text-sm sm:text-base text-text-secondary leading-relaxed font-sans">
                  {study.description}
                </p>

                {/* Bullet Highlights */}
                <ul className="space-y-2 text-xs sm:text-sm text-text-muted font-sans list-disc list-inside">
                  {study.bullets.map((bullet, idx) => (
                    <li key={idx} className="leading-relaxed">
                      <span className="text-text-secondary">{bullet}</span>
                    </li>
                  ))}
                </ul>

                {/* Metrics / Technical Impact Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-border-dim">
                  {study.metrics.map((metric, idx) => (
                    <div key={idx} className="p-4 rounded bg-surface-raised border border-border-dim space-y-1">
                      <div className="text-xl sm:text-2xl font-bold text-white font-mono">
                        {metric.value}
                      </div>
                      <div className="text-xs font-mono text-text-muted">
                        {metric.label}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Direct Action Link */}
                {study.githubUrl && (
                  <div className="pt-2">
                    <a
                      href={study.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-secondary inline-flex items-center gap-2"
                    >
                      <GitBranch className="w-3.5 h-3.5" />
                      <span>Explore Source Code on GitHub</span>
                    </a>
                  </div>
                )}
              </div>
            </SpotlightCard>
          ))}
        </div>
      </div>
    </section>
  );
}
