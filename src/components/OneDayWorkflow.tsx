const steps = [
  {
    title: "Pick tomorrow's learning need",
    text: "Start with the thing students need to understand next. Do not chase the tool first.",
  },
  {
    title: "Gather trusted sources",
    text: "Use official docs, standards, primary sources, or vetted classroom resources before asking AI to draft.",
  },
  {
    title: "Extract the useful parts",
    text: "Pull vocabulary, examples, visuals, misconceptions, and one clear student task.",
  },
  {
    title: "Build a simple page",
    text: "Use Docs, Slides, or plain HTML/CSS. Codex or VS Code can help structure it, but the teacher still owns it.",
  },
  {
    title: "Verify before class",
    text: "Check facts, sources, copyright, accessibility, standards claims, and student privacy.",
  },
  {
    title: "Teach it, then improve it",
    text: "Good enough to teach, then improve it. Archive the artifact so tomorrow's pressure becomes next year's system.",
  },
];

export default function OneDayWorkflow() {
  return (
    <section className="content-visibility-auto border-y border-border bg-surface-alt/30">
      <div className="mx-auto max-w-5xl px-6 py-20">
        <div className="mb-8 max-w-2xl">
          <span className="mb-3 inline-block font-mono text-xs uppercase tracking-[0.15em] text-accent">
            Signature Workflow
          </span>
          <h2 className="mb-4 font-heading text-3xl font-bold text-foreground">
            The One-Day Lesson Site Workflow
          </h2>
          <p className="text-sm leading-relaxed text-slate">
            Sometimes tomorrow&apos;s lesson has to exist before tomorrow morning.
            This is the Teaching Teachers survival loop: Source -&gt; Prompt -&gt;
            Build -&gt; Verify -&gt; Teach -&gt; Archive -&gt; Improve.
          </p>
        </div>

        <ol className="grid gap-3 md:grid-cols-3">
          {steps.map((step, index) => (
            <li
              key={step.title}
              className="rounded-md border border-border bg-surface p-4"
            >
              <span className="mb-3 inline-flex h-8 w-8 items-center justify-center rounded-sm bg-accent/10 font-mono text-xs font-bold text-accent">
                {index + 1}
              </span>
              <h3 className="mb-2 font-sans text-sm font-bold text-foreground">
                {step.title}
              </h3>
              <p className="m-0 text-xs leading-relaxed text-slate">
                {step.text}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}


