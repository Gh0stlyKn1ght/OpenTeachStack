import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CoursePacketOverviewTemplate from "@/components/course-packet/CoursePacketOverviewTemplate";
import CoursePacketUnavailableTemplate from "@/components/course-packet/CoursePacketUnavailableTemplate";
import {
  COURSE_STRUCTURES,
  getCourseStructure,
} from "@/lib/courseStructures";
import { courseStructurePacketView } from "@/lib/course-packet-adapters";

const canPreviewComingSoon = process.env.NODE_ENV !== "production";

type CoursePageProps = {
  params: Promise<{ course: string }>;
};

export function generateStaticParams() {
  return COURSE_STRUCTURES.map((course) => ({ course: course.slug }));
}

export async function generateMetadata({
  params,
}: CoursePageProps): Promise<Metadata> {
  const { course: courseSlug } = await params;
  const course = getCourseStructure(courseSlug);

  if (!course) {
    return { title: "Course Not Found — OpenTeachStack" };
  }

  return {
    title: `${course.code} Course Book — OpenTeachStack`,
    description: course.thesis,
  };
}

export default async function CourseStructurePage({ params }: CoursePageProps) {
  const { course: courseSlug } = await params;
  const course = getCourseStructure(courseSlug);

  if (!course) {
    notFound();
  }

  const packetCourse = courseStructurePacketView(course);

  if (course.status === "Coming Soon" && !canPreviewComingSoon) {
    return (
      <CoursePacketUnavailableTemplate course={packetCourse} scope="course" />
    );
  }

  return <CoursePacketOverviewTemplate course={packetCourse} />;
}
