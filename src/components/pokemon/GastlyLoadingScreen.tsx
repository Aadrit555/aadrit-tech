"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";

interface GastlyLoadingScreenProps {
  onComplete?: () => void;
}

export default function GastlyLoadingScreen({ onComplete }: GastlyLoadingScreenProps) {
  const [loading, setLoading] = useState(true);
  const [isFading, setIsFading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState("INITIALIZING WORKSTATION...");
  const hasFinishedRef = useRef(false);

  const finishLoading = useCallback(() => {
    if (hasFinishedRef.current) return;
    hasFinishedRef.current = true;

    setIsFading(true);
    const fadeTimer = setTimeout(() => {
      setLoading(false);
      if (onComplete) onComplete();
    }, 500);
    return () => clearTimeout(fadeTimer);
  }, [onComplete]);

  // Mandatory 4.5-second loading sequence
  useEffect(() => {
    const startTime = Date.now();
    const duration = 4500; // 4.5s mandatory display duration

    const updateInterval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min(100, Math.round((elapsed / duration) * 100));
      setProgress(pct);

      if (pct < 25) {
        setStatusText("INITIALIZING WORKSTATION...");
      } else if (pct < 55) {
        setStatusText("LOADING SYSTEMS & ML MODELS...");
      } else if (pct < 85) {
        setStatusText("MOUNTING DIAGNOSTICS...");
      } else if (pct < 100) {
        setStatusText("CONFIGURING INTERFACE...");
      } else {
        setStatusText("WORKSTATION READY");
        clearInterval(updateInterval);
        setTimeout(() => {
          finishLoading();
        }, 300);
      }
    }, 25);

    return () => clearInterval(updateInterval);
  }, [finishLoading]);

  if (!loading) return null;

  return (
    <aside
      aria-label="Loading Portfolio"
      aria-busy={!isFading}
      role="status"
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#c5b6f2] select-none transition-opacity duration-500 ease-out ${
        isFading ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      {/* Top Telemetry Header */}
      <div className="absolute top-4 left-4 sm:top-6 sm:left-6 flex items-center gap-2 font-mono text-xs text-[#2e2154]">
        <span className="w-2 h-2 rounded-full bg-[#2e2154] animate-ping" />
        <span className="font-bold tracking-wider">AADRIT.TECH // SYSTEM BOOT</span>
      </div>

      {/* Gastly Animation */}
      <div className="flex flex-col items-center justify-center max-w-sm px-4">
        <div className="relative w-64 h-52 sm:w-80 sm:h-64 flex items-center justify-center">
          <Image
            src="/images/gastly_loader.gif"
            alt="Gastly loading animation"
            width={400}
            height={300}
            priority
            unoptimized
            className="object-contain w-full h-full pointer-events-none"
          />
        </div>

        {/* Loading Readout & Progress Bar */}
        <div className="w-64 sm:w-80 mt-3 space-y-2 font-mono">
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
            <span>SYSTEM v3.0</span>
          </div>
        </div>
      </div>

      {/* Bottom Status Prompt */}
      <div className="absolute bottom-6 sm:bottom-8 flex flex-col items-center gap-1 z-10 font-mono text-[11px] text-[#4a377d]">
        <span className="tracking-widest uppercase">
          {progress < 100 ? "Loading environment..." : "Entering..."}
        </span>
      </div>
    </aside>
  );
}
