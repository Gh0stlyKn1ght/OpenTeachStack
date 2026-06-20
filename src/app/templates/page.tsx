import type { Metadata } from "next";
import TemplateCard from "@/components/TemplateCard";
import { FOUNDATION_TEMPLATES } from "@/lib/templates";

export const metadata: Metadata = {
  title: "Template Library — Open TeachStack",
  description:
    "Available v1 templates for Open TeachStack Foundations, including workflow audit, standards unpacking, mini-unit map, prompt library, resource evaluation, verification, assessment, delivery, and revision logs.",
};

const futureTemplates = [
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
];

export default function TemplatesPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <header className="mb-10">
        <h1 className="mb-3 font-serif text-3xl font-extrabold tracking-normal text-foreground sm:text-4xl">
          Template Library
        </h1>
        <p className="max-w-2xl leading-relaxed text-foreground/60">
          The v1 Open TeachStack Foundations templates are available as site
          pages first. Each one includes a blank version, an example version,
          evidence of completion, safety checks, and a Markdown download.
        </p>
      </header>

      <hr className="mb-10 border-t border-border" />

      <section className="mb-10">
        <h2 className="mb-1 font-serif text-xl font-bold text-foreground">
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

      <hr className="mb-10 border-t border-border" />

      <section>
        <h2 className="mb-1 font-serif text-xl font-bold text-foreground">
          Future Pathway Templates
        </h2>
        <p className="mb-4 text-sm text-foreground/50">
          Useful later, but intentionally out of scope for the first
          foundations release.
        </p>
        {futureTemplates.map((template) => (
          <TemplateCard
            key={template.title}
            title={template.title}
            description={template.description}
            format={template.format}
            status="Future"
            tags={template.tags}
          />
        ))}
      </section>

      <aside className="mt-10 border-t border-border pt-6">
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
    </div>
  );
}
