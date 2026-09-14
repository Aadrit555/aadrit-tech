"use client";

import Image from "next/image";
import { ArrowUpRight, Award, FlaskConical, Users } from "lucide-react";
import SpotlightCard from "@/components/animations/SpotlightCard";
import ScrollReveal from "@/components/animations/ScrollReveal";

interface LeadershipRole {
  organization: string;
  role: string;
  slug: string;
  period: string;
  website: string;
  logoUrl: string;
  actionText: string;
  description: string;
  bullets: string[];
  tags: string[];
}

const leadershipRoles: LeadershipRole[] = [
  {
    organization: "Next Tech Lab AP",
    role: "Member at NTL AP",
    slug: "ntlap",
    period: "Nov 2024 - Present",
    website: "https://www.ntlap.in",
    logoUrl: "/images/ntl.png",
    actionText: "LEARN ABOUT THE NTLAP through www.ntlap.in",
    description:
      "Student-led technology lab at SRM University AP working on practical machine learning and systems engineering.",
    bullets: [
      "Trained and evaluated machine learning models in Python for lab projects.",
      "Wrote data preparation scripts to clean and format datasets.",
      "Collaborated with lab peers on code reviews and experiments.",
    ],
    tags: ["MEMBER", "NTL AP", "MACHINE LEARNING", "PYTHON"],
  },
  {
    organization: "FOSS SRMAP",
    role: "Co-Lead at FOSS SRMAP",
    slug: "foss",
    period: "2024 - Present",
    website: "https://fossunited.org",
    logoUrl: "/images/foss.png",
    actionText: "EXPLORE FOSS UNITED through fossunited.org",
    description:
      "Student open-source chapter at SRM University AP affiliated with the FOSS United Foundation.",
    bullets: [
      "Co-leading campus workshops, open-source meetups, and developer sprints.",
      "Mentoring peers on Git, GitHub, and contributing to open-source software.",
      "Organizing local hackathons and student tech events.",
    ],
    tags: ["CO-LEAD", "FOSS SRMAP", "OPEN SOURCE", "COMMUNITY"],
  },
];

const academicAndHonors = [
  {
    category: "Education",
    title: "SRM University AP",
    role: "B.Tech in Computer Science & Engineering",
    period: "2023 - 2027",
    description:
      "Studying core computer science: operating systems, data structures, algorithms, and networks.",
  },
  {
    category: "National Honor",
    title: "MANAK Inspire Award",
    role: "National Recognition",
    period: "DST, Govt. of India",
    description:
      "Awarded by the Department of Science and Technology for innovative applied engineering.",
  },
  {
    category: "Hackathon Victory",
    title: "JUST A HACKATHON Winner",
    role: "FOSS United",
    period: "2024",
    description:
      "Won recognition at FOSS United for embedded microcontroller memory protection in C.",
  },
];

export default function WorkHistory() {
  return (
    <section id="experience" className="py-12 md:py-20 bg-transparent relative z-10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Section Header with Pokédex Styling */}
        <div className="mb-10 p-6 sm:p-8 bg-white/85 backdrop-blur-md border border-white/70 rounded-2xl shadow-md">
          <div className="text-xs font-mono text-[#dc2626] tracking-wider uppercase mb-2 font-bold flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            <span>Experience // Activity Record</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight text-zinc-950 font-sans">
            Work & <span className="font-serif italic font-normal text-zinc-600">experience.</span>
          </h2>
        </div>

        {/* Featured Interactive Cards for NTL & FOSS SRMAP */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {leadershipRoles.map((item, idx) => (
            <ScrollReveal key={item.slug} delay={idx * 100}>
              <SpotlightCard
                className="p-6 sm:p-8 border border-white/70 bg-white/85 backdrop-blur-md shadow-md hover:border-zinc-300 transition-all flex flex-col justify-between h-full"
              >
                <div className="space-y-5">
                  {/* Top Interactive Logo & Header */}
                  <div className="flex items-start justify-between gap-4">
                    {/* Interactive Clickable Logo */}
                    <a
                      href={item.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group/logo relative w-16 h-16 rounded-md border-2 border-zinc-200 bg-zinc-50 p-2 flex items-center justify-center overflow-hidden hover:border-[#dc2626] hover:bg-white hover:shadow-md transition-all duration-300 cursor-pointer flex-shrink-0"
                      title={`Visit ${item.organization} website`}
                    >
                      <Image
                        src={item.logoUrl}
                        alt={`${item.organization} logo`}
                        width={48}
                        height={48}
                        className="object-contain w-full h-full group-hover/logo:scale-110 transition-transform duration-300"
                      />
                      <span className="sr-only">{item.organization}</span>
                    </a>

                    <div className="flex flex-col items-start sm:items-end gap-1.5">
                      <span className="text-xs font-mono text-zinc-500 font-medium">
                        {item.period}
                      </span>
                      <a
                        href={item.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-white/90 hover:bg-white border border-zinc-200 hover:border-[#dc2626] text-[11px] font-mono font-bold text-[#dc2626] hover:text-zinc-950 transition-all shadow-2xs group/action cursor-pointer text-left sm:text-right"
                        title={item.actionText}
                      >
                        <span>{item.actionText}</span>
                        <ArrowUpRight className="w-3.5 h-3.5 flex-shrink-0 transition-transform group-hover/action:translate-x-0.5 group-hover/action:-translate-y-0.5" />
                      </a>
                    </div>
                  </div>

                  {/* Role & Organization */}
                  <div>
                    <h3 className="text-xl sm:text-2xl font-medium text-zinc-950 font-sans flex items-center gap-2">
                      {item.slug === "ntlap" ? (
                        <FlaskConical className="w-5 h-5 text-red-500" />
                      ) : (
                        <Users className="w-5 h-5 text-cyan-600" />
                      )}
                      <span>{item.role}</span>
                    </h3>
                    <div className="text-xs font-mono text-zinc-500 font-semibold mt-1">
                      {item.organization}
                    </div>
                  </div>

                  {/* Description & Bullets */}
                  <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed font-sans">
                    {item.description}
                  </p>

                  <ul className="space-y-1.5 text-xs text-zinc-600 font-sans list-disc list-inside">
                    {item.bullets.map((bullet, bIdx) => (
                      <li key={bIdx} className="leading-relaxed">
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Tags footer */}
                <div className="pt-6 border-t border-border-dim flex flex-wrap gap-1.5 mt-6">
                  {item.tags.map((tag, tIdx) => (
                    <span key={tIdx} className="code-badge text-[10px]">
                      {tag}
                    </span>
                  ))}
                </div>
              </SpotlightCard>
            </ScrollReveal>
          ))}
        </div>

        {/* Academic & Honors Context inside Frosted Glass Card */}
        <ScrollReveal>
          <div className="p-6 sm:p-8 rounded-2xl bg-white/85 backdrop-blur-md border border-white/70 shadow-md space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-border-dim">
              <h3 className="text-xl sm:text-2xl font-normal text-zinc-950 font-sans flex items-center gap-2">
                <Award className="w-5 h-5 text-amber-500" />
                <span>Education & <span className="font-serif italic text-zinc-600">recognitions</span></span>
              </h3>
              <span className="text-xs font-mono text-zinc-500 font-medium">SRM University AP</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {academicAndHonors.map((item, idx) => (
                <div key={idx} className="p-5 rounded-md border border-white/80 bg-white/60 hover:bg-white/80 transition-colors shadow-xs space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono text-[#dc2626] uppercase font-bold">
                      {item.category}
                    </span>
                    <span className="text-[11px] font-mono text-zinc-400">
                      {item.period}
                    </span>
                  </div>
                  <div className="text-sm font-medium text-zinc-950 font-sans">
                    {item.title}
                  </div>
                  <div className="text-xs font-mono text-zinc-500 font-medium">
                    {item.role}
                  </div>
                  <p className="text-xs text-zinc-600 leading-relaxed font-sans pt-1">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
