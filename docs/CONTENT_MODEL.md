# OpenTeachStack Content Model

Date: 2026-06-26

Sequence update, 2026-06-28: OTS-000 is now the teacher tech-stack orientation and OTS-101 is the course-content foundations sequel.

OpenTeachStack teaches teachers how to create student-facing course content with AI. It does not treat a route, file, outline, or generated MDX body as proof that a course teaches.

Agent identity: teacher-facing course writer first, repo engineer second.

Source of truth: `content/courses/{course}`.

Export targets such as Teachable are downstream packaging, not course source content.

## Core definitions

| Term | Meaning |
| --- | --- |
| Curriculum | The learning plan: outcomes, standards, sequence, pacing, assessment evidence, and instructional intent. |
| Student-facing course content | Lessons, readings, examples, labs, assignments, quizzes, videos, and directions students actually use. |
| Instructional materials | Slides, rubrics, teacher notes, demos, answer keys, templates, and support documents. |
| Course platform | The container: LMS, Teachable, Google Classroom, website, course book, or course hub. |
| Course content system | The connected structure that holds content, materials, delivery, verification, revision, and archive routines together. |

## Course status policy

One real course is better than nine fake courses.

- `draft`: visible as an active rebuild, but not release-ready.
- `authored`: a real teacher-facing lesson body exists and passes the lesson quality rubric.
- `reviewed`: authored content has been checked against the rubric and route behavior.
- `teachable-ready`: reviewed content also has templates, sample packet evidence, and release checks.
- `coming-soon`: the course may appear in the pathway, but lessons must be unavailable until the OTS-000/OTS-101 sequence is right and the course is intentionally rebuilt.

Do not use file existence, route coverage, or passing checks as evidence that a course is live.
Do not use root-level `teachable/{course}` folders as evidence that a course is live.

## Non-negotiables

- Do not create placeholder MDX to satisfy route checks.
- Do not mark content authored unless the body teaches.
- Do not call all online content curriculum.
- Do not restore deleted fake lesson files to make tests pass.
- Missing content should render as intentionally unavailable or stay unlinked.
- Do not rebuild later pathway courses until OTS-000 and OTS-101 have real, reviewed, teacher-useful content as a sequence.
- Do not let export folders define course architecture.

## OTS-000 on-ramp target

OTS-000 is the teacher tech-stack orientation.

By the end, a teacher should understand the practical tools and boundaries needed to work safely in the rest of OpenTeachStack: files and folders, VS Code, GitHub basics, Markdown/MDX, websites and hosting concepts, AI assistants, MCP-style tool access, backups, secrets, and the Teacher Builder Starter Kit.

OTS-000 should not drift into course-content authoring. Its job is confidence with the working environment.

## OTS-101 rebuild target

OTS-101 is now **AI Course Content Foundations for Teachers**.

By the end, a teacher should be able to use AI to help build a small student-facing course content packet that is teachable, verified, safe, accessible, and reusable.

OTS-101 assumes OTS-000 or equivalent comfort with the basic tool stack. It should not reteach GitHub, VS Code, file management, website hosting, secrets, backups, or coding-agent setup except as brief local context.

Required lesson ingredients:

- real teacher problem
- plain-language explanation
- concrete classroom scenario
- weak or risky version
- better version
- build step
- quality check
- safety, accessibility, source, privacy, or copyright note
- reflection tied to the artifact
- capstone packet connection

Visual requirement:

- Use readable visuals when they clarify the concept.
- Step-card visuals fit sequences and workflows.
- Tab/category-card visuals fit distinctions and comparison sets.
- Tables fit audits, checklists, rubrics, and evidence reviews.
- Mermaid is allowed only when it is more readable than cards or tables.

## Formatting Is Instruction

OpenTeachStack treats formatting as part of the content model. Headings, lists, examples, tables, checklists, code blocks, and visual cards are not decoration; they help teachers see the learning path, action, evidence, and review boundary.

A course page can fail even when the wording is human if the structure makes the teacher hunt for what to do next.

