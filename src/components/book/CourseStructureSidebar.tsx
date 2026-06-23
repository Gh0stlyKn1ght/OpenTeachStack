import Link from "next/link";
import BookSearchInput from "./BookSearchInput";
import type { CourseStructure } from "@/lib/courseStructures";
import {
  getChapterHref,
  getSectionHref,
  getSectionSlug,
} from "@/lib/courseStructures";
import { getCourseStructureSearchRecords } from "@/lib/search";

interface CourseStructureSidebarProps {
  course: CourseStructure;
  activeChapterSlug?: string;
  activeSectionSlug?: string;
}

export default function CourseStructureSidebar({
  course,
  activeChapterSlug,
  activeSectionSlug,
}: CourseStructureSidebarProps) {
  const searchRecords = getCourseStructureSearchRecords(course);

  const renderChapterList = () => (
    <ol className="space-y-1">
      {course.chapters.map((chapter) => {
        const isActive = chapter.slug === activeChapterSlug;

        return (
          <li key={chapter.slug}>
            <Link
              href={getChapterHref(course, chapter)}
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
                      href={getSectionHref(course, chapter, section)}
                      className={`grid grid-cols-[2.6rem_1fr] gap-2 rounded-sm px-2 py-1.5 text-[0.78rem] leading-snug no-underline transition-colors hover:bg-surface-alt hover:text-foreground ${
                        activeSectionSlug === getSectionSlug(section)
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
            href={`/book/${course.slug}`}
            className="font-heading text-xl font-bold text-foreground no-underline hover:text-accent"
          >
            {course.code}
          </Link>
        </div>

        <BookSearchInput records={searchRecords} />

        <nav className="mt-6" aria-label={`${course.code} chapter index`}>
          {renderChapterList()}
        </nav>
      </div>

      <details className="book-sidebar-mobile">
        <summary>Course index</summary>
        <div className="mt-4">
          <BookSearchInput records={searchRecords} />
          <nav className="mt-4" aria-label={`${course.code} mobile chapter index`}>
            {renderChapterList()}
          </nav>
        </div>
      </details>
    </aside>
  );
}

