import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CoursePacketChapterTemplate from "@/components/course-packet/CoursePacketChapterTemplate";
import {
  courseStructurePacketView,
  findPacketChapter,
} from "@/lib/course-packet-adapters";
import {
  OTS320_COURSE,
  getOts320Chapter,
} from "@/lib/ots320Course";

type ChapterPageProps = {
  params: Promise<{ chapter: string }>;
};

export function generateStaticParams() {
  return OTS320_COURSE.chapters.map((chapter) => ({ chapter: chapter.slug }));
}

export async function generateMetadata({
  params,
}: ChapterPageProps): Promise<Metadata> {
  const { chapter: slug } = await params;
  const chapter = getOts320Chapter(slug);

  if (!chapter) {
    return { title: "Chapter Not Found — OpenTeachStack" };
  }

  return {
    title: `${chapter.number}. ${chapter.title} — OTS-320`,
    description: chapter.problem,
  };
}

export default async function Ots320ChapterPage({ params }: ChapterPageProps) {
  const { chapter: slug } = await params;
  const course = courseStructurePacketView(OTS320_COURSE);
  const chapter = findPacketChapter(course, slug);

  if (!chapter) {
    notFound();
  }

  const chapterIndex = course.chapters.findIndex((item) => item.slug === slug);

  return (
    <CoursePacketChapterTemplate
      course={course}
      chapter={chapter}
      chapterIndex={chapterIndex}
      previous={course.chapters[chapterIndex - 1]}
      next={course.chapters[chapterIndex + 1]}
    />
  );
}
