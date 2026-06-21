import Link from "next/link";

export default function SourcePanel() {
  return (
    <div className="rounded-sm border border-border bg-surface-alt/35 p-5">
      <p className="mb-2 font-mono text-[0.68rem] uppercase tracking-wider text-accent">
        Source rule
      </p>
      <p className="m-0 text-sm leading-relaxed text-foreground/62">
        Evidence pages do not invent statistics. Quantitative claims should be
        added only after the source bank has a verified official or research
        source to support them.
      </p>
      <Link
        href="/library/source-bank"
        className="mt-4 inline-flex text-sm font-semibold text-link no-underline hover:underline"
      >
        Review the source bank
      </Link>
    </div>
  );
}
