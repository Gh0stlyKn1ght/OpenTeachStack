import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ArtifactCard from "@/components/book/ArtifactCard";
import BookChapterHeader from "@/components/book/BookChapterHeader";
import ChapterProgress from "@/components/book/ChapterProgress";
import CourseStructureBookShell from "@/components/book/CourseStructureBookShell";
import {
  getChapterHref,
  getCourseStructure,
  getSectionHref,
} from "@/lib/courseStructures";

const COURSE_SLUG = "ots-301";

type ChapterPageProps = {
  params: Promise<{ chapter: string }>;
};

export function generateStaticParams() {
  const course = getCourseStructure(COURSE_SLUG);
  return course ? course.chapters.map((chapter) => ({ chapter: chapter.slug })) : [];
}

export async function generateMetadata({ params }: ChapterPageProps): Promise<Metadata> {
  const { chapter: slug } = await params;
  const course = getCourseStructure(COURSE_SLUG);
  const chapter = course?.chapters.find((item) => item.slug === slug);

  if (!chapter || !course) {
    return { title: "Chapter Not Found — Teaching Teachers" };
  }

  return {
    title: `${chapter.number}. ${chapter.title} — ${course.code}`,
    description: chapter.problem,
  };
}

export default async function Ots301ChapterPage({ params }: ChapterPageProps) {
  const { chapter: slug } = await params;
  const course = getCourseStructure(COURSE_SLUG);
  const chapter = course?.chapters.find((item) => item.slug === slug);

  if (!course || !chapter) {
    notFound();
  }

  const currentIndex = course.chapters.findIndex((item) => item.slug === slug);
  const previous = course.chapters[currentIndex - 1];
  const next = course.chapters[currentIndex + 1];

  return (
    <CourseStructureBookShell
      course={course}
      activeChapterSlug={chapter.slug}
      notes={[
        { label: "Duration", value: "Course-defined section timing" },
        { label: "Skill", value: chapter.skills[0] },
        { label: "Artifact", value: chapter.buildArtifact },
        { label: "Course", value: course.code, href: "/book/ots-301" },
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
              <span className="font-mono text-sm text-accent">{section.number}</span>
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
