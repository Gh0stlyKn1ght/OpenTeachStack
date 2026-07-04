import { readFileSync, readdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { assertCourseWriteAllowed } from "./lib/course-locks.mjs";

const root = process.cwd();
const force = process.argv.includes("--force");

if (!force) {
  console.error("This legacy multi-course rewrite script is disabled by default.");
  console.error("Run `node scripts/rewrite-remaining-course-lessons.mjs --force` only after reviewing the target diff plan.");
  process.exit(1);
}

const courseProfiles = {
  "ots-220": {
    frame: "Automation is ready",
    domain: "teacher automation with Google Apps Script and Workspace files",
    risk:
      "automating a process before the trigger, input, output, owner, permission boundary, and failure path are clear",
    example:
      "a teacher wants a script that creates unit folders, generates lesson Docs from Sheet rows, and sends reminder emails only after the teacher has reviewed the recipients",
    evidence:
      "script notes, sample Sheet rows, logs, permission notes, test records, and a rollback plan",
    material: "a spreadsheet row, folder ID, template Doc, script function, or email draft",
    review:
      "the script can be run on sample data, stopped safely, explained by another teacher, and repaired when an error appears",
  },
  "ots-240": {
    frame: "Open work needs",
    domain: "open curriculum publishing with GitHub, README files, licenses, attribution, and review routines",
    risk:
      "treating free-to-view material as automatically open, reusable, remixable, or safe to publish",
    example:
      "a teacher is preparing a curriculum repository with a README, source notes, a license file, contribution guidance, and a release checklist",
    evidence:
      "source notes, license decisions, README sections, review comments, attribution records, and release status",
    material: "a repository file, README section, issue, pull request, source note, or license entry",
    review:
      "a reviewer can see what may be reused, what must be credited, what changed, and how the repository will be maintained",
  },
  "ots-260": {
    frame: "Media belongs in a lesson",
    domain: "instructional media, AI image review, diagrams, slides, captions, transcripts, and accessibility checks",
    risk:
      "adding attractive media that distracts from the learning target, invents details, hides important information, or excludes students",
    example:
      "a teacher is building a media packet with one explanatory diagram, one delivery deck, one short video plan, and accessibility notes for each asset",
    evidence:
      "purpose notes, prompt logs, alt text, captions, transcripts, diagram labels, slide roles, and peer review notes",
    material: "an image, diagram, slide, short video, transcript, caption file, or media review row",
    review:
      "the media makes the lesson easier to understand and can be used by students who need text, audio, visual, or pacing support",
  },
  "ots-280": {
    frame: "Teacher safety work should reduce exposure",
    domain: "teacher digital safety, account hygiene, public profile review, connection safety, and incident response",
    risk:
      "turning safety into fear instead of reducing specific exposure with practical routines",
    example:
      "a teacher is auditing accounts, public profiles, device settings, repo exposure, website forms, and response steps without collecting private student information",
    evidence:
      "risk map rows, account inventory status, MFA notes, public profile findings, website checks, and response contacts",
    material: "an account, profile, device setting, website form, repository, domain record, or incident note",
    review:
      "the action lowers a named risk, avoids unnecessary data collection, and gives the teacher a calm next step",
  },
  "ots-301": {
    frame: "A course site is a maintained teaching surface",
    domain: "course websites, static hosting, course hub structure, accessibility, privacy, and maintenance",
    risk:
      "treating a live website as finished when links, privacy, accessibility, source notes, and update routines are still unclear",
    example:
      "a teacher is publishing a course hub with a homepage, course pages, resource pages, safety checks, release notes, and a maintenance calendar",
    evidence:
      "site plan rows, sitemap entries, link checks, privacy notes, accessibility fixes, release checklist items, and maintenance tasks",
    material: "a page, link, navigation item, resource entry, deployment target, or maintenance task",
    review:
      "students can find the current material, sensitive files are not public, links work, and the teacher knows when to update the site",
  },
  "ots-320": {
    frame: "An agent can draft changes",
    domain: "safe coding-agent workflows for small teacher tools, prompts, diffs, tests, and review evidence",
    risk:
      "letting an agent own the instructional decision, overwrite authored content, or treat a passing build as the only proof",
    example:
      "a teacher asks an agent to build a small classroom tool, reviews the diff, protects authored content, runs tests, and records what changed",
    evidence:
      "agent prompt, constraints, diff notes, test output, manual QA notes, accessibility checks, and revision decisions",
    material: "a prompt, branch, diff, component, test result, tool screen, or review log",
    review:
      "the teacher can explain the change, verify the behavior, reject unsafe edits, and preserve the learning goal",
  },
  "ots-399": {
    frame: "A capstone proves the system",
    domain: "capstone assembly across curriculum, automation, publishing, safety, peer review, and final release",
    risk:
      "calling the capstone finished because files exist even though reviewers cannot trace the decisions",
    example:
      "a teacher assembles a published curriculum system with linked artifacts, technical evidence, safety review, presentation notes, peer feedback, and maintenance plans",
    evidence:
      "proposal rows, system map links, technical evidence, source and license review, peer review notes, release checklist items, and revision logs",
    material: "a capstone artifact, system link, evidence entry, safety review item, presentation slide, or release checklist row",
    review:
      "a reviewer can trace the teaching need, inspect each artifact, see the safety checks, and understand how the system will be maintained",
  },
};

const courseRoots = Object.keys(courseProfiles);

function splitFrontmatter(source) {
  const match = source.match(/^---\r?\n[\s\S]*?\r?\n---\r?\n?/);
  if (!match) throw new Error("Missing frontmatter");
  return match[0].trimEnd();
}

function readFrontmatter(source) {
  const match = source.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!match) throw new Error("Missing frontmatter");

  const data = {};
  for (const line of match[1].split(/\r?\n/)) {
    const found = line.match(/^([^:]+):\s*(.*)$/);
    if (!found) continue;
    data[found[1]] = found[2].replace(/^['"]|['"]$/g, "");
  }
  return data;
}

function lessonKind(type, title) {
  if (type === "overview" || title === "Chapter Plan") return "plan";
  if (type === "checkpoint" || title === "Checkpoint Review") return "checkpoint";
  if (type === "artifact" || type === "studio") return "artifact";
  if (type === "workshop" || /^Workshop:/.test(title)) return "workshop";
  return "section";
}

function words(value) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .split(/\s+/)
    .filter((word) => word.length > 2)
    .filter(
      (word) =>
        !new Set([
          "and",
          "the",
          "for",
          "with",
          "from",
          "into",
          "review",
          "chapter",
          "plan",
          "checkpoint",
          "workshop",
        ]).has(word),
    );
}

function phrase(value, fallback) {
  if (/what to do if something happens/i.test(value)) return "incident response";
  if (/chapter plan/i.test(value)) return "chapter planning decisions";
  if (/checkpoint review/i.test(value)) return "checkpoint review decisions";
  const selected = words(value);
  if (selected.length === 0) return fallback;
  return selected.join(" ");
}

function specificLessonDetails(metadata, profile, kind) {
  const titlePhrase = phrase(metadata.title, "course task");
  const chapterPhrase = phrase(metadata.chapter, "course chapter");
  const artifactPhrase = phrase(metadata.artifact, "course artifact");
  const section = metadata.sectionNumber || "this section";

  const kindLine = {
    plan: `Because this is the opening plan for ${chapterPhrase}, the teacher names the sequence before creating files or artifacts. The plan separates what will be learned, what will be built, and what evidence will prove that the build is ready.`,
    checkpoint: `Because this is the checkpoint for ${chapterPhrase}, the teacher reviews the artifact as a working system. The checkpoint looks for missing decisions, unclear ownership, weak evidence, and maintenance steps that would be forgotten during a busy week.`,
    artifact: `Because this is an artifact lesson, the teacher turns ${artifactPhrase} into something another educator can use. The artifact needs labels, examples, status, review notes, and a next action instead of a vague promise to improve later.`,
    workshop: `Because this is a workshop, the teacher works with a safe sample before touching live students, public files, or active course systems. The workshop records setup, result, error, revision, and the decision that follows.`,
    section: `Because this is a focused section, the teacher isolates the ${titlePhrase} decision from the rest of the course. The lesson asks what this idea changes, where it appears, and how the teacher will know it worked.`,
  }[kind];

  return {
    titlePhrase,
    chapterPhrase,
    artifactPhrase,
    kindLine,
    firstMove: `In ${section}, focus on ${titlePhrase}. Choose one concrete classroom material or teacher decision from this list: ${profile.material}. Connect it to ${artifactPhrase}, then decide whether it needs to be created, revised, tested, credited, restricted, published, or archived.`,
    secondMove: `Connect ${titlePhrase} back to ${chapterPhrase}. That connection matters because a polished artifact can still fail if the lesson purpose, boundary, evidence, and maintenance routine are not visible.`,
    reviewPrompt: `A reviewer should be able to find the ${titlePhrase} decision, inspect the ${artifactPhrase} evidence, and understand how it supports ${chapterPhrase}.`,
  };
}

function titleSpecificMove(title, kind, artifact, profile) {
  const normalized = title.toLowerCase();

  if (kind === "plan") {
    return `Map the chapter before building. Choose one classroom material or teacher decision from this list: ${profile.material}. Then name the classroom purpose it serves and the evidence that will show whether the work is ready.`;
  }

  if (kind === "checkpoint") {
    return `Run a checkpoint on the **${artifact}**. Mark what is ready, what needs revision, what is blocked, and what evidence supports that decision.`;
  }

  if (kind === "artifact") {
    return `Build the **${artifact}** as a usable artifact, not just a note. The finished version shows the decision, the classroom context, the evidence, and the next maintenance step.`;
  }

  if (kind === "workshop") {
    return `Complete the workshop with sample or low-risk material first. Record the setup, result, error or review note, and what changed before using it with a live class.`;
  }

  if (/permission|privacy|student|safety|mfa|phishing|exposure|secrets|license|accessibility|bias|authorization/.test(normalized)) {
    return `Treat this as a boundary lesson. Name what should be shared, what should stay private, what must be checked, and who is responsible for the final decision.`;
  }

  if (/readme|documentation|source|attribution|review|peer|revision|maintenance/.test(normalized)) {
    return `Make the decision readable to someone else. The artifact explains the purpose, the source of truth, the review routine, and how future revisions will be recorded.`;
  }

  if (/script|automation|function|logs|errors|branch|diff|test|tool/.test(normalized)) {
    return `Keep the technical move small enough to verify. Record the input, expected output, test case, observed result, and what the teacher should do if it fails.`;
  }

  if (/slide|media|image|diagram|video|caption|transcript/.test(normalized)) {
    return `Connect the media choice to the learning task. Record what the asset explains, how students will use it, and what accessibility support it needs.`;
  }

  return `Turn the lesson idea into an inspectable decision. Name the classroom use, the evidence, the review step, and the next revision trigger.`;
}

function bodyFor(profile, metadata) {
  const title = metadata.title;
  const chapter = metadata.chapter;
  const artifact = metadata.artifact;
  const type = metadata.type;
  const kind = lessonKind(type, title);
  const move = titleSpecificMove(title, kind, artifact, profile);
  const details = specificLessonDetails(metadata, profile, kind);

  const actionHeading =
    kind === "plan"
      ? "Plan The Work"
      : kind === "checkpoint"
        ? "Review The Work"
        : kind === "artifact"
          ? "Build The Work"
          : kind === "workshop"
            ? "Workshop Task"
            : "Practice The Decision";

  const readinessLabel =
    kind === "checkpoint"
      ? "Checkpoint status"
      : kind === "workshop"
        ? "Workshop evidence"
        : kind === "artifact"
          ? "Artifact status"
          : "Lesson evidence";

  return `# ${title}

## Why This Matters

${profile.frame} when a teacher can point to the decision, the classroom use, the evidence, and the next review step.

In **${chapter}**, the work sits inside ${profile.domain}. The risk is ${profile.risk}. This lesson narrows that risk into one visible update to **${artifact}**.

## Core Idea

${move}

The goal is not to make a perfect document in one pass. The goal is to make the teacher decision clear enough that another educator can inspect it, reuse it, or challenge it without needing a private explanation.

## Lesson Focus

${details.kindLine}

${details.firstMove}

${details.secondMove}

## Classroom Example

Use this working situation: ${profile.example}.

For **${title}**, choose one concrete classroom material or teacher decision from this list: ${profile.material}. Keep the example small enough to review during the lesson and focused on ${details.titlePhrase}.

Example entry:

| Decision | Classroom version |
| --- | --- |
| Teaching purpose | This work supports ${details.titlePhrase} inside ${details.chapterPhrase}. |
| Evidence | The teacher can point to ${profile.evidence}. |
| Boundary | The teacher names what ${details.titlePhrase} may change and what must stay protected or reviewed. |
| Maintenance | The next update is triggered by a date, failed check, student confusion, changed source, or ${details.artifactPhrase} review. |

## ${actionHeading}

Update the **${artifact}** with one row or section for **${title}**.

| Field | Your note |
| --- | --- |
| Lesson focus | ${details.titlePhrase} |
| Classroom context | Where ${details.chapterPhrase} appears in your course, unit, tool, site, media packet, safety routine, or capstone |
| Working material | Classroom material or teacher decision: ${profile.material} |
| Teacher decision | What ${details.titlePhrase} causes you to keep, revise, test, publish, restrict, or remove |
| ${readinessLabel} | What proves ${details.artifactPhrase} is ready or what blocks it |
| Maintenance trigger | When the ${details.titlePhrase} decision should be checked again |

## Quality Check

Before moving on, test the work against this standard: ${profile.review}.

${details.reviewPrompt}

If the work only names a tool or a file, revise it. The artifact needs to show the teaching purpose, evidence, boundary, and maintenance routine.

## Reflection

What would another teacher need to know before trusting this part of the work? Add that missing context to the artifact before you continue.
`;
}

function walk(directory) {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const fullPath = join(directory, entry.name);
    if (entry.isDirectory()) return walk(fullPath);
    if (entry.isFile() && entry.name.endsWith(".mdx")) return [fullPath];
    return [];
  });
}

let count = 0;

for (const courseSlug of courseRoots) {
  const profile = courseProfiles[courseSlug];
  const lessonsRoot = join(root, "content", "courses", courseSlug, "lessons");
  for (const filePath of walk(lessonsRoot)) {
    const source = readFileSync(filePath, "utf8");
    const frontmatter = splitFrontmatter(source);
    const metadata = readFrontmatter(source);
    assertCourseWriteAllowed(filePath, { operation: "write legacy lesson rewrite" });
    writeFileSync(filePath, `${frontmatter}\n${bodyFor(profile, metadata)}`, "utf8");
    count += 1;
  }
}

console.log(`Rewrote ${count} lessons across remaining OTS courses.`);
