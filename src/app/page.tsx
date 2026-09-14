import HeroSection from "@/components/akash-style/HeroSection";
import SelectedWork from "@/components/akash-style/SelectedWork";
import AboutSection from "@/components/akash-style/AboutSection";
import WorkHistory from "@/components/akash-style/WorkHistory";
import TerminalConsole from "@/components/TerminalConsole";
import FooterCta from "@/components/akash-style/FooterCta";

export default function Home() {
  return (
    <div className="space-y-0">
      <HeroSection />
      <SelectedWork />
      <WorkHistory />
      <AboutSection />
      <TerminalConsole />
      <FooterCta />
    </div>
  );
}
