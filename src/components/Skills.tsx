import { Code2, Cpu, Database, Wrench, Shield, Layers } from "lucide-react";

interface SkillCategory {
  title: string;
  icon: typeof Code2;
  items: { name: string; note: string }[];
}

const skillCategories: SkillCategory[] = [
  {
    title: "Programming Languages",
    icon: Code2,
    items: [
      { name: "Python", note: "Primary: AI/ML modeling, simulation frameworks, automation" },
      { name: "C", note: "Low-level firmware defenses, systems benchmarking, memory profiling" },
      { name: "SQL", note: "Relational database queries, schema design, integrity validation" },
      { name: "Bash / Shell", note: "Linux environment orchestration, build scripts, system automation" },
    ],
  },
  {
    title: "ML / Data Engineering",
    icon: Database,
    items: [
      { name: "Supervised Learning", note: "Classification, intent extraction, regression models" },
      { name: "Model Training & Evaluation", note: "Hyperparameter tuning, cross-validation, metrics" },
      { name: "Data Preprocessing", note: "Feature engineering, dataset cleaning pipelines" },
      { name: "Information Retrieval / RAG", note: "Dense vector search, document indexing" },
    ],
  },
  {
    title: "Systems & Security Tools",
    icon: Cpu,
    items: [
      { name: "Firmware Defense & Crypto", note: "Cryptographic validation, side-channel mitigation" },
      { name: "Git / GitHub", note: "Version control, branching strategies, collaborative workflows" },
      { name: "REST APIs & JSON", note: "Contract design, payload validation, endpoint security" },
      { name: "Arduino & Microcontrollers", note: "Embedded sensor integration, I/O interfacing" },
    ],
  },
];

export default function Skills() {
  return (
    <section id="skills" className="py-16 md:py-24 border-b border-border-dim bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-4 border-b border-border-dim gap-4">
          <div>
            <div className="text-xs font-mono text-accent-emerald tracking-wider uppercase mb-1">
              [04. TECHNICAL_CAPABILITIES]
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white font-sans">
              Technical Arsenal
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-text-secondary font-mono max-w-md">
            Verified technical toolsets utilized across AI research, systems programming, and production projects.
          </p>
        </div>

        {/* 3-Column Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {skillCategories.map((category, idx) => {
            const Icon = category.icon;
            return (
              <div
                key={idx}
                className="tech-card p-6 bg-surface/60 border border-border-dim hover:border-border-bright flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-2 mb-4 pb-3 border-b border-border-dim">
                    <Icon className="w-4 h-4 text-accent-emerald" />
                    <h3 className="text-sm font-bold text-white font-mono uppercase tracking-wide">
                      {category.title}
                    </h3>
                  </div>

                  <div className="space-y-3">
                    {category.items.map((skill, sIdx) => (
                      <div key={sIdx} className="space-y-0.5">
                        <div className="text-xs font-mono font-semibold text-text-primary flex items-center justify-between">
                          <span>{skill.name}</span>
                          <span className="text-[10px] text-text-muted font-mono">VERIFIED</span>
                        </div>
                        <p className="text-[11px] text-text-secondary leading-snug">
                          {skill.note}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-3 border-t border-border-dim flex items-center justify-between text-[11px] font-mono text-text-muted">
                  <span>Category: {idx + 1} of 3</span>
                  <span className="text-accent-emerald font-mono">100% Course & Project Proven</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

