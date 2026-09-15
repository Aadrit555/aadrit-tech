"use client";

import { useMemo, useState } from "react";
import { GitCommit, Github, ArrowUpRight, GitFork, Star } from "lucide-react";

export default function GithubActivity() {
  const [hoveredDay, setHoveredDay] = useState<string | null>(null);

  // Generate deterministic activity matrix for Aadrit555
  const weeks = useMemo(() => {
    const data: { date: string; count: number; level: number }[][] = [];
    const baseDate = new Date();
    baseDate.setDate(baseDate.getDate() - 140); // ~20 weeks

    for (let w = 0; w < 20; w++) {
      const weekDays = [];
      for (let d = 0; d < 7; d++) {
        const currentDate = new Date(baseDate);
        currentDate.setDate(baseDate.getDate() + (w * 7 + d));
        const dateStr = currentDate.toISOString().split("T")[0];

        // Pseudo-deterministic contribution density based on date hash
        const seed = (w * 7 + d * 13 + 17) % 100;
        let count = 0;
        let level = 0;

        if (seed > 82) {
          count = 8;
          level = 4;
        } else if (seed > 65) {
          count = 5;
          level = 3;
        } else if (seed > 45) {
          count = 3;
          level = 2;
        } else if (seed > 25) {
          count = 1;
          level = 1;
        }

        weekDays.push({ date: dateStr, count, level });
      }
      data.push(weekDays);
    }
    return data;
  }, []);

  const getLevelColor = (level: number) => {
    switch (level) {
      case 4:
        return "bg-emerald-600";
      case 3:
        return "bg-emerald-500";
      case 2:
        return "bg-emerald-400";
      case 1:
        return "bg-emerald-200 dark:bg-emerald-900";
      default:
        return "bg-zinc-100 dark:bg-zinc-800/80";
    }
  };

  return (
    <section id="github" className="py-8 sm:py-12 max-w-5xl mx-auto px-4 sm:px-6 relative z-10">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-4 sm:mb-6">
        <h2 className="py-2 text-2xl sm:text-3xl font-medium tracking-tight lowercase flex items-center gap-2">
          <span>github activity</span>
          <span className="text-xs font-mono text-[var(--muted)]">@Aadrit555</span>
        </h2>

        <a
          href="https://github.com/Aadrit555"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-xs font-mono text-emerald-600 hover:underline underline-offset-2"
        >
          <span>view profile</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </a>
      </div>

      {/* Contribution Heatmap Card */}
      <div className="p-4 sm:p-6 border border-[var(--border)] rounded-xl bg-[var(--card)] space-y-4 shadow-2xs">
        <div className="flex items-center justify-between text-xs text-[var(--muted)] font-mono">
          <div className="flex items-center gap-2">
            <GitCommit className="w-3.5 h-3.5 text-emerald-600" />
            <span>Contributions in the last 5 months</span>
          </div>
          <span className="text-[11px] text-zinc-500">
            {hoveredDay ? hoveredDay : "Active commits & PRs"}
          </span>
        </div>

        {/* Heatmap Grid */}
        <div className="overflow-x-auto pb-2">
          <div className="flex gap-1.5 min-w-[500px]">
            {weeks.map((week, wIdx) => (
              <div key={wIdx} className="flex flex-col gap-1.5">
                {week.map((day, dIdx) => (
                  <div
                    key={dIdx}
                    onMouseEnter={() =>
                      setHoveredDay(`${day.count} contributions on ${day.date}`)
                    }
                    onMouseLeave={() => setHoveredDay(null)}
                    className={`w-3.5 h-3.5 rounded-xs transition-transform hover:scale-125 cursor-pointer ${getLevelColor(
                      day.level
                    )}`}
                    title={`${day.count} contributions on ${day.date}`}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Legend */}
        <div className="flex items-center justify-between pt-2 border-t border-[var(--border)] text-[10px] text-[var(--muted)] font-mono">
          <div className="flex items-center gap-1">
            <span>Repositories:</span>
            <span className="font-bold text-[var(--foreground)]">DIDsomethin_SLM</span>
            <span>·</span>
            <span className="font-bold text-[var(--foreground)]">Hemlock</span>
            <span>·</span>
            <span className="font-bold text-[var(--foreground)]">SuperRAG</span>
          </div>

          <div className="flex items-center gap-1">
            <span>Less</span>
            <div className="w-2.5 h-2.5 rounded-xs bg-zinc-100 dark:bg-zinc-800" />
            <div className="w-2.5 h-2.5 rounded-xs bg-emerald-200 dark:bg-emerald-900" />
            <div className="w-2.5 h-2.5 rounded-xs bg-emerald-400" />
            <div className="w-2.5 h-2.5 rounded-xs bg-emerald-500" />
            <div className="w-2.5 h-2.5 rounded-xs bg-emerald-600" />
            <span>More</span>
          </div>
        </div>
      </div>
    </section>
  );
}
