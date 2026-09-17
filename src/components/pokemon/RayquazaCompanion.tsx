"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import { Volume2, VolumeX, Sparkles, Eye, EyeOff, Wind, Footprints, Compass } from "lucide-react";

type MovementMode = "flying" | "crawling" | "auto";
type SpriteId = "pixel" | "crawl" | "3d" | "shiny";

interface SpriteConfig {
  src: string;
  width: number;
  height: number;
  label: string;
  naturalFacing: "left" | "right"; // Direction sprite faces in original GIF
}

const SPRITE_CONFIGS: Record<SpriteId, SpriteConfig> = {
  pixel: {
    src: "/images/rayquaza.gif",
    width: 110,
    height: 98,
    label: "Gen 5 Pixel",
    naturalFacing: "left",
  },
  crawl: {
    src: "/images/rayquaza_crawl.gif",
    width: 90,
    height: 130,
    label: "PMD Crawl",
    naturalFacing: "right",
  },
  "3d": {
    src: "/images/rayquaza_moving.gif",
    width: 140,
    height: 150,
    label: "3D Flight",
    naturalFacing: "left",
  },
  shiny: {
    src: "/images/rayquaza_shiny.gif",
    width: 140,
    height: 150,
    label: "Shiny Black",
    naturalFacing: "left",
  },
};

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  color: string;
  size: number;
}

export default function RayquazaCompanion() {
  const [movementMode, setMovementMode] = useState<MovementMode>("auto");
  const [spriteId, setSpriteId] = useState<SpriteId>("pixel");
  const [activeMode, setActiveMode] = useState<"flying" | "crawling">("flying");
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [showControls, setShowControls] = useState(false);
  const [isSpinning, setIsSpinning] = useState(false);
  const [isRoaring, setIsRoaring] = useState(false);

  // Position & physics refs (60fps animation without React re-renders)
  const posRef = useRef({ x: 200, y: 300 });
  const targetRef = useRef({ x: 200, y: 300 });
  const velocityRef = useRef({ vx: 0, vy: 0 });
  const facingRightRef = useRef(false);
  const tiltRef = useRef(0);
  const isMovingRef = useRef(false);
  const currentModeRef = useRef<"flying" | "crawling">("flying");
  const lastMouseTimeRef = useRef(Date.now());
  const mousePosRef = useRef({ x: 200, y: 300 });
  const rafRef = useRef<number | null>(null);
  const spriteElRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Synchronize currentModeRef with movementMode
  useEffect(() => {
    if (movementMode !== "auto") {
      currentModeRef.current = movementMode;
      setActiveMode(movementMode);
      // Automatically choose best sprite if user hasn't overridden
      if (movementMode === "crawling" && spriteId !== "crawl") {
        setSpriteId("crawl");
      } else if (movementMode === "flying" && spriteId === "crawl") {
        setSpriteId("pixel");
      }
    }
  }, [movementMode, spriteId]);

  // Play Rayquaza cry audio
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
      setTimeout(() => setIsRoaring(false), 850);
    } catch {
      // Audio playback policy fallback
    }
  }, []);

  // Trigger spin/swoop animation (Dragon Dance / Barrel Roll)
  const triggerSpin = useCallback(() => {
    setIsSpinning(true);
    const pos = posRef.current;
    // Spawn burst particles around Rayquaza
    for (let i = 0; i < 18; i++) {
      const angle = (Math.PI * 2 * i) / 18;
      const speed = 2.5 + Math.random() * 4;
      particlesRef.current.push({
        x: pos.x,
        y: pos.y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 1,
        maxLife: 32 + Math.random() * 20,
        color: i % 2 === 0 ? "#10b981" : "#fbbf24",
        size: 3 + Math.random() * 3.5,
      });
    }
    setTimeout(() => setIsSpinning(false), 650);
  }, []);

  // Setup Event Listeners
  useEffect(() => {
    const initX = typeof window !== "undefined" ? window.innerWidth * 0.75 : 200;
    const initY = typeof window !== "undefined" ? window.innerHeight * 0.4 : 300;
    posRef.current = { x: initX, y: initY };
    targetRef.current = { x: initX, y: initY };
    mousePosRef.current = { x: initX, y: initY };

    // 1. Mouse Move Listener
    const handleMouseMove = (e: MouseEvent) => {
      lastMouseTimeRef.current = Date.now();
      mousePosRef.current = { x: e.clientX, y: e.clientY };

      const vh = window.innerHeight;
      const isGroundZone = e.clientY > vh - 130;

      // Handle Auto Mode mode-switching
      if (movementMode === "auto") {
        const nextMode = isGroundZone ? "crawling" : "flying";
        if (currentModeRef.current !== nextMode) {
          currentModeRef.current = nextMode;
          setActiveMode(nextMode);
          if (nextMode === "crawling") {
            setSpriteId("crawl");
          } else {
            setSpriteId("pixel");
          }
        }
      }

      // Compute targets based on active mode
      if (currentModeRef.current === "crawling") {
        // Ground Crawler: Snapped to bottom edge, tracks mouse X
        targetRef.current = {
          x: e.clientX,
          y: vh - 80,
        };
      } else {
        // Sky Soarer: Flies freely in the air alongside cursor
        const offsetDirection = e.clientX > posRef.current.x ? -60 : 60;
        targetRef.current = {
          x: e.clientX + offsetDirection,
          y: Math.max(70, Math.min(vh - 120, e.clientY - 30)),
        };
      }
    };

    // 2. Click Listener: Dragon Ascent / Strike
    const handleMouseDown = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (target?.closest("a, button, input, textarea, select, canvas, [role='button'], .companion-interactive")) {
        return;
      }
      triggerSpin();
      if (soundEnabled) {
        playCry();
      }
    };

    // 3. Wheel Scroll Listener: Aerial roll or quick slither
    let wheelCooldown = false;
    const handleWheel = () => {
      if (!wheelCooldown) {
        triggerSpin();
        wheelCooldown = true;
        setTimeout(() => {
          wheelCooldown = false;
        }, 1100);
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
        mousePosRef.current = { x: touch.clientX, y: touch.clientY };

        const vh = window.innerHeight;
        if (currentModeRef.current === "crawling") {
          targetRef.current = { x: touch.clientX, y: vh - 80 };
        } else {
          targetRef.current = { x: touch.clientX, y: touch.clientY - 40 };
        }
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
    };
  }, [movementMode, triggerSpin, playCry, soundEnabled]);

  // Main 60fps Animation Loop with Crawling & Flying Physics
  useEffect(() => {
    if (!isVisible) return;

    let time = 0;
    let particleCounter = 0;

    const animate = () => {
      time += 0.035;
      const now = Date.now();
      const isIdle = now - lastMouseTimeRef.current > 3600;
      const vh = typeof window !== "undefined" ? window.innerHeight : 800;
      const vw = typeof window !== "undefined" ? window.innerWidth : 1200;
      const mode = currentModeRef.current;

      // 1. Idle Behavior
      if (isIdle) {
        if (mode === "crawling") {
          // Crawling Idle: Slithers smoothly back and forth along the bottom floor
          const patrolCenter = vw * 0.5;
          const patrolSpan = vw * 0.35;
          targetRef.current = {
            x: patrolCenter + Math.sin(time * 0.4) * patrolSpan,
            y: vh - 80,
          };
        } else {
          // Flying Idle: Soars in majestic panoramic figure-8 loops across the sky
          const skyCenterX = vw * 0.5;
          const skyCenterY = vh * 0.4;
          targetRef.current = {
            x: skyCenterX + Math.cos(time * 0.5) * (vw * 0.36),
            y: skyCenterY + Math.sin(time * 1.0) * (vh * 0.2),
          };
        }
      }

      // 2. Movement & Physics Interpolation
      const current = posRef.current;
      const target = targetRef.current;

      const dx = target.x - current.x;
      const dy = target.y - current.y;
      const dist = Math.hypot(dx, dy);

      // Facing Direction: correctly detect if moving right or left
      if (Math.abs(dx) > 3) {
        facingRightRef.current = dx > 0;
      }

      // Velocity interpolation (smooth acceleration and drag)
      let lerpSpeed = mode === "crawling" ? 0.05 : dist > 250 ? 0.048 : 0.035;
      current.x += dx * lerpSpeed;
      current.y += dy * lerpSpeed;

      velocityRef.current = { vx: dx * lerpSpeed, vy: dy * lerpSpeed };
      isMovingRef.current = dist > (mode === "crawling" ? 25 : 35);

      // 3. Movement Animation Nuances: Flying vs Crawling
      let displayY = current.y;
      let rotation = 0;

      if (mode === "flying") {
        // FLYING MOVEMENT:
        // Undulating serpentine flight sine-wave (dragon slithering through the sky)
        const wave = Math.sin(time * 5.2) * (isMovingRef.current ? 12 : 6);
        displayY += wave;

        // Banking Angle: tilts into curves and dives/ascends
        const flightPitch = Math.max(-22, Math.min(22, (dy / 8) * (facingRightRef.current ? 1 : -1)));
        tiltRef.current += (flightPitch - tiltRef.current) * 0.12;
        rotation = isSpinning ? (facingRightRef.current ? 360 : -360) : tiltRef.current;
      } else {
        // CRAWLING MOVEMENT:
        // Slithering crawl along the ground: slight horizontal sine ripple
        const crawlRipple = Math.sin(time * 6.5) * (isMovingRef.current ? 3 : 1);
        displayY += crawlRipple;
        // Keep grounded, 0 flight tilt
        tiltRef.current += (0 - tiltRef.current) * 0.2;
        rotation = isSpinning ? (facingRightRef.current ? 360 : -360) : 0;
      }

      // 4. Render to Sprite via GPU Transform (0 layout reflow)
      if (spriteElRef.current) {
        const config = SPRITE_CONFIGS[spriteId];
        // Correct horizontal flip taking into account original sprite facing
        let scaleX = 1;
        if (config.naturalFacing === "left") {
          scaleX = facingRightRef.current ? -1 : 1;
        } else {
          scaleX = facingRightRef.current ? 1 : -1;
        }

        spriteElRef.current.style.transform = `translate3d(${current.x}px, ${displayY}px, 0) scaleX(${scaleX}) rotate(${rotation}deg)`;
      }

      // 5. Particle Trail (Dragon energy in sky or dust motes on ground)
      particleCounter++;
      if (particleCounter % (isMovingRef.current ? 3 : 7) === 0) {
        const isGround = mode === "crawling";
        particlesRef.current.push({
          x: current.x + (facingRightRef.current ? -30 : 30) + (Math.random() * 10 - 5),
          y: displayY + (isGround ? 25 : 10) + (Math.random() * 8 - 4),
          vx: (Math.random() - 0.5) * 0.8,
          vy: isGround ? -Math.random() * 0.6 : Math.random() * 0.6 + 0.2,
          life: 1,
          maxLife: isGround ? 22 : 30,
          color: isGround ? (Math.random() > 0.5 ? "#10b981" : "#6ee7b7") : Math.random() > 0.4 ? "#10b981" : "#f59e0b",
          size: Math.random() * 2.5 + 1.2,
        });
      }

      // 6. Draw Particles on 2D Canvas
      const canvas = canvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          const alive: Particle[] = [];

          for (let i = 0; i < particlesRef.current.length; i++) {
            const p = particlesRef.current[i];
            p.x += p.vx;
            p.y += p.vy;
            p.life -= 1 / p.maxLife;

            if (p.life > 0) {
              alive.push(p);
              ctx.save();
              ctx.globalAlpha = p.life * 0.7;
              ctx.fillStyle = p.color;
              ctx.shadowColor = p.color;
              ctx.shadowBlur = 5;
              ctx.beginPath();
              ctx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2);
              ctx.fill();
              ctx.restore();
            }
          }
          particlesRef.current = alive;
        }
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [isVisible, isSpinning, spriteId]);

  // Sync canvas size
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

  const currentConfig = SPRITE_CONFIGS[spriteId];

  return (
    <>
      {/* 1. Fullscreen Particle Canvas */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-30 select-none"
        style={{ width: "100vw", height: "100vh" }}
      />

      {/* 2. Rayquaza Interactive Screen Companion */}
      {isVisible && (
        <div
          ref={spriteElRef}
          onClick={() => {
            triggerSpin();
            playCry();
          }}
          className="fixed top-0 left-0 z-40 -ml-14 -mt-14 pointer-events-auto cursor-pointer select-none group touch-none"
          title={`${activeMode === "flying" ? "Flying" : "Crawling"} Rayquaza &middot; Click for Dragon Ascent`}
          style={{
            transition: isSpinning ? "transform 0.65s cubic-bezier(0.4, 0, 0.2, 1)" : "none",
            willChange: "transform",
          }}
        >
          {/* Dragon Roar / Ascent Pulse Aura */}
          {isRoaring && (
            <div className="absolute inset-0 -m-7 rounded-full border-2 border-emerald-400 animate-ping pointer-events-none opacity-80" />
          )}

          {/* Ground Slither Shadow when Crawling */}
          {activeMode === "crawling" && (
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-24 h-3 bg-black/15 rounded-full blur-xs pointer-events-none" />
          )}

          {/* Sprite Frame */}
          <div className="relative w-28 h-28 flex items-center justify-center filter drop-shadow-[0_4px_12px_rgba(5,150,105,0.3)] transition-transform duration-200 group-hover:scale-110">
            <Image
              src={currentConfig.src}
              alt="Rayquaza Companion"
              width={currentConfig.width}
              height={currentConfig.height}
              unoptimized
              className="w-full h-full object-contain pointer-events-none"
              style={{
                imageRendering: spriteId === "pixel" || spriteId === "crawl" ? "pixelated" : "auto",
              }}
            />
          </div>
        </div>
      )}

      {/* 3. Floating Companion Dock with Movement & Style Controls */}
      <div className="fixed bottom-4 right-4 z-40 flex items-center gap-2 companion-interactive">
        {showControls && (
          <div className="flex flex-wrap items-center gap-2 p-2 rounded-2xl sm:rounded-full bg-white/95 border border-zinc-200 shadow-xl backdrop-blur-md transition-all duration-300 animate-in fade-in slide-in-from-right-3 max-w-[90vw]">
            {/* Movement Mode Selector: Flying / Crawling / Auto */}
            <div className="flex items-center gap-1 bg-zinc-100 p-0.5 rounded-full border border-zinc-200/80">
              <button
                type="button"
                onClick={() => setMovementMode("flying")}
                className={`inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-mono rounded-full font-semibold transition-all ${
                  movementMode === "flying"
                    ? "bg-emerald-600 text-white shadow-xs"
                    : "text-zinc-600 hover:text-zinc-950 hover:bg-zinc-200/60"
                }`}
                title="Flying Mode: Soar through the sky"
              >
                <Wind className="w-3 h-3" />
                <span>Fly</span>
              </button>
              <button
                type="button"
                onClick={() => setMovementMode("crawling")}
                className={`inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-mono rounded-full font-semibold transition-all ${
                  movementMode === "crawling"
                    ? "bg-emerald-600 text-white shadow-xs"
                    : "text-zinc-600 hover:text-zinc-950 hover:bg-zinc-200/60"
                }`}
                title="Crawling Mode: Slither along the ground/screen"
              >
                <Footprints className="w-3 h-3" />
                <span>Crawl</span>
              </button>
              <button
                type="button"
                onClick={() => setMovementMode("auto")}
                className={`inline-flex items-center gap-1 px-2 py-1 text-[11px] font-mono rounded-full font-semibold transition-all ${
                  movementMode === "auto"
                    ? "bg-emerald-600 text-white shadow-xs"
                    : "text-zinc-600 hover:text-zinc-950 hover:bg-zinc-200/60"
                }`}
                title="Auto Mode: Fly in the air, crawl near the bottom"
              >
                <Compass className="w-3 h-3" />
                <span>Auto</span>
              </button>
            </div>

            {/* Sprite Switcher */}
            <div className="hidden sm:flex items-center gap-1">
              {(["pixel", "crawl", "3d", "shiny"] as SpriteId[]).map((id) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => setSpriteId(id)}
                  className={`px-2 py-1 text-[10px] font-mono rounded-md font-semibold transition-all ${
                    spriteId === id
                      ? "bg-zinc-900 text-white shadow-xs"
                      : "text-zinc-600 hover:text-zinc-950 hover:bg-zinc-100"
                  }`}
                  title={`Select ${SPRITE_CONFIGS[id].label}`}
                >
                  {id === "pixel" ? "Pixel" : id === "crawl" ? "Slither" : id === "3d" ? "3D" : "Shiny"}
                </button>
              ))}
            </div>

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

        {/* Master Companion Dock Pill */}
        <button
          type="button"
          onClick={() => setShowControls(!showControls)}
          className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/95 hover:bg-white border border-zinc-200 shadow-sm hover:shadow-md text-xs font-mono font-medium text-zinc-800 transition-all hover:border-emerald-500/60 cursor-pointer"
          title="Toggle Rayquaza Movement & Settings"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[11px] font-semibold text-zinc-900 capitalize">
            {activeMode === "flying" ? "🦅 Flying" : "🐍 Crawling"}
          </span>
          <Sparkles className="w-3 h-3 text-emerald-600" />
        </button>
      </div>
    </>
  );
}
