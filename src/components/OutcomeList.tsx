interface OutcomeListProps {
  outcomes: string[];
}

export default function OutcomeList({ outcomes }: OutcomeListProps) {
  if (!outcomes || outcomes.length === 0) return null;

  return (
    <section className="my-8 rounded-xl border border-blue/30 bg-blue/10 p-5">
      <p className="mb-1 font-mono text-[0.68rem] font-bold uppercase tracking-widest text-blue">
        Foundation Checkpoint
      </p>
      <h3 className="mb-3 border-none font-heading text-lg font-bold text-foreground">
        Learning Outcomes
      </h3>
      <ol className="list-none space-y-2 pl-0">
        {outcomes.map((outcome, index) => (
          <li
            key={index}
            className="flex items-start gap-3 text-sm leading-relaxed text-foreground/85 font-sans"
          >
            <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-sm border border-blue/40 bg-surface font-mono text-[0.66rem] font-bold text-blue tabular-nums">
              {index + 1}
            </span>
            <span>{outcome}</span>
          </li>
        ))}
      </ol>
    </section>
  );
}

