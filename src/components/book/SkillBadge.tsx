export default function SkillBadge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex rounded-sm border border-border bg-surface-alt/55 px-2.5 py-1 font-mono text-[0.7rem] uppercase tracking-wider text-foreground/65">
      {children}
    </span>
  );
}
