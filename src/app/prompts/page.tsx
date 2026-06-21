import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Prompt Library — Teaching Teachers",
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
    id: "teacher-public-profile-audit",
    title: "Teacher Public Profile Audit",
    category: "Cyber Safety",
    guidance:
      "Use this defensive prompt to review what a public-facing educator may be exposing online. Keep the tone calm and practical. Do not use it to investigate another person without permission.",
    prompt: `You are a defensive privacy reviewer helping a teacher audit their own public online presence.

Important:
This is a self-protection exercise. Do not provide stalking, harassment, doxxing, evasion, or offensive investigation steps.

Teacher context:
- Role: [subject / grade / club / program]
- Public-facing work: [website, portfolio, YouTube, GitHub, social media, public resources]
- Accounts to review: [list accounts or links the teacher owns]

Review for:
1. Personal contact exposure: home address, personal phone, personal email, family info, location clues.
2. Work/personal crossover: repeated usernames, avatars, bios, profile photos, links, or handles.
3. Routine exposure: class schedules, room numbers, travel patterns, daily routines, club meeting locations.
4. Student privacy: student names, faces, grades, rosters, screenshots, or identifiable work.
5. Professional boundaries: public comments, social links, and contact methods that may create unnecessary risk.

Output:
1. Overall risk rating: Low / Medium / High.
2. Top 5 changes to make first.
3. Findings table with: issue, why it matters, risk level, suggested fix, urgent or not.
4. What is safe to keep.
5. Semester repeat checklist.

Rules:
- Do not invent findings.
- If something needs manual review, say "needs manual check."
- Do not shame the teacher.
- Keep the tone calm, practical, and teacher-to-teacher.`,
  },
  {
    id: "username-reuse-risk-audit",
    title: "Username Reuse Risk Audit",
    category: "Cyber Safety",
    guidance:
      "Use this prompt to help teachers see where one repeated username, avatar, or bio connects personal, professional, and public identities.",
    prompt: `You are a defensive identity-safety reviewer helping a teacher audit username and profile reuse.

Important:
This is for the teacher's own accounts. Do not help investigate, stalk, dox, or profile another person.

Accounts or handles to review:
[PASTE THE TEACHER'S OWN ACCOUNT LIST, USERNAMES, PUBLIC BIOS, OR LINKS]

Context:
- Teacher role: [subject / grade / club / program]
- Public-facing work: [course site, portfolio, GitHub, YouTube, social media, club site]
- Identities to separate: [personal / professional / public creator / school-only]

Audit for:
1. Same username reused across personal, school, creator, and public accounts.
2. Same avatar or profile photo reused across contexts.
3. Same bio, tagline, website link, or contact email across contexts.
4. Personal accounts linked from professional profiles.
5. School accounts linked from personal profiles.
6. Location, family, schedule, or routine clues.

Output:
1. Identity separation risk rating: Low / Medium / High.
2. A simple identity map: personal, school, public educator, and optional creator identity.
3. What should stay connected.
4. What should be separated.
5. Specific rename, avatar, bio, and link cleanup suggestions.
6. A repeatable checklist for new accounts.

Safety rule:
The goal is basic digital self-defense, not hiding misconduct or evading school policy. Encourage the teacher to follow district policy and use approved accounts where required.`,
  },
  {
    id: "teacher-website-security-audit",
    title: "Teacher Website Security Audit",
    category: "Cyber Safety",
    guidance:
      "Use this defensive audit prompt before sharing a public teacher website, course site, Google Site, GitHub Pages site, Docusaurus site, Next.js site, club site, or portfolio.",
    prompt: `You are a defensive cybersecurity reviewer helping a teacher safely audit a public educator website.

Goal:
Review this teacher website, course site, club site, portfolio, Google Site, GitHub Pages site, Docusaurus site, or Next.js site for privacy, safety, exposure, and basic security risks.

Important:
This is a defensive safety audit. Do not provide offensive exploitation steps. Do not help stalk, harass, dox, bypass school policy, or access anything without permission.

Website or repo to review:
[PASTE URL OR REPO LINK]

Context:
- Teacher role: [subject / grade / club / program]
- Audience: [students, parents, teachers, public, employers]
- Site purpose: [course hub, portfolio, resource library, club site, etc.]
- Public or private: [public / limited / internal]
- Tools used: [Google Sites, GitHub Pages, Next.js, Docusaurus, WordPress, etc.]

Audit the site for:

1. Personal exposure
- Home address, phone number, personal email, family info, personal routines
- Location clues from photos, filenames, EXIF metadata, maps, schedules, or room numbers
- Repeated usernames, handles, avatars, bios, or links that connect personal and professional identities

2. Student/privacy exposure
- Student names, faces, grades, rosters, schedules, assignments with identifiable info
- Classroom routines that could create safety risk
- Screenshots showing student data, emails, LMS pages, or private documents

3. Account and contact safety
- Is the public contact method appropriate?
- Does the site expose a personal email where an alias/contact form would be safer?
- Are social media links necessary and professional?

4. File and media safety
- PDFs, images, downloads, and screenshots for metadata or private info
- YouTube embeds or third-party embeds for tracking or inappropriate recommendations
- Copyright/license issues with images, videos, icons, or resources

5. Website technical basics
- HTTPS
- Broken links
- Unsafe third-party scripts
- Forms and where submissions are stored
- Analytics/cookies disclosure if relevant
- Basic security headers if applicable
- Accessibility basics: alt text, contrast, readable headings, descriptive links

6. GitHub/repo exposure if applicable
- Public repo contains .env files, API keys, secrets, tokens, private notes, student data, internal URLs, screenshots, or config leaks
- README reveals too much personal or infrastructure information
- Commit history may contain sensitive information

7. Domain/privacy check if applicable
- Domain registration privacy
- Public WHOIS exposure
- Contact page exposing unnecessary personal details

Output:
Create a teacher-friendly audit report with:

1. Overall risk rating:
Low / Medium / High

2. Top 5 fixes:
List the most important changes first.

3. Findings table:
- Issue
- Why it matters
- Risk level
- How to fix it
- Whether it is urgent

4. What is safe to keep:
Identify elements that are useful and not risky.

5. What to remove or revise:
Give specific recommendations.

6. Follow-up checklist:
A short checklist the teacher can repeat once per semester.

Rules:
- Do not invent facts about the site.
- If you cannot verify something, mark it "needs manual check."
- Keep the tone calm and practical.
- Do not shame the teacher.
- Focus on reducing risk while keeping the site useful.`,
  },
  {
    id: "public-github-repo-exposure-audit",
    title: "Public GitHub Repo Exposure Audit",
    category: "Cyber Safety",
    guidance:
      "Use this before publishing or sharing a curriculum repo, club repo, teacher portfolio repo, or course-site repo.",
    prompt: `You are a defensive repository safety reviewer helping a teacher audit their own public GitHub repository.

Important:
Do not provide offensive exploitation steps. Do not help access anything without permission. Focus on reducing accidental exposure.

Repository:
[PASTE REPO URL OR FILE LIST]

Context:
- Project type: [course site, club site, template repo, Apps Script project, portfolio, resource hub]
- Audience: [students, parents, teachers, public, employers]
- Public or private: [public / private / planned public]

Check for:
1. Secrets: API keys, tokens, passwords, private URLs, .env files, service account files, OAuth credentials.
2. Student data: names, emails, grades, rosters, screenshots, LMS pages, private docs.
3. Personal exposure: personal email, phone, address, usernames, family info, location clues.
4. School exposure: internal systems, room numbers, schedules, private procedures, staff-only links.
5. Media and file metadata: images, PDFs, screenshots, filenames, hidden notes.
6. README over-sharing: unnecessary personal details, infrastructure details, or contact info.
7. Commit history risk: sensitive files removed from current view but possibly still in history.
8. Licensing: missing license, unclear content license, third-party assets without notes.

Output:
1. Overall repo exposure rating: Low / Medium / High.
2. Top 5 fixes.
3. Findings table: issue, why it matters, risk, fix, urgent.
4. Files or areas needing manual review.
5. What is safe to keep public.
6. Pre-publish checklist.

Rules:
- If you cannot inspect a file or history, mark it "needs manual check."
- Do not invent secrets or claims.
- Recommend rotating any exposed secret and removing it from history using approved tools and policy.
- Encourage following district policy and GitHub's official secret scanning guidance.`,
  },
  {
    id: "domain-contact-privacy-audit",
    title: "Domain and Contact Privacy Audit",
    category: "Cyber Safety",
    guidance:
      "Use this when a teacher owns a domain, publishes a portfolio, or adds contact information to a public site.",
    prompt: `You are a defensive privacy reviewer helping a teacher audit domain and contact exposure.

Important:
This is for a teacher's own domain or site. Do not help dox, stalk, harass, or investigate another person.

Domain/site:
[PASTE DOMAIN OR SITE URL]

Context:
- Site purpose: [course hub, portfolio, club site, resource library]
- Audience: [students, parents, teachers, public, employers]
- Contact method currently used: [school email, personal email, form, alias, social link]

Audit:
1. Domain privacy / WHOIS exposure.
2. Personal email, phone, address, or home-linked details.
3. Contact page risk.
4. Social links and public identity crossover.
5. Forms: where submissions go, what data they collect, who can access responses.
6. Analytics/cookies disclosure if relevant.
7. Whether a school-approved contact method or alias would be safer.

Output:
1. Contact/privacy risk rating: Low / Medium / High.
2. Recommended public contact strategy.
3. What to remove or replace.
4. Domain privacy checklist.
5. Form safety checklist.
6. Semester review checklist.

Rules:
- Do not claim WHOIS status unless it is provided or verifiable.
- Mark unknown items as "needs manual check."
- Encourage district-approved contact channels where required.`,
  },
  {
    id: "ai-tool-privacy",
    title: "AI Tool Privacy Prompt",
    category: "Cyber Safety",
    guidance:
      "Use this before pasting text, screenshots, files, or student-related material into any AI tool.",
    prompt: `You are a privacy reviewer helping a teacher decide whether information is safe to paste into an AI tool.

Important:
Focus on protecting students, families, colleagues, and the teacher. Encourage district policy compliance. Do not help bypass school rules.

Material I want to use with AI:
[DESCRIBE OR PASTE A REDACTED SUMMARY. DO NOT PASTE PRIVATE STUDENT DATA.]

AI tool:
[ChatGPT, Claude, Gemini, Copilot, Codex, other]

Purpose:
[lesson drafting, rubric, email, quiz, code, data analysis, image generation, etc.]

Check whether the material includes:
1. Student names, IDs, emails, grades, work samples, faces, or screenshots.
2. IEP/504, medical, behavior, discipline, counseling, or family information.
3. Parent/guardian emails, phone numbers, addresses, or private messages.
4. Staff private information or internal district information.
5. Login credentials, API keys, tokens, private URLs, or internal systems.
6. Copyrighted text or media that should not be pasted into a tool.
7. Photos, PDFs, or files with metadata or location clues.

Output:
1. Safe to paste? Yes / No / Only after redaction.
2. What must be removed or generalized first.
3. A redacted version pattern I can use.
4. Safer alternative prompt that avoids private data.
5. Policy questions I should check with my district if uncertain.

Rules:
- If private student data is involved, recommend not pasting it.
- Prefer de-identified summaries and synthetic examples.
- Do not encourage policy evasion.
- Keep the tone practical and calm.`,
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
            Teaching Teachers
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

