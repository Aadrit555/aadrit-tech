import type { Metadata } from "next";
import { Instrument_Serif, Inter } from "next/font/google";
import "./globals.css";
import PokemonBackground from "@/components/pokemon/PokemonBackground";
import GastlyLoadingScreen from "@/components/pokemon/GastlyLoadingScreen";
import RohanHeader from "@/components/rohan-style/RohanHeader";

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
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
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
  twitter: {
    card: "summary_large_image",
    title: "Aadrit | AI/ML & Systems Developer",
    description:
      "Computer Science undergraduate at SRM University AP building lightweight machine learning systems in Python and systems software in C.",
    images: ["/images/aadrit.png"],
  },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Aadrit",
  url: "https://aadrit.tech",
  image: "https://aadrit.tech/images/aadrit.png",
  jobTitle: "AI/ML & Systems Developer",
  affiliation: {
    "@type": "Organization",
    name: "SRM University AP",
  },
  sameAs: [
    "https://github.com/Aadrit555",
    "https://linkedin.com/in/skaoldi-ntlap",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${instrumentSerif.variable} ${inter.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </head>
      <body className="bg-transparent text-text-primary min-h-screen flex flex-col font-sans selection:bg-[#f9452d]/15 selection:text-zinc-900 antialiased relative">
        {/* Skip Navigation Link for WCAG Accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-emerald-700 focus:text-white focus:rounded-md focus:shadow-xl focus:outline-none focus:ring-2 focus:ring-emerald-400 font-mono text-xs"
        >
          Skip to main content
        </a>

        <GastlyLoadingScreen />
        <PokemonBackground />
        <RohanHeader />

        {/* Main Content Landmark */}
        <main id="main-content" className="flex-1 relative z-10" tabIndex={-1}>
          {children}
        </main>
      </body>
    </html>
  );
}
