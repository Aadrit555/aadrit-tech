"use client";

interface TimelineItem {
  role: string;
  organization: string;
  period: string;
  location: string;
}

const TIMELINE_ITEMS: TimelineItem[] = [
  {
    role: "B.Tech in Computer Science & Engineering",
    organization: "SRM University AP",
    period: "2025 - 2029",
    location: "amaravati, ap",
  },
  {
    role: "National MANAK Inspire Awardee",
    organization: "DST, Govt. of India",
    period: "2024",
    location: "new delhi, india",
  },
  {
    role: "JUST A HACKATHON (Hemlock)",
    organization: "FOSS United Foundation",
    period: "2025",
    location: "india",
  },
  {
    role: "Member & Systems/ML Researcher",
    organization: "Next Tech Lab AP",
    period: "nov 2025 - present",
    location: "amaravati, ap",
  },
  {
    role: "Co-Lead & Student Developer Mentor",
    organization: "FOSS SRMAP",
    period: "2026 - present",
    location: "amaravati, ap",
  },
];

export default function TimelineSection() {
  return (
    <section id="timeline" className="py-8 sm:py-16 max-w-5xl mx-auto px-4 sm:px-6 relative z-10">
      <h2 className="py-3 sm:py-4 text-3xl sm:text-4xl mb-6 sm:mb-8 lowercase font-medium">
        timeline
      </h2>

      <div className="border-t border-[var(--border)]">
        {TIMELINE_ITEMS.map((item, idx) => (
          <div
            key={idx}
            className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 sm:gap-4 py-3.5 sm:py-4 border-b border-[var(--border)] last:border-b-0 hover:bg-emerald-500/[0.02] transition-colors"
          >
            <div className="flex-1 min-w-0 flex flex-wrap items-baseline gap-1.5 text-sm sm:text-base">
              <span className="font-medium text-[var(--foreground)]">{item.role}</span>
              <span className="text-[var(--muted)] font-mono text-xs">@</span>
              <span className="text-[var(--muted)]">{item.organization}</span>
            </div>

            <div className="text-xs sm:text-sm text-[var(--muted)] font-mono sm:text-right whitespace-nowrap">
              <span>{item.period}</span>
              <span className="mx-1.5 opacity-50">·</span>
              <span className="opacity-80">{item.location}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
