# OpenTeachStack Course Book Architecture

Date: 2026-06-21

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

## OTS-101 Structure

OTS-101 Foundations uses 10 chapters:

- Chapter 01: Teacher Builder Mindset
- Chapter 02: Prompting for Teachers
- Chapter 03: AI Literacy and Verification
- Chapter 04: Standards to Learning Targets
- Chapter 05: Course and Unit Architecture
- Chapter 06: Resource Discovery and Open Resources
- Chapter 07: Google Workspace Planning Systems
- Chapter 08: Assessment, Rubrics, and Feedback
- Chapter 09: Delivery Planning
- Chapter 10: Mini-Unit Capstone

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

Each course folder carries its own `course.json`, `lessons/`, `labs/`, `assets/`, `docs/`, `templates/`, and `references/` directories so a course can be exported, reviewed, or improved without hunting through global buckets.

The Book Mode layer adds the deeper course-book model through metadata in `src/lib/book.ts`:

- `BOOK_COURSE_CODE`
- `BOOK_COURSE_PATH`
- `BOOK_CHAPTERS`
- `CHAPTER_SECTIONS`
- `CHAPTER_SKILLS`
- `TRANSFERABLE_SKILLS`

This lets `/book/ots-101` and `/book/ots-101/[chapter]` render chapter sections from the course-owned structure.

The current Book Mode route also renders section pages at:

```txt
/book/ots-101/[chapter]/[section]
```

These section pages render the course-owned MDX lesson bodies. Existing legacy MDX pages may still be linked as related readings when they map cleanly to a section.

## Course-Owned File Structure

Use this structure for every course:

```txt
content/
├─ courses/
│  └─ ots-101/
│     ├─ README.md
│     ├─ course.json
│     ├─ lessons/
│     │  ├─ 01-teacher-builder-mindset/
│     │  │  ├─ README.md
│     │  │  ├─ 01-0.mdx
│     │  │  ├─ 01-1.mdx
│     │  │  └─ ...
│     │  └─ ...
│     ├─ labs/
│     ├─ assets/
│     ├─ docs/
│     ├─ templates/
│     └─ references/
```

## Content Rules

- Do not delete authored content.
- Do not overwrite existing lesson bodies with template output.
- Do not break old routes without redirects or compatibility wrappers.
- Keep `/course` and `/lessons` available until the book routes fully replace them.
- Prefer course-owned folders before moving readers.
- Preserve source links, attribution, safety notes, and teacher voice.
- Keep advanced material out of OTS-101 unless it is clearly marked as future, optional, or a preview.
- Run `npm run check:content-layout` after course-folder changes when you want a quick structural check.
- Run course-generation scripts only when intentionally refreshing course-owned drafts, and keep the no-overwrite safety checks in place.

## Next Build Steps

1. Keep course readers pointed at `content/courses/{courseSlug}`.
2. Continue enriching lesson bodies with classroom examples, non-examples, filled artifacts, and review checkpoints.
3. Keep copied docs, labs, assets, templates, and references inside each course folder.
4. Run `npm run check:content-layout` for a quick structural check after content-folder changes.
5. Run `npm run test` for the non-mutating local gate, then `npm run verify:release`; local testing covers typecheck, lint, route contracts, content layout, scaffold-fallback protection, content-authoring overwrite protection, learner-facing content checks, uniqueness checks, release-readiness checks, prompt-library checks, source-bank links, and every course-reader migration check before release verification runs production build and route smoke probes.
