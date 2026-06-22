import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ArtifactCard from "@/components/book/ArtifactCard";
import BookChapterHeader from "@/components/book/BookChapterHeader";
import BookShell from "@/components/book/BookShell";
import ChapterNav from "@/components/book/ChapterNav";
import ChapterProgress from "@/components/book/ChapterProgress";
import SourcePanel from "@/components/book/SourcePanel";
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
      title: "Chapter Not Found — Teaching Teachers",
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

  return (
    <BookShell
      activeSlug={chapter.slug}
      notes={[
        { label: "Duration", value: chapter.duration },
        { label: "Difficulty", value: chapter.difficulty },
        { label: "Artifact", value: chapter.buildArtifact },
      ]}
      skills={chapter.transferableSkills}
    >
      <BookChapterHeader
        eyebrow={`Chapter ${chapter.number}`}
        title={chapter.title}
        subtitle={chapter.description}
        chapterNumber={chapter.number}
      />

      <ChapterProgress current={currentIndex + 1} total={BOOK_CHAPTERS.length} />

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
        <h2>Learning Target</h2>
        <p>{chapter.essentialQuestion}</p>
      </section>

      <section>
        <h2>Build Path</h2>
        <ul>
          <li>Identify the classroom workflow problem this chapter addresses.</li>
          <li>Use source-backed examples before drafting final teaching materials.</li>
          <li>Build the chapter artifact in a reusable format.</li>
          <li>Verify claims, privacy choices, and classroom readiness.</li>
          <li>Archive the artifact so it can improve after teaching.</li>
        </ul>
      </section>

      <section>
        <h2>Safety and Verification Checks</h2>
        <ul>
          <li>Do not paste private student data into AI tools.</li>
          <li>Check official documentation when software instructions matter.</li>
          <li>Record what changed between the AI draft and the teacher-approved version.</li>
          <li>Use the source bank before adding external references.</li>
        </ul>
      </section>

      <SourcePanel />

      <ChapterNav slug={chapter.slug} />
    </BookShell>
  );
}
