import type { Metadata } from "next";
import { Instrument_Serif, Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { Terminal } from "lucide-react";
import InteractiveGrid from "@/components/animations/InteractiveGrid";
import PokemonBackground from "@/components/pokemon/PokemonBackground";
import GastlyLoadingScreen from "@/components/pokemon/GastlyLoadingScreen";
import ScrollProgressBar from "@/components/animations/ScrollProgressBar";

const instrumentSerif = Instrument_Serif({
  weight: "400",
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-serif",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Aadrit | AI/ML & Systems Developer",
  description:
    "Portfolio of Aadrit. Computer Science undergraduate at SRM University AP building lightweight machine learning systems in Python and systems software in C.",
  keywords: [
    "Aadrit",
    "Systems Developer",
    "Machine Learning",
    "SRM University AP",
    "SLM",
    "Hemlock",
    "Chimera",
    "SuperRAG",
    "Next Tech Lab",
  ],
  authors: [{ name: "Aadrit" }],
  creator: "Aadrit",
  metadataBase: new URL("https://aadrit.tech"),
  alternates: {
    canonical: "https://aadrit.tech",
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
  openGraph: {
    title: "Aadrit | AI/ML & Systems Developer",
    description:
      "Computer Science undergraduate at SRM University AP building lightweight machine learning systems in Python and systems software in C.",
    url: "https://aadrit.tech",
    siteName: "Aadrit Portfolio",
    images: [
      {
        url: "/images/aadrit.png",
        width: 600,
        height: 600,
        alt: "Aadrit",
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
    <html lang="en" className={`${instrumentSerif.variable} ${inter.variable}`}>
      <body className="bg-transparent text-text-primary min-h-screen flex flex-col font-sans selection:bg-[#f9452d]/15 selection:text-zinc-900 antialiased relative">
        <GastlyLoadingScreen />
        <PokemonBackground />
        {/* Pokédex Top Hardware Status & Header */}
        <header className="sticky top-0 z-40 w-full border-b-2 border-red-800/80 bg-zinc-950/90 text-zinc-100 backdrop-blur-md shadow-md relative">
          <ScrollProgressBar />
          <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
            {/* Pokédex Brand & Sensor Array */}
            <Link
              href="/"
              className="flex items-center gap-2 text-zinc-100 font-mono text-sm sm:text-base tracking-tight font-bold hover:opacity-90 transition-opacity"
            >
              <div className="flex items-center gap-1.5">
                <span className="w-3.5 h-3.5 rounded-full bg-cyan-400 border border-white shadow-[0_0_8px_rgba(6,182,212,0.8)] animate-pulse" />
                <span className="w-2 h-2 rounded-full bg-red-500" />
                <span className="w-2 h-2 rounded-full bg-amber-400" />
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
              </div>
              <span className="ml-1 text-white font-mono tracking-wider">POKÉDEX</span>
              <span className="text-[#f9452d] text-lg -ml-1 font-sans">*</span>
              <span className="text-[10px] font-mono text-zinc-400 hidden sm:inline px-1.5 py-0.5 rounded bg-zinc-800 border border-zinc-700">
                HOENN v3.0
              </span>
            </Link>

            {/* Conventional Section Navigation */}
            <nav className="flex items-center gap-1 sm:gap-2 text-xs font-mono">
              <Link
                href="/#work"
                className="px-2 py-1 text-zinc-300 hover:text-white hover:bg-zinc-800/80 rounded transition-colors font-medium"
              >
                Work
              </Link>
              <Link
                href="/#experience"
                className="px-2 py-1 text-zinc-300 hover:text-white hover:bg-zinc-800/80 rounded transition-colors font-medium"
              >
                Experience
              </Link>
              <Link
                href="/#about"
                className="px-2 py-1 text-zinc-300 hover:text-white hover:bg-zinc-800/80 rounded transition-colors font-medium"
              >
                About
              </Link>
              <Link
                href="/#terminal"
                className="px-2 py-1 text-zinc-300 hover:text-white hover:bg-zinc-800/80 rounded transition-colors hidden sm:inline-flex items-center gap-1"
                title="Pokédex System Terminal"
              >
                <Terminal className="w-3.5 h-3.5 text-accent-emerald" />
                <span>Terminal</span>
              </Link>
              <Link
                href="/#contact"
                className="ml-1 px-3 py-1 rounded-md bg-[#dc2626] hover:bg-[#b91c1c] text-white font-bold transition-all shadow-sm border border-red-400"
              >
                Contact
              </Link>
            </nav>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 relative z-10">{children}</main>
      </body>
    </html>
  );
}

