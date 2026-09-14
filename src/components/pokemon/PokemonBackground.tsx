"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

export default function PokemonBackground() {
  const [mounted, setMounted] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    setMounted(true);
    if (videoRef.current) {
      videoRef.current.play().catch(() => { });
    }

    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrollY(window.scrollY);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none">
      {/* 1. Pokemon Emerald Title Screen Live Wallpaper Video - Fully Vibrant with Subtle Parallax */}
      <div
        className="absolute inset-0 z-0 will-change-transform"
        style={{
          transform: `translate3d(0, -${Math.min(90, Math.round(scrollY * 0.04))}px, 0)`,
        }}
      >
        {/* Fallback image behind video */}
        <Image
          src="/images/pokemon_scenery.jpg"
          alt="Pokemon Emerald Title Screen"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
          style={{ imageRendering: "pixelated" }}
        />
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          poster="/images/pokemon_scenery.jpg"
          className="w-full h-full object-cover object-center relative z-[1]"
          style={{ imageRendering: "pixelated" }}
        >
          <source src="/images/emerald_title.webm" type="video/webm" />
        </video>

        {/* Ultra-subtle tint to ensure comfortable contrast without washing out the video */}
        <div className="absolute inset-0 bg-sky-950/10" />
      </div>

      {/* 2. Drifting Pixel Clouds Layer */}
      {mounted && (
        <div className="absolute inset-0 z-[1] overflow-hidden opacity-50">
          <div
            className="absolute top-10 -left-48 w-44 h-16 bg-white/85 rounded-sm blur-[0.3px] animate-pixel-cloud-slow"
            style={{
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05), inset 0 -4px 0 rgba(220, 235, 252, 0.9)",
              imageRendering: "pixelated",
            }}
          >
            <div className="absolute -top-6 left-6 w-20 h-10 bg-white/90 rounded-sm" />
            <div className="absolute -top-3 left-20 w-14 h-8 bg-white/85 rounded-sm" />
          </div>

          <div
            className="absolute top-28 -left-64 w-60 h-20 bg-white/80 rounded-sm blur-[0.3px] animate-pixel-cloud-mid"
            style={{
              boxShadow: "0 6px 14px rgba(0, 0, 0, 0.04), inset 0 -5px 0 rgba(220, 235, 252, 0.9)",
              imageRendering: "pixelated",
            }}
          >
            <div className="absolute -top-8 left-10 w-28 h-12 bg-white/85 rounded-sm" />
            <div className="absolute -top-5 left-32 w-20 h-10 bg-white/80 rounded-sm" />
          </div>
        </div>
      )}

      {/* 3. Subtle Ambient Emerald Ozone Motes */}
      <div className="absolute inset-0 z-[2] pointer-events-none opacity-60">
        <div className="absolute top-1/4 left-1/4 w-1.5 h-1.5 bg-emerald-400 animate-ping duration-1000" />
        <div className="absolute top-1/3 right-1/4 w-1 h-1 bg-amber-300 animate-pulse duration-700" />
        <div className="absolute top-2/3 left-1/3 w-1.5 h-1.5 bg-sky-300 animate-ping duration-1000" />
      </div>
    </div>
  );
}
