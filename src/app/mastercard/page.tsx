import Link from "next/link";
import { ArrowLeft, ExternalLink, Shield, CheckCircle2, Lock } from "lucide-react";

export const metadata = {
  title: "Case Study: Mastercard Cashpassport Experience | Aadrit",
  description:
    "Master of Evolution: Redesigning Mastercard's Cashpassport Experience as a smart travel companion.",
};

export default function MastercardCaseStudyPage() {
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
            CX Refresh / Case Study
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-white font-sans leading-tight">
            Master of Evolution: Redesigning Mastercard&apos;s Cashpassport Experience
          </h1>
          <p className="text-lg sm:text-xl text-text-secondary leading-relaxed font-sans font-light max-w-3xl">
            Reimagining Mastercard Cash Passport as a smart travel companion that makes every moment matter in the new world
          </p>

          {/* Project Meta Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-border-dim text-xs font-mono">
            <div>
              <div className="text-text-muted mb-1">CLIENT</div>
              <div className="text-white font-semibold">Mastercard</div>
            </div>
            <div>
              <div className="text-text-muted mb-1">TIMELINE</div>
              <div className="text-white">Oct 2025 - Apr 2026</div>
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

        {/* Narrative Sections */}
        <div className="space-y-14 text-sm sm:text-base text-text-secondary leading-relaxed font-sans font-light">
          {/* Overview */}
          <section className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-medium text-white font-sans">
              Overview
            </h2>
            <p>
              Cash Passport is Mastercard&apos;s reloadable, multi-currency prepaid travel card first built in 2011. Over a decade later, the product&apos;s underlying value (secure, guaranteed-rate spending abroad) hadn&apos;t changed, but the market around it had: challenger banks and fintechs had redefined what a &quot;travel money&quot; experience should feel like.
            </p>
            <p>
              I worked as part of the design team on a full CX refresh of the Cash Passport ecosystem - web, app, and the internal staff portal - repositioning it from a legacy prepaid card into a smart travel companion.
            </p>
          </section>

          {/* What I Did */}
          <section className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-medium text-white font-sans">
              What I Did
            </h2>
            <p>
              I worked as part of a cross-functional team - a Design Director, Product Analyst, 2 Lead Designers, and 3 Senior Designers - owning the app and web experience end-to-end.
            </p>
            <p>
              I designed flows and screens in close collaboration with a fellow designer on my pod, focusing on the consumer-facing journey: onboarding, money movement, and the transparency/control surfaces research flagged as the biggest trust gaps. A parallel workstream on the team covered the staff portal.
            </p>
          </section>

          {/* The Problem */}
          <section className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-medium text-white font-sans">
              The Problem
            </h2>
            <div className="space-y-3">
              <div className="p-4 rounded-md bg-surface border border-border-dim space-y-1.5">
                <div className="text-xs font-mono text-[#f9452d]">01. Sentiment & Friction Analysis</div>
                <p className="text-sm text-text-secondary">
                  Cash Passport was losing ground not on trust, but on experience. Sentiment analysis of public reviews showed 85% expressing extreme dissatisfaction, with frustration compounding at every stage - from fee transparency during onboarding to support failures. Breakdown: 40% fees/FX opacity, 35% support failures, 25% usability friction.
                </p>
              </div>

              <div className="p-4 rounded-md bg-surface border border-border-dim space-y-1.5">
                <div className="text-xs font-mono text-accent-cyan">02. Competitive Benchmarking</div>
                <p className="text-sm text-text-secondary">
                  Against Wise, Monzo, and Revolut, Cash Passport scored roughly 2/5 on core product features (multi-currency support, FX transparency, virtual cards, top-up flexibility) versus competitor averages of 4-5. Digital discoverability had an SEO/GEO score gap of 72/50 against Revolut&apos;s 91/90.
                </p>
              </div>

              <div className="p-4 rounded-md bg-surface border border-border-dim space-y-1.5">
                <div className="text-xs font-mono text-text-muted">03. International Traveler Expectations</div>
                <p className="text-sm text-text-secondary">
                  Guerrilla research with 12 international travelers confirmed core expectations: a contained, fraud-safe pot of money, zero per-purchase surprise international fees, and live transparent exchange rates.
                </p>
              </div>
            </div>
          </section>

          {/* Hypothesis */}
          <section className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-medium text-white font-sans">
              Hypothesis
            </h2>
            <p>
              Cash Passport wasn&apos;t failing because the core product idea was wrong - a locked, contained pot of travel money is still a real need. It was failing because the experience layer (onboarding friction, fee opacity, fragmented web/app journeys) hadn&apos;t evolved while the market&apos;s baseline expectation had.
            </p>
            <p>
              If we rebuilt the experience around transparency, self-service, and a coherent omnichannel journey, we could reposition the product from &quot;basic legacy card&quot; to &quot;best-in-class travel companion&quot; without needing to change what the underlying financial rails do.
            </p>
          </section>

          {/* What We Built */}
          <section className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-medium text-white font-sans">
              What We Built
            </h2>
            <p>
              The refresh spanned three surfaces - consumer app, web, and internal servicing portal:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-md bg-surface border border-border-dim space-y-2">
                <div className="font-semibold text-white text-sm font-sans">Authentication</div>
                <p className="text-xs text-text-secondary leading-relaxed">
                  Simplified login with streamlined biometric authentication, meeting PCI DSS, PSD2, and GDPR standards.
                </p>
              </div>

              <div className="p-4 rounded-md bg-surface border border-border-dim space-y-2">
                <div className="font-semibold text-white text-sm font-sans">Onboarding</div>
                <p className="text-xs text-text-secondary leading-relaxed">
                  Reworked card purchase and verification flow to reduce drop-off and create a friction-free activation path.
                </p>
              </div>

              <div className="p-4 rounded-md bg-surface border border-border-dim space-y-2">
                <div className="font-semibold text-white text-sm font-sans">Money Movement</div>
                <p className="text-xs text-text-secondary leading-relaxed">
                  Instant Apple Pay / Google Pay top-ups, auto-purse creation by destination, and virtual card issuance.
                </p>
              </div>

              <div className="p-4 rounded-md bg-surface border border-border-dim space-y-2">
                <div className="font-semibold text-white text-sm font-sans">Transparency & Control</div>
                <p className="text-xs text-text-secondary leading-relaxed">
                  Real-time FX visibility, card locking/freeze controls, and clear fee UX writing directly on the home view.
                </p>
              </div>
            </div>
          </section>

          {/* Confidentiality Notice */}
          <div className="p-6 rounded-md bg-surface-raised border border-border-dim space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono text-amber-400">
              <Lock className="w-4 h-4" />
              <span>CONFIDENTIALITY & NDA NOTICE</span>
            </div>
            <p className="text-xs text-text-secondary leading-relaxed font-sans">
              This case study has been intentionally summarized due to NDA and confidentiality requirements. For a deeper look into the problem, research artifacts, design systems, and metrics, I would be happy to provide a private walkthrough.
            </p>
            <div className="pt-2">
              <Link href="/#contact" className="btn-primary">
                Request Private Walkthrough
              </Link>
            </div>
          </div>
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
            <Link href="/devnagri_ai" className="hover:text-white transition-colors">
              Next Case: Devnagri AI &rarr;
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
