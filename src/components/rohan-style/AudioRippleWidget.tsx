"use client";

import { useState, useRef } from "react";
import { Volume2, VolumeX, Disc3, Sparkles } from "lucide-react";

export default function AudioRippleWidget() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const togglePlayback = () => {
    if (isPlaying) {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      setIsPlaying(false);
      return;
    }

    try {
      // Plays ambient Rayquaza soundscape / chime
      const audio = new Audio("/sounds/rayquaza_cry.mp3");
      audio.volume = 0.6;
      audioRef.current = audio;
      setIsPlaying(true);

      audio.onended = () => {
        setIsPlaying(false);
        audioRef.current = null;
      };
      audio.onerror = () => {
        setIsPlaying(false);
        audioRef.current = null;
      };
      audio.play().catch(() => setIsPlaying(false));
    } catch {
      setIsPlaying(false);
    }
  };

  return (
    <section className="py-12 sm:py-16 max-w-5xl mx-auto px-4 sm:px-6 relative z-10 overflow-hidden">
      <div className="relative border border-[var(--border)] rounded-2xl p-6 sm:p-10 bg-[var(--card)] overflow-hidden">
        {/* Rohan-style Concentric Ripple Rings behind center item */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none flex items-center justify-center">
          <div className="relative w-[360px] h-[360px] flex items-center justify-center">
            <div
              className={`absolute rounded-full border border-emerald-500/20 w-44 h-44 ${
                isPlaying ? "animate-ripple" : "opacity-20"
              }`}
              style={{ animationDelay: "0s" }}
            />
            <div
              className={`absolute rounded-full border border-emerald-500/15 w-60 h-60 ${
                isPlaying ? "animate-ripple" : "opacity-15"
              }`}
              style={{ animationDelay: "0.6s" }}
            />
            <div
              className={`absolute rounded-full border border-emerald-500/10 w-80 h-80 ${
                isPlaying ? "animate-ripple" : "opacity-10"
              }`}
              style={{ animationDelay: "1.2s" }}
            />
            <div
              className={`absolute rounded-full border border-dashed border-emerald-500/10 w-96 h-96 ${
                isPlaying ? "animate-ripple" : "opacity-5"
              }`}
              style={{ animationDelay: "1.8s" }}
            />
          </div>
        </div>

        {/* Foreground Content */}
        <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center sm:text-left">
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full border border-[var(--border)] bg-[var(--foreground)]/5 text-[10px] font-mono text-[var(--muted)]">
              <span
                className={`w-2 h-2 rounded-full ${
                  isPlaying ? "bg-emerald-500 animate-ping" : "bg-zinc-400"
                }`}
              />
              <span>AUDIO // HOENN NO. 0384</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-medium tracking-tight text-[var(--foreground)]">
              Ambient Audio & Sound
            </h3>
            <p className="text-xs sm:text-sm text-[var(--muted)] max-w-md">
              A gentle chiptune sound inspired by Hoenn. Click to play the sound and trigger the animated ripple.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={togglePlayback}
              className={`flex items-center gap-2 px-5 py-3 rounded-full font-mono text-xs font-bold transition-all shadow-sm cursor-pointer ${
                isPlaying
                  ? "bg-emerald-600 text-white shadow-emerald-500/30 scale-105"
                  : "bg-zinc-900 text-white dark:bg-white dark:text-zinc-950 hover:opacity-90"
              }`}
            >
              {isPlaying ? (
                <>
                  <Disc3 className="w-4 h-4 animate-spin text-white" />
                  <span>Playing Sound</span>
                </>
              ) : (
                <>
                  <Volume2 className="w-4 h-4 text-emerald-400" />
                  <span>Play Sound</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
