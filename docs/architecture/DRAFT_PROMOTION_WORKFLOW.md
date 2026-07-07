# Draft Promotion Workflow

OpenTeachStack should not let AI or batch scripts write directly into approved course source.

Drafts are proposals.
Promotion is the explicit review step.
Source is the maintained course.

## Draft Location

Course-local drafts should live here:

```txt
content/courses/{course}/drafts/{draft-id}
```

Example:

```txt
content/courses/ots-101/drafts/2026-07-06-content-fix/
  draft.manifest.json
  lessons/
  labs/
  templates/
  notes.md
  validation-report.json
```

## Draft Manifest

Each draft should name:

- draft id
- course
- purpose
- created date
- created by
- status
- target paths
- source policy

The source policy should be plain:

> Drafts may not be treated as source until promoted.

The maintained manifest field contract lives in:

```txt
docs/architecture/DRAFT_MANIFEST_SCHEMA.md
```

## Promotion Requirements

Promotion must:

1. Locate the draft manifest.
2. Validate target paths.
3. Reject writes outside the course packet.
4. Reject writes to locked source unless maintenance unlock is active.
5. Compare draft files against current source.
6. Generate a diff report.
7. Run course packet validation.
8. Copy approved files into source only after validation passes.
9. Write a promotion report.
10. Leave `status.json` unchanged unless a human intentionally updates it.

## Current Commands

The default promotion command validates and reports only. It does not copy draft files into source.

```bash
npm.cmd run promote:course-draft -- --course ots-101 --draft 2026-07-07-ots101-review-workbench
```

To save the dry-run report:

```bash
npm.cmd run promote:course-draft -- --course ots-101 --draft 2026-07-07-ots101-review-workbench --write-report
```

The report is written to:

```txt
content/courses/ots-101/drafts/2026-07-07-ots101-review-workbench/promotion-dry-run-report.json
```

## Apply Contract

The command has an apply mode, but it refuses to copy unless all approval gates are true:

```bash
npm.cmd run promote:course-draft -- --course ots-101 --draft <reviewed-draft-id> --apply --approved-by <reviewer-name> --write-report
```

Apply mode requires:

- `--apply`
- `--approved-by <name>`
- draft manifest `status: "review"`
- draft manifest `promotion.allowed: true`
- at least one `targetPaths` entry
- every target path stays inside `content/courses/{course}`
- every target has a matching draft file
- no unmapped draft files remain
- the course is not locked

After copying, the script runs post-copy validation:

```txt
npm.cmd run check:course-packet -- --course {course}
npm.cmd run report:course-health -- --course {course} --report-only
npm.cmd run verify:locks
```

For OTS-101 it also runs:

```txt
npm.cmd run check:ots101-reader
npm.cmd run check:ots101-book-titles
```

The current OTS-101 workbench is not promotable yet. It has no `targetPaths`, remains `open`, and has `promotion.allowed: false`.

## Failure Fixtures

Promotion failure fixtures live under OTS-101 drafts:

```txt
content/courses/ots-101/drafts/fixture-outside-packet-target
content/courses/ots-101/drafts/fixture-missing-draft-file
```

They are not content drafts. They exist so the promotion command can prove it refuses unsafe targets before any real reviewed draft is copied.

Expected failure checks:

```bash
npm.cmd run promote:course-draft -- --course ots-101 --draft fixture-outside-packet-target --apply --approved-by fixture
npm.cmd run promote:course-draft -- --course ots-101 --draft fixture-missing-draft-file --apply --approved-by fixture
npm.cmd run promote:course-draft -- --course ots-101 --draft 2026-07-07-ots101-review-workbench --apply --approved-by fixture --simulate-locked
```

All fixture commands should exit nonzero and copy zero files. `--simulate-locked` exists only for the check harness; do not use it for real promotion.

The automated gate is:

```bash
npm.cmd run check:course-draft-promotion
```

It verifies the active workbench dry-run path and the current promotion refusal fixtures.

## What This Prevents

This workflow prevents:

- route fixes from rewriting lessons
- format passes from flattening voice
- AI drafts from becoming source by accident
- export packages from drifting ahead of the real course
- reviewed course source from being overwritten by cleanup scripts

The goal is not bureaucracy. The goal is to keep a tired teacher from inheriting fake-complete content.
