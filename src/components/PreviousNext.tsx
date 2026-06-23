interface NavLink {
  title: string;
  href: string;
}

interface PreviousNextProps {
  previous?: NavLink;
  next?: NavLink;
}

export default function PreviousNext({ previous, next }: PreviousNextProps) {
  if (!previous && !next) return null;

  return (
    <nav
      className="mt-16 mb-8 flex items-stretch gap-4 border-t border-border pt-8"
      aria-label="Lesson navigation"
    >
      {previous ? (
        <a
          href={previous.href}
          className="group flex flex-1 items-center gap-3 rounded-md border border-border p-4 text-left transition-colors hover:border-accent/40 hover:bg-surface-alt/30"
        >
          <span className="text-slate group-hover:text-accent transition-colors" aria-hidden="true">
            &larr;
          </span>
          <span className="min-w-0">
            <span className="block text-[0.65rem] font-mono uppercase tracking-widest text-slate">
              Previous
            </span>
            <span className="block text-sm font-heading font-semibold text-foreground truncate">
              {previous.title}
            </span>
          </span>
        </a>
      ) : (
        <div className="flex-1" />
      )}

      {next ? (
        <a
          href={next.href}
          className="group flex flex-1 items-center justify-end gap-3 rounded-md border border-border p-4 text-right transition-colors hover:border-accent/40 hover:bg-surface-alt/30"
        >
          <span className="min-w-0">
            <span className="block text-[0.65rem] font-mono uppercase tracking-widest text-slate">
              Next
            </span>
            <span className="block text-sm font-heading font-semibold text-foreground truncate">
              {next.title}
            </span>
          </span>
          <span className="text-slate group-hover:text-accent transition-colors" aria-hidden="true">
            &rarr;
          </span>
        </a>
      ) : (
        <div className="flex-1" />
      )}
    </nav>
  );
}

