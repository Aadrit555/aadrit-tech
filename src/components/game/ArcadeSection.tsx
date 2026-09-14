"use client";

import dynamic from "next/dynamic";
import { Gamepad2, Sparkles, Cpu, Layers } from "lucide-react";
import ScrollReveal from "@/components/animations/ScrollReveal";

// Dynamic import with SSR disabled to prevent Three.js window/DOM errors during static build
const PokedexArcadeGame = dynamic(() => import("./PokedexArcadeGame"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[540px] md:h-[620px] rounded-2xl bg-zinc-950 border border-zinc-800/80 flex flex-col items-center justify-center p-8 text-center relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.08)_0%,transparent_70%)] pointer-events-none" />
      <div className="w-14 h-14 rounded-full border-2 border-emerald-500/40 border-t-emerald-400 animate-spin mb-4" />
      <span className="font-mono text-xs text-emerald-400 font-bold uppercase tracking-widest flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
        INITIALIZING DEVON CORP 3D MATRIX...
      </span>
      <p className="font-mono text-[11px] text-zinc-500 mt-2 max-w-sm">
        Compiling WebGL shaders, generating procedural ball geometry, and mounting Web Audio sound generator.
      </p>
    </div>
  ),
});

export default function ArcadeSection() {
  return (
    <section id="arcade" className="py-12 md:py-20 bg-transparent relative z-10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Section Header Card */}
        <ScrollReveal>
          <div className="mb-8 p-6 sm:p-8 bg-white/85 backdrop-blur-md border border-white/70 rounded-2xl shadow-md flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <div className="text-xs font-mono text-[#dc2626] tracking-wider uppercase mb-2 font-bold flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                <span>Pokédex Simulation Chamber // Devon Corp. 3D Field Lab</span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight text-zinc-950 font-sans">
                3D Catch <span className="font-serif italic font-normal text-zinc-500">Simulator</span>
              </h2>
              <p className="text-xs sm:text-sm text-zinc-600 font-sans mt-2 max-w-2xl leading-relaxed">
                A custom Three.js minigame featuring real-time 3D ballistic physics, ground bounce restitution, procedural Web Audio chiptune synthesis, and wild Hoenn target tracking.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-zinc-900 text-emerald-400 font-mono text-[10px] font-bold border border-zinc-800">
                <Cpu className="w-3 h-3" />
                Three.js WebGL
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-zinc-900 text-cyan-400 font-mono text-[10px] font-bold border border-zinc-800">
                <Layers className="w-3 h-3" />
                60 FPS Physics
              </span>
            </div>
          </div>
        </ScrollReveal>

        {/* 3D Game Canvas & Controller */}
        <ScrollReveal delay={150}>
          <PokedexArcadeGame />
        </ScrollReveal>
      </div>
    </section>
  );
}

