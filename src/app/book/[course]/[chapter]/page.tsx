import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import ArtifactCard from "@/components/book/ArtifactCard";
import ChapterProgress from "@/components/book/ChapterProgress";
import CourseStructureSidebar from "@/components/book/CourseStructureSidebar";
import ArticleBody from "@/components/field-guide/ArticleBody";
import ArticleFooterNav from "@/components/field-guide/ArticleFooterNav";
import FieldGuidePage from "@/components/field-guide/FieldGuidePage";
import {
  COURSE_STRUCTURES,
  getChapterHref,
  getCourseChapter,
  getSectionHref,
} from "@/lib/courseStructures";

const canPreviewComingSoon = process.env.NODE_ENV !== "production";

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

function getCanonicalChapterForStaleSlug(courseSlug: string, chapterSlug: string) {
  const requestedChapterNumber = chapterSlug.split("-")[0];
  if (!requestedChapterNumber) {
    return undefined;
  }

  const course = COURSE_STRUCTURES.find((item) => item.slug === courseSlug);
  return course?.chapters.find((chapter) => chapter.number === requestedChapterNumber);
}

export async function generateMetadata({
  params,
}: ChapterPageProps): Promise<Metadata> {
  const { course: courseSlug, chapter: chapterSlug } = await params;
  const record = getCourseChapter(courseSlug, chapterSlug);

  if (!record) {
    return { title: "Chapter Not Found — OpenTeachStack" };
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
    const canonicalChapter = getCanonicalChapterForStaleSlug(courseSlug, chapterSlug);
    if (canonicalChapter) {
      redirect(`/book/${courseSlug}/${canonicalChapter.slug}`);
    }

    notFound();
  }

  const { course, chapter } = record;
  const currentIndex = course.chapters.findIndex(
    (item) => item.slug === chapter.slug,
  );
  const previous = course.chapters[currentIndex - 1];
  const next = course.chapters[currentIndex + 1];

  if (course.status === "Coming Soon" && !canPreviewComingSoon) {
    return (
      <FieldGuidePage
        eyebrow={`${course.code} Coming Soon`}
        title={course.title}
        subtitle="This chapter is intentionally unavailable until OTS-000 and OTS-101 are rebuilt, reviewed, and strong enough to guide the rest of the pathway."
        breadcrumbs={[
          { label: "Book", href: "/book" },
          { label: course.code, href: `/book/${course.slug}` },
        ]}
        meta={[
          { label: "Course", value: course.code },
          { label: "Status", value: "Coming Soon" },
          { label: "Boundary", value: "Unavailable until course status is draft" },
        ]}
      >
        <ArticleBody>
          <section className="book-spread">
            <div>
              <h2>Chapter locked</h2>
              <p>
                This course still has structure, but its lesson experience is
                closed on purpose. We are not letting course-shaped outlines
                masquerade as authored course content.
              </p>
              <p>
                Once this course moves into draft review, it can be opened and
                authored for real.
              </p>
            </div>
            <ArtifactCard
              title="Coming Soon"
              description="No chapter table of contents or section links are published for frozen courses."
            />
          </section>

          <Link href="/book/ots-000" className="book-action">
            Return to OTS-000
          </Link>
        </ArticleBody>
      </FieldGuidePage>
    );
  }

  return (
    <FieldGuidePage
      eyebrow={`${course.code} / Chapter ${chapter.number}`}
      title={chapter.title}
      subtitle={chapter.problem}
      breadcrumbs={[
        { label: "Book", href: "/book" },
        { label: course.code, href: `/book/${course.slug}` },
      ]}
      meta={[
        { label: "Course", value: course.code },
        { label: "Duration", value: "1 week" },
        { label: "Artifact", value: chapter.buildArtifact },
        { label: "Status", value: course.status },
      ]}
      sidebar={
        <CourseStructureSidebar
          course={course}
          activeChapterSlug={chapter.slug}
        />
      }
      footer={
        <ArticleFooterNav
          previous={
            previous
              ? {
                  href: getChapterHref(course, previous),
                  label: "Previous chapter",
                  title: `${previous.number}. ${previous.title}`,
                }
              : undefined
          }
          next={
            next
              ? {
                  href: getChapterHref(course, next),
                  label: "Next chapter",
                  title: `${next.number}. ${next.title}`,
                }
              : undefined
          }
        />
      }
    >
      <ArticleBody>
        <ChapterProgress
          current={currentIndex + 1}
          total={course.chapters.length}
        />
        {course.status === "Coming Soon" && canPreviewComingSoon ? (
          <div className="course-section-status">
            Development preview: this chapter outline is visible locally, but
            the course remains unavailable in production.
          </div>
        ) : null}

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
      </ArticleBody>
    </FieldGuidePage>
  );
}


