import Link from "next/link";
import type { CourseStructure } from "@/lib/courseStructures";
import { getChapterHref, getSectionHref } from "@/lib/courseStructures";

export default function CourseStructureTOC({
  course,
}: {
  course: CourseStructure;
}) {
  return (
    <ol className="divide-y divide-border border-y border-border">
      {course.chapters.map((chapter) => (
        <li key={chapter.slug}>
          <div className="grid gap-4 py-5 transition-colors hover:bg-surface-alt/35 md:grid-cols-[4rem_1.2fr_1fr_1fr]">
            <span className="font-mono text-sm text-accent">
              Ch. {chapter.number}
            </span>
            <span>
              <Link
                href={getChapterHref(course, chapter)}
                className="block text-base font-semibold text-foreground no-underline hover:text-accent"
              >
                {chapter.title}
              </Link>
              <span className="mt-1 block text-sm leading-relaxed text-foreground/55">
                {chapter.problem}
              </span>
              <span className="mt-2 block font-mono text-[0.7rem] uppercase tracking-wider text-foreground/35">
                {chapter.sections.length} sections
              </span>
              <span className="mt-3 flex flex-wrap gap-2">
                {chapter.sections.slice(0, 4).map((section) => (
                  <Link
                    key={section.number}
                    href={getSectionHref(course, chapter, section)}
                    className="rounded-sm border border-border px-2 py-1 font-mono text-[0.68rem] text-foreground/45 no-underline hover:border-accent hover:text-accent"
                  >
                    {section.number}
                  </Link>
                ))}
              </span>
            </span>
            <span className="text-sm text-foreground/62">
              <span className="block font-mono text-[0.68rem] uppercase tracking-wider text-foreground/35">
                Artifact
              </span>
              {chapter.buildArtifact}
            </span>
            <span className="text-sm text-foreground/62">
              <span className="block font-mono text-[0.68rem] uppercase tracking-wider text-foreground/35">
                Skill
              </span>
              {chapter.skills[0]}
            </span>
          </div>
        </li>
      ))}
    </ol>
  );
}
