import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ArtifactCard from "@/components/book/ArtifactCard";
import BookChapterHeader from "@/components/book/BookChapterHeader";
import CourseStructureBookShell from "@/components/book/CourseStructureBookShell";
import CourseStructureSectionNav from "@/components/book/CourseStructureSectionNav";
import SourcePanel from "@/components/book/SourcePanel";
import {
  COURSE_STRUCTURES,
  getAdjacentCourseSections,
  getAllCourseSectionRecords,
  getCourseSectionContent,
  getCourseSectionRecord,
} from "@/lib/courseStructures";

type SectionPageProps = {
  params: Promise<{ course: string; chapter: string; section: string }>;
};

export function generateStaticParams() {
  return COURSE_STRUCTURES.flatMap((course) =>
    getAllCourseSectionRecords(course).map((record) => ({
      course: course.slug,
      chapter: record.chapter.slug,
      section: record.sectionSlug,
    })),
  );
}

export async function generateMetadata({
  params,
}: SectionPageProps): Promise<Metadata> {
  const { course, chapter, section } = await params;
  const record = getCourseSectionRecord(course, chapter, section);

  if (!record) {
    return { title: "Section Not Found — Teaching Teachers" };
  }

  return {
    title: `${record.section.number}. ${record.section.title} — ${record.course.code}`,
    description: `${record.chapter.title}: ${record.section.title}`,
  };
}

export default async function CourseSectionPage({ params }: SectionPageProps) {
  const { course, chapter, section } = await params;
  const record = getCourseSectionRecord(course, chapter, section);

  if (!record) {
    notFound();
  }

  const { previous, next } = getAdjacentCourseSections(record);
  const content = getCourseSectionContent(record);

  return (
    <CourseStructureBookShell
      course={record.course}
      activeChapterSlug={record.chapter.slug}
      activeSectionSlug={record.sectionSlug}
      notes={[
        { label: "Course", value: record.course.code, href: `/book/${record.course.slug}` },
        { label: "Chapter", value: record.chapter.title, href: `/book/${record.course.slug}/${record.chapter.slug}` },
        { label: "Type", value: record.section.type },
        { label: "Duration", value: record.section.duration },
      ]}
      skills={record.chapter.skills}
    >
      <BookChapterHeader
        eyebrow={`Chapter ${record.chapter.number} / Section ${record.section.number}`}
        title={record.section.title}
        subtitle={record.chapter.problem}
        chapterNumber={record.chapter.number}
      />

      <section className="book-spread">
        <div>
          <h2>Core Idea</h2>
          {content.coreIdea.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
        <ArtifactCard
          title={record.section.artifact ?? record.chapter.buildArtifact}
          description={`Use this section to move toward the chapter artifact: ${record.chapter.buildArtifact}.`}
        />
      </section>

      <section>
        <h2>Do This</h2>
        <ul>
          {content.doThis.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <section>
        <h2>Evidence of Completion</h2>
        <ul>
          {content.evidence.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <section>
        <h2>Verification Check</h2>
        <ul>
          {content.verification.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      {content.reflection ? (
        <section>
          <h2>Reflection Prompt</h2>
          <p>{content.reflection}</p>
        </section>
      ) : null}

      <SourcePanel />

      <CourseStructureSectionNav previous={previous} next={next} />
    </CourseStructureBookShell>
  );
}
