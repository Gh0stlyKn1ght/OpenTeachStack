import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const lessonsRoot = join(root, "content", "courses", "ots-201", "lessons");

const chapters = [
  {
    slug: "01-workspace-system-mindset",
    chapter: "Workspace System Mindset",
    artifact: "Workspace workflow audit",
    scenario:
      "a teacher is turning a crowded Google Drive, scattered Docs, old slide decks, and informal transition notes into a workspace another educator can understand",
    purpose:
      "This chapter reframes Google Workspace from a set of convenient apps into an operating system for teaching work: current materials, student-facing files, evidence, permissions, and revision routines all need visible roles.",
    lessons: [
      ["01-0", "Chapter Plan", "Preview the audit that turns a loose collection of files into a maintainable workspace.", "The teacher picks one recurring workflow, such as launching a unit, collecting exit tickets, sharing lab directions, or preparing substitute materials, and traces where the files, decisions, and evidence live.", "Create the first audit row with workflow name, owner, active files, student touchpoints, evidence location, and maintenance trigger."],
      ["01-1", "Tool Collection vs Workspace System", "Distinguish having Google tools from having a workflow teachers can rely on.", "A folder full of Docs and Slides is only a tool collection until the teacher can explain which file is current, who can edit it, where student evidence goes, and when old versions move out of the way.", "Mark one current workflow as tool collection, emerging system, or reliable system, then explain the evidence for that rating."],
      ["01-2", "Teacher Workflows Google Can Support", "Choose the teaching work that benefits from Workspace structure.", "Workspace should support repeated teacher work: planning units, distributing directions, collecting evidence, reviewing student responses, sharing materials with colleagues, and archiving revisions.", "List three teacher workflows and choose one that deserves a clearer Workspace pattern first."],
      ["01-3", "Naming, Ownership, and Maintenance", "Make file names, folder owners, and update routines visible before the workspace grows.", "A strong file name tells the teacher what the file is, when it belongs, and whether it is student-facing, teacher-only, draft, current, or archived.", "Write naming and ownership rules for one folder, including who updates it and when stale material is archived."],
      ["01-4", "Workspace Workflow Audit", "Build the audit that exposes where the workflow succeeds or breaks.", "The audit should reveal friction: duplicate files, unclear permissions, missing evidence locations, private notes mixed with student-facing files, and old versions still sitting in the active path.", "Complete audit rows for at least three steps in one workflow and flag one risk in each row."],
      ["01-5", "Checkpoint Review", "Decide whether the audited workflow is ready to reorganize.", "A workspace is not ready because it looks tidy. It is ready when another teacher can find the current file, understand the student task, collect the evidence, and see how the workflow gets maintained.", "Mark each audit row ready, revise, archive, or clarify, and write the next Workspace change."],
    ],
  },
  {
    slug: "02-drive-architecture",
    chapter: "Drive Architecture",
    artifact: "Drive architecture map",
    scenario:
      "a teacher is designing Drive folders for a yearlong course so current teaching materials, student-facing files, shared team resources, and archived versions do not collide",
    purpose:
      "This chapter turns Drive into a map of teaching responsibilities. Folder structure should reduce hunting, protect private material, and make handoffs possible without turning every folder into a junk drawer.",
    lessons: [
      ["02-0", "Chapter Plan", "Plan a Drive architecture before moving files.", "The teacher sketches the folder roles first: course root, active units, student-facing exports, teacher planning, assessment evidence, shared team materials, and archive.", "Draft the top-level folder map and label each folder as active, private, shared, student-facing, or archive."],
      ["02-1", "Folders by Course, Unit, and Year", "Use course, unit, and year folders to make time and scope clear.", "A 2026 robotics unit should not sit beside a 2023 draft with the same name unless the archive path makes that difference obvious.", "Create a naming pattern for course root, unit folder, lesson file, and yearly archive."],
      ["02-2", "Shared Drives and Permissions", "Match permissions to the work people actually need to do.", "A department shared drive may hold common templates, while teacher-only planning notes stay private and student-facing directions are view-only from the classroom link.", "Add permission notes for each folder: owner, editors, viewers, student access, and restricted material."],
      ["02-3", "Archive and Version Patterns", "Keep old material available without letting it confuse current teaching.", "Archive rules prevent last year's answer key, outdated link lists, and abandoned slide decks from masquerading as current materials.", "Define when a file becomes archived, how it is named, and what stays in the active folder."],
      ["02-4", "Drive Architecture Map", "Build a Drive map another teacher could follow during a busy week.", "The map should show where to create new lesson files, where to publish student-facing copies, where evidence is stored, and where completed units go after teaching.", "Complete the Drive map with folder path, purpose, access level, owner, example files, and maintenance rule."],
      ["02-5", "Checkpoint Review", "Check whether the Drive map reduces searching and permission risk.", "A useful map answers practical questions: where is the current unit, can students see only what they should, and where does a revised file belong after class?", "Test the map with three find-this-file scenarios and revise any folder that causes hesitation."],
    ],
  },
  {
    slug: "03-docs-slides-delivery",
    chapter: "Docs and Slides Delivery",
    artifact: "Reusable Docs/Slides template set",
    scenario:
      "a teacher is creating reusable Docs and Slides so a lesson can be launched, followed, reviewed, and revised without rebuilding the delivery materials every time",
    purpose:
      "This chapter separates lesson substance from delivery format. Docs hold stable directions, teacher notes, links, accessibility supports, and revision history; Slides guide the live classroom flow without pretending to be the whole lesson.",
    lessons: [
      ["03-0", "Chapter Plan", "Plan templates before polishing individual documents.", "The teacher chooses which parts of a lesson should repeat: learning target, materials, steps, submission directions, support options, closure, and revision note.", "List the reusable sections your Doc template and Slide template both need."],
      ["03-1", "Docs as Directions and Lesson Templates", "Use Docs for directions students and teachers can return to.", "A reusable lesson Doc makes the student task, materials, links, submission evidence, and teacher setup notes easy to inspect.", "Draft the Doc template headings and mark which sections are student-facing and which are teacher-only."],
      ["03-2", "Slides as Delivery Structure", "Use Slides to pace attention, not to store the whole lesson.", "The slide deck should cue the launch question, timer, group task, check for understanding, and reflection while detailed directions live in the Doc.", "Sketch a five-slide delivery flow for one lesson and name the purpose of each slide."],
      ["03-3", "Accessibility and Student-Facing Language", "Make templates readable, navigable, and usable for students.", "Student-facing language should tell learners what to do, what to submit, where to find help, and how success will be judged without requiring teacher translation.", "Revise one direction for plain language, link clarity, headings, alt text needs, and reading load."],
      ["03-4", "Reusable Delivery Template", "Build the template set that makes future lessons faster and more consistent.", "A strong template contains useful defaults, not decorative clutter: target, materials, steps, links, evidence, check, support, closure, and revision log.", "Complete the reusable Doc and Slide template outline for one recurring lesson type."],
      ["03-5", "Checkpoint Review", "Check whether the template set supports real classroom delivery.", "The test is whether a future lesson can be created from the template without leaving missing directions, broken links, unlabeled evidence, or inaccessible media.", "Run the template against one upcoming lesson and mark each section keep, revise, add, or remove."],
    ],
  },
  {
    slug: "04-sheets-curriculum-trackers",
    chapter: "Sheets Curriculum Trackers",
    artifact: "Curriculum tracker sheet",
    scenario:
      "a teacher is using Sheets to track unit status, standards, resources, assessments, and revision notes without burying curriculum decisions in separate documents",
    purpose:
      "This chapter treats Sheets as a decision tracker rather than a spreadsheet-shaped storage closet. Each row should help the teacher see what is ready, what is missing, and what needs review.",
    lessons: [
      ["04-0", "Chapter Plan", "Plan a tracker around decisions the teacher actually revisits.", "The tracker should help answer questions during planning: which lesson is ready, what standard does it address, what source supports it, what evidence is collected, and what must be revised?", "Draft the tracker columns for lesson, target, standard, resource, evidence, status, owner, and revision note."],
      ["04-1", "Rows, Columns, and Teacher Decisions", "Design rows and columns so each cell has a clear job.", "A row should represent one lesson or task, while columns capture decisions that change over time. Notes that require paragraphs belong in linked Docs, not crowded cells.", "Define what one row represents and write rules for three columns that are often misused."],
      ["04-2", "Tracking Standards and Lessons", "Connect standards to lessons without creating fake alignment.", "The tracker should show why a lesson belongs to a standard and what evidence proves the target, not simply paste a standard code beside every activity.", "Add standard code, target, evidence, and alignment note fields for three lessons."],
      ["04-3", "Tracking Resources and Assessment Evidence", "Keep resource choices and evidence locations visible.", "When a resource, assessment, or student evidence folder changes, the tracker should reveal the impact on the lesson sequence.", "Add resource link, license or source note, evidence location, and review date to one tracker section."],
      ["04-4", "Curriculum Tracker", "Build the tracker that lets a teacher scan the course status quickly.", "The tracker should separate ready lessons from drafts, missing resources, unverified links, assessment gaps, and items that need peer review.", "Complete at least six tracker rows and use status values consistently."],
      ["04-5", "Checkpoint Review", "Check whether the tracker changes teacher decisions.", "A tracker that no one uses is extra work. A useful tracker tells the teacher what to teach next, what not to publish yet, and what needs review before class.", "Use the tracker to make three decisions: ready to teach, needs revision, and archive or remove."],
    ],
  },
  {
    slug: "05-forms-calendar-operations",
    chapter: "Forms and Calendar Operations",
    artifact: "Operations workflow map",
    scenario:
      "a teacher is connecting Forms, response Sheets, Calendar events, due dates, reminders, and maintenance routines so classroom operations do not depend on memory",
    purpose:
      "This chapter uses Workspace tools for operational rhythm: collecting information, checking understanding, scheduling work, reminding learners, and closing the loop after responses arrive.",
    lessons: [
      ["05-0", "Chapter Plan", "Plan the operations flow before creating forms and calendar events.", "The teacher names what information must be collected, who needs it, when it is reviewed, and what action follows the response.", "Sketch one operations flow from trigger to form, response sheet, calendar reminder, teacher action, and archive."],
      ["05-1", "Forms as Checks for Understanding", "Use Forms when response patterns should guide the next teaching move.", "A quick Form can show which students understand the concept, but only if the teacher decides how responses will be reviewed and acted on.", "Draft a three-question check and write what each response pattern will cause the teacher to do."],
      ["05-2", "Forms as Intake and Reflection", "Collect planning information and student reflection without creating data clutter.", "An intake or reflection Form should collect only information the teacher will actually use, store it in a named response Sheet, and avoid unnecessary private details.", "Revise one form prompt for purpose, privacy, response usefulness, and follow-up action."],
      ["05-3", "Calendar as Pacing and Maintenance", "Use Calendar to protect teaching time and workspace maintenance.", "Calendar events can hold lesson launch dates, review windows, grading blocks, resource checks, and archive routines so maintenance does not vanish after delivery.", "Create a calendar pattern for one unit: teach dates, response review, feedback return, and archive check."],
      ["05-4", "Operations Workflow Map", "Build the map that connects forms, sheets, calendar events, and teacher actions.", "The map should show what starts the workflow, where responses go, who reviews them, when action happens, and how the workflow closes.", "Complete the operations map with trigger, tool, data captured, review time, action, owner, and archive rule."],
      ["05-5", "Checkpoint Review", "Check whether the operations workflow prevents missed follow-through.", "The workflow is ready when response data leads to a scheduled action instead of sitting unread in a response Sheet.", "Test one workflow with a sample response and revise the first place where the next action is unclear."],
    ],
  },
  {
    slug: "06-workspace-command-center",
    chapter: "Workspace Command Center",
    artifact: "Workspace command center",
    scenario:
      "a teacher is assembling one command center that links the Drive map, templates, tracker, operations map, maintenance checklist, and review routine for an active course",
    purpose:
      "This chapter pulls the Workspace pieces into a usable command center. The goal is not a pretty dashboard; it is a reliable home base for daily teaching work and periodic maintenance.",
    lessons: [
      ["06-0", "Chapter Plan", "Plan the command center around teacher actions.", "The command center should answer: what am I teaching now, what needs review, where is the evidence, what is blocked, and what gets archived next?", "List the command center sections: current unit, active links, tracker status, operations queue, maintenance checklist, and revision log."],
      ["06-1", "Command Center Requirements", "Decide what belongs on the home base and what should stay linked.", "A command center should not copy every file into one giant document. It should link to the right artifacts and show enough status for a teacher to act quickly.", "Write requirements for links, status labels, owners, update frequency, and private material boundaries."],
      ["06-2", "Maintenance Checklist", "Create the routine that keeps the workspace from decaying.", "Maintenance includes checking links, archiving old files, reviewing permissions, updating tracker status, cleaning response Sheets, and recording revisions after teaching.", "Build a recurring checklist with daily, weekly, unit-end, and term-end tasks."],
      ["06-3", "Peer Review and Revision", "Use another educator to find unclear workspace decisions.", "A peer reviewer should be able to find the current lesson, identify student-facing files, explain where evidence goes, and name the maintenance routine.", "Record three reviewer prompts and the revision you will make for each response."],
      ["06-4", "Workspace Command Center", "Build the home base for the course workspace.", "The command center brings together the folder map, templates, tracker, forms/calendar workflow, maintenance checklist, and revision log in one navigable place.", "Complete the command center with section links, status labels, owner notes, and next maintenance date."],
      ["06-5", "Checkpoint Review", "Check whether the command center can support a real teaching week.", "The command center is ready when the teacher can start a lesson, collect evidence, review responses, update status, and archive old work without hunting.", "Run a teaching-week walkthrough and mark each command center section ready, revise, missing, or too cluttered."],
    ],
  },
];

function splitFrontmatter(source) {
  const match = source.match(/^---\r?\n[\s\S]*?\r?\n---\r?\n?/);
  if (!match) throw new Error("Missing frontmatter");
  return match[0].trimEnd();
}

function lessonBody({ chapter, artifact, scenario, purpose }, [, title, target, core, artifactAction]) {
  const isPlan = title === "Chapter Plan";
  const isCheckpoint = title === "Checkpoint Review";
  const isArtifact = /Audit|Map|Template|Tracker|Command Center/.test(title) && !isPlan && !isCheckpoint;

  const workHeading = isArtifact ? "Build The Artifact" : isCheckpoint ? "Review The System" : "Workspace Move";
  const workIntro = isArtifact
    ? `Build the **${artifact}** so the workspace decision can be inspected and reused.`
    : isCheckpoint
      ? `Use this checkpoint to test whether the workspace pattern would survive a normal school week.`
      : `Make the idea visible by updating the **${artifact}** with a real course or unit example.`;

  return `# ${title}

## Why This Matters

Teachers often know where things are because they built the workspace themselves. That is useful until the course grows, a colleague needs access, a student link breaks, or old material starts competing with the current version.

A workspace system works when current materials, student-facing links, evidence locations, permissions, and maintenance routines are clear enough for another educator to inspect.

In **${chapter}**, the work is to make Google Workspace decisions visible enough that another educator can understand the workflow, not just admire a tidy folder.

${purpose}

## Core Idea

${target}

${core}

## Classroom Example

Use this working situation: ${scenario}.

For a middle school robotics course, the teacher keeps one active unit folder, a student-facing directions Doc, a short launch deck, a response Sheet for exit tickets, and an archive folder for older versions. The system works only if the teacher can tell which file is current, who can edit it, where student evidence lands, and when cleanup happens.

Example:

| Workspace decision | Classroom version |
| --- | --- |
| Current material | The active lesson Doc is linked from the unit tracker and command center. |
| Student access | Students receive view-only directions and submit evidence through the named form or assignment link. |
| Teacher evidence | Responses, revision notes, and assessment status have visible locations. |
| Maintenance rule | After teaching, the teacher updates status, archives old files, and records the next revision. |

## ${workHeading}

${workIntro}

Add or revise this entry:

| Field | Your note |
| --- | --- |
| Lesson focus | ${title} |
| Workspace object | Folder, Doc, Slide deck, Sheet, Form, Calendar event, or command center section |
| Classroom purpose | What teaching work this object supports |
| Access and owner | Who can view, edit, maintain, or archive it |
| Evidence or status | Where student work, teacher decisions, or readiness status will appear |
| Artifact work | ${artifactAction} |

## Quality Check

Before moving on, test the entry with a busy-week question: could another teacher find the current material, use it with students, collect the evidence, and know what to update afterward?

If the answer depends on your memory, revise the artifact until the workflow is visible.

## Reflection

What part of this workspace currently depends too much on one person's memory? Write the next change that would make it easier to hand off, repeat, or maintain.
`;
}

for (const chapter of chapters) {
  for (const lesson of chapter.lessons) {
    const [file] = lesson;
    const filePath = join(lessonsRoot, chapter.slug, `${file}.mdx`);
    const frontmatter = splitFrontmatter(readFileSync(filePath, "utf8"));
    writeFileSync(filePath, `${frontmatter}\n${lessonBody(chapter, lesson)}`, "utf8");
  }
}

console.log("Rewrote OTS-201 lesson bodies.");
