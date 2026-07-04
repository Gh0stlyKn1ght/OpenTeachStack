import { existsSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join, relative } from "node:path";
import matter from "gray-matter";
import { assertCourseWriteAllowed } from "./lib/course-locks.mjs";

const root = process.cwd();
const coursesRoot = join(root, "content", "courses");
const force = process.argv.includes("--force");

if (!force) {
  console.error("This legacy course-wide writer is disabled by default.");
  console.error("Run `node scripts/complete-course-lessons.mjs --force` only after reviewing the target diff plan.");
  process.exit(1);
}

const courseProfiles = {
  "ots-101": {
    learner: "a teacher building a first reusable mini-unit",
    setting: "middle school robotics and technology",
    recurringExample:
      "an ultrasonic sensor mini-unit where students collect readings, explain uncertainty, revise a threshold, and submit a short design reflection",
    durableHabit:
      "source-backed planning, plain-language decisions, and visible revision notes",
    risk:
      "accepting a polished lesson draft before the sources, student task, assessment evidence, and classroom routine are inspectable",
    sourceRule: "standards, official documentation, source notes, privacy checks, and accessibility checks",
  },
  "ots-201": {
    learner: "a teacher team making Google Workspace reliable for weekly planning",
    setting: "shared Drive, Docs, Slides, Forms, Sheets, and Calendar routines",
    recurringExample:
      "a ninth grade technology team maintaining a current-unit folder, shared tracker, response sheet, delivery deck, and command center",
    durableHabit:
      "clear ownership, predictable file locations, and closeout routines",
    risk:
      "building one more folder or tracker without deciding who updates it, when it closes, and how old versions leave the active workspace",
    sourceRule: "Google Workspace help pages, local sharing policy, accessibility checks, and file ownership decisions",
  },
  "ots-220": {
    learner: "a teacher learning small Apps Script automations safely",
    setting: "sandbox folders, fake student rows, copied Docs, Forms responses, reminders, and logs",
    recurringExample:
      "a fake-data automation that creates unit folders from a Sheet row, writes a log entry, and can be deleted without touching real class files",
    durableHabit:
      "test with fake data, inspect the output, and keep a rollback path",
    risk:
      "automating a confusing process before the trigger, input, output, owner, and failure path are clear",
    sourceRule: "official Apps Script documentation, Google Workspace limits, local email policy, and fake-data test notes",
  },
  "ots-240": {
    learner: "an educator publishing or adapting classroom resources responsibly",
    setting: "open resources, GitHub repositories, READMEs, license notes, source lists, and contribution review",
    recurringExample:
      "a small cybersecurity vocabulary resource with a README, source list, license decision, excluded-media note, and maintenance owner",
    durableHabit:
      "explain reuse rights, attribution, exclusions, and review steps",
    risk:
      "assuming public or free-to-view material is automatically free to copy, remix, or publish",
    sourceRule: "Creative Commons license terms, GitHub documentation, source citations, and school publishing boundaries",
  },
  "ots-260": {
    learner: "a teacher using media to improve lesson delivery",
    setting: "slides, diagrams, short videos, image prompts, captions, transcripts, and accessibility alternatives",
    recurringExample:
      "a sensor lesson media packet with one diagram, one short demonstration clip plan, alt text, captions, and a teacher delivery cue",
    durableHabit:
      "use media only when it clarifies a learning move and includes an accessible alternative",
    risk:
      "adding attractive media that distracts, invents details, hides important information, or cannot be used by every student",
    sourceRule: "media licenses, platform terms, accessibility guidance, and classroom privacy rules",
  },
  "ots-280": {
    learner: "a classroom educator reducing personal and classroom-facing digital risk",
    setting: "accounts, public profiles, email, devices, Wi-Fi, websites, repositories, domains, and incident notes",
    recurringExample:
      "a redacted teacher safety review that maps public usernames, MFA status, suspicious-message handling, website exposure, and escalation contacts",
    durableHabit:
      "stop, verify, document safely, escalate correctly, and revise the public surface",
    risk:
      "investigating live threats alone, exposing private details in public notes, or treating security advice as one-size-fits-all policy",
    sourceRule: "district IT policy, FTC/CISA/NIST guidance, platform security documentation, and escalation boundaries",
  },
  "ots-301": {
    learner: "a teacher publishing a small course hub",
    setting: "course pages, resource pages, navigation, accessibility checks, hosting, domain decisions, and maintenance routines",
    recurringExample:
      "a simple robotics course hub with a homepage, unit page, resource list, accessibility check, broken-link review, and maintenance owner",
    durableHabit:
      "publish only what is useful, maintainable, accessible, and safe to expose",
    risk:
      "treating a live website as finished when links, privacy, accessibility, source notes, and maintenance are still unclear",
    sourceRule: "platform documentation, accessibility guidance, domain/hosting references, and school publishing rules",
  },
  "ots-320": {
    learner: "a teacher using coding agents while protecting authored curriculum",
    setting: "branches, prompts, diffs, tests, fake data, screenshots, rollback notes, and small classroom tools",
    recurringExample:
      "an agent-assisted printable rubric page where the prompt names allowed files, blocked files, acceptance criteria, tests, and teacher review steps",
    durableHabit:
      "scope the task, review the diff, test with fake data, and keep teacher judgment in control",
    risk:
      "letting an agent rewrite authored curriculum, accepting a passing build as the only review, or testing with real student data",
    sourceRule: "tool documentation, repository diffs, route checks, accessibility review, and fake-data test records",
  },
  "ots-399": {
    learner: "an educator assembling a publishable curriculum system",
    setting: "proposal, artifact index, system map, technical evidence, safety review, peer feedback, and maintenance plan",
    recurringExample:
      "a robotics troubleshooting mini-unit capstone with lesson links, source notes, fake-data evidence, privacy review, peer feedback, and final release decisions",
    durableHabit:
      "make need, evidence, safety, feedback, release status, and maintenance traceable",
    risk:
      "calling the capstone finished because files exist, even though a reviewer cannot trace the decisions without the author explaining hidden context",
    sourceRule: "course artifacts, source notes, release checks, peer review notes, and platform documentation",
  },
};

const chapterModels = [
  {
    match: /ai literacy|ai verification|verification checklist|verify ai|ai output/i,
    concept:
      "AI output is usable only after the teacher checks the source, the claim, the classroom fit, and the student-facing consequence.",
    example:
      "Verification entry: AI suggested a sensor threshold activity; teacher checked the datasheet, removed an unsupported claim, and added a student data-check question.",
    mistake:
      "Using AI language because it sounds confident before checking sources, classroom fit, privacy, and student evidence.",
  },
  {
    match: /prompt/i,
    concept:
      "A useful prompt is a work order, not a wish. It names the learner, task, source material, output format, constraints, review criteria, and what the teacher will verify.",
    example:
      "Prompt entry: Draft student directions for a 45-minute sensor data table. Use grade 8 language, include three readings, one reliability question, and a note that the teacher checks setup safety before class.",
    mistake:
      "Asking for a complete lesson without giving the standard, materials, student product, time limit, or review rule.",
  },
  {
    match: /standard|target/i,
    concept:
      "A standard becomes teachable only when the verb, concept, student evidence, and assessment move are visible.",
    example:
      "Target entry: Students compare two sensor readings, identify one reliability concern, and justify a threshold choice using their data table.",
    mistake:
      "Copying a standard into the plan without naming what students will actually do or submit.",
  },
  {
    match: /assessment|rubric|feedback/i,
    concept:
      "Assessment evidence should show the specific decision students made, the criteria used to judge it, and the revision opportunity that follows.",
    example:
      "Rubric row: Threshold choice uses at least three readings, explains one unreliable value, and revises after test feedback.",
    mistake:
      "Scoring effort or completion when the learning target requires evidence, reasoning, or revision.",
  },
  {
    match: /drive|workspace|docs|slides|sheets|forms|calendar|command/i,
    concept:
      "A workspace system works when another teacher can find current files, understand ownership, close the loop after class, and avoid exposing private materials.",
    example:
      "Workspace entry: Unit 03 active folder contains current slides, handout, response sheet, and exit ticket; archived versions move out after Friday review.",
    mistake:
      "Leaving the newest copy, answer key, and student responses mixed together in a shared folder.",
  },
  {
    match: /script|automation|folder|email|reminder|toolkit/i,
    concept:
      "Automation is ready only after the manual routine is clear, fake-data tests pass, logs are readable, and rollback is possible.",
    example:
      "Test log: Fake row Unit 03 / Sample Student A created one folder, one copied Doc, and one log row; no email sent during sandbox test.",
    mistake:
      "Running a script on live class data before proving what it creates, skips, changes, and can undo.",
  },
  {
    match: /github|resource|readme|license|attribution|open/i,
    concept:
      "Open work needs reuse instructions, source notes, license decisions, exclusions, and a way for another educator to suggest improvements safely.",
    example:
      "README entry: This handout may be adapted under CC BY-NC-SA 4.0; screenshots are excluded; sources are listed in source-notes.md.",
    mistake:
      "Treating a public link as permission to copy or treating a repository as self-explanatory.",
  },
  {
    match: /safety|threat|identity|phishing|doxxing|vpn|device|website|incident|account/i,
    concept:
      "Teacher safety work should reduce exposure without turning private incidents into public artifacts. Use fictional examples, redaction, and escalation boundaries.",
    example:
      "Safety entry: Suspicious message reported through district channel; screenshot stored privately with names, links, and timestamps redacted for training notes.",
    mistake:
      "Clicking through suspicious links, pasting private email into AI tools, or publishing screenshots with identifying details.",
  },
  {
    match: /media|image|diagram|slides|video|recording|accessible/i,
    concept:
      "Media belongs in a lesson when it clarifies a learning move and remains usable without sight, sound, perfect bandwidth, or a specific platform.",
    example:
      "Media entry: Diagram shows sensor-to-threshold flow; alt text names the sequence; transcript covers the 90-second demo clip.",
    mistake:
      "Using a dramatic image or video that looks polished but does not explain the concept or support accessibility.",
  },
  {
    match: /site|web|hub|deployment|published|domain|maintenance/i,
    concept:
      "A course site is a maintained teaching surface. It needs clear navigation, safe public content, accessible pages, source notes, and a review rhythm.",
    example:
      "Site entry: Homepage links current unit, resource page, contact boundary, accessibility note, and last-reviewed date.",
    mistake:
      "Publishing a site because it loads while broken links, private details, and ownership questions remain unresolved.",
  },
  {
    match: /agent|branch|diff|test|verification|coding/i,
    concept:
      "An agent can draft changes, but the teacher owns scope, review, testing, acceptance, and rollback.",
    example:
      "Agent entry: Allowed files are rubric page and style module; blocked files are lesson MDX; acceptance requires diff review, route smoke, and fake-data check.",
    mistake:
      "Letting an agent rewrite curriculum content or accepting code because the build passed once.",
  },
  {
    match: /capstone|proposal|peer|release|evidence/i,
    concept:
      "A capstone proves the system can be inspected by someone else. Every artifact needs purpose, location, evidence, review status, and maintenance owner.",
    example:
      "Artifact index row: Sensor mini-unit map / ready / proves sequence and assessment alignment / reviewed by peer / revisit after first classroom use.",
    mistake:
      "Submitting a folder of finished-looking files without release status, review notes, or a maintenance plan.",
  },
];

const lessonModels = [
  {
    match: /prompt anatomy/i,
    concept:
      "Prompt anatomy is the checklist inside a single request. The teacher names the audience, task, source material, output format, constraints, and verification rule before asking for help.",
    example:
      "Prompt anatomy entry: Audience grade 8; task write sensor table directions; source class mini-unit notes; output six numbered steps; constraint no invented claims; verification teacher checks datasheet and safety setup.",
    mistake:
      "Writing a vague request and hoping the tool guesses the grade level, materials, output format, and verification rule.",
  },
  {
    match: /prompt library/i,
    concept:
      "A prompt library is useful only when each saved prompt includes a purpose, reuse note, source requirement, revision date, and a short example of the expected output.",
    example:
      "Library entry: Sensor data-table prompt / use during lab planning / requires current mini-unit notes and datasheet / revise after first student confusion note / sample output attached.",
    mistake:
      "Saving a pile of prompts without naming when to use them, what source material they require, or how to judge the output.",
  },
];

const courseModelKeys = {
  "ots-201": "workspace",
  "ots-220": "automation",
  "ots-240": "open",
  "ots-260": "media",
  "ots-280": "safety",
  "ots-301": "site",
  "ots-320": "agent",
  "ots-399": "capstone",
};

const courseModels = {
  workspace: chapterModels[4],
  automation: chapterModels[5],
  open: chapterModels[6],
  safety: chapterModels[7],
  media: chapterModels[8],
  site: chapterModels[9],
  agent: chapterModels[10],
  capstone: chapterModels[11],
};

function walkMdx(directory) {
  if (!existsSync(directory)) return [];

  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const fullPath = join(directory, entry.name);
    if (entry.isDirectory()) return walkMdx(fullPath);
    if (entry.isFile() && entry.name.endsWith(".mdx")) return [fullPath];
    return [];
  });
}

function sentence(value) {
  const text = String(value || "").trim();
  if (!text) return "";
  return text.replace(/^([a-z])/, (match) => match.toUpperCase());
}

function fixAcronyms(value) {
  return String(value || "")
    .replace(/\bai\b/g, "AI")
    .replace(/\bmfa\b/g, "MFA")
    .replace(/\bdns\b/g, "DNS")
    .replace(/\bhtml\b/g, "HTML")
    .replace(/\bcss\b/g, "CSS")
    .replace(/\bhttps\b/g, "HTTPS")
    .replace(/\bvpns\b/g, "VPNs")
    .replace(/\bwi-fi\b/g, "Wi-Fi")
    .replace(/\bwhois\b/g, "WHOIS")
    .replace(/\breadme\b/g, "README");
}

function proseLower(value) {
  const text = String(value || "")
    .replaceAll("&", "and")
    .replace(/[^\w\s/-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase();

  if (!text) return "this lesson";

  return fixAcronyms(text);
}

function learnerTopic(title) {
  const text = String(title || "this lesson")
    .replace(/^Build Task:\s*/i, "")
    .replace(/^Final Build:\s*/i, "")
    .replace(/\bArtifact Links and Handoff Notes\b/i, "Artifact Links and Reviewer Notes")
    .replace(/\bHandoff Notes\b/i, "Reviewer Notes")
    .trim();

  if (/^(chapter overview|chapter plan)$/i.test(text)) return "Chapter Plan";
  if (/^(chapter checkpoint|checkpoint review)$/i.test(text)) return "Checkpoint Review";

  return text;
}

function learnerTopicLower(title) {
  return proseLower(learnerTopic(title));
}

function sectionKind(parsed) {
  const text = `${parsed.data.title ?? ""} ${parsed.data.type ?? ""}`.toLowerCase();
  if (text.includes("overview")) return "overview";
  if (text.includes("checkpoint")) return "checkpoint";
  if (text.includes("build") || text.includes("workshop") || text.includes("final")) return "build";
  return "concept";
}

function modelFor(parsed) {
  const haystack =
    `${parsed.data.courseSlug ?? ""} ${parsed.data.chapter ?? ""} ${parsed.data.chapterSlug ?? ""} ${parsed.data.title ?? ""}`.toLowerCase();
  const lessonModel = lessonModels.find((model) => model.match.test(haystack));
  if (lessonModel) return lessonModel;

  const courseKey = courseModelKeys[parsed.data.courseSlug];
  if (courseKey && courseModels[courseKey]) return courseModels[courseKey];

  return chapterModels.find((model) => model.match.test(haystack)) ?? {
    concept:
      "A strong teaching system turns a good idea into a visible action, artifact, review step, and revision decision.",
    example:
      "Artifact entry: one classroom task, one student product, one review criterion, and one next revision are named together.",
    mistake:
      "Keeping the idea in conversation instead of writing the evidence another teacher can inspect.",
  };
}

function actionFor(kind, title, artifact) {
  if (kind === "overview") {
    return `Preview the chapter by naming the classroom pressure, the artifact decision, and the evidence that will prove **${artifact}** is ready to use.`;
  }
  if (kind === "checkpoint") {
    return `Inspect **${artifact}** and mark what is ready, what needs revision, and what must be checked against sources, safety, privacy, or accessibility before use.`;
  }
  if (kind === "build") {
    return `Build or revise the working version of **${artifact}** for this chapter. Keep it small enough to finish and specific enough that another educator could test it.`;
  }
  return `Use **${title}** to make one classroom decision visible inside **${artifact}**.`;
}

function artifactRows(profile, parsed, model) {
  const title = parsed.data.title || "Lesson";
  const displayTitle = learnerTopic(title);
  const artifact = parsed.data.artifact || "chapter artifact";
  const chapter = parsed.data.chapter || "this chapter";

  return [
    `Classroom context: ${profile.setting}; ${profile.recurringExample}.`,
    `Artifact entry: In **${artifact}**, add the decision for **${displayTitle}** with the student-facing evidence and the review owner.`,
    `Example entry: ${model.example}`,
    `Review check: Check the entry against ${profile.sourceRule}, then write what should change after the first classroom use.`,
    `Peer review check: A colleague should be able to open the ${proseLower(chapter)} artifact, understand the decision behind **${displayTitle}**, and know the next action without extra explanation.`,
  ];
}

function checklist(kind, artifact, model) {
  const base = [
    `Your artifact entry is stored in **${artifact}** rather than kept as a private reminder.`,
    "The student-facing task or evidence is named in plain language.",
    "The review step names a source, safety, privacy, accessibility, or maintenance check.",
  ];

  if (kind === "checkpoint") {
    return [
      ...base,
      "The checkpoint distinguishes ready, revise, and blocked items.",
      "The next revision has an owner and a realistic date or trigger.",
    ];
  }

  if (kind === "build") {
    return [
      ...base,
      "The built artifact includes a usable example, not only instructions.",
      "A colleague could test the artifact with fake or classroom-safe data.",
    ];
  }

  return [
    ...base,
    `The common mistake is avoided: ${model.mistake}`,
    "The next classroom use or revision is obvious.",
  ];
}

function lessonMoves(profile, parsed, model) {
  const topic = learnerTopicLower(parsed.data.title);
  const chapter = proseLower(parsed.data.chapter);
  const artifact = proseLower(parsed.data.artifact);
  const setting = fixAcronyms(profile.setting.toLowerCase());
  const example = fixAcronyms(profile.recurringExample.toLowerCase());
  const habit = fixAcronyms(profile.durableHabit.toLowerCase());
  const mistake = fixAcronyms(model.mistake.replace(/\.$/, "").toLowerCase());

  return [
    `Before class, connect ${topic} to one setup decision in the ${artifact}: what the teacher prepares, where it lives, and which source or safety check keeps it honest.`,
    `During class, connect ${topic} to one student action in ${setting}: what learners read, build, submit, discuss, or revise while working through ${example}.`,
    `After class, review ${topic} through the ${chapter} lens: what evidence proves the move worked, which mistake to avoid (${mistake}), and what revision supports ${habit}.`,
  ];
}

function bodyFor(parsed, courseJson) {
  const courseSlug = parsed.data.courseSlug || courseJson.slug;
  const profile = courseProfiles[courseSlug];
  if (!profile) return null;

  const title = parsed.data.title || "Lesson";
  const displayTitle = learnerTopic(title);
  const chapter = parsed.data.chapter || "Course Chapter";
  const artifact = parsed.data.artifact || "chapter artifact";
  const kind = sectionKind(parsed);
  const model = modelFor(parsed);
  const topic = learnerTopicLower(title);
  const rows = artifactRows(profile, parsed, model);
  const checks = checklist(kind, artifact, model);
  const moves = lessonMoves(profile, parsed, model);

  return `# ${displayTitle}

## Why This Matters

${sentence(profile.learner)} needs more than a tool list or a checklist. The goal in **${chapter}** is to make a classroom system that can be used, inspected, revised, and handed to another educator without needing a meeting first.

For **${displayTitle}**, the practical pressure is simple: ${profile.risk}. This lesson turns that pressure into a visible update to **${artifact}**.

## Classroom Scenario

Use this situation as the working example: ${profile.recurringExample}. By the end, the work should support this habit: ${profile.durableHabit}.

In this scenario, the learner should be able to point to:

- what the teacher prepares before students see the work,
- what students will read, build, submit, or discuss,
- what evidence shows the work is ready,
- what gets revised after the first use.

## Key Idea

${model.concept}

Watch for this mistake: ${model.mistake}

## What You Will Do

Make the work concrete by writing three small decisions:

${moves.map((move) => `- ${move}`).join("\n")}

## Build the Artifact

${actionFor(kind, displayTitle, artifact)}

Add this to your artifact:

${rows.map((row) => `- ${row}`).join("\n")}

## What Good Work Looks Like

A strong **${topic}** entry is concrete enough that another teacher can inspect it. It names the class context, the artifact location, the student product, the source or safety check, and the revision trigger.

For this lesson, a strong entry might say:

> ${model.example}

That level of detail is enough to review. It is also small enough to revise after one classroom use.

## Quality Check

Before moving on, confirm:

${checks.map((item) => `- ${item}`).join("\n")}

## Reflection

What would a busy teacher misunderstand if they only saw your **${artifact}** entry and not your explanation? Revise the entry until the classroom task, evidence, review step, and next improvement are visible.
`;
}

let changed = 0;
const stats = new Map();

for (const courseSlug of readdirSync(coursesRoot).sort()) {
  const courseRoot = join(coursesRoot, courseSlug);
  const courseJsonPath = join(courseRoot, "course.json");
  const lessonsRoot = join(courseRoot, "lessons");
  if (!existsSync(courseJsonPath) || !existsSync(lessonsRoot)) continue;

  const courseJson = JSON.parse(readFileSync(courseJsonPath, "utf8"));
  let courseChanged = 0;

  for (const filePath of walkMdx(lessonsRoot)) {
    const raw = readFileSync(filePath, "utf8");
    const parsed = matter(raw);
    const body = bodyFor(parsed, courseJson);
    if (!body) continue;

    parsed.data.title = learnerTopic(parsed.data.title);
    parsed.data.migrationStatus = "remediated";
    const next = matter.stringify(body, parsed.data);
    if (next !== raw) {
      assertCourseWriteAllowed(filePath, { operation: "write lesson completion" });
      writeFileSync(filePath, next);
      changed += 1;
      courseChanged += 1;
    }
  }

  if (courseChanged > 0) {
    courseJson.migrationStatus = "remediated";
    assertCourseWriteAllowed(courseJsonPath, { operation: "write course metadata" });
    writeFileSync(courseJsonPath, `${JSON.stringify(courseJson, null, 2)}\n`);
    stats.set(courseSlug, courseChanged);
  }
}

for (const [courseSlug, count] of stats) {
  console.log(`${courseSlug}: completed ${count} lesson bodies.`);
}

console.log(`Course completion pass updated ${changed} lesson files.`);
console.log(`Content root: ${relative(root, coursesRoot).replaceAll("\\", "/")}`);
