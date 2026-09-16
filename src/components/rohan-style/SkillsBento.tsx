"use client";

export default function SkillsBento() {
  return (
    <section id="skills" className="py-8 sm:py-16 max-w-5xl mx-auto px-4 sm:px-6 relative z-10">
      <h2 className="py-3 sm:py-4 text-3xl sm:text-4xl mb-4 sm:mb-8 lowercase font-medium">
        skills
      </h2>

      {/* Rohan-style Bento Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {/* Systems & C - Large 2-column card */}
        <div className="border border-[var(--border)] p-6 bg-[var(--card)] lg:col-span-2 rounded-lg hover:border-emerald-500/40 transition-colors">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-semibold lowercase text-[var(--foreground)]">
              systems & low-level
            </h3>
            <span className="font-mono text-[10px] text-emerald-600 font-bold px-1.5 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20">
              CORE
            </span>
          </div>
          <p className="leading-relaxed text-sm text-[var(--muted)]">
            C (C99/C11), Embedded C, memory management, Linux system calls, POSIX threads, Makefiles, GCC/Clang, GDB, Valgrind, and hardware interfacing.
          </p>
        </div>

        {/* Machine Learning */}
        <div className="border border-[var(--border)] p-6 bg-[var(--card)] rounded-lg hover:border-cyan-500/40 transition-colors">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-semibold lowercase text-[var(--foreground)]">
              machine learning
            </h3>
            <span className="font-mono text-[10px] text-cyan-600 font-bold px-1.5 py-0.5 rounded bg-cyan-500/10 border border-cyan-500/20">
              PYTORCH
            </span>
          </div>
          <p className="leading-relaxed text-sm text-[var(--muted)]">
            Python, PyTorch, policy models, attention mechanisms, tokenizers, NumPy, and lightweight CPU inference for small models.
          </p>
        </div>

        {/* Security & Image Integrity */}
        <div className="border border-[var(--border)] p-6 bg-[var(--card)] rounded-lg hover:border-amber-500/40 transition-colors">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-semibold lowercase text-[var(--foreground)]">
              security & verification
            </h3>
            <span className="font-mono text-[10px] text-amber-600 font-bold px-1.5 py-0.5 rounded bg-amber-500/10 border border-amber-500/20">
              HEMLOCK
            </span>
          </div>
          <p className="leading-relaxed text-sm text-[var(--muted)]">
            Cryptographic signatures, perceptual image hashing, tamper detection algorithms, and content verification systems.
          </p>
        </div>

        {/* Tools & Workflow - Large 2-column card */}
        <div className="border border-[var(--border)] p-6 bg-[var(--card)] lg:col-span-2 rounded-lg hover:border-purple-500/40 transition-colors">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-semibold lowercase text-[var(--foreground)]">
              tools & workflow
            </h3>
            <span className="font-mono text-[10px] text-purple-600 font-bold px-1.5 py-0.5 rounded bg-purple-500/10 border border-purple-500/20">
              STACK
            </span>
          </div>
          <p className="leading-relaxed text-sm text-[var(--muted)]">
            Linux, Git & GitHub, Bash, Neovim, Docker, FastAPI, TypeScript, Next.js, and leading open-source student sprints.
          </p>
        </div>
      </div>
    </section>
  );
}
