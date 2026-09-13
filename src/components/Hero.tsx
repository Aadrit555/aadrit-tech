import Image from "next/image";
import Link from "next/link";
import { MapPin, Mail, Phone, Github, Linkedin, Terminal, ShieldCheck, FileDown, ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative pt-12 pb-16 md:pt-20 md:pb-24 border-b border-border-dim bg-tech-grid">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Technical Profile & Headline */}
          <div className="lg:col-span-8 space-y-6">
            {/* Verification Status Pill */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded border border-border-dim bg-surface text-xs font-mono text-text-secondary">
              <span className="w-2 h-2 rounded-full bg-accent-emerald"></span>
              <span>Undergraduate Researcher: SRM University AP</span>
              <span className="text-border-dim">/</span>
              <span className="text-accent-cyan">B.Tech CSE</span>
            </div>

            {/* Direct & Authentic Hero Title */}
            <div className="space-y-2">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white font-sans">
                Aadrit Srivastava
              </h1>
              <p className="text-lg sm:text-xl text-text-secondary font-mono">
                AI/ML & Systems Engineer
              </p>
            </div>

            {/* Precise, non-vague description from resume */}
            <p className="text-sm sm:text-base text-text-secondary leading-relaxed max-w-2xl">
              Building working AI/ML systems and low-level software: lightweight NLP intent-classification models,
              adversarial simulation frameworks with continuous learning agents, and firmware-level cryptographic
              defenses in C. Focused on systems, information retrieval, and resource-constrained edge execution.
            </p>

            {/* Verified Meta Details */}
            <div className="flex flex-wrap items-center gap-y-2 gap-x-4 text-xs font-mono text-text-muted">
              <div className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-text-secondary" />
                <span>Lucknow, Uttar Pradesh, India</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-text-secondary" />
                <a href="mailto:aadrit.yks@gmail.com" className="hover:text-text-primary transition-colors">
                  aadrit.yks@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-text-secondary" />
                <span>+91 7233023333</span>
              </div>
            </div>

            {/* Strict Micro-rounded Action Buttons - NO PILL BUTTONS */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a href="#projects" className="btn-primary flex items-center gap-2">
                <span>Explore Code & Systems</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>

              <a
                href="https://github.com/Aadrit555"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary flex items-center gap-2"
              >
                <Github className="w-3.5 h-3.5" />
                <span>github.com/Aadrit555</span>
              </a>

              <a
                href="https://www.linkedin.com/in/aadrit-srivastava"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary flex items-center gap-2"
              >
                <Linkedin className="w-3.5 h-3.5" />
                <span>LinkedIn</span>
              </a>

              <a href="#contact" className="btn-secondary flex items-center gap-2">
                <Mail className="w-3.5 h-3.5" />
                <span>Direct Contact</span>
              </a>
            </div>
          </div>

          {/* Right Column: Genuine User Portrait with System Frame */}
          <div className="lg:col-span-4 flex justify-center lg:justify-end">
            <div className="relative group">
              {/* Outer technical border frame */}
              <div className="w-64 h-64 sm:w-72 sm:h-72 rounded-md border-2 border-border-bright bg-surface p-2 shadow-2xl relative overflow-hidden">
                <div className="w-full h-full relative rounded border border-border-dim overflow-hidden bg-surface-raised">
                  <Image
                    src="/images/aadrit.png"
                    alt="Aadrit Srivastava"
                    fill
                    priority
                    sizes="(max-width: 768px) 256px, 288px"
                    className="object-cover object-center grayscale contrast-105 hover:grayscale-0 transition-all duration-300"
                  />
                </div>

                {/* Technical Corner Accents */}
                <div className="absolute top-1 left-1 w-2 h-2 border-t-2 border-l-2 border-text-secondary"></div>
                <div className="absolute top-1 right-1 w-2 h-2 border-t-2 border-r-2 border-text-secondary"></div>
                <div className="absolute bottom-1 left-1 w-2 h-2 border-b-2 border-l-2 border-text-secondary"></div>
                <div className="absolute bottom-1 right-1 w-2 h-2 border-b-2 border-r-2 border-text-secondary"></div>
              </div>

              {/* Status Badge below frame */}
              <div className="mt-3 flex items-center justify-between px-1 text-[11px] font-mono text-text-muted">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-accent-emerald" />
                  <span>IDENTITY_VERIFIED</span>
                </span>
                <span className="text-border-bright">[SRM_AP_2026]</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

