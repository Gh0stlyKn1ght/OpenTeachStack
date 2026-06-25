import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const lessonsRoot = join(root, "content", "courses", "ots-101", "lessons");

const chapters = [
  {
    slug: "03-ai-literacy-verification",
    chapter: "AI Literacy and Verification",
    artifact: "AI verification checklist",
    scenario:
      "a teacher is using AI to support a robotics mini-unit, but every claim, example, and student-facing direction still needs teacher review before it reaches students",
    purpose:
      "This chapter teaches the habit that AI can support drafting, comparison, and revision, while the teacher remains responsible for accuracy, privacy, representation, and classroom fit.",
    lessons: [
      ["03-0", "Chapter Plan", "Map the verification work before using AI output.", "The teacher chooses what AI may help draft, what sources anchor the work, and what must be checked before students see it.", "Add a checklist section for source checks, privacy checks, bias checks, and teacher approval."],
      ["03-1", "AI Can Draft, But It Cannot Own the Lesson", "Separate drafting help from instructional ownership.", "AI can suggest directions for a sensor lab, but the teacher decides whether the task matches the target, materials, timing, and students.", "Write one rule that says which decisions remain teacher-owned."],
      ["03-2", "Hallucinations and Fake Confidence", "Treat confident AI claims as unverified until checked.", "A generated explanation says an ultrasonic sensor is always accurate on dark surfaces; the teacher marks the claim for verification instead of teaching it.", "Add a claim-check row with claim, source needed, status, and teacher decision."],
      ["03-3", "Citation and Source Verification", "Check sources before copying claims into lessons.", "A generated paragraph includes a citation-looking phrase but no usable source link. The teacher replaces it with a source note from official documentation or removes the claim.", "Add a citation check that distinguishes provided sources from invented references."],
      ["03-4", "Bias and Representation Checks", "Inspect examples for stereotypes, narrow assumptions, and missing learners.", "A project example only shows boys building robots and uses expensive home equipment. The teacher revises it toward classroom materials and broader student roles.", "Add a representation check for names, roles, access, language, and examples."],
      ["03-5", "Student Privacy and AI Tools", "Keep private student information out of AI prompts.", "Instead of pasting a student's behavior note, the teacher writes a synthetic pattern: 'a student often rushes through data tables and skips units.'", "Add a privacy rule for what must never be pasted into AI."],
      ["03-6", "What Not to Paste Into AI", "Recognize unsafe prompt material before it leaves the teacher workspace.", "The teacher removes student names, grades, IEP details, family context, private links, screenshots, and local account information before asking for help.", "Create a do-not-paste list for the course workflow."],
      ["03-7", "AI Verification Checklist", "Build a checklist that turns review into a repeatable routine.", "Before publishing directions, the teacher checks source accuracy, student privacy, reading level, accessibility, and whether the task still matches the target.", "Complete the checklist with pass, revise, or remove decisions."],
      ["03-8", "Checkpoint Review", "Confirm that AI-supported materials are teacher-approved.", "The lesson is not ready because the AI response sounds polished; it is ready when the teacher can show what was checked and what changed.", "Mark one AI-assisted artifact as ready, revise, or blocked with evidence."],
    ],
  },
  {
    slug: "04-standards-to-learning-targets",
    chapter: "Standards to Learning Targets",
    artifact: "Standards unpacking sheet",
    scenario:
      "a teacher is turning a broad technology or computer science standard into a small lesson target students can understand and demonstrate",
    purpose:
      "This chapter turns standards from compliance language into usable teaching decisions: verbs, concepts, student evidence, and assessment alignment.",
    lessons: [
      ["04-0", "Chapter Plan", "Preview the path from standard text to classroom evidence.", "The teacher starts with a standard, identifies what students must do, and chooses evidence that can actually be observed.", "Create columns for standard text, verb, concept, target, evidence, and lesson connection."],
      ["04-1", "Standards Are Not Lessons", "Avoid treating a standard as a complete lesson plan.", "A standard may say students analyze data, but the lesson must still name the data set, student action, time, and product.", "Write one sentence explaining what the standard does not yet tell you."],
      ["04-2", "Finding the Right Standards", "Choose standards that match the actual learning task.", "For a sensor-data lesson, the teacher looks for standards about data, systems, measurement, or computational thinking instead of forcing a random technology standard.", "Add source, code, link, and why-this-standard-fits notes."],
      ["04-3", "Unpacking Verbs and Nouns", "Separate what students do from what they use or know.", "In 'analyze sensor data to justify a design decision,' analyze and justify are verbs; sensor data and design decision are nouns.", "Highlight verbs and nouns in one selected standard."],
      ["04-4", "Turning Standards Into Learning Targets", "Rewrite standard language into student-facing targets.", "The teacher turns formal language into 'I can use sensor readings to explain why my robot should stop at a chosen distance.'", "Add one student-friendly target and one teacher-facing success note."],
      ["04-5", "Matching Evidence to Targets", "Choose evidence that proves the target, not just activity completion.", "A completed robot is not enough evidence if the target is justification; the teacher needs the data table and explanation too.", "Add evidence type, collection method, and review criterion."],
      ["04-6", "Avoiding Fake Alignment", "Find activities that sound aligned but do not measure the target.", "A vocabulary quiz about sensors does not prove students can use readings to justify a threshold.", "Write one non-example and explain why it fails alignment."],
      ["04-7", "Standards Unpacking Sheet", "Build the artifact that connects standard, target, lesson, and evidence.", "The sheet shows how one formal standard becomes one teachable target and one observable student product.", "Complete at least three rows for your mini-unit."],
      ["04-8", "Checkpoint Review", "Check whether the target and evidence match.", "A colleague should be able to read the sheet and predict what students will do and submit.", "Mark each row ready, revise, or blocked."],
    ],
  },
  {
    slug: "05-course-and-unit-architecture",
    chapter: "Course and Unit Architecture",
    artifact: "Mini-unit map and lesson template",
    scenario:
      "a teacher is organizing a small sequence of lessons so the unit has a clear beginning, middle, assessment moment, and revision path",
    purpose:
      "This chapter helps teachers turn a pile of lesson ideas into a coherent mini-unit with sequence, evidence, examples, and checks for understanding.",
    lessons: [
      ["05-0", "Chapter Plan", "Preview the structure of a usable mini-unit.", "The teacher moves from one good activity to a short sequence where each lesson has a role.", "Sketch the unit question, lesson sequence, and final evidence."],
      ["05-1", "Course vs Unit vs Lesson vs Activity", "Name the scale of the work before designing it.", "The sensor threshold task is an activity; the lesson includes launch and reflection; the unit connects data, testing, and design decisions.", "Sort three pieces of your curriculum by scale."],
      ["05-2", "Essential Questions", "Use a question that gives the unit direction.", "Instead of 'learn sensors,' the teacher asks, 'How much evidence should a robot use before acting?'", "Draft one essential question and one student-friendly version."],
      ["05-3", "Lesson Sequence", "Put lessons in an order that builds understanding.", "Students first observe readings, then test reliability, then choose thresholds, then explain a design choice.", "Map three to five lessons with purpose and evidence."],
      ["05-4", "Examples and Non-Examples", "Teach quality by showing what does and does not count.", "A strong threshold claim uses readings; a weak claim says 'because it worked' without evidence.", "Add one example and one non-example to a lesson."],
      ["05-5", "Checks for Understanding", "Place small checks before the final product.", "Before the final reflection, students identify the most unreliable reading and explain why it may be wrong.", "Add one quick check and what the teacher does with the result."],
      ["05-6", "Mini-Unit Mapping", "Connect targets, lessons, resources, and evidence in one view.", "The map shows which lesson introduces data, which lesson tests it, and which artifact proves learning.", "Fill in the map with lesson title, target, resource, evidence, and revision note."],
      ["05-7", "3-5 Lesson Mini-Unit", "Build the smallest coherent unit worth teaching.", "The finished mini-unit has enough structure for another teacher to run it without guessing the sequence.", "Create the 3-5 lesson packet or map."],
      ["05-8", "Checkpoint Review", "Check whether the mini-unit is coherent.", "If a lesson does not prepare students for the final evidence, revise or remove it.", "Mark each lesson as necessary, revise, or cut."],
    ],
  },
  {
    slug: "06-resource-discovery-open-resources",
    chapter: "Resource Discovery and Open Resources",
    artifact: "Resource evaluation sheet",
    scenario:
      "a teacher is choosing web resources, images, videos, and examples for a mini-unit without losing source quality, license clarity, or student accessibility",
    purpose:
      "This chapter teaches teachers to find, evaluate, credit, and organize resources that support lessons instead of cluttering them.",
    lessons: [
      ["06-0", "Chapter Plan", "Preview the resource decisions behind a trustworthy lesson.", "The teacher checks whether each resource is accurate, allowed, useful, and accessible before it enters the unit.", "Create evaluation columns for purpose, source, license, access, and lesson fit."],
      ["06-1", "Official Sources First", "Start with sources closest to the tool, standard, or concept.", "For sensor behavior, the teacher checks manufacturer docs or course-approved references before using a random blog summary.", "Add one official or primary source with a note about what it supports."],
      ["06-2", "OER and Creative Commons", "Understand when reuse is permitted and what attribution requires.", "A diagram with a Creative Commons license may be usable if the teacher records title, creator, license, and link.", "Add license and attribution fields to the sheet."],
      ["06-3", "Free vs Open vs Allowed", "Distinguish no-cost access from permission to copy or remix.", "A free worksheet online may not be open for redistribution inside a course packet.", "Classify one resource as free, open, allowed with limits, or avoid."],
      ["06-4", "YouTube, Images, and Attribution", "Handle media as instructional evidence, not decoration.", "A short video is useful only if it teaches the concept, has accessible captions, and does not replace teacher explanation.", "Add media purpose, caption/accessibility, and attribution notes."],
      ["06-5", "Evaluating Source Quality", "Judge whether a resource deserves classroom trust.", "The teacher checks author, date, evidence, reading level, ads, and whether claims match official guidance.", "Score one resource as use, revise context, or reject."],
      ["06-6", "Building a Source Bank", "Organize reusable sources so future lessons can cite them quickly.", "The source bank stores link, purpose, license, lesson connection, and last checked date.", "Add three sources with lesson connections."],
      ["06-7", "Resource Evaluation Sheet", "Build the sheet that makes resource decisions inspectable.", "Another teacher can see why a resource was chosen, where it appears, and what limitations apply.", "Complete entries for one source, one media item, and one rejected resource."],
      ["06-8", "Checkpoint Review", "Check whether resources strengthen the mini-unit.", "A resource that is interesting but not aligned should be removed or moved to optional extension.", "Mark each resource keep, revise, replace, or remove."],
    ],
  },
  {
    slug: "07-google-workspace-planning-systems",
    chapter: "Google Workspace Planning Systems",
    artifact: "Workspace planning map",
    scenario:
      "a teacher is using Drive, Docs, Sheets, Forms, and Slides to keep a mini-unit teachable, shareable, and maintainable",
    purpose:
      "This chapter turns familiar Google tools into a connected planning system with folder roles, templates, trackers, checks, and delivery materials.",
    lessons: [
      ["07-0", "Chapter Plan", "Preview how Workspace tools support the mini-unit system.", "The teacher chooses what each tool does instead of dropping every file into one folder.", "Create a workspace map with folder, file type, purpose, owner, and update routine."],
      ["07-1", "Google Drive Is Not a System by Itself", "Understand that storage is not the same as workflow.", "A Drive folder only helps if current files, archive files, private files, and student-facing files are separated.", "Name one Drive folder rule for your mini-unit."],
      ["07-2", "Folder Architecture", "Design folders around work roles.", "The teacher creates folders for source notes, teacher prep, student-facing materials, assessment evidence, and archive.", "Map your unit folder structure."],
      ["07-3", "Docs as Lesson Templates", "Use Docs for reusable directions and teacher notes.", "A direction template includes launch, materials, steps, submit section, accessibility note, and revision log.", "Create or outline one lesson Doc template."],
      ["07-4", "Sheets as Curriculum Trackers", "Use Sheets to track decisions that change over time.", "The tracker records lesson target, source, resource link, evidence, status, and revision note.", "Add columns that match your mini-unit workflow."],
      ["07-5", "Forms as Checks for Understanding", "Use Forms when the response data needs sorting or review.", "A three-question exit ticket sends misconception data to the tracker before the next lesson.", "Draft one form check and response-use note."],
      ["07-6", "Slides as Delivery Tools", "Use slides for classroom flow, not as the whole lesson.", "The slide deck cues launch, task, timer, checkpoint, and closing reflection while the full directions live elsewhere.", "Add slide roles for one lesson."],
      ["07-7", "Workspace Planning Map", "Build the map that shows how the tools connect.", "The map tells another teacher where to find materials and what each file does.", "Complete the workspace planning map for one mini-unit."],
      ["07-8", "Checkpoint Review", "Check whether the workspace can survive real classroom use.", "If a colleague cannot find the current directions and evidence tracker in two minutes, revise the structure.", "Mark each file or folder ready, revise, archive, or private."],
    ],
  },
  {
    slug: "08-assessment-rubrics-feedback",
    chapter: "Assessment, Rubrics, and Feedback",
    artifact: "Assessment and rubric draft",
    scenario:
      "a teacher is deciding how students will prove learning and how feedback will help them revise before the mini-unit is finished",
    purpose:
      "This chapter connects activities to evidence, rubrics, formative checks, feedback loops, and revision opportunities.",
    lessons: [
      ["08-0", "Chapter Plan", "Preview the assessment decisions in the mini-unit.", "The teacher chooses evidence before polishing activities so the unit measures what it claims to teach.", "Create fields for target, evidence, criteria, feedback, and revision."],
      ["08-1", "Activities Are Not Always Assessments", "Separate doing the task from proving the target.", "Building a robot is an activity; explaining a threshold with data is evidence of the target.", "Label one activity and the evidence it produces."],
      ["08-2", "Evidence of Learning", "Choose evidence that a teacher can actually inspect.", "A data table, annotated screenshot, short explanation, or rubric row can show learning more clearly than participation.", "Name the evidence for each learning target."],
      ["08-3", "Formative Checks", "Use small checks to catch confusion before final submission.", "Students choose which reading is least reliable before writing the final justification.", "Add one formative check and the response the teacher will take."],
      ["08-4", "Rubrics With Observable Criteria", "Write criteria that can be seen in student work.", "Instead of 'understands sensors,' use 'uses at least three readings to justify the threshold.'", "Draft three observable rubric criteria."],
      ["08-5", "Feedback Loops", "Plan how feedback changes the work.", "The teacher highlights missing units and asks students to revise the data table before scoring the reflection.", "Add feedback timing and revision action."],
      ["08-6", "Revision Opportunities", "Build revision into the assessment design.", "Students revise the threshold claim after comparing their data with a peer group.", "Add one revision moment before final submission."],
      ["08-7", "Assessment + Rubric Draft", "Build the artifact that connects target, evidence, criteria, and feedback.", "The draft includes the student product, rubric criteria, formative check, and revision path.", "Complete the assessment and rubric draft for one mini-unit task."],
      ["08-8", "Checkpoint Review", "Check whether the assessment measures the target.", "If the rubric rewards neatness more than evidence use, revise it.", "Mark each criterion keep, revise, remove, or add evidence."],
    ],
  },
  {
    slug: "09-delivery-planning",
    chapter: "Delivery Planning",
    artifact: "Delivery plan",
    scenario:
      "a teacher is preparing the mini-unit for actual classroom delivery, including directions, pacing, media, links, and backup plans",
    purpose:
      "This chapter turns a planned mini-unit into something students can navigate during class.",
    lessons: [
      ["09-0", "Chapter Plan", "Preview the delivery decisions that make a lesson usable.", "The teacher checks what students see, when they see it, what to do when technology fails, and what evidence gets collected.", "Create fields for launch, materials, timing, directions, media, backup, and close."],
      ["09-1", "A Good Lesson Still Needs Delivery", "Recognize that strong content can fail if classroom flow is unclear.", "A well-aligned sensor activity still needs materials ready, groups assigned, directions visible, and collection steps timed.", "Add one delivery risk and prevention step."],
      ["09-2", "Student-Facing Directions", "Write directions students can act on without decoding teacher notes.", "Directions say what to get, what to do first, what to record, what to submit, and when to ask for help.", "Revise one direction into numbered student-facing steps."],
      ["09-3", "Timing and Classroom Flow", "Plan the movement of time, attention, and materials.", "The teacher budgets launch, setup, data collection, discussion, reflection, and cleanup instead of hoping the activity fits.", "Create a minute-by-minute flow for one lesson."],
      ["09-4", "Videos, Images, and Embedded Resources", "Use media only when it helps students do the task.", "A sensor diagram is useful if it labels pins students actually touch; a decorative robot image is not enough.", "Add purpose and accessibility notes for each media item."],
      ["09-5", "The One-Day Lesson Site Workflow", "Package a single lesson so students can access it cleanly.", "A one-day page includes target, materials, directions, links, submission instructions, and help notes.", "Draft the sections of one lesson site or page."],
      ["09-6", "Backup Plans When Tech Fails", "Prepare alternatives for predictable failures.", "If sensors fail, students analyze a provided data set and still justify a threshold.", "Add a backup for device, internet, account, and material issues."],
      ["09-7", "Delivery Plan", "Build the artifact that makes classroom delivery inspectable.", "The delivery plan shows what the teacher does before, during, and after the lesson.", "Complete the plan for one mini-unit lesson."],
      ["09-8", "Checkpoint Review", "Check whether students could follow the lesson without guessing.", "If students cannot tell what to submit or where to find a link, revise the delivery plan.", "Mark each delivery element ready, revise, missing, or backup needed."],
    ],
  },
  {
    slug: "10-mini-unit-capstone",
    chapter: "Mini-Unit Capstone",
    artifact: "Verified mini-unit capstone",
    scenario:
      "a teacher is assembling the final mini-unit package with evidence that the sources, standards, assessment, delivery, and revisions have been checked",
    purpose:
      "This chapter brings the OTS-101 artifacts together into a small, teachable, reviewable mini-unit.",
    lessons: [
      ["10-0", "Chapter Plan", "Preview the final assembly process.", "The teacher gathers the workflow audit, prompt library, verification checklist, standards sheet, unit map, resource sheet, assessment draft, and delivery plan.", "Create a capstone index with artifact links and status."],
      ["10-1", "Assemble the Mini-Unit", "Put the mini-unit materials in a usable order.", "A colleague should find the overview, lesson sequence, student materials, assessment, and revision notes without hunting.", "Assemble the package in one folder or index."],
      ["10-2", "Verify Standards and Sources", "Check that the capstone claims are backed by sources and standards.", "The teacher confirms each lesson target connects to the standards sheet and each borrowed resource appears in the resource sheet.", "Add a verification row for standards and sources."],
      ["10-3", "Check Privacy, Copyright, and Accessibility", "Review the final package for risks before sharing.", "The teacher removes private student data, checks media attribution, reviews link text, and confirms readable directions.", "Complete a safety/accessibility checklist."],
      ["10-4", "Peer Review", "Use another educator to find unclear decisions.", "The reviewer checks whether they can understand the mini-unit purpose, student task, evidence, and delivery flow.", "Record reviewer question, issue, and response."],
      ["10-5", "Revision Log", "Show what changed and why.", "The teacher records that the data table gained units, the prompt was revised, and the rubric criteria were clarified.", "Add at least three revision log entries."],
      ["10-6", "Present the Mini-Unit", "Explain the unit as a teachable system.", "The teacher presents the learning target, student evidence, source choices, assessment, and delivery plan in plain language.", "Draft a short presentation outline."],
      ["10-7", "Final Reflection", "Reflect on what became more inspectable.", "The teacher identifies which part of the workflow moved from memory into a reusable artifact.", "Write a reflection on the strongest artifact and next improvement."],
      ["10-8", "Capstone Submission Checklist", "Confirm that the final package is ready to share or teach.", "The checklist verifies each required artifact, route, file, safety check, and revision note.", "Mark each capstone item complete, revise, or not included."],
    ],
  },
];

function splitFrontmatter(source) {
  const match = source.match(/^---\r?\n[\s\S]*?\r?\n---\r?\n?/);
  if (!match) throw new Error("Missing frontmatter");
  return match[0].trimEnd();
}

function lessonBody({ chapter, artifact, scenario, purpose }, [, title, target, core, artifactAction]) {
  const isPlan = /Chapter Plan/.test(title);
  const isCheckpoint = /Checkpoint Review/.test(title) || /Checklist/.test(title);
  const isArtifact = /Sheet|Checklist|Library|Draft|Map|Plan|Mini-Unit|Audit|Capstone/.test(title) && !isPlan && !isCheckpoint;

  const actionHeading = isArtifact ? "Build The Artifact" : isCheckpoint ? "Review The Work" : "Teacher Move";
  const actionIntro = isArtifact
    ? `Build the **${artifact}** so another educator can inspect the decision, not just the finished material.`
    : isCheckpoint
      ? `Use this checkpoint to decide what is ready, what needs revision, and what is blocked by a missing source, file, or teacher decision.`
      : `Make the idea visible in the **${artifact}** with one classroom-safe entry.`;

  return `# ${title}

## Why This Matters

A teacher building a first reusable mini-unit needs a system another educator can inspect. In **${chapter}**, that means the teacher can explain what was chosen, why it was chosen, how students will use it, and what evidence shows the choice worked.

${purpose}

## Core Idea

${target}

${core}

## Classroom Example

Use this working situation: ${scenario}.

For the robotics mini-unit, the teacher does not stop at a polished document. The teacher names the student task, the evidence students produce, the source or safety check behind the task, and the revision that should happen after the first classroom use.

Example entry:

| Decision | Classroom version |
| --- | --- |
| Student task | Students use sensor readings, source notes, or planning artifacts to make a visible decision. |
| Evidence | Students submit a table, note, explanation, checklist, draft, or reflection that can be reviewed. |
| Teacher check | The teacher verifies accuracy, privacy, accessibility, source fit, and classroom timing before use. |
| Revision trigger | If students cannot explain the decision or find the material, the artifact gets revised. |

## ${actionHeading}

${actionIntro}

Add this entry:

| Field | Your note |
| --- | --- |
| Lesson focus | ${title} |
| Classroom context | The mini-unit, class, or workflow you are building |
| Student-facing evidence | What students read, make, submit, discuss, or revise |
| Teacher verification | What you check before students use it |
| Artifact work | ${artifactAction} |

## Quality Check

Before moving on, confirm that the entry names an actual classroom action. It should not only name a tool or a wish. A reviewer should be able to see the source, student task, evidence, teacher check, and next revision.

## Reflection

What would another teacher still need to ask before using this part of your mini-unit? Revise your artifact until that answer is visible.
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

console.log("Rewrote remaining OTS-101 lesson bodies for chapters 03-10.");
