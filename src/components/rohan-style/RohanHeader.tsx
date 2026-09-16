"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Search, Github, Linkedin, Mail } from "lucide-react";
import CommandPalette from "./CommandPalette";

export default function RohanHeader() {
  const [cmdOpen, setCmdOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setCmdOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const triggerCry = () => {
    try {
      const crySound = new Audio("/sounds/rayquaza_cry.mp3");
      crySound.volume = 0.7;
      crySound.play().catch(() => { });
    } catch {
      // ignore
    }
  };

  const navLinks = [
    { label: "home", href: "#hero" },
    { label: "projects", href: "#projects" },
    { label: "skills", href: "#skills" },
    { label: "timeline", href: "#timeline" },
    { label: "services", href: "#services" },
    { label: "contact", href: "#contact" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 w-full flex justify-center px-4 py-3 backdrop-blur-md border-b transition-all duration-300 overflow-x-hidden ${isScrolled
            ? "bg-white/80 dark:bg-zinc-950/80 border-[var(--border)] shadow-xs"
            : "bg-transparent border-transparent"
          }`}
      >
        <div className="w-full max-w-5xl flex items-center justify-between px-2 sm:px-4">
          {/* Left Navigation */}
          <div className="flex-1 flex items-center">
            {/* Mobile Horizontal Scroll */}
            <div className="md:hidden flex items-center gap-3 overflow-x-auto py-1 text-xs">
              {navLinks.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="font-medium lowercase transition-colors text-[var(--foreground)] opacity-70 hover:opacity-100 whitespace-nowrap"
                >
                  {item.label}
                </a>
              ))}
            </div>

            {/* Desktop Navigation with Rohan's Arrow-Slide Interaction */}
            <nav className="hidden md:flex items-center gap-5 lg:gap-7 text-sm font-medium lowercase">
              {/* Subtle Audio Status Indicator */}
              <button
                type="button"
                onClick={triggerCry}
                aria-label="Play audio cue"
                title="Audio Cue // Click to trigger"
                className="flex items-center gap-1.5 opacity-80 hover:opacity-100 transition-opacity cursor-pointer mr-1"
              >
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)] animate-pulse" />
                <span className="font-mono text-[11px] text-[var(--muted)]">cue</span>
              </button>

              {navLinks.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="relative group flex items-center text-[var(--foreground)]"
                >
                  <span className="transition-all duration-300 group-hover:translate-x-2 group-hover:opacity-0 flex items-center gap-1.5">
                    {item.label}
                  </span>
                  <span className="absolute opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-emerald-600 font-bold">
                    →
                  </span>
                </a>
              ))}
            </nav>
          </div>

          {/* Right Controls: Command Palette Trigger & Social Icons */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Command Palette Button */}
            <button
              type="button"
              onClick={() => setCmdOpen(true)}
              className="flex items-center gap-1.5 px-2.5 py-1 text-xs text-[var(--foreground)]/70 bg-[var(--background)] hover:bg-[var(--foreground)]/5 border border-[var(--border)] rounded-md transition-all duration-200 hover:text-[var(--foreground)] hover:border-[var(--foreground)]/20 group"
              aria-label="Open command palette"
              title="Open command palette (Ctrl+K)"
            >
              <Search className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 transition-opacity" />
              <div className="hidden sm:flex items-center gap-0.5 px-1.5 py-0.5 bg-[var(--foreground)]/5 group-hover:bg-emerald-500/10 border border-[var(--border)] rounded text-[10px] font-mono text-[var(--foreground)]/60 group-hover:text-emerald-600 group-hover:border-emerald-500/30 transition-all">
                <span className="font-semibold">Ctrl</span>
                <span className="opacity-50">+</span>
                <span className="font-semibold">K</span>
              </div>
            </button>

            {/* Social Icons */}
            <div className="flex items-center gap-2.5 sm:gap-3">
              <a
                href="https://github.com/Aadrit555"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="text-[var(--foreground)] hover:text-emerald-600 transition-colors p-1"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href="https://www.linkedin.com/in/skaoldi-ntlap"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="text-[var(--foreground)] hover:text-emerald-600 transition-colors p-1"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="mailto:aadrit.yks@gmail.com"
                aria-label="Email"
                className="text-[var(--foreground)] hover:text-[#f9452d] transition-colors p-1"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Global Command Palette Modal */}
      <CommandPalette
        isOpen={cmdOpen}
        onClose={() => setCmdOpen(false)}
        onTriggerCry={triggerCry}
      />
    </>
  );
}
