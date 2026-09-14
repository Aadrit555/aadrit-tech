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
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center p-4 bg-white relative z-10">
      <div className="max-w-md w-full border border-border-dim bg-white p-6 sm:p-8 rounded-md shadow-sm">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 mb-6 border-b border-border-dim text-xs font-mono">
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4 text-accent-emerald" />
            <span className="text-zinc-950 font-semibold">SECURE_ADMIN_PORT</span>
          </div>
          <Link href="/" className="text-zinc-500 hover:text-zinc-950 flex items-center gap-1 transition-colors">
            <ArrowLeft className="w-3 h-3" />
            <span>exit</span>
          </Link>
        </div>

        <div className="space-y-4">
          <div>
            <h1 className="text-2xl font-normal text-zinc-950 font-sans">
              System Administration
            </h1>
            <p className="text-xs font-mono text-zinc-500 mt-1">
              Protected interface. Session cookies are HTTP-only and cryptographically verified.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4 pt-2">
            <div className="space-y-1.5">
              <label className="text-xs font-mono text-zinc-600 block">
                Master Security Key
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••••••••••"
                className="w-full px-3 py-2.5 rounded-md bg-white border border-border-dim text-xs font-mono text-zinc-950 placeholder:text-zinc-400 focus:outline-none focus:border-zinc-900 tracking-wider"
              />
            </div>

            {errorMsg && (
              <div className="p-3 rounded-md bg-red-50 border border-red-200 text-red-700 text-xs font-mono flex items-center gap-2">
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

          <div className="pt-4 border-t border-border-dim text-[11px] font-mono text-zinc-500 text-center">
            Brute-force protection: Rate limit enforced after 5 failed attempts.
          </div>
        </div>
      </div>
    </div>
  );
}

