import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import BookChapterHeader from "@/components/book/BookChapterHeader";
import CourseStructureBookShell from "@/components/book/CourseStructureBookShell";
import CourseStructureSectionNav from "@/components/book/CourseStructureSectionNav";
import BuildTask from "@/components/BuildTask";
import MDXPre from "@/components/MDXPre";
import MermaidBlock from "@/components/MermaidBlock";
import RealityCheck from "@/components/RealityCheck";
import ReflectionPrompt from "@/components/ReflectionPrompt";
import SourcePanel from "@/components/book/SourcePanel";
import TeacherNote from "@/components/TeacherNote";
import VideoEmbed from "@/components/VideoEmbed";
import { getCourseLessonBySlugs } from "@/lib/content";
import { mdxOptions } from "@/lib/mdx";
import {
  getAdjacentCourseSections,
  getAllCourseSectionRecords,
  getCourseSectionRecord,
  getCourseStructure,
} from "@/lib/courseStructures";

const COURSE_SLUG = "ots-220";

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
  params: Promise<{ chapter: string; section: string }>;
};

export function generateStaticParams() {
  const course = getCourseStructure(COURSE_SLUG);
  if (!course) return [];

  return getAllCourseSectionRecords(course).map((record) => ({
    chapter: record.chapter.slug,
    section: record.sectionSlug,
  }));
}

export async function generateMetadata({
  params,
}: SectionPageProps): Promise<Metadata> {
  const { chapter, section } = await params;
  const record = getCourseSectionRecord(COURSE_SLUG, chapter, section);

  if (!record) {
    return {
      title: "Section Not Found — Teaching Teachers",
    };
  }

  return {
    title: `${record.section.number}. ${record.section.title} — ${record.course.code}`,
    description: `${record.chapter.title}: ${record.section.title}`,
  };
}

export default async function Ots220SectionPage({ params }: SectionPageProps) {
  const { chapter, section } = await params;
  const record = getCourseSectionRecord(COURSE_SLUG, chapter, section);

  if (!record) {
    notFound();
  }

  const { previous, next } = getAdjacentCourseSections(record);
  const courseLesson = getCourseLessonBySlugs(
    COURSE_SLUG,
    record.chapter.slug,
    record.sectionSlug,
  );

  if (courseLesson?.frontmatter.migrationStatus !== "authored") {
    notFound();
  }

  return (
    <CourseStructureBookShell
      course={record.course}
      activeChapterSlug={record.chapter.slug}
      activeSectionSlug={record.sectionSlug}
      notes={[
        {
          label: "Course",
          value: record.course.code,
          href: `/book/${record.course.slug}`,
        },
        {
          label: "Chapter",
          value: record.chapter.title,
          href: `/book/${record.course.slug}/${record.chapter.slug}`,
        },
        { label: "Type", value: record.section.type },
        { label: "Duration", value: record.section.duration },
        { label: "Source", value: "Course-owned MDX" },
      ]}
      skills={record.chapter.skills}
    >
      <BookChapterHeader
        eyebrow={`Chapter ${record.chapter.number} / Section ${record.section.number}`}
        title={record.section.title}
        subtitle={record.chapter.problem}
        chapterNumber={record.chapter.number}
      />

      <section>
        <div className="prose-academic">
          <MDXRemote
            source={courseLesson.content}
            options={mdxOptions}
            components={mdxComponents}
          />
        </div>
      </section>

      <SourcePanel />

      <CourseStructureSectionNav previous={previous} next={next} />
    </CourseStructureBookShell>
  );
}
