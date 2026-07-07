import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { assertCourseWriteAllowed } from "./lib/course-locks.mjs";
import matter from "gray-matter";

const args = process.argv.slice(2);
const force = args.includes("--force");
const dryRun = args.includes("--dry-run");

const root = process.cwd();
const courseSlug = "ots-280";
const courseRoot = join(root, "content", "courses", courseSlug);

function sectionMode(type, artifact, chapterArtifact) {
  if (type === "overview") {
    return {
      action: "preview the chapter risk and choose the artifact you will build",
      evidence: "a chapter orientation note",
      safety: "the sensitive details that should stay private are named before the work begins",
    };
  }
  if (type === "artifact" || type === "studio") {
    return {
      action: `build or revise the ${artifact ?? chapterArtifact}`,
      evidence: artifact ?? chapterArtifact,
      safety: "the artifact uses sanitized examples and does not expose private values",
    };
  }
  if (type === "checkpoint") {
    return {
      action: "review the chapter artifact and choose one maintenance step",
      evidence: "a checkpoint note",
      safety: "the checkpoint does not publish sensitive account, device, profile, or incident details",
    };
  }
  return {
    action: "apply the safety habit to one real account, device, profile, site, repo, message, or workflow",
    evidence: "a short safety note, checklist item, audit result, or action log",
    safety: "the note is safe to share because live identifiers and private details are redacted",
  };
}

const chapterGuides = {
  "01-teacher-threat-model": {
    focus: "mapping realistic teacher risks without turning safety work into fear-based noise",
    decision: "what actually needs protection and what can be ignored for now",
    risk: "publishing a detailed risk map that reveals personal routines, locations, accounts, or vulnerabilities",
  },
  "02-account-hygiene-mfa": {
    focus: "reducing account compromise through inventory, unique passwords, MFA, and recovery hygiene",
    decision: "which accounts deserve priority maintenance first",
    risk: "recording passwords, recovery codes, MFA backup codes, or account secrets in a shared file or AI prompt",
  },
  "03-usernames-identity-separation": {
    focus: "separating personal, school, and public educator identity signals when connection creates unnecessary exposure",
    decision: "which usernames, photos, bios, or contact paths should stay connected or separate",
    risk: "sharing a map that connects private profiles, school accounts, family details, or student-facing identities",
  },
  "04-email-phishing-impersonation": {
    focus: "building a calm stop-check-report routine for suspicious messages",
    decision: "what to do before clicking, replying, forwarding, downloading, or entering credentials",
    risk: "investigating by interacting with the suspicious message or pasting private email content into an AI tool",
  },
  "05-social-media-doxxing": {
    focus: "reducing public profile details that reveal location, routines, family information, students, or unsafe contact paths",
    decision: "what public details should be kept, revised, removed, or reviewed against policy",
    risk: "publishing screenshots or examples that reveal the very profile details the audit is meant to reduce",
  },
  "06-vpns-wifi-location": {
    focus: "understanding what public networks, HTTPS, VPNs, and location signals do and do not protect",
    decision: "which teacher tasks should wait for a trusted network or device",
    risk: "treating a VPN as protection from phishing, malware, weak passwords, school policy, or unsafe sharing",
  },
  "07-browser-device-file-safety": {
    focus: "cleaning everyday browser, device, download, screenshot, permission, and metadata risks",
    decision: "what to remove, update, lock, inspect, or escalate before publishing more work",
    risk: "uploading private files or student screenshots to random scanners, converters, or AI tools",
  },
  "08-website-safety": {
    focus: "checking teacher sites for private files, student exposure, unsafe forms, embeds, downloads, contact paths, and tracking",
    decision: "what should be public, private, revised, removed, or escalated before sharing",
    risk: "publishing private Drive links, rosters, schedules, API keys, student work, or forms that collect unnecessary data",
  },
  "09-github-domains-repos": {
    focus: "reviewing public repositories, commit history, README details, domains, and contact exposure before sharing links",
    decision: "what must be removed, rotated, redacted, or moved private before public release",
    risk: "assuming deleting a visible secret fixes exposure instead of rotating it and reviewing history",
  },
  "10-incident-response": {
    focus: "creating a first-hour plan for account compromise, phishing clicks, exposure, harassment, lost devices, or unsafe publishing",
    decision: "who to contact, what to document, what not to touch, and when to escalate",
    risk: "deleting evidence, confronting attackers, delaying reports, or trying to handle serious danger alone",
  },
};

function bodyFor(chapter, section) {
  const guide = chapterGuides[chapter.slug] ?? {
    focus: "practical safety habits for educators",
    decision: "what safety action belongs in this section",
    risk: "sharing sensitive details while documenting safety work",
  };
  const mode = sectionMode(section.type, section.artifact, chapter.buildArtifact);
  const artifact = section.artifact ?? chapter.buildArtifact;

  return `# ${section.title}

## Core Idea

${chapter.title} is about ${guide.focus}. In this section, **${section.title}** turns that chapter focus into one practical teacher safety habit.

The goal is not to make teachers paranoid or technical for its own sake. The goal is to help a teacher decide ${guide.decision} and leave behind a safe, maintainable artifact: **${chapter.buildArtifact}**.

\${richContent}\n\n## Do This

${[
  `Name the specific safety problem connected to ${section.title}.`,
  `Use this section to ${mode.action}.`,
  "Work with sanitized notes, fictional examples, or private local records instead of publishing sensitive details.",
  `Record the teacher decision you made about ${guide.decision}.`,
  `Save the result where it can support the chapter artifact: ${chapter.buildArtifact}.`,
].map((item, i) => (section.lessonType === "artifact-build" || section.lessonType === "workflow") ? `${i + 1}. ${item}` : `- ${item}`).join("\n")}

## Evidence of Completion

- ${mode.evidence} exists for ${section.title}.
- The evidence connects to ${artifact}.
- The work names one real teacher context without exposing private details.
- Any advice that depends on platform behavior, policy, reporting, or account security is attached to an official source or queued for verification.
- A revision or maintenance note explains what should be checked again later.

## Safety Check

- Do not include student-identifiable information, passwords, recovery codes, MFA backup codes, account secrets, private links, hidden answer keys, or live incident details.
- Check for the chapter risk: ${guide.risk}.
- ${mode.safety}.
- Escalate to district IT, administration, platform support, or appropriate authorities when the situation exceeds normal teacher maintenance.
- Keep a private version of sensitive notes and share only sanitized summaries for review.

## Reflection

What is one concrete change from this section that would reduce risk without making your teaching workflow harder to maintain?
`;
}

const courseJsonPath = join(courseRoot, "course.json");
const courseJson = JSON.parse(readFileSync(courseJsonPath, "utf8"));
let updated = 0;
let skipped = 0;

for (const chapter of courseJson.chapters) {
  for (let index = 0; index < chapter.lessonCount; index++) {
    const sectionSlug = `${chapter.number}-${index}`;
    const relativePath = `lessons/${chapter.slug}/${sectionSlug}.mdx`;
    const filePath = join(courseRoot, relativePath);
    if (!existsSync(filePath)) {
      throw new Error(`Missing OTS-280 course lesson file: ${chapter.slug}/${sectionSlug}.mdx`);
    }

    const parsed = matter(readFileSync(filePath, "utf8"));
    if (!force && parsed.data.migrationStatus !== "scaffolded") {
      skipped++;
      continue;
    }

    const section = {
      number: parsed.data.sectionNumber,
      title: parsed.data.title,
      type: parsed.data.type,
      lessonType: parsed.data.lessonType,
      artifact: parsed.data.artifact,
    };

    if (dryRun) {
      console.log(`[dry-run] WRITE: ${relativePath}`);
      updated++;
      continue;
    }

    parsed.data.migrationStatus = "generated";
    parsed.content = bodyFor(chapter, section);
    assertCourseWriteAllowed(filePath, { operation: "write lesson body" });
    writeFileSync(filePath, matter.stringify(parsed.content, parsed.data));
    updated++;
  }
}

if (force || courseJson.migrationStatus !== "generated") {
  if (dryRun) {
    console.log(`[dry-run] WRITE: course.json`);
  } else {
    courseJson.migrationStatus = "generated";
    assertCourseWriteAllowed(courseJsonPath, { operation: "write course metadata" });
    writeFileSync(courseJsonPath, `${JSON.stringify(courseJson, null, 2)}\n`);
  }
}

const mode = dryRun ? "[DRY RUN] " : "";
console.log(`${mode}Generated ${updated} OTS-280 section files; preserved ${skipped} existing generated files.${force ? " (--force)" : ""}`);
if (!dryRun && skipped > 0 && !force) {
  console.log(`${skipped} non-generated or non-scaffolded files were preserved. Use --force to overwrite.`);
}

