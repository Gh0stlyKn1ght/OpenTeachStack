# OTS-301 Live-Site Privacy, Accessibility, and Link Review

Date: 2026-06-22

Status: passed for current authored section shell and planning artifacts

Scope:

- OTS-301 course book routes generated from `src/lib/courseStructures.ts`
- OTS-301 authored section content guides
- `docs/OTS_301_COURSE_HUB_SITEMAP_TEMPLATE.md`
- `docs/OTS_301_SAFE_DOMAIN_EXAMPLES.md`
- `docs/OTS_301_SOURCE_REFERENCES.md`

## Result

Pass for the current authored course shell and planning artifacts.

Follow-up is required when a real course hub, real domain, public files, embeds, forms, analytics, or downloads are added.

## Review Notes

| Area | Result | Notes |
| --- | --- | --- |
| Book route visibility | Pass | OTS-301 authored guidance renders through the shared book route shell. |
| Placeholder domains | Pass | Public examples use reserved placeholder domains. |
| Privacy review | Pass | Current examples avoid real student, staff, school, roster, grade, billing, and token details. |
| Accessibility review | Pass | Planning artifacts require headings, readable navigation, mobile checks, link labels, and alternatives. |
| Broken-link readiness | Conditional pass | Current source queue uses official URLs; real course hubs still need link checking at launch. |
| Live-site review | Conditional pass | No real live course hub is in this tranche; rerun before public launch. |

## Required Follow-Up

- Probe the real homepage, course page, resource page, source/update page, and representative lesson pages after a hub exists.
- Check public pages on desktop and mobile.
- Verify HTTPS, navigation, downloads, source notes, and broken links.
- Confirm public pages expose no student-identifiable data, private document links, grade information, hidden metadata, DNS tokens, or billing details.
- Document the next maintenance date and rollback or unpublish path.
