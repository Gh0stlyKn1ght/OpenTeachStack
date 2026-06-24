"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { TeacherPrompt } from "@/lib/prompts";

interface PromptLibraryClientProps {
  prompts: TeacherPrompt[];
  categories: string[];
  courses: string[];
  artifacts: string[];
  tags: string[];
}

const ALL = "All";

export default function PromptLibraryClient({
  prompts,
  categories,
  courses,
  artifacts,
  tags,
}: PromptLibraryClientProps) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState(ALL);
  const [course, setCourse] = useState(ALL);
  const [artifact, setArtifact] = useState(ALL);
  const [tag, setTag] = useState(ALL);
  const [copiedSlug, setCopiedSlug] = useState<string | null>(null);

  const filteredPrompts = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return prompts.filter((prompt) => {
      const matchesQuery =
        !normalizedQuery ||
        [
          prompt.title,
          prompt.category,
          prompt.useCase,
          prompt.expectedOutput,
          prompt.relatedCourses.join(" "),
          prompt.relatedArtifacts.join(" "),
          prompt.tags.join(" "),
        ]
          .join(" ")
          .toLowerCase()
          .includes(normalizedQuery);

      const matchesCategory = category === ALL || prompt.category === category;
      const matchesCourse =
        course === ALL || prompt.relatedCourses.includes(course as never);
      const matchesArtifact =
        artifact === ALL || prompt.relatedArtifacts.includes(artifact);
      const matchesTag = tag === ALL || prompt.tags.includes(tag);

      return (
        matchesQuery &&
        matchesCategory &&
        matchesCourse &&
        matchesArtifact &&
        matchesTag
      );
    });
  }, [artifact, category, course, prompts, query, tag]);

  async function copyPrompt(prompt: TeacherPrompt) {
    await navigator.clipboard.writeText(prompt.prompt);
    setCopiedSlug(prompt.slug);
    window.setTimeout(() => setCopiedSlug(null), 1800);
  }

  return (
    <div className="space-y-8">
      <section
        className="grid gap-3 border-y border-border py-5 md:grid-cols-[minmax(12rem,1.4fr)_repeat(4,minmax(9rem,1fr))]"
        data-print-hide
        aria-label="Prompt filters"
      >
        <label className="grid gap-1 text-sm font-semibold text-foreground/70">
          Search
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            className="min-h-10 rounded-sm border border-border bg-background px-3 text-sm text-foreground outline-none transition-colors focus:border-accent"
            placeholder="lesson, rubric, safety..."
          />
        </label>
        <FilterSelect
          label="Category"
          value={category}
          options={categories}
          onChange={setCategory}
        />
        <FilterSelect
          label="Course"
          value={course}
          options={courses}
          onChange={setCourse}
        />
        <FilterSelect
          label="Artifact"
          value={artifact}
          options={artifacts}
          onChange={setArtifact}
        />
        <FilterSelect label="Tag" value={tag} options={tags} onChange={setTag} />
      </section>

      <p className="m-0 font-mono text-xs uppercase tracking-wider text-foreground/45">
        Showing {filteredPrompts.length} of {prompts.length} prompts
      </p>

      <section className="grid gap-5">
        {filteredPrompts.map((prompt) => (
          <article
            key={prompt.slug}
            className="rounded-sm border border-border bg-background p-5"
          >
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="mb-2 font-mono text-xs uppercase tracking-wider text-accent">
                  {prompt.category}
                </p>
                <h2 className="m-0 font-heading text-2xl font-bold text-foreground">
                  <Link
                    href={`/prompts/${prompt.slug}`}
                    className="text-foreground no-underline hover:text-link"
                  >
                    {prompt.title}
                  </Link>
                </h2>
              </div>
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => void copyPrompt(prompt)}
                  className="book-action-secondary"
                >
                  {copiedSlug === prompt.slug ? "Copied" : "Copy Prompt"}
                </button>
                <Link
                  href={`/prompts/${prompt.slug}`}
                  className="book-action-secondary"
                >
                  Details
                </Link>
              </div>
            </div>

            <p className="mt-3 max-w-3xl text-sm leading-relaxed text-foreground/65">
              {prompt.useCase}
            </p>

            <dl className="mt-4 grid gap-x-6 gap-y-2 text-sm sm:grid-cols-[8rem_1fr]">
              <dt className="font-mono uppercase tracking-wider text-foreground/38">
                Courses
              </dt>
              <dd className="m-0 text-foreground/70">
                {prompt.relatedCourses.join(", ")}
              </dd>
              <dt className="font-mono uppercase tracking-wider text-foreground/38">
                Artifact
              </dt>
              <dd className="m-0 text-foreground/70">
                {prompt.relatedArtifacts.join(", ")}
              </dd>
              <dt className="font-mono uppercase tracking-wider text-foreground/38">
                Verify
              </dt>
              <dd className="m-0 text-foreground/70">
                {prompt.verificationChecklist[0]}
              </dd>
              <dt className="font-mono uppercase tracking-wider text-foreground/38">
                Safety
              </dt>
              <dd className="m-0 text-foreground/70">
                {prompt.safetyPrivacyNote}
              </dd>
            </dl>

            <div className="mt-4 flex flex-wrap gap-2">
              {prompt.tags.map((item) => (
                <span
                  key={item}
                  className="rounded-sm bg-surface-alt px-2 py-1 font-mono text-[0.68rem] uppercase tracking-wider text-foreground/55"
                >
                  {item}
                </span>
              ))}
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}

function FilterSelect({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
}) {
  return (
    <label className="grid gap-1 text-sm font-semibold text-foreground/70">
      {label}
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="min-h-10 rounded-sm border border-border bg-background px-3 text-sm text-foreground outline-none transition-colors focus:border-accent"
      >
        <option value={ALL}>{ALL}</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}
