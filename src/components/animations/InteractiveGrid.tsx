"use client";

import { useEffect, useRef } from "react";

export default function InteractiveGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    let mouseX = -1000;
    let mouseY = -1000;

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouseX = -1000;
      mouseY = -1000;
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    const gridSize = 28;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      const cols = Math.ceil(width / gridSize);
      const rows = Math.ceil(height / gridSize);

      // Render subtle pixelated grid dots with proximity reaction on light canvas
      for (let i = 0; i <= cols; i++) {
        for (let j = 0; j <= rows; j++) {
          const x = i * gridSize;
          const y = j * gridSize;

          const dx = mouseX - x;
          const dy = mouseY - y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          const maxDist = 160;
          let alpha = 0.14;
          let size = 1.2;

          if (dist < maxDist) {
            const factor = 1 - dist / maxDist;
            alpha = 0.14 + factor * 0.45;
            size = 1.2 + factor * 1.5;
            ctx.fillStyle = `rgba(249, 69, 45, ${alpha})`; // Signature orange-red proximity glow
          } else {
            ctx.fillStyle = `rgba(161, 161, 170, ${alpha})`; // Base neutral pixel dot
          }

          // Draw square pixel dot for pixelated background aesthetic
          ctx.fillRect(x - size / 2, y - size / 2, size, size);
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0 opacity-80"
    />
  );
}

