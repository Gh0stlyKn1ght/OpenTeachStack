# CourseOS

CourseOS is the OpenTeachStack architecture layer that keeps course truth in one place.

It exists because a folder full of files is not a course, a route is not a lesson, and an export package is not release evidence.

## Purpose

CourseOS should make these questions easy to answer:

- What course is this?
- Where is its source?
- What route exposes it?
- Is it draft, review, live, archived, or planned?
- Has a human reviewed it?
- What exports exist?
- What checks prove the course is structurally healthy?
- What still blocks release?
- Is the source protected by a lock?

The answer should come from the course packet and the Course Control Plane, not from scattered arrays, old docs, or export folders.

## Source Boundary

The source of truth for a course is:

```txt
content/courses/{course}
```

Exports are downstream packaging:

```txt
teachable/
canvas/
google-classroom/
print/
pdf/
static-site/
```

Exports can help teachers publish. They cannot prove the course teaches.

## Active Course Boundary

OTS-101 remains the active course rebuild.

OTS-000 is the on-ramp that supports OTS-101.

Other courses may remain visible as draft previews or pathway signals, but they should not be marked release-ready until their own source, review, and status files prove it.

## CourseOS Parts

CourseOS has these parts:

- Course Control Plane: normalized course records used by scripts and future runtime code.
- Course Packet Contract: the manifest and folder rules for each course.
- Course Health Reports: generated evidence of readiness, missing files, review state, and lock state.
- PacketLock: protection for reviewed course source.
- Draft Workbench: a safe place for proposed AI or human changes.
- Promotion Pipeline: explicit movement from draft into source.
- Course-Level Runtime Boundaries: failure isolation so one broken course cannot take down the pathway.

## Implementation Rule

CourseOS should be added in small layers.

Do not rewrite lessons to satisfy architecture.
Do not mark courses live because a new check exists.
Do not mass-migrate the whole pathway before OTS-000 and OTS-101 prove the model.

The first useful win is boring and important: make course truth inspectable.
