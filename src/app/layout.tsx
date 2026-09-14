import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";
import { Terminal, Shield, FileText, Github, Linkedin, Mail } from "lucide-react";
import InteractiveGrid from "@/components/animations/InteractiveGrid";

export const metadata: Metadata = {
  title: "Aadrit Srivastava | AI/ML & Systems Engineer",
  description:
    "Portfolio of Aadrit Srivastava. Undergrad at SRM University AP building lightweight NLP models, adversarial AI simulation frameworks, and firmware-level cryptographic security in C and Python.",
  keywords: [
    "Aadrit Srivastava",
    "Systems Engineer",
    "Machine Learning",
    "NLP",
    "Firmware Security",
    "Python",
    "C",
    "SRM University AP",
    "DIDsomethin_SLM",
    "Hemlock",
  ],
  authors: [{ name: "Aadrit Srivastava" }],
  creator: "Aadrit Srivastava",
  metadataBase: new URL("https://aadrit.dev"),
  alternates: {
    canonical: "https://aadrit.dev",
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
  openGraph: {
    title: "Aadrit Srivastava | AI/ML & Systems Engineer",
    description:
      "Engineering lightweight NLP models, adversarial AI simulation frameworks, and firmware-level cryptographic security defenses.",
    url: "https://aadrit.dev",
    siteName: "Aadrit Srivastava Portfolio",
    images: [
      {
        url: "/images/aadrit.png",
        width: 600,
        height: 600,
        alt: "Aadrit Srivastava",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-background text-text-primary min-h-screen flex flex-col font-sans selection:bg-emerald-900/40 selection:text-emerald-200 antialiased relative">
        <InteractiveGrid />
        {/* Top Operational Status & Header */}
        <header className="sticky top-0 z-40 w-full border-b border-border-dim bg-background/90 backdrop-blur-md">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
            {/* Logo Monogram */}
            <Link
              href="/"
              className="flex items-center gap-2 text-text-primary hover:text-white font-mono text-sm tracking-tight font-semibold"
            >
              <span className="text-accent-emerald">[</span>
              <span>AS</span>
              <span className="text-accent-emerald">]</span>
              <span className="text-text-secondary text-xs hidden sm:inline">aadrit.dev</span>
            </Link>

            {/* Navigation Links */}
            <nav className="flex items-center gap-1 sm:gap-2 text-xs font-mono">
              <Link
                href="/#projects"
                className="px-2.5 py-1.5 rounded text-text-secondary hover:text-text-primary hover:bg-surface transition-colors"
              >
                Projects
              </Link>
              <Link
                href="/#experience"
                className="px-2.5 py-1.5 rounded text-text-secondary hover:text-text-primary hover:bg-surface transition-colors"
              >
                Experience
              </Link>
              <Link
                href="/#skills"
                className="px-2.5 py-1.5 rounded text-text-secondary hover:text-text-primary hover:bg-surface transition-colors"
              >
                Skills
              </Link>
              <Link
                href="/#terminal"
                className="px-2.5 py-1.5 rounded text-text-secondary hover:text-text-primary hover:bg-surface transition-colors hidden md:inline-flex items-center gap-1"
              >
                <Terminal className="w-3.5 h-3.5" />
                Terminal
              </Link>
              <Link
                href="/#contact"
                className="ml-2 px-3 py-1.5 rounded-md border border-border-bright bg-surface text-text-primary hover:bg-surface-raised transition-colors"
              >
                Contact
              </Link>
            </nav>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1">{children}</main>

        {/* Hardened Minimal Footer */}
        <footer className="w-full border-t border-border-dim bg-surface py-8 text-xs font-mono text-text-muted">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="inline-block w-2 h-2 rounded-full bg-accent-emerald animate-pulse"></span>
              <span>System Status: Fully Operational</span>
              <span className="text-border-bright">|</span>
              <span>TLS 1.3 / HSTS / CSP Enabled</span>
            </div>

            <div className="flex items-center gap-4 text-text-secondary">
              <Link href="/privacy" className="hover:text-text-primary transition-colors">
                Privacy Policy
              </Link>
              <span>/</span>
              <Link href="/terms" className="hover:text-text-primary transition-colors">
                Terms of Use
              </Link>
              <span>/</span>
              <Link href="/admin/login" className="hover:text-text-primary transition-colors flex items-center gap-1">
                <Shield className="w-3 h-3" />
                Console
              </Link>
            </div>

            <div className="text-text-muted">
              (c) {new Date().getFullYear()} Aadrit Srivastava. All rights reserved.
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}

