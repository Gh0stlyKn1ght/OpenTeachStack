import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import CourseStructureSidebar from "@/components/book/CourseStructureSidebar";
import ArticleBody from "@/components/field-guide/ArticleBody";
import ArticleFooterNav from "@/components/field-guide/ArticleFooterNav";
import FieldGuidePage from "@/components/field-guide/FieldGuidePage";
import BuildTask from "@/components/BuildTask";
import {
  AICourseContentWorkflowVisual,
  ChecklistBlock,
  ComparisonBlock,
  ConceptCard,
  CourseTruthStackVisual,
  FakeCourseTrapVisual,
  FrameworkBlock,
  SourceTruthExportVisual,
  TakeawayStrip,
  TiredTeacherTestVisual,
  WorkflowBlock,
} from "@/components/InstructionalBlocks";import MDXPre from "@/components/MDXPre";
import MermaidBlock from "@/components/MermaidBlock";
import RealityCheck from "@/components/RealityCheck";
import ReflectionPrompt from "@/components/ReflectionPrompt";
import TeacherNote from "@/components/TeacherNote";
import VideoEmbed from "@/components/VideoEmbed";
import { getCourseLessonBySlugs } from "@/lib/content";
import {
  COURSE_STRUCTURES,
  getAdjacentCourseSections,
  getAllCourseSectionRecords,
  getCourseSectionRecord,
} from "@/lib/courseStructures";
import { mdxOptions } from "@/lib/mdx";

const canPreviewComingSoon = process.env.NODE_ENV !== "production";

const mdxComponents = {
  pre: MDXPre,
  MermaidBlock,
  VideoEmbed,
  ReflectionPrompt,
  TeacherNote,
  RealityCheck,
  BuildTask,
};

type SectionPageProps = {
  params: Promise<{ course: string; chapter: string; section: string }>;
};

function getCanonicalRecordForStaleChapterSlug(
  courseSlug: string,
  chapterSlug: string,
  sectionSlug: string,
) {
  const course = COURSE_STRUCTURES.find(
    (courseStructure) => courseStructure.slug === courseSlug,
  );
  if (!course) return undefined;

  const requestedChapterNumber = sectionSlug.split("-")[0];

  return getAllCourseSectionRecords(course).find(
    (record) =>
      record.chapter.slug !== chapterSlug &&
      record.chapter.number === requestedChapterNumber &&
      record.sectionSlug === sectionSlug,
  );
}

export function generateStaticParams() {
  return COURSE_STRUCTURES.flatMap((course) =>
    getAllCourseSectionRecords(course).map((record) => ({
      course: course.slug,
      chapter: record.chapter.slug,
      section: record.sectionSlug,
    })),
  );
}

export async function generateMetadata({
  params,
}: SectionPageProps): Promise<Metadata> {
  const { course, chapter, section } = await params;
  const record = getCourseSectionRecord(course, chapter, section);

  if (!record) {
    return { title: "Section Not Found — OpenTeachStack" };
  }

  return {
    title: `${record.section.number}. ${record.section.title} — ${record.course.code}`,
    description: `${record.chapter.title}: ${record.section.title}`,
  };
}

export default async function CourseSectionPage({ params }: SectionPageProps) {
  const { course, chapter, section } = await params;
  const record = getCourseSectionRecord(course, chapter, section);

  if (!record) {
    const canonicalRecord = getCanonicalRecordForStaleChapterSlug(
      course,
      chapter,
      section,
    );
    if (canonicalRecord) {
      redirect(canonicalRecord.href);
    }

    notFound();
  }

  const { previous, next } = getAdjacentCourseSections(record);

  if (record.course.status === "Coming Soon" && !canPreviewComingSoon) {
    return (
      <FieldGuidePage
        eyebrow={`${record.course.code} Coming Soon`}
        title={record.course.title}
        subtitle="This lesson is intentionally unavailable until OTS-000 and OTS-101 are rebuilt, reviewed, and strong enough to guide the rest of the pathway."
        breadcrumbs={[
          { label: "Book", href: "/book" },
          { label: record.course.code, href: `/book/${record.course.slug}` },
        ]}
        meta={[
          { label: "Course", value: record.course.code },
          { label: "Status", value: "Coming Soon" },
          { label: "Boundary", value: "Frozen until OTS-000/101 is right" },
        ]}
      >
        <ArticleBody>
          <section className="book-spread">
            <div>
              <h2>Lesson locked</h2>
              <p>
                This course is not open for reading yet. OpenTeachStack will
                not publish missing, placeholder, or outline-only lesson pages
                as if they were real instruction.
              </p>
              <p>
                OTS-000 and OTS-101 are the only active sequence work right now.
              </p>
            </div>
            <div className="course-section-status">
              Coming Soon. Frozen until OTS-000/101 is right.
            </div>
          </section>
        </ArticleBody>
      </FieldGuidePage>
    );
  }

  const courseLesson = getCourseLessonBySlugs(
    record.course.slug,
    record.chapter.slug,
    record.sectionSlug,
  );
  const migrationStatus = courseLesson?.frontmatter.migrationStatus;
  const isReleaseReady =
    migrationStatus === "authored" || migrationStatus === "reviewed";

  return (
    <FieldGuidePage
      eyebrow={`${record.course.code} / Chapter ${record.chapter.number} / Section ${record.section.number}`}
      title={record.section.title}
      subtitle={record.chapter.problem}
      breadcrumbs={[
        { label: "Book", href: "/book" },
        { label: record.course.code, href: `/book/${record.course.slug}` },
        {
          label: record.chapter.title,
          href: `/book/${record.course.slug}/${record.chapter.slug}`,
        },
      ]}
      meta={[
        { label: "Course", value: record.course.code },
        { label: "Chapter", value: record.chapter.number },
        { label: "Type", value: record.section.type },
        { label: "Duration", value: record.section.duration },
        { label: "Source", value: "Course-owned MDX" },
      ]}
      sidebar={
        <CourseStructureSidebar
          course={record.course}
          activeChapterSlug={record.chapter.slug}
          activeSectionSlug={record.sectionSlug}
        />
      }
      footer={
        <ArticleFooterNav
          previous={
            previous
              ? {
                  href: previous.href,
                  label: "Previous section",
                  title: `${previous.section.number}. ${previous.section.title}`,
                }
              : undefined
          }
          next={
            next
              ? {
                  href: next.href,
                  label: "Next section",
                  title: `${next.section.number}. ${next.section.title}`,
                }
              : undefined
          }
        />
      }
    >
      <ArticleBody>
        {!courseLesson ? (
          <div className="course-section-status">
            {record.course.status === "Coming Soon" && canPreviewComingSoon
              ? "Development preview: this planned section is visible locally, but no authored lesson MDX exists yet. Do not treat this outline as release-ready content."
              : "This lesson is intentionally unavailable. This course is Coming Soon or in rebuild, and OpenTeachStack does not publish placeholder MDX to make routes look complete."}
          </div>
        ) : !isReleaseReady ? (
          <div className="course-section-status">
            This lesson is in teacher review. It still needs
            classroom-specific revision before it should be treated as
            release-ready course content.
          </div>
        ) : null}
        {courseLesson ? (
          <div className="prose-academic">
            <MDXRemote
              source={courseLesson.content}
              options={mdxOptions}
              components={mdxComponents}
            />
          </div>
        ) : null}
      </ArticleBody>
    </FieldGuidePage>
  );
}

