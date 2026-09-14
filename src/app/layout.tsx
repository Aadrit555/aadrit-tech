import type { Metadata } from "next";
import { Instrument_Serif, Inter } from "next/font/google";
import "./globals.css";
import PokemonBackground from "@/components/pokemon/PokemonBackground";
import GastlyLoadingScreen from "@/components/pokemon/GastlyLoadingScreen";
import Header from "@/components/navigation/Header";

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
    "https://linkedin.com/in/aadrit-shrivastava",
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
        <GastlyLoadingScreen />
        <PokemonBackground />
        <Header />

        {/* Main Content Area */}
        <main className="flex-1 relative z-10">{children}</main>
      </body>
    </html>
  );
}
