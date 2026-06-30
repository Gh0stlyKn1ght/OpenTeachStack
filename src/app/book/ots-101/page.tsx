import type { Metadata } from "next";
import Link from "next/link";
import ArtifactCard from "@/components/book/ArtifactCard";
import BookSidebar from "@/components/book/BookSidebar";
import CourseTOC from "@/components/book/CourseTOC";
import EvidencePanel from "@/components/book/EvidencePanel";
import TransferableSkillsMap from "@/components/book/TransferableSkillsMap";
import ArticleBody from "@/components/field-guide/ArticleBody";
import ArticleFooterNav from "@/components/field-guide/ArticleFooterNav";
import FieldGuidePage from "@/components/field-guide/FieldGuidePage";
import { BOOK_CHAPTERS, BOOK_COURSE_CODE, BOOK_COURSE_PATH } from "@/lib/book";
import { COURSE_CODE, COURSE_SUBTITLE, COURSE_THESIS, COURSE_TITLE } from "@/lib/metadata";

export const metadata: Metadata = {
  title: `${BOOK_COURSE_CODE} Course Book — OpenTeachStack`,
  description:
    `${BOOK_COURSE_CODE} book-style table of contents for the OpenTeachStack course-content foundations sequel after OTS-000.`,
};

export default function Ots101BookPage() {
  const firstChapter = BOOK_CHAPTERS[0];

  return (
    <FieldGuidePage
      eyebrow={`${BOOK_COURSE_CODE} Course Book`}
      title={COURSE_TITLE}
      subtitle={COURSE_THESIS}
      breadcrumbs={[{ label: "Book", href: "/book" }]}
      meta={[
        { label: "Course path", value: BOOK_COURSE_PATH },
        { label: "Course", value: BOOK_COURSE_CODE },
        { label: "Legacy code", value: COURSE_CODE },
        { label: "Level", value: "Beginner after OTS-000" },
        { label: "Final artifact", value: "Mini course content packet" },
        { label: "Status", value: "Draft sequel" },
      ]}
      sidebar={<BookSidebar />}
      footer={
        <ArticleFooterNav
          next={{
            href: firstChapter.href,
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
            <p>{COURSE_SUBTITLE}</p>
            <p>
              {BOOK_COURSE_CODE} follows OTS-000. It assumes teachers have
              the basic tool-stack vocabulary and now want to use AI to create
              student-facing course content without surrendering verification,
              safety, accessibility, or teacher judgment.
            </p>
          </div>
          <ArtifactCard
            title="Mini course content packet"
            description="The course finishes with a small, usable packet: lesson page, assignment, rubric, sources, verification notes, publishing checklist, and revision log."
          />
        </section>

        <section>
          <h2>Chapter Table of Contents</h2>
          <p className="mb-6 max-w-3xl text-sm leading-relaxed text-foreground/58">
            OTS-101 has a complete draft lesson pass, but it still needs
            sequence-aware human review before release. Read it as the next
            course after OTS-000, not as the first orientation course.
          </p>
          <CourseTOC />
        </section>

        <section>
          <h2>What You Will Build</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {BOOK_CHAPTERS.slice(0, 6).map((chapter) => (
              <ArtifactCard
                key={chapter.slug}
                title={chapter.buildArtifact}
                description={chapter.evidence}
              />
            ))}
          </div>
        </section>

        <section className="border-l-2 border-accent pl-5">
          <h2>Prompt Support</h2>
          <p>
            OTS-101 includes reusable prompt work, but prompts are never final
            artifacts by themselves. Copy a prompt, add your context, verify the
            output, revise it in teacher voice, and save the result with the
            matching course artifact.
          </p>
          <Link href="/kb/prompts" className="book-action-secondary">
            Open Prompt Library
          </Link>
        </section>

        <section>
          <h2>Why This Matters</h2>
          <EvidencePanel />
        </section>

        <section>
          <h2>Transferable Skills</h2>
          <TransferableSkillsMap />
        </section>
      </ArticleBody>
    </FieldGuidePage>
  );
}

