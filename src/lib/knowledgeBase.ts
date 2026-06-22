import fs from "fs";
import path from "path";

export interface KnowledgeBaseCategory {
  label: string;
  href: string;
}

export interface KnowledgeBaseSearchRecord {
  title: string;
  href: string;
  eyebrow: string;
  description: string;
  keywords: string[];
}

const KB_ROOT = path.join(process.cwd(), "src", "app", "kb");
const KB_CATEGORY_META = path.join(KB_ROOT, "_meta.ts");

const KEYWORD_BLACKLIST = new Set([
  "the",
  "and",
  "for",
  "this",
  "that",
  "with",
  "from",
  "your",
  "you",
  "are",
  "all",
  "any",
  "not",
  "when",
  "how",
  "into",
  "its",
  "their",
  "them",
]);

function safeCategoryMap(): Map<string, string> {
  if (!fs.existsSync(KB_CATEGORY_META)) {
    return new Map();
  }

  const raw = fs.readFileSync(KB_CATEGORY_META, "utf-8");
  const map = new Map<string, string>();
  const lines = raw.matchAll(
    /["']([^"']+)["']\s*:\s*["']([^"']+)["']/g,
  );

  for (const match of lines) {
    const [, slug, label] = match;
    map.set(slug, label);
  }

  return map;
}

function slugToLabel(slug: string): string {
  return slug
    .split("-")
    .map((part) => {
      if (part.length === 0) return "";

      if (part.toLowerCase() === "ai") return "AI";
      if (part.toLowerCase() === "and") return "and";
      if (part.toLowerCase() === "its") return "ITS";

      return part[0].toUpperCase() + part.slice(1);
    })
    .filter(Boolean)
    .join(" ");
}

function normalizeCategoryLabel(slug: string, map: Map<string, string>): string {
  return map.get(slug) ?? slugToLabel(slug);
}

function walkKbFiles(root: string): string[] {
  if (!fs.existsSync(root)) return [];

  const out: string[] = [];
  for (const entry of fs.readdirSync(root, { withFileTypes: true })) {
    if (entry.name.startsWith("_") || entry.name === "node_modules") continue;

    const full = path.join(root, entry.name);
    if (entry.isDirectory()) {
      out.push(...walkKbFiles(full));
      continue;
    }

    if (
      entry.isFile() &&
      entry.name.endsWith(".mdx") &&
      entry.name !== "index.mdx"
    ) {
      out.push(full);
    }
  }

  return out;
}

function parseMetadataFromKbxFile(
  raw: string,
): { title?: string; description?: string } {
  const metadataMatch = raw.match(
    /export\s+const\s+metadata\s*=\s*{[\s\S]*?}\s*;?/,
  );
  if (!metadataMatch) return {};

  const block = metadataMatch[0];
  const title = block.match(
    /title\s*:\s*["']([^"']+)["']/,
  )?.[1];
  const description = block.match(
    /description\s*:\s*["']([^"']+)["']/,
  )?.[1];

  return { title, description };
}

function parseFirstSentence(raw: string): string {
  const body = raw.replace(
    /export\s+const\s+metadata\s*=\s*{[\s\S]*?}\s*;?\s*/m,
    "",
  );
  const lines = body.split(/\r?\n/).map((line) => line.trim());

  for (const line of lines) {
    if (!line || line.startsWith("#") || line.startsWith("---")) continue;
    if (line.startsWith("export")) continue;
    if (line.startsWith("|") || line.startsWith("-")) continue;
    if (line.length < 16) continue;

    return line;
  }

  return "Teaching Teachers knowledge base article.";
}

function parseTitleFromBody(raw: string): string | undefined {
  const match = raw.match(/^#\s+(.+)$/m);
  return match?.[1]?.trim();
}

function wordsFromTitle(value: string): string[] {
  return value
    .toLowerCase()
    .match(/[a-z0-9]+/g)
    ?.filter((word) => !KEYWORD_BLACKLIST.has(word)) ?? [];
}

function uniqueKeywords(values: string[]): string[] {
  return [...new Set(values)]
    .filter(Boolean)
    .filter((value) => value.length > 1)
    .slice(0, 24);
}

function routeFromRelative(relativePath: string): string {
  const routePath = relativePath.replace(/\\/g, "/").replace(/\.mdx$/i, "");
  if (routePath === "page") return "/kb";
  if (routePath.endsWith("/page")) return `/kb/${routePath.slice(0, -5)}`;
  return `/kb/${routePath}`;
}

function gatherCategoryLabelBySlug(slug: string): string {
  const topMeta = safeCategoryMap();
  return normalizeCategoryLabel(slug, topMeta);
}

function toRecord(filePath: string, relativePath: string): KnowledgeBaseSearchRecord {
  const raw = fs.readFileSync(filePath, "utf-8");
  const metadata = parseMetadataFromKbxFile(raw);
  const title = metadata.title ?? parseTitleFromBody(raw) ?? "Knowledge Base Article";
  const description =
    metadata.description ?? parseFirstSentence(raw) ?? "Source-backed teaching guidance.";
  const href = routeFromRelative(relativePath);
  const relWithoutExt = relativePath.replace(/\.mdx$/i, "");
  const segments = relWithoutExt.split(path.sep);
  const categorySlug =
    segments[0] && segments[0] !== "page" ? segments[0] : "knowledge-base";
  const categoryLabel = gatherCategoryLabelBySlug(categorySlug);

  const pathWords = segments
    .flatMap((segment) =>
      segment
        .replace(/-/g, " ")
        .toLowerCase()
        .split(/\s+/),
    )
    .filter(Boolean);

  return {
    title,
    href,
    eyebrow: categoryLabel,
    description,
    keywords: uniqueKeywords([
      categorySlug,
      ...pathWords,
      ...wordsFromTitle(title),
      ...title.toLowerCase().match(/[a-z0-9]+/g) ?? [],
    ]),
  };
}

export function getKnowledgeBaseCategories(): KnowledgeBaseCategory[] {
  const topCategoryMeta = safeCategoryMap();
  const categoryOrder = Array.from(topCategoryMeta.keys());
  const categoryEntries = fs
    .readdirSync(KB_ROOT, { withFileTypes: true })
    .filter((entry) => entry.isDirectory() && !entry.name.startsWith("_"))
    .map((entry) => entry.name);

  const sortedCategories = categoryEntries.sort((a, b) => {
    const aIndex = categoryOrder.indexOf(a);
    const bIndex = categoryOrder.indexOf(b);

    if (aIndex === -1 && bIndex === -1) return a.localeCompare(b);
    if (aIndex === -1) return 1;
    if (bIndex === -1) return -1;
    return aIndex - bIndex;
  });

  return sortedCategories
    .map((categorySlug) => {
      const candidateFiles = walkKbFiles(path.join(KB_ROOT, categorySlug));

      const preferred = candidateFiles.find((filePath) =>
        filePath.endsWith(`${path.sep}page.mdx`),
      );
      const chosenFile = preferred ?? candidateFiles.sort()[0];
      if (!chosenFile) return null;

      const relative = path.relative(KB_ROOT, chosenFile);
      const href = routeFromRelative(relative);
      return {
        label: normalizeCategoryLabel(categorySlug, topCategoryMeta),
        href,
      };
    })
    .filter(
      (entry): entry is KnowledgeBaseCategory => entry !== null && Boolean(entry.href),
    );
}

export function getKnowledgeBaseSearchRecordsFromFiles(): KnowledgeBaseSearchRecord[] {
  return walkKbFiles(KB_ROOT)
    .map((filePath) => {
      const relativePath = path.relative(KB_ROOT, filePath);
      return toRecord(filePath, relativePath);
    })
    .filter((record) => record.title && record.description)
    .sort((a, b) => {
      if (a.eyebrow !== b.eyebrow) {
        return a.eyebrow.localeCompare(b.eyebrow);
      }
      return a.title.localeCompare(b.title);
    });
}
