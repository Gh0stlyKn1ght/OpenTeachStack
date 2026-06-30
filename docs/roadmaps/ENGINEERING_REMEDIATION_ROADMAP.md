# Engineering Remediation Roadmap

Date: 2026-06-27
Repository audited: `W:\GitHub\Teacher-techops`

## Status update - 2026-06-28

OTS-000 was added to `docs/ROUTE_CONTRACT.md` after the original audit, and public/course copy now treats OTS-000 as the on-ramp before OTS-101. Gates have not been rerun in this pass, so route-contract remediation is **edited but unverified**.

## P0 - Stop-the-Bleed Production Safety

| Task | Evidence | Acceptance criteria |
| --- | --- | --- |
| Verify route-contract remediation for OTS-000. | `docs/ROUTE_CONTRACT.md` has been edited since the audit, but gates have not been rerun. | `npm.cmd test` passes through route contract. |
| Keep production build green. | `npm.cmd run build` currently passes. | Build passes after P0 changes. |
| Add route alias coverage for stale slugs. | Recent stale OTS-000 slug 404. | Old known slugs redirect to canonical routes. |
| Add minimum security headers. | `next.config.ts` lacks `headers()`. | Responses include baseline browser security headers. |
| Document deploy safety state. | Audit says not production-ready. | README/runbook states preview and production gates. |

## P1 - Architecture Stabilization

| Task | Evidence | Acceptance criteria |
| --- | --- | --- |
| Add content schema validation. | `src/lib/content.ts` casts frontmatter. | Invalid frontmatter fails a dedicated check. |
| Generate course route manifest from content. | Hardcoded registries drifted. | Routes and route contract use one manifest. |
| Consolidate book route implementations. | Generic plus OTS-101/OTS-280 special routes coexist. | Shared reader handles course families or exceptions are documented. |
| Centralize MDX component maps. | Lint warnings from unused route imports. | Route pages import shared allowlists only. |
| Split script folders. | Write scripts and checks are mixed. | Non-mutating checks and write tools are separated. |

## P2 - Security Hardening

| Task | Evidence | Acceptance criteria |
| --- | --- | --- |
| Harden Mermaid rendering. | Loose security and SVG injection. | Sanitized SVG or strict mode with tests. |
| Define MDX safety policy. | No explicit raw HTML/MDX trust policy. | Policy documented and enforced. |
| Add dependency audit policy. | `npm audit` reports moderate advisories. | CI reports audit and blocks agreed severities. |
| Add secret scanning and env policy. | `YOUTUBE_API_KEY` is used. | Secret scan and env policy exist. |
| Harden template download headers. | Minimal response headers. | Route includes `nosniff` and tested disposition. |

## P3 - Quality Gates

| Task | Evidence | Acceptance criteria |
| --- | --- | --- |
| Add GitHub Actions CI. | No workflow files found in discovery. | CI runs install, typecheck, lint, build, test. |
| Add Playwright smoke tests. | Browser warnings and stale routes occurred. | Tests cover `/`, `/book/ots-000`, `/book/ots-101`, `/kb`, `/videos`, template download. |
| Add internal link checker. | Route drift broke navigation. | Broken internal links fail CI. |
| Add a11y smoke tests. | No axe gate found. | Axe checks run for representative pages. |
| Add rendered MDX tests. | MDX is central. | Tests cover headings, code, tables, videos, Mermaid fallback. |

## P4 - Performance and UX

| Task | Evidence | Acceptance criteria |
| --- | --- | --- |
| Optimize large public images. | Hero PNG is about 1.57 MB. | No large public hero asset without exception. |
| Address video thumbnail optimization. | Lint warns about `<img>`. | Use `next/image` or documented exception. |
| Add loading/error boundaries. | Many dynamic routes lack explicit UX. | Book/content sections have friendly loading/error states. |
| Add bundle/performance budget. | Mermaid/video can add weight. | Bundle report exists in CI or release checks. |
| Improve mobile/keyboard tests. | Modal/nav behavior needs coverage. | Playwright keyboard tests pass. |

## P5 - Scale Features

| Task | Precondition | Acceptance criteria |
| --- | --- | --- |
| KB architecture expansion. | Schema and route manifest exist. | KB pages are searchable, validated, and route-stable. |
| Labs/simulations architecture. | Feature module boundary exists. | Labs can include interactive components safely. |
| Video library expansion. | Metadata/source validation exists. | Approved/blocked/review states are enforced. |
| Course health dashboard. | Generated content manifest exists. | Dashboard reports missing lessons, stale aliases, schema failures, source status. |
| User progress tracking. | Auth/storage/privacy model exists. | Progress data is private, exportable, and deletion-ready. |

## First implementation prompt

Verify the route-contract edit and harden route stability without editing lesson content. Inspect `scripts/check-route-contract.mjs`, `docs/ROUTE_CONTRACT.md`, and the current course route manifest in `src/lib/courseStructures.ts`. Rerun the route gate, add alias coverage for known stale OTS-000 slugs, and plan/generated route-contract coverage so every course in `COURSE_STRUCTURES` is represented from one manifest. Run `npm.cmd test` and `npm.cmd run build` only when ready to validate. Report any remaining failures with exact file and command evidence.
