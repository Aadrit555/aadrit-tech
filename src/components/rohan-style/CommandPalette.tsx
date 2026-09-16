"use client";

import { useState, useEffect, useCallback } from "react";
import {
  Search,
  FolderGit2,
  Cpu,
  History,
  Briefcase,
  Mail,
  Github,
  Linkedin,
  Terminal,
  Gamepad2,
  Copy,
  Check,
  X,
  Volume2,
  Trophy,
} from "lucide-react";

interface CommandItem {
  id: string;
  label: string;
  category: "Navigation" | "Actions" | "External";
  icon: React.ReactNode;
  action: () => void;
  shortcut?: string;
}

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onTriggerCry?: () => void;
}

export default function CommandPalette({
  isOpen,
  onClose,
  onTriggerCry,
}: CommandPaletteProps) {
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [copied, setCopied] = useState(false);

  const copyEmail = useCallback(async () => {
    try {
      await navigator.clipboard.writeText("aadrit.yks@gmail.com");
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // ignore
    }
  }, []);

  const navigateTo = useCallback(
    (id: string) => {
      onClose();
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    },
    [onClose]
  );

  const items: CommandItem[] = [
    {
      id: "nav-projects",
      label: "Go to Projects",
      category: "Navigation",
      icon: <FolderGit2 className="w-4 h-4 text-emerald-600" />,
      action: () => navigateTo("projects"),
      shortcut: "P",
    },
    {
      id: "nav-github",
      label: "Go to GitHub Activity",
      category: "Navigation",
      icon: <Github className="w-4 h-4 text-zinc-700" />,
      action: () => navigateTo("github"),
    },
    {
      id: "nav-achievements",
      label: "Go to Achievements",
      category: "Navigation",
      icon: <Trophy className="w-4 h-4 text-amber-500" />,
      action: () => navigateTo("achievements"),
    },
    {
      id: "nav-skills",
      label: "Go to Skills",
      category: "Navigation",
      icon: <Cpu className="w-4 h-4 text-cyan-600" />,
      action: () => navigateTo("skills"),
      shortcut: "S",
    },
    {
      id: "nav-volunteering",
      label: "Go to Volunteering / Lab",
      category: "Navigation",
      icon: <Briefcase className="w-4 h-4 text-emerald-600" />,
      action: () => navigateTo("volunteering"),
    },
    {
      id: "nav-timeline",
      label: "Go to Timeline",
      category: "Navigation",
      icon: <History className="w-4 h-4 text-purple-600" />,
      action: () => navigateTo("timeline"),
      shortcut: "T",
    },
    {
      id: "nav-services",
      label: "Go to Services & Collab",
      category: "Navigation",
      icon: <Briefcase className="w-4 h-4 text-blue-600" />,
      action: () => navigateTo("services"),
    },
    {
      id: "nav-contact",
      label: "Go to Contact",
      category: "Navigation",
      icon: <Mail className="w-4 h-4 text-[#f9452d]" />,
      action: () => navigateTo("contact"),
      shortcut: "C",
    },
    {
      id: "nav-terminal",
      label: "Open Terminal Console",
      category: "Navigation",
      icon: <Terminal className="w-4 h-4 text-emerald-500" />,
      action: () => navigateTo("terminal"),
    },

    {
      id: "act-copy-email",
      label: copied ? "Email Copied to Clipboard!" : "Copy Email Address",
      category: "Actions",
      icon: copied ? (
        <Check className="w-4 h-4 text-emerald-500" />
      ) : (
        <Copy className="w-4 h-4 text-zinc-500" />
      ),
      action: copyEmail,
    },
    {
      id: "act-rayquaza-sound",
      label: "Play Rayquaza Dex Cry",
      category: "Actions",
      icon: <Volume2 className="w-4 h-4 text-emerald-600" />,
      action: () => {
        onTriggerCry?.();
        onClose();
      },
    },
    {
      id: "ext-github",
      label: "Open GitHub (Aadrit555)",
      category: "External",
      icon: <Github className="w-4 h-4 text-zinc-800" />,
      action: () => {
        window.open("https://github.com/Aadrit555", "_blank");
        onClose();
      },
    },
    {
      id: "ext-linkedin",
      label: "Open LinkedIn (Aadrit)",
      category: "External",
      icon: <Linkedin className="w-4 h-4 text-[#0077b5]" />,
      action: () => {
        window.open("https://www.linkedin.com/in/skaoldi-ntlap", "_blank");
        onClose();
      },
    },
  ];

  const filteredItems = items.filter(
    (item) =>
      item.label.toLowerCase().includes(query.toLowerCase()) ||
      item.category.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % Math.max(1, filteredItems.length));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev <= 0 ? filteredItems.length - 1 : prev - 1
        );
      } else if (e.key === "Enter") {
        e.preventDefault();
        if (filteredItems[selectedIndex]) {
          filteredItems[selectedIndex].action();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, filteredItems, selectedIndex, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-start justify-center pt-20 sm:pt-28 px-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-150"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="w-full max-w-lg bg-[var(--background)] border border-[var(--border)] rounded-xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-150">
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-[var(--border)]">
          <Search className="w-4 h-4 text-[var(--muted)] flex-shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type a command or jump to section..."
            autoFocus
            className="w-full bg-transparent text-sm text-[var(--foreground)] placeholder:text-[var(--muted)] focus:outline-none"
          />
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded text-[var(--muted)] hover:text-[var(--foreground)] hover:bg-[var(--foreground)]/5 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-80 overflow-y-auto p-2 divide-y divide-transparent">
          {filteredItems.length === 0 ? (
            <div className="py-8 text-center text-xs text-[var(--muted)]">
              No matching commands found.
            </div>
          ) : (
            filteredItems.map((item, index) => {
              const isSelected = index === selectedIndex;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={item.action}
                  onMouseEnter={() => setSelectedIndex(index)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-left text-xs transition-colors ${
                    isSelected
                      ? "bg-[var(--foreground)]/5 text-[var(--foreground)] font-medium"
                      : "text-[var(--foreground)]/80 hover:bg-[var(--foreground)]/5"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="flex-shrink-0">{item.icon}</span>
                    <span>{item.label}</span>
                  </div>
                  <div className="flex items-center gap-2 text-[10px] text-[var(--muted)]">
                    <span className="opacity-60">{item.category}</span>
                    {item.shortcut && (
                      <kbd className="px-1.5 py-0.5 rounded border border-[var(--border)] bg-[var(--foreground)]/5 font-mono">
                        {item.shortcut}
                      </kbd>
                    )}
                  </div>
                </button>
              );
            })
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="px-4 py-2 border-t border-[var(--border)] bg-[var(--foreground)]/[0.02] flex items-center justify-between text-[11px] text-[var(--muted)] font-mono">
          <div className="flex items-center gap-3">
            <span>↑↓ Navigate</span>
            <span>↵ Select</span>
            <span>ESC Close</span>
          </div>
          <span className="text-[10px] text-emerald-600 font-bold">WORKSTATION // CMD</span>
        </div>
      </div>
    </div>
  );
}
