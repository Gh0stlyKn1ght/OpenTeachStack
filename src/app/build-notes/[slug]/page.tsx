import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import ArticleBody from "@/components/field-guide/ArticleBody";
import FieldGuidePage from "@/components/field-guide/FieldGuidePage";
import ArticleByline from "@/components/ArticleByline";
import { mdxOptions } from "@/lib/mdx";
import MDXPre from "@/components/MDXPre";
import MermaidBlock from "@/components/MermaidBlock";
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
import { getPublishedBlogPost, getPublishedBlogPosts } from "@/lib/blog";

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

interface BuildNotePageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getPublishedBlogPosts("build-notes").map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: BuildNotePageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPublishedBlogPost(slug, "build-notes");

  if (!post) {
    return { title: "Build Note Not Found — OpenTeachStack" };
  }

  return {
    title: `${post.title} — Build Notes`,
    description: post.summary,
  };
}

export default async function BuildNotePage({ params }: BuildNotePageProps) {
  const { slug } = await params;
  const post = getPublishedBlogPost(slug, "build-notes");

  if (!post) {
    notFound();
  }

  return (
    <FieldGuidePage
      eyebrow={post.category}
      title={post.title}
      subtitle={post.summary}
      breadcrumbs={[
        { label: "Build Notes", href: "/build-notes" },
        { label: "Start", href: "/book/ots-000" },
      ]}
    >
      <ArticleByline
        author={post.author}
        date={post.date}
        title={post.title}
        readingTime={post.readingTime}
      />
      <ArticleBody>
        <div className="prose-academic">
          <MDXRemote
            source={post.content}
            options={mdxOptions}
            components={mdxComponents}
          />
        </div>
      </ArticleBody>
    </FieldGuidePage>
  );
}



