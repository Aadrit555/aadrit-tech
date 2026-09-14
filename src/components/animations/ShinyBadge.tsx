"use client";

interface ShinyBadgeProps {
  children: React.ReactNode;
  className?: string;
  dotColor?: string;
}

export default function ShinyBadge({
  children,
  className = "",
  dotColor = "bg-accent-emerald",
}: ShinyBadgeProps) {
  return (
    <div
      className={`relative inline-flex items-center gap-2 px-3 py-1 rounded border border-border-bright/80 bg-surface/90 text-xs font-mono text-text-secondary overflow-hidden shadow-sm ${className}`}
    >
      {/* Animated Monochromatic Shimmer Bar */}
      <div className="absolute inset-0 -translate-x-full animate-[shimmer_3.5s_infinite] bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none" />

      {dotColor && <span className={`w-2 h-2 rounded-full ${dotColor} flex-shrink-0`} />}
      <span className="relative z-10">{children}</span>
    </div>
  );
}
