import Link from "next/link";
import BookSearchInput from "./BookSearchInput";
import {
  CYBER_BOOK_CHAPTERS,
  CYBER_COURSE_CODE,
} from "@/lib/cyberSafety";
import { getCyberSearchRecords } from "@/lib/search";

interface CyberSafetySidebarProps {
  activeSlug?: string;
  activeSectionSlug?: string;
}

function getSectionSlug(number: string) {
  return number.replace(".", "-");
}

export default function CyberSafetySidebar({
  activeSlug,
  activeSectionSlug,
}: CyberSafetySidebarProps) {
  const searchRecords = getCyberSearchRecords();

  const renderChapterList = () => (
    <ol className="space-y-1">
      {CYBER_BOOK_CHAPTERS.map((chapter) => {
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
            {isActive && chapter.sections.length > 0 && (
              <ol className="mt-1 space-y-1 border-l border-border/80 pl-4">
                {chapter.sections.map((section) => (
                  <li key={section.number}>
                    <Link
                      href={`${chapter.href}/${getSectionSlug(section.number)}`}
                      className={`grid grid-cols-[2.6rem_1fr] gap-2 rounded-sm px-2 py-1.5 text-[0.78rem] leading-snug no-underline transition-colors hover:bg-surface-alt hover:text-foreground ${
                        activeSectionSlug === getSectionSlug(section.number)
                          ? "bg-surface-alt text-foreground"
                          : "text-foreground/55"
                      }`}
                    >
                      <span className="font-mono text-[0.68rem] text-accent/75">
                        {section.number}
                      </span>
                      <span>{section.title}</span>
                    </Link>
                  </li>
                ))}
              </ol>
            )}
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
            href="/book/ots-280"
            className="font-serif text-xl font-bold text-foreground no-underline hover:text-accent"
          >
            {CYBER_COURSE_CODE}
          </Link>
        </div>

        <BookSearchInput records={searchRecords} />

        <nav className="mt-6" aria-label="OTS-280 chapter index">
          {renderChapterList()}
        </nav>
      </div>

      <details className="book-sidebar-mobile">
        <summary>Course index</summary>
        <div className="mt-4">
          <BookSearchInput records={searchRecords} />
          <nav className="mt-4" aria-label="OTS-280 mobile chapter index">
            {renderChapterList()}
          </nav>
        </div>
      </details>
    </aside>
  );
}
