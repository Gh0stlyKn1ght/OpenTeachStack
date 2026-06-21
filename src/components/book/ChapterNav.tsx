import Link from "next/link";
import { BOOK_CHAPTERS } from "@/lib/book";

export default function ChapterNav({ slug }: { slug: string }) {
  const index = BOOK_CHAPTERS.findIndex((chapter) => chapter.slug === slug);
  const previous = index > 0 ? BOOK_CHAPTERS[index - 1] : undefined;
  const next = index >= 0 ? BOOK_CHAPTERS[index + 1] : undefined;

  return (
    <nav
      className="mt-12 grid gap-3 border-t border-border pt-6 sm:grid-cols-2"
      aria-label="Chapter navigation"
    >
      {previous ? (
        <Link
          href={previous.href}
          className="rounded-sm border border-border p-4 no-underline transition-colors hover:border-accent"
        >
          <span className="block font-mono text-[0.68rem] uppercase tracking-wider text-foreground/40">
            Previous
          </span>
          <span className="mt-1 block font-semibold text-foreground">
            {previous.number}. {previous.title}
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
            Next
          </span>
          <span className="mt-1 block font-semibold text-foreground">
            {next.number}. {next.title}
          </span>
        </Link>
      )}
    </nav>
  );
}
