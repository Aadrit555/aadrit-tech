"use client";

import { useState } from "react";
import { GitBranch, ArrowUpRight, Cpu, Shield, Layers, ChevronDown, ChevronUp, Code2 } from "lucide-react";
import SpotlightCard from "@/components/animations/SpotlightCard";
import ShinyBadge from "@/components/animations/ShinyBadge";

interface Project {
  id: string;
  title: string;
  category: "all" | "systems" | "ml" | "rag";
  categoryLabel: string;
  badge?: string;
  githubUrl?: string;
  description: string;
  bullets: string[];
  stack: string[];
  award?: string;
  architectureDiagram?: string[];
}

const projects: Project[] = [
  {
    id: "slm",
    title: "SLM (Intent Classification System)",
    category: "ml",
    categoryLabel: "Natural Language Processing / Edge AI",
    githubUrl: "https://github.com/Aadrit555/DIDsomethin_SLM",
    description:
      "Lightweight NLP intent-classification model in Python using supervised learning, engineered for low-latency inference on edge and resource-constrained devices.",
    bullets: [
      "Built lightweight intent-classification model in Python using supervised learning, tuned for high accuracy on real query data.",
      "Cut inference latency through model optimization, enabling deployment on edge and resource-constrained devices.",
      "Designed the data preprocessing, training, and evaluation pipeline used to validate model performance.",
    ],
    stack: ["Python", "NLP", "Supervised Learning", "Model Optimization", "Data Pipelines"],
    architectureDiagram: [
      "[Raw Query Stream] ──> [Token Normalizer & Clean Pipeline]",
      "                           │",
      "                           ▼",
      "                   [Feature Extraction]",
      "                           │",
      "                           ▼",
      "     [Supervised Classifier (Tuned Hyperparameters)]",
      "                           │",
      "                           ▼",
      "    [Edge Quantization Engine] ──> [Low-Latency Intent Output]",
    ],
  },
  {
    id: "hemlock",
    title: "Hemlock (Firmware AI Data Protection)",
    category: "systems",
    categoryLabel: "Systems / Firmware Security",
    award: "FOSS United JUST A HACKATHON Recognized",
    githubUrl: "https://github.com/Aadrit555/HemlockV2",
    description:
      "Low-level firmware defense suite built in C to protect edge AI pipelines from data tampering and side-channel hardware attacks.",
    bullets: [
      "Built firmware-level defenses in C to protect AI data pipelines from tampering and side-channel attacks.",
      "Implemented cryptographic validation checks that closed critical vulnerabilities in the data path.",
      "Engineered hardware timing checks and memory boundary guards to eliminate side-channel leakage.",
    ],
    stack: ["C", "Firmware Security", "Cryptography", "Side-Channel Defense", "Hardware"],
    architectureDiagram: [
      "[Sensory Input Stream] ──> [Hardware Memory Boundary Guard]",
      "                                   │",
      "                                   ▼",
      "                   [Cryptographic Checksum Validator]",
      "                                   │",
      "                                   ▼",
      "                [Constant-Time Instruction Balancer]",
      "                                   │",
      "                                   ▼",
      "            [Protected Edge Buffer] ──> [AI Inference Core]",
    ],
  },
  {
    id: "chimera",
    title: "Chimera (Adversarial AI Simulation)",
    category: "ml",
    categoryLabel: "Autonomous Agents / Game Theory",
    description:
      "Adversarial AI simulation with attacker and defender agents, using continuous learning loops to raise defender win-rate over successive training rounds.",
    bullets: [
      "Designed an adversarial AI simulation with attacker and defender agents, using continuous learning to raise defender win-rate over successive training rounds.",
      "Built core simulation logic and experiment harness in Python to test and iterate on agent strategies.",
      "Analyzed game-theoretic equilibria under asymmetric information and constrained actions.",
    ],
    stack: ["Python", "Adversarial AI", "Multi-Agent Systems", "Simulation Logic", "NumPy"],
    architectureDiagram: [
      "┌─────────────────────────────────────────────────────────────┐",
      "│              Continuous Experiment Harness                  │",
      "│                                                             │",
      "│  [Attacker Agent Policy] <─── Reward Surface ───> [State]   │",
      "│             │                                       │       │",
      "│             ▼                                       ▼       │",
      "│    [Perturbation Probe]                     [Defender Agent]│",
      "│             │                                       │       │",
      "│             └─────> [Win-Rate Convergence Loop] <───┘       │",
      "└─────────────────────────────────────────────────────────────┘",
    ],
  },
  {
    id: "superrag",
    title: "SuperRAG (Multi-Source Retrieval Pipeline)",
    category: "rag",
    categoryLabel: "Information Retrieval / Search",
    githubUrl: "https://github.com/Aadrit555/SuperRAG",
    description:
      "Multi-source document retrieval and search pipeline engineered for dense vector ranking and fast contextual retrieval across disparate document sets.",
    bullets: [
      "Engineered multi-source query parser supporting heterogeneous document formats and structured schema mapping.",
      "Integrated semantic indexing with hybrid sparse/dense retrieval for high recall on specialized technical texts.",
      "Designed clean API contracts for low-overhead client integration.",
    ],
    stack: ["Python", "RAG", "Vector Search", "Information Retrieval", "FastAPI"],
    architectureDiagram: [
      "[Heterogeneous Documents] ──> [Chunking & Canonical Schema]",
      "                                        │",
      "                                        ▼",
      "                      [Embedding Engine / Vector Index]",
      "                                        │",
      "                                        ▼",
      "    [User Query] ──> [Hybrid Sparse / Dense Matcher]",
      "                                        │",
      "                                        ▼",
      "                          [Ranked Contextual Output]",
    ],
  },
  {
    id: "hemlockv2",
    title: "HemlockV2 (Memory & Cache Benchmarking)",
    category: "systems",
    categoryLabel: "Low-Level Systems Architecture",
    githubUrl: "https://github.com/Aadrit555/HemlockV2",
    description:
      "Systems profiling utility benchmarking memory bus bandwidth, CPU cache hierarchies (L1/L2/L3), and cache eviction behaviors under heavy load.",
    bullets: [
      "Benchmarks memory speed, latency curves, and CPU cache behavior under sequential and random access patterns.",
      "Investigates memory layout alignment and cache line collisions on modern x86/ARM microarchitectures.",
    ],
    stack: ["C", "Systems Programming", "Memory Architecture", "Performance Benchmarking"],
    architectureDiagram: [
      "[Instruction Stream] ──> [Cache Line Layout (64-byte blocks)]",
      "                                     │",
      "                                     ▼",
      "               [Sequential vs Stride Latency Probes]",
      "                                     │",
      "                                     ▼",
      "               [L1 / L2 / L3 Eviction Boundary Profiler]",
    ],
  },
  {
    id: "primordial",
    title: "primordial-void (Policy Dynamics Harness)",
    category: "ml",
    categoryLabel: "Reinforcement Learning",
    githubUrl: "https://github.com/Aadrit555/primordial-void",
    description:
      "Experimental reinforcement learning testbed designed to observe policy exploration behaviors and entropy dynamics in synthetic state-spaces.",
    bullets: [
      "Implemented state-action value exploration algorithms with custom reward surfaces.",
      "Visualized policy divergence and convergence stability over high-iteration epochs.",
    ],
    stack: ["Python", "Reinforcement Learning", "Policy Optimization", "Math Modeling"],
  },
];

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState<"all" | "systems" | "ml" | "rag">("all");
  const [expandedArchitectures, setExpandedArchitectures] = useState<Record<string, boolean>>({});

  const toggleArchitecture = (id: string) => {
    setExpandedArchitectures((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const filteredProjects =
    activeFilter === "all"
      ? projects
      : projects.filter((p) => p.category === activeFilter);

  const filters = [
    { key: "all", label: "All Projects" },
    { key: "systems", label: "Low-Level Systems" },
    { key: "ml", label: "Machine Learning" },
    { key: "rag", label: "RAG & Retrieval" },
  ] as const;

  return (
    <section id="projects" className="py-16 md:py-24 border-b border-border-dim bg-background relative z-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header without numberings */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b border-border-dim gap-4">
          <div>
            <div className="text-xs font-mono text-accent-emerald tracking-wider uppercase mb-1">
              SYSTEM IMPLEMENTATIONS
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white font-sans">
              Featured Engineering Projects
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-text-secondary font-mono max-w-md">
            Working code repositories, low-level cryptographic defenses, and trained machine learning pipelines.
          </p>
        </div>

        {/* Animated Filter Tabs */}
        <div className="flex flex-wrap items-center gap-2 mb-8">
          {filters.map((tab) => {
            const isActive = activeFilter === tab.key;
            return (
              <button
                key={tab.key}
                onClick={() => setActiveFilter(tab.key)}
                className={`px-3.5 py-1.5 rounded-md text-xs font-mono transition-all cursor-pointer border ${isActive
                    ? "bg-surface-raised text-white border-border-bright shadow-sm"
                    : "bg-surface/50 text-text-muted hover:text-text-primary border-border-dim hover:border-border-bright"
                  }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Projects Grid with Cursor Spotlight */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <SpotlightCard
              key={project.id}
              className="p-6 flex flex-col justify-between"
            >
              <div>
                {/* Header line with category & status */}
                <div className="flex items-center justify-between gap-2 mb-3 text-[11px] font-mono">
                  <span className="text-text-muted">{project.categoryLabel}</span>
                  {project.award ? (
                    <ShinyBadge dotColor="bg-amber-400" className="px-2 py-0.5 text-[10px]">
                      HACKATHON WINNER
                    </ShinyBadge>
                  ) : (
                    <span className="text-accent-emerald text-[10px] font-mono">ACTIVE_BUILD</span>
                  )}
                </div>

                {/* Project Title */}
                <h3 className="text-base font-bold text-white mb-2 font-mono flex items-center justify-between">
                  <span>{project.title}</span>
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-text-muted hover:text-white transition-colors"
                      title="View GitHub Repository"
                    >
                      <ArrowUpRight className="w-4 h-4" />
                    </a>
                  )}
                </h3>

                {/* Award Banner if present */}
                {project.award && (
                  <div className="mb-3 px-2 py-1 rounded bg-surface-raised border border-border-dim text-[11px] font-mono text-amber-300/90">
                    Award: {project.award}
                  </div>
                )}

                {/* Core Description */}
                <p className="text-xs text-text-secondary mb-4 leading-relaxed">
                  {project.description}
                </p>

                {/* Bullet Points from Resume */}
                <ul className="space-y-1.5 mb-4 text-xs text-text-muted font-sans list-disc list-inside">
                  {project.bullets.map((bullet, bIdx) => (
                    <li key={bIdx} className="leading-snug">
                      <span className="text-text-secondary">{bullet}</span>
                    </li>
                  ))}
                </ul>

                {/* Expandable Architecture Flow */}
                {project.architectureDiagram && (
                  <div className="mb-4">
                    <button
                      onClick={() => toggleArchitecture(project.id)}
                      className="inline-flex items-center gap-1.5 text-[11px] font-mono text-accent-cyan hover:text-white transition-colors"
                    >
                      <Code2 className="w-3 h-3" />
                      <span>
                        {expandedArchitectures[project.id]
                          ? "Hide Architecture Data Flow"
                          : "Inspect Architecture Data Flow"}
                      </span>
                      {expandedArchitectures[project.id] ? (
                        <ChevronUp className="w-3 h-3" />
                      ) : (
                        <ChevronDown className="w-3 h-3" />
                      )}
                    </button>

                    {expandedArchitectures[project.id] && (
                      <div className="mt-2.5 p-3 rounded bg-[#06080e] border border-border-dim font-mono text-[10px] text-text-secondary overflow-x-auto whitespace-pre leading-relaxed animate-in fade-in duration-200">
                        {project.architectureDiagram.join("\n")}
                      </div>
                    )}
                  </div>
                )}
              </div>

              <div>
                {/* Tech Stack Tags */}
                <div className="flex flex-wrap gap-1.5 pt-4 border-t border-border-dim">
                  {project.stack.map((tag, tIdx) => (
                    <span key={tIdx} className="code-badge">
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Repository Link Button */}
                {project.githubUrl && (
                  <div className="mt-4 pt-2">
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-secondary w-full flex items-center justify-center gap-2 text-xs"
                    >
                      <GitBranch className="w-3.5 h-3.5" />
                      <span>View Source on GitHub</span>
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
