import type { Metadata } from "next";
import Link from "next/link";
import Ots320TerminalLab from "@/components/ots320/Ots320TerminalLab";

export const metadata: Metadata = {
  title: "OTS-320 AI CLI Lab — OpenTeachStack",
  description:
    "A deterministic browser terminal for practicing Codex CLI, Claude Code, and Antigravity CLI concepts without executing a host shell.",
};

export default function Ots320TerminalLabPage() {
  return (
    <div className="mx-auto w-full max-w-[92rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
      <div className="mx-auto max-w-4xl">
        <div className="flex flex-wrap items-center gap-2 font-mono text-xs uppercase tracking-[0.14em] text-slate">
          <Link href="/labs" className="transition-colors hover:text-accent">
            Labs
          </Link>
          <span aria-hidden="true">/</span>
          <span className="text-accent">OTS-320</span>
          <span aria-hidden="true">/</span>
          <span>Phase 4</span>
        </div>

        <p className="mt-7 font-mono text-xs font-semibold uppercase tracking-[0.18em] text-accent">
          Command Line AI for Teacher Builders
        </p>
        <h1 className="mt-3 font-heading text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
          The terminal is the classroom.
        </h1>
        <p className="mt-5 max-w-3xl text-lg leading-relaxed text-slate">
          Practice how an AI coding agent sees a repository, requests access, inspects files, and leaves evidence. The interface looks and behaves like a terminal, but the commands below only touch a deterministic fictional repository in memory.
        </p>

        <div className="mt-7 grid gap-3 sm:grid-cols-3">
          {[
            ["Environment", "Synthetic repository"],
            ["Execution", "No host shell"],
            ["Evidence", "Explicit + reviewable"],
          ].map(([label, value]) => (
            <div key={label} className="rounded-md border border-border bg-surface px-4 py-3">
              <p className="font-mono text-[0.66rem] uppercase tracking-[0.14em] text-slate">
                {label}
              </p>
              <p className="mt-1 text-sm font-semibold text-foreground">{value}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-10">
        <Ots320TerminalLab />
      </div>

      <div className="mx-auto mt-10 grid max-w-5xl gap-6 md:grid-cols-2">
        <section className="rounded-lg border border-border bg-surface p-5">
          <p className="font-mono text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-accent">
            What to notice
          </p>
          <h2 className="mt-2 font-heading text-xl font-bold text-foreground">
            The answer is not the evidence.
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-slate">
            Watch the event panel while you inspect files, run Git commands, or try a blocked operation. The useful evidence is the file read, permission boundary, Git state, diff, or command result that can actually be reviewed.
          </p>
        </section>

        <section className="rounded-lg border border-border bg-surface p-5">
          <p className="font-mono text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-accent">
            Safety boundary
          </p>
          <h2 className="mt-2 font-heading text-xl font-bold text-foreground">
            Real-looking commands. Fictional effects.
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-slate">
            This lab does not proxy Bash, PowerShell, SSH, provider APIs, MCP servers, or your local filesystem. Unsupported input is rejected instead of being passed to a machine.
          </p>
        </section>
      </div>
    </div>
  );
}
