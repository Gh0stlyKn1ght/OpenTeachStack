import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PrintPageButton from "@/components/PrintPageButton";
import {
  FOUNDATION_TEMPLATES,
  getFoundationTemplate,
} from "@/lib/templates";

interface TemplatePageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return FOUNDATION_TEMPLATES.map((template) => ({ slug: template.slug }));
}

export async function generateMetadata({
  params,
}: TemplatePageProps): Promise<Metadata> {
  const { slug } = await params;
  const template = getFoundationTemplate(slug);

  if (!template) {
    return { title: "Template Not Found — OpenTeachStack" };
  }

  return {
    title: `${template.title} — OpenTeachStack Templates`,
    description: template.purpose,
  };
}

export default async function TemplatePage({ params }: TemplatePageProps) {
  const { slug } = await params;
  const template = getFoundationTemplate(slug);

  if (!template) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-4xl px-6 py-12">
      <Link
        href="/templates"
        data-print-hide
        className="mb-8 inline-flex text-sm font-semibold text-link no-underline hover:underline"
      >
        &larr; Template Library
      </Link>

      <header className="mb-10">
        <div className="mb-4 flex flex-wrap items-center gap-2">
          <span className="rounded border border-accent/30 px-2.5 py-1 font-mono text-xs font-medium uppercase tracking-widest text-accent">
            {template.module}
          </span>
          <span className="rounded-sm bg-surface-alt px-2 py-1 font-mono text-xs uppercase tracking-wider text-slate">
            {template.format}
          </span>
        </div>
        <h1 className="mb-3 font-heading text-3xl font-extrabold tracking-normal text-foreground sm:text-4xl">
          {template.title}
        </h1>
        <p className="max-w-2xl leading-relaxed text-foreground/60">
          {template.purpose}
        </p>
        <div className="mt-5 flex flex-wrap items-center gap-3" data-print-hide>
          <Link
            href={`/templates/${template.slug}/download`}
            className="inline-flex rounded-sm border border-border px-3 py-2 font-mono text-xs font-semibold uppercase tracking-wider text-slate no-underline transition-colors hover:border-accent/40 hover:text-link"
          >
            Download Markdown
          </Link>
          <PrintPageButton />
        </div>
      </header>

      <section className="mb-10 grid gap-4 md:grid-cols-2">
        <div className="rounded-md border border-border bg-surface p-4">
          <h2 className="mb-2 font-heading text-lg font-bold text-foreground">
            Beginner Version
          </h2>
          <p className="text-sm leading-relaxed text-slate">
            {template.beginnerVersion}
          </p>
        </div>
        <div className="rounded-md border border-border bg-surface p-4">
          <h2 className="mb-2 font-heading text-lg font-bold text-foreground">
            Advanced Version
          </h2>
          <p className="text-sm leading-relaxed text-slate">
            {template.advancedVersion}
          </p>
        </div>
      </section>

      <section className="mb-10 rounded-md border border-border bg-surface p-4">
        <h2 className="mb-2 font-heading text-lg font-bold text-foreground">
          Evidence of Completion
        </h2>
        <p className="text-sm leading-relaxed text-slate">
          {template.evidenceOfCompletion}
        </p>
      </section>

      <div className="grid gap-8 lg:grid-cols-2">
        <section>
          <h2 className="mb-4 font-heading text-2xl font-bold text-foreground">
            Blank Version
          </h2>
          <div className="space-y-5">
            {template.sections.map((section) => (
              <article
                key={`blank-${section.title}`}
                className="rounded-md border border-border bg-background p-4"
              >
                <h3 className="mb-2 font-heading text-lg font-semibold text-foreground">
                  {section.title}
                </h3>
                {section.prompt && (
                  <p className="mb-3 text-sm leading-relaxed text-slate">
                    {section.prompt}
                  </p>
                )}
                {section.fields && (
                  <dl className="space-y-2">
                    {section.fields.map((field) => (
                      <div key={field}>
                        <dt className="font-mono text-xs uppercase tracking-wider text-foreground/45">
                          {field}
                        </dt>
                        <dd className="mt-1 min-h-8 rounded-sm border border-dashed border-border bg-surface-alt/30 px-3 py-2 text-sm text-foreground/35">
                          Write here
                        </dd>
                      </div>
                    ))}
                  </dl>
                )}
              </article>
            ))}
          </div>
        </section>

        <section>
          <h2 className="mb-4 font-heading text-2xl font-bold text-foreground">
            Example Version
          </h2>
          <div className="space-y-5">
            {template.sections.map((section) => (
              <article
                key={`example-${section.title}`}
                className="rounded-md border border-border bg-surface p-4"
              >
                <h3 className="mb-2 font-heading text-lg font-semibold text-foreground">
                  {section.title}
                </h3>
                {section.fields && section.example && (
                  <dl className="space-y-2">
                    {section.fields.map((field, index) => (
                      <div key={field}>
                        <dt className="font-mono text-xs uppercase tracking-wider text-foreground/45">
                          {field}
                        </dt>
                        <dd className="mt-1 rounded-sm bg-background px-3 py-2 text-sm leading-relaxed text-slate">
                          {section.example?.[index] ?? "Example pending"}
                        </dd>
                      </div>
                    ))}
                  </dl>
                )}
              </article>
            ))}
          </div>
        </section>
      </div>

      <aside className="mt-10 border-t border-border pt-6">
        <h2 className="mb-3 font-sans text-xs font-semibold uppercase tracking-widest text-foreground/40">
          Copying Guidance
        </h2>
        <p className="text-sm leading-relaxed text-slate">
          This is the site-page version of the template. Use the blank fields
          as the structure for your own Google Doc, Google Sheet, Markdown
          file, or local planning document. The Markdown download above
          includes both the blank version and the worked example.
        </p>
      </aside>
    </div>
  );
}


