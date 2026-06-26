import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import BookSidebar from "@/components/book/BookSidebar";
import ChapterProgress from "@/components/book/ChapterProgress";
import ArticleBody from "@/components/field-guide/ArticleBody";
import ArticleFooterNav from "@/components/field-guide/ArticleFooterNav";
import FieldGuidePage from "@/components/field-guide/FieldGuidePage";
import {
  BOOK_CHAPTERS,
  BOOK_COURSE_CODE,
  getChapterBySlug,
  getSectionHref,
} from "@/lib/book";

type ChapterPageProps = {
  params: Promise<{ chapter: string }>;
};

export function generateStaticParams() {
  return BOOK_CHAPTERS.map((chapter) => ({ chapter: chapter.slug }));
}

export async function generateMetadata({
  params,
}: ChapterPageProps): Promise<Metadata> {
  const { chapter: slug } = await params;
  const chapter = getChapterBySlug(slug);

  if (!chapter) {
    return {
      title: "Chapter Not Found — OpenTeachStack",
    };
  }

  return {
    title: `${chapter.number}. ${chapter.title} — ${BOOK_COURSE_CODE}`,
    description: chapter.description,
  };
}

export default async function ChapterPage({ params }: ChapterPageProps) {
  const { chapter: slug } = await params;
  const chapter = getChapterBySlug(slug);

  if (!chapter) {
    notFound();
  }

  const currentIndex = BOOK_CHAPTERS.findIndex((item) => item.slug === slug);
  const previous = currentIndex > 0 ? BOOK_CHAPTERS[currentIndex - 1] : undefined;
  const next = currentIndex >= 0 ? BOOK_CHAPTERS[currentIndex + 1] : undefined;

  return (
    <FieldGuidePage
      eyebrow={`${BOOK_COURSE_CODE} / Chapter ${chapter.number}`}
      title={chapter.title}
      subtitle={chapter.description}
      breadcrumbs={[
        { label: "Book", href: "/book" },
        { label: BOOK_COURSE_CODE, href: "/book/ots-101" },
      ]}
      meta={[
        { label: "Duration", value: chapter.duration },
        { label: "Difficulty", value: chapter.difficulty },
        { label: "Artifact", value: chapter.buildArtifact },
      ]}
      sidebar={<BookSidebar activeSlug={chapter.slug} />}
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
          total={BOOK_CHAPTERS.length}
        />

        <section>
          <h2>Chapter Sections</h2>
          <ol className="divide-y divide-border border-y border-border">
            {chapter.sections.map((section) => (
              <li
                key={section.number}
                id={`section-${section.number.replace(".", "-")}`}
                className="grid gap-3 py-4 md:grid-cols-[4.5rem_1fr_8rem]"
              >
                <span className="font-mono text-sm text-accent">
                  {section.number}
                </span>
                <span>
                  <Link
                    href={getSectionHref(chapter, section)}
                    className="block font-semibold text-foreground no-underline hover:text-accent"
                  >
                    {section.title}
                  </Link>
                  {section.artifact && (
                    <span className="mt-1 block text-sm text-foreground/55">
                      Artifact: {section.artifact}
                    </span>
                  )}
                </span>
                <span className="font-mono text-[0.68rem] uppercase tracking-wider text-foreground/40">
                  {section.type} · {section.duration}
                </span>
              </li>
            ))}
          </ol>
        </section>

      </ArticleBody>
    </FieldGuidePage>
  );
}


