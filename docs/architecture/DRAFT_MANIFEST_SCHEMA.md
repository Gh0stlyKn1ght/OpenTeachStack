# Draft Manifest Schema

OpenTeachStack drafts are proposed course changes. They are not source.

Every course-local draft should include:

```txt
content/courses/{course}/drafts/{draft-id}/draft.manifest.json
```

## Required Fields

```json
{
  "schemaVersion": 1,
  "draftId": "2026-07-07-ots101-review-workbench",
  "course": "ots-101",
  "courseCode": "OTS-101",
  "purpose": "Prepare reviewed changes before promotion.",
  "createdAt": "2026-07-07",
  "createdBy": "codex",
  "status": "open",
  "sourcePolicy": "Drafts may not be treated as source until promoted.",
  "targetPaths": [],
  "validation": {
    "requiredBeforePromotion": [
      "npm.cmd run check:course-packet -- --course ots-101",
      "npm.cmd run report:course-health -- --course ots-101 --report-only"
    ],
    "lastRun": []
  },
  "promotion": {
    "allowed": false,
    "reason": "No reviewed target files have been added to this draft."
  }
}
```

## Field Rules

- `schemaVersion` must be `1`.
- `draftId` must match the draft folder name.
- `course` must match the course slug.
- `courseCode` must match the course code in `course.json`.
- `status` should be one of `open`, `review`, `promoted`, or `abandoned`.
- `sourcePolicy` must state that drafts are not source.
- `targetPaths` must list the production course paths the draft proposes to change.
- `targetPaths` must stay inside `content/courses/{course}`.
- `validation.lastRun` should be updated when checks are run against a draft.
- `promotion.allowed` should stay `false` until a human has reviewed the draft.

## Draft Folder Shape

```txt
content/courses/ots-101/drafts/2026-07-07-ots101-review-workbench/
  draft.manifest.json
  notes.md
  lessons/
  labs/
  templates/
  validation-report.json
```

The workbench may contain proposed lesson files, lab files, templates, and notes.
It must not replace production course files until a promotion workflow validates and copies the reviewed changes.

## Why This Exists

AI and batch scripts can help draft revisions, but they should not silently rewrite course source. The draft manifest keeps the proposal visible, scoped, and reviewable before any teacher-facing course material changes.
