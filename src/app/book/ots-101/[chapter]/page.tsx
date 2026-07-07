import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CoursePacketChapterTemplate from "@/components/course-packet/CoursePacketChapterTemplate";
import { BOOK_CHAPTERS, BOOK_COURSE_CODE, getChapterBySlug } from "@/lib/book";
import {
  findPacketChapter,
  ots101PacketView,
} from "@/lib/course-packet-adapters";

type ChapterPageProps = {
  params: Promise<{ chapter: string }>;
};

export function generateStaticParams() {
  return BOOK_CHAPTERS.map((chapter) => ({ chapter: chapter.slug }));
}

export async function generateMetadata({
  params,
}: ChapterPageProps): Promise<Metadata> {
  const { chapter: slug } = await params;
  const chapter = getChapterBySlug(slug);

  if (!chapter) {
    return {
      title: "Chapter Not Found — OpenTeachStack",
    };
  }

  return {
    title: `${chapter.number}. ${chapter.title} — ${BOOK_COURSE_CODE}`,
    description: chapter.description,
  };
}

export default async function ChapterPage({ params }: ChapterPageProps) {
  const { chapter: slug } = await params;
  const course = ots101PacketView();
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
