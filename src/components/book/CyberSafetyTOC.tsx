import Link from "next/link";
import { CYBER_BOOK_CHAPTERS } from "@/lib/cyberSafety";

export default function CyberSafetyTOC() {
  return (
    <ol className="divide-y divide-border border-y border-border">
      {CYBER_BOOK_CHAPTERS.map((chapter) => (
        <li key={chapter.slug}>
          <Link
            href={chapter.href}
            className="grid gap-4 py-5 no-underline transition-colors hover:bg-surface-alt/35 md:grid-cols-[4rem_1.2fr_1fr_1fr]"
          >
            <span className="font-mono text-sm text-accent">
              Ch. {chapter.number}
            </span>
            <span>
              <strong className="block text-base text-foreground">
                {chapter.title}
              </strong>
              <span className="mt-1 block text-sm leading-relaxed text-foreground/55">
                {chapter.problem}
              </span>
              <span className="mt-2 block font-mono text-[0.7rem] uppercase tracking-wider text-foreground/35">
                {chapter.sections.length} sections
              </span>
              <span className="mt-3 flex flex-wrap gap-2">
                {chapter.sections.slice(0, 4).map((section) => (
                  <span
                    key={section.number}
                    className="rounded-sm border border-border px-2 py-1 font-mono text-[0.68rem] text-foreground/45"
                  >
                    {section.number}
                  </span>
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
              {chapter.transferableSkills[0]}
            </span>
          </Link>
        </li>
      ))}
    </ol>
  );
}
