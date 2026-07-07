import { join } from "node:path";

import type { CourseRegistryRecord } from "./types";

export function coursePacketPath(record: CourseRegistryRecord): string {
  return record.sourceRoot;
}

export function coursePacketAbsolutePath(record: CourseRegistryRecord, root = process.cwd()): string {
  return join(root, record.sourceRoot);
}

export function coursePacketManifestPath(record: CourseRegistryRecord): string {
  return `${record.sourceRoot}/course.packet.json`;
}
