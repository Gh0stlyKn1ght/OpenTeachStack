import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import matter from "gray-matter";

const args = process.argv.slice(2);
const force = args.includes("--force");
const dryRun = args.includes("--dry-run");

const root = process.cwd();
const courseSlug = "ots-260";
const courseRoot = join(root, "content", "courses", courseSlug);

const chapterGuides = {
  "01-media-with-purpose": {
    focus: "choosing media because it clarifies learning, not because it decorates a page or slide",
    decision: "which lesson moment deserves media and which moments should stay simple",
    caution: "the media adds load, distraction, or inaccessible information without improving the lesson",
  },
  "02-ai-image-workflows": {
    focus: "prompting, reviewing, revising, and documenting AI-generated images for instructional use",
    decision: "whether an image is accurate, necessary, accessible, and permitted for the teaching context",
    caution: "an AI image invents details, misrepresents people or cultures, or hides important content from screen readers",
  },
  "03-diagrams-visual-explanations": {
    focus: "turning a process, comparison, system, or misconception into a diagram students can actually use",
    decision: "what relationships should be shown visually and what explanation still belongs in text",
    caution: "the diagram looks polished but leaves out labels, sequence, scale, or accessibility alternatives",
  },
  "04-slides-delivery-routines": {
    focus: "building slide routines that support delivery, pacing, practice, and student attention",
    decision: "what belongs on the slide, what belongs in teacher notes, and what belongs in a student handout",
    caution: "slides become a script dump or visual performance instead of a delivery tool",
  },
  "05-short-video-screen-recording": {
    focus: "planning short recordings that demonstrate one useful action, explanation, or review step",
    decision: "what to record, what to leave out, and what needs a transcript, captions, or text alternative",
    caution: "the recording exposes private tabs, notifications, filenames, student data, or unnecessary personal context",
  },
  "06-accessible-media-packet": {
    focus: "assembling media, source notes, alt text, captions, transcripts, and delivery guidance into one usable packet",
    decision: "whether the packet is clear enough to reuse, share, revise, and audit later",
    caution: "the packet depends on one format, one device, one network condition, or one inaccessible visual explanation",
  },
};

function sectionMode(type, artifact, chapterArtifact) {
  if (type === "overview") {
    return {
      action: "preview the chapter goal and choose the lesson moment you will improve",
      evidence: "a short orientation note for the chapter artifact",
      review: "the chosen lesson moment has a real instructional purpose and a known access need",
    };
  }
  if (type === "artifact" || type === "studio") {
    return {
      action: `build or revise the ${artifact ?? chapterArtifact}`,
      evidence: artifact ?? chapterArtifact,
      review: "the artifact includes source notes, access alternatives, and a revision decision",
    };
  }
  if (type === "checkpoint") {
    return {
      action: "review the artifact and name the next improvement before publishing or teaching with it",
      evidence: "a checkpoint note",
      review: "the checkpoint confirms the media still works without private, inaccessible, or unsupported details",
    };
  }
  if (type === "workshop") {
    return {
      action: "practice the workflow on one small lesson example before scaling it",
      evidence: "a workshop draft or annotated example",
      review: "the draft is small enough to revise and safe enough to discuss with colleagues",
    };
  }
  return {
    action: "make one concrete media decision and explain why it helps the learner",
    evidence: "a media decision note or draft artifact component",
    review: "the decision improves clarity, access, or delivery without adding unnecessary production work",
  };
}

function bodyFor(chapter, section) {
  const guide = chapterGuides[chapter.slug] ?? {
    focus: "building useful lesson media",
    decision: "what media decision belongs in this section",
    caution: "the media creates confusion, access barriers, or unnecessary risk",
  };
  const mode = sectionMode(section.type, section.artifact, chapter.buildArtifact);
  const artifact = section.artifact ?? chapter.buildArtifact;

  return `# ${section.title}

## Core Idea

${chapter.title} is about ${guide.focus}. In this section, **${section.title}** turns that focus into a practical authoring move for one lesson.

The useful question is not "Can I make this look impressive?" The useful question is "Will this media help students understand, practice, review, or revisit the learning target?" A teacher should leave this section with a visible piece of the chapter artifact: **${chapter.buildArtifact}**.

## Do This

- Name the specific lesson moment connected to ${section.title}.
- Use this section to ${mode.action}.
- Write the learning purpose before choosing the visual, slide, diagram, recording, or packet format.
- Add an access note that names the needed alternative: alt text, captions, transcript, readable text, source note, or nonvisual explanation.
- Save the work as part of the chapter artifact: ${chapter.buildArtifact}.

## Evidence of Completion

- ${mode.evidence} exists for ${section.title}.
- The evidence connects directly to ${artifact}.
- The work states what students should do with the media, not only what they should look at.
- Source, tool, copyright, or platform details are attached when the media depends on an external service or reusable asset.
- A revision note names one thing to simplify, clarify, caption, label, cite, or remove before classroom use.

## Accessibility and Safety Review

- Check for the chapter caution: ${guide.caution}.
- ${mode.review}.
- Avoid student-identifiable information, private filenames, hidden tabs, account details, location clues, and copyrighted material that is not licensed or otherwise allowed.
- Confirm essential information is available as text or spoken/written explanation, not only inside an image, slide, or video frame.
- Test whether the media still works on a projector-sized display and a mobile-sized display.

## Reflection

What is one media choice from this section that makes the lesson easier to teach or easier for students to revisit later?
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
      throw new Error(`Missing OTS-260 course lesson file: ${chapter.slug}/${sectionSlug}.mdx`);
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
      artifact: parsed.data.artifact,
    };

    if (dryRun) {
      console.log(`[dry-run] WRITE: ${relativePath}`);
      updated++;
      continue;
    }

    parsed.data.migrationStatus = "generated";
    parsed.content = bodyFor(chapter, section);
    writeFileSync(filePath, matter.stringify(parsed.content, parsed.data));
    updated++;
  }
}

if (force || courseJson.migrationStatus !== "generated") {
  if (dryRun) {
    console.log(`[dry-run] WRITE: course.json`);
  } else {
    courseJson.migrationStatus = "generated";
    writeFileSync(courseJsonPath, `${JSON.stringify(courseJson, null, 2)}\n`);
  }
}

const mode = dryRun ? "[DRY RUN] " : "";
console.log(`${mode}Generated ${updated} OTS-260 section files; preserved ${skipped} existing generated files.${force ? " (--force)" : ""}`);
if (!dryRun && skipped > 0 && !force) {
  console.log(`${skipped} non-generated or non-scaffolded files were preserved. Use --force to overwrite.`);
}

