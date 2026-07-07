"use client";

import Link from "next/link";

interface CourseUnavailableNoticeProps {
  courseSlug: string;
  failureCategory: string;
  suggestedCommand: string;
  backHref?: string;
  errorDigest?: string;
  onRetry?: () => void;
}

export default function CourseUnavailableNotice({
  courseSlug,
  failureCategory,
  suggestedCommand,
  backHref = "/book",
  errorDigest,
  onRetry,
}: CourseUnavailableNoticeProps) {
  return (
    <main className="mx-auto flex min-h-[70vh] max-w-3xl flex-col justify-center px-6 py-16">
      <p className="mb-3 font-mono text-xs uppercase tracking-widest text-accent">
        Course unavailable
      </p>
      <h1 className="font-heading text-3xl font-bold text-foreground">
        {courseSlug} could not load cleanly.
      </h1>
      <p className="mt-4 text-base leading-relaxed text-foreground/68">
        OpenTeachStack stopped this course surface before the failure could take
        down the rest of the pathway. Treat this as a course-level repair, not
        a release signal.
      </p>

      <dl className="mt-8 grid gap-4 rounded-sm border border-border bg-surface-alt/35 p-5 text-sm">
        <div>
          <dt className="font-mono text-[0.68rem] uppercase tracking-wider text-foreground/40">
            Failure category
          </dt>
          <dd className="mt-1 text-foreground/75">{failureCategory}</dd>
        </div>
        <div>
          <dt className="font-mono text-[0.68rem] uppercase tracking-wider text-foreground/40">
            Suggested local command
          </dt>
          <dd className="mt-2 overflow-x-auto rounded-sm bg-background px-3 py-2 font-mono text-xs text-foreground/75">
            {suggestedCommand}
          </dd>
        </div>
        {errorDigest ? (
          <div>
            <dt className="font-mono text-[0.68rem] uppercase tracking-wider text-foreground/40">
              Error digest
            </dt>
            <dd className="mt-1 font-mono text-xs text-foreground/58">
              {errorDigest}
            </dd>
          </div>
        ) : null}
      </dl>

      <div className="mt-8 flex flex-wrap gap-3">
        {onRetry ? (
          <button className="book-action" type="button" onClick={onRetry}>
            Try again
          </button>
        ) : null}
        <Link className="book-action-secondary" href={backHref}>
          Back to course books
        </Link>
      </div>
    </main>
  );
}
