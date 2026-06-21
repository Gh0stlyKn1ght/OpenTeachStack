import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const timeoutMs = 15000;
const scriptDir = dirname(fileURLToPath(import.meta.url));
const sourceBankPath = resolve(scriptDir, "../src/lib/sourceBank.ts");

async function loadSourceBankUrls() {
  const source = await readFile(sourceBankPath, "utf8");
  const blocks = source.match(/\{\n\s+id: [\s\S]*?\n\s+\}/g) ?? [];

  return blocks
    .map((block) => {
      const id = block.match(/id: "([^"]+)"/)?.[1];
      const name = block.match(/name: "([^"]+)"/)?.[1];
      const officialUrl = block.match(/officialUrl: "([^"]+)"/)?.[1];

      if (!id || !name || !officialUrl) return null;
      return { id, name, officialUrl };
    })
    .filter(Boolean);
}

function withTimeout(promise, ms) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), ms);
  return {
    signal: controller.signal,
    run: promise(controller.signal).finally(() => clearTimeout(timer)),
  };
}

async function checkResource(resource) {
  const { run } = withTimeout(
    (signal) =>
      fetch(resource.officialUrl, {
        method: "HEAD",
        redirect: "follow",
        signal,
      }),
    timeoutMs,
  );

  try {
    let response = await run;
    if ([403, 404, 405].includes(response.status)) {
      response = await fetch(resource.officialUrl, {
        method: "GET",
        redirect: "follow",
        signal: AbortSignal.timeout(timeoutMs),
      });
    }

    return {
      id: resource.id,
      name: resource.name,
      url: resource.officialUrl,
      status: response.status,
      ok: response.status < 400 || response.status === 403 || response.status === 429,
      finalUrl: response.url,
    };
  } catch (error) {
    return {
      id: resource.id,
      name: resource.name,
      url: resource.officialUrl,
      status: "error",
      ok: false,
      error: error instanceof Error ? error.message : String(error),
    };
  }
}

const sourceBankResources = await loadSourceBankUrls();
const results = await Promise.all(sourceBankResources.map(checkResource));
const failed = results.filter((result) => !result.ok);

for (const result of results) {
  const marker = result.ok ? "OK" : "FAIL";
  const target = result.finalUrl && result.finalUrl !== result.url
    ? ` -> ${result.finalUrl}`
    : "";
  console.log(`${marker} ${result.status} ${result.name}: ${result.url}${target}`);
  if (result.error) {
    console.log(`  ${result.error}`);
  }
}

if (failed.length > 0) {
  console.error(`\n${failed.length} source bank link(s) need review.`);
  process.exit(1);
}

console.log(`\nChecked ${results.length} source bank links.`);
