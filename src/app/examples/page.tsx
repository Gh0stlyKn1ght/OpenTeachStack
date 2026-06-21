import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Examples — Teaching Teachers",
  description:
    "Example Teaching Teachers artifacts and mini-units that show what finished work can look like.",
};

export default function ExamplesPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <header className="mb-10">
        <p className="mb-3 font-mono text-xs uppercase tracking-[0.15em] text-accent">
          Examples
        </p>
        <h1 className="mb-4 font-serif text-3xl font-extrabold tracking-normal text-foreground sm:text-4xl">
          Proof beats explanation.
        </h1>
        <p className="max-w-2xl leading-relaxed text-slate">
          Templates help. Examples convince. These samples show what an
          OTS-101 mini-unit package can look like when it is small, sourced,
          teachable, and ready to improve.
        </p>
      </header>

      <Link
        href="/examples/robotics-mini-unit"
        className="block rounded-md border border-border bg-surface p-5 no-underline transition-colors hover:border-accent/50"
      >
        <p className="mb-2 font-mono text-xs uppercase tracking-[0.15em] text-accent">
          Sample Mini-Unit
        </p>
        <h2 className="mb-2 font-serif text-xl font-bold text-foreground">
          Intro Robotics: What Is a Robot?
        </h2>
        <p className="m-0 text-sm leading-relaxed text-slate">
          A complete example package with standards thinking, mini-unit map,
          lesson structure, prompt notes, source checks, assessment, delivery,
          and revision log.
        </p>
      </Link>
    </div>
  );
}

