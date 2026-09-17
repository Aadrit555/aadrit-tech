"use client";

import { useState } from "react";
import Image from "next/image";
import { Trophy, ChevronLeft, ChevronRight, ExternalLink, Award } from "lucide-react";

interface Achievement {
  id: string;
  title: string;
  date: string;
  description: string;
  prizeText: string;
  link?: string;
  badge: string;
  icon: React.ReactNode;
  imageUrl?: string;
}

const ACHIEVEMENTS: Achievement[] = [
  {
    id: "foss-hackathon",
    title: "FOSS United JUST A HACKATHON",
    date: "2025",
    description:
      "Engineered Hemlock, a low-level C cryptographic media integrity system combining perceptual hashing, ECDSA signatures, and adversarial pixel perturbation to detect unauthorized modification and preserve media provenance.",
    prizeText: "FOSS United Foundation",
    link: "https://github.com/Aadrit555/Hemlock",
    badge: "Hackathon",
    icon: <Trophy className="w-8 h-8 text-amber-500" />,
    imageUrl: "/images/just-a-hack.png",
  },
  {
    id: "manak-inspire",
    title: "National MANAK Inspire Award",
    date: "2024",
    description:
      "Conferred the prestigious National MANAK Inspire Award by the Department of Science and Technology, Government of India, recognizing original applied engineering innovation and problem-solving.",
    prizeText: "National Honor · Department of Science & Technology",
    badge: "National Award",
    icon: <Award className="w-8 h-8 text-emerald-500" />,
  },
];

export default function AchievementsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prev = () => {
    setCurrentIndex((prev) => (prev <= 0 ? ACHIEVEMENTS.length - 1 : prev - 1));
  };

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % ACHIEVEMENTS.length);
  };

  const current = ACHIEVEMENTS[currentIndex];

  return (
    <section id="achievements" className="py-8 sm:py-16 max-w-5xl mx-auto px-4 sm:px-6 relative z-10">
      <h2 className="py-3 sm:py-4 text-3xl sm:text-4xl mb-4 sm:mb-8 lowercase font-medium">
        achievements
      </h2>

      {/* Rohan-style Achievement Card */}
      <div className="w-full border border-[var(--border)] rounded-lg overflow-hidden bg-[var(--card)] hover:shadow-md transition-shadow duration-300">
        <div className="flex flex-col lg:flex-row">
          {/* Left Visual Area */}
          <div className="w-full lg:w-2/5 h-44 sm:h-56 lg:h-72 bg-gradient-to-br from-zinc-900 to-zinc-950 p-6 flex flex-col items-center justify-center text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.15)_0%,transparent_70%)] pointer-events-none" />
            {current.imageUrl && (
              <div
                className="absolute inset-0 bg-cover bg-center opacity-15 blur-sm scale-110 pointer-events-none"
                style={{ backgroundImage: `url(${current.imageUrl})` }}
              />
            )}
            {current.imageUrl ? (
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-zinc-900/90 border border-zinc-700/80 p-2 flex items-center justify-center mb-3 shadow-xl relative overflow-hidden backdrop-blur-sm">
                <Image
                  src={current.imageUrl}
                  alt={current.title}
                  width={96}
                  height={96}
                  className="w-full h-full object-contain rounded-xl"
                />
              </div>
            ) : (
              <div className="w-16 h-16 rounded-2xl bg-zinc-800/80 border border-zinc-700 flex items-center justify-center mb-3 shadow-lg relative">
                {current.icon}
              </div>
            )}
            <span className="font-mono text-xs text-emerald-400 font-bold uppercase tracking-wider relative">
              {current.badge}
            </span>
            <span className="font-mono text-[11px] text-zinc-400 mt-1 relative">
              RECORD // 0{currentIndex + 1} OF 0{ACHIEVEMENTS.length}
            </span>
          </div>

          {/* Right Content Area */}
          <div className="w-full lg:w-3/5 p-5 sm:p-7 flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1">
                  <h3 className="text-lg sm:text-xl font-bold leading-tight text-[var(--foreground)]">
                    {current.title}
                  </h3>
                </div>
                <span className="text-xs sm:text-sm text-zinc-700 whitespace-nowrap flex-shrink-0 font-mono font-medium">
                  {current.date}
                </span>
              </div>

              <p className="text-xs sm:text-sm text-zinc-700 leading-relaxed font-normal">
                {current.description}
              </p>

              <div className="flex items-center justify-between pt-1">
                <p className="text-sm font-bold text-emerald-700">
                  {current.prizeText}
                </p>

                {current.link && (
                  <a
                    href={current.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-mono text-[var(--foreground)] hover:text-emerald-600 transition-colors"
                  >
                    <span>View Repository</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </div>

            {/* Bottom Controls: Dots + Navigation Arrows */}
            <div className="flex items-center justify-between gap-4 pt-4 border-t border-[var(--border)]">
              {/* Dot Indicators */}
              <div className="flex gap-2">
                {ACHIEVEMENTS.map((item, idx) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setCurrentIndex(idx)}
                    className={`h-2 rounded-full transition-all duration-300 ${idx === currentIndex
                        ? "w-6 bg-zinc-900 dark:bg-white"
                        : "w-2 bg-zinc-300 dark:bg-zinc-700 hover:bg-zinc-400"
                      }`}
                    aria-label={`Go to achievement ${idx + 1}`}
                  />
                ))}
              </div>

              {/* Prev / Next Buttons */}
              <div className="flex gap-1.5">
                <button
                  type="button"
                  onClick={prev}
                  className="p-1.5 sm:p-2 hover:bg-[var(--foreground)]/5 rounded-md transition-colors text-[var(--foreground)] cursor-pointer"
                  aria-label="Previous achievement"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  type="button"
                  onClick={next}
                  className="p-1.5 sm:p-2 hover:bg-[var(--foreground)]/5 rounded-md transition-colors text-[var(--foreground)] cursor-pointer"
                  aria-label="Next achievement"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
