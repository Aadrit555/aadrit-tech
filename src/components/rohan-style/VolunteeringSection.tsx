"use client";

import Image from "next/image";
import { leadershipRoles } from "@/data/portfolio";
import { ExternalLink } from "lucide-react";

export default function VolunteeringSection() {
  return (
    <section id="volunteering" className="py-8 sm:py-16 max-w-5xl mx-auto px-4 sm:px-6 relative z-10">
      <h2 className="py-3 sm:py-4 text-3xl sm:text-4xl mb-4 sm:mb-8 lowercase font-medium">
        volunteering & lab
      </h2>

      <div className="space-y-5">
        {leadershipRoles.map((role) => (
          <div
            key={role.slug}
            className="border border-[var(--border)] p-5 sm:p-6 rounded-lg hover:bg-[var(--background-hover)] transition-all duration-300 bg-[var(--card)]"
          >
            {/* Header: Organization & Date */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0 mb-3">
              <div className="flex items-center gap-3">
                {role.logoUrl && (
                  <a
                    href={role.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-lg border border-[var(--border)] bg-zinc-900/10 dark:bg-zinc-800/40 p-1 flex items-center justify-center overflow-hidden flex-shrink-0 hover:border-emerald-500 transition-colors"
                  >
                    <Image
                      src={role.logoUrl}
                      alt={`${role.organization} logo`}
                      width={36}
                      height={36}
                      className="object-contain w-full h-full rounded"
                    />
                  </a>
                )}
                <h3 className="text-xl font-bold">
                  <a
                    href={role.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline underline-offset-2 flex items-center gap-1.5 text-[var(--foreground)]"
                  >
                    <span>{role.organization}</span>
                    <ExternalLink className="w-3.5 h-3.5 opacity-60" />
                  </a>
                </h3>
              </div>
              <span className="text-xs sm:text-sm text-[var(--muted)] font-mono whitespace-nowrap">
                {role.period}
              </span>
            </div>

            {/* Role Title */}
            <p className="text-sm font-medium text-emerald-600 dark:text-emerald-400 mb-3">
              {role.role}
            </p>

            {/* Description & Bullets */}
            <p className="text-xs sm:text-sm text-[var(--muted)] leading-relaxed mb-4">
              {role.description}
            </p>

            {/* Tech Tags Pills */}
            <div className="flex flex-wrap gap-2 pt-1 border-t border-[var(--border)]">
              {role.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 border border-[var(--border)] rounded-md text-xs font-mono font-medium text-[var(--foreground)]/80 bg-[var(--foreground)]/[0.02]"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
