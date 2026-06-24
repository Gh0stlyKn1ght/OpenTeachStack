import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import matter from "gray-matter";

const args = process.argv.slice(2);
const force = args.includes("--force");
const dryRun = args.includes("--dry-run");

const root = process.cwd();
const courseSlug = "ots-101";
const courseRoot = join(root, "content", "courses", courseSlug);

function read(relativePath) {
  return readFileSync(join(root, relativePath), "utf8");
}

function getQuotedStrings(value) {
  return [...value.matchAll(/"([^"]*)"/g)].map((match) => match[1]);
}

function parseSectionBlocks(source, exportName) {
  const start = source.indexOf(`export const ${exportName}`);
  if (start === -1) return new Map();

  const nextExport = source.indexOf("\nexport ", start + 1);
  const chunk = source.slice(start, nextExport === -1 ? source.length : nextExport);
  const blocks = new Map();
  const blockRegex = /"?([a-z0-9-]+)"?:\s*\[([\s\S]*?)\n\s*\],/g;

  for (const block of chunk.matchAll(blockRegex)) {
    const chapterId = block[1];
    const body = block[2];
    const sections = [];

    for (const line of body.split(/\r?\n/)) {
      if (!line.includes("number:")) continue;
      const values = getQuotedStrings(line);
      if (values.length < 4) continue;
      sections.push({
        number: values[0],
        title: values[1],
        type: values[2],
        duration: values[3],
        artifact: values[4],
      });
    }

    blocks.set(chapterId, sections);
  }

  return blocks;
}

function parseRelatedLessons(source) {
  const related = new Map();
  const start = source.indexOf("export const SECTION_RELATED_LESSONS");
  if (start === -1) return related;

  const end = source.indexOf("};", start);
  const chunk = source.slice(start, end);
  const entryRegex = /"([^"]+)":\s*"([^"]+)"/g;

  for (const match of chunk.matchAll(entryRegex)) {
    related.set(match[1], match[2]);
  }

  return related;
}

function parseModules() {
  const metadata = read("src/lib/metadata.ts");
  const book = read("src/lib/book.ts");
  const sectionBlocks = parseSectionBlocks(book, "CHAPTER_SECTIONS");
  const relatedLessons = parseRelatedLessons(book);
  const modules = [];
  const moduleRegex = /\{\s*id:\s*"([^"]+)",\s*number:\s*"([^"]+)",\s*title:\s*"([^"]+)",[\s\S]*?slug:\s*"([^"]+)",[\s\S]*?buildArtifact:\s*"([^"]+)"/g;

  for (const match of metadata.matchAll(moduleRegex)) {
    const [, id, number, title, slug, buildArtifact] = match;
    modules.push({
      id,
      number,
      title,
      slug,
      buildArtifact,
      sections: (sectionBlocks.get(id) ?? []).map((section) => ({
        ...section,
        sourceLessonSlug: relatedLessons.get(section.number),
      })),
    });
  }

  return modules;
}

function sectionSlug(number) {
  return number.replace(".", "-");
}

function lessonTitle(slug) {
  if (!slug) return "";
  const filePath = join(root, "content", "lessons", `${slug}.mdx`);
  if (!existsSync(filePath)) return "";
  const parsed = matter(readFileSync(filePath, "utf8"));
  return parsed.data.title ?? "";
}

function uniqueList(items) {
  return [...new Set(items.filter(Boolean))];
}

const chapterGuides = {
  "01-teacher-builder-mindset": {
    focus:
      "teacher-owned systems, repeatable workflows, and small habits that keep curriculum work from scattering across tools",
    decision:
      "what should become a reusable system instead of another one-off task",
    risk:
      "saving drafts, prompts, sources, and final materials in places that future-you cannot audit",
  },
  "02-prompting": {
    focus:
      "prompt structure, teacher voice, task constraints, and revision routines for useful AI-assisted drafting",
    decision:
      "what the prompt must specify before an AI draft is worth reviewing",
    risk:
      "accepting fluent output before the teacher has defined audience, source, format, and quality criteria",
  },
  "03-ai-literacy-verification": {
    focus:
      "verification habits that separate AI fluency from teacher judgment, source trust, and classroom readiness",
    decision:
      "what needs a source check, privacy check, bias check, or teacher rewrite",
    risk:
      "letting confident generated language replace accountable instructional decisions",
  },
  "04-standards-to-learning-targets": {
    focus:
      "turning standards into teachable targets, evidence, assessments, and student-facing language",
    decision:
      "what students must know, do, produce, or explain for the standard to become teachable",
    risk:
      "claiming alignment because a standard was pasted into a lesson plan",
  },
  "05-course-and-unit-architecture": {
    focus:
      "building coherent units where lessons, activities, assessments, and revision notes support one another",
    decision:
      "what belongs in the unit sequence and what should stay optional, archived, or outside the scope",
    risk:
      "collecting activities without a visible learning path",
  },
  "06-resource-discovery-open-resources": {
    focus:
      "finding, evaluating, citing, licensing, and organizing open or free resources for classroom use",
    decision:
      "which resources are trustworthy, allowed, accessible, and worth saving",
    risk:
      "using convenient links without checking credibility, license, terms, or classroom fit",
  },
  "07-google-workspace-planning-systems": {
    focus:
      "turning Drive, Docs, Sheets, Forms, and Slides into a planned workspace rather than scattered files",
    decision:
      "where each planning, teaching, assessment, and revision artifact should live",
    risk:
      "letting file sprawl make curriculum impossible to maintain or hand off",
  },
  "08-assessment-rubrics-feedback": {
    focus:
      "connecting assessment evidence, rubric criteria, feedback, and revision opportunities to the learning target",
    decision:
      "what evidence proves learning and what feedback would help a student improve",
    risk:
      "grading completion instead of observing the skill the lesson intended to build",
  },
  "09-delivery-planning": {
    focus:
      "making lessons teachable through clear directions, pacing, materials, backups, and student-facing access",
    decision:
      "what students need to see, do, submit, or revisit during the actual class period",
    risk:
      "having strong curriculum that falls apart during delivery because the operational details are missing",
  },
  "10-mini-unit-capstone": {
    focus:
      "assembling a source-aware, teachable, accessible, and reviewable mini-unit with revision evidence",
    decision:
      "what belongs in the final packet and what evidence proves it is ready to teach",
    risk:
      "submitting a polished bundle without source notes, privacy checks, assessment alignment, or maintenance plans",
  },
};

function sectionMode(section) {
  if (section.type === "overview") {
    return {
      action: "preview the chapter path",
      evidence: "a chapter orientation note",
      verify: "the artifact and safety checks are clear before build work begins",
    };
  }
  if (section.type === "artifact" || section.type === "studio") {
    return {
      action: "build or revise the chapter artifact",
      evidence: section.artifact ?? "a working artifact",
      verify: "the artifact can be inspected, reused, and improved after teaching",
    };
  }
  if (section.type === "checkpoint") {
    return {
      action: "pause and review the chapter artifact",
      evidence: "a checkpoint note with at least one revision decision",
      verify: "the revision decision is specific enough to act on",
    };
  }
  if (section.type === "workshop") {
    return {
      action: "run the workflow once with a real classroom need",
      evidence: section.artifact ?? "a workshop output",
      verify: "the output has been checked before reuse",
    };
  }
  return {
    action: "apply the idea to a real class, unit, lesson, resource, or workflow",
    evidence: "a short note, checklist, draft, map, or decision record",
    verify: "the decision is grounded in teacher judgment rather than generated filler",
  };
}

function bodyFor(chapter, section) {
  const guide = chapterGuides[chapter.slug] ?? {
    focus: "teacher-owned curriculum systems",
    decision: "what decision this section asks the teacher to make",
    risk: "moving forward without review evidence",
  };
  const mode = sectionMode(section);
  const relatedTitle = lessonTitle(section.sourceLessonSlug);
  const artifact = section.artifact ?? chapter.buildArtifact;
  const relatedLine = section.sourceLessonSlug
    ? `This section can borrow context from the standalone lesson "${relatedTitle || section.sourceLessonSlug}", but it keeps its own course-book task so adjacent sections do not repeat the same lesson body.`
    : "This section stands on its own inside the OTS-101 course book and does not depend on a reused standalone lesson body.";

  const doThis = uniqueList([
    `Name the immediate teacher problem connected to ${section.title}.`,
    `Use this section to ${mode.action}.`,
    `Connect the work to one real classroom context: a course, unit, lesson, assessment, resource, or delivery routine.`,
    `Record the decision you made about ${guide.decision}.`,
    section.type === "overview"
      ? `Preview the ${chapter.buildArtifact} and identify what evidence the chapter will need.`
      : `Save the result where it can support the chapter artifact: ${chapter.buildArtifact}.`,
  ]);

  const evidence = uniqueList([
    `${mode.evidence} exists for ${section.title}.`,
    `The work names the classroom context and the teacher decision it supports.`,
    `The evidence connects to ${artifact}.`,
    "Any AI-assisted language has been reviewed, revised, or rejected by the teacher.",
    "A short revision note explains what should change before reuse.",
  ]);

  const verification = uniqueList([
    "Do not include student-identifiable information, private account details, hidden assessment keys, or private school files.",
    `Check for the chapter risk: ${guide.risk}.`,
    mode.verify,
    "Use official sources or local policy when software behavior, licensing, safety, or standards interpretation matters.",
    "Keep the artifact small enough that another teacher could review it without hidden context.",
  ]);

  return `# ${section.title}

## Core Idea

${chapter.title} is about ${guide.focus}. In this section, **${section.title}** turns that larger chapter focus into one concrete teacher move.

${relatedLine}

The work here should help the teacher decide ${guide.decision}. It should also leave behind evidence that can be reused in the chapter artifact: **${chapter.buildArtifact}**.

## Do This

${doThis.map((item) => `- ${item}`).join("\n")}

## Evidence of Completion

${evidence.map((item) => `- ${item}`).join("\n")}

## Verification Check

${verification.map((item) => `- ${item}`).join("\n")}

## Reflection Prompt

What did this section make clearer about ${chapter.title}, and what would you revise before using the result with students or sharing it with another teacher?
`;
}

const modules = parseModules();
let updated = 0;
let skipped = 0;

for (const chapter of modules) {
  for (const section of chapter.sections) {
    const slug = sectionSlug(section.number);
    const relativePath = join("lessons", chapter.slug, `${slug}.mdx`);
    const filePath = join(courseRoot, relativePath);
    if (!existsSync(filePath)) {
      throw new Error(`Missing OTS-101 course lesson file: ${relativePath}`);
    }

    const raw = readFileSync(filePath, "utf8");
    const parsed = matter(raw);
    if (!force && parsed.data.migrationStatus !== "scaffolded") {
      skipped++;
      continue;
    }

    if (dryRun) {
      console.log(`[dry-run] WRITE: ${relativePath}`);
      updated++;
      continue;
    }

    parsed.data.migrationStatus = "generated";
    parsed.content = bodyFor(chapter, section);
    writeFileSync(filePath, matter.stringify(parsed.content, parsed.data));
    updated++;
  }
}

const courseJsonPath = join(courseRoot, "course.json");
const courseJson = JSON.parse(readFileSync(courseJsonPath, "utf8"));
if (force || courseJson.migrationStatus !== "generated") {
  if (dryRun) {
    console.log(`[dry-run] WRITE: course.json`);
  } else {
    courseJson.migrationStatus = "generated";
    writeFileSync(courseJsonPath, `${JSON.stringify(courseJson, null, 2)}\n`);
  }
}

const mode = dryRun ? "[DRY RUN] " : "";
console.log(`${mode}Generated ${updated} OTS-101 section files; preserved ${skipped} existing generated files.${force ? " (--force)" : ""}`);
if (!dryRun && skipped > 0 && !force) {
  console.log(`${skipped} non-generated or non-scaffolded files were preserved. Use --force to overwrite.`);
}

