"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Terminal, Menu, X } from "lucide-react";
import ScrollProgressBar from "@/components/animations/ScrollProgressBar";

const NAV_ITEMS = [
  { label: "Work", href: "#work", id: "work" },
  { label: "Experience", href: "#experience", id: "experience" },
  { label: "About", href: "#about", id: "about" },
  { label: "Terminal", href: "#terminal", id: "terminal", icon: true },
];

export default function Header() {
  const [activeSection, setActiveSection] = useState<string>("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const sectionIds = ["work", "experience", "about", "terminal", "contact"];

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      const visible = entries.find((entry) => entry.isIntersecting);
      if (visible) {
        setActiveSection(visible.target.id);
      }
    };

    const observerOptions = {
      root: null,
      rootMargin: "-20% 0px -60% 0px",
      threshold: [0, 0.1, 0.3],
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) {
        observer.observe(el);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen((prev) => !prev);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && mobileMenuOpen) {
        closeMobileMenu();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [mobileMenuOpen]);

  return (
    <header className="sticky top-0 z-40 w-full border-b-2 border-red-800/80 bg-zinc-950/90 text-zinc-100 backdrop-blur-md shadow-md">
      <ScrollProgressBar />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Pokédex Brand & Sensor Array - Clean & uncluttered */}
        <Link
          href="/"
          onClick={closeMobileMenu}
          className="flex items-center gap-2 text-zinc-100 font-mono tracking-tight font-bold hover:opacity-90 transition-opacity flex-shrink-0"
        >
          <div className="flex items-center gap-1.5" aria-hidden="true">
            <span className="w-3.5 h-3.5 rounded-full bg-cyan-400 border border-white shadow-[0_0_8px_rgba(6,182,212,0.8)] animate-pulse" />
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 hidden sm:inline-block" />
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 hidden sm:inline-block" />
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 hidden sm:inline-block" />
          </div>
          <span className="text-white font-mono tracking-wider text-sm sm:text-base">POKÉDEX</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1 text-xs font-mono">
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.id}
                href={item.href}
                className={`px-2.5 py-1.5 rounded-md transition-all font-medium flex items-center gap-1.5 ${isActive
                  ? "text-white bg-zinc-800/90 border border-zinc-700 shadow-2xs font-semibold"
                  : "text-zinc-300 hover:text-white hover:bg-zinc-800/60"
                  }`}
              >
                {isActive && (
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                )}
                {item.icon && <Terminal className="w-3.5 h-3.5 text-accent-emerald" />}
                <span>{item.label}</span>
              </a>
            );
          })}

          <a
            href="#contact"
            className={`ml-1.5 px-3.5 py-1.5 rounded-md text-white font-bold transition-all shadow-sm border border-red-400 text-xs flex items-center gap-1.5 ${activeSection === "contact"
              ? "bg-[#b91c1c] ring-2 ring-red-400"
              : "bg-[#dc2626] hover:bg-[#b91c1c]"
              }`}
          >
            {activeSection === "contact" && (
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
            )}
            <span>Contact</span>
          </a>
        </nav>

        {/* Mobile Hamburger Toggle Button (min 44x44 touch target) */}
        <button
          type="button"
          onClick={toggleMobileMenu}
          aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-navigation"
          className="md:hidden flex items-center justify-center w-11 h-11 rounded-md text-zinc-300 hover:text-white hover:bg-zinc-800/80 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Navigation Drawer Dropdown */}
      {mobileMenuOpen && (
        <div id="mobile-navigation" className="md:hidden border-t border-zinc-800 bg-zinc-950/95 backdrop-blur-lg px-4 py-3 space-y-1 shadow-2xl animate-in slide-in-from-top-2 duration-150">
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.id}
                href={item.href}
                onClick={closeMobileMenu}
                className={`flex items-center justify-between px-4 py-3 rounded-lg text-sm font-mono transition-colors min-h-[44px] ${isActive
                  ? "text-white bg-zinc-800/90 font-bold border border-zinc-700"
                  : "text-zinc-300 hover:text-white hover:bg-zinc-800/60"
                  }`}
              >
                <div className="flex items-center gap-2">
                  {item.icon && <Terminal className="w-4 h-4 text-accent-emerald" />}
                  <span>{item.label}</span>
                </div>
                {isActive && (
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                )}
              </a>
            );
          })}

          <div className="pt-2">
            <a
              href="#contact"
              onClick={closeMobileMenu}
              className="flex items-center justify-center w-full px-4 py-3 rounded-lg bg-[#dc2626] hover:bg-[#b91c1c] text-white font-mono font-bold text-sm transition-colors shadow-sm min-h-[44px]"
            >
              <span>Contact</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

