"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Lock, ShieldCheck, AlertCircle, ArrowLeft } from "lucide-react";

export default function AdminLoginPage() {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    try {
      const res = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMsg(data.error || "Authentication failed.");
        setLoading(false);
        return;
      }

      router.push("/admin");
      router.refresh();
    } catch {
      setErrorMsg("Network or transport failure.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-56px)] flex items-center justify-center p-4 bg-tech-grid-dense">
      <div className="max-w-md w-full tech-card border-border-bright bg-[#090d14] p-6 sm:p-8 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 mb-6 border-b border-border-dim text-xs font-mono">
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4 text-accent-emerald" />
            <span className="text-white font-semibold">SECURE_ADMIN_PORT</span>
          </div>
          <Link href="/" className="text-text-muted hover:text-white flex items-center gap-1">
            <ArrowLeft className="w-3 h-3" />
            <span>exit</span>
          </Link>
        </div>

        <div className="space-y-4">
          <div>
            <h1 className="text-xl font-bold text-white font-sans">
              System Administration
            </h1>
            <p className="text-xs font-mono text-text-secondary mt-1">
              Protected interface. Session cookies are HTTP-only and cryptographically verified.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4 pt-2">
            <div className="space-y-1.5">
              <label className="text-xs font-mono text-text-secondary block">
                Master Security Key
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••••••••••"
                className="w-full px-3 py-2.5 rounded-md bg-surface border border-border-dim text-xs font-mono text-text-primary placeholder:text-zinc-700 focus:outline-none focus:border-border-bright tracking-wider"
              />
            </div>

            {errorMsg && (
              <div className="p-3 rounded-md bg-red-950/50 border border-red-900/60 text-red-300 text-xs font-mono flex items-center gap-2">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full flex items-center justify-center gap-2 mt-4"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>{loading ? "Verifying Hash..." : "Authenticate"}</span>
            </button>
          </form>

          <div className="pt-4 border-t border-border-dim text-[11px] font-mono text-text-muted text-center">
            Brute-force protection: Rate limit enforced after 5 failed attempts.
          </div>
        </div>
      </div>
    </div>
  );
}

