import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ArtifactCard from "@/components/book/ArtifactCard";
import BookChapterHeader from "@/components/book/BookChapterHeader";
import ChapterProgress from "@/components/book/ChapterProgress";
import CourseStructureBookShell from "@/components/book/CourseStructureBookShell";
import {
  COURSE_STRUCTURES,
  getChapterHref,
  getCourseChapter,
  getSectionHref,
} from "@/lib/courseStructures";

type ChapterPageProps = {
  params: Promise<{ course: string; chapter: string }>;
};

export function generateStaticParams() {
  return COURSE_STRUCTURES.flatMap((course) =>
    course.chapters.map((chapter) => ({
      course: course.slug,
      chapter: chapter.slug,
    })),
  );
}

export async function generateMetadata({
  params,
}: ChapterPageProps): Promise<Metadata> {
  const { course: courseSlug, chapter: chapterSlug } = await params;
  const record = getCourseChapter(courseSlug, chapterSlug);

  if (!record) {
    return { title: "Chapter Not Found — Teaching Teachers" };
  }

  return {
    title: `${record.chapter.number}. ${record.chapter.title} — ${record.course.code}`,
    description: record.chapter.problem,
  };
}

export default async function CourseChapterPage({ params }: ChapterPageProps) {
  const { course: courseSlug, chapter: chapterSlug } = await params;
  const record = getCourseChapter(courseSlug, chapterSlug);

  if (!record) {
    notFound();
  }

  const { course, chapter } = record;
  const currentIndex = course.chapters.findIndex(
    (item) => item.slug === chapter.slug,
  );
  const previous = course.chapters[currentIndex - 1];
  const next = course.chapters[currentIndex + 1];

  return (
    <CourseStructureBookShell
      course={course}
      activeChapterSlug={chapter.slug}
      notes={[
        { label: "Course", value: course.code, href: `/book/${course.slug}` },
        { label: "Duration", value: "1 week" },
        { label: "Artifact", value: chapter.buildArtifact },
        { label: "Status", value: course.status },
      ]}
      skills={chapter.skills}
    >
      <BookChapterHeader
        eyebrow={`Chapter ${chapter.number}`}
        title={chapter.title}
        subtitle={chapter.problem}
        chapterNumber={chapter.number}
      />

      <ChapterProgress current={currentIndex + 1} total={course.chapters.length} />

      <section>
        <h2>Chapter Sections</h2>
        <ol className="divide-y divide-border border-y border-border">
          {chapter.sections.map((section) => (
            <li
              key={section.number}
              className="grid gap-3 py-4 md:grid-cols-[4.5rem_1fr_8rem]"
            >
              <span className="font-mono text-sm text-accent">
                {section.number}
              </span>
              <span>
                <Link
                  href={getSectionHref(course, chapter, section)}
                  className="block font-semibold text-foreground no-underline hover:text-accent"
                >
                  {section.title}
                </Link>
                {section.artifact && (
                  <span className="mt-1 block text-sm text-foreground/55">
                    Artifact: {section.artifact}
                  </span>
                )}
              </span>
              <span className="font-mono text-[0.68rem] uppercase tracking-wider text-foreground/40">
                {section.type} · {section.duration}
              </span>
            </li>
          ))}
        </ol>
      </section>

      <section className="book-spread">
        <div>
          <h2>The Teacher Problem</h2>
          <p>{chapter.problem}</p>
        </div>
        <ArtifactCard
          title={chapter.buildArtifact}
          description={chapter.essentialQuestion}
        />
      </section>

      <section>
        <h2>Essential Question</h2>
        <p>{chapter.essentialQuestion}</p>
      </section>

      <nav
        className="mt-12 grid gap-3 border-t border-border pt-6 sm:grid-cols-2"
        aria-label="Chapter navigation"
      >
        {previous ? (
          <Link
            href={getChapterHref(course, previous)}
            className="rounded-sm border border-border p-4 no-underline transition-colors hover:border-accent"
          >
            <span className="block font-mono text-[0.68rem] uppercase tracking-wider text-foreground/40">
              Previous chapter
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
            href={getChapterHref(course, next)}
            className="rounded-sm border border-border p-4 text-right no-underline transition-colors hover:border-accent"
          >
            <span className="block font-mono text-[0.68rem] uppercase tracking-wider text-foreground/40">
              Next chapter
            </span>
            <span className="mt-1 block font-semibold text-foreground">
              {next.number}. {next.title}
            </span>
          </Link>
        )}
      </nav>
    </CourseStructureBookShell>
  );
}
