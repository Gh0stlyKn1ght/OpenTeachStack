import Link from "next/link";
import {
  COURSE_CODE,
  COURSE_SUBTITLE,
  COURSE_THESIS,
  COURSE_TITLE,
  MODULES,
} from "@/lib/metadata";

export default function CourseHero() {
  return (
    <section className="mx-auto max-w-3xl px-6 pt-16 pb-12">
      {/* Course code badge */}
      <span className="inline-block text-xs font-mono font-medium tracking-widest uppercase text-accent border border-accent/30 rounded px-2.5 py-1 mb-6">
        {COURSE_CODE}
      </span>

      {/* Title */}
      <h1 className="font-serif text-4xl sm:text-5xl font-extrabold tracking-normal text-foreground leading-tight mb-4">
        {COURSE_TITLE}
      </h1>

      {/* Subtitle */}
      <p className="font-serif text-lg sm:text-xl text-foreground/70 leading-relaxed mb-6">
        {COURSE_SUBTITLE}
      </p>

      {/* Thesis paragraph */}
      <p className="text-base text-foreground/60 leading-relaxed max-w-2xl mb-8">
        {COURSE_THESIS}
      </p>

      {/* CTAs */}
      <div className="flex flex-wrap items-center gap-4 mb-8">
        <Link
          href="/book/ots-101"
          className="inline-flex items-center px-5 py-2.5 text-sm font-medium border border-foreground text-foreground no-underline rounded hover:bg-foreground hover:text-background transition-colors"
        >
          Begin OTS-101
        </Link>
        <Link
          href="/syllabus"
          className="inline-flex items-center px-5 py-2.5 text-sm font-medium text-foreground/60 no-underline hover:text-foreground transition-colors"
        >
          View Syllabus &rarr;
        </Link>
      </div>

      {/* Metadata line */}
      <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs font-sans text-foreground/45 tracking-wide uppercase">
        <span>{MODULES.length} Chapters</span>
        <span className="hidden sm:inline text-foreground/20">&middot;</span>
        <span>Format: Self-paced</span>
        <span className="hidden sm:inline text-foreground/20">&middot;</span>
        <span>License: CC BY-NC-SA 4.0</span>
      </div>

      {/* Horizontal rule */}
      <hr className="mt-10 border-t border-border" />
    </section>
  );
}
