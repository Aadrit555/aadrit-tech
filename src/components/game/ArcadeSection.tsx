"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import dynamic from "next/dynamic";
import { Gamepad2 } from "lucide-react";

// Dynamic import of Three.js game with SSR disabled
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
        {/* 3D Game Engine */}
        <PokedexArcadeGame onClose={() => setIsOpen(false)} />
      </div>
    </div>
  ) : null;

  return (
    <>
      {/* Subtle, discreet small button at the very end */}
      <div className="flex justify-center pb-8 pt-2 relative z-10">
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-mono text-zinc-500 hover:text-emerald-400 bg-zinc-900/50 hover:bg-zinc-900 border border-zinc-800/80 hover:border-emerald-500/40 transition-all cursor-pointer shadow-xs group"
          title="Launch secret Devon Corp 3D Simulation Chamber"
        >
          <Gamepad2 className="w-3.5 h-3.5 text-zinc-600 group-hover:text-emerald-400 transition-colors" />
          <span>Devon 3D Field Sim</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/60 group-hover:bg-emerald-400 animate-pulse" />
        </button>
      </div>

      {/* Portal rendered to body so it floats above all layout stacking contexts */}
      {mounted && typeof document !== "undefined" && createPortal(modalContent, document.body)}
    </>
  );
}
