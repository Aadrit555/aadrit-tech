"use client";

import { ArrowUpRight, GitBranch, Zap } from "lucide-react";
import SpotlightCard from "@/components/animations/SpotlightCard";
import ShinyBadge from "@/components/animations/ShinyBadge";
import ScrollReveal from "@/components/animations/ScrollReveal";

interface CaseStudy {
  id: string;
  tmNumber: string;
  category: string;
  title: string;
  description: string;
  bullets: string[];
  tags: string[];
  metrics: { label: string; value: string }[];
  githubUrl?: string;
  awardBadge?: string;
}

const caseStudies: CaseStudy[] = [
  {
    id: "slm",
    tmNumber: "TM-01",
    category: "Machine Learning & PyTorch",
    title: "SLM (Character-Level Intent Model)",
    description:
      "A lightweight character-level intent model built from scratch in Python, using self-attention and REINFORCE to map text inputs to discrete actions.",
    bullets: [
      "Built a character-level tokenizer and attention-based policy network in PyTorch.",
      "Trained the model using REINFORCE with reward-based intent selection.",
      "Designed the project to run locally on CPU without pretrained language-model weights.",
    ],
    tags: ["PYTHON", "PYTORCH", "REINFORCE", "ATTENTION", "CPU INFERENCE"],
    metrics: [
      { value: "CPU", label: "Local Inference" },
      { value: "REINFORCE", label: "Policy Gradient" },
      { value: "PyTorch", label: "From-Scratch Arch" },
    ],
    githubUrl: "https://github.com/Aadrit555/DIDsomethin_SLM",
  },
  {
    id: "hemlock",
    tmNumber: "TM-02",
    category: "C Systems & Cryptography",
    title: "Hemlock (Adversarial Image Defense & Provenance)",
    awardBadge: "FOSS United JUST A HACKATHON Winner · 2024",
    description:
      "A C-based image protection and verification system combining perceptual hashing, RSA signatures, and adversarial pixel perturbation to detect modification and establish file provenance.",
    bullets: [
      "Wrote core C modules for perceptual hashing and RSA signature verification.",
      "Applied subtle adversarial pixel perturbations to defend visual assets against automated alteration.",
      "Recognized as a winning project at FOSS United JUST A HACKATHON 2024.",
    ],
    tags: ["C LANGUAGE", "CRYPTOGRAPHY", "IMAGE PROVENANCE", "PERCEPTUAL HASH", "FOSS UNITED"],
    metrics: [
      { value: "Winner", label: "FOSS United Hackathon" },
      { value: "C Lang", label: "Core Algorithms" },
      { value: "RSA + pHash", label: "Tamper Detection" },
    ],
    githubUrl: "https://github.com/Aadrit555/Hemlock",
  },
  {
    id: "chimera",
    tmNumber: "TM-03",
    category: "AI Simulation & Python",
    title: "Chimera (Multi-Agent Simulation)",
    description:
      "A Python simulation where attacker and defender AI agents compete against each other in rounds, learning and improving their tactics over time.",
    bullets: [
      "Built a turn-based simulation environment in Python to test competing agent behaviors.",
      "Implemented learning loops so defender agents adapt and raise their win rate over time.",
      "Built experiment scripts for repeatable simulation runs and result logging.",
    ],
    tags: ["PYTHON", "MULTI-AGENT", "SIMULATION", "EXPERIMENTS"],
    metrics: [
      { value: "Adaptive", label: "Attacker vs Defender" },
      { value: "Python", label: "Simulation Engine" },
      { value: "Iterative", label: "Round-by-Round Learning" },
    ],
  },
  {
    id: "superrag",
    tmNumber: "TM-04",
    category: "Search Systems & FastAPI",
    title: "SuperRAG (Modular Multi-Phase RAG Pipeline)",
    description:
      "A modular multi-phase RAG system combining semantic retrieval, knowledge graphs, multimodal inputs, reranking, and structured answer synthesis.",
    bullets: [
      "Built with FastAPI and Python to process multi-format inputs across PDFs, text, and structured data.",
      "Integrated semantic vector search with knowledge-graph entity linking and cross-encoder reranking.",
      "Designed modular pipeline stages for document parsing, visual retrieval, and structured response generation.",
    ],
    tags: ["FASTAPI", "VECTOR SEARCH", "KNOWLEDGE GRAPH", "RAG PIPELINE"],
    metrics: [
      { value: "Multi-Phase", label: "Vector + Graph + Rerank" },
      { value: "Multi-Doc", label: "PDF, Text & Markdown" },
      { value: "FastAPI", label: "Async API Service" },
    ],
    githubUrl: "https://github.com/Aadrit555/SuperRAG",
  },
];

export default function SelectedWork() {
  return (
    <section id="work" className="py-12 md:py-20 bg-transparent relative z-10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Section Header with Pokédex TM Styling */}
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

        {/* Vertical Case Study Presentation Cards */}
        <div className="space-y-10">
          {caseStudies.map((study) => (
            <ScrollReveal key={study.id}>
              <SpotlightCard className="p-6 sm:p-10 border border-white/70 bg-white/85 backdrop-blur-md shadow-md">
                <div className="space-y-6">
                  {/* Category & TM Badge & Tags & Award */}
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded bg-zinc-900 text-emerald-400 font-mono text-xs font-bold border border-zinc-950">
                        {study.tmNumber}
                      </span>
                      <span className="text-xs font-mono text-[#dc2626] tracking-wider uppercase font-bold">
                        {study.category}
                      </span>
                      {study.awardBadge && (
                        <ShinyBadge dotColor="bg-amber-500" className="text-[10px]">
                          {study.awardBadge}
                        </ShinyBadge>
                      )}
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                      {study.tags.map((tag, idx) => (
                        <span key={idx} className="code-badge text-[10px]">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Case Study Title */}
                  <div>
                    <h3 className="text-2xl sm:text-3xl font-medium text-zinc-950 font-sans mb-3 flex items-center justify-between">
                      <span>{study.title}</span>
                      {study.githubUrl && (
                        <a
                          href={study.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-zinc-400 hover:text-zinc-950 transition-colors"
                          title="View GitHub Repository"
                        >
                          <ArrowUpRight className="w-5 h-5" />
                        </a>
                      )}
                    </h3>
                    <p className="text-sm sm:text-base text-zinc-600 leading-relaxed font-sans max-w-3xl">
                      {study.description}
                    </p>
                  </div>

                  {/* Bullet Highlights from Resume */}
                  <ul className="space-y-2 text-xs sm:text-sm text-zinc-600 font-sans list-disc list-inside">
                    {study.bullets.map((bullet, idx) => (
                      <li key={idx} className="leading-relaxed">
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Metrics / Technical Impact Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-border-dim">
                    {study.metrics.map((metric, idx) => (
                      <div key={idx} className="p-4 rounded bg-white/60 border border-white/80 space-y-1 shadow-xs">
                        <div className="text-2xl sm:text-3xl font-normal text-zinc-950 font-sans">
                          {metric.value}
                        </div>
                        <div className="text-xs font-mono text-zinc-500 flex items-center gap-1">
                          <Zap className="w-3 h-3 text-amber-500" />
                          <span>{metric.label}</span>
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
                        className="pokedex-btn-action bg-white text-zinc-900 hover:bg-zinc-100 border border-zinc-300 inline-flex items-center gap-2"
                      >
                        <GitBranch className="w-3.5 h-3.5 text-zinc-700" />
                        <span>Explore Source Code on GitHub</span>
                      </a>
                    </div>
                  )}
                </div>
              </SpotlightCard>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
