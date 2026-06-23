import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import CyberSafetySidebar from "@/components/book/CyberSafetySidebar";
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
  CYBER_COURSE_CODE,
  getAdjacentCyberSections,
  getAllCyberSectionRecords,
  getCyberSectionBySlugs,
} from "@/lib/cyberSafety";

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
    return { title: "Section Not Found — Teaching Teachers" };
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
  const courseLesson = getCourseLessonBySlugs(
    "ots-280",
    record.chapter.slug,
    record.sectionSlug,
  );

  if (courseLesson?.frontmatter.migrationStatus !== "authored") {
    notFound();
  }

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
        { label: "Chapter", value: record.chapter.title },
        { label: "Type", value: record.section.type },
        { label: "Duration", value: record.section.duration },
        { label: "Source", value: "Course-owned MDX" },
        { label: "Print", value: "Full book PDF" },
      ]}
      sidebar={
        <CyberSafetySidebar
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
      </ArticleBody>
    </FieldGuidePage>
  );
}


