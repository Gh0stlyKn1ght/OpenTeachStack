import type { Metadata } from "next";
import ArticleBody from "@/components/field-guide/ArticleBody";
import FieldGuidePage from "@/components/field-guide/FieldGuidePage";
import GitHubIcon from "@/components/GitHubIcon";
import PrintPageButton from "@/components/PrintPageButton";
import { AUTHOR, LICENSE, REPOSITORY_URL } from "@/lib/metadata";

export const metadata: Metadata = {
  title: "Contribute — OpenTeachStack",
  description:
    "How to contribute to OpenTeachStack: types of contributions, GitHub workflow, content guidelines, and code standards.",
};

export default function ContributePage() {
  return (
    <FieldGuidePage
      eyebrow="Project Commons"
      title="How to Contribute"
      subtitle="OpenTeachStack is a community project. Contributions from educators, developers, designers, and anyone passionate about open education are welcome and valued."
      breadcrumbs={[{ label: "Book", href: "/book" }]}
      meta={[
        { label: "Repository", value: "GitHub" },
        { label: "Code license", value: LICENSE.code.name },
        { label: "Content license", value: LICENSE.content.spdx },
      ]}
    >
      <ArticleBody>
        <div className="mt-6" data-print-hide>
          <PrintPageButton />
        </div>

      <div className="prose-academic">
        {/* ── Types of Contributions ─────────────────────────────────── */}
        <h2>Types of Contributions</h2>
        <p>
          Not all contributions involve writing code. Many of the most
          valuable improvements come from people who use the materials and
          notice what could be clearer, more accurate, or more useful.
        </p>

        <h3>Content contributions</h3>
        <ul>
          <li>
            <strong>Fix errors.</strong> Typos, broken links, factual
            inaccuracies, outdated instructions&mdash;if you spot a problem,
            you can fix it.
          </li>
          <li>
            <strong>Improve clarity.</strong> Rewrite a confusing
            explanation, add a missing step to a lab, or expand a section
            that assumes too much background knowledge.
          </li>
          <li>
            <strong>Write new content.</strong> Propose a new field note,
            case study, or lab exercise. The best contributions come from
            real classroom experience.
          </li>
          <li>
            <strong>Translate.</strong> Translate lessons, lab instructions,
            or templates into another language. Partial translations are
            welcome&mdash;even a single module helps reach new audiences.
          </li>
          <li>
            <strong>Add examples.</strong> Share an Apps Script that solved
            a problem in your classroom, a template you adapted, or a
            workflow you built using the course&rsquo;s methods.
          </li>
        </ul>

        <h3>Code contributions</h3>
        <ul>
          <li>
            <strong>Bug fixes.</strong> Fix rendering issues, broken
            functionality, or build errors in the Next.js application.
          </li>
          <li>
            <strong>New components.</strong> Build a new reusable component
            for the site (interactive quiz, progress tracker, etc.).
          </li>
          <li>
            <strong>Accessibility improvements.</strong> Improve keyboard
            navigation, screen reader support, color contrast, or semantic
            markup.
          </li>
          <li>
            <strong>Performance.</strong> Optimize images, reduce bundle
            size, or improve build times.
          </li>
        </ul>

        <h3>Community contributions</h3>
        <ul>
          <li>
            <strong>Report issues.</strong> Use the project issue tracker
            in the public repository.
          </li>
          <li>
            <strong>Review pull requests.</strong> Read through open PRs
            and leave constructive feedback.
          </li>
          <li>
            <strong>Share the project.</strong> Tell a colleague, post in a
            teaching community, or write about your experience using the
            course.
          </li>
        </ul>

        {/* ── GitHub Workflow ────────────────────────────────────────── */}
        <h2>How to Submit Changes</h2>
        <p>
          OpenTeachStack follows a standard open-source contribution
          workflow through the public repository. GitHub basics
          belong in the future OTS-240 Open Resources & GitHub for Educators
          course.
        </p>

        <h3>Step-by-step process</h3>
        <ol>
          <li>
            <strong>Fork the repository.</strong> Open{" "}
            <a
            href={REPOSITORY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5"
            >
              <GitHubIcon className="h-4 w-4" title="" />
              Gh0stlyKn1ght/OpenTeachStack
            </a>
            , then click the &ldquo;Fork&rdquo; button to create your own copy.
          </li>
          <li>
            <strong>Clone your fork locally.</strong> Use{" "}
            <code>git clone</code> to download your fork to your computer.
          </li>
          <li>
            <strong>Create a branch.</strong> Name your branch descriptively:
            <code>fix/broken-link-module-03</code>,{" "}
            <code>content/new-field-note-grading</code>, or{" "}
            <code>feat/quiz-component</code>.
          </li>
          <li>
            <strong>Make your changes.</strong> Edit files, add content, or
            fix code. Test locally to make sure everything works.
          </li>
          <li>
            <strong>Commit with a clear message.</strong> Describe what you
            changed and why. Use present tense:{" "}
            <code>Fix broken link in Module 03 resource list</code>.
          </li>
          <li>
            <strong>Push to your fork.</strong> Use <code>git push</code>{" "}
            to upload your branch to GitHub.
          </li>
          <li>
            <strong>Open a pull request.</strong> Go to the original
            repository on GitHub and click &ldquo;New pull request.&rdquo;
            Select your branch and write a description of your changes.
          </li>
        </ol>

        <p>
          Pull requests are reviewed by the project maintainer. You may be
          asked to make revisions before your changes are merged. This is
          normal and constructive&mdash;it ensures quality and consistency
          across the project.
        </p>

        {/* ── Content Guidelines ────────────────────────────────────── */}
        <h2>Content Guidelines</h2>
        <p>
          OpenTeachStack has a specific voice and structure. When writing
          or editing content, please follow these guidelines:
        </p>

        <h3>Tone and voice</h3>
        <ul>
          <li>
            <strong>Academic but accessible.</strong> Write clearly and
            precisely, but avoid jargon without explanation. Assume the
            reader is an intelligent adult who may not have a technical
            background.
          </li>
          <li>
            <strong>Practical over theoretical.</strong> Every concept
            should connect to a concrete classroom application. Abstract
            ideas need concrete examples.
          </li>
          <li>
            <strong>Direct.</strong> Use active voice. Say what you mean.
            Cut filler words.
          </li>
          <li>
            <strong>Respectful of the reader&rsquo;s time.</strong> If a
            section can be shorter without losing meaning, make it shorter.
          </li>
        </ul>

        <h3>Formatting</h3>
        <ul>
          <li>
            Content files are written in MDX (Markdown with JSX component
            support).
          </li>
          <li>
            Every content file requires frontmatter with{" "}
            <code>title</code>, <code>module</code>, <code>type</code>,{" "}
            <code>order</code>, <code>summary</code>, and{" "}
            <code>date</code> fields.
          </li>
          <li>
            Use sentence case for headings (capitalize only the first word
            and proper nouns).
          </li>
          <li>
            Use em dashes (&mdash;) without spaces. Use en dashes (&ndash;)
            for ranges.
          </li>
          <li>
            Wrap lines at a reasonable length. There is no strict character
            limit, but readability in a text editor matters.
          </li>
        </ul>

        <h3>Images and media</h3>
        <ul>
          <li>
            Optimize images before committing (compress PNGs, use
            appropriate dimensions).
          </li>
          <li>
            Always include descriptive alt text for accessibility.
          </li>
          <li>
            Place images in the <code>public/images/</code> directory,
            organized by module or content type.
          </li>
        </ul>

        {/* ── Code Guidelines ────────────────────────────────────────── */}
        <h2>Code Guidelines</h2>
        <p>
          The site is built with Next.js (App Router), TypeScript, and
          Tailwind CSS v4. When contributing code, please follow these
          standards:
        </p>

        <h3>General standards</h3>
        <ul>
          <li>
            <strong>TypeScript.</strong> All new components and utilities
            must be written in TypeScript with proper type annotations.
          </li>
          <li>
            <strong>Server Components by default.</strong> Use React Server
            Components unless client-side interactivity is required. Add
            the <code>&quot;use client&quot;</code> directive only when
            necessary.
          </li>
          <li>
            <strong>Semantic HTML.</strong> Use appropriate HTML elements
            (<code>&lt;article&gt;</code>, <code>&lt;section&gt;</code>,{" "}
            <code>&lt;nav&gt;</code>, <code>&lt;aside&gt;</code>) rather
            than generic <code>&lt;div&gt;</code> elements.
          </li>
          <li>
            <strong>Tailwind classes.</strong> Use the project&rsquo;s
            theme tokens (<code>bg-background</code>,{" "}
            <code>text-foreground</code>, <code>text-accent</code>,{" "}
            <code>border-border</code>, etc.) rather than arbitrary color
            values.
          </li>
          <li>
            <strong>Accessibility.</strong> Ensure proper focus management,
            aria attributes, and keyboard navigation for interactive
            components.
          </li>
        </ul>

        <h3>File organization</h3>
        <ul>
          <li>
            Components go in <code>src/components/</code>.
          </li>
          <li>
            Utility functions and constants go in <code>src/lib/</code>.
          </li>
          <li>
            Page routes follow Next.js App Router conventions in{" "}
            <code>src/app/</code>.
          </li>
          <li>
            Content files go in <code>content/</code>, organized by type
            (<code>lessons/</code>, <code>labs/</code>,{" "}
            <code>field-notes/</code>, etc.).
          </li>
        </ul>

        <h3>Commit messages</h3>
        <p>Use clear, descriptive commit messages. Examples:</p>
        <ul>
          <li>
            <code>Fix broken link in Module 03 resource list</code>
          </li>
          <li>
            <code>Add field note on spreadsheet data modeling</code>
          </li>
          <li>
            <code>Improve mobile layout for ModuleIndex component</code>
          </li>
          <li>
            <code>Update syllabus pacing guide for spring semester</code>
          </li>
        </ul>

        {/* ── Licensing of Contributions ─────────────────────────────── */}
        <h2>Licensing of Contributions</h2>
        <p>
          By submitting a contribution to OpenTeachStack, you agree that
          your work will be licensed under the project&rsquo;s existing
          licenses:
        </p>
        <ul>
          <li>
            Code contributions are licensed under the{" "}
            <a
              href={LICENSE.code.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              {LICENSE.code.name}
            </a>
            .
          </li>
          <li>
            Content contributions are licensed under{" "}
            <a
              href={LICENSE.content.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              {LICENSE.content.name}
            </a>
            .
          </li>
        </ul>
        <p>
          You retain copyright to your contributions but grant the project
          the right to distribute them under these licenses.
        </p>

        {/* ── Questions ──────────────────────────────────────────────── */}
        <h2>Questions</h2>
        <p>
          If you are unsure about how to contribute, what to work on, or
          whether an idea fits the project, open a{" "}
          <a
            href={`${REPOSITORY_URL}/issues`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5"
          >
            <GitHubIcon className="h-4 w-4" title="" />
            GitHub issue
          </a>{" "}
          or reach out to{" "}
          <a
            href={AUTHOR.linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            JC Nevarez on LinkedIn
          </a>
          . There are no bad questions.
        </p>
      </div>
      </ArticleBody>
    </FieldGuidePage>
  );
}


