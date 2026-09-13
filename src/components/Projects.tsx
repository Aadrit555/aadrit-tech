import { ExternalLink, GitBranch, Cpu, Shield, Database, Terminal, ArrowUpRight } from "lucide-react";

interface Project {
  title: string;
  category: string;
  status: string;
  githubUrl?: string;
  description: string;
  bullets: string[];
  stack: string[];
  award?: string;
}

const projects: Project[] = [
  {
    title: "SLM (Intent Classification System)",
    category: "Natural Language Processing / Edge AI",
    status: "PRODUCTION_READY",
    githubUrl: "https://github.com/Aadrit555/DIDsomethin_SLM",
    description:
      "Lightweight NLP intent-classification model in Python using supervised learning, engineered for low-latency inference on edge and resource-constrained devices.",
    bullets: [
      "Built lightweight intent-classification model in Python using supervised learning, tuned for high accuracy on real query data.",
      "Cut inference latency through model optimization, enabling deployment on edge and resource-constrained devices.",
      "Designed the data preprocessing, training, and evaluation pipeline used to validate model performance.",
    ],
    stack: ["Python", "NLP", "Supervised Learning", "Model Optimization", "Data Pipelines"],
  },
  {
    title: "Hemlock (Firmware AI Data Protection)",
    category: "Systems / Firmware Security",
    status: "AWARD_RECOGNIZED",
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
  },
  {
    title: "Chimera (Adversarial AI Simulation)",
    category: "Autonomous Agents / Game Theory",
    status: "RESEARCH_FRAMEWORK",
    description:
      "Adversarial AI simulation with attacker and defender agents, using continuous learning loops to raise defender win-rate over successive training rounds.",
    bullets: [
      "Designed an adversarial AI simulation with attacker and defender agents, using continuous learning to raise defender win-rate over successive training rounds.",
      "Built core simulation logic and experiment harness in Python to test and iterate on agent strategies.",
      "Analyzed game-theoretic equilibria under asymmetric information and constrained actions.",
    ],
    stack: ["Python", "Adversarial AI", "Multi-Agent Systems", "Simulation Logic", "NumPy"],
  },
  {
    title: "SuperRAG (Multi-Source Retrieval Pipeline)",
    category: "Information Retrieval / Search",
    status: "ACTIVE_PROJECT",
    githubUrl: "https://github.com/Aadrit555/SuperRAG",
    description:
      "Multi-source document retrieval and search pipeline engineered for dense vector ranking and fast contextual retrieval across disparate document sets.",
    bullets: [
      "Engineered multi-source query parser supporting heterogeneous document formats and structured schema mapping.",
      "Integrated semantic indexing with hybrid sparse/dense retrieval for high recall on specialized technical texts.",
      "Designed clean API contracts for low-overhead client integration.",
    ],
    stack: ["Python", "RAG", "Vector Search", "Information Retrieval", "FastAPI"],
  },
  {
    title: "HemlockV2 (Memory & Cache Benchmarking)",
    category: "Low-Level Systems Architecture",
    status: "BENCHMARK_TOOL",
    githubUrl: "https://github.com/Aadrit555/HemlockV2",
    description:
      "Systems profiling utility benchmarking memory bus bandwidth, CPU cache hierarchies (L1/L2/L3), and cache eviction behaviors under heavy load.",
    bullets: [
      "Benchmarks memory speed, latency curves, and CPU cache behavior under sequential and random access patterns.",
      "Investigates memory layout alignment and cache line collisions on modern x86/ARM microarchitectures.",
    ],
    stack: ["C", "Systems Programming", "Memory Architecture", "Performance Benchmarking"],
  },
  {
    title: "primordial-void (Policy Dynamics Harness)",
    category: "Reinforcement Learning",
    status: "EXPERIMENT_LAB",
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
  return (
    <section id="projects" className="py-16 md:py-24 border-b border-border-dim bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-4 border-b border-border-dim gap-4">
          <div>
            <div className="text-xs font-mono text-accent-emerald tracking-wider uppercase mb-1">
              [01. SYSTEM_IMPLEMENTATIONS]
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white font-sans">
              Featured Engineering Projects
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-text-secondary font-mono max-w-md">
            Working code repositories, low-level cryptographic systems, and trained machine learning pipelines.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, idx) => (
            <div
              key={idx}
              className="tech-card p-6 flex flex-col justify-between bg-surface/70 hover:bg-surface border border-border-dim hover:border-border-bright transition-all"
            >
              <div>
                {/* Header line with category & status */}
                <div className="flex items-center justify-between gap-2 mb-3 text-[11px] font-mono">
                  <span className="text-text-muted">{project.category}</span>
                  {project.award ? (
                    <span className="px-2 py-0.5 rounded bg-amber-950/40 text-amber-300 border border-amber-800/60 font-semibold text-[10px]">
                      HACKATHON WINNER
                    </span>
                  ) : (
                    <span className="text-text-muted text-[10px]">[{project.status}]</span>
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
                  <div className="mb-3 px-2 py-1 rounded bg-surface-raised border border-border-dim text-[11px] font-mono text-text-secondary">
                    Award: {project.award}
                  </div>
                )}

                {/* Core Description */}
                <p className="text-xs text-text-secondary mb-4 leading-relaxed">
                  {project.description}
                </p>

                {/* Bullet Points from Resume */}
                <ul className="space-y-1.5 mb-6 text-xs text-text-muted font-sans list-disc list-inside">
                  {project.bullets.map((bullet, bIdx) => (
                    <li key={bIdx} className="leading-snug">
                      <span className="text-text-secondary">{bullet}</span>
                    </li>
                  ))}
                </ul>
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
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

