"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Shield, LogOut, Mail, Clock, Globe, RefreshCw, Terminal, AlertTriangle } from "lucide-react";

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  ip: string;
  userAgent: string;
  receivedAt: string;
}

export default function AdminDashboardPage() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [auditLogs, setAuditLogs] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();

  const fetchRecords = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin/messages");
      if (res.status === 401) {
        router.push("/admin/login");
        return;
      }
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Failed to load admin records");
        return;
      }
      setMessages(data.messages || []);
      setAuditLogs(data.auditLogs || []);
    } catch {
      setError("Network error communicating with admin controller.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecords();
  }, []);

  const handleLogout = async () => {
    try {
      await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "logout" }),
      });
    } finally {
      router.push("/admin/login");
      router.refresh();
    }
  };

  return (
    <div className="py-10 bg-background min-h-[calc(100vh-56px)] font-sans">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-8">
        {/* Top Control Bar */}
        <div className="tech-card p-4 sm:p-6 bg-surface flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-accent-emerald"></span>
              <h1 className="text-xl font-bold text-white font-mono">
                System Administration Console
              </h1>
            </div>
            <p className="text-xs font-mono text-text-muted">
              Authenticated Session | Endpoint /api/admin/messages
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={fetchRecords}
              className="btn-secondary flex items-center gap-1.5 text-xs"
              title="Refresh Data"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
              <span>Refresh</span>
            </button>

            <button
              onClick={handleLogout}
              className="btn-danger flex items-center gap-1.5 text-xs"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>

        {error && (
          <div className="p-4 rounded-md bg-red-950/40 border border-red-900/60 text-red-300 text-xs font-mono flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* 2-Column Section: Messages & Audit Logs */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Messages Column */}
          <div className="lg:col-span-8 space-y-4">
            <div className="flex items-center justify-between">
              <div className="text-xs font-mono text-accent-emerald tracking-wider uppercase">
                [INCOMING_MESSAGES ({messages.length})]
              </div>
            </div>

            {loading && messages.length === 0 ? (
              <div className="p-8 tech-card bg-surface text-center font-mono text-xs text-text-muted">
                Loading encrypted records...
              </div>
            ) : messages.length === 0 ? (
              <div className="p-8 tech-card bg-surface text-center font-mono text-xs text-text-muted space-y-2">
                <Mail className="w-6 h-6 mx-auto text-text-muted" />
                <div>No inquiries recorded yet.</div>
              </div>
            ) : (
              <div className="space-y-4">
                {messages.map((msg) => (
                  <div key={msg.id} className="tech-card p-5 bg-surface space-y-3">
                    <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-border-dim text-xs font-mono">
                      <div className="font-semibold text-white">
                        {msg.name}{" "}
                        <span className="text-text-muted font-normal">
                          &lt;{msg.email}&gt;
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5 text-[11px] text-text-muted">
                        <Clock className="w-3 h-3" />
                        <span>{new Date(msg.receivedAt).toLocaleString()}</span>
                      </div>
                    </div>

                    <div className="text-xs font-mono font-bold text-accent-cyan">
                      Subject: {msg.subject}
                    </div>

                    <div className="text-xs text-text-secondary whitespace-pre-wrap leading-relaxed bg-surface-raised p-3 rounded border border-border-dim font-sans">
                      {msg.message}
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-border-dim text-[10px] font-mono text-text-muted">
                      <span className="flex items-center gap-1">
                        <Globe className="w-3 h-3" />
                        <span>IP: {msg.ip}</span>
                      </span>
                      <span>ID: {msg.id}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Audit Logs Column */}
          <div className="lg:col-span-4 space-y-4">
            <div className="text-xs font-mono text-accent-cyan tracking-wider uppercase">
              [SECURITY_AUDIT_STREAM]
            </div>

            <div className="tech-card p-4 bg-[#07090f] border-border-bright rounded-md">
              <div className="flex items-center gap-2 mb-3 pb-2 border-b border-border-dim text-xs font-mono text-text-muted">
                <Terminal className="w-3.5 h-3.5 text-accent-emerald" />
                <span>/data/audit.log</span>
              </div>

              <div className="font-mono text-[11px] text-text-muted space-y-2 max-h-[500px] overflow-y-auto">
                {auditLogs.length === 0 ? (
                  <div>No security events logged yet.</div>
                ) : (
                  auditLogs.map((log, idx) => (
                    <div key={idx} className="leading-relaxed border-b border-border-dim/40 pb-1">
                      {log}
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

