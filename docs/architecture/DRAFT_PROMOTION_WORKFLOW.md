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

## What This Prevents

This workflow prevents:

- route fixes from rewriting lessons
- format passes from flattening voice
- AI drafts from becoming source by accident
- export packages from drifting ahead of the real course
- reviewed course source from being overwritten by cleanup scripts

The goal is not bureaucracy. The goal is to keep a tired teacher from inheriting fake-complete content.
