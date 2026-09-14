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
  const [statusText, setStatusText] = useState("AADRIT.TECH INITIALIZING...");

  const finishLoading = useCallback(() => {
    try {
      sessionStorage.setItem("hasSeenIntro", "true");
    } catch {
      // Ignore storage errors in restricted private contexts
    }
    setIsFading(true);
    const fadeTimer = setTimeout(() => {
      setLoading(false);
      if (onComplete) onComplete();
    }, 350);
    return () => clearTimeout(fadeTimer);
  }, [onComplete]);

  // Check session memory and prefers-reduced-motion on mount
  useEffect(() => {
    try {
      if (sessionStorage.getItem("hasSeenIntro") === "true") {
        setLoading(false);
        if (onComplete) onComplete();
        return;
      }
    } catch {
      // Continue if sessionStorage is not accessible
    }

    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      try {
        sessionStorage.setItem("hasSeenIntro", "true");
      } catch { }
      setLoading(false);
      if (onComplete) onComplete();
      return;
    }
  }, [onComplete]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" || e.key === "Enter") {
        finishLoading();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [finishLoading]);

  useEffect(() => {
    if (!loading) return;

    const startTime = Date.now();
    const duration = 850;

    const updateInterval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min(100, Math.round((elapsed / duration) * 100));
      setProgress(pct);

      if (pct < 45) {
        setStatusText("AADRIT.TECH INITIALIZING...");
      } else if (pct < 90) {
        setStatusText("LOADING PORTFOLIO...");
      } else {
        setStatusText("PORTFOLIO READY");
        clearInterval(updateInterval);
        setTimeout(() => {
          finishLoading();
        }, 120);
      }
    }, 20);

    return () => clearInterval(updateInterval);
  }, [loading, finishLoading]);

  if (!loading) return null;

  return (
    <aside
      aria-label="Loading Portfolio"
      aria-busy={!isFading}
      role="status"
      onClick={finishLoading}
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#c5b6f2] select-none transition-opacity duration-500 ease-out cursor-pointer ${isFading ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
    >
      {/* Top Telemetry Header */}
      <div className="absolute top-4 left-4 sm:top-6 sm:left-6 flex items-center gap-2 font-mono text-xs text-[#2e2154]">
        <span className="w-2 h-2 rounded-full bg-[#2e2154] animate-ping" />
        <span className="font-bold tracking-wider">AADRIT.TECH // DEVON CORP.</span>
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

      {/* Gastly Animation */}
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
            <span>GASTLY // NO. 0092</span>
            <span className="hidden sm:inline">TYPE: GHOST / POISON</span>
            <span>DEVON OS v3.0</span>
          </div>
        </div>
      </div>

      {/* Explicit Discoverable Enter Action */}
      <div className="absolute bottom-4 sm:bottom-6 flex flex-col items-center gap-1.5 z-10">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            finishLoading();
          }}
          className="font-mono text-xs font-bold px-4 py-2 bg-[#2e2154] text-white rounded hover:bg-[#1a1233] transition-colors shadow-md flex items-center gap-1.5 cursor-pointer"
        >
          <span>[ ENTER DEX ↵ ]</span>
        </button>
        <span className="text-[10px] font-mono text-[#5b4694] tracking-wider">
          Press Esc or click anywhere to skip
        </span>
      </div>
    </aside>
  );
}

