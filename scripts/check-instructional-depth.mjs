import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join, relative } from "node:path";
import matter from "gray-matter";
import {
  KNOWN_CONTENT_STATUSES,
  RELEASE_CONTENT_STATUSES,
  RELEASE_COURSE_STATUSES,
} from "./lib/content-fingerprints.mjs";

const root = process.cwd();
const coursesRoot = join(root, "content", "courses");
const scanStatuses = new Set(["reviewed", "teachable-ready", "remediated"]);
const releaseCourseReadiness = RELEASE_COURSE_STATUSES;

function fail(message) {
  console.error(`Instructional depth check failed: ${message}`);
  process.exitCode = 1;
}

function walkMdx(directory) {
  if (!existsSync(directory)) return [];

  const result = [];
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    const fullPath = join(directory, entry.name);
    if (entry.isDirectory()) {
      result.push(...walkMdx(fullPath));
    } else if (entry.isFile() && entry.name.endsWith(".mdx")) {
      result.push(fullPath);
    }
  }
  return result;
}

function hasHeading(content, heading) {
  const escaped = heading.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return new RegExp(`^#{1,4}\\s*${escaped}\\s*$`, "mi").test(content);
}

function lessonKind(parsed) {
  const courseSlug = String(parsed.data.courseSlug || "").toLowerCase();
  const type = String(parsed.data.type || "").toLowerCase();
  const title = String(parsed.data.title || "").toLowerCase();
  const chapter = String(parsed.data.chapter || "").toLowerCase();

  if (type.includes("checkpoint")) return "checkpoint";
  if (type.includes("workshop") || type.includes("build")) return "build";
  if (type.includes("artifact") || title.includes("artifact")) return "build";

  if (
    courseSlug === "ots-399" &&
    (chapter.includes("capstone") ||
      title.includes("capstone") ||
      title.includes("artifact index") ||
      title.includes("peer review") ||
      title.includes("release decision"))
  ) {
    return "capstone";
  }

  if (courseSlug === "ots-220") {
    const technicalSignals =
      /(script|apps script|folder|sheet|doc|drive|email|menu|template|trigger|logger|permission|automation|form|email|custom menu)/i;
    if (technicalSignals.test(chapter) || technicalSignals.test(type) || technicalSignals.test(title)) {
      return "technical";
    }
  }

  return "concept";
}

const depthRequirements = {
  concept: [
    {
      label: "Why This Matters",
      heading: "Why This Matters",
      pattern: /##+\s*why\s+this\s+matters/i,
    },
    {
      label: "concrete classroom example",
      pattern:
        /scenario|example|worked|mini[-\s]unit|classroom|student|teacher uses|teacher does/i,
    },
    {
      label: "common mistake",
      pattern: /mistake|avoid|common\s+error|common\s+pitfall|wrong|confuses/i,
    },
    {
      label: "practice task",
      pattern: /what you will do|practice|try it|activity|task|apply this|teacher should/i,
    },
    {
      label: "artifact connection",
      pattern: /artifact/i,
    },
    {
      label: "quality check",
      pattern: /quality check|review|criteria|rubric|verification|evidence/i,
    },
    {
      label: "key idea or core idea section",
      heading: "Key Idea",
      pattern: /key idea|core idea|big idea/i,
    },
  ],
  technical: [
    {
      label: "concrete runnable example",
      pattern: /```/i,
      heading: "Code Sample",
    },
    {
      label: "test or sample data",
      pattern: /test|fake data|sample row|dummy|sandbox|test log|unit test/i,
      heading: "Test",
    },
    {
      label: "failure mode or error path",
      pattern: /error|failure|exception|try\/?catch|rollback|blocked|stops|reject/i,
      heading: "What Can Go Wrong",
    },
    {
      label: "rollback/revision note",
      pattern: /rollback|undo|revert|revision|revise|fix/i,
      heading: "Rollback",
    },
    {
      label: "artifact evidence",
      pattern: /evidence|log|output|result|artifact|sheet/i,
      heading: "Output",
    },
  ],
  build: [
    {
      label: "what the learner creates",
      pattern: /build|create|add|update|revise|artifact entry|artifact row/i,
      heading: "Build the Artifact",
    },
    {
      label: "completed sample or sample row",
      pattern: /sample|completed|example row|evidence row|artifact row/i,
      heading: "Sample",
    },
    {
      label: "empty structure or template",
      pattern: /template|structure|field|checklist|skeleton|starter|format|formatting/i,
    },
    {
      label: "quality criteria",
      pattern: /quality|criteria|review|rubric|done|pass|pass criteria/i,
      heading: "Quality",
    },
    {
      label: "reviewer check",
      pattern: /review|peer|teacher checks|reviewer|verification|accept/i,
      heading: "Reviewer",
    },
  ],
  checkpoint: [
    {
      label: "ready/revise/blocked distinctions",
      pattern: /\bready\b|\brevise\b|\bblocked\b/i,
    },
    {
      label: "evidence requirement",
      pattern: /evidence/i,
    },
    {
      label: "next revision owner or trigger",
      pattern: /owner|trigger|who|when|due|next revision|next step|responsible/i,
    },
  ],
  capstone: [
    {
      label: "capstone evidence artifact",
      pattern: /proposal|artifact index|peer review|evidence|release|system map|presentation/i,
      headings: ["Capstone Proposal", "Artifact Index", "System Map", "Release"],
    },
    {
      label: "ready/revise/blocked distinctions",
      pattern: /\bready\b|\brevise\b|\bblocked\b/i,
    },
    {
      label: "release/evidence readiness decision",
      pattern: /decision|ready|not ready|maintenance|release|public|private/i,
    },
    {
      label: "review protocol",
      pattern: /review|peer|feedback|rubric|criteria|signature|owner/i,
    },
  ],
};

function validate(content, requirements, relativePath, lessonType) {
  const normalizedContent = content.toLowerCase();
  const missing = requirements.filter((requirement) => {
    const headings = [
      ...((requirement.headings || []).map((value) => value)),
      ...(requirement.heading ? [requirement.heading] : []),
    ];

    if (headings.some((heading) => hasHeading(normalizedContent, heading))) {
      return false;
    }

    if (requirement.pattern && requirement.pattern.test(normalizedContent)) {
      return false;
    }

    return true;
  });
  if (missing.length > 0) {
    fail(
      `${relativePath} (${lessonType}) is missing required instructional-depth elements: ${missing
        .map((item) => item.label)
        .join(", ")}`,
    );
  }
}

function loadCourseReadiness() {
  const statuses = new Map();
  if (!existsSync(coursesRoot)) return statuses;

  for (const entry of readdirSync(coursesRoot, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;
    const courseJsonPath = join(coursesRoot, entry.name, "course.json");
    if (!existsSync(courseJsonPath)) continue;

    const courseJson = JSON.parse(readFileSync(courseJsonPath, "utf8"));
    statuses.set(entry.name, courseJson.courseReadiness ?? "internal");
  }

  return statuses;
}

function isReleaseCourse(courseReadiness) {
  return releaseCourseReadiness.has(courseReadiness || "internal");
}

let checkedLessons = 0;
let skippedLessons = 0;
let processedCourses = 0;

if (!existsSync(coursesRoot)) {
  fail("content/courses directory is missing.");
}

const courseReadiness = loadCourseReadiness();

for (const courseSlug of readdirSync(coursesRoot).sort()) {
  const courseRoot = join(coursesRoot, courseSlug);
  const lessonsRoot = join(courseRoot, "lessons");
  if (!existsSync(lessonsRoot)) continue;
  if (!isReleaseCourse(courseReadiness.get(courseSlug))) continue;

  processedCourses += 1;

  for (const filePath of walkMdx(lessonsRoot)) {
    const raw = readFileSync(filePath, "utf8");
    const parsed = matter(raw);
    const status = parsed.data.migrationStatus;
    const lessonType = lessonKind(parsed);
    const rel = relative(root, filePath).replaceAll("\\", "/");

    if (!KNOWN_CONTENT_STATUSES.has(status)) {
      fail(`${rel} has unknown migrationStatus: ${status}.`);
      continue;
    }

    if (!scanStatuses.has(status) && !RELEASE_CONTENT_STATUSES.has(status)) {
      skippedLessons += 1;
      continue;
    }

    const requirements = depthRequirements[lessonType] || depthRequirements.concept;
    const content = parsed.content.toLowerCase();
    validate(content, requirements, rel, lessonType);
    checkedLessons += 1;
  }
}

if (process.exitCode) {
  process.exit(process.exitCode);
}

console.log(
  `Instructional depth check passed. Courses scanned: ${processedCourses}; checked lessons: ${checkedLessons}; skipped lessons: ${skippedLessons}.`,
);
