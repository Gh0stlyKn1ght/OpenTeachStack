import type { CSSProperties } from "react";

const steps = [
  "Organized Teacher",
  "AI-Assisted Planner",
  "Standards Mapper",
  "Resource Curator",
  "Google Workspace Power User",
  "Automation Builder",
  "Open-Source Educator",
  "Course Systems Designer",
];

export default function LearnerJourney() {
  return (
    <section className="content-visibility-auto mx-auto max-w-5xl px-6 py-20">
      <div className="mb-8 max-w-2xl">
        <span className="mb-3 inline-block font-mono text-xs uppercase tracking-[0.15em] text-accent">
          Learner Journey
        </span>
        <h2 className="mb-3 font-heading text-3xl font-bold text-foreground">
          From non-tech teacher to curriculum systems builder
        </h2>
        <p className="text-sm leading-relaxed text-slate">
          Teaching Teachers moves teachers through progressive confidence levels:
          organize first, verify next, then automate and publish when the
          foundation is real.
        </p>
      </div>
      <ol className="grid gap-3 md:grid-cols-4">
        {steps.map((step, index) => (
          <li
            key={step}
            className="lab-card relative p-4"
            style={
              {
                "--card-accent": [
                  "var(--color-blue)",
                  "var(--color-purple)",
                  "var(--color-amber)",
                  "var(--color-green)",
                  "var(--color-cyan)",
                  "var(--color-orange)",
                  "var(--color-pink)",
                  "var(--color-link)",
                ][index],
              } as CSSProperties
            }
          >
            <span className="mb-3 inline-flex h-8 w-8 items-center justify-center rounded-md bg-surface-alt font-mono text-xs font-bold text-accent">
              {String(index + 1).padStart(2, "0")}
            </span>
            <h3 className="m-0 font-sans text-sm font-bold text-foreground">
              {step}
            </h3>
          </li>
        ))}
      </ol>
    </section>
  );
}


