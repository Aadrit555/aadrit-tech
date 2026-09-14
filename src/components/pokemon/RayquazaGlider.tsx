"use client";

import { useEffect, useRef, useState } from "react";

interface OzoneParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  alpha: number;
  life: number;
}

export default function RayquazaGlider() {
  const [dialogText, setDialogText] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const video = videoRef.current;
    if (!canvas || !video) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    // Offscreen canvas for real-time chroma keying of Google Flow studio background
    const offCanvas = document.createElement("canvas");
    const videoW = 380;
    const videoH = 214;
    offCanvas.width = videoW;
    offCanvas.height = videoH;
    const offCtx = offCanvas.getContext("2d", { willReadFrequently: true });

    // Flight physics & position
    let currentX = width * 0.55;
    let currentY = height * 0.18;
    let prevX = currentX;
    let ambientTime = 0;
    const particles: OzoneParticle[] = [];

    const render = () => {
      ambientTime += 0.025;
      ctx.clearRect(0, 0, width, height);

      // 1. Calculate scroll progress (0 to 1)
      const scrollY = window.scrollY;
      const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      const scrollProgress = Math.min(1, Math.max(0, scrollY / maxScroll));

      // 2. Real Rayquaza Serpentine S-curve Flight Path across Hoenn Skies
      const waveX = Math.sin(scrollProgress * Math.PI * 2.8 + ambientTime * 0.55);
      const waveY = Math.sin(scrollProgress * Math.PI * 2.2 + ambientTime * 1.1);

      const targetX = width * (0.5 + waveX * 0.36) - videoW / 2;
      const targetY = height * (0.12 + scrollProgress * 0.52) + waveY * 22;

      // Smooth follow interpolation
      currentX += (targetX - currentX) * 0.08;
      currentY += (targetY - currentY) * 0.08;

      const vx = currentX - prevX;
      prevX = currentX;
      const scaleX = vx < -0.3 ? -1 : vx > 0.3 ? 1 : 1;
      const angle = Math.max(-0.2, Math.min(0.2, vx * 0.012));

      // 3. Real-time Chroma-keying of Google Flow Real Rayquaza Video
      if (offCtx && video.readyState >= 2) {
        try {
          offCtx.drawImage(video, 0, 0, videoW, videoH);
          const frame = offCtx.getImageData(0, 0, videoW, videoH);
          const d = frame.data;

          // Studio background in Google Flow video is neutral vignette gray (r ~ g ~ b > 140)
          // Rayquaza's pixels are green, yellow, red, or dark black (non-neutral or dark)
          for (let i = 0; i < d.length; i += 4) {
            const r = d[i];
            const g = d[i + 1];
            const b = d[i + 2];
            const maxDiff = Math.max(Math.abs(r - g), Math.abs(g - b), Math.abs(r - b));
            const minVal = Math.min(r, g, b);

            if (maxDiff < 14 && minVal > 140) {
              // 100% transparent studio background
              d[i + 3] = 0;
            } else if (maxDiff < 20 && minVal > 130) {
              // Smooth antialiasing feather edge
              const factor = (maxDiff - 14) / 6;
              d[i + 3] = Math.round(d[i + 3] * factor);
            }
          }
          offCtx.putImageData(frame, 0, 0);

          // 4. Render the Real Rayquaza onto the Main Screen Canvas
          ctx.save();
          ctx.translate(currentX + (scaleX === -1 ? videoW : 0), currentY);
          ctx.scale(scaleX, 1);
          ctx.rotate(angle);
          ctx.drawImage(offCanvas, 0, 0, videoW, videoH);
          ctx.restore();
        } catch {
          // Fallback gracefully if CORS prevents direct frame read
        }
      }

      // 5. Tail Ozone Motes (Trails behind the Real Rayquaza)
      if (Math.random() < 0.55) {
        const tailX = currentX + (scaleX === 1 ? 50 : videoW - 50);
        const tailY = currentY + (videoH * 0.55);
        const colors = ["#34d399", "#10b981", "#fbbf24", "#6ee7b7", "#fef08a", "#059669"];
        particles.push({
          x: tailX + (Math.random() * 16 - 8),
          y: tailY + (Math.random() * 16 - 8),
          vx: (Math.random() - 0.5) * 1.5 - (scaleX * 1.5),
          vy: -Math.random() * 2 - 0.5,
          size: Math.random() < 0.5 ? 4 : 6,
          color: colors[Math.floor(Math.random() * colors.length)],
          alpha: 1,
          life: 36,
        });
      }

      // Draw Ozone Particles
      for (let pIdx = particles.length - 1; pIdx >= 0; pIdx--) {
        const p = particles[pIdx];
        p.x += p.vx;
        p.y += p.vy;
        p.alpha -= 1 / p.life;

        if (p.alpha <= 0) {
          particles.splice(pIdx, 1);
          continue;
        }

        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 6;
        ctx.fillRect(p.x, p.y, p.size, p.size);
        ctx.restore();
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    const handleClick = (e: MouseEvent) => {
      const clickX = e.clientX;
      const clickY = e.clientY;
      if (
        clickX >= currentX - 40 &&
        clickX <= currentX + videoW + 40 &&
        clickY >= currentY - 40 &&
        clickY <= currentY + videoH + 40
      ) {
        triggerDragonRoar();
      }
    };
    window.addEventListener("click", handleClick);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("click", handleClick);
    };
  }, []);

  const triggerDragonRoar = () => {
    const dialogs = [
      "★ REAL RAYQUAZA used DRAGON ASCENT!",
      "★ RAYQUAZA's Air Lock negated all weather conditions!",
      "★ Hoenn Legend RAYQUAZA is guarding Aadrit's Pokédex!",
      "★ RAYQUAZA roared across the Emerald skies!",
    ];
    setDialogText(dialogs[Math.floor(Math.random() * dialogs.length)]);
    setTimeout(() => {
      setDialogText(null);
    }, 4000);
  };

  return (
    <>
      {/* Hidden Video Feed of the Real Rayquaza from Google Flow */}
      <video
        ref={videoRef}
        src="/images/flow_rayquaza.mp4"
        autoPlay
        loop
        muted
        playsInline
        className="hidden"
      />

      {/* 60fps Hardware-Accelerated Chroma-Keyed Canvas */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-30 select-none"
        style={{ imageRendering: "pixelated" }}
      />

      {/* Retro Pokédex Dialogue Box on Click */}
      {dialogText && (
        <div className="fixed bottom-6 right-6 z-50 animate-in fade-in slide-in-from-bottom-3 duration-300 max-w-sm pointer-events-auto select-none">
          <div className="bg-zinc-950/95 border-2 border-emerald-500 p-4 rounded-md shadow-2xl text-white font-mono">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-2 mb-2">
              <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-bold uppercase tracking-wider">
                <span className="w-2 h-2 bg-emerald-400 inline-block animate-pulse" />
                <span>Hoenn Sky Pillar // Legend</span>
              </div>
              <button
                onClick={() => setDialogText(null)}
                className="text-zinc-500 hover:text-zinc-300 text-xs px-1 cursor-pointer"
              >
                [x]
              </button>
            </div>
            <p className="text-xs sm:text-sm text-zinc-100 leading-relaxed font-sans">
              {dialogText}
            </p>
          </div>
        </div>
      )}
    </>
  );
}
