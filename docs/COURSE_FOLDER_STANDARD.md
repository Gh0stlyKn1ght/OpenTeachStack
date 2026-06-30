# Course Folder Standard

Date: 2026-06-26

## Core rule

`content/courses/{course}` is the source of truth.

Teachable, Google Classroom, Canvas, a website, PDFs, and course hubs are export or publishing targets. They are not the course.

## Course status marker

Every course must include:

```txt
content/courses/{course}/status.json
```

Required fields:

```json
{
  "status": "draft",
  "sourceOfTruth": "content/courses/ots-101",
  "exportTargets": ["teachable"],
  "hasRealLessons": true,
  "hasTemplates": true,
  "hasSamplePacket": true,
  "humanReviewed": false,
  "notes": "Short honest status note."
}
```

Allowed status values:

- `live`: real lesson bodies, templates, sample packet, and human review are complete.
- `draft`: real work exists, but the course is not ready.
- `planned`: the course belongs to the pathway but does not have real lessons.
- `archived`: legacy, fake, duplicated, or intentionally removed from live routes.

## Current compatible structure

Use this while existing route readers still expect `lessons/`:

```txt
content/
  courses/
      ots-000/
      ots-101/
      README.md
      course.json
      status.json
      lessons/
      templates/
      examples/
      labs/
      docs/
      references/
      assets/
      exports/
        teachable/
```

## Future preferred structure

Use this when the reader is ready for chapter-owned lesson folders:

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
          artifacts/
          examples/
      templates/
      sample-packet/
      assessments/
      sources/
      exports/
        teachable/
```

## Export rule

Course-local export targets live here:

```txt
content/courses/{course}/exports/{target}/
```

Root-level `teachable/` is legacy export support. It must not be used as proof that a course exists, is live, or is ready.

## Live-course rule

A course may be marked `live` only when all of these are true:

- real teacher-facing lesson bodies exist
- templates exist
- sample packet exists
- route behavior exposes the course intentionally
- human review is complete
- docs/COURSE_STATUS.md says live
- `status.json` says `status: "live"`

File count, route count, Teachable package count, and green build status are not enough.

## Active sequence boundary

OTS-000 and OTS-101 are the only active sequence work.

OTS-000 is the teacher tech-stack orientation and on-ramp. OTS-101 is the AI course-content foundations sequel.

All other courses stay planned/Coming Soon until the OTS-000/OTS-101 sequence is right.
