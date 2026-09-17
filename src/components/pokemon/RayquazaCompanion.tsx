"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import { Volume2, VolumeX, Sparkles, Eye, EyeOff, Shield } from "lucide-react";

type SpriteMode = "pixel" | "3d" | "shiny";

interface Particle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  color: string;
  size: number;
}

const SPRITE_CONFIGS: Record<SpriteMode, { src: string; width: number; height: number; label: string }> = {
  pixel: {
    src: "/images/rayquaza.gif",
    width: 110,
    height: 98,
    label: "Pixel (Gen 5)",
  },
  "3d": {
    src: "/images/rayquaza_moving.gif",
    width: 142,
    height: 153,
    label: "3D Animated",
  },
  shiny: {
    src: "/images/rayquaza_shiny.gif",
    width: 142,
    height: 153,
    label: "Shiny Black",
  },
};

export default function RayquazaCompanion() {
  const [spriteMode, setSpriteMode] = useState<SpriteMode>("pixel");
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [showControls, setShowControls] = useState(false);
  const [isSpinning, setIsSpinning] = useState(false);
  const [isRoaring, setIsRoaring] = useState(false);

  // Position & physics refs (avoiding React state re-renders at 60fps)
  const posRef = useRef({ x: 200, y: 300 });
  const targetRef = useRef({ x: 200, y: 300 });
  const flipXRef = useRef(false);
  const tiltRef = useRef(0);
  const isMovingRef = useRef(false);
  const lastMouseTimeRef = useRef(Date.now());
  const rafRef = useRef<number | null>(null);
  const spriteElRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Play Rayquaza cry
  const playCry = useCallback(() => {
    try {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
      const cry = new Audio("/sounds/rayquaza_cry.mp3");
      cry.volume = 0.55;
      audioRef.current = cry;
      cry.play().catch(() => {});
      setIsRoaring(true);
      setTimeout(() => setIsRoaring(false), 900);
    } catch {
      // Audio autoplay policy fallback
    }
  }, []);

  // Trigger spin animation (Dragon Dance)
  const triggerSpin = useCallback(() => {
    setIsSpinning(true);
    // Spawn burst particles
    const pos = posRef.current;
    for (let i = 0; i < 16; i++) {
      const angle = (Math.PI * 2 * i) / 16;
      const speed = 2 + Math.random() * 3.5;
      particlesRef.current.push({
        id: Math.random(),
        x: pos.x,
        y: pos.y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 1,
        maxLife: 30 + Math.random() * 20,
        color: i % 2 === 0 ? "#10b981" : "#f59e0b",
        size: 3 + Math.random() * 3,
      });
    }
    setTimeout(() => setIsSpinning(false), 600);
  }, []);

  // Setup position and event listeners
  useEffect(() => {
    // Initial center position
    const initX = typeof window !== "undefined" ? window.innerWidth * 0.8 : 200;
    const initY = typeof window !== "undefined" ? window.innerHeight * 0.4 : 300;
    posRef.current = { x: initX, y: initY };
    targetRef.current = { x: initX, y: initY };

    // 1. Mouse Move Listener
    const handleMouseMove = (e: MouseEvent) => {
      lastMouseTimeRef.current = Date.now();
      // Offset slightly so Rayquaza flies alongside the cursor without blocking clicks
      const offsetDirection = e.clientX < posRef.current.x ? 55 : -55;
      targetRef.current = {
        x: e.clientX + offsetDirection,
        y: e.clientY - 25,
      };
    };

    // 2. Click Listener (ignore clicks on interactive elements)
    const handleMouseDown = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (
        target?.closest("a, button, input, textarea, select, canvas, [role='button'], .companion-interactive")
      ) {
        return;
      }
      triggerSpin();
      if (soundEnabled) {
        playCry();
      }
    };

    // 3. Wheel Scroll Listener (just like Zoro spins on wheel on rohanm.me!)
    let wheelTimeout: NodeJS.Timeout | null = null;
    const handleWheel = () => {
      if (!wheelTimeout) {
        triggerSpin();
        wheelTimeout = setTimeout(() => {
          wheelTimeout = null;
        }, 1200);
      }
    };

    // 4. Keyboard Shortcuts: Space, S, D
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }
      if (e.code === "Space" || e.code === "KeyS" || e.code === "KeyD") {
        if (e.code === "Space") e.preventDefault();
        triggerSpin();
        if (soundEnabled) {
          playCry();
        }
      }
    };

    // 5. Touch Support
    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        lastMouseTimeRef.current = Date.now();
        const touch = e.touches[0];
        targetRef.current = {
          x: touch.clientX,
          y: touch.clientY - 35,
        };
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("wheel", handleWheel, { passive: true });
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("touchmove", handleTouchMove, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("touchmove", handleTouchMove);
      if (wheelTimeout) clearTimeout(wheelTimeout);
    };
  }, [triggerSpin, playCry, soundEnabled]);

  // Main 60fps Animation Loop
  useEffect(() => {
    if (!isVisible) return;

    let time = 0;
    let particleSpawnTimer = 0;

    const animate = () => {
      time += 0.03;
      const now = Date.now();
      const isIdle = now - lastMouseTimeRef.current > 3800;

      // Ambient Soaring / Sky Patrol when mouse is idle (or on mobile)
      if (isIdle && typeof window !== "undefined") {
        const cx = window.innerWidth * 0.5;
        const cy = window.innerHeight * 0.45;
        const rx = window.innerWidth * 0.35;
        const ry = window.innerHeight * 0.22;
        targetRef.current = {
          x: cx + Math.cos(time * 0.6) * rx,
          y: cy + Math.sin(time * 1.2) * ry,
        };
      }

      // Smooth Easing Interpolation (Lerp) towards target
      const current = posRef.current;
      const target = targetRef.current;

      const dx = target.x - current.x;
      const dy = target.y - current.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      // Rayquaza movement speed: faster when further away, smooth gliding near target
      const lerpSpeed = dist > 200 ? 0.045 : 0.032;
      current.x += dx * lerpSpeed;
      current.y += dy * lerpSpeed;

      // Flip X to face movement direction
      if (Math.abs(dx) > 3) {
        flipXRef.current = dx < 0;
      }

      // Flight Banking Tilt: Serpentine banking based on vertical movement
      const flightTilt = Math.max(-20, Math.min(20, (dy / 8) * (flipXRef.current ? -1 : 1)));
      tiltRef.current += (flightTilt - tiltRef.current) * 0.1;

      // Hover bobbing sine wave when near target
      const hoverOffset = dist < 60 ? Math.sin(time * 3) * 6 : 0;
      isMovingRef.current = dist > 40;

      // Render Sprite position directly to DOM via transform (GPU accelerated, 0 reflow)
      if (spriteElRef.current) {
        const scaleX = flipXRef.current ? -1 : 1;
        const rotation = isSpinning ? (flipXRef.current ? -360 : 360) : tiltRef.current;
        spriteElRef.current.style.transform = `translate3d(${current.x}px, ${
          current.y + hoverOffset
        }px, 0) scaleX(${scaleX}) rotate(${rotation}deg)`;
      }

      // Particle Trail Logic
      particleSpawnTimer++;
      if (particleSpawnTimer % (isMovingRef.current ? 3 : 8) === 0) {
        particlesRef.current.push({
          id: Math.random(),
          x: current.x + (flipXRef.current ? 30 : -30) + (Math.random() * 12 - 6),
          y: current.y + 10 + (Math.random() * 12 - 6),
          vx: (Math.random() - 0.5) * 0.8,
          vy: Math.random() * 0.6 + 0.3,
          life: 1,
          maxLife: 28,
          color: Math.random() > 0.4 ? "#10b981" : "#34d399",
          size: Math.random() * 2.5 + 1.5,
        });
      }

      // Render Particles on Canvas
      const canvas = canvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          const aliveParticles: Particle[] = [];

          for (let i = 0; i < particlesRef.current.length; i++) {
            const p = particlesRef.current[i];
            p.x += p.vx;
            p.y += p.vy;
            p.life -= 1 / p.maxLife;

            if (p.life > 0) {
              aliveParticles.push(p);
              ctx.save();
              ctx.globalAlpha = p.life * 0.65;
              ctx.fillStyle = p.color;
              ctx.shadowColor = p.color;
              ctx.shadowBlur = 6;
              ctx.beginPath();
              ctx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2);
              ctx.fill();
              ctx.restore();
            }
          }
          particlesRef.current = aliveParticles;
        }
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [isVisible, isSpinning]);

  // Sync canvas size with viewport
  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current) {
        canvasRef.current.width = window.innerWidth;
        canvasRef.current.height = window.innerHeight;
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const config = SPRITE_CONFIGS[spriteMode];

  return (
    <>
      {/* 1. Fullscreen Canvas for Dragon Energy Trail Particles */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-30 select-none"
        style={{ width: "100vw", height: "100vh" }}
      />

      {/* 2. Rayquaza Screen Companion Sprite */}
      {isVisible && (
        <div
          ref={spriteElRef}
          onClick={() => {
            triggerSpin();
            playCry();
          }}
          className="fixed top-0 left-0 z-40 -ml-14 -mt-14 pointer-events-auto cursor-pointer select-none group touch-none"
          title="Rayquaza &middot; Click for Dragon Ascent"
          style={{
            transition: isSpinning ? "transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)" : "none",
            willChange: "transform",
          }}
        >
          {/* Ethereal Dragon Aura Ripple on roar */}
          {isRoaring && (
            <div className="absolute inset-0 -m-6 rounded-full border-2 border-emerald-400 animate-ping pointer-events-none opacity-75" />
          )}

          {/* Sprite image container */}
          <div className="relative w-28 h-28 flex items-center justify-center filter drop-shadow-[0_4px_14px_rgba(5,150,105,0.35)] transition-transform duration-200 group-hover:scale-110">
            <Image
              src={config.src}
              alt="Rayquaza Companion"
              width={config.width}
              height={config.height}
              unoptimized
              className="w-full h-full object-contain pointer-events-none"
              style={{
                imageRendering: spriteMode === "pixel" ? "pixelated" : "auto",
              }}
            />
          </div>
        </div>
      )}

      {/* 3. Sleek Floating Companion Controls Bar (Docked in bottom right) */}
      <div className="fixed bottom-4 right-4 z-40 flex items-center gap-2 companion-interactive">
        {showControls && (
          <div className="flex items-center gap-1.5 p-1.5 rounded-full bg-white/95 border border-zinc-200 shadow-md backdrop-blur-md transition-all duration-300 animate-in fade-in slide-in-from-right-3">
            {/* Sprite Style Switcher */}
            {(["pixel", "3d", "shiny"] as SpriteMode[]).map((mode) => (
              <button
                key={mode}
                type="button"
                onClick={() => setSpriteMode(mode)}
                className={`px-2.5 py-1 text-[11px] font-mono rounded-full font-semibold transition-all ${
                  spriteMode === mode
                    ? "bg-emerald-600 text-white shadow-xs"
                    : "text-zinc-600 hover:text-zinc-950 hover:bg-zinc-100"
                }`}
                title={`Switch to ${SPRITE_CONFIGS[mode].label}`}
              >
                {mode === "pixel" ? "Pixel" : mode === "3d" ? "3D" : "Shiny"}
              </button>
            ))}

            {/* Sound Toggle */}
            <button
              type="button"
              onClick={() => {
                const next = !soundEnabled;
                setSoundEnabled(next);
                if (next) playCry();
              }}
              className={`p-1.5 rounded-full transition-all ${
                soundEnabled
                  ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-200"
                  : "text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100"
              }`}
              title={soundEnabled ? "Mute Rayquaza Cry" : "Enable Rayquaza Cry on click"}
            >
              {soundEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
            </button>

            {/* Hide/Show Toggle */}
            <button
              type="button"
              onClick={() => setIsVisible(!isVisible)}
              className="p-1.5 rounded-full text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100 transition-all"
              title={isVisible ? "Hide Rayquaza" : "Show Rayquaza"}
            >
              {isVisible ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
            </button>
          </div>
        )}

        {/* Master Companion Pill Toggle */}
        <button
          type="button"
          onClick={() => setShowControls(!showControls)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/90 hover:bg-white border border-zinc-200 shadow-xs hover:shadow-md text-xs font-mono font-medium text-zinc-800 transition-all hover:border-emerald-500/60 cursor-pointer"
          title="Rayquaza Companion Settings"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[11px] font-semibold text-zinc-900">
            {isVisible ? "Rayquaza" : "Summon"}
          </span>
          <Sparkles className="w-3 h-3 text-emerald-600" />
        </button>
      </div>
    </>
  );
}
