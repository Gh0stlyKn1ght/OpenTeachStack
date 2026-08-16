import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const evidenceDir = path.join(root, 'docs', 'architecture', 'ots-320-evidence');
const registryPath = path.join(root, 'docs', 'architecture', 'ots-320-official-sources.json');

const requiredFiles = [
  'codex-cli.json',
  'claude-code.json',
  'antigravity-cli.json',
];

const requiredFields = [
  'id',
  'kind',
  'evidenceType',
  'claim',
  'risk',
  'volatile',
  'sourceId',
  'verifiedAt',
  'courseUse',
];

const allowedEvidenceTypes = new Set(['documented', 'captured', 'emulated']);
const allowedRisk = new Set(['low', 'medium', 'high']);
const errors = [];

function fail(message) {
  errors.push(message);
}

if (!fs.existsSync(registryPath)) {
  fail(`Missing source registry: ${path.relative(root, registryPath)}`);
}

let registry = null;
let sourceIds = new Set();
if (fs.existsSync(registryPath)) {
  try {
    registry = JSON.parse(fs.readFileSync(registryPath, 'utf8'));
    for (const provider of registry.providers ?? []) {
      for (const source of provider.sources ?? []) {
        if (source.id) sourceIds.add(source.id);
      }
    }
  } catch (error) {
    fail(`Invalid source registry JSON: ${error.message}`);
  }
}

const allIds = new Set();
let evidenceCount = 0;

for (const filename of requiredFiles) {
  const filePath = path.join(evidenceDir, filename);
  if (!fs.existsSync(filePath)) {
    fail(`Missing evidence file: ${path.relative(root, filePath)}`);
    continue;
  }

  let doc;
  try {
    doc = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  } catch (error) {
    fail(`${filename}: invalid JSON: ${error.message}`);
    continue;
  }

  if (!doc.provider || !doc.product || !doc.verifiedAt) {
    fail(`${filename}: provider, product, and verifiedAt are required`);
  }
  if (!Array.isArray(doc.evidence) || doc.evidence.length === 0) {
    fail(`${filename}: evidence must be a non-empty array`);
    continue;
  }

  for (const item of doc.evidence) {
    evidenceCount += 1;
    for (const field of requiredFields) {
      if (!(field in item)) fail(`${filename}:${item.id ?? '<missing-id>'}: missing ${field}`);
    }

    if (item.id) {
      if (allIds.has(item.id)) fail(`${filename}:${item.id}: duplicate evidence id`);
      allIds.add(item.id);
    }

    if (!allowedEvidenceTypes.has(item.evidenceType)) {
      fail(`${filename}:${item.id}: invalid evidenceType ${item.evidenceType}`);
    }
    if (!allowedRisk.has(item.risk)) {
      fail(`${filename}:${item.id}: invalid risk ${item.risk}`);
    }
    if (!Array.isArray(item.courseUse) || item.courseUse.length === 0) {
      fail(`${filename}:${item.id}: courseUse must be a non-empty array`);
    }
    if (item.sourceId && !sourceIds.has(item.sourceId)) {
      fail(`${filename}:${item.id}: unknown sourceId ${item.sourceId}`);
    }
    if (item.evidenceType === 'captured' && !item.captureRef) {
      fail(`${filename}:${item.id}: captured evidence requires captureRef`);
    }

    const syntax = String(item.syntax ?? '').toLowerCase();
    if ((syntax.includes('dangerously') || syntax.includes('--yolo')) && item.risk !== 'high') {
      fail(`${filename}:${item.id}: dangerous bypass syntax must be high risk`);
    }
  }
}

if (evidenceCount < 20) {
  fail(`Evidence library is too thin: expected at least 20 items, found ${evidenceCount}`);
}

if (errors.length > 0) {
  console.error('OTS-320 CLI evidence CI failed:\n');
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(`OTS-320 CLI evidence CI passed: ${evidenceCount} evidence items across ${requiredFiles.length} providers.`);
console.log('GitHub Actions and Vercel are not required to run this check.');
