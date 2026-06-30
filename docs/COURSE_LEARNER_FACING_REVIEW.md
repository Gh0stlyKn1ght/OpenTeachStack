# Course Learner-Facing Review

Date: 2026-06-24

Staleness note, 2026-06-28: this review predates the OTS-000 on-ramp and the OTS-101 Mini Course Content Packet retargeting. Treat the old mini-unit/workflow-audit summary as historical evidence, not the current OTS-101 artifact model.

This review checks whether released course lessons read like learner-facing course pages instead of internal authoring notes.

## Review Method

- Sampled beginning, middle, and final lessons from every course.
- Checked all 369 lesson files with the learner-facing phrase guard.
- Added `npm run check:course-learner-sense` so course-level conceptual frames cannot drift into the wrong course.
- Added `npm run check:rendered-course-lessons` so production-rendered lesson pages are checked for HTTP 200, visible lesson titles, and visible authoring residue.
- Re-ran the full project test gate after the course pass.

## Course Findings

| Course | Learner-facing result |
| --- | --- |
| OTS-101 | Reads as a foundation course for teachers building reusable mini-units. Chapters now point learners toward concrete artifacts such as workflow audits, prompt libraries, source checks, standards unpacking, assessment evidence, delivery plans, and the mini-unit capstone. |
| OTS-201 | Reads as a Google Workspace operations course. The frame is now Drive/Docs/Slides/Sheets/Forms/Calendar ownership, current-file visibility, closeout, and reduced exposure. |
| OTS-220 | Reads as a safe Apps Script automation course. Lessons consistently ask learners to clarify the manual routine, test with fake data, inspect logs, and preserve rollback paths. |
| OTS-240 | Reads as an open resources and GitHub course for educators. Lessons focus on reuse rights, source notes, license decisions, README clarity, contribution review, and publishing boundaries. |
| OTS-260 | Reads as an AI media and lesson delivery course. Lessons focus on purposeful media, diagrams, short video plans, alt text, captions, transcripts, accessibility alternatives, and privacy-safe media decisions. |
| OTS-280 | Reads as a cyber safety course for educators. Lessons keep the learner inside redacted, fictional, classroom-safe review work instead of live threat investigation or public incident exposure. |
| OTS-301 | Reads as a course-site publishing course. A model mismatch was fixed so these lessons now use course-site guidance instead of cyber-safety guidance. |
| OTS-320 | Reads as a coding-agent safety course. Lessons frame agents as drafting helpers while the teacher owns scope, diffs, testing, acceptance, rollback, and authored curriculum protection. |
| OTS-399 | Reads as a capstone studio. Lessons ask learners to make artifact purpose, location, evidence, review status, release status, peer feedback, and maintenance visible. |

## Fixed During Review

- Replaced awkward learner-facing phrases such as "what avoids...", "without asking for a translation", "loose note", and "not trying to collect one more tool or checklist".
- Fixed OTS-301 model drift where course-site lessons inherited cyber-safety framing because "website" matched the safety model.
- Preserved short words in lesson titles so learner-facing text keeps meaning, for example "What VPNs Do and Do Not Do" and "What to Do If Something Happens".
- Added CI coverage for course-level learner sense, not only authoring-status metadata.
- Added rendered-route coverage for all 369 lesson pages, not only course index pages.
- Expanded learner-facing source checks to cover course READMEs, templates, published standalone content, and app MDX pages, not only course lesson bodies.
- Added course-doc staleness checks for outline and README language.
- Ran a second student/learner-facing audit and removed remaining template labels such as "Lesson Move", "Add a short entry", "Artifact update", and "Handoff note".
- Replaced raw "chapter overview" and "chapter checkpoint" instruction language with learner-facing "chapter plan" and "checkpoint review" language.
- Fixed OTS-101 AI verification pages so they use AI-literacy verification guidance instead of coding-agent guidance.
- Preserved common acronyms in learner-facing bullets, including AI, MFA, DNS, HTML, CSS, HTTPS, VPNs, WHOIS, README, and Wi-Fi.
- Cleaned stale course package notes so READMEs now describe release-ready course-owned content instead of migration scaffolds.
- Replaced remaining support-file handoff-note labels with reviewer-note language.
- Cleaned stale course outline language such as "draft outline", "Source Draft Lessons", and "Existing draft sources".

## Verification

Passed:

- `npm run complete:courses`
- `npm run check:learner-facing-content`
- `npm run check:course-learner-sense`
- `npm run check:content-uniqueness`
- `npm run check:course-doc-staleness`
- `npm run build`
- `npm run check:rendered-course-lessons`
- `npm run test`
- `npm run verify:release`
