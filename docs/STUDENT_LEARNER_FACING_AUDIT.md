# Student Learner-Facing Audit

Date: 2026-06-24

This audit reads the course pages from the perspective of the learner using OpenTeachStack, not from the perspective of the authoring scripts.

## Audit Question

Do the course lessons feel like direct course instructions, or do they still expose random notes, scaffold labels, authoring metadata, or generated template language?

## Findings

| Area | Result |
| --- | --- |
| Visible metadata | Passed. Rendered lesson pages do not expose `migrationStatus`, `sourceRegistry`, source lesson slugs, route-review notes, or scaffold status. |
| Course fit | Passed after repair. OTS-301 now uses course-site language, and OTS-101 AI verification now uses AI-literacy verification language instead of coding-agent language. |
| Learner wording | Improved. Removed learner-visible template phrases such as `Lesson Move`, `Add a short entry`, `Artifact update`, `Handoff note`, and section-number artifact entries. |
| Overview/checkpoint wording | Improved. Course pages no longer ask learners to "connect chapter overview" or "connect chapter checkpoint"; those are now phrased as `chapter plan` and `checkpoint review`. |
| Acronyms and technical terms | Improved. Common acronyms such as AI, MFA, DNS, HTML, CSS, HTTPS, VPNs, WHOIS, README, and Wi-Fi stay readable in learner-facing bullets. |
| Rendered routes | Passed. All 369 lesson routes render with HTTP 200 and visible lesson titles. |
| Course support files | Passed after cleanup. Course READMEs and templates no longer describe release-ready courses as migration scaffolds or use internal handoff-note labels. |
| Published support content | Passed. The learner-facing guard now also checks published standalone lessons, labs, field notes, and app MDX pages for high-confidence authoring residue. |
| Course docs | Passed after cleanup. Course outlines now describe release-ready course-owned content instead of draft/source-scaffold migration work. |

## Changes Made

- Updated `scripts/complete-course-lessons.mjs` to produce cleaner learner-facing lesson bodies.
- Updated `scripts/check-learner-facing-content.mjs` to fail on remaining template labels.
- Updated `scripts/check-course-learner-sense.mjs` to include OTS-101 and catch the AI-literacy/coding-agent mismatch.
- Updated `scripts/check-rendered-course-lessons.mjs` to catch template labels in production-rendered lesson text.
- Expanded `scripts/check-learner-facing-content.mjs` to scan course READMEs, templates, published standalone content, and app MDX pages in addition to course lesson bodies and book UI files.
- Added `scripts/check-course-doc-staleness.mjs` so course docs fail when stale draft/scaffold outline language returns.

## Verification

Passed:

- `npm run complete:courses`
- `npm run check:learner-facing-content`
- `npm run check:course-doc-staleness`
- `npm run check:course-learner-sense`
- `npm run check:content-uniqueness`
- `npm run test`
- `npm run build`
- `npm run check:rendered-course-lessons`
- `npm run verify:release`

Full release verification is tracked in `docs/BUILD_VERIFICATION.md`.
