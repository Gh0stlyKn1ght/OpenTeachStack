import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import CoursePacketLessonTemplate from "@/components/course-packet/CoursePacketLessonTemplate";
import CoursePacketUnavailableTemplate from "@/components/course-packet/CoursePacketUnavailableTemplate";
import { getCourseLessonBySlugs } from "@/lib/content";
import {
  COURSE_STRUCTURES,
  getAllCourseSectionRecords,
  getCourseSectionRecord,
} from "@/lib/courseStructures";
import {
  courseStructurePacketView,
  findPacketChapter,
  findPacketSection,
  flattenPacketSections,
} from "@/lib/course-packet-adapters";

const canPreviewComingSoon = process.env.NODE_ENV !== "production";

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
  const { course: courseSlug, chapter: chapterSlug, section: sectionSlug } =
    await params;
  const record = getCourseSectionRecord(courseSlug, chapterSlug, sectionSlug);

  if (!record) {
    const canonicalRecord = getCanonicalRecordForStaleChapterSlug(
      courseSlug,
      chapterSlug,
      sectionSlug,
    );
    if (canonicalRecord) {
      redirect(canonicalRecord.href);
    }

    notFound();
  }

  const course = courseStructurePacketView(record.course);
  const chapter = findPacketChapter(course, record.chapter.slug);

  if (!chapter) {
    notFound();
  }

  const section = findPacketSection(chapter, record.sectionSlug);

  if (!section) {
    notFound();
  }

  const records = flattenPacketSections(course);
  const currentIndex = records.findIndex(
    (item) =>
      item.chapter.slug === chapter.slug && item.section.slug === section.slug,
  );
  const lesson = getCourseLessonBySlugs(course.slug, chapter.slug, section.slug);

  if (record.course.status === "Coming Soon" && !canPreviewComingSoon) {
    return <CoursePacketUnavailableTemplate course={course} scope="lesson" />;
  }

  const unavailableMessage =
    record.course.status === "Coming Soon" && canPreviewComingSoon
      ? "Development preview: this planned section is visible locally, but no authored lesson MDX exists yet. Do not treat this outline as release-ready content."
      : "This lesson is intentionally unavailable because no authored lesson MDX exists yet. The course is open as a draft preview, but OpenTeachStack does not publish placeholder MDX to make routes look complete.";

  return (
    <CoursePacketLessonTemplate
      course={course}
      chapter={chapter}
      section={section}
      lesson={lesson}
      previous={records[currentIndex - 1]}
      next={records[currentIndex + 1]}
      unavailableMessage={unavailableMessage}
    />
  );
}
