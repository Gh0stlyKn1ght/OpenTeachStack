import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ArtifactCard from "@/components/book/ArtifactCard";
import CourseStructureSidebar from "@/components/book/CourseStructureSidebar";
import CourseStructureTOC from "@/components/book/CourseStructureTOC";
import ArticleBody from "@/components/field-guide/ArticleBody";
import ArticleFooterNav from "@/components/field-guide/ArticleFooterNav";
import FieldGuidePage from "@/components/field-guide/FieldGuidePage";
import { COURSE_STRUCTURES, getCourseStructure } from "@/lib/courseStructures";

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
    return { title: "Course Not Found — Teaching Teachers" };
  }

  return {
    title: `${course.code} Course Book — Teaching Teachers`,
    description: course.thesis,
  };
}

export default async function CourseStructurePage({ params }: CoursePageProps) {
  const { course: courseSlug } = await params;
  const course = getCourseStructure(courseSlug);

  if (!course) {
    notFound();
  }

  const firstChapter = course.chapters[0];

  return (
    <FieldGuidePage
      eyebrow={`${course.code} Course Book`}
      title={course.title}
      subtitle={course.thesis}
      breadcrumbs={[{ label: "Book", href: "/book" }]}
      meta={[
        { label: "Course path", value: course.coursePath },
        { label: "Course", value: course.code },
        { label: "Level", value: course.level },
        { label: "Status", value: course.status },
        { label: "Prerequisite", value: course.prerequisite },
        { label: "Final artifact", value: course.finalArtifact },
      ]}
      sidebar={<CourseStructureSidebar course={course} />}
      footer={
        <ArticleFooterNav
          next={{
            href: `/book/${course.slug}/${firstChapter.slug}`,
            label: "Start course",
            title: `${firstChapter.number}. ${firstChapter.title}`,
          }}
        />
      }
    >
      <ArticleBody>
        <section className="book-spread">
          <div>
            <h2>Course Thesis</h2>
            <p>{course.thesis}</p>
            <p>
              This structure follows the same course-book workflow as OTS-101:
              chapters, sections, workshops, artifact builds, verification
              checks, and a final assembled deliverable.
            </p>
          </div>
          <ArtifactCard
            title={course.finalArtifact}
            description={`The course finishes when the teacher can assemble and explain a usable ${course.finalArtifact.toLowerCase()}.`}
          />
        </section>

        <section>
          <h2>Chapter Table of Contents</h2>
          <CourseStructureTOC course={course} />
        </section>

        <section>
          <h2>What You Will Build</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {course.chapters.slice(0, 6).map((chapter) => (
              <ArtifactCard
                key={chapter.slug}
                title={chapter.buildArtifact}
                description={chapter.essentialQuestion}
              />
            ))}
          </div>
        </section>
      </ArticleBody>
    </FieldGuidePage>
  );
}


