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
          <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
            {/* Brand Logo matching Akash* */}
            <Link
              href="/"
              className="flex items-center text-white font-mono text-base tracking-tight font-bold hover:text-accent-emerald transition-colors"
            >
              <span>Aadrit</span>
              <span className="text-accent-emerald text-lg ml-0.5">*</span>
            </Link>

            {/* Navigation Links matching Akash's menu */}
            <nav className="flex items-center gap-1 sm:gap-4 text-xs font-mono">
              <Link
                href="/#work"
                className="px-2.5 py-1.5 text-text-secondary hover:text-white transition-colors"
              >
                Work
              </Link>
              <Link
                href="/#about"
                className="px-2.5 py-1.5 text-text-secondary hover:text-white transition-colors"
              >
                About me
              </Link>
              <Link
                href="/#experience"
                className="px-2.5 py-1.5 text-text-secondary hover:text-white transition-colors"
              >
                Experience
              </Link>
              <Link
                href="/#terminal"
                className="px-2.5 py-1.5 text-text-secondary hover:text-white transition-colors hidden sm:inline-flex items-center gap-1"
              >
                <Terminal className="w-3.5 h-3.5" />
                <span>Terminal</span>
              </Link>
              <Link
                href="/#contact"
                className="ml-2 px-3.5 py-1.5 rounded-md bg-zinc-100 text-zinc-900 hover:bg-white font-medium transition-all shadow-sm"
              >
                Say Hi!
              </Link>
            </nav>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1">{children}</main>
      </body>
    </html>
  );
}

