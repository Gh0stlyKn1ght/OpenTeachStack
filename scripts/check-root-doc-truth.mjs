import { readFileSync } from "node:fs";
import { join } from "node:path";

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
const ots101Status = JSON.parse(read("content/courses/ots-101/status.json"));
const ots101Course = JSON.parse(read("content/courses/ots-101/course.json"));
const laterCourseCodes = [
  "OTS-201",
  "OTS-220",
  "OTS-240",
  "OTS-260",
  "OTS-280",
  "OTS-301",
  "OTS-320",
  "OTS-399",
];

const forbiddenRootClaims = [
  {
    file: "README.md",
    text: readme,
    patterns: [
      /OTS-101\s*\|\s*Teaching Teachers Foundations/i,
      /OTS-201\s*\|[^\n]*\|\s*Released/i,
      /OTS-220\s*\|[^\n]*\|\s*Released/i,
      /OTS-240\s*\|[^\n]*\|\s*Released/i,
      /OTS-260\s*\|[^\n]*\|\s*Released/i,
      /OTS-280\s*\|[^\n]*\|\s*Released/i,
      /OTS-301\s*\|[^\n]*\|\s*Released/i,
      /OTS-320\s*\|[^\n]*\|\s*Released/i,
      /OTS-399\s*\|[^\n]*\|\s*Released/i,
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

if (ots101Status.status !== "draft" || ots101Status.humanReviewed !== false) {
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
