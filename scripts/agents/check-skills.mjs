import { readFile, readdir } from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';

const root = process.cwd();
const canonicalRoot = path.join(root, '.agents', 'skills');
const claudeRoot = path.join(root, '.claude', 'skills');
const expected = [
  'ots-agent-safety',
  'ots-cli-lesson-author',
  'ots-cli-verifier',
  'ots-course-audit',
  'ots-cross-agent-compare',
  'ots-git-evidence',
  'ots-official-docs',
  'ots-terminal-emulator',
].sort();

const errors = [];
const normalize = (value) => value.replace(/\r\n/g, '\n').trimEnd();

async function skillNames(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  return entries.filter((entry) => entry.isDirectory()).map((entry) => entry.name).sort();
}

const canonicalNames = await skillNames(canonicalRoot);
for (const name of expected) {
  if (!canonicalNames.includes(name)) errors.push(`Missing canonical skill: ${name}`);
}

for (const name of canonicalNames) {
  const canonicalPath = path.join(canonicalRoot, name, 'SKILL.md');
  const claudePath = path.join(claudeRoot, name, 'SKILL.md');
  let canonical;
  let claude;

  try {
    canonical = await readFile(canonicalPath, 'utf8');
  } catch {
    errors.push(`Missing SKILL.md: .agents/skills/${name}/SKILL.md`);
    continue;
  }

  if (!/^---\n[\s\S]*?\n---\n/.test(normalize(canonical))) {
    errors.push(`Missing YAML frontmatter: ${canonicalPath}`);
  }
  if (!/^---\n[\s\S]*?\nname:\s*[^\n]+/m.test(normalize(canonical))) {
    errors.push(`Missing frontmatter name: ${canonicalPath}`);
  }
  if (!/^---\n[\s\S]*?\ndescription:\s*[^\n]+/m.test(normalize(canonical))) {
    errors.push(`Missing frontmatter description: ${canonicalPath}`);
  }

  try {
    claude = await readFile(claudePath, 'utf8');
  } catch {
    errors.push(`Missing Claude mirror: .claude/skills/${name}/SKILL.md`);
    continue;
  }

  if (normalize(canonical) !== normalize(claude)) {
    errors.push(`Claude mirror drift: ${name}. Run npm run skills:sync`);
  }
}

if (errors.length) {
  console.error('Agent skill CI failed:');
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(`Agent skill CI passed: ${expected.length} canonical skills and Claude mirrors verified.`);
