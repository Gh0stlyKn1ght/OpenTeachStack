import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const root = process.cwd();
const authorsRoot = path.join(root, "content", "blog", "authors");
const postsRoot = path.join(root, "content", "blog", "posts");
const draftsRoot = path.join(root, "content", "blog", "drafts");
const publicPageFiles = [
  path.join(root, "src", "app", "blog", "page.tsx"),
  path.join(root, "src", "app", "build-notes", "page.tsx"),
];

const allowedStatuses = new Set(["draft", "published"]);
const allowedSections = new Set(["author-blog", "build-notes"]);
const allowedAuthors = new Set(["JC"]);
const requiredPostFields = [
  "title",
  "slug",
  "date",
  "status",
  "author",
  "section",
  "category",
  "summary",
  "sourceSession",
  "humanReviewed",
  "published",
];
const requiredBlogSections = [
  "What happened",
  "Why it bothered me",
  "What was really going on",
  "The lesson",
  "The fix",
  "What teachers can use",
  "Final thought",
];
const bannedPublicLabels = [
  "Draft policy",
  "Human review required",
  "label: \"Published\"",
  "label: \"Rule\"",
];

let failed = false;

function fail(message) {
  failed = true;
  console.error(`Blog system check failed: ${message}`);
}

function relative(file) {
  return path.relative(root, file).replaceAll(path.sep, "/");
}

function listMarkdownFiles(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((file) => /\.(md|mdx)$/i.test(file))
    .map((file) => path.join(dir, file));
}

function hasHeading(content, level, text) {
  const escaped = text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return new RegExp(`^${"#".repeat(level)}\\s+${escaped}\\s*$`, "mi").test(content);
}

function checkAuthorProfiles() {
  for (const file of listMarkdownFiles(authorsRoot)) {
    const rel = relative(file);
    const { data } = matter(fs.readFileSync(file, "utf8"));

    for (const field of ["id", "name", "role", "human"]) {
      if (!(field in data)) fail(`${rel}: missing author field "${field}"`);
    }
  }
}

function checkPostFile(file, isDraftFolder) {
  const rel = relative(file);
  const raw = fs.readFileSync(file, "utf8");
  const { data, content } = matter(raw);

  for (const field of requiredPostFields) {
    if (!(field in data)) fail(`${rel}: missing frontmatter field "${field}"`);
  }

  if (!allowedStatuses.has(data.status)) {
    fail(`${rel}: unsupported status "${data.status}"`);
  }

  if (!allowedSections.has(data.section)) {
    fail(`${rel}: unsupported section "${data.section}"`);
  }

  if (!allowedAuthors.has(data.author)) {
    fail(`${rel}: public blog author must be "JC"`);
  }

  if (data.published === true && data.humanReviewed !== true) {
    fail(`${rel}: published post must be humanReviewed`);
  }

  if (data.published === true && data.status !== "published") {
    fail(`${rel}: published true requires status published`);
  }

  if (isDraftFolder && !content.includes("Draft for JC review. Not published.")) {
    fail(`${rel}: draft is missing visible JC review warning`);
  }

  if (hasHeading(content, 1, data.title)) {
    fail(`${rel}: body repeats the title as an H1; route header already renders it`);
  }

  if (data.section === "author-blog") {
    for (const section of requiredBlogSections) {
      if (!hasHeading(content, 2, section)) {
        fail(`${rel}: author blog post missing section "${section}"`);
      }
    }
  }
}

function checkPublicPages() {
  for (const file of publicPageFiles) {
    if (!fs.existsSync(file)) continue;
    const rel = relative(file);
    const text = fs.readFileSync(file, "utf8");

    for (const label of bannedPublicLabels) {
      if (text.includes(label)) {
        fail(`${rel}: public blog index leaks internal label "${label}"`);
      }
    }
  }
}

checkAuthorProfiles();
for (const file of listMarkdownFiles(postsRoot)) checkPostFile(file, false);
for (const file of listMarkdownFiles(draftsRoot)) checkPostFile(file, true);
checkPublicPages();

if (failed) process.exit(1);
console.log("Blog system check passed.");
