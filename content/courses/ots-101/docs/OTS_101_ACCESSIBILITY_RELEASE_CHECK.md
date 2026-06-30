# OTS-101 Accessibility Release Check

Date: 2026-06-20

Sequence update: 2026-06-28

This check predates OTS-000 becoming the teacher tech-stack orientation. Treat the release approval below as stale until OTS-101 is reviewed as the next course after OTS-000 and human review confirms the sequence boundary.

Original scope: OTS-101 public release pages, syllabus, module pages, active lessons, templates, Source Bank, audit page, release packet, and sample mini-unit routes.

This is a release-readiness check, not a formal third-party WCAG certification.

## Result

Original result: OTS-101 was approved for first public release with continued accessibility monitoring.

Current result: draft pending OTS-000 sequence review and human classroom review.

Release status: hold for sequence-aware review

## Required Checks

| Area | Status | Evidence | Follow-Up |
| --- | --- | --- | --- |
| Semantic headings | Pass | Pages and MDX lessons use heading structure. | Continue checking new lessons. |
| Lists | Pass | Course-facing lists use bullets for artifact and outcome lists. | Keep ordered lists only when sequence matters. |
| Link clarity | Pass | Source Bank and course pages use named links instead of raw-only links for primary actions. | Review new external links during source checks. |
| Keyboard navigation | Pass with follow-up | Core pages use standard links and buttons. | Run browser keyboard pass before major launch. |
| Color contrast | Pass with follow-up | Tokyo-inspired theme uses restrained foreground/background contrast. | Run automated contrast scan before v1.1. |
| Motion sensitivity | Pass | Framer Motion was removed and CSS respects reduced-motion patterns. | Keep animation decorative and nonessential. |
| Media alternatives | Pass with requirement | Capstone now requires captions, transcripts, alt text, or text alternatives for required media. | Audit any future video/image-heavy lessons. |
| Alternate submission | Pass with requirement | Capstone now requires at least one alternate access or submission option. | Add examples after first pilot. |
| Cognitive load | Pass | OTS-101 keeps advanced workflows out of the foundations course. | Keep future courses separated. |
| Tool privacy and accounts | Pass | Source Bank includes account, privacy, age, and setup notes. | Recheck quarterly. |

## Release Requirements Now Met

- OTS-101 should not require coding, GitHub, domains, public websites, Apps Script, or AI coding agents. Those boundaries now rely on the OTS-000-to-OTS-101 alignment review.
- Original check: the capstone was scoped as a small mini-unit system with accessible delivery expectations. Current check: confirm the Mini Course Content Packet is accessible, reviewable, and honest about OTS-000 boundaries.
- The syllabus includes outcome traceability.
- The capstone rubric includes levels and a final submission checklist.
- Source Bank governance is documented.
- Source checks pass after removing unwanted references.

## Sequence-Aware Checks Now Required

- Confirm OTS-101 assumes OTS-000 tool vocabulary instead of reteaching it.
- Confirm platform publishing remains a student-view and source/export check, not a site-building or deployment lesson.
- Confirm accessibility checks reference OTS-000/local tool and access boundaries only when they affect student-facing content.
- Confirm the Mini Course Content Packet can stand on its own as course-content evidence.

## Required Follow-Up After Launch

- Run a browser-based keyboard pass on `/`, `/start`, `/course`, `/syllabus`, `/templates`, `/kb/source-bank`, `/course/audit`, and `/course/release`.
- Run an automated contrast/a11y scan when the next UI polish tranche starts.
- Add one completed accessible capstone example after the first real classroom or peer-review pilot.
- Add captions/transcripts to any future media companion materials before publishing them.

## Approval Note

Original approval note: OTS-101 was considered accessible enough for first release because its core experience was text-first, link-based, template-supported, and scoped for non-technical teachers.

Current note: accessibility is likely still a strength, but this document no longer authorizes release by itself. Release needs the OTS-000 sequence review, human classroom review, and any current route/build checks required by the repo.
