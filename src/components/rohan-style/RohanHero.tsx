"use client";

import { useState, useEffect, useRef } from "react";
import { Mail, Volume2, VolumeX } from "lucide-react";
import { profile } from "@/data/portfolio";

const ROLES = [
  "Machine Learning & Systems",
  "C & Low-Level Software",
  "PyTorch Models",
  "FOSS SRMAP Co-Lead",
  "MANAK Inspire Awardee",
];

export default function RohanHero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [fadeState, setFadeState] = useState<"in" | "out">("in");
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setFadeState("out");
      setTimeout(() => {
        setRoleIndex((prev) => (prev + 1) % ROLES.length);
        setFadeState("in");
      }, 300);
    }, 3200);

    return () => clearInterval(interval);
  }, []);

  const toggleSound = () => {
    if (isPlayingAudio) {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      setIsPlayingAudio(false);
      return;
    }

    try {
      const cry = new Audio("/sounds/rayquaza_cry.mp3");
      cry.volume = 0.75;
      audioRef.current = cry;
      setIsPlayingAudio(true);

      cry.onended = () => {
        setIsPlayingAudio(false);
        audioRef.current = null;
      };
      cry.onerror = () => {
        setIsPlayingAudio(false);
        audioRef.current = null;
      };
      cry.play().catch(() => setIsPlayingAudio(false));
    } catch {
      setIsPlayingAudio(false);
    }
  };

  return (
    <section
      id="hero"
      className="pt-24 sm:pt-32 pb-8 sm:pb-16 flex flex-col max-w-5xl mx-auto px-4 sm:px-6 relative z-10"
    >
      <div className="flex items-start">
        <div className="w-full">
          {/* Main Title + Rotated "open to work." badge */}
          <div className="flex flex-col sm:flex-row sm:items-center">
            <h1
              className="text-4xl sm:text-6xl md:text-7xl font-semibold lowercase leading-none tracking-tight font-sans text-zinc-950"
              style={{ lineHeight: 1.05 }}
            >
              aadrit
            </h1>

            <a
              href="#contact"
              className="group self-start sm:rotate-[90deg] sm:origin-center-left sm:ml-6 mt-3 sm:mt-0 bg-white px-3 py-1 text-xs border border-zinc-200 text-zinc-800 font-mono tracking-widest hover:shadow-sm transition-all duration-300 hover:scale-105 relative cursor-pointer"
              style={{ height: "fit-content" }}
            >
              <span className="inline-flex items-center gap-1.5 transition-all duration-300 group-hover:opacity-0">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                open to work.
              </span>
              <span className="absolute inset-0 flex items-center justify-center gap-1.5 transition-all duration-300 opacity-0 group-hover:opacity-100 font-bold text-emerald-600">
                <Mail className="w-3 h-3" />
                contact me
              </span>
            </a>
          </div>

          {/* Dynamic Cycling Role */}
          <div className="block text-base sm:text-lg mt-4 mb-3 font-medium lowercase">
            <span className="text-zinc-600 font-mono text-xs mr-2 font-bold">
              {"//"}
            </span>
            <span
              className={`inline-block font-bold text-zinc-950 transition-all duration-300 ${fadeState === "in"
                ? "opacity-100 translate-y-0 blur-none"
                : "opacity-0 -translate-y-1 blur-xs"
                }`}
            >
              {ROLES[roleIndex]}
            </span>
          </div>
        </div>
      </div>

      {/* Description Paragraph with Monospace Tag Highlights */}
      <div className="mt-4 sm:mt-8 text-base sm:text-[1.10rem] text-zinc-900 font-sans leading-relaxed">
        <p className="mb-5 max-w-3xl">
          i{" "}
          <span className="bg-zinc-100 px-2 py-0.5 rounded font-mono text-sm tracking-wide border border-zinc-200 text-zinc-900 font-medium">
            build
          </span>{" "}
          and{" "}
          <span className="bg-zinc-100 px-2 py-0.5 rounded font-mono text-sm tracking-wide border border-zinc-200 text-zinc-900 font-medium">
            ship
          </span>{" "}
          lightweight machine learning systems in Python and systems software in C.
          <br className="hidden sm:block" />
          computer science undergrad at{" "}
          <span className="font-semibold text-zinc-950">
            SRM University AP
          </span>
          , member at{" "}
          <span className="font-semibold text-zinc-950">
            Next Tech Lab
          </span>
          , and co-lead at{" "}
          <span className="font-semibold text-zinc-950">
            FOSS SRMAP
          </span>
          .
          <br />
          <span className="bg-zinc-100 px-2 py-0.5 rounded font-mono text-sm tracking-wide border border-zinc-200 text-zinc-900 font-medium inline-block mt-2">
            loves systems & ml
          </span>
        </p>
      </div>

      {/* Quick Jump Links with 45° Arrow Rotation and Hoenn Audio Pill */}
      <div className="flex flex-wrap items-center gap-3 sm:gap-6 mt-1 text-sm font-medium">
        <a
          href="#projects"
          className="hover:underline underline-offset-2 group text-zinc-900 font-semibold flex items-center gap-1"
        >
          <span>view projects</span>
          <span className="inline-block group-hover:rotate-45 transition-transform duration-200 text-emerald-600 font-bold">
            ↑
          </span>
        </a>
        <a
          href="#skills"
          className="hover:underline underline-offset-2 group text-zinc-900 font-semibold flex items-center gap-1"
        >
          <span>skills</span>
          <span className="inline-block group-hover:rotate-45 transition-transform duration-200 text-emerald-600 font-bold">
            ↑
          </span>
        </a>
        <a
          href="#timeline"
          className="hover:underline underline-offset-2 group text-zinc-900 font-semibold flex items-center gap-1"
        >
          <span>timeline</span>
          <span className="inline-block group-hover:rotate-45 transition-transform duration-200 text-emerald-600 font-bold">
            ↑
          </span>
        </a>
        <a
          href="#services"
          className="hover:underline underline-offset-2 group text-zinc-900 font-semibold flex items-center gap-1"
        >
          <span>services</span>
          <span className="inline-block group-hover:rotate-45 transition-transform duration-200 text-emerald-600 font-bold">
            ↑
          </span>
        </a>
        <a
          href="#contact"
          className="hover:underline underline-offset-2 group text-zinc-900 font-semibold flex items-center gap-1"
        >
          <span>contact me</span>
          <span className="inline-block group-hover:rotate-45 transition-transform duration-200 text-emerald-600 font-bold">
            ↑
          </span>
        </a>

        {/* Sound Pill */}
        <button
          type="button"
          onClick={toggleSound}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono border border-zinc-200 bg-white hover:bg-zinc-50 text-zinc-800 font-semibold hover:border-emerald-500 transition-all cursor-pointer ml-auto shadow-2xs"
          title="Play Sound (Rayquaza Cry)"
        >
          {isPlayingAudio ? (
            <>
              <VolumeX className="w-3.5 h-3.5 text-[#f9452d] animate-pulse" />
              <span className="text-[11px] text-[#f9452d] font-bold">playing...</span>
            </>
          ) : (
            <>
              <Volume2 className="w-3.5 h-3.5 text-emerald-600" />
              <span className="text-[11px]">sound</span>
            </>
          )}
        </button>
      </div>
    </section>
  );
}
