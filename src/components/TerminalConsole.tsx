"use client";

import { useState, useRef, useEffect, KeyboardEvent } from "react";
import { Terminal as TerminalIcon, CornerDownLeft, RotateCcw, Copy, Check } from "lucide-react";
import {
  profile,
  projects,
  focusAreas,
  leadershipRoles,
  securityControls,
} from "@/data/portfolio";

interface HistoryEntry {
  command: string;
  output: string[];
}

export default function TerminalConsole() {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<HistoryEntry[]>([
    {
      command: "welcome",
      output: [
        "DEVON CORP. HOENN POKÉDEX DIAGNOSTICS [v3.0-emerald]",
        `${profile.name} :: ${profile.role} Register`,
        "Type 'help' to inspect system commands or click quick actions below.",
      ],
    },
  ]);
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const [copied, setCopied] = useState(false);

  const terminalBodyRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (history.length > 1 && terminalBodyRef.current) {
      terminalBodyRef.current.scrollTop = terminalBodyRef.current.scrollHeight;
    }
  }, [history]);

  const executeCommand = (cmdText: string) => {
    const cmd = cmdText.trim().toLowerCase();
    if (!cmd) return;

    setCmdHistory((prev) => [...prev, cmdText]);
    setHistoryIndex(-1);

    let output: string[] = [];

    switch (cmd) {
      case "help":
        output = [
          "Available commands:",
          "  whoami       - Display profile information",
          "  projects     - List selected projects",
          "  skills       - Display technical focus areas",
          "  experience   - Display roles and activities",
          "  security     - Display implemented security controls",
          "  contact      - Show contact links",
          "  clear        - Clear console",
        ];
        break;

      case "whoami":
        output = [
          `NAME:     ${profile.name}`,
          `ROLE:     ${profile.role}`,
          `SCHOOL:   ${profile.university} (${profile.degree}, ${profile.period})`,
          `FOCUS:    ${profile.pokedexEntry}`,
        ];
        break;

      case "projects":
        output = [
          "PROJECTS:",
          ...projects.flatMap((p, idx) => {
            const lines = [
              `  ${idx + 1}. ${p.title} - ${p.description}`,
            ];
            if (p.awardBadge) {
              lines.push(`     Recognition: ${p.awardBadge}`);
            }
            if (p.githubUrl) {
              lines.push(`     Repo: ${p.githubUrl.replace(/^https?:\/\//, "")}`);
            }
            return lines;
          }),
        ];
        break;

      case "skills":
        output = [
          "CORE FOCUS AREAS:",
          ...focusAreas.map((fa) => `  ${(fa.title + ":").padEnd(18)} ${fa.subtitle}`),
        ];
        break;

      case "experience":
        output = [
          "EXPERIENCE & LEADERSHIP:",
          ...leadershipRoles.flatMap((role) => [
            `${role.role.toUpperCase()} :: ${role.organization}`,
            ...role.bullets.map((b) => `  - ${b}`),
          ]),
        ];
        break;

      case "security":
        output = [
          "IMPLEMENTED SECURITY CONTROLS:",
          ...securityControls.map((sc) => `  - ${sc}`),
        ];
        break;

      case "contact":
        output = [
          "COMMUNICATION CHANNELS:",
          `  Email:    ${profile.contact.email}`,
          `  GitHub:   ${profile.contact.github}`,
          `  LinkedIn: ${profile.contact.linkedin}`,
        ];
        break;

      case "clear":
        setHistory([]);
        setInput("");
        return;

      case "sudo":
        output = [
          "Permission denied. Nice try, trainer.",
        ];
        break;

      case "gastly":
      case "loader":
        output = [
          "POKÉDEX ENTRY #0092 // GASTLY",
          "  Type:        Ghost / Poison",
          "  Animation:   Clint Hess (Dribbble shot 5891438)",
          "  Description: Born from gases, anyone would faint if engulfed by its gaseous body.",
          "  Function:    Official portfolio loading screen sequence.",
        ];
        break;

      default:
        output = [
          `Command not recognized: '${cmd}'. Type 'help' to view supported commands.`,
        ];
        break;
    }

    setHistory((prev) => [...prev, { command: cmdText, output }]);
    setInput("");
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (cmdHistory.length === 0) return;
      const nextIndex = historyIndex === -1 ? cmdHistory.length - 1 : Math.max(0, historyIndex - 1);
      setHistoryIndex(nextIndex);
      setInput(cmdHistory[nextIndex]);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex === -1) return;
      const nextIndex = historyIndex + 1;
      if (nextIndex >= cmdHistory.length) {
        setHistoryIndex(-1);
        setInput("");
      } else {
        setHistoryIndex(nextIndex);
        setInput(cmdHistory[nextIndex]);
      }
    }
  };

  const copyLog = () => {
    const text = history
      .map((h) => `> ${h.command}\n${h.output.join("\n")}`)
      .join("\n\n");
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const quickCommands = ["whoami", "projects", "skills", "experience", "security", "contact"];

  return (
    <section id="terminal" className="py-12 md:py-20 bg-transparent relative z-10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Header matching Pokédex firmware layout */}
        <div className="text-center mb-8 p-6 sm:p-8 bg-white/85 backdrop-blur-md border border-white/70 rounded-2xl shadow-md">
          <div className="text-xs font-mono text-[#dc2626] tracking-wider uppercase mb-2 font-bold flex items-center justify-center gap-2">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            <span>Devon Corp. Diagnostics // Pokédex Firmware REPL</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-normal tracking-tight text-zinc-950 font-sans">
            System & <span className="font-serif italic font-normal text-zinc-600">command console</span>
          </h2>
          <p className="text-xs text-zinc-600 font-mono mt-2 mb-4">
            Inspect selected projects, focus areas, and implemented security controls directly.
          </p>

          {/* Quick Action Command Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            <span className="text-[11px] font-mono text-zinc-500 font-medium">Quick run:</span>
            {quickCommands.map((cmd) => (
              <button
                key={cmd}
                onClick={() => executeCommand(cmd)}
                className="px-2.5 py-1 rounded bg-zinc-100 hover:bg-zinc-200 border border-border-dim text-[11px] font-mono text-zinc-700 hover:text-zinc-950 transition-colors cursor-pointer"
              >
                ${cmd}
              </button>
            ))}
          </div>
        </div>

        {/* Terminal Window */}
        <div className="border border-zinc-800 bg-[#090b10] shadow-2xl rounded-md overflow-hidden">
          {/* Title Bar */}
          <div className="bg-[#121620] px-4 py-2.5 border-b border-zinc-800 flex items-center justify-between text-xs font-mono">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
              <span className="text-zinc-400 ml-2 flex items-center gap-1.5">
                <TerminalIcon className="w-3.5 h-3.5 text-accent-emerald" />
                <span>devon-os@pokedex-hoenn:~</span>
              </span>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={copyLog}
                className="text-zinc-400 hover:text-white transition-colors flex items-center gap-1 text-[11px]"
                title="Copy Terminal History"
              >
                {copied ? <Check className="w-3 h-3 text-accent-emerald" /> : <Copy className="w-3 h-3" />}
                <span>{copied ? "copied" : "copy"}</span>
              </button>

              <button
                onClick={() => setHistory([])}
                className="text-zinc-400 hover:text-white transition-colors flex items-center gap-1 text-[11px]"
                title="Clear Terminal"
              >
                <RotateCcw className="w-3 h-3" />
                <span>clear</span>
              </button>
            </div>
          </div>

          {/* Terminal Body */}
          <div
            ref={terminalBodyRef}
            className="p-4 sm:p-6 font-mono text-xs text-text-secondary min-h-[300px] max-h-[440px] overflow-y-auto space-y-4"
            onClick={() => inputRef.current?.focus()}
          >
            {history.map((entry, idx) => (
              <div key={idx} className="space-y-1.5">
                <div className="flex items-center gap-2 text-text-primary">
                  <span className="text-accent-emerald font-semibold">&gt;</span>
                  <span className="font-medium text-zinc-100">{entry.command}</span>
                </div>
                <div className="space-y-0.5 text-text-muted pl-4">
                  {entry.output.map((line, lIdx) => (
                    <div key={lIdx} className="leading-relaxed">
                      {line}
                    </div>
                  ))}
                </div>
              </div>
            ))}

            {/* Current Input Prompt */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                executeCommand(input);
              }}
              className="flex items-center gap-2 text-text-primary pt-1"
            >
              <span className="text-accent-emerald font-semibold">&gt;</span>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onKeyDown={handleKeyDown}
                onChange={(e) => setInput(e.target.value)}
                placeholder="type command (use up/down arrows for history)..."
                className="flex-1 bg-transparent border-none outline-none text-text-primary font-mono text-xs placeholder:text-zinc-700"
                autoComplete="off"
                spellCheck="false"
              />
              <button type="submit" className="text-text-muted hover:text-white">
                <CornerDownLeft className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
