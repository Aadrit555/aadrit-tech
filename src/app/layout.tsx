import type { Metadata } from "next";
import { Instrument_Serif, Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { Terminal } from "lucide-react";
import InteractiveGrid from "@/components/animations/InteractiveGrid";

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
  title: "Aadrit | Sr. Product Designer",
  description:
    "Senior Product Designer with 4 year experience in designing fintech and SaaS products focused on simplifying complex workflows, improving usability, and building scalable user experiences that balance business and user needs.",
  keywords: [
    "Aadrit",
    "Senior Product Designer",
    "Product Design",
    "Fintech",
    "SaaS",
    "UX Research",
    "Design Systems",
    "Mastercard",
    "Devnagri AI",
  ],
  authors: [{ name: "Aadrit" }],
  creator: "Aadrit",
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
    title: "Aadrit | Sr. Product Designer",
    description:
      "Senior Product Designer with 4 year experience in designing fintech and SaaS products focused on simplifying complex workflows, improving usability, and building scalable user experiences that balance business and user needs.",
    url: "https://aadrit.dev",
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
    <html lang="en" className={`dark ${instrumentSerif.variable} ${inter.variable}`}>
      <body className="bg-background text-text-primary min-h-screen flex flex-col font-sans selection:bg-[#f9452d]/20 selection:text-white antialiased relative">
        <InteractiveGrid />
        {/* Top Operational Status & Header */}
        <header className="sticky top-0 z-40 w-full border-b border-border-dim bg-background/90 backdrop-blur-md">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
            {/* Brand Logo matching Akash* */}
            <Link
              href="/"
              className="flex items-center text-white font-mono text-base tracking-tight font-bold hover:opacity-80 transition-opacity"
            >
              <span>Aadrit</span>
              <span className="text-[#f9452d] text-lg ml-0.5 font-sans">*</span>
            </Link>

            {/* Navigation Links matching Akash's menu */}
            <nav className="flex items-center gap-1 sm:gap-3 text-xs font-mono">
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
                href="/#contact"
                className="px-2.5 py-1.5 text-text-secondary hover:text-white transition-colors hidden sm:inline-block"
              >
                Contact me
              </Link>
              <Link
                href="/#terminal"
                className="px-2 py-1.5 text-text-secondary hover:text-white transition-colors hidden md:inline-flex items-center gap-1"
                title="Interactive Console"
              >
                <Terminal className="w-3.5 h-3.5" />
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

