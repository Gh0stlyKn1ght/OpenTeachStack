import Link from "next/link";
import ArticleFooterNav from "@/components/field-guide/ArticleFooterNav";
import type { SearchRecord } from "@/lib/search";
import CoursePacketSidebar from "./CoursePacketSidebar";
import type { CoursePacketView } from "./types";

interface CoursePacketLearningShellProps {
  course: CoursePacketView;
  eyebrow: string;
  title: string;
  subtitle: string;
  activeChapterSlug?: string;
  activeSectionSlug?: string;
  searchRecords?: SearchRecord[];
  meta?: { label: string; value: string }[];
  previous?: { href: string; label: string; title: string };
  next?: { href: string; label: string; title: string };
  showSidebar?: boolean;
  children: React.ReactNode;
}

export default function CoursePacketLearningShell({
  course,
  eyebrow,
  title,
  subtitle,
  activeChapterSlug,
  activeSectionSlug,
  searchRecords,
  meta = [],
  previous,
  next,
  showSidebar = true,
  children,
}: CoursePacketLearningShellProps) {
  const pageClassName = showSidebar
    ? "course-packet-page"
    : "course-packet-page course-packet-page-no-sidebar";
  const shellClassName = showSidebar
    ? "course-packet-shell"
    : "course-packet-shell course-packet-shell-no-sidebar";

  return (
    <main className={pageClassName}>
      <div className={shellClassName}>
        {showSidebar ? (
          <CoursePacketSidebar
            course={course}
            activeChapterSlug={activeChapterSlug}
            activeSectionSlug={activeSectionSlug}
            searchRecords={searchRecords}
          />
        ) : null}

        <article className="course-packet-article">
          <nav className="course-packet-breadcrumbs" aria-label="Breadcrumb">
            <ol>
              <li>
                <Link href="/book">Book</Link>
              </li>
              <li>
                <Link href={`/book/${course.slug}`}>{course.code}</Link>
              </li>
            </ol>
          </nav>

          <header className="course-packet-header">
            <div>
              <p className="course-packet-eyebrow">{eyebrow}</p>
              <h1>{title}</h1>
              <p>{subtitle}</p>
            </div>
            <div className="course-packet-status-panel">
              <span>Packet Status</span>
              <strong>{course.status}</strong>
              <small>{course.finalArtifact}</small>
            </div>
          </header>

          <dl className="course-packet-meta">
            {[
              { label: "Course", value: course.code },
              { label: "Path", value: course.coursePath },
              { label: "Level", value: course.level },
              ...meta,
            ].map((item) => (
              <div key={`${item.label}-${item.value}`}>
                <dt>{item.label}</dt>
                <dd>{item.value}</dd>
              </div>
            ))}
          </dl>

          <div className="course-packet-body">{children}</div>
          <ArticleFooterNav previous={previous} next={next} />
        </article>
      </div>
    </main>
  );
}
