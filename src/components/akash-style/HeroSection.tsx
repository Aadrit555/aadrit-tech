"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { ArrowDown, ArrowUpRight, Github, Linkedin, Volume2, VolumeX, Zap } from "lucide-react";
import { profile, focusAreas } from "@/data/portfolio";

export default function HeroSection() {
  const [audioMode, setAudioMode] = useState<"idle" | "voice" | "cry">("idle");
  const activeAudioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    return () => {
      if (activeAudioRef.current) {
        activeAudioRef.current.pause();
        activeAudioRef.current = null;
      }
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const stopAudio = () => {
    if (activeAudioRef.current) {
      activeAudioRef.current.pause();
      activeAudioRef.current = null;
    }
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
    setAudioMode("idle");
  };

  const playDexVoice = () => {
    if (audioMode === "voice") {
      stopAudio();
      return;
    }
    stopAudio();
    setAudioMode("voice");

    try {
      const scanSound = new Audio("/sounds/pokedex_scan.wav");
      scanSound.volume = 0.6;
      activeAudioRef.current = scanSound;

      const onScanDone = () => {
        const voiceSound = new Audio("/sounds/pokedex_voice.mp3");
        voiceSound.volume = 0.9;
        activeAudioRef.current = voiceSound;

        voiceSound.onended = () => {
          setAudioMode("idle");
          activeAudioRef.current = null;
        };

        voiceSound.onerror = () => {
          if ("speechSynthesis" in window) {
            const utterance = new SpeechSynthesisUtterance(
              `${profile.name}. ${profile.role}. Dex register number ${profile.dexNumber}. Specializes in low-level systems in C and deep learning models. Affiliated with Next Tech Lab.`
            );
            utterance.rate = 0.95;
            utterance.pitch = 0.9;
            utterance.onend = () => setAudioMode("idle");
            utterance.onerror = () => setAudioMode("idle");
            window.speechSynthesis.speak(utterance);
          } else {
            setAudioMode("idle");
          }
        };

        voiceSound.play().catch(() => {
          setAudioMode("idle");
        });
      };

      scanSound.onended = onScanDone;
      scanSound.onerror = onScanDone;
      scanSound.play().catch(onScanDone);
    } catch {
      setAudioMode("idle");
    }
  };

  const playRayquazaCry = () => {
    if (audioMode === "cry") {
      stopAudio();
      return;
    }
    stopAudio();
    setAudioMode("cry");

    try {
      const crySound = new Audio("/sounds/rayquaza_cry.mp3");
      crySound.volume = 0.75;
      activeAudioRef.current = crySound;

      crySound.onended = () => {
        setAudioMode("idle");
        activeAudioRef.current = null;
      };
      crySound.onerror = () => {
        setAudioMode("idle");
        activeAudioRef.current = null;
      };
      crySound.play().catch(() => {
        setAudioMode("idle");
      });

      const canvas = document.querySelector("canvas");
      if (canvas) {
        const rect = canvas.getBoundingClientRect();
        const clickEvent = new MouseEvent("click", {
          clientX: rect.width * 0.75,
          clientY: rect.height * 0.25,
          bubbles: true,
        });
        canvas.dispatchEvent(clickEvent);
      }
    } catch {
      setAudioMode("idle");
    }
  };

  return (
    <section className="pt-6 pb-8 md:pt-10 md:pb-12 bg-transparent relative z-10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="pokedex-chassis rounded-2xl p-3 sm:p-5 relative">
          <div className="flex items-center justify-between px-2 sm:px-3 pt-1 pb-3 border-b-2 border-red-900/60">
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-full pokedex-optic-lens relative flex items-center justify-center flex-shrink-0 cursor-pointer transition-transform hover:scale-105"
                onClick={audioMode === "idle" ? playDexVoice : stopAudio}
                title="Pokédex Optical Sensor (Click to Scan & Readout)"
              >
                <div className="w-3.5 h-3.5 rounded-full bg-white/70 absolute top-1.5 left-2 blur-[0.3px]" />
                <span
                  className={`w-2 h-2 rounded-full bg-cyan-200 ${audioMode !== "idle" ? "animate-ping opacity-100" : "animate-pulse opacity-75"
                    }`}
                />
              </div>

              <div className="flex items-center gap-2">
                <div className="w-3.5 h-3.5 rounded-full pokedex-led-red animate-pulse" title="System Power" />
                <div className="w-3.5 h-3.5 rounded-full pokedex-led-yellow" title="Memory Register" />
                <div className="w-3.5 h-3.5 rounded-full pokedex-led-green animate-pulse" title="Radar Active" />
              </div>
            </div>

            <div className="flex items-center gap-3 text-right font-mono">
              <div className="hidden sm:flex flex-col items-end">
                <span className="text-[10px] text-red-200/90 tracking-widest font-bold">DEVON CORP. HOENN OS</span>
                <span className="text-[9px] text-red-300/70">MODEL: PKMN-EMERALD // NO. {profile.dexNumber}</span>
              </div>
              <div className="flex flex-col gap-1 pr-1">
                <div className="w-8 h-1 bg-red-950/70 rounded-sm" />
                <div className="w-8 h-1 bg-red-950/70 rounded-sm" />
                <div className="w-8 h-1 bg-red-950/70 rounded-sm" />
              </div>
            </div>
          </div>

          <div className="pokedex-screen-bezel rounded-xl p-2 sm:p-3.5 mt-3">
            <div className="pokedex-screen-display rounded-lg p-5 sm:p-8 text-zinc-900 relative overflow-hidden">
              <div className="flex flex-wrap items-center justify-between gap-2 pb-4 mb-6 border-b border-zinc-200 text-xs font-mono text-zinc-500">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="font-bold text-zinc-800">DEX REGISTER #{profile.dexNumber}</span>
                  <span className="text-zinc-300">·</span>
                  <span>{profile.region.toUpperCase()} REGIONAL</span>
                </div>
                <div className="flex flex-wrap items-center gap-2 text-[11px]">
                  <span className="px-2 py-0.5 rounded bg-zinc-100 border border-zinc-300 font-semibold text-zinc-700">
                    SPECIALTY: AI & SYSTEMS
                  </span>
                  <span className="text-zinc-500 hidden sm:inline">
                    {profile.university} · {profile.degree.replace("in ", "")} · {profile.period}
                  </span>
                  <span className="text-zinc-300 hidden md:inline">·</span>
                  <span className="text-zinc-500 hidden md:inline">
                    {profile.homeLocation}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start mb-8">
                <div className="md:col-span-7 space-y-4">
                  <div>
                    <h1 className="text-3xl sm:text-5xl md:text-6xl font-normal tracking-tight text-zinc-950 font-sans leading-none">
                      {profile.name}<span className="text-[#dc2626] font-serif italic">*</span>
                    </h1>
                    <div className="text-lg sm:text-xl md:text-2xl text-zinc-600 font-serif italic font-normal mt-1">
                      {profile.role}
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 pt-1">
                    <span className="pokedex-type-dragon px-2.5 py-1 rounded text-[11px] font-mono font-bold tracking-wider shadow-sm">
                      SYSTEMS // C
                    </span>
                    <span className="pokedex-type-electric px-2.5 py-1 rounded text-[11px] font-mono font-bold tracking-wider shadow-sm">
                      MACHINE LEARNING // PYTHON
                    </span>
                    <span className="pokedex-type-steel px-2.5 py-1 rounded text-[11px] font-mono font-bold tracking-wider shadow-sm">
                      SECURITY // EMBEDDED
                    </span>
                  </div>

                  <div className="p-3.5 rounded-md bg-zinc-100/90 border border-zinc-200/90 font-sans text-xs sm:text-sm text-zinc-700 leading-relaxed shadow-inner">
                    <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-zinc-500 mb-1">
                      Pokédex Entry // Profile
                    </div>
                    {profile.pokedexEntry}
                  </div>

                  <div className="space-y-2 pt-2">
                    <div className="text-[11px] font-mono font-bold text-zinc-600 uppercase tracking-wider flex items-center gap-1.5">
                      <Zap className="w-3 h-3 text-amber-500" />
                      <span>Core Focus Areas</span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 font-mono text-[11px]">
                      {focusAreas.map((area) => (
                        <div key={area.id} className="p-2 rounded bg-zinc-100/90 border border-zinc-200/80">
                          <span className={`font-bold block ${area.id === "systems"
                              ? "text-emerald-700"
                              : area.id === "ml"
                                ? "text-cyan-700"
                                : area.id === "security"
                                  ? "text-amber-700"
                                  : "text-zinc-700"
                            }`}>
                            {area.title}
                          </span>
                          <span className="text-zinc-600 text-[10px]">{area.subtitle}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right Column: Pokédex Target Scanner Viewport (Aadrit's Portrait) */}
                <div className="md:col-span-5 flex flex-col items-center md:items-end justify-center">
                  <div className="relative">
                    {/* Scanner Top Bar */}
                    <div className="flex items-center justify-between text-[10px] font-mono text-zinc-500 px-1 pb-1">
                      <span className="flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping" />
                        <span className="font-bold text-zinc-700">OPTICAL SCAN</span>
                      </span>
                      <span>TARGET: 0384</span>
                    </div>

                    {/* Main Scanner Screen Container */}
                    <div
                      id="aadrit-portrait"
                      className="relative w-44 h-44 sm:w-48 sm:h-48 rounded-md border-2 border-emerald-500/70 bg-zinc-950 p-1.5 shadow-xl transition-all duration-300 group"
                    >
                      {/* Corner Reticle Brackets */}
                      <div className="absolute top-1 left-1 w-2.5 h-2.5 border-t-2 border-l-2 border-emerald-400 z-10" />
                      <div className="absolute top-1 right-1 w-2.5 h-2.5 border-t-2 border-r-2 border-emerald-400 z-10" />
                      <div className="absolute bottom-1 left-1 w-2.5 h-2.5 border-b-2 border-l-2 border-emerald-400 z-10" />
                      <div className="absolute bottom-1 right-1 w-2.5 h-2.5 border-b-2 border-r-2 border-emerald-400 z-10" />

                      {/* Photo Viewport */}
                      <div className="relative w-full h-full rounded-xs overflow-hidden bg-zinc-900">
                        <Image
                          src="/images/aadrit.png"
                          alt="Aadrit"
                          fill
                          priority
                          sizes="(max-width: 768px) 176px, 192px"
                          className="object-cover object-top"
                        />
                      </div>
                    </div>

                    {/* Audio Synthesizer */}
                    <div className="mt-3 w-full space-y-2">
                      <div className="p-2 rounded bg-zinc-100 border border-zinc-200 text-[10px] font-mono text-zinc-700 flex items-center justify-between gap-2">
                        <div className="flex items-center gap-1.5 min-w-0">
                          <span
                            className={`w-2 h-2 rounded-full flex-shrink-0 ${audioMode === "voice"
                              ? "bg-emerald-500 animate-ping"
                              : audioMode === "cry"
                                ? "bg-amber-500 animate-ping"
                                : "bg-emerald-500"
                              }`}
                          />
                          <span className="font-bold truncate text-zinc-800">
                            {audioMode === "voice"
                              ? "TRANSMITTING DEX ENTRY..."
                              : audioMode === "cry"
                                ? "RAYQUAZA CRY #0384..."
                                : "DEX AUDIO: READY"}
                          </span>
                        </div>
                        <div className="flex items-end gap-0.5 h-3 flex-shrink-0" title="Audio Spectrum">
                          <span
                            className={`w-0.5 bg-emerald-600 rounded-xs transition-all duration-150 ${audioMode !== "idle" ? "h-3 animate-pulse" : "h-1"
                              }`}
                          />
                          <span
                            className={`w-0.5 bg-emerald-600 rounded-xs transition-all duration-150 delay-75 ${audioMode !== "idle" ? "h-2 animate-pulse" : "h-1.5"
                              }`}
                          />
                          <span
                            className={`w-0.5 bg-emerald-600 rounded-xs transition-all duration-150 delay-150 ${audioMode !== "idle" ? "h-3.5 animate-pulse" : "h-1"
                              }`}
                          />
                          <span
                            className={`w-0.5 bg-emerald-600 rounded-xs transition-all duration-150 delay-100 ${audioMode !== "idle" ? "h-2.5 animate-pulse" : "h-2"
                              }`}
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-1.5">
                        <button
                          onClick={playDexVoice}
                          className={`pokedex-btn-action flex items-center justify-center gap-1 text-[11px] py-2 px-1.5 font-mono transition-colors ${audioMode === "voice"
                            ? "bg-emerald-600 text-white border-emerald-400 font-bold"
                            : "bg-zinc-900 hover:bg-zinc-800 text-emerald-400 border border-emerald-500/50"
                            }`}
                          title="Play Pokédex voice entry"
                        >
                          {audioMode === "voice" ? (
                            <VolumeX className="w-3.5 h-3.5 text-white flex-shrink-0" />
                          ) : (
                            <Volume2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                          )}
                          <span className="truncate">{audioMode === "voice" ? "STOP VOICE" : "DEX VOICE"}</span>
                        </button>

                        <button
                          onClick={playRayquazaCry}
                          className={`pokedex-btn-action flex items-center justify-center gap-1 text-[11px] py-2 px-1.5 font-mono transition-colors ${audioMode === "cry"
                            ? "bg-amber-600 text-white border-amber-400 font-bold"
                            : "bg-zinc-900 hover:bg-zinc-800 text-amber-400 border border-amber-500/50"
                            }`}
                          title="Play Rayquaza cry (No. 384)"
                        >
                          {audioMode === "cry" ? (
                            <VolumeX className="w-3.5 h-3.5 text-white flex-shrink-0" />
                          ) : (
                            <Zap className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
                          )}
                          <span className="truncate">{audioMode === "cry" ? "STOP CRY" : "PKMN CRY"}</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Affiliations Bar */}
              <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs font-mono text-zinc-600 mb-6 pb-4 border-b border-zinc-200">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#dc2626]" />
                  <span className="text-zinc-900 font-bold">Lab:</span>
                  <a
                    href="https://www.ntlap.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-zinc-950 underline decoration-zinc-300 transition-colors"
                  >
                    Next Tech Lab (Member)
                  </a>
                </span>
                <span className="text-zinc-300 hidden sm:inline">·</span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-cyan-600" />
                  <span className="text-zinc-900 font-bold">Community:</span> FOSS SRMAP (Co-Lead)
                </span>
                <span className="text-zinc-300 hidden sm:inline">·</span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-amber-500" />
                  <span className="text-zinc-900 font-bold">Academic:</span> {profile.university} ({profile.period})
                </span>
                <span className="text-zinc-300 hidden sm:inline">·</span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span className="text-zinc-900 font-bold">Location:</span> {profile.homeLocation}
                </span>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3">
                <a
                  href="#work"
                  className="pokedex-btn-action bg-zinc-950 text-white hover:bg-zinc-800 border border-zinc-900 flex items-center gap-2 group"
                >
                  <span className="text-red-400 font-mono font-bold">A</span>
                  <span>Selected Work // TMs</span>
                  <ArrowDown className="w-3.5 h-3.5 transition-transform group-hover:translate-y-0.5 text-emerald-400" />
                </a>

                <a
                  href="#experience"
                  className="pokedex-btn-action bg-white text-zinc-900 hover:bg-zinc-100 border border-zinc-300 flex items-center gap-2"
                >
                  <span className="text-blue-600 font-mono font-bold">B</span>
                  <span>Experience & Roles</span>
                </a>

                <a
                  href={profile.contact.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pokedex-btn-action bg-zinc-100 text-zinc-800 hover:bg-zinc-200 border border-zinc-300 flex items-center gap-1.5"
                >
                  <Github className="w-3.5 h-3.5 text-zinc-700" />
                  <span>GitHub</span>
                  <ArrowUpRight className="w-3 h-3 text-zinc-400" />
                </a>

                <a
                  href={profile.contact.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pokedex-btn-action bg-zinc-100 text-zinc-800 hover:bg-zinc-200 border border-zinc-300 flex items-center gap-1.5"
                >
                  <Linkedin className="w-3.5 h-3.5 text-cyan-600" />
                  <span>LinkedIn</span>
                  <ArrowUpRight className="w-3 h-3 text-zinc-400" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
