import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import Skills from "@/components/Skills";
import TerminalConsole from "@/components/TerminalConsole";
import ContactSection from "@/components/ContactSection";

export default function Home() {
  return (
    <div className="space-y-0">
      <Hero />
      <Projects />
      <Experience />
      <Skills />
      <TerminalConsole />
      <ContactSection />
    </div>
  );
}

