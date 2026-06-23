import type { Metadata } from "next";
import ArticleBody from "@/components/field-guide/ArticleBody";
import FieldGuidePage from "@/components/field-guide/FieldGuidePage";
import PrintPageButton from "@/components/PrintPageButton";
import TemplateCard from "@/components/TemplateCard";
import { createPageMetadata } from "@/lib/siteMetadata";
import { FOUNDATION_TEMPLATES } from "@/lib/templates";

export const metadata: Metadata = createPageMetadata({
  title: "Template Library — Teaching Teachers",
  description:
    "Available v1 templates for Teaching Teachers Foundations, including workflow audit, standards unpacking, mini-unit map, prompt library, resource evaluation, verification, assessment, delivery, and revision logs.",
  path: "/templates",
});

const plannedTemplateTargets = [
  {
    title: "Course Command Center",
    description:
      "A larger spreadsheet for full-course tracking. This belongs with OTS-201 and OTS-220, not the OTS-101 foundations release.",
    format: "Google Sheet",
    tags: ["future", "workspace", "automation"],
  },
  {
    title: "Image Prompt Log",
    description:
      "A media workflow tracker for AI image generation, style consistency, usage notes, and accessibility alternatives.",
    format: "Google Sheet",
    tags: ["future", "AI-media", "OTS-260"],
  },
  {
    title: "Domain Planning Worksheet",
    description:
      "A site-publishing worksheet for domains, DNS, hosting, and maintenance decisions in the Teacher Course Sites track.",
    format: "Google Doc",
    tags: ["future", "course-sites", "OTS-301"],
  },
  {
    title: "Teacher Website Security Audit",
    description:
      "A defensive checklist for reviewing public teacher sites, course hubs, portfolios, club sites, forms, embeds, downloads, and contact exposure.",
    format: "Google Doc",
    tags: ["future", "cyber-safety", "OTS-280"],
  },
  {
    title: "Public Repo Exposure Checklist",
    description:
      "A GitHub safety checklist for secrets, student data, screenshots, metadata, README exposure, domain notes, and pre-publish review.",
    format: "Google Doc",
    tags: ["future", "cyber-safety", "OTS-280"],
  },
  {
    title: "Account Hygiene and MFA Checklist",
    description:
      "A teacher-facing account inventory for password manager adoption, MFA status, recovery settings, and priority account cleanup.",
    format: "Google Sheet",
    tags: ["future", "cyber-safety", "OTS-280"],
  },
];

export default function TemplatesPage() {
  return (
    <FieldGuidePage
      eyebrow="Teacher Artifact Shelf"
      title="Template Library"
      subtitle="The v1 Teaching Teachers Foundations templates are available as site pages first. Each one includes a blank version, an example version, evidence of completion, safety checks, and a Markdown download."
      breadcrumbs={[{ label: "Book", href: "/book" }]}
      meta={[
        { label: "Released", value: String(FOUNDATION_TEMPLATES.length) },
        { label: "Planned", value: String(plannedTemplateTargets.length) },
        { label: "Course", value: "OTS-101" },
      ]}
    >
      <ArticleBody>
        <div className="mt-6" data-print-hide>
          <PrintPageButton />
        </div>

      <section>
        <h2 className="mb-1 font-heading text-xl font-bold text-foreground">
          Available Foundations Templates
        </h2>
        <p className="mb-4 text-sm text-foreground/50">
          These templates support the OTS-101 mini-unit capstone.
        </p>
        {FOUNDATION_TEMPLATES.map((template) => (
          <TemplateCard
            key={template.slug}
            title={template.title}
            description={template.purpose}
            format={template.format}
            status="Available"
            viewUrl={`/templates/${template.slug}`}
            downloadUrl={`/templates/${template.slug}/download`}
            tags={template.tags}
          />
        ))}
      </section>

      <section>
        <h2 className="mb-1 font-heading text-xl font-bold text-foreground">
          Planned Google-Format Template Targets
        </h2>
        <p className="mb-4 text-sm text-foreground/50">
          These are useful pathway artifacts, but they stay marked as planned
          until real Google Docs or Sheets files exist.
        </p>
        {plannedTemplateTargets.map((template) => (
          <TemplateCard
            key={template.title}
            title={template.title}
            description={template.description}
            format={template.format}
            status="Planned"
            tags={template.tags}
          />
        ))}
      </section>

      <aside className="border-t border-border pt-6">
        <h3 className="mb-3 font-sans text-xs font-semibold uppercase tracking-widest text-foreground/40">
          Template Safety Rules
        </h3>
        <div className="prose-academic text-sm">
          <p>
            Every v1 template includes privacy, copyright/licensing, AI
            verification, standards alignment, accessibility, and revision-log
            checks. Broken download links should not be added.
          </p>
        </div>
      </aside>
      </ArticleBody>
    </FieldGuidePage>
  );
}


