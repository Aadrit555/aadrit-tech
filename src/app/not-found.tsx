import Link from "next/link";
import { Terminal, ArrowLeft, Home, HelpCircle } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[calc(100vh-56px)] flex items-center justify-center p-4 bg-tech-grid-dense">
      <div className="max-w-xl w-full tech-card border-red-900/60 bg-[#070a10] p-6 sm:p-8 shadow-2xl">
        {/* Terminal Header */}
        <div className="flex items-center justify-between pb-4 mb-6 border-b border-border-dim text-xs font-mono">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-red-600"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-zinc-700"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-zinc-700"></span>
            <span className="text-red-400 ml-2">ROUTER_EXCEPTION</span>
          </div>
          <span className="text-text-muted">ERROR_CODE_404</span>
        </div>

        {/* Error Code & Details */}
        <div className="space-y-4 font-mono">
          <div className="text-xs text-red-400 font-semibold tracking-wide">
            [STATUS: 404 NOT FOUND]
          </div>

          <h1 className="text-xl sm:text-2xl font-bold text-white font-sans">
            Requested Resource Unreachable
          </h1>

          <div className="p-3.5 rounded bg-surface border border-border-dim text-xs text-text-secondary space-y-1 leading-relaxed">
            <div>&gt; QUERY: Path resolution failed across registered routes.</div>
            <div>&gt; DIAGNOSTIC: Target file, controller, or document does not exist.</div>
            <div>&gt; ACTION: Re-route traffic to root cluster.</div>
          </div>

          {/* Action Links */}
          <div className="pt-4 flex flex-wrap gap-3">
            <Link href="/" className="btn-primary flex items-center gap-2">
              <Home className="w-3.5 h-3.5" />
              <span>Return to Workstation</span>
            </Link>

            <Link href="/#work" className="btn-secondary flex items-center gap-2">
              <Terminal className="w-3.5 h-3.5" />
              <span>Inspect Projects</span>
            </Link>

            <Link href="/#contact" className="btn-secondary flex items-center gap-2">
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Report Issue</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

