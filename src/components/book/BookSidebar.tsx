import Link from "next/link";
import BookSearchInput from "./BookSearchInput";
import { BOOK_CHAPTERS } from "@/lib/book";

interface BookSidebarProps {
  activeSlug?: string;
}

export default function BookSidebar({ activeSlug }: BookSidebarProps) {
  const renderChapterList = () => (
    <ol className="space-y-1">
      {BOOK_CHAPTERS.map((chapter) => {
        const isActive = chapter.slug === activeSlug;

        return (
          <li key={chapter.slug}>
            <Link
              href={chapter.href}
              className={`grid grid-cols-[2rem_1fr] gap-3 rounded-sm px-2 py-2 no-underline transition-colors ${
                isActive
                  ? "bg-accent text-background"
                  : "text-foreground/68 hover:bg-surface-alt hover:text-foreground"
              }`}
            >
              <span className="font-mono text-xs">{chapter.number}</span>
              <span className="text-sm leading-snug">{chapter.title}</span>
            </Link>
        </li>
      );
      })}
    </ol>
  );

  return (
    <aside className="book-sidebar">
      <div className="book-sidebar-inner">
        <div className="mb-5">
          <p className="mb-2 font-mono text-[0.68rem] uppercase tracking-widest text-accent">
            Course Book
          </p>
          <Link
            href="/book/ots-101"
            className="font-serif text-xl font-bold text-foreground no-underline hover:text-accent"
          >
            OTS-101
          </Link>
        </div>

        <BookSearchInput />

        <nav className="mt-6" aria-label="OTS-101 chapter index">
          {renderChapterList()}
        </nav>
      </div>

      <details className="book-sidebar-mobile">
        <summary>Course index</summary>
        <div className="mt-4">
          <BookSearchInput />
          <nav className="mt-4" aria-label="OTS-101 mobile chapter index">
            {renderChapterList()}
          </nav>
        </div>
      </details>
    </aside>
  );
}
