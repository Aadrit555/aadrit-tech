"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import dynamic from "next/dynamic";
import { Gamepad2 } from "lucide-react";
import ScrollReveal from "@/components/animations/ScrollReveal";

// Dynamic import with SSR disabled to prevent Three.js window/DOM errors during static build
const PokedexArcadeGame = dynamic(() => import("./PokedexArcadeGame"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[520px] rounded-2xl bg-zinc-950 border border-zinc-800 flex flex-col items-center justify-center p-8 text-center">
      <div className="w-12 h-12 rounded-full border-2 border-emerald-500/40 border-t-emerald-400 animate-spin mb-4" />
      <span className="font-mono text-xs text-emerald-400 font-bold uppercase tracking-widest flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
        LAUNCHING DEVON CORP 3D MATRIX...
      </span>
      <p className="font-mono text-[11px] text-zinc-500 mt-2">
        Loading Three.js shaders and Hoenn target sprites.
      </p>
    </div>
  ),
});

export default function ArcadeSection() {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const modalContent = isOpen ? (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Devon 3D Field Simulation Chamber"
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/85 backdrop-blur-md p-3 sm:p-6 overflow-y-auto animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) setIsOpen(false);
      }}
    >
      <div className="relative w-full max-w-4xl max-h-[95vh] overflow-hidden rounded-2xl shadow-2xl border border-zinc-700/80">
        <PokedexArcadeGame onClose={() => setIsOpen(false)} />
      </div>
    </div>
  ) : null;

  return (
    <section id="arcade" className="py-8 sm:py-12 bg-transparent relative z-10 max-w-5xl mx-auto px-4 sm:px-6">
      <ScrollReveal>
        <div className="p-6 sm:p-8 border border-[var(--border-subtle)] bg-[var(--bg-surface)] rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="text-xs font-mono text-[#f9452d] tracking-wider uppercase mb-1 font-bold flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              <span>Devon Corp // 3D Simulation Chamber</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-medium tracking-tight text-[var(--text-main)]">
              Interactive 3D Ballistics Simulator
            </h3>
            <p className="text-xs sm:text-sm text-[var(--text-secondary)] mt-1 max-w-xl">
              Real-time Three.js WebGL ballistic physics, procedural chiptune audio, and Hoenn targets.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setIsOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-md bg-zinc-900 text-white hover:bg-zinc-800 transition-all font-mono text-xs font-bold cursor-pointer shadow-sm group"
            >
              <Gamepad2 className="w-4 h-4 text-emerald-400 group-hover:rotate-12 transition-transform" />
              <span>Launch Simulator</span>
            </button>
          </div>
        </div>
      </ScrollReveal>

      {mounted && typeof document !== "undefined" && createPortal(modalContent, document.body)}
    </section>
  );
}
