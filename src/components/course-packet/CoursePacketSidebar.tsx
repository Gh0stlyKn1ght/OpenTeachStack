import Link from "next/link";
import BookSearchInput from "@/components/book/BookSearchInput";
import type { SearchRecord } from "@/lib/search";
import type { CoursePacketView } from "./types";

interface CoursePacketSidebarProps {
  course: CoursePacketView;
  activeChapterSlug?: string;
  activeSectionSlug?: string;
  searchRecords?: SearchRecord[];
}

export default function CoursePacketSidebar({
  course,
  activeChapterSlug,
  activeSectionSlug,
  searchRecords = [],
}: CoursePacketSidebarProps) {
  const renderChapterList = () => (
    <ol className="course-packet-nav-list">
      {course.chapters.map((chapter) => {
        const isActive = chapter.slug === activeChapterSlug;

        return (
          <li key={chapter.slug}>
            <Link
              href={chapter.href}
              className={`course-packet-nav-link ${
                isActive ? "course-packet-nav-link-active" : ""
              }`}
            >
              <span>{chapter.number}</span>
              <strong>{chapter.title}</strong>
            </Link>
            {isActive && chapter.sections.length > 0 ? (
              <ol className="course-packet-section-list">
                {chapter.sections.map((section) => (
                  <li key={section.number}>
                    <Link
                      href={section.href}
                      className={`course-packet-section-link ${
                        activeSectionSlug === section.slug
                          ? "course-packet-section-link-active"
                          : ""
                      }`}
                    >
                      <span>{section.number}</span>
                      <strong>{section.title}</strong>
                    </Link>
                  </li>
                ))}
              </ol>
            ) : null}
          </li>
        );
      })}
    </ol>
  );

  return (
    <aside className="course-packet-sidebar">
      <div className="course-packet-sidebar-inner">
        <div className="course-packet-sidebar-header">
          <p>CourseOS Packet</p>
          <Link href={`/book/${course.slug}`}>{course.code}</Link>
          <span>{course.status}</span>
        </div>

        {searchRecords.length > 0 ? (
          <BookSearchInput
            records={searchRecords}
            label="Search packet"
            placeholder="Lesson, artifact, source..."
          />
        ) : null}

        <nav className="course-packet-nav" aria-label={`${course.code} packet index`}>
          {renderChapterList()}
        </nav>
      </div>

      <details className="course-packet-sidebar-mobile">
        <summary>Course packet index</summary>
        <div className="mt-4">
          {searchRecords.length > 0 ? (
            <BookSearchInput
              records={searchRecords}
              label="Search packet"
              placeholder="Lesson, artifact, source..."
            />
          ) : null}
          <nav className="mt-4" aria-label={`${course.code} mobile packet index`}>
            {renderChapterList()}
          </nav>
        </div>
      </details>
    </aside>
  );
}
