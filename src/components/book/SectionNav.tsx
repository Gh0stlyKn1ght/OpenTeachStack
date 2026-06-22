import Link from "next/link";
import type { BookSectionRecord } from "@/lib/book";

interface SectionNavProps {
  previous?: BookSectionRecord;
  next?: BookSectionRecord;
}

export default function SectionNav({ previous, next }: SectionNavProps) {
  return (
    <nav
      className="mt-12 grid gap-3 border-t border-border pt-6 sm:grid-cols-2"
      aria-label="Section navigation"
    >
      {previous ? (
        <Link
          href={previous.href}
          className="rounded-sm border border-border p-4 no-underline transition-colors hover:border-accent"
        >
          <span className="block font-mono text-[0.68rem] uppercase tracking-wider text-foreground/40">
            Previous section
          </span>
          <span className="mt-1 block font-semibold text-foreground">
            {previous.section.number}. {previous.section.title}
          </span>
        </Link>
      ) : (
        <span />
      )}
      {next && (
        <Link
          href={next.href}
          className="rounded-sm border border-border p-4 text-right no-underline transition-colors hover:border-accent"
        >
          <span className="block font-mono text-[0.68rem] uppercase tracking-wider text-foreground/40">
            Next section
          </span>
          <span className="mt-1 block font-semibold text-foreground">
            {next.section.number}. {next.section.title}
          </span>
        </Link>
      )}
    </nav>
  );
}
