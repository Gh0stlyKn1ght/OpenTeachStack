# OTS-101 Accessibility Release Check

Date: 2026-06-20

Staleness note, 2026-06-28: this check predates OTS-000 and the OTS-101 retargeting to AI Course Content Foundations for Teachers. Treat the release approval below as historical only. Current release requires OTS-000/OTS-101 sequence review, human classroom review, and fresh validation gates.

Original scope: OTS-101 public release pages, syllabus, module pages, active lessons, templates, Source Bank, audit page, release packet, and sample mini-unit routes.

This is a release-readiness check, not a formal third-party WCAG certification.

## Result

Original result: OTS-101 was approved for first public release with continued accessibility monitoring.

Current result: draft pending OTS-000 sequence review, human classroom review, and fresh validation.

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

- OTS-101 does not require coding, GitHub, domains, public websites, Apps Script, or AI coding agents.
- The capstone is a small mini-unit system with accessible delivery expectations.
- The syllabus includes outcome traceability.
- The capstone rubric includes levels and a final submission checklist.
- Source Bank governance is documented.
- Source checks pass after removing unwanted references.

## Required Follow-Up After Launch

- Run a browser-based keyboard pass on `/`, `/start`, `/course`, `/syllabus`, `/templates`, `/kb/source-bank`, `/course/audit`, and `/course/release`.
- Run an automated contrast/a11y scan when the next UI polish tranche starts.
- Add one completed accessible capstone example after the first real classroom or peer-review pilot.
- Add captions/transcripts to any future media companion materials before publishing them.

## Approval Note

OTS-101 is accessible enough for first release because its core experience is text-first, link-based, template-supported, and scoped for non-technical teachers. The remaining work is polish and evidence collection, not a blocker to publishing the foundations course.
