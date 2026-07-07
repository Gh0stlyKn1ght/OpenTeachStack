import { readFileSync } from "node:fs";
import { join } from "node:path";
import { listCourseRecords } from "./lib/course-registry.mjs";

const root = process.cwd();
const promptPath = join(root, "src", "lib", "prompts.json");
const prompts = JSON.parse(readFileSync(promptPath, "utf8"));

const requiredFields = [
  "title",
  "slug",
  "category",
  "relatedCourses",
  "relatedArtifacts",
  "useCase",
  "teacherContextNeeded",
  "prompt",
  "expectedOutput",
  "verificationChecklist",
  "revisionStep",
  "safetyPrivacyNote",
  "tags",
];

const allowedCourses = new Set(listCourseRecords(root).map((record) => record.code));

const vaguePlaceholders = [
  "todo",
  "tbd",
  "lorem",
  "placeholder prompt",
  "coming soon",
  "fix later",
];

const unsafeRequests = [
  /paste\s+(real\s+)?student\s+(names|ids|emails|grades|records)/i,
  /provide\s+(real\s+)?student\s+(names|ids|emails|grades|records)/i,
  /paste\s+(passwords?|api keys?|tokens?)/i,
  /provide\s+(passwords?|api keys?|tokens?)/i,
];

function fail(message) {
  console.error(`Prompt library check failed: ${message}`);
  process.exitCode = 1;
}

if (!Array.isArray(prompts)) {
  fail("src/lib/prompts.json must export an array.");
} else if (prompts.length < 20) {
  fail(`expected at least 20 prompts, found ${prompts.length}.`);
}

const slugs = new Set();

for (const [index, prompt] of prompts.entries()) {
  const label = prompt?.slug || `prompt at index ${index}`;

  for (const field of requiredFields) {
    if (!(field in prompt)) {
      fail(`${label} is missing required field "${field}".`);
    }
  }

  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(prompt.slug || "")) {
    fail(`${label} must use a lowercase kebab-case slug.`);
  }

  if (slugs.has(prompt.slug)) {
    fail(`${label} duplicates an existing slug.`);
  }
  slugs.add(prompt.slug);

  for (const field of ["title", "category", "useCase", "prompt", "expectedOutput", "revisionStep", "safetyPrivacyNote"]) {
    if (typeof prompt[field] !== "string" || prompt[field].trim().length < 8) {
      fail(`${label} has an empty or too-short "${field}" field.`);
    }
  }

  for (const field of ["relatedCourses", "relatedArtifacts", "teacherContextNeeded", "verificationChecklist", "tags"]) {
    if (!Array.isArray(prompt[field]) || prompt[field].length === 0) {
      fail(`${label} must include at least one item in "${field}".`);
    }
  }

  for (const course of prompt.relatedCourses || []) {
    if (!allowedCourses.has(course)) {
      fail(`${label} references unknown course "${course}".`);
    }
  }

  if ((prompt.verificationChecklist || []).length < 5) {
    fail(`${label} must include at least five verification checks.`);
  }

  const combinedText = JSON.stringify(prompt).toLowerCase();
  for (const placeholder of vaguePlaceholders) {
    if (combinedText.includes(placeholder)) {
      fail(`${label} contains placeholder text "${placeholder}".`);
    }
  }

  for (const pattern of unsafeRequests) {
    if (pattern.test(prompt.prompt || "")) {
      fail(`${label} asks for private student data or credentials.`);
    }
  }

  const safetyText = String(prompt.safetyPrivacyNote || "").toLowerCase();
  if (
    !safetyText.includes("student") ||
    (!safetyText.includes("private") && !safetyText.includes("identifiable"))
  ) {
    fail(`${label} safety note must mention student/private data protection.`);
  }
}

if (process.exitCode) {
  process.exit(process.exitCode);
}

console.log(`Prompt library check passed. Prompts: ${prompts.length}.`);
