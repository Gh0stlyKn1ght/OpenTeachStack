# Course Status

Date: 2026-06-26

## Active draft rebuild

| Course | Status | Notes |
| --- | --- | --- |
| OTS-101 - AI Course Content Foundations for Teachers | Draft, authored pass complete | Chapters 01-10 now have real lesson bodies in the active course structure. Human review and validation are still required before release. |

There are currently no live courses. OTS-101 is the active draft course, not a public release claim.

Course status is recorded in `content/courses/{course}/status.json`. Root-level `teachable/{course}` folders are export support only and do not count as course readiness.

## Coming Soon courses

| Course | Status | Notes |
| --- | --- | --- |
| OTS-201 - Google Workspace Systems for Teachers | Coming Soon | Frozen until OTS-101 is reviewed and the content model is proven. |
| OTS-220 - Apps Script for Teacher Automation | Coming Soon | Frozen until OTS-101 is reviewed and the content model is proven. |
| OTS-240 - Open Resources and GitHub for Educators | Coming Soon | Frozen until OTS-101 is reviewed and the content model is proven. |
| OTS-260 - AI Media and Lesson Delivery | Coming Soon | Frozen until OTS-101 is reviewed and the content model is proven. |
| OTS-280 - Cyber Safety for Educators | Coming Soon | Frozen until OTS-101 is reviewed and the content model is proven. |
| OTS-301 - Teacher Course Sites | Coming Soon | Frozen until OTS-101 is reviewed and the content model is proven. |
| OTS-320 - AI Coding Agents for Educators | Coming Soon | Frozen until OTS-101 is reviewed and the content model is proven. |
| OTS-399 - Capstone Studio | Coming Soon | Frozen until OTS-101 is reviewed and the pathway has real course bodies. |

Do not build, scaffold, or refill these courses until OTS-101 passes review.

## Public route policy

- OTS-101 is clickable as the active draft course.
- Coming Soon courses should not be clickable as if they are available.
- Missing content should render as unavailable instead of being filled with placeholders.
- Export folders are downstream packaging, not the source of truth.

## Removed placeholder content

The generic course-body scaffold files were deleted from `content/courses/**/lessons/**/*.mdx` after repeated scaffold language appeared across course lesson files.

Known removed scaffold fingerprints included:

- `A focused pass on`
- `Improve this section and make it cleaner`
- `Great artifacts are not just complete; they are inspectable, reviewable, and reusable`

## Next immediate work

1. Review OTS-101 Chapters 01-10 for instructional quality, examples, and voice.
2. Run the format/readability audit intentionally and remediate real issues, not fake formatting.
3. Refresh or rebuild the sample mini course packet so it matches the final OTS-101 capstone.
4. Run validation gates only after the review pass is ready.
