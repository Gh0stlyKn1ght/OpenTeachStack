import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ArticleBody from "@/components/field-guide/ArticleBody";
import ArticleFooterNav from "@/components/field-guide/ArticleFooterNav";
import FieldGuidePage from "@/components/field-guide/FieldGuidePage";
import {
  CYBER_COURSE_CODE,
  getAdjacentCyberSections,
  getAllCyberSectionRecords,
  getCyberSectionContent,
  getCyberSectionPracticePrompt,
  getCyberSectionBySlugs,
} from "@/lib/cyberSafety";

type SectionPageProps = {
  params: Promise<{ chapter: string; section: string }>;
};

export function generateStaticParams() {
  return getAllCyberSectionRecords().map((record) => ({
    chapter: record.chapter.slug,
    section: record.sectionSlug,
  }));
}

export async function generateMetadata({
  params,
}: SectionPageProps): Promise<Metadata> {
  const { chapter, section } = await params;
  const record = getCyberSectionBySlugs(chapter, section);

  if (!record) {
    return { title: "Section Not Found — OpenTeachStack" };
  }

  return {
    title: `${record.section.number}. ${record.section.title} — ${CYBER_COURSE_CODE}`,
    description: `${record.chapter.title}: ${record.section.title}`,
  };
}

export default async function CyberSectionPage({ params }: SectionPageProps) {
  const { chapter, section } = await params;
  const record = getCyberSectionBySlugs(chapter, section);

  if (!record) {
    notFound();
  }

  const { previous, next } = getAdjacentCyberSections(record);
  const sectionContent = getCyberSectionContent(record);

  return (
    <FieldGuidePage
      eyebrow={`${CYBER_COURSE_CODE} / Chapter ${record.chapter.number} / Section ${record.section.number}`}
      title={record.section.title}
      subtitle={record.chapter.problem}
      breadcrumbs={[
        { label: "Book", href: "/book" },
        { label: CYBER_COURSE_CODE, href: "/book/ots-280" },
        { label: record.chapter.title, href: record.chapter.href },
      ]}
      meta={[
        { label: "Course", value: CYBER_COURSE_CODE },
        { label: "Chapter", value: record.chapter.number },
        { label: "Type", value: record.section.type },
        { label: "Duration", value: record.section.duration },
        { label: "Status", value: "Draft" },
      ]}
      footer={
        <ArticleFooterNav
          previous={
            previous
              ? {
                  href: previous.href,
                  label: "Previous section",
                  title: `${previous.section.number}. ${previous.section.title}`,
                }
              : undefined
          }
          next={
            next
              ? {
                  href: next.href,
                  label: "Next section",
                  title: `${next.section.number}. ${next.section.title}`,
                }
              : undefined
          }
        />
      }
    >
      <ArticleBody>
        <div className="course-section-status">
          Draft preview. This section is open for review, but the course still
          needs human classroom review before release.
        </div>

        <section>
          <h2>Core Idea</h2>
          {sectionContent.coreIdea.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </section>

        <section>
          <h2>Do This</h2>
          <ul>
            {sectionContent.doThis.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <section>
          <h2>Evidence</h2>
          <ul>
            {sectionContent.evidence.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <section>
          <h2>Safety Check</h2>
          <ul>
            {sectionContent.safety.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <section className="border-l-2 border-accent pl-5">
          <h2>Practice Prompt</h2>
          <p>{getCyberSectionPracticePrompt(record)}</p>
        </section>

        <section>
          <h2>Reflection</h2>
          <p>{sectionContent.reflection ?? record.chapter.reflectionPrompt}</p>
        </section>
      </ArticleBody>
    </FieldGuidePage>
  );
}


