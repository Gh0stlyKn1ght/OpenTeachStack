import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getContentByModule } from "@/lib/content";
import { MODULES, COURSE_TITLE } from "@/lib/metadata";
import { FOUNDATION_TEMPLATES } from "@/lib/templates";

interface ModulePageProps {
  params: Promise<{ module: string }>;
}

export async function generateStaticParams() {
  return MODULES.map((mod) => ({ module: mod.slug }));
}

export async function generateMetadata({
  params,
}: ModulePageProps): Promise<Metadata> {
  const { module: moduleSlug } = await params;
  const mod = MODULES.find((m) => m.slug === moduleSlug);

  if (!mod) {
    return { title: `Module Not Found — ${COURSE_TITLE}` };
  }

  return {
    title: `Module ${mod.number}: ${mod.title} — ${COURSE_TITLE}`,
    description: mod.description,
  };
}

export default async function ModulePage({ params }: ModulePageProps) {
  const { module: moduleSlug } = await params;
  const mod = MODULES.find((m) => m.slug === moduleSlug);

  if (!mod) {
    notFound();
  }

  const lessons = getContentByModule("lessons", mod.id);
  const labs = getContentByModule("labs", mod.id);
  const moduleTemplates = FOUNDATION_TEMPLATES.filter((template) =>
    mod.templateSlugs.includes(template.slug),
  );

  // Find previous/next modules
  const moduleIndex = MODULES.findIndex((m) => m.slug === moduleSlug);
  const previousModule = moduleIndex > 0 ? MODULES[moduleIndex - 1] : null;
  const nextModule =
    moduleIndex < MODULES.length - 1 ? MODULES[moduleIndex + 1] : null;

  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <header className="mb-12">
        <p className="mb-2 font-mono text-xs uppercase tracking-widest text-accent">
          Module {mod.number}
        </p>
        <h1 className="font-serif text-3xl font-bold text-foreground md:text-4xl">
          {mod.title}
        </h1>
        <p className="mt-3 text-base text-slate font-sans">
          {mod.description}
        </p>
      </header>

      <section className="mb-10 rounded-md border border-border bg-surface p-5">
        <p className="mb-2 font-mono text-xs uppercase tracking-widest text-foreground/40">
          Build Artifact
        </p>
        <h2 className="mb-2 border-none font-serif text-xl font-semibold text-foreground">
          {mod.buildArtifact}
        </h2>
        <p className="mb-4 text-sm leading-relaxed text-slate">
          {mod.evidence}
        </p>
        {moduleTemplates.length > 0 && (
          <div>
            <p className="mb-2 font-mono text-xs uppercase tracking-widest text-foreground/40">
              Templates
            </p>
            <div className="flex flex-wrap gap-2">
              {moduleTemplates.map((template) => (
                <Link
                  key={template.slug}
                  href={`/templates/${template.slug}`}
                  className="rounded-sm border border-border px-2.5 py-1 font-mono text-xs text-slate no-underline transition-colors hover:border-accent/40 hover:text-link"
                >
                  {template.title}
                </Link>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* Lessons section */}
      {lessons.length > 0 && (
        <section className="mb-10">
          <h2 className="mb-4 font-serif text-xl font-semibold text-foreground">
            Lessons
          </h2>
          <ul className="space-y-3">
            {lessons.map((lesson) => (
              <li key={lesson.slug}>
                <Link
                  href={`/lessons/${lesson.slug}`}
                  className="group block rounded-md border border-border p-4 transition-colors hover:border-accent/40 hover:bg-surface-alt/30"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <h3 className="font-serif text-base font-semibold text-foreground group-hover:text-link transition-colors">
                        {lesson.frontmatter.title}
                      </h3>
                      {lesson.frontmatter.summary && (
                        <p className="mt-1 text-sm text-slate font-sans line-clamp-2">
                          {lesson.frontmatter.summary}
                        </p>
                      )}
                    </div>
                    <span className="flex-shrink-0 rounded-sm bg-link/10 px-2 py-0.5 font-mono text-[0.65rem] font-semibold uppercase tracking-widest text-link">
                      Lecture
                    </span>
                  </div>
                  <div className="mt-2 flex items-center gap-3 text-xs font-mono text-slate">
                    {lesson.frontmatter.duration && (
                      <span>{lesson.frontmatter.duration}</span>
                    )}
                    {lesson.frontmatter.level && (
                      <span className="rounded-sm bg-surface-alt px-1.5 py-0.5 uppercase tracking-wider">
                        {lesson.frontmatter.level}
                      </span>
                    )}
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Labs section */}
      {labs.length > 0 && (
        <section className="mb-10">
          <h2 className="mb-4 font-serif text-xl font-semibold text-foreground">
            Labs
          </h2>
          <ul className="space-y-3">
            {labs.map((lab) => (
              <li key={lab.slug}>
                <Link
                  href={`/labs/${lab.slug}`}
                  className="group block rounded-md border border-border p-4 transition-colors hover:border-accent/40 hover:bg-surface-alt/30"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <h3 className="font-serif text-base font-semibold text-foreground group-hover:text-link transition-colors">
                        {lab.frontmatter.title}
                      </h3>
                      {lab.frontmatter.summary && (
                        <p className="mt-1 text-sm text-slate font-sans line-clamp-2">
                          {lab.frontmatter.summary}
                        </p>
                      )}
                    </div>
                    <span className="flex-shrink-0 rounded-sm bg-accent/15 px-2 py-0.5 font-mono text-[0.65rem] font-semibold uppercase tracking-widest text-accent">
                      Lab
                    </span>
                  </div>
                  <div className="mt-2 flex items-center gap-3 text-xs font-mono text-slate">
                    {lab.frontmatter.duration && (
                      <span>{lab.frontmatter.duration}</span>
                    )}
                    {lab.frontmatter.level && (
                      <span className="rounded-sm bg-surface-alt px-1.5 py-0.5 uppercase tracking-wider">
                        {lab.frontmatter.level}
                      </span>
                    )}
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Empty state */}
      {lessons.length === 0 && labs.length === 0 && (
        <div className="py-12 text-center text-sm text-slate font-sans">
          No content available for this module yet. Check back soon.
        </div>
      )}

      {/* Module navigation */}
      {(previousModule || nextModule) && (
        <nav
          className="mt-16 mb-8 flex items-stretch gap-4 border-t border-border pt-8"
          aria-label="Module navigation"
        >
          {previousModule ? (
            <Link
              href={`/course/${previousModule.slug}`}
              className="group flex flex-1 items-center gap-3 rounded-md border border-border p-4 text-left transition-colors hover:border-accent/40 hover:bg-surface-alt/30"
            >
              <span
                className="text-slate group-hover:text-accent transition-colors"
                aria-hidden="true"
              >
                &larr;
              </span>
              <span className="min-w-0">
                <span className="block text-[0.65rem] font-mono uppercase tracking-widest text-slate">
                  Previous Module
                </span>
                <span className="block text-sm font-serif font-semibold text-foreground truncate">
                  {previousModule.number}. {previousModule.title}
                </span>
              </span>
            </Link>
          ) : (
            <div className="flex-1" />
          )}

          {nextModule ? (
            <Link
              href={`/course/${nextModule.slug}`}
              className="group flex flex-1 items-center justify-end gap-3 rounded-md border border-border p-4 text-right transition-colors hover:border-accent/40 hover:bg-surface-alt/30"
            >
              <span className="min-w-0">
                <span className="block text-[0.65rem] font-mono uppercase tracking-widest text-slate">
                  Next Module
                </span>
                <span className="block text-sm font-serif font-semibold text-foreground truncate">
                  {nextModule.number}. {nextModule.title}
                </span>
              </span>
              <span
                className="text-slate group-hover:text-accent transition-colors"
                aria-hidden="true"
              >
                &rarr;
              </span>
            </Link>
          ) : (
            <div className="flex-1" />
          )}
        </nav>
      )}
    </div>
  );
}
