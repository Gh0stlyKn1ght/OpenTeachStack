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

if (!readme.includes("Coming Soon")) {
  fail("README.md does not mark future pathway courses as Coming Soon.");
}

if (!claude.includes("Only OTS-101 is the active rebuild.")) {
  fail("CLAUDE.md does not preserve the active OTS-101-only boundary.");
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

console.log("Root doc truth check passed: root Markdown matches OTS-101 draft and Coming Soon pathway boundaries.");
