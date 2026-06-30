# OTS-101 Lessons

This folder contains the drafted OTS-101 lesson set.

OTS-101 now follows OTS-000. Chapter revisions should keep OTS-000 as the teacher tech-stack orientation and keep OTS-101 focused on AI-assisted course content foundations.

Active chapter folders:

```txt
- 01-curriculum-vs-course-content
- 02-standards-goals-to-lessons
- 03-prompting-without-garbage
- 04-verify-ai-before-students
- 05-student-facing-lessons
- 06-assignments-labs-rubrics-feedback
- 07-organizing-course-content-system
- 08-safety-accessibility-copyright-source-quality
- 09-publishing-to-platform
- 10-mini-course-content-packet
```

Legacy folders such as `01-teacher-builder-mindset`, `02-prompting`, and `10-mini-unit-capstone` were removed because they belonged to the earlier placeholder course shape and caused source-of-truth confusion.

Do not recreate legacy folders to satisfy routes. The active course registry is `src/lib/book.ts`, and authored lesson content belongs in the active chapter folders above.

Before marking the course release-ready, review every chapter against `../docs/OTS_000_TO_OTS_101_ALIGNMENT.md`.

## Lesson Folder Map

Scan this folder by chapter:

- Chapter overview files frame the teacher problem.
- Lesson files carry the actual build and review work.
- Checkpoint files decide whether the artifact is ready, needs revision, or is blocked.
