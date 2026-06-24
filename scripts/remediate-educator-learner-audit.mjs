import { existsSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join, relative } from "node:path";
import matter from "gray-matter";
import {
  findGenericAuthoringFragments,
  GENERATED_STATUSES,
} from "./lib/content-fingerprints.mjs";

const root = process.cwd();
const coursesRoot = join(root, "content", "courses");
const allTargets = process.argv.includes("--all-targets");

const profiles = {
  "ots-101": {
    learner: "a middle school robotics or technology teacher building a first reusable mini-unit",
    pressure: "the teacher has good ideas, but prompts, sources, lesson notes, assessments, and delivery files are scattered across tabs and old Drive folders",
    artifactExample:
      "Robotics sensor mini-unit packet with one standard, two source links, a revised AI draft, a short rubric, and a delivery plan",
    example:
      "A teacher wants students to explain how an ultrasonic sensor estimates distance. The first draft is a pile of links and copied activities. The stronger version names the learning target, saves two trusted sources, drafts one prompt, checks the AI output, writes student directions, and records what changed after review.",
    mistake:
      "Treating a polished lesson paragraph as proof that the system works. A usable curriculum system also needs sources, checks, naming, storage, assessment evidence, and a revision trail.",
    sourceNeed: "standards, official documentation, licensing notes, and school privacy rules",
  },
  "ots-201": {
    learner: "a teacher team trying to make Google Workspace reliable enough for weekly planning",
    pressure: "the team has Drive folders, Docs, Slides, Forms, Sheets, and Calendar events, but the route through them lives in memory",
    artifactExample:
      "Course command center with a folder map, naming convention, current unit links, tracker columns, Forms response location, and maintenance owner",
    example:
      "A ninth grade technology team keeps copying slide decks from last year. In the improved system, current decks live in a unit folder, drafts have dates, Forms responses feed one tracker, and a command center links the current materials plus archive rules.",
    mistake:
      "Adding one more folder or spreadsheet without deciding who owns it, when it is updated, and how old versions leave the active workspace.",
    sourceNeed: "Google Workspace help pages, local sharing policy, accessibility checks, and file ownership decisions",
  },
  "ots-220": {
    learner: "a teacher who can follow small scripts but needs safe habits before automating classroom work",
    pressure: "the teacher repeats file, folder, quiz, and reminder tasks, but a bad automation could duplicate files, email the wrong people, or expose private data",
    artifactExample:
      "Teacher automation toolkit with one custom menu, one fake-data folder generator, one document generator, a test log, and a rollback note",
    example:
      "Instead of running a script on live grade data, the teacher tests with a fake sheet containing Unit 03, Sample Student A, and two dummy assignments. The first test creates folders in a sandbox Drive folder and records what happened before any real workflow is touched.",
    mistake:
      "Automating a confusing process because it is annoying. Automation should come after the teacher can describe the trigger, input, output, owner, and failure path.",
    sourceNeed: "official Apps Script documentation, Google Workspace limits, local email policy, and fake-data testing notes",
  },
  "ots-240": {
    learner: "an educator publishing or adapting classroom resources without accidentally misusing licenses or hiding maintenance decisions",
    pressure: "the teacher wants to share useful work, but GitHub vocabulary, README expectations, and open licensing rules are unfamiliar",
    artifactExample:
      "Open curriculum repository with README, source notes, license decision, contribution note, and release checklist",
    example:
      "A teacher wants to share a cybersecurity vocabulary handout. The safe version includes a README, source list, license note, revision history, and a clear line explaining which images or third-party resources are not included for reuse.",
    mistake:
      "Assuming that free-to-view means free-to-copy, or that a public repository automatically explains how another teacher should use the resource.",
    sourceNeed: "Creative Commons license terms, GitHub documentation, source citations, and school publishing boundaries",
  },
  "ots-280": {
    learner: "a classroom educator reducing personal and classroom-facing digital risk without becoming a security professional",
    pressure: "the teacher has public profiles, school accounts, shared documents, and communication channels that may expose more than intended",
    artifactExample:
      "Private safety packet with a personal risk map, MFA checklist, identity separation map, public profile audit, website safety review, and incident response plan",
    example:
      "A teacher receives a message that appears to come from a principal asking for a shared document. The safer routine is to stop, check the sender and link without clicking, report through the district process, and document the pattern in a sanitized note.",
    mistake:
      "Investigating live suspicious links, copying private email content into AI tools, or publishing screenshots that contain names, addresses, school routines, or account details.",
    sourceNeed: "district IT policy, FTC/CISA/NIST guidance, platform security documentation, and escalation boundaries",
  },
  "ots-320": {
    learner: "a teacher using coding agents while protecting authored curriculum and reviewing every generated change",
    pressure: "The teacher can ask an agent to move fast, but needs branch, diff, test, rollback, and fake-data habits before trusting the output",
    artifactExample:
      "Reviewed agent build packet with a safe prompt, scoped task, diff review, test checklist, fake-data result, and rollback note",
    example:
      "A teacher asks an agent to add a printable rubric page. The safe prompt names files that may be touched, files that are off limits, expected route behavior, visual checks, and the exact command that must pass before the change is accepted.",
    mistake:
      "Letting the agent rewrite authored lesson content, accepting a passing build as the only review, or testing with real student data.",
    sourceNeed: "tool documentation, repository diffs, route checks, accessibility review, and fake-data test records",
  },
  "ots-399": {
    learner: "an educator assembling the pathway into one publishable, reviewable, and maintainable curriculum system",
    pressure: "The teacher has many artifacts, but the capstone only works if the package proves scope, evidence, safety, presentation, and maintenance",
    artifactExample:
      "Published curriculum system packet with proposal, artifact index, system map, technical evidence log, release safety review, peer feedback, and maintenance plan",
    example:
      "A capstone team chooses a small robotics troubleshooting mini-unit. The package includes a short proposal, lesson links, source notes, one automation evidence log, privacy/accessibility review, peer feedback, and a final release decision for each public item.",
    mistake:
      "Calling the capstone finished because the pieces exist. A capstone is finished only when a reviewer can trace the teaching need, evidence, safety decisions, and maintenance plan without asking the author to explain hidden context.",
    sourceNeed: "course artifacts, source notes, release checks, peer review notes, and platform documentation",
  },
};

const chapterNotes = {
  prompting: {
    model:
      "A weak prompt asks, 'Make me a lesson.' A stronger teacher prompt names the class, learning target, source material, output format, constraints, and what the teacher will verify before students see it.",
    decision: "what context the AI needs and what judgment stays with the teacher",
  },
  standards: {
    model:
      "If a standard says students evaluate sources, the target should name the evidence: students compare two sources, identify credibility signals, and justify which one belongs in the lesson.",
    decision: "which verb, concept, and evidence make the standard teachable",
  },
  safety: {
    model:
      "Use fake names, redacted screenshots, and private notes. The public artifact should describe the safety pattern without exposing the actual account, student, incident, or location.",
    decision: "what can be shared publicly and what must stay private",
  },
  automation: {
    model:
      "Test with a sandbox folder and fake sheet first. The evidence is not 'the script ran'; the evidence is what it created, what it skipped, and how the teacher can undo it.",
    decision: "whether the routine is stable enough to automate",
  },
  workspace: {
    model:
      "A folder map should show current work, archive rules, owner, naming pattern, and where responses or handouts land after class.",
    decision: "where work starts, where it closes, and who maintains it",
  },
  capstone: {
    model:
      "A reviewer should be able to open the artifact index and see what is ready, private, queued, blocked, and responsible for maintenance.",
    decision: "what evidence proves the package is usable beyond the author",
  },
  default: {
    model:
      "A strong section turns the concept into a small teacher-owned artifact that can be reviewed after class.",
    decision: "what a teacher should do, save, verify, and revise next",
  },
};

const remediationTargets = new Set([
  "ots-101",
  "ots-201",
  "ots-220",
  "ots-240",
  "ots-280",
  "ots-320",
  "ots-399",
]);

function walkMdx(directory) {
  const result = [];
  if (!existsSync(directory)) return result;

  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    const filePath = join(directory, entry.name);
    if (entry.isDirectory()) {
      result.push(...walkMdx(filePath));
    } else if (entry.isFile() && entry.name.endsWith(".mdx")) {
      result.push(filePath);
    }
  }
  return result.sort();
}

function words(value) {
  return String(value || "")
    .replaceAll("'", "")
    .split(/[^A-Za-z0-9]+/)
    .filter((word) => word.length > 2);
}

function noteFor(parsed) {
  const haystack = `${parsed.data.chapter ?? ""} ${parsed.data.chapterSlug ?? ""} ${parsed.data.title ?? ""}`.toLowerCase();
  if (haystack.includes("prompt")) return chapterNotes.prompting;
  if (haystack.includes("standard") || haystack.includes("target")) return chapterNotes.standards;
  if (haystack.includes("safety") || haystack.includes("phish") || haystack.includes("threat") || haystack.includes("identity") || haystack.includes("incident")) return chapterNotes.safety;
  if (haystack.includes("script") || haystack.includes("automation") || haystack.includes("folder") || haystack.includes("doc") || haystack.includes("email")) return chapterNotes.automation;
  if (haystack.includes("workspace") || haystack.includes("drive") || haystack.includes("sheets") || haystack.includes("forms") || haystack.includes("calendar")) return chapterNotes.workspace;
  if (haystack.includes("capstone") || haystack.includes("published") || haystack.includes("presentation") || haystack.includes("evidence")) return chapterNotes.capstone;
  return chapterNotes.default;
}

function classifySection(parsed) {
  const title = String(parsed.data.title || "");
  const type = String(parsed.data.type || "");
  const lower = `${title} ${type}`.toLowerCase();
  if (lower.includes("overview")) return "overview";
  if (lower.includes("checkpoint")) return "checkpoint";
  if (lower.includes("build task") || lower.includes("final build") || lower.includes("workshop")) return "build";
  return "concept";
}

function learningMove(kind, title, artifact) {
  if (kind === "overview") {
    return `Use the overview to preview the chapter artifact, name the teacher decision the chapter will settle, and identify what evidence must be saved before moving on.`;
  }
  if (kind === "checkpoint") {
    return `Use the checkpoint to inspect ${artifact}, name one part that is ready, one part that needs revision, and one part that needs a source, safety, or accessibility check.`;
  }
  if (kind === "build") {
    return `Build the first usable version of ${artifact}. Keep it small enough to finish, but specific enough that another educator could test it.`;
  }
  return `Turn "${title}" into a decision you can use in one real classroom workflow, then save a short note that supports ${artifact}.`;
}

function sampleRows(courseSlug, title, artifact) {
  const topic = words(title).join(" ").toLowerCase() || "lesson focus";
  const artifactName = String(artifact || "course artifact").toLowerCase();
  if (courseSlug === "ots-101") {
    return [
      `Artifact line: ${artifact} - ${topic} decision for a robotics sensor mini-unit.`,
      `Teacher note: connect ${topic} to one source-backed student task, one classroom material, and one quick check before the build day.`,
      `Revision note: replace any ${topic} directions that sound polished but skip materials, timing, submission steps, or evidence.`,
    ];
  }
  if (courseSlug === "ots-201") {
    return [
      `Workspace line: ${artifact} - ${topic} belongs in the current unit folder and is linked from the command center.`,
      `Owner note: one teacher owns the ${topic} update this week; the team reviews archive and naming at the end of the unit.`,
      `Check note: the ${artifactName} entry exposes no student roster, private email, or editable answer key through a shared link.`,
    ];
  }
  if (courseSlug === "ots-220") {
    return [
      `Automation line: ${artifact} - ${topic} is tested in a sandbox folder with fake rows before live use.`,
      `Input note: the ${topic} test sheet uses Unit 03, Sample Student A, and dummy due dates.`,
      `Rollback note: delete the ${artifactName} sandbox output, inspect the log, then revise the script before touching real files.`,
    ];
  }
  if (courseSlug === "ots-240") {
    return [
      `Repository line: ${artifact} - ${topic} has a README note, source link, license decision, and maintenance owner.`,
      `Reuse note: ${topic} material is not copied unless the license or terms allow it.`,
      `Review note: a colleague can open the ${artifactName} repo and understand what is ready, what is excluded, and how to suggest a change.`,
    ];
  }
  if (courseSlug === "ots-280") {
    return [
      `Safety line: ${artifact} - ${topic} is documented with fictional examples or private local notes only.`,
      `Escalation note: ${topic} evidence that includes suspicious messages, exposed student data, or active account compromise goes to district IT or the correct authority.`,
      `Redaction note: ${artifactName} screenshots remove names, addresses, school routines, account IDs, links, and timestamps before review.`,
    ];
  }
  if (courseSlug === "ots-320") {
    return [
      `Agent line: ${artifact} - ${topic} names allowed files, forbidden files, expected behavior, checks, and rollback plan.`,
      `Diff note: accept no agent change for ${topic} until the teacher can explain the diff in plain language.`,
      `Test note: use fake data, route checks, and a visual pass before calling the ${artifactName} tool classroom-ready.`,
    ];
  }
  return [
    `Capstone line: ${artifact} - ${topic} is listed in the artifact index with ready/private/queued status.`,
    `Evidence note: the reviewer can trace the ${topic} teaching need, source notes, safety review, peer feedback, and maintenance owner.`,
    `Release note: public ${artifactName} items pass privacy, accessibility, source, and route checks before the final presentation.`,
  ];
}

function focusPrompt(parsed, artifact) {
  const topic = words(parsed.data.title).join(" ").toLowerCase() || "this lesson";
  const chapter = words(parsed.data.chapter).join(" ").toLowerCase() || "this chapter";
  const section = String(parsed.data.sectionNumber || "").replace(".", "-") || "current";
  const artifactName = String(artifact || "course artifact").toLowerCase();

  return `For the ${section} ${topic} response, name one ${chapter} classroom moment, one ${artifactName} update, one piece of student-visible evidence, and one revision cue. Keep those four details tied to ${topic} so this page does not read like a generic template.`;
}

function topicDetails(courseSlug, title) {
  const topic = words(title).join(" ").toLowerCase() || "the lesson focus";
  const courseSpecific = {
    "ots-101": [
      `Choose one real lesson or mini-unit connected to ${topic}, such as sensors, design journals, rubric criteria, or source review.`,
      "Write what the teacher needs to keep organized, what students will see or use, and what evidence shows the lesson is ready.",
      "Improve vague language by naming the student task, source, product, and revision check.",
    ],
    "ots-201": [
      `Choose one real workspace location for ${topic}: active unit folder, archive folder, shared tracker, response sheet, or command center link.`,
      "Write who owns the file, when it changes, and how another teacher can tell whether it is current.",
      "Improve memory-based routines by adding a trigger, named location, closeout rule, and maintenance date.",
    ],
    "ots-220": [
      `Before using ${topic} with real class files, write the fake input, expected output, and rollback step.`,
      "Use a sandbox folder, fake rows, and a log note that says what the automation created or skipped.",
      "Improve one-time automation by making it testable, explainable, stoppable, and repairable.",
    ],
    "ots-240": [
      `Connect ${topic} to a specific repo file such as README, license, source notes, contribution guide, or release checklist.`,
      "Write what another teacher may reuse, what they must attribute, and what is excluded.",
      "Improve a merely public repo by explaining how the next educator can inspect, adapt, and credit the work.",
    ],
    "ots-280": [
      `Use a fictional or redacted safety scenario for ${topic}, and keep the private version out of the public artifact.`,
      "Separate normal teacher maintenance from situations that require district IT, administration, platform support, or emergency help.",
      "Improve fear-based safety language by giving a calm stop, check, document, report, and revise routine.",
    ],
    "ots-320": [
      `Define the agent boundary for ${topic}: allowed files, blocked files, review command, visual check, and rollback path.`,
      "Include a prompt excerpt, a diff note, a fake-data test, and the teacher decision after review.",
      "Improve vague agent requests by naming acceptance criteria and protecting authored curriculum from accidental rewrites.",
    ],
    "ots-399": [
      `Add an entry for ${topic} to the capstone index and mark it ready, private, queued, blocked, or needs peer review.`,
      "Show where the artifact lives, what it proves, who reviewed it, and what maintenance happens next.",
      "Improve a pile of finished-looking files by making need, evidence, safety, feedback, and release status traceable.",
    ],
  };

  return courseSpecific[courseSlug] ?? [
    `Choose one classroom moment connected to ${topic}.`,
    "Write the exact teacher action, artifact evidence, and review step.",
    "Improve vague language by naming the classroom use and the revision decision.",
  ];
}

function bodyFor(parsed, courseSlug) {
  const profile = profiles[courseSlug];
  const chapter = parsed.data.chapter || "Course Chapter";
  const title = parsed.data.title || "Lesson";
  const artifact = parsed.data.artifact || "chapter artifact";
  const note = noteFor(parsed);
  const kind = classifySection(parsed);
  const keyTerms = words(`${title} ${artifact}`).slice(0, 5).join(", ");
  const rows = sampleRows(courseSlug, title, artifact);
  const details = topicDetails(courseSlug, title);
  const focus = focusPrompt(parsed, artifact);
  const pressure = profile.pressure.replace(/^([a-z])/, (match) =>
    match.toUpperCase(),
  );

  return `# ${title}

## Lesson Purpose

This lesson helps ${profile.learner} use **${title}** as part of the chapter work on **${chapter}**. The point is not to read a definition and move on. The point is to make one visible teaching decision, connect it to a practical artifact, and leave enough evidence that a colleague could review the work later.

By the end, you should have a small but inspectable addition to **${artifact}**.

## Teacher Problem

${pressure}. In this lesson, that pressure shows up around **${title}**. A teacher may understand the idea in conversation and still fail to capture the decision in a way that can be reused, checked, or taught from.

The practical risk is this: ${profile.mistake}

## Plain-Language Concept

${note.model}

For this section, the decision is: **${note.decision}**. Keep the decision narrow. A useful course artifact is usually built from several small, clear decisions rather than one oversized document.

Key terms to watch in this section: ${keyTerms || "artifact, evidence, review, revision"}.

## Classroom Example

${profile.example}

Applied to **${title}**, the teacher does three things:

- Names the exact classroom context before drafting anything.
- Saves one piece of evidence in **${artifact}**.
- Writes a review note explaining what must be checked before students, peers, or the public see the work.

## Try It

${learningMove(kind, title, artifact)}

${focus}

Use this three-step workflow:

1. Write the classroom context in one sentence.
2. Add one concrete artifact entry that uses this lesson's idea.
3. Review the entry for source accuracy, privacy, accessibility, and usefulness.

## Example Artifact Starter

${rows.map((row) => `- ${row}`).join("\n")}

These starter lines are not the final answer. They show the level of specificity a teacher should aim for: a real teaching context, a reviewable decision, and an obvious next check.

## Turn the Idea Into a Real Teaching Moment

${details.map((detail) => `- ${detail}`).join("\n")}

Your response should make the system visible. Another teacher should be able to inspect the task, source, student product, and revision check without guessing what happened.

## Checkpoint

Before moving to the next lesson, confirm:

- The work is connected to **${artifact}**, not floating as a loose note.
- The teacher decision is written in plain language.
- The evidence uses safe or fictional details when privacy matters.
- Any claim that depends on software, licensing, security, policy, or standards is tied to ${profile.sourceNeed}.
- A revision note names what would improve the artifact before classroom use.

## Reflection

What would a busy teacher misunderstand if they only saw your artifact entry and not your explanation? Revise the entry so the next teacher can understand the decision without asking you to translate it.
`;
}

function shouldRemediate(parsed, courseSlug) {
  if (!remediationTargets.has(courseSlug)) return false;
  if (allTargets) return true;
  if (GENERATED_STATUSES.has(parsed.data.migrationStatus)) return true;
  if (courseSlug === "ots-320" && parsed.content.includes("A privacy and safety note is " + "attached")) return true;
  return findGenericAuthoringFragments(parsed.content).length > 0;
}

let changed = 0;
const courseStats = new Map();

for (const courseSlug of readdirSync(coursesRoot).sort()) {
  const courseRoot = join(coursesRoot, courseSlug);
  const lessonsRoot = join(courseRoot, "lessons");
  if (!existsSync(lessonsRoot) || !profiles[courseSlug]) continue;

  let courseChanged = 0;
  for (const filePath of walkMdx(lessonsRoot)) {
    const parsed = matter(readFileSync(filePath, "utf8"));
    if (!shouldRemediate(parsed, courseSlug)) continue;

    parsed.data.migrationStatus = "authored";
    parsed.content = bodyFor(parsed, courseSlug);
    writeFileSync(filePath, matter.stringify(parsed.content, parsed.data));
    changed++;
    courseChanged++;
  }

  if (courseChanged > 0) {
    const courseJsonPath = join(courseRoot, "course.json");
    if (existsSync(courseJsonPath)) {
      const courseJson = JSON.parse(readFileSync(courseJsonPath, "utf8"));
      courseJson.migrationStatus = "authored";
      writeFileSync(courseJsonPath, `${JSON.stringify(courseJson, null, 2)}\n`);
    }
    courseStats.set(courseSlug, courseChanged);
  }
}

for (const [courseSlug, count] of courseStats) {
  console.log(`${courseSlug}: remediated ${count} lesson bodies.`);
}

console.log(`Educator learner remediation complete. Lesson files updated: ${changed}.`);

if (changed === 0) {
  console.log("No generated or generic-fingerprint lessons required remediation.");
}

console.log(
  `Report source: ${relative(root, join(root, "docs", "EDUCATOR_LEARNER_AUDIT.md")).replaceAll("\\", "/")}`,
);
