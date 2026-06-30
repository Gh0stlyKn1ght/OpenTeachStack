import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ArtifactCard from "@/components/book/ArtifactCard";
import ArticleBody from "@/components/field-guide/ArticleBody";
import FieldGuidePage from "@/components/field-guide/FieldGuidePage";
import {
  CYBER_BOOK_CHAPTERS,
  CYBER_COURSE_CODE,
  getCyberChapterBySlug,
} from "@/lib/cyberSafety";

type ChapterPageProps = {
  params: Promise<{ chapter: string }>;
};

export function generateStaticParams() {
  return CYBER_BOOK_CHAPTERS.map((chapter) => ({ chapter: chapter.slug }));
}

export async function generateMetadata({
  params,
}: ChapterPageProps): Promise<Metadata> {
  const { chapter: slug } = await params;
  const chapter = getCyberChapterBySlug(slug);

  if (!chapter) {
    return { title: "Chapter Not Found — OpenTeachStack" };
  }

  return {
    title: `${chapter.number}. ${chapter.title} — ${CYBER_COURSE_CODE}`,
    description: chapter.description,
  };
}

export default async function CyberChapterPage({ params }: ChapterPageProps) {
  const { chapter: slug } = await params;
  const chapter = getCyberChapterBySlug(slug);

  if (!chapter) {
    notFound();
  }

  return (
    <FieldGuidePage
      eyebrow={`${CYBER_COURSE_CODE} Coming Soon`}
      title="Cyber Safety for Educators"
      subtitle="This chapter is intentionally unavailable until OTS-000 and OTS-101 are rebuilt, reviewed, and strong enough to guide the rest of the pathway."
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
            <h2>Chapter locked</h2>
            <p>
              OTS-280 is Coming Soon. Its chapter structure exists, but the
              course is not open for reading until the OTS-000/OTS-101 sequence
              proves the content model.
            </p>
            <p>
              No chapter table of contents, section links, or lesson bodies are
              published for this frozen course.
            </p>
          </div>
          <ArtifactCard
            title="Coming Soon"
            description="Frozen until OTS-000/101 is right."
          />
        </section>

        <Link href="/book/ots-000" className="book-action">
          Return to OTS-000
        </Link>
      </ArticleBody>
    </FieldGuidePage>
  );
}


