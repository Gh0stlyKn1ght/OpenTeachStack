import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CoursePacketLessonTemplate from "@/components/course-packet/CoursePacketLessonTemplate";
import { getCourseLessonBySlugs } from "@/lib/content";
import {
  CYBER_COURSE_CODE,
  getAllCyberSectionRecords,
  getCyberSectionBySlugs,
} from "@/lib/cyberSafety";
import {
  cyberSafetyPacketView,
  findPacketChapter,
  findPacketSection,
  flattenPacketSections,
} from "@/lib/course-packet-adapters";

type SectionPageProps = {
  params: Promise<{ chapter: string; section: string }>;
};

export function generateStaticParams() {
  return getAllCyberSectionRecords().map((record) => ({
    chapter: record.chapter.slug,
    section: record.sectionSlug,
  }));
}

export async function generateMetadata({
  params,
}: SectionPageProps): Promise<Metadata> {
  const { chapter, section } = await params;
  const record = getCyberSectionBySlugs(chapter, section);

  if (!record) {
    return { title: "Section Not Found — OpenTeachStack" };
  }

  return {
    title: `${record.section.number}. ${record.section.title} — ${CYBER_COURSE_CODE}`,
    description: `${record.chapter.title}: ${record.section.title}`,
  };
}

export default async function CyberSectionPage({ params }: SectionPageProps) {
  const { chapter: chapterSlug, section: sectionSlug } = await params;
  const course = cyberSafetyPacketView();
  const chapter = findPacketChapter(course, chapterSlug);

  if (!chapter) {
    notFound();
  }

  const section = findPacketSection(chapter, sectionSlug);

  if (!section) {
    notFound();
  }

  const records = flattenPacketSections(course);
  const currentIndex = records.findIndex(
    (record) =>
      record.chapter.slug === chapter.slug && record.section.slug === section.slug,
  );
  const lesson = getCourseLessonBySlugs("ots-280", chapter.slug, section.slug);

  return (
    <CoursePacketLessonTemplate
      course={course}
      chapter={chapter}
      section={section}
      lesson={lesson}
      previous={records[currentIndex - 1]}
      next={records[currentIndex + 1]}
      unavailableMessage="This OTS-280 lesson is intentionally unavailable until course-owned MDX exists for the section."
    />
  );
}
