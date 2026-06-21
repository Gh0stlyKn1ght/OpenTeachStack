import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ArtifactCard from "@/components/book/ArtifactCard";
import BookChapterHeader from "@/components/book/BookChapterHeader";
import BookShell from "@/components/book/BookShell";
import ChapterNav from "@/components/book/ChapterNav";
import ChapterProgress from "@/components/book/ChapterProgress";
import SourcePanel from "@/components/book/SourcePanel";
import { BOOK_CHAPTERS, getChapterBySlug } from "@/lib/book";

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
    title: `${chapter.number}. ${chapter.title} — OTS-101`,
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
        { label: "Original module", value: "Course page", href: chapter.sourceHref },
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

      <section>
        <Link href={chapter.sourceHref} className="book-action-secondary">
          Open the original course module
        </Link>
      </section>

      <ChapterNav slug={chapter.slug} />
    </BookShell>
  );
}
