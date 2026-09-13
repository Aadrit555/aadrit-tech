"use client";

import { useState, useRef, useEffect } from "react";
import { Terminal as TerminalIcon, CornerDownLeft, RotateCcw } from "lucide-react";

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
        "Aadrit Srivastava :: Systems & AI/ML Workstation [v1.0.4-secure]",
        "Type 'help' to inspect available system commands or 'projects' to view build specs.",
      ],
    },
  ]);

  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = input.trim().toLowerCase();
    if (!cmd) return;

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

    setHistory((prev) => [...prev, { command: input, output }]);
    setInput("");
  };

  return (
    <section id="terminal" className="py-16 md:py-24 border-b border-border-dim bg-tech-grid-dense">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="text-xs font-mono text-accent-emerald tracking-wider uppercase mb-1">
            [05. INTERACTIVE_REPL]
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-white font-sans">
            Interactive System Console
          </h2>
          <p className="text-xs text-text-secondary font-mono mt-1">
            Inspect system configurations, research projects, and runtime security parameters directly.
          </p>
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
                <span>guest@aadrit-system:~</span>
              </span>
            </div>

            <button
              onClick={() => setHistory([])}
              className="text-text-muted hover:text-white transition-colors flex items-center gap-1 text-[11px]"
              title="Clear Terminal"
            >
              <RotateCcw className="w-3 h-3" />
              <span>clear</span>
            </button>
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
            <form onSubmit={handleCommand} className="flex items-center gap-2 text-text-primary pt-1">
              <span className="text-accent-emerald font-semibold">&gt;</span>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="type 'help' or 'projects'..."
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

