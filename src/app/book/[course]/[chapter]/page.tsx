import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import CoursePacketChapterTemplate from "@/components/course-packet/CoursePacketChapterTemplate";
import CoursePacketUnavailableTemplate from "@/components/course-packet/CoursePacketUnavailableTemplate";
import {
  COURSE_STRUCTURES,
  getCourseChapter,
} from "@/lib/courseStructures";
import {
  courseStructurePacketView,
  findPacketChapter,
} from "@/lib/course-packet-adapters";

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

  const course = courseStructurePacketView(record.course);
  const chapter = findPacketChapter(course, record.chapter.slug);

  if (!chapter) {
    notFound();
  }

  const chapterIndex = course.chapters.findIndex(
    (item) => item.slug === chapter.slug,
  );

  if (record.course.status === "Coming Soon" && !canPreviewComingSoon) {
    return <CoursePacketUnavailableTemplate course={course} scope="chapter" />;
  }

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
