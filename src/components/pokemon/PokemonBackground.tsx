"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

export default function PokemonBackground() {
  const [mounted, setMounted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    setMounted(true);
    if (videoRef.current) {
      videoRef.current.play().catch(() => { });
    }
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none">
      {/* 1. Pokemon Emerald Title Screen Live Wallpaper Video - Fixed Edge-to-Edge Background */}
      <div className="absolute inset-0 z-0">
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

      {/* 3. Subtle Ambient Emerald Ozone Motes */}
      <div className="absolute inset-0 z-[2] pointer-events-none opacity-60">
        <div className="absolute top-1/4 left-1/4 w-1.5 h-1.5 bg-emerald-400 animate-ping duration-1000" />
        <div className="absolute top-1/3 right-1/4 w-1 h-1 bg-amber-300 animate-pulse duration-700" />
        <div className="absolute top-2/3 left-1/3 w-1.5 h-1.5 bg-sky-300 animate-ping duration-1000" />
      </div>
    </div>
  );
}
