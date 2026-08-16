import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CoursePacketLessonTemplate from "@/components/course-packet/CoursePacketLessonTemplate";
import { getCourseLessonBySlugs } from "@/lib/content";
import {
  courseStructurePacketView,
  findPacketChapter,
  findPacketSection,
  flattenPacketSections,
} from "@/lib/course-packet-adapters";
import {
  OTS320_COURSE,
  getAllOts320SectionRecords,
  getOts320SectionRecord,
} from "@/lib/ots320Course";

type SectionPageProps = {
  params: Promise<{ chapter: string; section: string }>;
};

export function generateStaticParams() {
  return getAllOts320SectionRecords().map((record) => ({
    chapter: record.chapter.slug,
    section: record.sectionSlug,
  }));
}

export async function generateMetadata({
  params,
}: SectionPageProps): Promise<Metadata> {
  const { chapter, section } = await params;
  const record = getOts320SectionRecord(chapter, section);

  if (!record) {
    return { title: "Section Not Found — OpenTeachStack" };
  }

  return {
    title: `${record.section.number}. ${record.section.title} — OTS-320`,
    description: `${record.chapter.title}: ${record.section.title}`,
  };
}

export default async function Ots320SectionPage({ params }: SectionPageProps) {
  const { chapter: chapterSlug, section: sectionSlug } = await params;
  const course = courseStructurePacketView(OTS320_COURSE);
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
  const lesson = getCourseLessonBySlugs("ots-320", chapter.slug, section.slug);

  return (
    <CoursePacketLessonTemplate
      course={course}
      chapter={chapter}
      section={section}
      lesson={lesson}
      previous={records[currentIndex - 1]}
      next={records[currentIndex + 1]}
      unavailableMessage="This OTS-320 section is part of the approved course path, but its lesson body has not been authored yet. OpenTeachStack leaves it unavailable instead of publishing generated filler."
    />
  );
}
