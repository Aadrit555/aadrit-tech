import RohanHero from "@/components/rohan-style/RohanHero";
import ProjectsTable from "@/components/rohan-style/ProjectsTable";
import GithubActivity from "@/components/rohan-style/GithubActivity";
import AchievementsCarousel from "@/components/rohan-style/AchievementsCarousel";
import SkillsBento from "@/components/rohan-style/SkillsBento";
import VolunteeringSection from "@/components/rohan-style/VolunteeringSection";
import TimelineSection from "@/components/rohan-style/TimelineSection";
import ContactSegmentedBar from "@/components/rohan-style/ContactSegmentedBar";
import ServicesSection from "@/components/rohan-style/ServicesSection";
import AudioRippleWidget from "@/components/rohan-style/AudioRippleWidget";
import TerminalConsole from "@/components/TerminalConsole";
import ArcadeSection from "@/components/game/ArcadeSection";

export default function Home() {
  return (
    <div className="space-y-0 pb-16">
      {/* 1. Hero Section with rotated status badge and cycling roles */}
      <RohanHero />

      {/* 2. Projects Table with / DATE, / NAME, / TYPE index */}
      <ProjectsTable />

      {/* 3. GitHub Activity Heatmap */}
      <GithubActivity />

      {/* 4. Achievements Carousel */}
      <AchievementsCarousel />

      {/* 5. Skills Bento Grid */}
      <SkillsBento />

      {/* 6. Volunteering & Lab Section */}
      <VolunteeringSection />

      {/* 7. Education & Milestones Timeline */}
      <TimelineSection />

      {/* 8. Joined Segmented Contact Strip */}
      <ContactSegmentedBar />

      {/* 9. Services & Collaboration Section */}
      <ServicesSection />

      {/* 10. Hoenn / Rayquaza Ripple Sound Widget */}
      <AudioRippleWidget />

      {/* 11. Interactive Terminal Console */}
      <div id="terminal" className="pt-8">
        <TerminalConsole />
      </div>

      {/* 12. Devon Corp 3D Simulation Chamber */}
      <ArcadeSection />

      {/* Footer */}
      <footer className="py-8 sm:py-12 max-w-5xl mx-auto border-t border-[var(--border)] px-4 sm:px-6 mt-12">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-mono text-[var(--muted)]">
          <p>Aadrit Shrivastava © {new Date().getFullYear()} · Hoenn Dex #0384</p>
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/Aadrit555"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[var(--foreground)] transition-colors"
            >
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/skaoldi-ntlap"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[var(--foreground)] transition-colors"
            >
              LinkedIn
            </a>
            <a
              href="mailto:aadrit.yks@gmail.com"
              className="hover:text-[var(--foreground)] transition-colors"
            >
              Email
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
