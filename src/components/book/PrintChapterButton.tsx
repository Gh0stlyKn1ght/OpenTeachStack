"use client";

export default function PrintChapterButton() {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="inline-flex rounded-sm border border-border px-3 py-2 font-mono text-[0.7rem] uppercase tracking-wider text-foreground/60 transition-colors hover:border-accent hover:text-accent"
    >
      Print
    </button>
  );
}
