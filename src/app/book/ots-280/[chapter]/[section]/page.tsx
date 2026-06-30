import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ArticleBody from "@/components/field-guide/ArticleBody";
import FieldGuidePage from "@/components/field-guide/FieldGuidePage";
import {
  CYBER_COURSE_CODE,
  getAllCyberSectionRecords,
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

  return (
    <FieldGuidePage
      eyebrow={`${CYBER_COURSE_CODE} Coming Soon`}
      title="Cyber Safety for Educators"
      subtitle="This lesson is intentionally unavailable until OTS-000 and OTS-101 are rebuilt, reviewed, and strong enough to guide the rest of the pathway."
      breadcrumbs={[
        { label: "Book", href: "/book" },
        { label: CYBER_COURSE_CODE, href: "/book/ots-280" },
      ]}
      meta={[
        { label: "Course", value: CYBER_COURSE_CODE },
        { label: "Status", value: "Coming Soon" },
        { label: "Boundary", value: "Frozen until OTS-000/101 is right" },
      ]}
    >
      <ArticleBody>
        <section className="book-spread">
          <div>
            <h2>Lesson locked</h2>
            <p>
              OTS-280 is Coming Soon. OpenTeachStack will not publish missing,
              placeholder, or outline-only lesson pages as if they were real
              instruction.
            </p>
            <p>OTS-000 and OTS-101 are the only active sequence work right now.</p>
          </div>
          <div className="course-section-status">
            Coming Soon. Frozen until OTS-000/101 is right.
          </div>
        </section>
      </ArticleBody>
    </FieldGuidePage>
  );
}


