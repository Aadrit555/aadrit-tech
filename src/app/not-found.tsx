import Link from "next/link";
import { Terminal, ArrowLeft, Home, HelpCircle, AlertCircle } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center p-4 bg-white relative z-10">
      <div className="max-w-xl w-full border border-border-dim bg-white p-6 sm:p-8 rounded-md shadow-sm">
        {/* Terminal Header */}
        <div className="flex items-center justify-between pb-4 mb-6 border-b border-border-dim text-xs font-mono">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#f9452d]"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-zinc-300"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-zinc-300"></span>
            <span className="text-[#f9452d] font-semibold ml-2">ROUTER_EXCEPTION</span>
          </div>
          <span className="text-zinc-400">ERROR_CODE_404</span>
        </div>

        {/* Error Code & Details */}
        <div className="space-y-4 font-mono">
          <div className="text-xs text-[#f9452d] font-semibold tracking-wide">
            [STATUS: 404 NOT FOUND]
          </div>

          <h1 className="text-2xl sm:text-3xl font-normal text-zinc-950 font-sans">
            Requested Resource Unreachable
          </h1>

          <div className="p-4 rounded bg-zinc-50 border border-border-dim text-xs text-zinc-600 space-y-1.5 leading-relaxed">
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
              <span>Contact Aadrit</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}


