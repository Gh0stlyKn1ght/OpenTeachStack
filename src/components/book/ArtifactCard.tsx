export default function ArtifactCard({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-sm border border-border bg-surface/70 p-4">
      <p className="mb-2 font-mono text-[0.68rem] uppercase tracking-wider text-accent">
        Artifact
      </p>
      <h3 className="m-0 border-none font-sans text-base font-semibold text-foreground">
        {title}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-foreground/58">
        {description}
      </p>
    </div>
  );
}
