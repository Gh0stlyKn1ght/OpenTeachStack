import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import BookSidebar from "@/components/book/BookSidebar";
import SourcePanel from "@/components/book/SourcePanel";
import ArticleBody from "@/components/field-guide/ArticleBody";
import ArticleFooterNav from "@/components/field-guide/ArticleFooterNav";
import FieldGuidePage from "@/components/field-guide/FieldGuidePage";
import BuildTask from "@/components/BuildTask";
import MDXPre from "@/components/MDXPre";
import MermaidBlock from "@/components/MermaidBlock";
import RealityCheck from "@/components/RealityCheck";
import ReflectionPrompt from "@/components/ReflectionPrompt";
import TeacherNote from "@/components/TeacherNote";
import VideoEmbed from "@/components/VideoEmbed";
import { getCourseLessonBySlugs } from "@/lib/content";
import { mdxOptions } from "@/lib/mdx";
import {
  BOOK_COURSE_CODE,
  getAdjacentBookSections,
  getAllBookSectionRecords,
  getSectionBySlugs,
} from "@/lib/book";

const mdxComponents = {
  pre: MDXPre,
  MermaidBlock,
  VideoEmbed,
  ReflectionPrompt,
  TeacherNote,
  RealityCheck,
  BuildTask,
};

type SectionPageProps = {
  params: Promise<{ chapter: string; section: string }>;
};

export function generateStaticParams() {
  return getAllBookSectionRecords().map((record) => ({
    chapter: record.chapter.slug,
    section: record.sectionSlug,
  }));
}

export async function generateMetadata({
  params,
}: SectionPageProps): Promise<Metadata> {
  const { chapter, section } = await params;
  const record = getSectionBySlugs(chapter, section);

  if (!record) {
    return {
      title: "Section Not Found — Teaching Teachers",
    };
  }

  return {
    title: `${record.section.number}. ${record.section.title} — ${BOOK_COURSE_CODE}`,
    description: `${record.chapter.title}: ${record.section.title}`,
  };
}

export default async function SectionPage({ params }: SectionPageProps) {
  const { chapter, section } = await params;
  const record = getSectionBySlugs(chapter, section);

  if (!record) {
    notFound();
  }

  const { previous, next } = getAdjacentBookSections(record);
  const relatedLessonHref = record.relatedLessonSlug
    ? `/lessons/${record.relatedLessonSlug}`
    : undefined;
  const courseLesson = getCourseLessonBySlugs(
    "ots-101",
    record.chapter.slug,
    record.sectionSlug,
  );

  if (courseLesson?.frontmatter.migrationStatus !== "authored") {
    notFound();
  }

  return (
    <FieldGuidePage
      eyebrow={`${BOOK_COURSE_CODE} / Chapter ${record.chapter.number} / Section ${record.section.number}`}
      title={record.section.title}
      subtitle={record.chapter.problem}
      breadcrumbs={[
        { label: "Book", href: "/book" },
        { label: BOOK_COURSE_CODE, href: "/book/ots-101" },
        { label: record.chapter.title, href: record.chapter.href },
      ]}
      meta={[
        { label: "Course", value: BOOK_COURSE_CODE },
        { label: "Chapter", value: record.chapter.title },
        { label: "Type", value: record.section.type },
        { label: "Duration", value: record.section.duration },
        { label: "Source", value: "Course-owned MDX" },
        { label: "Print", value: "Full book PDF" },
      ]}
      sidebar={
        <BookSidebar
          activeSlug={record.chapter.slug}
          activeSectionSlug={record.sectionSlug}
        />
      }
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
        <div className="prose-academic">
          <MDXRemote
            source={courseLesson.content}
            options={mdxOptions}
            components={mdxComponents}
          />
        </div>

        {relatedLessonHref ? (
          <section>
            <Link href={relatedLessonHref} className="book-action-secondary">
              Open standalone lesson page
            </Link>
          </section>
        ) : null}

        <SourcePanel />
      </ArticleBody>
    </FieldGuidePage>
  );
}


