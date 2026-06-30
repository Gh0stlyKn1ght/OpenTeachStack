# Course Architecture Truth Audit

Date: 2026-06-26

Sequence update, 2026-06-28: this audit predates the OTS-000 on-ramp decision. Treat OTS-101-only statements below as stale unless they have been revised to the OTS-000 -> OTS-101 sequence.

## Current architecture problem

OpenTeachStack had two competing mental models:

- `content/courses/{course}` looked like the course-owned content root.
- Root-level `teachable/{course}` looked like a parallel course root because every course had the same export package files.

That second shape is dangerous. It teaches the repo, and any agent working in it, that a course is a reusable upload bundle. That is how fake sameness creeps back in.

A Teachable package is not a course. A course-description file is not a course. A lesson-outline CSV is not a lesson. A quiz-plan file is not assessment evidence. A downloads-index is not proof that templates exist. Video script notes are not teacher-facing course content.

## What was found

| Area | Finding | Risk |
| --- | --- | --- |
| `teachable/` | Every target course has the same seven export files. | Agents can treat export completeness as course completeness. |
| `teachable/README.md` | Correctly says export support, but also called it a curriculum delivery spine. | That wording still sounds like source-of-truth course architecture. |
| `content/courses/` | This is the better root and already contains course-owned folders. | It still used older `lessons/` layout instead of the clearer `chapters/` layout. |
| OTS-101 | Has 12 real lesson files and 13 templates. | It is draft, not live. Later chapters are still missing. |
| Other courses | Have zero lesson MDX files after fake placeholders were removed, but still have templates/docs/export support. | They must remain Coming Soon and unavailable. |
| Course docs | Some stale course outline files still claimed `release-ready outline`. | Stale claims can override the honest status model in future work. |
| Routes | Non-OTS-000/OTS-101 book routes now render Coming Soon stop pages. | Keep this behavior until the OTS-000/OTS-101 sequence is genuinely reviewed. |
| Scripts | Bulk authoring commands are refused by package scripts, but old authoring scripts still exist. | They should remain blocked unless intentionally removed or rewritten as audited one-course tools. |

## Source-of-truth folders

The source of truth is:

```txt
content/courses/{course}/
```

Each course owns its real lessons, templates, examples, assessments, source notes, sample packets, and export targets there.

The course source marker is now:

```txt
content/courses/{course}/status.json
```

## Export-only folders

Root-level `teachable/` is legacy export support only.

Course-local Teachable exports belong downstream from the course:

```txt
content/courses/{course}/exports/teachable/
```

The course-local export folder is intentionally not proof that the course is live. It is a place for packaging output generated from or checked against the course source.

## Truly live courses

None.

OTS-000 and OTS-101 are the active draft sequence. Neither is live yet.

## Courses with Teachable packages but no real lesson tree

These courses have root-level Teachable packages but no real lesson MDX files:

- OTS-201
- OTS-220
- OTS-240
- OTS-260
- OTS-280
- OTS-301
- OTS-320
- OTS-399

They are Coming Soon and frozen until OTS-000 and OTS-101 prove the on-ramp plus foundations content model.

## Recommended migration tree

Target shape:

```txt
content/
  courses/
    ots-000/
    ots-101/
      course.md
      status.json
      voice-notes.md
      chapters/
        01-curriculum-vs-course-content/
          chapter.md
          lessons/
            01-0-overview.mdx
            01-1-what-counts-as-curriculum.mdx
          artifacts/
          examples/
      templates/
      sample-packet/
      assessments/
      sources/
      exports/
        teachable/
```

Near-term compatible shape:

```txt
content/
  courses/
    ots-000/
    ots-101/
      course.json
      status.json
      lessons/
      templates/
      examples/
      docs/
      references/
      exports/
        teachable/
```

Use the near-term shape until routes and readers are migrated safely.

## Scripts/checks that must change or stay guarded

- Keep `scaffold:courses` and `author:*` commands refusing fake course generation.
- Keep `check:content-layout` pointed at `content/courses`.
- Add source-truth checks so every course has `status.json` and Teachable exports cannot imply live status.
- Do not let release checks count root-level `teachable/{course}` as course readiness.

## Human review needed

- Decide whether root-level `teachable/` should eventually move to `exports/teachable/` or stay as a legacy bridge.
- Review whether stale historical audit docs should be archived or clearly marked as outdated snapshots.
- Review OTS-000 and OTS-101 together for voice, usefulness, and sequencing before any later pathway course opens.
