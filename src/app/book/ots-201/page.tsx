import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ArtifactCard from "@/components/book/ArtifactCard";
import BookChapterHeader from "@/components/book/BookChapterHeader";
import CourseStructureBookShell from "@/components/book/CourseStructureBookShell";
import CourseStructureTOC from "@/components/book/CourseStructureTOC";
import { getCourseStructure } from "@/lib/courseStructures";

const COURSE_SLUG = "ots-201";

export async function generateMetadata(): Promise<Metadata> {
  const course = getCourseStructure(COURSE_SLUG);

  if (!course) {
    return { title: "Course Not Found — Teaching Teachers" };
  }

  return {
    title: `${course.code} Course Book — Teaching Teachers`,
    description: course.thesis,
  };
}

export default async function Ots201BookPage() {
  const course = getCourseStructure(COURSE_SLUG);

  if (!course) {
    notFound();
  }

  return (
    <CourseStructureBookShell
      course={course}
      notes={[
        { label: "Course path", value: course.coursePath },
        { label: "Course", value: course.code, href: "/book/ots-201" },
        { label: "Level", value: course.level },
        { label: "Status", value: course.status },
        { label: "Prerequisite", value: course.prerequisite },
        { label: "Final artifact", value: course.finalArtifact },
      ]}
      skills={course.chapters.flatMap((chapter) => chapter.skills).slice(0, 6)}
    >
      <BookChapterHeader
        eyebrow={`${course.code} Course Book`}
        title={course.title}
        subtitle={course.thesis}
      />

      <section className="book-spread">
        <div>
          <h2>Course Thesis</h2>
          <p>{course.thesis}</p>
          <p>
            OTS-201 is built from Google Workspace planning structure first,
            before introducing Apps Script or public publishing workflows.
          </p>
        </div>
        <ArtifactCard
          title={course.finalArtifact}
          description={`Finish when teachers can assemble and explain a usable ${course.finalArtifact.toLowerCase()}.`}
        />
      </section>

      <section>
        <h2>Chapter Table of Contents</h2>
        <CourseStructureTOC course={course} />
      </section>

      <section>
        <h2>What You Will Build</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {course.chapters.map((chapter) => (
            <ArtifactCard
              key={chapter.slug}
              title={chapter.buildArtifact}
              description={chapter.essentialQuestion}
            />
          ))}
        </div>
      </section>
    </CourseStructureBookShell>
  );
}
