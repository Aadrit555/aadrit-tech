import Link from "next/link";
import { ArrowLeft, CheckCircle2, Bot, Layers, Sparkles } from "lucide-react";

export const metadata = {
  title: "Case Study: Devnagri AI Conversational Agents | Aadrit",
  description:
    "Multilingual Conversational AI Agents - Created SaaS Management Dashboard for Devnagri AI.",
};

export default function DevnagriCaseStudyPage() {
  return (
    <article className="py-16 md:py-24 bg-background min-h-[calc(100vh-56px)] font-sans">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Return Button */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-mono text-text-muted hover:text-white mb-10 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Return to Workstation</span>
        </Link>

        {/* Case Study Header */}
        <header className="pb-10 border-b border-border-dim mb-12 space-y-4">
          <div className="text-xs font-mono text-[#f9452d] tracking-wider uppercase font-semibold">
            Dashboard Experience / Case Study
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-white font-sans leading-tight">
            Multilingual Conversational AI Agents: SaaS Management Dashboard
          </h1>
          <p className="text-lg sm:text-xl text-text-secondary leading-relaxed font-sans font-light max-w-3xl">
            Created human-centered, low‑code workspace to create, brand, integrate, and measure AI voice agents - increased customer engagement by 51%.
          </p>

          {/* Project Meta Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-border-dim text-xs font-mono">
            <div>
              <div className="text-text-muted mb-1">CLIENT</div>
              <div className="text-white font-semibold">Devnagri AI</div>
            </div>
            <div>
              <div className="text-text-muted mb-1">TIMELINE</div>
              <div className="text-white">Apr – Jun 2024</div>
            </div>
            <div>
              <div className="text-text-muted mb-1">ROLE</div>
              <div className="text-white">Product Designer</div>
            </div>
            <div>
              <div className="text-text-muted mb-1">TOOLS</div>
              <div className="text-white">Figma, ChatGPT, Miro</div>
            </div>
          </div>
        </header>

        {/* Metric Impact Highlight */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-14">
          <div className="p-5 rounded-md bg-surface border border-border-dim space-y-1">
            <div className="text-3xl font-medium text-white font-sans">51%</div>
            <div className="text-xs font-mono text-text-muted">Engagement Boost</div>
          </div>
          <div className="p-5 rounded-md bg-surface border border-border-dim space-y-1">
            <div className="text-3xl font-medium text-white font-sans">32%</div>
            <div className="text-xs font-mono text-text-muted">Painpoints Resolved</div>
          </div>
          <div className="p-5 rounded-md bg-surface border border-border-dim space-y-1">
            <div className="text-3xl font-medium text-white font-sans">100+</div>
            <div className="text-xs font-mono text-text-muted">Components Adopted Across Products</div>
          </div>
        </div>

        {/* Narrative Content */}
        <div className="space-y-14 text-sm sm:text-base text-text-secondary leading-relaxed font-sans font-light">
          {/* Overview */}
          <section className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-medium text-white font-sans">
              Overview
            </h2>
            <p>
              Built a human-centered, low‑code workspace to create, brand, integrate, and measure AI voice agents end to end. The platform enables organizations to create multi-modal, industry-ready AI conversations with a flexible SaaS toolkit, delivering automated and scalable customer interactions with effortless integrations.
            </p>
          </section>

          {/* Goals We Aimed */}
          <section className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-medium text-white font-sans">
              Goals We Aimed
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-md bg-surface border border-border-dim space-y-2">
                <div className="font-semibold text-white text-sm">Simplify Agent Creation</div>
                <p className="text-xs text-text-secondary leading-relaxed">
                  Make it easier for non-technical users to create and configure an AI voice agent without getting overwhelmed by technical parameters.
                </p>
              </div>

              <div className="p-4 rounded-md bg-surface border border-border-dim space-y-2">
                <div className="font-semibold text-white text-sm">Support Multilingual Use Cases</div>
                <p className="text-xs text-text-secondary leading-relaxed">
                  Build a flexible architecture for configuring agents across diverse languages, accents, and industry-specific lexicons.
                </p>
              </div>

              <div className="p-4 rounded-md bg-surface border border-border-dim space-y-2">
                <div className="font-semibold text-white text-sm">Bring Training & Testing Together</div>
                <p className="text-xs text-text-secondary leading-relaxed">
                  Connect knowledge upload, agent training, and playground testing into a unified workflow so users can test before launch.
                </p>
              </div>

              <div className="p-4 rounded-md bg-surface border border-border-dim space-y-2">
                <div className="font-semibold text-white text-sm">Create a Scalable Foundation</div>
                <p className="text-xs text-text-secondary leading-relaxed">
                  Establish reusable design patterns and clear information architecture supporting analytics, monitoring, and webhooks.
                </p>
              </div>
            </div>
          </section>

          {/* Phase 1 MVP & Findings */}
          <section className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-medium text-white font-sans">
              Phase 1 MVP Architecture
            </h2>
            <p>
              The challenge was not just creating an AI agent; we needed to give users a clear way to create, train, configure, and validate an agent without losing track of where they were in the pipeline.
            </p>

            <div className="space-y-3 pt-2">
              <div className="p-4 rounded-md bg-surface border border-border-dim space-y-1">
                <div className="text-xs font-mono text-[#f9452d]">CENTRAL AGENT DASHBOARD</div>
                <p className="text-xs text-text-secondary">
                  Introduced a central hub bringing existing agents, live status, and key usage telemetry together with one-click Create Agent workflow.
                </p>
              </div>

              <div className="p-4 rounded-md bg-surface border border-border-dim space-y-1">
                <div className="text-xs font-mono text-accent-cyan">GUIDED CONFIGURATION FLOW</div>
                <p className="text-xs text-text-secondary">
                  Structured agent setup around primary decisions (industry, language, voice personality, fallbacks) kept within an intuitive step-by-step model.
                </p>
              </div>

              <div className="p-4 rounded-md bg-surface border border-border-dim space-y-1">
                <div className="text-xs font-mono text-text-muted">KNOWLEDGE & PLAYGROUND WORKSPACE</div>
                <p className="text-xs text-text-secondary">
                  Created an in-product interactive playground where users speak directly to the agent to validate responses prior to deployment.
                </p>
              </div>
            </div>
          </section>
        </div>

        {/* Bottom Navigation */}
        <div className="mt-16 pt-8 border-t border-border-dim flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-text-muted">
          <Link
            href="/"
            className="text-text-secondary hover:text-white transition-colors flex items-center gap-1.5"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Workstation</span>
          </Link>

          <div className="flex items-center gap-4 text-text-secondary">
            <Link href="/mastercard" className="hover:text-white transition-colors">
              &larr; Previous Case: Mastercard
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
