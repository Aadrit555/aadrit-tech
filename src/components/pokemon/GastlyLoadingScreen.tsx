"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";

interface GastlyLoadingScreenProps {
  onComplete?: () => void;
}

export default function GastlyLoadingScreen({ onComplete }: GastlyLoadingScreenProps) {
  const [loading, setLoading] = useState(true);
  const [isFading, setIsFading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState("INITIALIZING HOENN OS...");

  const finishLoading = useCallback(() => {
    setIsFading(true);
    const fadeTimer = setTimeout(() => {
      setLoading(false);
      if (onComplete) onComplete();
    }, 600);
    return () => clearTimeout(fadeTimer);
  }, [onComplete]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        finishLoading();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [finishLoading]);

  useEffect(() => {
    const startTime = Date.now();
    const duration = 1800; // 1.8 seconds total duration

    const updateInterval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min(100, Math.round((elapsed / duration) * 100));
      setProgress(pct);

      if (pct < 30) {
        setStatusText("INITIALIZING DEVON CORP. OS...");
      } else if (pct < 65) {
        setStatusText("CALIBRATING OPTICAL SENSORS...");
      } else if (pct < 90) {
        setStatusText("SYNCING DEX REGISTER #0384...");
      } else if (pct < 100) {
        setStatusText("ESTABLISHING NEURAL LINK...");
      } else {
        setStatusText("POKÉDEX READY.");
        clearInterval(updateInterval);
        setTimeout(() => {
          finishLoading();
        }, 250);
      }
    }, 30);

    return () => clearInterval(updateInterval);
  }, [finishLoading]);

  if (!loading) return null;

  return (
    <aside
      aria-label="Loading Pokédex System"
      aria-busy={!isFading}
      role="status"
      onClick={finishLoading}
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#c5b6f2] select-none transition-opacity duration-700 ease-out cursor-pointer ${isFading ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
    >
      {/* Top Telemetry Header */}
      <div className="absolute top-4 left-4 sm:top-6 sm:left-6 flex items-center gap-2 font-mono text-xs text-[#2e2154]">
        <span className="w-2 h-2 rounded-full bg-[#2e2154] animate-ping" />
        <span className="font-bold tracking-wider">DEVON CORP. // HOENN REGION</span>
      </div>

      {/* Skip Button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          finishLoading();
        }}
        type="button"
        className="absolute top-4 right-4 sm:top-6 sm:right-6 text-[10px] font-mono tracking-wider text-[#2e2154] hover:text-[#1a1233] bg-[#b49fe2]/70 hover:bg-[#b49fe2] px-3 py-1 rounded border border-[#9a85ce] transition-colors shadow-xs"
        title="Skip intro animation (Esc)"
      >
        SKIP [ESC]
      </button>

      {/* Centerpiece: Authentic Dribbble Gastly Animation */}
      <div className="flex flex-col items-center justify-center max-w-sm px-4">
        <div className="relative w-64 h-52 sm:w-80 sm:h-64 flex items-center justify-center">
          <Image
            src="/images/gastly_loader.gif"
            alt="Gastly Ghost Animation"
            width={400}
            height={300}
            priority
            unoptimized
            className="object-contain w-full h-full pointer-events-none"
          />
        </div>

        {/* Pokédex OS Loading Readout & Progress */}
        <div className="w-64 sm:w-76 mt-3 space-y-2 font-mono">
          {/* Status Label + Percentage */}
          <div className="flex items-center justify-between text-[11px] text-[#2e2154] font-bold tracking-wider">
            <span className="truncate">{statusText}</span>
            <span className="tabular-nums font-mono">{progress}%</span>
          </div>

          {/* Segmented Retro Progress Bar */}
          <div className="h-2 w-full bg-[#b29de0] rounded-xs p-0.5 border border-[#8f77c4] overflow-hidden">
            <div
              className="h-full bg-[#2e2154] rounded-xs transition-all duration-75 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Footer Metadata */}
          <div className="flex items-center justify-between text-[10px] text-[#4a377d] pt-0.5">
            <span>PKMN SPEC #0092: GASTLY</span>
            <span className="hidden sm:inline">TYPE: GHOST / POISON</span>
            <span>OS v3.0</span>
          </div>
        </div>
      </div>

      {/* Bottom Hint */}
      <div className="absolute bottom-4 sm:bottom-6 text-[10px] font-mono text-[#5b4694] tracking-widest uppercase">
        CLICK ANYWHERE OR PRESS ESC TO PROCEED
      </div>
    </aside>
  );
}

