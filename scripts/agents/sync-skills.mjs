import { cp, mkdir, readdir, rm } from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';

const root = process.cwd();
const sourceRoot = path.join(root, '.agents', 'skills');
const targetRoot = path.join(root, '.claude', 'skills');

const entries = await readdir(sourceRoot, { withFileTypes: true });
const skills = entries.filter((entry) => entry.isDirectory()).map((entry) => entry.name).sort();

await mkdir(targetRoot, { recursive: true });

for (const skill of skills) {
  const source = path.join(sourceRoot, skill);
  const target = path.join(targetRoot, skill);
  await rm(target, { recursive: true, force: true });
  await cp(source, target, { recursive: true });
}

console.log(`Synced ${skills.length} canonical skills to .claude/skills.`);
