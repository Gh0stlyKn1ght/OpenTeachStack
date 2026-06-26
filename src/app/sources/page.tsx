import type { Metadata } from "next";
import Link from "next/link";
import ArticleBody from "@/components/field-guide/ArticleBody";
import FieldGuidePage from "@/components/field-guide/FieldGuidePage";
import {
  OfficialCourseSources,
  SoftwareSourceInventory,
} from "@/components/OfficialSources";

export const metadata: Metadata = {
  title: "Official Sources — OpenTeachStack",
  description:
    "Official documentation and source list for OpenTeachStack courses, apps, and software-facing lessons.",
};

export default function SourcesPage() {
  return (
    <FieldGuidePage
      eyebrow="Source Audit"
      title="Official Sources"
      subtitle="This is the source-of-truth list for software, platforms, documentation, and technical references used across OpenTeachStack. Lessons can use tutorials as supplements, but software behavior should be checked against official documentation first."
      breadcrumbs={[{ label: "Knowledge Base", href: "/kb" }]}
      meta={[
        { label: "Rule", value: "Official docs first" },
        { label: "AI role", value: "Draft after source" },
        { label: "Scope", value: "Courses and software" },
      ]}
    >
      <ArticleBody>
        <section className="rounded-md border border-border bg-surface p-4">
          <h2 className="mb-2 font-heading text-lg font-bold text-foreground">
            Course Writing Rule
          </h2>
          <p className="text-sm leading-relaxed text-slate">
            When a lesson teaches an app, API, platform, automation workflow,
            publishing workflow, or AI tool, cite the official docs in the
            lesson notes or resource list. AI output is never the source. AI can
            help summarize, draft, or compare sources after the source link is
            known.
          </p>
          <Link
            href="/kb/resources"
            className="mt-4 inline-flex text-sm font-semibold text-link no-underline hover:underline"
          >
            Open the source bank
          </Link>
        </section>

        <section>
          <h2 className="mb-1 font-heading text-xl font-bold text-foreground">
            Official Documentation by Pathway Course
          </h2>
          <p className="mb-4 text-sm text-foreground/50">
            Use this list when planning modules, labs, prompt templates, and
            software explanations.
          </p>
          <OfficialCourseSources />
        </section>

        <section>
          <h2 className="mb-1 font-heading text-xl font-bold text-foreground">
            App and Software Sources
          </h2>
          <p className="mb-4 text-sm text-foreground/50">
            Each homepage carousel app has a direct product link and a direct
            official documentation or help link.
          </p>
          <SoftwareSourceInventory />
        </section>
      </ArticleBody>
    </FieldGuidePage>
  );
}


