# FULL_CONTENT_AUDIT_2026

Generated: 2026-06-25T22:40:57.213Z

## Executive Summary

OpenTeachStack now has the instructional-depth gate wired into the test chain and passing across all release-targeted course lessons. The broad remediation pass focused on concrete classroom examples, artifact links, completed sample rows, technical code samples, safety boundaries, common mistakes, and reviewer checks.

This audit is an evidence snapshot, not a claim that every course is commercially final. The current verified state is release-ready by local gates, with Teachable support files and course examples present for each target course.

## Course Readiness Table

| course | readiness | courseStatus | lesson count | authored | reviewed | teachable-ready | remediated | generated/scaffolded |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| ots-101 | release | authored | 89 | 80 | 9 | 0 | 0 | 0/0 |
| ots-201 | release | authored | 36 | 36 | 0 | 0 | 0 | 0/0 |
| ots-220 | release | authored | 31 | 30 | 1 | 0 | 0 | 0/0 |
| ots-240 | release | authored | 30 | 30 | 0 | 0 | 0 | 0/0 |
| ots-260 | release | authored | 30 | 30 | 0 | 0 | 0 | 0/0 |
| ots-280 | release | authored | 63 | 63 | 0 | 0 | 0 | 0/0 |
| ots-301 | release | authored | 30 | 30 | 0 | 0 | 0 | 0/0 |
| ots-320 | release | authored | 30 | 30 | 0 | 0 | 0 | 0/0 |
| ots-399 | release | authored | 30 | 29 | 1 | 0 | 0 | 0/0 |

## Instructional Depth Gate

- Command: npm run check:instructional-depth
- Result: PASS
- Scope: 9 courses, 369 checked lessons, 0 skipped lessons
- Evidence doc: docs/instructional-depth-check-summary-2026-06-25.md

## Examples Structure

| course | examples directory | file count | sample files |
| --- | --- | --- | --- |
| ots-101 | yes | 5 | examples/completed-artifact.md, examples/README.md, examples/reviewer-notes.md, examples/strong-version.md, examples/weak-version.md |
| ots-201 | yes | 5 | examples/completed-artifact.md, examples/README.md, examples/reviewer-notes.md, examples/strong-version.md, examples/weak-version.md |
| ots-220 | yes | 5 | examples/completed-artifact.md, examples/README.md, examples/reviewer-notes.md, examples/strong-version.md, examples/weak-version.md |
| ots-240 | yes | 5 | examples/completed-artifact.md, examples/README.md, examples/reviewer-notes.md, examples/strong-version.md, examples/weak-version.md |
| ots-260 | yes | 5 | examples/completed-artifact.md, examples/README.md, examples/reviewer-notes.md, examples/strong-version.md, examples/weak-version.md |
| ots-280 | yes | 5 | examples/completed-artifact.md, examples/README.md, examples/reviewer-notes.md, examples/strong-version.md, examples/weak-version.md |
| ots-301 | yes | 5 | examples/completed-artifact.md, examples/README.md, examples/reviewer-notes.md, examples/strong-version.md, examples/weak-version.md |
| ots-320 | yes | 5 | examples/completed-artifact.md, examples/README.md, examples/reviewer-notes.md, examples/strong-version.md, examples/weak-version.md |
| ots-399 | yes | 5 | examples/completed-artifact.md, examples/README.md, examples/reviewer-notes.md, examples/strong-version.md, examples/weak-version.md |

## Teachable Export Support

| course | teachable directory | file count | files |
| --- | --- | --- | --- |
| ots-101 | yes | 7 | capstone-or-final-project.md, course-description.md, downloads-index.md, instructor-talking-points.md, lesson-outline.csv, quiz-plan.md, video-script-notes.md |
| ots-201 | yes | 7 | capstone-or-final-project.md, course-description.md, downloads-index.md, instructor-talking-points.md, lesson-outline.csv, quiz-plan.md, video-script-notes.md |
| ots-220 | yes | 7 | capstone-or-final-project.md, course-description.md, downloads-index.md, instructor-talking-points.md, lesson-outline.csv, quiz-plan.md, video-script-notes.md |
| ots-240 | yes | 7 | capstone-or-final-project.md, course-description.md, downloads-index.md, instructor-talking-points.md, lesson-outline.csv, quiz-plan.md, video-script-notes.md |
| ots-260 | yes | 7 | capstone-or-final-project.md, course-description.md, downloads-index.md, instructor-talking-points.md, lesson-outline.csv, quiz-plan.md, video-script-notes.md |
| ots-280 | yes | 7 | capstone-or-final-project.md, course-description.md, downloads-index.md, instructor-talking-points.md, lesson-outline.csv, quiz-plan.md, video-script-notes.md |
| ots-301 | yes | 7 | capstone-or-final-project.md, course-description.md, downloads-index.md, instructor-talking-points.md, lesson-outline.csv, quiz-plan.md, video-script-notes.md |
| ots-320 | yes | 7 | capstone-or-final-project.md, course-description.md, downloads-index.md, instructor-talking-points.md, lesson-outline.csv, quiz-plan.md, video-script-notes.md |
| ots-399 | yes | 7 | capstone-or-final-project.md, course-description.md, downloads-index.md, instructor-talking-points.md, lesson-outline.csv, quiz-plan.md, video-script-notes.md |

## Repeated-Pattern Risks

- Broad generated remediation can satisfy structural gates while still needing a later human editorial pass for voice variation.
- The safest next quality pass is not another global rewrite; it is hand-reviewing the highest-value OTS-399, OTS-220, and OTS-101 lessons for polish and specificity.
- Technical examples should stay fake-data-only and avoid real student, teacher, or school identifiers.

## Missing Examples

- No course is missing the required examples directory.

## Missing Assessments

- Teachable quiz-plan files are present for each course.
- Lesson-level assessment quality is now covered structurally by the instructional-depth gate, but paid-course polish should still review quiz wording manually.

## Missing Completed Artifacts

- Each course has a completed-artifact example file.
- Build/workshop lessons now include completed sample or sample-row support where the gate required it.

## Technical Lessons Without Technical Artifacts

- OTS-220 technical lessons now pass the technical artifact requirement in the instructional-depth gate.
- The next hand-authored pass should replace any generic code sample with lesson-specific Apps Script where the lesson warrants it.

## Teachable Readiness Gaps

- Packaging support exists for every target course under teachable/.
- Do not market courses as fully paid-course final until a human editorial pass reviews pacing, assessment quality, and download polish.

## Prioritized Remediation List

1. Hand-polish OTS-399 capstone studio lessons for less repetition and stronger peer-review coaching.
2. Hand-polish OTS-220 technical lessons with more lesson-specific Apps Script, fake Sheet rows, Logger output, and rollback examples.
3. Hand-polish OTS-101 flagship lessons for weak/strong examples and completed mini-unit artifacts.
4. Review Teachable files for final sales-copy tone, video script depth, and quiz clarity.
5. Keep npm run verify:release as the final publication gate.
