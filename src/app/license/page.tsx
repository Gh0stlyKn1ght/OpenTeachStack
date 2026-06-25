import type { Metadata } from "next";
import ArticleBody from "@/components/field-guide/ArticleBody";
import FieldGuidePage from "@/components/field-guide/FieldGuidePage";
import GitHubIcon from "@/components/GitHubIcon";
import { AUTHOR, LICENSE, REPOSITORY_URL } from "@/lib/metadata";

export const metadata: Metadata = {
  title: "License — OpenTeachStack",
  description:
    "License details for OpenTeachStack: MIT for code, CC BY-NC-SA 4.0 for content.",
};

export default function LicensePage() {
  return (
    <FieldGuidePage
      eyebrow="Project Terms"
      title="License"
      subtitle="OpenTeachStack uses a dual-license model. Code and content are licensed separately to allow maximum flexibility for both developers and educators."
      breadcrumbs={[{ label: "Book", href: "/book" }]}
      meta={[
        { label: "Code", value: LICENSE.code.name },
        { label: "Content", value: LICENSE.content.spdx },
        { label: "Maintainer", value: AUTHOR.name },
      ]}
    >
      <ArticleBody>
      <div className="prose-academic">
        {/* ── Code License ───────────────────────────────────────────── */}
        <h2>Code: {LICENSE.code.name}</h2>
        <p>
          All source code in this project&mdash;including the Next.js
          application, Google Apps Script examples, build scripts, and
          configuration files&mdash;is released under the{" "}
          <a href={LICENSE.code.url} target="_blank" rel="noopener noreferrer">
            {LICENSE.code.name}
          </a>
          .
        </p>

        <div className="bg-surface border border-border rounded-sm p-5 my-6 font-mono text-xs leading-relaxed text-foreground/70">
          <p className="mb-4">
            MIT License
          </p>
          <p className="mb-4">
            Copyright (c) {new Date().getFullYear()} {AUTHOR.name}
          </p>
          <p className="mb-4">
            Permission is hereby granted, free of charge, to any person
            obtaining a copy of this software and associated documentation
            files (the &ldquo;Software&rdquo;), to deal in the Software
            without restriction, including without limitation the rights to
            use, copy, modify, merge, publish, distribute, sublicense,
            and/or sell copies of the Software, and to permit persons to
            whom the Software is furnished to do so, subject to the
            following conditions:
          </p>
          <p className="mb-4">
            The above copyright notice and this permission notice shall be
            included in all copies or substantial portions of the Software.
          </p>
          <p>
            THE SOFTWARE IS PROVIDED &ldquo;AS IS&rdquo;, WITHOUT WARRANTY
            OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO
            THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR
            PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
            COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
            LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE,
            ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
            USE OR OTHER DEALINGS IN THE SOFTWARE.
          </p>
        </div>

        {/* ── Content License ────────────────────────────────────────── */}
        <h2>Content: {LICENSE.content.spdx}</h2>
        <p>
          All written content&mdash;including lessons, field notes, lab
          instructions, templates, the syllabus, and supporting
          materials&mdash;is licensed under the{" "}
          <a
            href={LICENSE.content.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            {LICENSE.content.name}
          </a>
          .
        </p>

        <h3>You are free to:</h3>
        <ul>
          <li>
            <strong>Share</strong> &mdash; Copy and redistribute the
            material in any medium or format.
          </li>
          <li>
            <strong>Adapt</strong> &mdash; Remix, transform, and build upon
            the material.
          </li>
        </ul>

        <h3>Under the following terms:</h3>
        <ul>
          <li>
            <strong>Attribution (BY)</strong> &mdash; You must give
            appropriate credit, provide a link to the license, and indicate
            if changes were made. You may do so in any reasonable manner,
            but not in any way that suggests the licensor endorses you or
            your use.
          </li>
          <li>
            <strong>NonCommercial (NC)</strong> &mdash; You may not use the
            material for commercial purposes. Educational use in schools,
            universities, and non-profit organizations is explicitly
            permitted.
          </li>
          <li>
            <strong>ShareAlike (SA)</strong> &mdash; If you remix,
            transform, or build upon the material, you must distribute your
            contributions under the same license as the original.
          </li>
        </ul>

        <p>
          <strong>No additional restrictions</strong> &mdash; You may not
          apply legal terms or technological measures that legally restrict
          others from doing anything the license permits.
        </p>

        <p>
          For the full legal text of the CC BY-NC-SA 4.0 license, visit:{" "}
          <a
            href={LICENSE.content.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            {LICENSE.content.url}
          </a>
        </p>

        {/* ── How to Attribute ───────────────────────────────────────── */}
        <h2>How to Attribute</h2>
        <p>
          When using or adapting content from OpenTeachStack, please
          include an attribution similar to the following:
        </p>

        <blockquote>
          <p>
            Based on{" "}
            <a
              href="https://openteachstack.dev"
              target="_blank"
              rel="noopener noreferrer"
            >
              OpenTeachStack
            </a>{" "}
            by {AUTHOR.name}, licensed under{" "}
            <a
              href={LICENSE.content.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              CC BY-NC-SA 4.0
            </a>
            . Changes were made to [describe changes].
          </p>
        </blockquote>

        <p>For code reuse under the MIT License, include the copyright notice and the full license text (above) in your project.</p>

        <h3>Attribution in different formats</h3>
        <ul>
          <li>
            <strong>In a document or slide deck:</strong> Include the
            attribution text on a credits page, in a footnote, or in the
            document&rsquo;s metadata.
          </li>
          <li>
            <strong>On a website:</strong> Include the attribution in a
            visible footer, credits page, or colophon. Link to the original
            project and the license.
          </li>
          <li>
            <strong>In a code repository:</strong> Include the MIT License
            text in a LICENSE file and the CC BY-NC-SA 4.0 notice in a
            NOTICE or README file.
          </li>
        </ul>

        {/* ── What This Means in Practice ────────────────────────────── */}
        <h2>What This Means in Practice</h2>

        <h3>You can:</h3>
        <ul>
          <li>
            Use any lesson, lab, or template in your own classroom or
            school.
          </li>
          <li>
            Modify and adapt materials to fit your subject area, grade
            level, or teaching context.
          </li>
          <li>
            Share your adapted materials with colleagues under the same
            license.
          </li>
          <li>
            Fork the code repository and build your own version of the
            course site from{" "}
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
          </li>
          <li>
            Use the Apps Script examples in your own Google Workspace
            projects.
          </li>
        </ul>

        <h3>You cannot:</h3>
        <ul>
          <li>
            Sell OpenTeachStack content or derivatives commercially (e.g.,
            as a paid course on a marketplace).
          </li>
          <li>
            Remove attribution or claim the original content as your own
            work.
          </li>
          <li>
            Apply additional restrictions that would prevent others from
            exercising the rights granted by these licenses.
          </li>
        </ul>

        {/* ── Questions ──────────────────────────────────────────────── */}
        <h2>Questions</h2>
        <p>
          If you have questions about licensing, attribution, or permitted
          use, please contact{" "}
          <a
            href={AUTHOR.linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            JC Nevarez on LinkedIn
          </a>
          .
        </p>
      </div>
      </ArticleBody>
    </FieldGuidePage>
  );
}


