import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join, relative } from "node:path";
import matter from "gray-matter";
import {
  findGenericAuthoringFragments,
  GENERATED_STATUSES,
  jaccardSimilarity,
  KNOWN_CONTENT_STATUSES,
  normalizeLessonBody,
  RELEASE_CONTENT_STATUSES,
  shingleSet,
} from "./lib/content-fingerprints.mjs";

const root = process.cwd();
const courseRoot = join(root, "content", "courses");
const similarityThreshold = 0.9;

function fail(message) {
  console.error(`Course content uniqueness violation: ${message}`);
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

function displayPath(filePath) {
  return relative(root, filePath).replaceAll("\\", "/");
}

if (!existsSync(courseRoot)) {
  fail("content/courses is missing.");
} else {
  const courseDirectories = readdirSync(courseRoot, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort();

  for (const courseSlug of courseDirectories) {
    const lessonsRoot = join(courseRoot, courseSlug, "lessons");
    const records = walkMdx(lessonsRoot).map((filePath) => {
      const raw = readFileSync(filePath, "utf8");
      const parsed = matter(raw);
      const status = parsed.data.migrationStatus;
      const genericFragments = findGenericAuthoringFragments(parsed.content);

      return {
        filePath,
        relativePath: displayPath(filePath),
        status,
        genericFragments,
        normalized: normalizeLessonBody(parsed.content),
      };
    });

    let generatedCount = 0;
    let releaseReadyCount = 0;

    for (const record of records) {
      if (!KNOWN_CONTENT_STATUSES.has(record.status)) {
        fail(`${record.relativePath} has unknown migrationStatus: ${record.status}.`);
        continue;
      }

      if (GENERATED_STATUSES.has(record.status)) {
        generatedCount++;
      }

      if (RELEASE_CONTENT_STATUSES.has(record.status)) {
        releaseReadyCount++;

        if (record.genericFragments.length > 0) {
          fail(
            `${record.relativePath} is ${record.status} but contains generic author-script fingerprints: ${record.genericFragments.join("; ")}`,
          );
        }
      }
    }

    const releaseReadyRecords = records
      .filter((record) => RELEASE_CONTENT_STATUSES.has(record.status))
      .map((record) => ({
        ...record,
        shingles: shingleSet(record.normalized),
      }));

    const similarGroups = [];
    const grouped = new Set();

    for (let leftIndex = 0; leftIndex < releaseReadyRecords.length; leftIndex += 1) {
      const left = releaseReadyRecords[leftIndex];
      if (grouped.has(left.relativePath)) continue;

      const group = [left];
      for (
        let rightIndex = leftIndex + 1;
        rightIndex < releaseReadyRecords.length;
        rightIndex += 1
      ) {
        const right = releaseReadyRecords[rightIndex];
        const similarity = jaccardSimilarity(left.shingles, right.shingles);
        if (similarity >= similarityThreshold) {
          group.push({ ...right, similarity });
        }
      }

      if (group.length > 1) {
        for (const item of group) grouped.add(item.relativePath);
        similarGroups.push(group);
      }
    }

    for (const group of similarGroups) {
      fail(
        `${courseSlug} has near-duplicate release-ready lesson bodies:\n${group
          .map((record) => `  - ${record.relativePath}`)
          .join("\n")}`,
      );
    }

    console.log(
      `${courseSlug}: release-ready lessons ${releaseReadyCount}; generated/scaffolded lessons ${generatedCount}.`,
    );
  }
}

if (process.exitCode) {
  process.exit(process.exitCode);
}

console.log("Course content uniqueness check passed.");
