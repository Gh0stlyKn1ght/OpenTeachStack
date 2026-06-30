# Bug Report

Date: 2026-06-27
Repository audited: `W:\GitHub\Teacher-techops`

## Post-audit update - 2026-06-28

The original bug evidence is preserved below. Since this bug report, `docs/ROUTE_CONTRACT.md` has been edited to include OTS-000. The route gate has not been rerun in this pass, so the OTS-000 route-contract bug is **edited but unverified**, not confirmed fixed.

## Confirmed bugs

| Bug | Evidence | Severity | Reproduction steps | Fix recommendation |
| --- | --- | --- | --- | --- |
| OTS-000 route-contract drift. | Audit snapshot: `npm.cmd test` failed at `check:routes` with `Route contract violation: OTS-000 is not listed in docs/ROUTE_CONTRACT.md.` Post-audit: contract edited, not rerun. | High | Run `npm.cmd test`. | Verify the edit, then generate `docs/ROUTE_CONTRACT.md` from current course routes. |
| Lint warnings hide useful signal. | `npm.cmd test` lint phase reports 45 warnings. | Low | Run `npm.cmd test`. | Remove unused MDX imports and fix/document video thumbnail image warning. |
| Dependency audit fails. | `npm.cmd audit --audit-level=low` exits 1 with four moderate vulnerabilities. | Medium | Run `npm.cmd audit --audit-level=low`. | Track safe upgrades for Next/PostCSS and gray-matter/js-yaml. |
| Stale route slugs can break users. | Recent request to `/book/ots-000/08-software-safety-workspace-capstone/08-2` returned 404 while canonical content lives at `/book/ots-000/08-markdown-mdx-content-files/08-2`. | Medium | Visit an old/stale chapter URL. | Maintain alias manifest and tests for old slugs. |

## Likely bugs / fragile behavior

| Bug | Evidence | Severity | Reproduction steps | Fix recommendation |
| --- | --- | --- | --- | --- |
| Invalid frontmatter can crash or misrender pages. | `src/lib/content.ts` casts frontmatter without schema validation. | High | Add malformed frontmatter and build. | Add runtime schemas. |
| Missing live lesson file can render unavailable blocks. | `getCourseLessonBySlugs` returns `undefined` when MDX is missing. | Medium | Remove a referenced lesson MDX and visit its route. | Fail release checks for live/reviewed missing lessons. |
| Video metadata fallback can hide source-review problems. | `fetchYouTubeMetadata` silently falls back without API key or successful API response. | Low | Build video metadata without `YOUTUBE_API_KEY`. | Report fallback count and threshold. |
| Template download headers are minimal. | Download route returns attachment with only disposition/content-type. | Low | Request `/templates/{slug}/download`. | Add `nosniff` and response header tests. |
| Hardcoded registries invite drift. | Large `courseStructures.ts`, `book.ts`, `cyberSafety.ts`, `templates.ts`, `sourceBank.ts`. | Medium | Change content title/slug without registry sync. | Generate typed registries from content. |

## Build and gate evidence

| Command | Result |
| --- | --- |
| `npm.cmd run build` | Pass; 662 static pages generated. |
| `npm.cmd test` | Audit snapshot failed at `check:routes`; current status unverified after route-contract edit. |
| `npm.cmd audit --audit-level=low` | Fail; four moderate vulnerabilities. |
| `npm.cmd outdated --long` | Several updates available. |

## First bug-fix prompt

Verify the route-contract edit first. Rerun `npm.cmd test`; if `check:routes` still fails, update or generate `docs/ROUTE_CONTRACT.md` from `COURSE_STRUCTURES`. Then add route-alias coverage for known stale OTS-000 slugs.
