# Course Status

Date: 2026-07-02

## Active draft pathway

| Course | Status | Notes |
| --- | --- | --- |
| OTS-000 - Teacher Tech Stack Orientation | Draft active on-ramp | Chapters 00-13 have teacher-facing on-ramp lessons, templates, and a sample Teacher Builder Starter Kit. Human review is still required before release. |
| OTS-101 - AI Course Content Foundations for Teachers | Draft active rebuild, authored pass complete | Chapters 01-10 now have real lesson bodies focused on AI-assisted course content foundations. Human review and validation are still required before release. |
| OTS-201 - Google Workspace Systems for Teachers | Draft active preview | Open for pathway review. Structure and templates exist; real lesson-body authoring and human review are still required before release. |
| OTS-220 - Apps Script for Teacher Automation | Draft active preview | Open for pathway review. Structure and templates exist; real lesson-body authoring and human review are still required before release. |
| OTS-240 - Open Resources and GitHub for Educators | Draft active preview | Open for pathway review. Structure and templates exist; real lesson-body authoring and human review are still required before release. |
| OTS-260 - AI Media and Lesson Delivery | Draft active preview | Open for pathway review. Structure and templates exist; real lesson-body authoring and human review are still required before release. |
| OTS-280 - Cyber Safety for Educators | Draft active preview | Open for pathway review with route-backed cyber safety content. Human review and course-quality review are still required before release. |
| OTS-301 - Teacher Course Sites | Draft active preview | Open for pathway review. Structure and templates exist; real lesson-body authoring and human review are still required before release. |
| OTS-320 - AI Coding Agents for Educators | Draft active preview | Open for pathway review. Structure and templates exist; real lesson-body authoring and human review are still required before release. |
| OTS-399 - Capstone Studio | Draft active preview | Open for pathway review. Structure and templates exist; real lesson-body authoring and human review are still required before release. |

There are currently no live courses. Active draft visibility is not a public release claim.

Course status is recorded in `content/courses/{course}/status.json`. Root-level `teachable/{course}` folders are export support only and do not count as course readiness.

## Public route policy

- All pathway courses are clickable as draft courses.
- Missing content should render as unavailable instead of being filled with placeholders.
- Export folders are downstream packaging, not the source of truth.

## Removed placeholder content

The generic course-body scaffold files were deleted from `content/courses/**/lessons/**/*.mdx` after repeated scaffold language appeared across course lesson files.

Known removed scaffold fingerprints included:

- `A focused pass on`
- `Improve this section and make it cleaner`
- `Great artifacts are not just complete; they are inspectable, reviewable, and reusable`

## Next immediate work

1. Review the active draft pathway course by course, starting with OTS-000 and OTS-101 because they have authored lesson-body passes.
2. Decide which later draft previews need full lesson-body authoring before human review.
3. Run the format/readability audit intentionally and remediate real issues, not fake formatting.
4. Use the refreshed Mini Course Content Packet samples during human review to check whether the capstone is clear enough for a real teacher to inspect.
5. Run validation gates after each review tranche.
