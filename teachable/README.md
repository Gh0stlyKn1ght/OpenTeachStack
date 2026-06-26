# Legacy Teachable Export Support

This folder stores legacy instructor-facing packaging metadata for Teachable.

This folder is export-only. It is not course source content.

The course source of truth is:

```txt
content/courses/{course}/
```

Course-local Teachable export support belongs at:

```txt
content/courses/{course}/exports/teachable/
```

Root-level `teachable/{course}` folders may remain temporarily as legacy export support, but they must not be used to prove that a course is real, live, complete, or ready.

Course folders here are intentionally minimal and export-oriented. They should remain downstream from course metadata and real lesson outcomes.

Keep each file practical:
- course-description.md
- lesson-outline.csv
- downloads-index.md
- quiz-plan.md
- capstone-or-final-project.md
- video-script-notes.md
- instructor-talking-points.md

Do not mirror lesson content. Do not use this as a course-authoring structure.

A Teachable package is not a course.
