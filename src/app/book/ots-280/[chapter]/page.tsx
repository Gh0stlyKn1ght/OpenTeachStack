import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ArtifactCard from "@/components/book/ArtifactCard";
import ChapterProgress from "@/components/book/ChapterProgress";
import ArticleBody from "@/components/field-guide/ArticleBody";
import ArticleFooterNav from "@/components/field-guide/ArticleFooterNav";
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

  const currentIndex = CYBER_BOOK_CHAPTERS.findIndex(
    (item) => item.slug === chapter.slug,
  );
  const previous = CYBER_BOOK_CHAPTERS[currentIndex - 1];
  const next = CYBER_BOOK_CHAPTERS[currentIndex + 1];

  return (
    <FieldGuidePage
      eyebrow={`${CYBER_COURSE_CODE} / Chapter ${chapter.number}`}
      title={chapter.title}
      subtitle={chapter.problem}
      breadcrumbs={[
        { label: "Book", href: "/book" },
        { label: CYBER_COURSE_CODE, href: "/book/ots-280" },
      ]}
      meta={[
        { label: "Course", value: CYBER_COURSE_CODE },
        { label: "Duration", value: chapter.duration },
        { label: "Artifact", value: chapter.buildArtifact },
        { label: "Status", value: "Draft" },
      ]}
      footer={
        <ArticleFooterNav
          previous={
            previous
              ? {
                  href: previous.href,
                  label: "Previous chapter",
                  title: `${previous.number}. ${previous.title}`,
                }
              : undefined
          }
          next={
            next
              ? {
                  href: next.href,
                  label: "Next chapter",
                  title: `${next.number}. ${next.title}`,
                }
              : undefined
          }
        />
      }
    >
      <ArticleBody>
        <ChapterProgress
          current={currentIndex + 1}
          total={CYBER_BOOK_CHAPTERS.length}
        />

        <section>
          <h2>Chapter Sections</h2>
          <ol className="divide-y divide-border border-y border-border">
            {chapter.sections.map((section) => (
              <li
                key={section.number}
                className="grid gap-3 py-4 md:grid-cols-[4.5rem_1fr_8rem]"
              >
                <span className="font-mono text-sm text-accent">
                  {section.number}
                </span>
                <span>
                  <Link
                    href={`${chapter.href}/${section.number.replace(".", "-")}`}
                    className="block font-semibold text-foreground no-underline hover:text-accent"
                  >
                    {section.title}
                  </Link>
                  {section.artifact ? (
                    <span className="mt-1 block text-sm text-foreground/55">
                      Artifact: {section.artifact}
                    </span>
                  ) : null}
                </span>
                <span className="font-mono text-[0.68rem] uppercase tracking-wider text-foreground/40">
                  {section.type} · {section.duration}
                </span>
              </li>
            ))}
          </ol>
        </section>

        <section className="book-spread">
          <div>
            <h2>The Teacher Problem</h2>
            <p>{chapter.problem}</p>
          </div>
          <ArtifactCard
            title={chapter.buildArtifact}
            description={chapter.essentialQuestion}
          />
        </section>

        <section>
          <h2>Safety Check</h2>
          <p>{chapter.safetyCheck}</p>
        </section>
      </ArticleBody>
    </FieldGuidePage>
  );
}


