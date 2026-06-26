# Content Rebuild Report

Date: 2026-06-26

## Why this rebuild started

The repo had working routes and many course-shaped files, but most course lesson bodies were generic generated scaffolds. That created a false release state: the site looked complete while the lessons did not actually teach teachers how to create student-facing course content with AI.

## Fake/scaffold content removed

The placeholder MDX lesson bodies that matched repeated scaffold language were deleted from course lesson folders. The repo now prefers intentionally unavailable lessons over fake authored content.

Legacy OTS-101 folders such as `01-teacher-builder-mindset`, `02-prompting`, and `10-mini-unit-capstone` were removed from the active lesson path because they belonged to the earlier placeholder course shape.

## OTS-101 real content created

OTS-101 was retargeted as:

**AI Course Content Foundations for Teachers**

Chapters 01-10 now have authored draft lesson bodies in the active course structure:

| Chapter | Active slug | Build artifact |
| --- | --- | --- |
| 01 | `01-curriculum-vs-course-content` | Course content inventory |
| 02 | `02-standards-goals-to-lessons` | Learning target and lesson map |
| 03 | `03-prompting-without-garbage` | Reusable course-content prompt |
| 04 | `04-verify-ai-before-students` | AI output verification checklist |
| 05 | `05-student-facing-lessons` | Student-facing lesson page |
| 06 | `06-assignments-labs-rubrics-feedback` | Assignment and rubric packet |
| 07 | `07-organizing-course-content-system` | Course content folder map |
| 08 | `08-safety-accessibility-copyright-source-quality` | Content safety review |
| 09 | `09-publishing-to-platform` | Publishing checklist |
| 10 | `10-mini-course-content-packet` | Mini course content packet |

The authored pass uses a consistent lesson pattern: teacher problem, idea, classroom scenario, weak/better examples, build step, quality check, safety/accessibility/source note, reflection, and capstone connection.

## Route and pathway behavior changes

- Section routes show an honest unavailable state when a lesson body is missing.
- OTS-101 is the active draft course.
- Other pathway courses are Coming Soon and should not behave like clickable live courses.
- Root-level `teachable/{course}` folders are export support only and do not prove course readiness.

## Documentation and guardrails added

- `VOICEPRINT.md`
- `BLOG_VOICEPRINT.md`
- `BLOG_AUTHOR_PROFILE.md`
- `docs/FORMATTING_STANDARD.md`
- `docs/INSTRUCTIONAL_VISUAL_BLOCKS.md`
- `docs/COURSE_FOLDER_STANDARD.md`
- `docs/COURSE_ARCHITECTURE_TRUTH_AUDIT.md`
- blog/build-note templates and checks
- format/readability audit script
- fake course generation refusal scripts

## Current status

OTS-101 has a complete authored draft pass, but it is not release-ready yet.

Remaining work before release:

1. Human review for voice, accuracy, classroom realism, and example quality.
2. Visual/readability review of all chapters.
3. Sample mini course packet refresh.
4. Validation gates after review.
5. Final release-readiness decision.
