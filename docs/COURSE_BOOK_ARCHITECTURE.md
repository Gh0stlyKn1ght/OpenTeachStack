# Teaching Teachers Course Book Architecture

Date: 2026-06-21

Teaching Teachers should feel like a course book, not a short professional development outline.

Course codes use `OTS-###` because `OTS` stands for **Open Teacher Stack**.
Do not rename course codes to `TT-###`.

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

The current repo keeps authored MDX content in the existing `content/lessons` and `content/labs` folders for compatibility.

Course-owned migration scaffolds now live in `content/courses/{courseSlug}`. Each course folder carries its own `course.json`, `lessons/`, `labs/`, `assets/`, `docs/`, `templates/`, and `references/` directories so a course can be exported or migrated without hunting through global buckets.

The Book Mode layer adds the deeper course-book model through metadata in `src/lib/book.ts`:

- `BOOK_COURSE_CODE`
- `BOOK_COURSE_PATH`
- `BOOK_CHAPTERS`
- `CHAPTER_SECTIONS`
- `CHAPTER_SKILLS`
- `TRANSFERABLE_SKILLS`

This lets `/book/ots-101` and `/book/ots-101/[chapter]` render chapter sections before the full content-file migration is complete.

The current Book Mode route also renders section pages at:

```txt
/book/ots-101/[chapter]/[section]
```

These section pages are generated from metadata first. Existing authored MDX pages are linked as related readings when they map cleanly to a section.

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

## Migration Rules

- Do not delete authored content.
- Do not overwrite existing lesson bodies with generated templates.
- Do not break old routes without redirects or compatibility wrappers.
- Keep `/course` and `/lessons` available until the book routes fully replace them.
- Prefer course-owned folders before moving readers.
- Preserve source links, attribution, safety notes, and teacher voice.
- Keep advanced material out of OTS-101 unless it is clearly marked as future, optional, or a preview.
- Run `npm run check:content-layout` after course-folder changes.
- Run `npm run scaffold:courses` only when intentionally refreshing scaffolds from the current registries.

## Next Build Steps

1. Move one course reader at a time from registry metadata to `content/courses/{courseSlug}`.
2. Replace scaffold section files with authored course-local lesson bodies.
3. Keep copied docs, labs, assets, templates, and references inside each course folder.
4. Add examples and non-examples to the highest-priority sections.
5. Run `npm run check:routes`, `npm run check:content-layout`, `npm run lint`, and `npm run build`.
6. Run representative route probes before deleting or retiring global content files.
