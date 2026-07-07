import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CoursePacketLessonTemplate from "@/components/course-packet/CoursePacketLessonTemplate";
import { getCourseLessonBySlugs } from "@/lib/content";
import {
  BOOK_COURSE_CODE,
  getAllBookSectionRecords,
  getSectionBySlugs,
} from "@/lib/book";
import {
  findPacketChapter,
  findPacketSection,
  flattenPacketSections,
  ots101PacketView,
} from "@/lib/course-packet-adapters";

type SectionPageProps = {
  params: Promise<{ chapter: string; section: string }>;
};

export function generateStaticParams() {
  return getAllBookSectionRecords().map((record) => ({
    chapter: record.chapter.slug,
    section: record.sectionSlug,
  }));
}

export async function generateMetadata({
  params,
}: SectionPageProps): Promise<Metadata> {
  const { chapter, section } = await params;
  const record = getSectionBySlugs(chapter, section);

  if (!record) {
    return {
      title: "Section Not Found — OpenTeachStack",
    };
  }

  return {
    title: `${record.section.number}. ${record.section.title} — ${BOOK_COURSE_CODE}`,
    description: `${record.chapter.title}: ${record.section.title}`,
  };
}

export default async function SectionPage({ params }: SectionPageProps) {
  const { chapter: chapterSlug, section: sectionSlug } = await params;
  const course = ots101PacketView();
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
  const lesson = getCourseLessonBySlugs("ots-101", chapter.slug, section.slug);

  return (
    <CoursePacketLessonTemplate
      course={course}
      chapter={chapter}
      section={section}
      lesson={lesson}
      previous={records[currentIndex - 1]}
      next={records[currentIndex + 1]}
      unavailableMessage="This lesson is intentionally unavailable while OTS-101 is being rebuilt. OpenTeachStack does not publish placeholder MDX to make routes look complete."
    />
  );
}
