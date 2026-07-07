import { readFileSync } from "node:fs";
import { join } from "node:path";
import { listCourseRecords, readCourseRecord } from "./lib/course-registry.mjs";

const root = process.cwd();
const failures = [];

function read(relativePath) {
  return readFileSync(join(root, relativePath), "utf8");
}

function fail(message) {
  failures.push(message);
}

const readme = read("README.md");
const roadmap = read("ROADMAP.md");
const claude = read("CLAUDE.md");
const courseRecords = listCourseRecords(root);
const ots101Record = readCourseRecord("ots-101", root);
const ots101Status = ots101Record?.status ?? {};
const ots101Course = ots101Record?.course ?? {};
const laterCourseCodes = courseRecords
  .filter((record) => !["OTS-000", "OTS-101"].includes(record.code))
  .map((record) => record.code);

const forbiddenRootClaims = [
  {
    file: "README.md",
    text: readme,
    patterns: [
      /OTS-101\s*\|\s*Teaching Teachers Foundations/i,
      ...laterCourseCodes.map((code) => new RegExp(`${code}\\s*\\|[^\\n]*\\|\\s*Released`, "i")),
      /v2\.0 shipped.*OTS-101 through OTS-399 are authored/is,
      /Current OTS-101 release shape/i,
    ],
  },
  {
    file: "CLAUDE.md",
    text: claude,
    patterns: [
      /\b13 Modules\b/i,
      /content\/lessons/i,
      /Open TeachStack/i,
      /source of truth:\s*content\/lessons/i,
    ],
  },
];

for (const group of forbiddenRootClaims) {
  for (const pattern of group.patterns) {
    if (pattern.test(group.text)) {
      fail(`${group.file} contains stale course-truth claim matching ${pattern}.`);
    }
  }
}

if (!readme.includes(ots101Course.title)) {
  fail(`README.md does not name the current OTS-101 title: ${ots101Course.title}.`);
}

if (!readme.includes("Draft active rebuild")) {
  fail("README.md does not mark OTS-101 as a draft active rebuild.");
}

if (!readme.includes("Draft active preview")) {
  fail("README.md does not mark later pathway courses as draft active previews.");
}

if (!claude.includes("The full pathway is visible as an active draft preview.")) {
  fail("CLAUDE.md does not preserve the full-pathway draft-preview boundary.");
}

if (!claude.includes("No course is live until its status file says `humanReviewed: true`.")) {
  fail("CLAUDE.md does not preserve the human-review release boundary.");
}

for (const courseCode of laterCourseCodes) {
  if (!readme.includes(`${courseCode} |`) || !readme.includes(`${courseCode}`)) {
    fail(`README.md does not list ${courseCode}.`);
  }
}

if (!roadmap.includes("Current course readiness must come from `content/courses/{course}/status.json`.")) {
  fail("ROADMAP.md historical sections are not clearly subordinated to status.json.");
}

if (ots101Status.status !== "draft" || ots101Status.humanReviewed !== true) {
  fail("OTS-101 status changed; update the root-doc truth check before changing release claims.");
}

if (failures.length > 0) {
  console.error("Root doc truth check failed:");
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log("Root doc truth check passed: root Markdown matches draft-preview pathway boundaries.");
