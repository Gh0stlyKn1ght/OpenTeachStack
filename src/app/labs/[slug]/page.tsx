import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getAllContent, getContentBySlug } from "@/lib/content";
import { mdxOptions } from "@/lib/mdx";
import { COURSE_TITLE } from "@/lib/metadata";
import LabLayout from "@/components/LabLayout";
import TableOfContents from "@/components/TableOfContents";
import MermaidBlock from "@/components/MermaidBlock";
import MDXPre from "@/components/MDXPre";
import VideoEmbed from "@/components/VideoEmbed";
import ReflectionPrompt from "@/components/ReflectionPrompt";
import TeacherNote from "@/components/TeacherNote";
import RealityCheck from "@/components/RealityCheck";
import BuildTask from "@/components/BuildTask";
import {
  AICourseContentWorkflowVisual,
  ChecklistBlock,
  ComparisonBlock,
  ConceptCard,
  CourseTruthStackVisual,
  FakeCourseTrapVisual,
  FrameworkBlock,
  SourceTruthExportVisual,
  TakeawayStrip,
  TiredTeacherTestVisual,
  WorkflowBlock,
} from "@/components/InstructionalBlocks";
const mdxComponents = {
  pre: MDXPre,
  MermaidBlock,
  VideoEmbed,
  ReflectionPrompt,
  TeacherNote,
  RealityCheck,
  BuildTask,
  FrameworkBlock,
  ConceptCard,
  TakeawayStrip,
  ComparisonBlock,
  WorkflowBlock,
  ChecklistBlock,
  FakeCourseTrapVisual,
  SourceTruthExportVisual,
  CourseTruthStackVisual,
  AICourseContentWorkflowVisual,
  TiredTeacherTestVisual,
};

interface LabPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const labs = getAllContent("labs");
  return labs.map((lab) => ({ slug: lab.slug }));
}

export async function generateMetadata({
  params,
}: LabPageProps): Promise<Metadata> {
  const { slug } = await params;

  try {
    const { frontmatter } = getContentBySlug("labs", slug);
    return {
      title: `${frontmatter.title} — ${COURSE_TITLE}`,
      description: frontmatter.summary,
    };
  } catch {
    return { title: `Lab Not Found — ${COURSE_TITLE}` };
  }
}

export default async function LabPage({ params }: LabPageProps) {
  const { slug } = await params;

  let lab;
  try {
    lab = getContentBySlug("labs", slug);
  } catch {
    notFound();
  }

  const { frontmatter, content } = lab;

  // Calculate previous/next
  const allLabs = getAllContent("labs");
  const currentIndex = allLabs.findIndex((l) => l.slug === slug);

  const previous =
    currentIndex > 0
      ? {
          title: allLabs[currentIndex - 1].frontmatter.title,
          href: `/labs/${allLabs[currentIndex - 1].slug}`,
        }
      : undefined;

  const next =
    currentIndex < allLabs.length - 1
      ? {
          title: allLabs[currentIndex + 1].frontmatter.title,
          href: `/labs/${allLabs[currentIndex + 1].slug}`,
        }
      : undefined;

  return (
    <div className="mx-auto max-w-5xl px-6 py-12 lg:grid lg:grid-cols-[1fr_220px] lg:gap-10">
      <LabLayout
        frontmatter={{
          title: frontmatter.title,
          module: frontmatter.module,
          estimatedTime: frontmatter.duration,
          level: frontmatter.level,
          outcomes: frontmatter.outcomes,
        }}
        previous={previous}
        next={next}
      >
        <MDXRemote
          source={content}
          options={mdxOptions}
          components={mdxComponents}
        />
      </LabLayout>

      <aside className="hidden lg:block">
        <TableOfContents />
      </aside>
    </div>
  );
}

