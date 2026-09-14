"use client";

import { useEffect, useState } from "react";

export default function ScrollProgressBar() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const totalHeight =
            document.documentElement.scrollHeight - window.innerHeight;
          if (totalHeight > 0) {
            const current = (window.scrollY / totalHeight) * 100;
            setProgress(Math.min(100, Math.max(0, current)));
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className="absolute bottom-0 left-0 w-full h-[2px] bg-red-950/30 overflow-hidden pointer-events-none z-50"
      aria-hidden="true"
    >
      <div
        className="h-full bg-emerald-400 transition-all duration-75 ease-out shadow-[0_0_6px_rgba(52,211,153,0.8)]"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}

