import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ArtifactCard from "@/components/book/ArtifactCard";
import ChapterProgress from "@/components/book/ChapterProgress";
import CyberSafetySidebar from "@/components/book/CyberSafetySidebar";
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
    return { title: "Chapter Not Found — Teaching Teachers" };
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

  const currentIndex = CYBER_BOOK_CHAPTERS.findIndex((item) => item.slug === slug);
  const previous =
    currentIndex > 0 ? CYBER_BOOK_CHAPTERS[currentIndex - 1] : undefined;
  const next =
    currentIndex >= 0 ? CYBER_BOOK_CHAPTERS[currentIndex + 1] : undefined;

  return (
    <FieldGuidePage
      eyebrow={`${CYBER_COURSE_CODE} / Chapter ${chapter.number}`}
      title={chapter.title}
      subtitle={chapter.description}
      breadcrumbs={[
        { label: "Book", href: "/book" },
        { label: CYBER_COURSE_CODE, href: "/book/ots-280" },
      ]}
      meta={[
        { label: "Duration", value: chapter.duration },
        { label: "Difficulty", value: chapter.difficulty },
        { label: "Artifact", value: chapter.buildArtifact },
        { label: "Course", value: CYBER_COURSE_CODE },
        { label: "Print", value: "Full book PDF" },
      ]}
      sidebar={<CyberSafetySidebar activeSlug={chapter.slug} />}
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

        <section className="book-spread">
          <div>
            <h2>The Teacher Problem</h2>
            <p>{chapter.problem}</p>
          </div>
          <ArtifactCard
            title={chapter.buildArtifact}
            description={chapter.evidence}
          />
        </section>

        <section>
          <h2>Essential Question</h2>
          <p>{chapter.essentialQuestion}</p>
        </section>

        <section>
          <h2>Safety and Verification Checks</h2>
          <ul>
            <li>{chapter.safetyCheck}</li>
            <li>Do not paste private credentials, student data, or sensitive information into AI tools or shared documents.</li>
            <li>Verify safety guidance against official sources before relying on it.</li>
            <li>Record what you changed and why so you can revisit decisions later.</li>
          </ul>
        </section>

        <section>
          <h2>Reflection</h2>
          <p className="text-foreground/70">{chapter.reflectionPrompt}</p>
        </section>
      </ArticleBody>
    </FieldGuidePage>
  );
}


