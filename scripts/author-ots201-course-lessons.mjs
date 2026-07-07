import { existsSync, readFileSync, writeFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { assertCourseWriteAllowed } from "./lib/course-locks.mjs";
import matter from "gray-matter";

const args = process.argv.slice(2);
const force = args.includes("--force");
const dryRun = args.includes("--dry-run");

const root = process.cwd();
const courseSlug = "ots-201";
const courseRoot = join(root, "content", "courses", courseSlug);
const courseJsonPath = join(courseRoot, "course.json");

const chapterGuides = {
  "01-workspace-system-mindset": {
    focus:
      "making Drive, Docs, Sheets, Slides, Forms, and Calendar behave like one teaching system",
    decision:
      "how teachers define ownership, access, naming, maintenance, and handoff conventions before adding automation",
    risk:
      "teaching from tools only, without a recoverable operating model that a colleague can inspect.",
  },
  "02-drive-architecture": {
    focus:
      "reducing search friction and accidental sharing through folder and permission architecture",
    decision:
      "what belongs in shared, internal, archived, private, and operational paths",
    risk:
      "storing student-facing and internal materials in the same folder patterns without boundaries.",
  },
  "03-docs-slides-delivery": {
    focus:
      "turning lesson content into reusable, accessible, and delivery-safe templates",
    decision:
      "where to place instructions, timing, and outcomes so materials stay editable and teachable",
    risk:
      "shipping polished output that hides unclear steps, missing audience context, or inaccessible text.",
  },
  "04-sheets-curriculum-trackers": {
    focus:
      "building trackers that connect standards, lessons, resources, and evidence in one place",
    decision:
      "what counts as evidence and who updates each tracker row after teaching",
    risk:
      "creating a sheet that looks complete but cannot be trusted in real classroom planning.",
  },
  "05-forms-calendar-operations": {
    focus:
      "using Forms and Calendar for operational teaching routines without over-automation",
    decision:
      "which routines are repeated enough to formalize and what should remain manual",
    risk:
      "replacing teacher judgment with rigid routines that still expose private details or broken timing.",
  },
  "06-workspace-command-center": {
    focus:
      "assembling a resilient command center that can be reviewed, handed off, and revised safely",
    decision:
      "which components are essential in daily use versus maintenance-only experiments",
    risk:
      "creating a large command center artifact that breaks quickly because maintenance expectations are never written down.",
  },
};

const sourceRefs = [
  {
    label: "Google Workspace for Developers",
    url: "https://developers.google.com/workspace",
  },
  {
    label: "Drive API documentation",
    url: "https://developers.google.com/workspace/drive/api/guides/about-sdk",
  },
  {
    label: "Docs API documentation",
    url: "https://developers.google.com/workspace/docs/api/how-tos/overview",
  },
  {
    label: "Sheets API documentation",
    url: "https://developers.google.com/workspace/sheets/api/guides/concepts",
  },
  {
    label: "Forms API documentation",
    url: "https://developers.google.com/workspace/forms/api/guides",
  },
  {
    label: "Slides API documentation",
    url: "https://developers.google.com/workspace/slides/api/guides/overview",
  },
  {
    label: "Google Classroom documentation",
    url: "https://developers.google.com/workspace/classroom",
  },
];

const templateLinksByChapter = {
  "01-workspace-system-mindset": "/content/courses/ots-201/templates/workspace-command-center-scope-template.md",
  "02-drive-architecture": "/content/courses/ots-201/templates/drive-architecture-template.md",
  "03-docs-slides-delivery": "/content/courses/ots-201/templates/delivery-template-framework.md",
  "04-sheets-curriculum-trackers": "/content/courses/ots-201/templates/curriculum-tracker-template.md",
  "05-forms-calendar-operations": "/content/courses/ots-201/templates/forms-calendar-ops-template.md",
  "06-workspace-command-center": "/content/courses/ots-201/templates/command-center-review-template.md",
};

function sectionMode(type, artifact, chapterArtifact) {
  if (type === "overview") {
    return {
      action: "define the chapter artifact boundaries and delivery conditions",
      evidence: "a chapter orientation note",
      verify: "the chapter artifact will be reviewable before section work begins",
    };
  }
  if (type === "artifact" || type === "studio") {
    return {
      action: `build or revise the ${artifact ?? chapterArtifact}`,
      evidence: artifact ?? chapterArtifact,
      verify: "the artifact is small, usable, and readable to another teacher.",
    };
  }
  if (type === "checkpoint") {
    return {
      action: "review the chapter artifact and define one maintenance or safety adjustment",
      evidence: "a revision note",
      verify: "the maintenance note is specific and testable in one teaching cycle.",
    };
  }
  if (type === "workshop") {
    return {
      action: "run the workshop with one classroom-ready scenario",
      evidence: "a test output, screenshot, or decision note",
      verify: "the output includes a fallback or teacher-reviewed revision step.",
    };
  }
  return {
    action: "apply chapter concepts to one real teacher workflow",
    evidence: "a short practice decision note",
    verify: "the decision is grounded in accessibility, safety, and source checks.",
  };
}

function uniqueList(items) {
  return [...new Set(items.filter(Boolean))];
}

function bodyFor(chapter, section) {
  const guide = chapterGuides[chapter.slug] ?? {
    focus: "reliable teacher-owned Workspace organization and operating routines",
    decision: "how the section supports the chapter artifact",
    risk: "pushing structure changes without reviewability or maintenance conditions.",
  };
  const mode = sectionMode(section.type, section.artifact, chapter.buildArtifact);
  const artifact = section.artifact ?? chapter.buildArtifact;
  const templatePath = templateLinksByChapter[chapter.slug];

  const doThis = uniqueList([
    `Name the workspace friction this section helps a teacher resolve in ${section.title}.`,
    `Use this section to ${mode.action}.`,
    `Add a source note and mark the route decision as "review", "revise", or "hold".`,
    `Connect this section to your workspace context: a course, unit, template, or routine route.`,
    `Write the next review cue a colleague should use to follow the workspace decision.`,
  ]);

  const evidence = uniqueList([
    `${mode.evidence} exists for ${section.title}.`,
    `The work names the teacher decision and ties it to ${artifact}.`,
    `A revision or maintenance note explains what changes before release.`,
    `Any AI-assisted output is reviewed for accuracy, clarity, and appropriateness.`,
  ]);

  const check = uniqueList([
    "Do not include student-identifiable data, hidden credentials, private keys, API secrets, or account recovery details.",
    `Check for the chapter risk: ${guide.risk}.`,
    "Use an accessible format: headings, short paragraphs, list labels, and plain language.",
    `Verify the section can be repeated safely with ${artifact} without exposing private classroom details.`,
    `Use source-backed behavior references and keep links visible for review.`,
    mode.verify,
  ]);

  const sources = sourceRefs
    .slice(0, 4)
    .map((source, index) =>
      `- [Source ${index + 1}: ${source.label}](${source.url})`,
    )
    .join("\n");

  const templateCallout = templatePath
    ? `- Template artifact: [${artifact} template](${templatePath})`
    : null;

  return `# ${section.title}

## Core Idea

As part of your broader **workspace system**, ${chapter.title} is about ${guide.focus}. This lesson asks the teacher to turn **${section.title}** into a visible workspace decision, example, and review cue.

${chapter.title} should stay safe, repeatable, and handoff-ready. The goal is to make each workflow visible, maintainable, and privacy-aware before it becomes a habit.

## Do This

${doThis.map((item, index) => (section.lessonType === "artifact-build" || section.lessonType === "workflow") ? `${index + 1}. ${item}` : `- ${item}`).join("\n")}

## Evidence of Completion

${evidence.map((item) => `- ${item}`).join("\n")}

## Source and Template References

Use the Source Bank as the official citation backbone for Workspace decisions:

${sources}

${templateCallout || "- Template attachment is queued: one chapter template will be added next."}

Keep references and examples free of real student data or private account values.

## Verification Checks

${check.map((item) => `- ${item}`).join("\n")}

## Reflection

How does this section support a cleaner Workspace command path, and what would you change after one real use?
`;
}

const courseJson = JSON.parse(readFileSync(courseJsonPath, "utf8"));
const chapterMap = new Map(courseJson.chapters.map((chapter) => [chapter.slug, chapter]));
let updated = 0;
let skipped = 0;

for (const [chapterSlug, chapter] of chapterMap.entries()) {
  const chapterRoot = join(courseRoot, "lessons", chapterSlug);
  if (!existsSync(chapterRoot)) {
    throw new Error(`Missing OTS-201 chapter folder: ${chapterSlug}`);
  }

  const files = readdirSync(chapterRoot)
    .filter((name) => name.endsWith(".mdx"))
    .sort((a, b) => a.localeCompare(b));

  for (const fileName of files) {
    const filePath = join(chapterRoot, fileName);
    const parsed = matter(readFileSync(filePath, "utf8"));

    if (!force && parsed.data.migrationStatus !== "scaffolded") {
      skipped++;
      continue;
    }

    const section = {
      number: parsed.data.sectionNumber,
      title: parsed.data.title,
      type: parsed.data.type,
      lessonType: parsed.data.lessonType,
      artifact: parsed.data.artifact,
      duration: parsed.data.duration,
    };

    if (dryRun) {
      console.log(`[dry-run] WRITE: lessons/${chapterSlug}/${fileName}`);
      updated++;
      continue;
    }

    parsed.data.migrationStatus = "generated";
    parsed.content = bodyFor(chapter, section);
    assertCourseWriteAllowed(filePath, { operation: "write lesson body" });
    writeFileSync(filePath, matter.stringify(parsed.content, parsed.data));
    updated++;
  }
}

if (force || courseJson.migrationStatus !== "generated") {
  if (dryRun) {
    console.log("[dry-run] WRITE: course.json");
  } else {
    courseJson.migrationStatus = "generated";
    assertCourseWriteAllowed(courseJsonPath, { operation: "write course metadata" });
    writeFileSync(courseJsonPath, `${JSON.stringify(courseJson, null, 2)}\n`);
  }
}

const mode = dryRun ? "[DRY RUN] " : "";
console.log(`${mode}Generated OTS-201 section files: ${updated}; preserved ${skipped} existing generated files.${force ? " (--force)" : ""}`);
if (!dryRun && skipped > 0 && !force) {
  console.log(`${skipped} non-scaffolded files were preserved. Use --force to overwrite.`);
}
