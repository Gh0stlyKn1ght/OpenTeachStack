import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import ArtifactCard from "@/components/book/ArtifactCard";
import CourseStructureSidebar from "@/components/book/CourseStructureSidebar";
import CourseStructureTOC from "@/components/book/CourseStructureTOC";
import ArticleBody from "@/components/field-guide/ArticleBody";
import ArticleFooterNav from "@/components/field-guide/ArticleFooterNav";
import FieldGuidePage from "@/components/field-guide/FieldGuidePage";
import { COURSE_STRUCTURES, getCourseStructure } from "@/lib/courseStructures";

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

  const firstChapter = course.chapters[0];

  if (course.status === "Coming Soon" && !canPreviewComingSoon) {
    return (
      <FieldGuidePage
        eyebrow={`${course.code} Coming Soon`}
        title={course.title}
        subtitle="This course is intentionally unavailable until OTS-000 and OTS-101 are rebuilt, reviewed, and strong enough to guide the rest of the pathway."
        breadcrumbs={[{ label: "Book", href: "/book" }]}
        meta={[
          { label: "Course", value: course.code },
          { label: "Status", value: "Coming Soon" },
          { label: "Boundary", value: "Unavailable until course status is draft" },
        ]}
      >
        <ArticleBody>
          <section className="book-spread">
            <div>
              <h2>Why this course is not open yet</h2>
              <p>
                OpenTeachStack is rebuilding one real course first. We are not
                publishing placeholder chapter pages, fake lesson bodies, or
                scaffolded course content just to make the pathway look full.
              </p>
              <p>
                Finish the OTS-000 on-ramp and OTS-101 foundations sequence
                first. After that sequence proves the content model, this
                course can be rebuilt intentionally.
              </p>
            </div>
            <ArtifactCard
              title="Coming Soon"
              description="This course is unavailable until its source-of-truth status moves into draft review."
            />
          </section>

          <Link href="/book/ots-000" className="book-action">
            Return to OTS-000
          </Link>
        </ArticleBody>
      </FieldGuidePage>
    );
  }

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
          {course.status === "Coming Soon" && canPreviewComingSoon ? (
            <div className="course-section-status">
              Development preview: this course is still unavailable in
              production. Use this outline for planning only.
            </div>
          ) : null}
          <p>{course.thesis}</p>
            <p>
              This structure follows the same course-book workflow as the active OTS-000/OTS-101 sequence:
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

        <section className="border-l-2 border-accent pl-5">
          <h2>Prompt Support</h2>
          <p>
            Use the Prompt Library when you need a teacher-facing starting
            point for planning, verification, safety checks, documentation, or
            artifact revision.
          </p>
          <Link href="/kb/prompts" className="book-action-secondary">
            Open Prompt Library
          </Link>
        </section>
      </ArticleBody>
    </FieldGuidePage>
  );
}


