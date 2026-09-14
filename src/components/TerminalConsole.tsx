"use client";

import { useState, useRef, useEffect, KeyboardEvent } from "react";
import { Terminal as TerminalIcon, CornerDownLeft, RotateCcw, Copy, Check } from "lucide-react";

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
        "Aadrit Srivastava :: Systems & AI/ML Workstation [v1.1.0-revamped]",
        "Type 'help' to inspect system commands or click quick actions below.",
      ],
    },
  ]);
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const [copied, setCopied] = useState(false);

  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
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
          "Available system commands:",
          "  whoami       - Display identity and academic credentials",
          "  projects     - List active and completed engineering builds",
          "  skills       - Print verified technical toolsets",
          "  experience   - Display engineering work history",
          "  security     - Inspect active server security protocols",
          "  contact      - Show direct contact coordinates",
          "  clear        - Clear console buffer",
          "  sudo         - Elevate user privileges",
        ];
        break;

      case "whoami":
        output = [
          "NAME:     Aadrit Srivastava",
          "ROLE:     AI/ML & Systems Engineer",
          "SCHOOL:   SRM University AP (B.Tech Computer Science & Engineering)",
          "LOCATION: Lucknow, Uttar Pradesh, India",
          "FOCUS:    NLP intent models, adversarial AI simulation, firmware security in C",
        ];
        break;

      case "projects":
        output = [
          "ENGINEERING PROJECTS:",
          "  1. SLM (Small Language Model) - Lightweight NLP intent model in Python",
          "     Repo: github.com/Aadrit555/DIDsomethin_SLM",
          "  2. Hemlock - Firmware-level AI pipeline defense in C (FOSS United Hackathon recognized)",
          "     Repo: github.com/Aadrit555/HemlockV2",
          "  3. Chimera - Adversarial AI simulation with continuous learning defender agents",
          "  4. SuperRAG - Multi-source document retrieval and vector ranking pipeline",
          "     Repo: github.com/Aadrit555/SuperRAG",
          "  5. HemlockV2 - Low-level CPU cache and memory speed benchmark harness",
        ];
        break;

      case "skills":
        output = [
          "CORE TOOLSETS:",
          "  Languages:  Python, C, SQL, Bash",
          "  ML/Data:    Supervised Learning, Model Training & Eval, Data Pipelines, RAG",
          "  Systems:    Git, REST APIs, JSON, Arduino, Memory/Cache Architecture",
        ];
        break;

      case "experience":
        output = [
          "ASSOCIATE :: Next Tech Lab",
          "  - Trained and evaluated machine learning models in Python",
          "  - Automated dataset preprocessing pipelines",
          "  - Fixed pipeline bugs and delivered cross-functional milestones",
        ];
        break;

      case "security":
        output = [
          "SERVER SECURITY STATUS:",
          "  - Content-Security-Policy (CSP): STRICT",
          "  - Frame Protection: X-Frame-Options DENY",
          "  - MIME Sniffing: nosniff",
          "  - Transport Security: HSTS max-age=63072000",
          "  - Rate Limiter: In-memory sliding window active",
          "  - Admin Route Protection: PBKDF2-HMAC-SHA256 salted session tokens",
          "  - Form Input: Server-side Zod validation & XSS sanitization",
        ];
        break;

      case "contact":
        output = [
          "COMMUNICATION CHANNELS:",
          "  Email:    aadrit.yks@gmail.com",
          "  Phone:    +91 7233023333",
          "  GitHub:   https://github.com/Aadrit555",
          "  LinkedIn: https://www.linkedin.com/in/aadrit-srivastava",
        ];
        break;

      case "clear":
        setHistory([]);
        setInput("");
        return;

      case "sudo":
        output = [
          "aadrit@workstation: Permission denied. User is not in the sudoers file.",
          "This security violation will be logged in /data/audit.log.",
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

  const quickCommands = ["whoami", "projects", "skills", "security", "contact"];

  return (
    <section id="terminal" className="py-16 md:py-24 border-b border-border-dim bg-tech-grid-dense relative z-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Header without numberings */}
        <div className="text-center mb-6">
          <div className="text-xs font-mono text-accent-emerald tracking-wider uppercase mb-1">
            INTERACTIVE REPL
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-white font-sans">
            Interactive System Console
          </h2>
          <p className="text-xs text-text-secondary font-mono mt-1">
            Inspect configurations, projects, and runtime security parameters directly.
          </p>
        </div>

        {/* Quick Action Command Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-4">
          <span className="text-[11px] font-mono text-text-muted">Quick run:</span>
          {quickCommands.map((cmd) => (
            <button
              key={cmd}
              onClick={() => executeCommand(cmd)}
              className="px-2.5 py-1 rounded bg-surface hover:bg-surface-raised border border-border-dim text-[11px] font-mono text-text-secondary hover:text-white transition-colors cursor-pointer"
            >
              ${cmd}
            </button>
          ))}
        </div>

        {/* Terminal Window */}
        <div className="tech-card border-border-bright bg-[#06080d] shadow-2xl rounded-md overflow-hidden">
          {/* Title Bar */}
          <div className="bg-surface px-4 py-2.5 border-b border-border-dim flex items-center justify-between text-xs font-mono">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-zinc-700"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-zinc-700"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-zinc-700"></span>
              <span className="text-text-muted ml-2 flex items-center gap-1.5">
                <TerminalIcon className="w-3.5 h-3.5 text-accent-emerald" />
                <span>guest@aadrit-workstation:~</span>
              </span>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={copyLog}
                className="text-text-muted hover:text-white transition-colors flex items-center gap-1 text-[11px]"
                title="Copy Terminal History"
              >
                {copied ? <Check className="w-3 h-3 text-accent-emerald" /> : <Copy className="w-3 h-3" />}
                <span>{copied ? "copied" : "copy"}</span>
              </button>

              <button
                onClick={() => setHistory([])}
                className="text-text-muted hover:text-white transition-colors flex items-center gap-1 text-[11px]"
                title="Clear Terminal"
              >
                <RotateCcw className="w-3 h-3" />
                <span>clear</span>
              </button>
            </div>
          </div>

          {/* Terminal Body */}
          <div
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
            <div ref={bottomRef} />
          </div>
        </div>
      </div>
    </section>
  );
}
