import type { CSSProperties } from "react";

const before = [
  "Scattered Drive folders",
  "Random AI prompts",
  "Copied standards",
  "Repeated manual work",
  "No version history",
  "Disconnected resources",
];

const after = [
  "Clear course map",
  "Reusable prompt library",
  "Standards evidence",
  "Resource evaluation system",
  "Workflow templates",
  "Automation roadmap",
];

export default function BeforeAfterGrid() {
  return (
    <section className="content-visibility-auto border-y border-border bg-surface-alt/30">
      <div className="mx-auto grid max-w-5xl gap-6 px-6 py-20 md:grid-cols-2">
        <div className="lab-card p-6" style={{ "--card-accent": "var(--color-orange)" } as CSSProperties}>
          <p className="mb-2 font-mono text-xs font-bold uppercase tracking-widest text-[var(--color-orange)]">
            Before
          </p>
          <h2 className="mb-5 font-heading text-2xl font-bold text-foreground">
            Teaching work feels scattered
          </h2>
          <ul className="space-y-3 pl-0">
            {before.map((item) => (
              <li key={item} className="flex gap-3 text-sm text-slate">
                <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[var(--color-orange)]" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="lab-card p-6" style={{ "--card-accent": "var(--color-green)" } as CSSProperties}>
          <p className="mb-2 font-mono text-xs font-bold uppercase tracking-widest text-[var(--color-green)]">
            After
          </p>
          <h2 className="mb-5 font-heading text-2xl font-bold text-foreground">
            Teaching work becomes a system
          </h2>
          <ul className="space-y-3 pl-0">
            {after.map((item) => (
              <li key={item} className="flex gap-3 text-sm text-slate">
                <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[var(--color-green)]" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

