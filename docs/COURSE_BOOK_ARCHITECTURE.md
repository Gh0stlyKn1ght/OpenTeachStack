# OpenTeachStack Course Book Architecture

Date: 2026-06-26

Sequence update, 2026-06-28: OTS-000 now precedes OTS-101. OTS-000 is the teacher tech-stack orientation; OTS-101 is the AI course-content foundations sequel.

OpenTeachStack should feel like a course book, not a short professional development outline.

OpenTeachStack is the course pathway. Course codes use
`OTS-###` because `OTS` stands for **Open Teacher Stack**. Do not rename course
codes to `TT-###`.

The preferred hierarchy is:

```txt
Course Path -> Course -> Chapter -> Section -> Workshop / Artifact / Checkpoint
```

## Terminology

| Old visible term | New visible term | Use |
| --- | --- | --- |
| Pathway | Course Path | A sequence of related courses |
| Module | Chapter | A major unit inside a course |
| Lesson | Section | A readable teacher-facing learning page |
| Lab | Workshop | A hands-on build activity |
| Template | Artifact Template | A reusable document or sheet structure |
| Capstone | Capstone Studio / Final Build | The final assembled project |

Internal legacy names may remain temporarily when changing them would break existing routes, scripts, or content frontmatter.

## Current active sequence

OTS-000 is the on-ramp for the working environment: files, folders, VS Code, GitHub basics, Markdown/MDX, websites and hosting concepts, AI assistants, MCP-style tool access, backups, secrets, and the Teacher Builder Starter Kit.

OTS-101 follows that on-ramp as **AI Course Content Foundations for Teachers** and uses 10 chapters:


- Chapter 01: Curriculum vs Course Content
- Chapter 02: From Standards or Goals to Lessons
- Chapter 03: Prompting AI Without Generic Garbage
- Chapter 04: Verifying AI Before Students See It
- Chapter 05: Building Real Student-Facing Lessons
- Chapter 06: Assignments, Labs, Rubrics, and Feedback
- Chapter 07: Organizing the Course Content System
- Chapter 08: Safety, Accessibility, Copyright, and Source Quality
- Chapter 09: Publishing to a Platform
- Chapter 10: Capstone: Build a Mini Course Content Packet

Each chapter should eventually contain:

- Chapter overview
- The real teacher problem
- Core concept
- Workflow
- Example
- Non-example
- Guided practice
- Build task
- Verification check
- Reflection
- Chapter checkpoint

## Current Implementation

The current repo keeps legacy authored MDX content in `content/lessons` and `content/labs` for compatibility while the course books read from course-owned content under `content/courses/{courseSlug}`.

Each course folder carries its own `course.json`, `status.json`, `lessons/`, `labs/`, `assets/`, `docs/`, `templates/`, `references/`, and `exports/` directories so a course can be exported, reviewed, or improved without hunting through global buckets.

Root-level `teachable/` is legacy export support only. It is not a course-authoring root.

The Book Mode layer adds the deeper course-book model through metadata in `src/lib/book.ts`:

- `BOOK_COURSE_CODE`
- `BOOK_COURSE_PATH`
- `BOOK_CHAPTERS`
- `CHAPTER_SECTIONS`
- `CHAPTER_SKILLS`
- `TRANSFERABLE_SKILLS`

This lets `/book/ots-000`, `/book/ots-101`, and their chapter routes render chapter sections from the course-owned structure.

The current Book Mode route also renders section pages at:

```txt
/book/{course}/[chapter]/[section]
```

These section pages render the course-owned MDX lesson bodies. Existing legacy MDX pages may still be linked as related readings when they map cleanly to a section.

## Course-Owned File Structure

Use this structure for every course:

```txt
content/
├─ courses/
│  ├─ ots-000/
│  └─ ots-101/
│     ├─ README.md
│     ├─ course.json
│     ├─ status.json
│     ├─ lessons/
│     │  ├─ 01-curriculum-vs-course-content/
│     │  │  ├─ README.md
│     │  │  ├─ 01-0.mdx
│     │  │  ├─ 01-1.mdx
│     │  │  └─ ...
│     │  └─ ...
│     ├─ labs/
│     ├─ assets/
│     ├─ docs/
│     ├─ templates/
│     ├─ references/
│     └─ exports/
│        └─ teachable/
```

For the future chapter-first target, see `docs/COURSE_FOLDER_STANDARD.md`.

## Content Rules

- Do not delete authored content.
- Do not overwrite existing lesson bodies with template output.
- Do not treat Teachable export files as course source content.
- Do not mark a course live because it has a Teachable folder.
- Do not break old routes without redirects or compatibility wrappers.
- Keep `/course` and `/lessons` available until the book routes fully replace them.
- Prefer course-owned folders before moving readers.
- Preserve source links, attribution, safety notes, and teacher voice.
- Keep tool-stack orientation material in OTS-000.
- Keep advanced material out of OTS-101 unless it is clearly marked as future, optional, or a preview.
- Run `npm run check:content-layout` after course-folder changes when you want a quick structural check.
- Run course-generation scripts only when intentionally refreshing course-owned drafts, and keep the no-overwrite safety checks in place.

## Next Build Steps

1. Keep course readers pointed at `content/courses/{courseSlug}`.
2. Continue enriching lesson bodies with classroom examples, non-examples, filled artifacts, and review checkpoints.
3. Keep copied docs, labs, assets, templates, and references inside each course folder.
4. Run `npm run check:content-layout` for a quick structural check after content-folder changes.
5. Run `npm run test` for the non-mutating local gate, then `npm run verify:release`; local testing covers typecheck, lint, route contracts, content layout, scaffold-fallback protection, content-authoring overwrite protection, learner-facing content checks, uniqueness checks, release-readiness checks, prompt-library checks, source-bank links, and every course-reader migration check before release verification runs production build and route smoke probes.
