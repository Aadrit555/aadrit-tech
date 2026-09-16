"use client";

import { useEffect, useState } from "react";
import { GitCommit, Github, ArrowUpRight, GitBranch, Star, Code, FolderGit2 } from "lucide-react";

interface GithubEvent {
  id: string;
  type: string;
  repo: { name: string };
  created_at: string;
  payload?: {
    commits?: { message: string; sha: string }[];
  };
}

export default function GithubActivity() {
  const [events, setEvents] = useState<GithubEvent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://api.github.com/users/Aadrit555/events?per_page=5")
      .then((res) => (res.ok ? res.json() : []))
      .then((data) => {
        if (Array.isArray(data)) {
          setEvents(data.slice(0, 5));
        }
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  const realRepos = [
    {
      name: "DidSomethinSLM",
      url: "https://github.com/Aadrit555/DidSomethinSLM",
      lang: "Python",
      desc: "RL-based Small Language Model for intent decision-making with REINFORCE.",
    },
    {
      name: "Hemlock",
      url: "https://github.com/Aadrit555/Hemlock",
      lang: "C",
      desc: "Digital media provenance & tamper detection via ECDSA & perceptual hashing.",
    },
    {
      name: "primordial-void",
      url: "https://github.com/Aadrit555/primordial-void",
      lang: "Python",
      desc: "Autonomous exploit discovery via KL-divergence intent-gap modeling.",
    },
    {
      name: "SuperRAG",
      url: "https://github.com/Aadrit555/SuperRAG",
      lang: "Python / FastAPI",
      desc: "Modular multi-phase RAG pipeline with vector search and knowledge graphs.",
    },
  ];

  return (
    <section id="github" className="py-8 sm:py-16 max-w-5xl mx-auto px-4 sm:px-6 relative z-10">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-4 sm:mb-6">
        <div>
          <h2 className="py-2 text-2xl sm:text-3xl font-medium tracking-tight lowercase flex items-center gap-2">
            <span>github activity</span>
            <span className="text-xs font-mono text-[var(--muted)]">@Aadrit555</span>
          </h2>
          <p className="text-xs text-[var(--muted)]">
            Live contribution graph and real commit stream directly from GitHub.
          </p>
        </div>

        <a
          href="https://github.com/Aadrit555"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-xs font-mono text-emerald-600 hover:underline underline-offset-2 mt-2 sm:mt-0"
        >
          <span>view github.com/Aadrit555</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </a>
      </div>

      {/* Contribution Calendar Card */}
      <div className="p-4 sm:p-6 border border-[var(--border)] rounded-xl bg-[var(--card)] space-y-6 shadow-2xs">
        <div className="flex items-center justify-between text-xs text-[var(--muted)] font-mono">
          <div className="flex items-center gap-2">
            <GitCommit className="w-3.5 h-3.5 text-emerald-600" />
            <span>Official Contribution Graph</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[11px] text-zinc-500 font-bold">16 Public Repos</span>
          </div>
        </div>

        {/* Real GitHub Contribution Heatmap SVG from ghchart API */}
        <div className="overflow-x-auto pb-2 flex justify-center">
          <div className="min-w-[660px] p-2 bg-white dark:bg-zinc-950/60 rounded-lg border border-[var(--border)]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://ghchart.rshah.org/059669/Aadrit555"
              alt="Aadrit555's Real GitHub Contributions"
              className="w-full h-auto max-w-full"
              loading="lazy"
            />
          </div>
        </div>

        {/* Real Live Recent Commits & Repositories */}
        <div className="pt-4 border-t border-[var(--border)] grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Recent Activity Stream */}
          <div className="space-y-2.5">
            <div className="text-xs font-mono text-[var(--muted)] uppercase font-bold flex items-center gap-1.5">
              <GitBranch className="w-3.5 h-3.5 text-emerald-600" />
              <span>Recent Public Activity</span>
            </div>

            {loading ? (
              <div className="text-xs text-[var(--muted)] font-mono py-2">
                Fetching latest commits from GitHub...
              </div>
            ) : events.length === 0 ? (
              <div className="text-xs text-[var(--muted)] font-mono py-2">
                Active pushed commits across aadrit-tech, DidSomethinSLM, and primordial-void.
              </div>
            ) : (
              <div className="space-y-2">
                {events.map((ev) => {
                  const date = new Date(ev.created_at).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  });
                  const commitMsg =
                    ev.payload?.commits?.[0]?.message?.split("\n")[0] ||
                    `${ev.type.replace("Event", "")} on ${ev.repo.name.split("/")[1] || ev.repo.name}`;

                  return (
                    <div
                      key={ev.id}
                      className="p-2.5 rounded-md bg-[var(--foreground)]/[0.02] border border-[var(--border)] flex items-start justify-between gap-2 text-xs"
                    >
                      <div className="space-y-0.5 min-w-0">
                        <div className="font-mono text-[11px] font-bold text-emerald-600 truncate">
                          {ev.repo.name}
                        </div>
                        <div className="text-[var(--foreground)] truncate max-w-xs">
                          {commitMsg}
                        </div>
                      </div>
                      <span className="text-[10px] font-mono text-[var(--muted)] whitespace-nowrap">
                        {date}
                      </span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Featured Real Repos */}
          <div className="space-y-2.5">
            <div className="text-xs font-mono text-[var(--muted)] uppercase font-bold flex items-center gap-1.5">
              <FolderGit2 className="w-3.5 h-3.5 text-cyan-600" />
              <span>Core Repositories</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {realRepos.map((r) => (
                <a
                  key={r.name}
                  href={r.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-md border border-[var(--border)] bg-[var(--card)] hover:border-emerald-500/40 transition-colors group block"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono font-bold text-xs text-[var(--foreground)] group-hover:text-emerald-600 transition-colors">
                      {r.name}
                    </span>
                    <ArrowUpRight className="w-3 h-3 text-[var(--muted)] group-hover:text-emerald-600 transition-colors" />
                  </div>
                  <span className="text-[10px] font-mono text-emerald-600 block mt-1">
                    {r.lang}
                  </span>
                  <p className="text-[11px] text-[var(--muted)] line-clamp-2 mt-1">
                    {r.desc}
                  </p>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
