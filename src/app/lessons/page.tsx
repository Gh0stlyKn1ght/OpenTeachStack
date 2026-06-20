import Link from "next/link";
import type { Metadata } from "next";
import { getAllContent } from "@/lib/content";
import { MODULES, COURSE_TITLE } from "@/lib/metadata";

export const metadata: Metadata = {
  title: `Lessons — ${COURSE_TITLE}`,
  description:
    "Browse all lessons in the Open TeachStack course, organized by module.",
};

export default function LessonsPage() {
  const lessons = getAllContent("lessons");

  // Group lessons by module id (frontmatter.module uses the module id, not slug)
  const lessonsByModuleId = new Map<string, typeof lessons>();
  for (const lesson of lessons) {
    const modId = lesson.frontmatter.module ?? "uncategorized";
    if (!lessonsByModuleId.has(modId)) {
      lessonsByModuleId.set(modId, []);
    }
    lessonsByModuleId.get(modId)!.push(lesson);
  }

  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <header className="mb-12">
        <p className="mb-2 font-mono text-xs uppercase tracking-widest text-accent">
          {COURSE_TITLE}
        </p>
        <h1 className="font-serif text-3xl font-bold text-foreground md:text-4xl">
          Lessons
        </h1>
        <p className="mt-3 text-base text-slate font-sans">
          All lectures and readings across the course, organized by module.
        </p>
      </header>

      <div className="space-y-12">
        {MODULES.map((mod) => {
          const moduleLessons = lessonsByModuleId.get(mod.id);
          if (!moduleLessons || moduleLessons.length === 0) return null;

          return (
            <section key={mod.slug}>
              <h2 className="mb-1 font-serif text-lg font-semibold text-foreground">
                <span className="font-mono text-sm text-accent mr-2">
                  {mod.number}.
                </span>
                {mod.title}
              </h2>
              <p className="mb-4 text-sm text-slate font-sans">
                {mod.description}
              </p>

              <ul className="space-y-3">
                {moduleLessons.map((lesson) => (
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
                        <div className="flex flex-shrink-0 items-center gap-2">
                          {lesson.frontmatter.type && (
                            <span
                              className={`rounded-sm px-2 py-0.5 font-mono text-[0.65rem] font-semibold uppercase tracking-widest ${
                                lesson.frontmatter.type === "lab"
                                  ? "bg-accent/15 text-accent"
                                  : "bg-link/10 text-link"
                              }`}
                            >
                              {lesson.frontmatter.type === "lab"
                                ? "Lab"
                                : "Lecture"}
                            </span>
                          )}
                        </div>
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
          );
        })}
      </div>
    </div>
  );
}
