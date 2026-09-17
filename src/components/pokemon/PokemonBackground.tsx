"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

export default function PokemonBackground() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Only attempt video playback if user has not requested reduced motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isMobile = window.innerWidth < 768;

    if (!prefersReducedMotion && !isMobile && videoRef.current) {
      videoRef.current.play().catch(() => { });
    }
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none" aria-hidden="true">
      {/* 1. Pokemon Emerald Scenery Background */}
      <div className="absolute inset-0 z-0">
        {/* Crisp static backdrop (no priority flag to avoid blocking main content LCP) */}
        <Image
          src="/images/pokemon_scenery.jpg"
          alt=""
          aria-hidden="true"
          fill
          sizes="100vw"
          className="object-cover object-center"
          style={{ imageRendering: "pixelated" }}
        />
        <video
          ref={videoRef}
          loop
          muted
          playsInline
          aria-hidden="true"
          poster="/images/pokemon_scenery.jpg"
          className="hidden md:block w-full h-full object-cover object-center relative z-[1]"
          style={{ imageRendering: "pixelated" }}
        >
          <source src="/images/emerald_title.webm" type="video/webm" />
        </video>

        {/* Frosted paper backdrop overlay to ensure crisp, readable text contrast while keeping the Emerald animated scenery alive */}
        <div className="absolute inset-0 bg-white/80 backdrop-blur-[2px]" />
      </div>

      {/* 2. Subtle Ambient Emerald Ozone Motes */}
      <div className="absolute inset-0 z-[2] pointer-events-none opacity-60">
        <div className="absolute top-1/4 left-1/4 w-1.5 h-1.5 bg-emerald-400 animate-ping duration-1000" />
        <div className="absolute top-1/3 right-1/4 w-1 h-1 bg-amber-300 animate-pulse duration-700" />
        <div className="absolute top-2/3 left-1/3 w-1.5 h-1.5 bg-sky-300 animate-ping duration-1000" />
      </div>
    </div>
  );
}
