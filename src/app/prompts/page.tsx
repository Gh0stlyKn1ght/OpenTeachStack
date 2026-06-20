import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Prompt Library — Open TeachStack",
  description:
    "Reusable prompt templates for curriculum design, assessment creation, content generation, and AI-assisted teaching workflows.",
};

/* ── Prompt data ──────────────────────────────────────────────────── */

interface PromptTemplate {
  id: string;
  title: string;
  category: string;
  guidance: string;
  prompt: string;
}

const PROMPTS: PromptTemplate[] = [
  {
    id: "unpack-standards",
    title: "Unpacking State Standards",
    category: "Standards & Alignment",
    guidance:
      "Use this prompt at the start of course design. Paste the exact text of the standard you want to unpack. The output gives you learning targets you can use directly in your scope and sequence.",
    prompt: `You are a curriculum design assistant helping a teacher unpack a state academic standard.

Standard text: [PASTE FULL STANDARD TEXT HERE]
Subject: [SUBJECT]
Grade level: [GRADE]
State: [STATE]

Please do the following:
1. Restate the standard in plain language a teacher can use for planning.
2. Identify the key nouns (concepts students must know) and key verbs (skills students must demonstrate).
3. Break the standard into 3-5 measurable learning targets, each starting with "Students will be able to..."
4. For each learning target, suggest one formative assessment strategy.
5. Note any prerequisite knowledge students need before engaging with this standard.
6. Identify potential misconceptions students may have about this content.

Format the output with clear headings. Do not add standards that are not present in the original text.`,
  },
  {
    id: "unit-plan",
    title: "Building a Unit Plan",
    category: "Course Design",
    guidance:
      "This prompt produces a structured unit plan. Provide the learning targets you unpacked in the previous step. Review the output carefully for pacing accuracy and adjust to your school calendar.",
    prompt: `You are a curriculum design assistant. Build a unit plan using the following information.

Course: [COURSE NAME]
Unit title: [UNIT TITLE]
Grade level: [GRADE]
Duration: [NUMBER OF WEEKS / CLASS PERIODS]
Learning targets:
- [TARGET 1]
- [TARGET 2]
- [TARGET 3]

For this unit, create:
1. An essential question that drives inquiry across the unit.
2. A day-by-day (or period-by-period) pacing guide with:
   - Topic for each day
   - Instructional strategy (direct instruction, guided practice, lab, discussion, assessment)
   - Materials or resources needed
3. One formative assessment checkpoint at the midpoint of the unit.
4. A summative assessment description aligned to the learning targets.
5. A list of key vocabulary terms for the unit.
6. Differentiation notes: one accommodation for struggling learners and one extension for advanced learners.

Format as a structured document with clear headings and tables where appropriate.`,
  },
  {
    id: "lesson-plan",
    title: "Building a Lesson Plan",
    category: "Course Design",
    guidance:
      "Use this for individual lesson planning after your unit plan is in place. The output follows a standard lesson plan structure. Always verify that the activities match your classroom time and student needs.",
    prompt: `You are a curriculum design assistant. Create a detailed lesson plan.

Subject: [SUBJECT]
Grade level: [GRADE]
Lesson title: [TITLE]
Duration: [LENGTH, e.g., 50 minutes]
Learning target: [SPECIFIC TARGET from unit plan]
Prior knowledge required: [WHAT STUDENTS SHOULD ALREADY KNOW]

Create a lesson plan with these sections:
1. OBJECTIVE: Restate the learning target in student-friendly language.
2. MATERIALS: List all materials, handouts, and technology needed.
3. WARM-UP (5 min): An activating strategy that connects to prior knowledge.
4. DIRECT INSTRUCTION (10-15 min): Key content delivery with examples.
5. GUIDED PRACTICE (10-15 min): A structured activity where students apply the concept with teacher support.
6. INDEPENDENT PRACTICE (10-15 min): An activity where students work independently or in pairs.
7. CLOSURE (5 min): A formative check — an exit ticket, reflection prompt, or quick assessment.
8. ASSESSMENT: How will you know students met the objective? Describe the evidence.
9. DIFFERENTIATION: One modification for students who need support. One extension for students who are ready for more.

Write in a professional but practical tone. Keep instructions specific enough that a substitute teacher could follow them.`,
  },
  {
    id: "one-day-lesson-site",
    title: "One-Day Lesson Site Builder",
    category: "Course Design",
    guidance:
      "Use this when tomorrow's lesson needs a clear source-based webpage. It is for fast lesson delivery, not for replacing standards verification, assessment design, or long-term curriculum planning.",
    prompt: `You are an instructional designer, classroom teacher, and front-end web assistant.

Build a simple one-day lesson webpage using plain HTML and CSS.

Purpose:
I need a good-enough lesson page that I can teach from tomorrow. It should be clear, engaging, source-based, and easy for students to follow.

Course / grade:
[insert course and grade level]

Topic:
[insert topic]

Time available:
[insert class length]

Standards or skills:
[insert standards, skills, or learning goals]

Trusted sources:
Use only the sources, notes, and links I provide below. Do not invent citations or fake sources.

Sources / notes:
[paste links, excerpts, notes, textbook references, documentation, or teacher notes here]

Lesson objective:
By the end of the lesson, students should be able to:
[insert objective]

Required page sections:
1. Lesson title and short hook
2. What students will learn
3. Key vocabulary
4. Short teacher-friendly explanation
5. Visual explanation or diagram section
6. Embedded YouTube/video section using placeholder embed links if needed
7. Image section with source notes or placeholders
8. Examples and non-examples
9. Student task or activity
10. Check for understanding
11. Exit ticket
12. Source notes / attribution section

Design requirements:
- Use plain HTML and CSS.
- Keep the design clean, colorful, and readable.
- Make it work on a projector and student devices.
- Use cards, sections, callouts, and simple visual hierarchy.
- Use accessible contrast.
- Add alt text placeholders for images.
- Make videos responsive.
- Do not use heavy frameworks.
- Do not include external libraries unless necessary.
- Keep the code easy for a teacher to edit.

Safety and accuracy rules:
- Do not invent sources.
- Do not fake citations.
- Do not claim standards alignment unless the connection is clear.
- Do not include private student data.
- Do not use copyrighted images unless permission or license is clear.
- Mark any missing videos/images as placeholders.
- Add a "Teacher Verification Needed" note for anything uncertain.

Example mini workflow:
Topic: What Is a Robot?
Course: Intro Robotics
Expected page elements:
- one-page HTML lesson
- embedded short video placeholder
- image or diagram placeholder
- vocabulary cards
- sense-think-act diagram
- student classification task
- exit ticket

Output:
Provide:
1. A short teaching plan for the day.
2. The complete HTML file.
3. The complete CSS file.
4. A checklist of what I should verify before using it with students.
5. Suggestions for improving the page after class.`,
  },
  {
    id: "quiz",
    title: "Creating a Quiz",
    category: "Assessment",
    guidance:
      "Provide the specific learning targets the quiz should assess. Always verify answer keys against your source materials. AI-generated answer keys can contain errors, especially in math, science, and history.",
    prompt: `You are an assessment design assistant. Create a quiz aligned to specific learning targets.

Subject: [SUBJECT]
Grade level: [GRADE]
Learning targets being assessed:
- [TARGET 1]
- [TARGET 2]

Quiz parameters:
- Number of questions: [NUMBER]
- Question types to include: [multiple choice, short answer, true/false, matching — pick which types]
- Difficulty distribution: [e.g., 60% recall, 30% application, 10% analysis]

Create the quiz with:
1. Clear directions for students at the top.
2. Questions numbered sequentially, organized by learning target.
3. For multiple choice: four answer options (A-D) with one correct answer and three plausible distractors.
4. For short answer: include the expected response length.
5. An answer key at the end with the correct answer and a brief explanation for each question.
6. Point values for each question.

Do not include trick questions. Ensure questions test the learning targets, not reading comprehension of confusing wording.`,
  },
  {
    id: "rubric",
    title: "Creating a Rubric",
    category: "Assessment",
    guidance:
      "Rubrics work best when the criteria come from your learning targets. Provide the assignment description and targets, then review the AI output to make sure the performance levels match your grading expectations.",
    prompt: `You are an assessment design assistant. Create an analytic rubric for a student assignment.

Assignment: [DESCRIBE THE ASSIGNMENT]
Subject: [SUBJECT]
Grade level: [GRADE]
Learning targets assessed:
- [TARGET 1]
- [TARGET 2]
- [TARGET 3]

Create a rubric with:
1. 3-5 criteria rows derived from the learning targets (e.g., "Content Accuracy," "Evidence of Analysis," "Presentation Quality").
2. 4 performance levels as columns: Exceeds Expectations (4), Meets Expectations (3), Approaching (2), Beginning (1).
3. For each cell, write a specific, observable description of what student work looks like at that level. Avoid vague terms like "good" or "excellent" — describe what the student did.
4. A row for total points.

Format as a table. Use language appropriate for the grade level so students can use this rubric for self-assessment.`,
  },
  {
    id: "student-directions",
    title: "Creating Student-Facing Directions",
    category: "Course Design",
    guidance:
      "Use this prompt when you need clear, student-readable instructions for an assignment, project, or activity. Adjust the reading level to match your students. Test the directions by reading them as if you were a student seeing the assignment for the first time.",
    prompt: `You are a curriculum writing assistant. Write clear, student-facing directions for an assignment.

Assignment title: [TITLE]
Subject: [SUBJECT]
Grade level: [GRADE]
Assignment type: [project, essay, lab, presentation, etc.]
Due date: [DATE or "TBD"]
Learning target: [WHAT STUDENTS SHOULD DEMONSTRATE]

Write the directions in student-friendly language at a [GRADE]-grade reading level. Include:
1. A brief overview (1-2 sentences) explaining what students will do and why it matters.
2. Step-by-step instructions, numbered, with each step being one specific action.
3. A "What to Submit" section listing exactly what students turn in and how (Google Classroom, printed, etc.).
4. A "Success Criteria" section with 3-5 bullet points describing what a quality submission looks like.
5. A "Need Help?" section with 2-3 suggestions for where to get support (teacher office hours, peer review, resources).

Keep sentences short. Avoid jargon. Use second person ("you will..."). Bold key deadlines and requirements.`,
  },
  {
    id: "image-prompts",
    title: "Creating Image Prompts for Curriculum",
    category: "Visual Design",
    guidance:
      "Use this when you need AI-generated images for classroom materials. The output is a set of structured image prompts you can paste into DALL-E, Midjourney, or similar tools. Always verify that generated images do not misrepresent factual content (anatomy, geography, historical events).",
    prompt: `You are a visual design assistant for educators. Help me create AI image generation prompts for curriculum materials.

Subject: [SUBJECT]
Grade level: [GRADE]
Use case: [poster, worksheet illustration, diagram, project graphic, slide visual]
Topic: [SPECIFIC TOPIC]
Visual style preference: [flat illustration, realistic, line drawing, infographic, watercolor, etc.]

For each image I need, generate:
1. A detailed image prompt (2-3 sentences) optimized for AI image generators. Include:
   - Subject matter and composition
   - Art style and color palette
   - Mood and tone appropriate for the classroom
   - Aspect ratio suggestion (e.g., 16:9 for slides, 1:1 for worksheets)
2. A note about what to verify in the output (e.g., "Check that the map labels are accurate" or "Verify the number of items shown matches the math problem").
3. A licensing reminder: AI-generated images should be noted as such in your materials.

Create [NUMBER] image prompts for the following needs:
- [DESCRIBE IMAGE 1]
- [DESCRIBE IMAGE 2]
- [DESCRIBE IMAGE 3]

Do not generate prompts for images depicting real, identifiable people. Use generic or illustrative representations.`,
  },
  {
    id: "video-scripts",
    title: "Creating Video Scripts",
    category: "Delivery",
    guidance:
      "Use this for instructional video scripts or screen recording outlines. Keep videos focused on a single learning target. The output gives you a script you can read while recording, with timing cues and visual notes.",
    prompt: `You are a curriculum media assistant. Write a script for a short instructional video.

Subject: [SUBJECT]
Grade level: [GRADE]
Video title: [TITLE]
Target length: [e.g., 5-7 minutes]
Learning target: [WHAT STUDENTS SHOULD LEARN FROM THIS VIDEO]
Video type: [talking head, screen recording, slide narration, demo, or hybrid]

Create a video script with:
1. HOOK (15-30 seconds): An opening that tells students what they will learn and why it matters.
2. CORE CONTENT (organized into 2-4 segments):
   - For each segment, include:
     - What to say (narration text)
     - What to show (screen, slide, demo, or visual description)
     - Approximate duration
3. SUMMARY (30 seconds): Recap the key takeaway in one sentence.
4. CALL TO ACTION: Tell students what to do next (complete a worksheet, try a practice problem, post a response).

Write the narration in a conversational, teacher-like tone. Include [PAUSE] markers where the teacher should pause for emphasis. Include [SHOW: description] markers for visual cues.`,
  },
  {
    id: "apps-script-code",
    title: "Creating Apps Script Code",
    category: "Automation",
    guidance:
      "Use this when you need a Google Apps Script for a specific classroom task. Always test the generated code in a copy of your spreadsheet or document before running it on live data. Review the code line by line before executing it. See the Safety Guide for additional precautions.",
    prompt: `You are a Google Apps Script assistant for teachers. Write a script for a specific classroom automation task.

Task description: [DESCRIBE WHAT YOU WANT THE SCRIPT TO DO]
Google Workspace tool: [Sheets, Docs, Forms, Slides, Drive, Gmail, Calendar]
Specific details:
- Spreadsheet/document structure: [DESCRIBE COLUMNS, TABS, OR DOCUMENT LAYOUT]
- Trigger type: [manual run, onEdit, onFormSubmit, time-driven (daily/weekly)]
- Output: [WHERE SHOULD THE RESULTS GO — new doc, email, same sheet, etc.]

Please provide:
1. The complete Apps Script code with comments explaining each section.
2. Step-by-step setup instructions:
   - Where to paste the code (which editor, which file)
   - How to authorize the script
   - How to set up any triggers
3. A test plan: How to verify the script works correctly before running it on real data.
4. Known limitations or edge cases the teacher should be aware of.

Write the code for someone who has never written Apps Script before. Use descriptive variable names and add comments on every significant line.`,
  },
  {
    id: "codex-safe",
    title: "Using Codex Safely",
    category: "AI Coding Agents",
    guidance:
      "Codex (OpenAI) can generate code from natural language descriptions. This prompt helps you structure requests to Codex for classroom tools. Always review generated code before running it. Never give Codex access to student data or production systems.",
    prompt: `You are helping a teacher use an AI coding agent (Codex) to build a classroom tool. Structure the request for safety and clarity.

What I want to build: [DESCRIBE THE TOOL OR SCRIPT]
Technology: [Apps Script, HTML/CSS/JS, Python, or other]
Where it will run: [Google Sheets, a website, locally, etc.]
Data involved: [DESCRIBE — and note: NEVER include student PII]

Before generating code, I need you to:
1. Restate what the code should do in plain language so I can verify you understood correctly.
2. List any permissions or access the code will need (e.g., read/write to Sheets, send email).
3. Identify any risks (data loss, accidental overwrites, email spam).
4. Generate the code with:
   - Clear comments explaining each section
   - Error handling for common failure cases
   - A test procedure I can follow
5. Tell me what to review before running the code:
   - Which lines handle data reading/writing
   - Which lines could modify or delete content
   - Whether the code sends any external requests

I will review every line before executing. Do not include any code that accesses student records, grades, or personal information unless I explicitly provide a de-identified dataset.`,
  },
  {
    id: "claude-code-safe",
    title: "Using Claude Code Safely",
    category: "AI Coding Agents",
    guidance:
      "Claude Code operates in your terminal and can read/write files in your project. This prompt establishes safety boundaries. Always use version control (git commit) before letting Claude Code make changes, and review diffs before accepting them.",
    prompt: `You are helping a teacher use Claude Code (an AI coding agent that operates in the terminal) to build or modify a curriculum project. Establish safety practices.

Project type: [course site, Apps Script project, template repository, etc.]
What I want Claude Code to do: [DESCRIBE THE TASK]
Files involved: [LIST KEY FILES OR DIRECTORIES]

Safety requirements — follow these before and during the session:
1. BEFORE starting: Run "git status" to confirm all current work is committed. If there are uncommitted changes, commit them first.
2. SCOPE: Only modify files in [SPECIFIC DIRECTORY OR FILE LIST]. Do not touch files outside this scope.
3. REVIEW: After making changes, show me the diff (git diff) and explain what changed and why, line by line.
4. NO STUDENT DATA: Do not process, store, or reference any student personally identifiable information.
5. NO DESTRUCTIVE OPERATIONS: Do not delete files, reset git history, or force-push to any remote repository unless I explicitly request it.
6. TESTING: After changes, describe how I can verify the changes work correctly.

If you are unsure about any step, stop and ask me before proceeding. I prefer to review changes incrementally rather than receiving a large batch of modifications.`,
  },
  {
    id: "course-audit",
    title: "Auditing a Course for Quality",
    category: "Quality Assurance",
    guidance:
      "Use this prompt when you have a draft course or unit and want a structured review. Provide as much of your course material as possible (or a summary). The AI acts as a reviewer, not an authority — you make the final decisions.",
    prompt: `You are a curriculum quality reviewer. Audit the following course materials for completeness, alignment, and quality.

Course title: [TITLE]
Subject: [SUBJECT]
Grade level: [GRADE]
Number of units/modules: [NUMBER]

Materials provided:
[PASTE OR DESCRIBE YOUR COURSE STRUCTURE, LEARNING TARGETS, ASSESSMENTS, AND KEY RESOURCES]

Review the course against these criteria:
1. ALIGNMENT: Do assessments measure the stated learning targets? Are there targets with no assessment? Assessments with no clear target?
2. PACING: Is the pacing realistic for the stated duration? Are any units over- or under-loaded?
3. RIGOR: Does the course include a range of cognitive demand levels (recall, application, analysis, creation)?
4. COHERENCE: Do units build on each other logically? Is there a clear progression of skills?
5. RESOURCES: Are all referenced resources accessible and properly cited? Are there gaps?
6. DIFFERENTIATION: Are there provisions for struggling learners and advanced learners?
7. ASSESSMENT VARIETY: Does the course use multiple assessment types (formative, summative, project-based)?

For each criterion, provide:
- A rating: Strong, Adequate, or Needs Attention
- Specific observations
- Actionable recommendations

Be direct. Do not pad the review with compliments. Focus on what needs to improve.`,
  },
  {
    id: "standards-alignment",
    title: "Aligning Lessons to Standards",
    category: "Standards & Alignment",
    guidance:
      "Use this after you have written lessons to verify that each lesson maps to a specific standard. This is a verification step, not a generation step. The AI checks your work; you verify the AI's check against the actual standards document.",
    prompt: `You are a standards alignment reviewer. Check the alignment between my lessons and the referenced state standards.

State: [STATE]
Subject: [SUBJECT]
Grade level: [GRADE]

Here are my lessons and their claimed standard alignments:
[PASTE A TABLE OR LIST:
Lesson 1: [Title] — aligned to [Standard Code]
Lesson 2: [Title] — aligned to [Standard Code]
... ]

For each lesson-standard pair:
1. Confirm whether the lesson content genuinely addresses the standard (not just superficially mentions a related topic).
2. Rate the alignment: Direct (the lesson fully addresses the standard), Partial (the lesson touches on the standard but does not fully cover it), or Weak (the connection is tenuous).
3. If Partial or Weak, explain what is missing and suggest how to strengthen the alignment.
4. Flag any standards that appear in your curriculum but have no lesson aligned to them.
5. Flag any lessons that do not clearly align to any standard.

IMPORTANT: I will verify your alignment ratings against the actual standards document. Do not fabricate standard codes or descriptions. If you are unsure about a specific standard's content, say so.`,
  },
  {
    id: "revise-ai-output",
    title: "Revising AI Output in Teacher Voice",
    category: "Quality Assurance",
    guidance:
      "Use this prompt after generating any content with AI. It is designed to help you systematically review and revise AI output so it sounds like you, not like a chatbot. This is arguably the most important prompt in the library — AI generates the draft, but the teacher owns the final version.",
    prompt: `You are a revision assistant. Help me revise AI-generated content so it matches my professional voice and meets classroom standards.

Original AI output:
[PASTE THE AI-GENERATED CONTENT HERE]

Content type: [lesson plan, rubric, quiz, student directions, etc.]
My teaching context: [GRADE LEVEL, SUBJECT, SCHOOL TYPE]

Revise the content with these priorities:
1. VOICE: Rewrite any sentences that sound generic, robotic, or overly formal. Match the tone I would use with my students — [describe your tone: warm but direct, casual but professional, etc.].
2. ACCURACY: Flag any factual claims, dates, statistics, or citations that I should verify independently. Mark them with [VERIFY].
3. GRADE APPROPRIATENESS: Adjust vocabulary, sentence complexity, and examples to match [GRADE]-grade level expectations.
4. SPECIFICITY: Replace generic examples with examples relevant to [YOUR SUBJECT/CONTEXT]. AI tends to use placeholder examples — replace them with real ones.
5. REMOVE FILLER: Cut introductory phrases like "Great question!" or "Absolutely!" and any content that adds length without adding value.
6. FORMATTING: Ensure the format matches what I would actually distribute to students or use in my planning.

Return the revised version with your changes highlighted or noted. At the end, list the items marked [VERIFY] so I can check them.`,
  },
];

/* ── Category grouping helper ──────────────────────────────────────── */

function groupByCategory(prompts: PromptTemplate[]) {
  const groups: Record<string, PromptTemplate[]> = {};
  for (const p of prompts) {
    if (!groups[p.category]) groups[p.category] = [];
    groups[p.category].push(p);
  }
  return groups;
}

/* ── Page ──────────────────────────────────────────────────────────── */

export default function PromptsPage() {
  const grouped = groupByCategory(PROMPTS);
  const categories = Object.keys(grouped);

  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      {/* ── Header ─────────────────────────────────────────────────── */}
      <header className="mb-10">
        <h1 className="font-serif text-3xl sm:text-4xl font-extrabold tracking-normal text-foreground mb-3">
          Prompt Library
        </h1>
        <p className="text-foreground/60 leading-relaxed max-w-2xl">
          Reusable prompt templates for curriculum design, assessment
          creation, and content generation. Each prompt is structured for
          direct use with Claude, ChatGPT, or any capable AI assistant.
          Copy, paste, fill in the bracketed variables, and revise the
          output.
        </p>
      </header>

      <hr className="border-t border-border mb-10" />

      {/* ── How to Use ─────────────────────────────────────────────── */}
      <section className="prose-academic mb-10">
        <h2>How to Use This Library</h2>
        <ol>
          <li>
            <strong>Find the prompt</strong> that matches your task. Prompts
            are organized by category: standards, course design, assessment,
            visual design, delivery, automation, AI coding agents, and
            quality assurance.
          </li>
          <li>
            <strong>Copy the prompt</strong> and paste it into your AI tool
            of choice.
          </li>
          <li>
            <strong>Fill in the bracketed variables</strong> (everything in
            [SQUARE BRACKETS]) with your specific information&mdash;subject,
            grade level, standards, assignment details.
          </li>
          <li>
            <strong>Review and revise the output.</strong> AI generates
            drafts, not final products. Use the &ldquo;Revising AI Output in
            Teacher Voice&rdquo; prompt (the last one in this library) as
            your quality control step.
          </li>
          <li>
            <strong>Save working prompts</strong> to your personal prompt
            library (a Google Sheet or document) so you can reuse and refine
            them over time.
          </li>
        </ol>
      </section>

      <hr className="border-t border-border mb-10" />

      {/* ── Table of Contents ──────────────────────────────────────── */}
      <section className="mb-10">
        <h2 className="font-serif text-xl font-bold text-foreground mb-4">
          Contents
        </h2>
        <nav>
          <ol className="space-y-1 text-sm list-decimal list-inside">
            {PROMPTS.map((p) => (
              <li key={p.id}>
                <a
                  href={`#${p.id}`}
                  className="text-link no-underline hover:underline"
                >
                  {p.title}
                </a>
                <span className="text-foreground/40 ml-2">{p.category}</span>
              </li>
            ))}
          </ol>
        </nav>
      </section>

      <hr className="border-t border-border mb-10" />

      {/* ── Prompts by Category ────────────────────────────────────── */}
      {categories.map((category) => (
        <section key={category} className="mb-12">
          <h2 className="font-serif text-xl font-bold text-foreground mb-6">
            {category}
          </h2>

          {grouped[category].map((p) => (
            <article key={p.id} id={p.id} className="mb-10 scroll-mt-8">
              <h3 className="font-serif text-lg font-semibold text-foreground mb-2">
                {p.title}
              </h3>
              <p className="text-sm text-foreground/60 leading-relaxed mb-4">
                {p.guidance}
              </p>
              <div className="rounded-md border border-border bg-surface-alt/50 overflow-x-auto">
                <pre className="p-4 text-xs sm:text-sm leading-relaxed text-foreground/80 whitespace-pre-wrap font-mono">
                  {p.prompt}
                </pre>
              </div>
            </article>
          ))}
        </section>
      ))}

      <hr className="border-t border-border mb-10" />

      {/* ── Safety Reminder ────────────────────────────────────────── */}
      <section className="prose-academic mb-10">
        <h2>Safety Reminder</h2>
        <p>
          Before using any prompt with an AI tool, review the{" "}
          <Link href="/safety">AI Safety Rules for Teachers</Link>. Key
          rules to remember:
        </p>
        <ul>
          <li>
            Never paste private student data (names, grades, IDs, IEP
            information) into any AI tool.
          </li>
          <li>
            Always verify AI-generated standards alignment against the
            actual standards document.
          </li>
          <li>
            Always verify AI-generated citations, statistics, and factual
            claims independently.
          </li>
          <li>
            Always revise AI output in your own voice before distributing
            to students.
          </li>
        </ul>
      </section>

      {/* ── Attribution ────────────────────────────────────────────── */}
      <aside className="mt-10 pt-6 border-t border-border">
        <p className="text-xs text-foreground/40 leading-relaxed">
          This prompt library is part of the{" "}
          <Link href="/" className="text-foreground/50 hover:text-foreground">
            Open TeachStack
          </Link>{" "}
          project and is licensed under{" "}
          <a
            href="https://creativecommons.org/licenses/by-nc-sa/4.0/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground/50 hover:text-foreground"
          >
            CC BY-NC-SA 4.0
          </a>
          . You are free to use, adapt, and share these prompts for
          non-commercial educational purposes with attribution.
        </p>
      </aside>
    </div>
  );
}
