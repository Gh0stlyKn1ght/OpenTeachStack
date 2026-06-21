import type { Metadata } from "next";
import Link from "next/link";
import GitHubIcon from "@/components/GitHubIcon";
import { AUTHOR, LICENSE, REPOSITORY_URL } from "@/lib/metadata";

export const metadata: Metadata = {
  title: "Open Source — Teaching Teachers",
  description:
    "Teaching Teachers is open source. Learn about the project's licensing, contribution guidelines, and philosophy.",
};

export default function OpenSourcePage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      {/* ── Header ───────────────────────────────────────────────────── */}
      <header className="mb-10">
        <h1 className="font-serif text-3xl sm:text-4xl font-extrabold tracking-normal text-foreground mb-3">
          Open Source
        </h1>
        <p className="text-foreground/60 leading-relaxed max-w-2xl">
          Teaching Teachers is built in the open. The code, content, and
          templates that make up this project are freely available for
          educators to use, study, modify, and share.
        </p>
      </header>

      <hr className="border-t border-border mb-10" />

      {/* ── Philosophy ───────────────────────────────────────────────── */}
      <div className="prose-academic">
        <h2>Why Open Source</h2>
        <p>
          The central argument of this course is that teachers should own
          their curriculum infrastructure. That principle applies to the
          course itself. If we are going to teach educators to build systems
          they control, the course materials should model that same
          transparency.
        </p>
        <p>
          Open source in education is not just about cost (though free access
          matters). It is about the ability to inspect how something works,
          adapt it to a different context, and improve it for the next person.
          A teacher in rural Texas and a teacher in urban Chicago face
          different constraints. An open course lets each take what works and
          leave the rest&mdash;or better yet, contribute their adaptations
          back to the project.
        </p>
        <p>
          Every lesson, lab, template, and line of code in this project is
          intended to be inspectable, portable, and reusable. There are no
          paywalls, no premium tiers, no gated content.
        </p>

        {/* ── Licensing ──────────────────────────────────────────────── */}
        <h2>Licensing</h2>
        <p>
          Teaching Teachers uses a dual-license model that separates code from
          content:
        </p>

        <h3>Code: {LICENSE.code.name}</h3>
        <p>
          All source code&mdash;the Next.js application, Apps Script
          examples, build scripts, and configuration files&mdash;is released
          under the{" "}
          <a href={LICENSE.code.url} target="_blank" rel="noopener noreferrer">
            {LICENSE.code.name}
          </a>
          . This is a permissive license that allows you to use, copy, modify,
          and distribute the code for any purpose, including commercial use,
          with minimal restrictions.
        </p>

        <h3>Content: {LICENSE.content.spdx}</h3>
        <p>
          All written content&mdash;lessons, field notes, templates, the
          syllabus, and supporting materials&mdash;is licensed under the{" "}
          <a
            href={LICENSE.content.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            {LICENSE.content.name}
          </a>
          . This license allows you to:
        </p>
        <ul>
          <li>
            <strong>Share</strong> &mdash; Copy and redistribute the material
            in any medium or format.
          </li>
          <li>
            <strong>Adapt</strong> &mdash; Remix, transform, and build upon
            the material.
          </li>
        </ul>
        <p>Under the following terms:</p>
        <ul>
          <li>
            <strong>Attribution</strong> &mdash; You must give appropriate
            credit to {AUTHOR.name} and Teaching Teachers, provide a link to
            the license, and indicate if changes were made.
          </li>
          <li>
            <strong>NonCommercial</strong> &mdash; You may not use the
            material for commercial purposes.
          </li>
          <li>
            <strong>ShareAlike</strong> &mdash; If you remix, transform, or
            build upon the material, you must distribute your contributions
            under the same license.
          </li>
        </ul>

        <p>
          <Link href="/license">View full license details &rarr;</Link>
        </p>

        {/* ── How to Contribute ──────────────────────────────────────── */}
        <h2>How to Contribute</h2>
        <p>
          Contributions are welcome from educators, developers, and anyone
          interested in open educational infrastructure. Whether you want to
          fix a typo, suggest a new lab, or translate content into another
          language, there is a place for your work.
        </p>
        <p>
          The contribution process follows standard open-source conventions:
        </p>
        <ol>
          <li>
            Open the{" "}
            <a
              href={REPOSITORY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5"
            >
              <GitHubIcon className="h-4 w-4" title="" />
              Teaching Teachers repository
            </a>
            .
          </li>
          <li>Create a branch for your changes.</li>
          <li>Make your edits and test them locally.</li>
          <li>Submit a pull request with a clear description of what you changed and why.</li>
        </ol>
        <p>
          <Link href="/contribute">
            Read the full contribution guide &rarr;
          </Link>
        </p>

        {/* ── Repository ─────────────────────────────────────────────── */}
        <h2>Repository</h2>
        <p>
          The public repository lives at{" "}
          <a
            href={REPOSITORY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5"
          >
            <GitHubIcon className="h-4 w-4" title="" />
            Gh0stlyKn1ght/OpenTeachStack
          </a>
          .
        </p>
        <p>
          The repository includes the Next.js site source, all content files
          (in MDX format), Apps Script examples, templates, and project
          documentation.
        </p>

        {/* ── Attribution ────────────────────────────────────────────── */}
        <h2>Attribution Requirements</h2>
        <p>
          If you use or adapt content from Teaching Teachers, please include
          the following attribution:
        </p>
        <blockquote>
          <p>
            Based on{" "}
            <a
              href="https://teachingteachers.dev"
              target="_blank"
              rel="noopener noreferrer"
            >
              Teaching Teachers
            </a>{" "}
            by {AUTHOR.name}, licensed under{" "}
            <a
              href={LICENSE.content.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              {LICENSE.content.spdx}
            </a>
            .
          </p>
        </blockquote>
        <p>
          For code reuse, the MIT License requires only that you include the
          original copyright notice and license text in your distribution.
        </p>
      </div>
    </div>
  );
}

