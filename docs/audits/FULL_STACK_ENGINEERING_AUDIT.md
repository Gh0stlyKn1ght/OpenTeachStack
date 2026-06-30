# Full Stack Engineering Audit

Date: 2026-06-27
Repository audited: `W:\GitHub\Teacher-techops`
Package name: `openteachstack`

Scope caveat: the request named `robotnix/curriculum`, but the active checkout is `Teacher-techops`. This audit covers the active checkout only.

## Post-audit update - 2026-06-28

The original audit evidence below is preserved as the 2026-06-27 snapshot.

Since that audit, `docs/ROUTE_CONTRACT.md` has been edited to include OTS-000 as the teacher tech-stack orientation route before OTS-101. Public/course copy has also been realigned so OTS-000 is the on-ramp and OTS-101 is the AI course-content foundations sequel.

Current verification status: not rerun. Treat the old route-contract failure as **edited but unverified**, not as confirmed fixed. The next engineering check should rerun the real gates before changing the score.

Current highest-risk follow-ups:

- Verify `npm.cmd test` now passes through `check:routes`.
- Add route aliases for known stale OTS-000 slugs.
- Add schema validation for content/course metadata.
- Add security headers and MDX/Mermaid safety policy.

## A. Executive Summary

| Area | Score | Rationale |
| --- | ---: | --- |
| Overall engineering health | 6.5 / 10 | Build was green and custom gates existed in the audit snapshot; route contract drift was later edited but not reverified. |
| Production readiness | 5.5 / 10 | `npm run build` passed in the audit snapshot; `npm test` failed then. Route-contract docs have since been edited, but gates have not been rerun. |
| Security readiness | 5 / 10 | Small backend surface, but MDX/Mermaid safety, headers, and dependency advisories need work. |
| Scalability | 6 / 10 | Static generation works now, but manual registries will strain at many courses. |
| Maintainability | 6 / 10 | Strong scripts, but large data files, duplicated route families, and mixed write/check scripts increase risk. |

### Top 10 risks

| Risk | Severity | Evidence | Recommended fix |
| --- | --- | --- | --- |
| Route contract drift for OTS-000. | High | Audit snapshot: `npm test` failed because `OTS-000` was not listed in `docs/ROUTE_CONTRACT.md`. Post-audit: route contract edited, not reverified. | Rerun route gate; then generate route contract from the same manifest used by routes. |
| MDX frontmatter is cast, not validated. | High | `src/lib/content.ts` casts `data as ContentFrontmatter`. | Add runtime schemas and fail build on invalid content. |
| Mermaid SVG injection. | High | `src/components/MermaidBlock.tsx` uses `dangerouslySetInnerHTML` and `securityLevel: "loose"`. | Sanitize SVG and prefer stricter Mermaid security. |
| Missing security headers. | Medium | `next.config.ts` has no `headers()` policy. | Add CSP, `nosniff`, referrer, permissions, and frame policies. |
| Dependency advisories. | Medium | `npm audit --audit-level=low` reports moderate `js-yaml` and `postcss` advisories. | Track safe upstream upgrades; do not run force downgrade. |
| Global image optimization disabled. | Medium | `next.config.ts` sets `images.unoptimized: true`. | Enable optimization or document a static-export exception. |
| Course route data is duplicated. | Medium | `src/lib/courseStructures.ts`, `src/lib/book.ts`, `src/lib/cyberSafety.ts`, and `content/courses/*` must stay aligned. | Generate typed registries from content files. |
| Stale slugs can create user-facing 404s. | Medium | Recent stale OTS-000 chapter URL returned 404 before fallback. | Add an alias manifest and route tests. |
| Lint warnings reduce signal. | Low | `npm test` lint phase reports 45 warnings. | Remove unused MDX imports and address video image warning. |
| CI workflow was not found in discovery. | Medium | No workflow files surfaced in `.github` scan. | Add CI for install, typecheck, lint, build, tests, audit report. |

### Top 10 fastest wins

| Fast win | Impact |
| --- | --- |
| Rerun route-contract gate after OTS-000 route-contract edit. | Confirms whether the edited contract restored the failing release gate. |
| Remove unused MDX component imports. | Reduces lint noise. |
| Add minimum security headers. | Improves deploy safety quickly. |
| Add frontmatter schemas. | Prevents silent content breakage. |
| Add `check:content-schema`. | Catches drift before build. |
| Add route aliases for stale slugs. | Prevents old URLs from 404ing. |
| Replace video thumbnail `<img>` or document exception. | Addresses LCP warning. |
| Add dependency audit policy. | Makes supply-chain risk visible without unsafe force fixes. |
| Move route/search data to generated manifests. | Reduces manual drift. |
| Add Playwright smoke checks for core routes. | Catches browser-level regressions. |

### Deploy safety

The app can technically build and serve static pages, but I would not call it production-ready until the route gate is rerun, security headers, MDX/Mermaid safety policy, and dependency advisory plan are addressed. It is acceptable for a controlled preview with trusted content and no user-submitted MDX.

## Stack Identification

| Item | Finding |
| --- | --- |
| Framework | Next.js `16.2.9`, App Router, React `19.2.4`. |
| Runtime | npm/Node, `next build --webpack`. |
| Package manager | npm with `package-lock.json`; no competing lockfiles found. |
| TypeScript | `strict: true`, `allowJs: true`, `skipLibCheck: true`. |
| Styling | Tailwind CSS v4 via `@tailwindcss/postcss`, custom global CSS. |
| Content | File-system MDX/Markdown under `content/`, plus TS registries under `src/lib`. |
| MDX | `@next/mdx`, `next-mdx-remote/rsc`, `remark-gfm`, `rehype-slug`, `rehype-autolink-headings`. |
| Backend/API | One route handler: `src/app/templates/[slug]/download/route.ts`. |
| Environment use | `NODE_ENV`, `YOUTUBE_API_KEY`; no root `.env*` files found in discovery. |

## Discovery and gate evidence

| Command | Result |
| --- | --- |
| `Get-Location; Get-ChildItem -Force` | Confirmed active repo: `W:\GitHub\Teacher-techops`. |
| Max-depth file listing | Found `src/app`, `src/components`, `src/lib`, `content`, `scripts`, `docs`, `public`. |
| Route discovery | Found public pages, MDX KB pages, book dynamic routes, and one route handler. |
| Risk pattern search | Found `dangerouslySetInnerHTML`, `localStorage`, `process.env`, `fetch`, `MDXRemote`, file read/write scripts. |
| `npm.cmd run build` | Passed; generated `662/662` static pages. |
| `npm.cmd test` | Audit snapshot failed at `check:routes`: OTS-000 missing from `docs/ROUTE_CONTRACT.md`. Post-audit route contract was edited, but test was not rerun. |
| `npm.cmd audit --audit-level=low` | Failed with four moderate vulnerabilities. |
| `npm.cmd outdated --long` | Newer React, Mermaid, Shiki, TypeScript, ESLint, and Node types available. |

## Architecture map

```text
src/app/
  App Router pages, dynamic book routes, KB MDX pages, template download route
src/components/
  shared layout, article, book, prompt, video, MDX/rendering components
src/lib/
  content loaders, MDX options, course registries, search, templates, videos, source bank
content/
  blog, courses, lessons, labs, field notes, examples, videos
scripts/
  release gates, content checks, write-capable author/remediation tools
public/
  static images and icons
```

## B. Application Architecture Audit

| Issue | Severity | Why it matters | Recommended fix |
| --- | --- | --- | --- |
| Hardcoded course registries can drift. | High | Recent stale routes and failed route contract confirm it. | Generate route/nav/search manifests from `content/courses/*`. |
| Special-case and generic book routes coexist. | Medium | OTS-101, OTS-280, and generic courses can diverge. | Consolidate behind a shared course reader. |
| Manual route contract. | High | It drifted for OTS-000 in the audit snapshot. | Generate docs/checks from the route manifest. |
| Content loader trusts local file shape. | High | Bad frontmatter can become runtime bugs. | Add schemas and fail-fast checks. |
| Write scripts mixed with checks. | Medium | Raises dirty-tree risk and makes safe gates harder to reason about. | Split `scripts/checks` from `scripts/content-tools`. |

Target: content-backed generated registries, shared URL helpers, explicit route aliases, typed schemas, thin route pages, and feature modules for courses, KB, labs, videos, and templates.

## C. Frontend Audit

| Component/File | Issue | Severity | Recommended fix |
| --- | --- | --- | --- |
| `src/app/layout.tsx` | Inline theme bootstrap complicates strict CSP. | Medium | Keep in head and add CSP nonce/hash strategy. |
| `src/components/MermaidBlock.tsx` | Injects rendered SVG. | High | Sanitize SVG and tighten Mermaid security. |
| `src/components/video/VideoCard.tsx` | Uses `<img>` for thumbnails. | Low | Use `next/image` or document exception. |
| MDX route pages | Repeated unused component imports. | Low | Centralize MDX component allowlists. |
| Book route family | Generic and special-case pages coexist. | Medium | Consolidate implementation. |
| Dynamic content routes | Limited explicit loading/error UI. | Medium | Add route-level `loading.tsx` and `error.tsx` for key sections. |

## D. Backend/API Audit

| Endpoint/File | Risk | Severity | Recommended fix |
| --- | --- | --- | --- |
| `src/app/templates/[slug]/download/route.ts` | Static markdown download has minimal headers. | Low | Add `X-Content-Type-Options: nosniff` and smoke test. |
| No auth/API layer found | Admin/progress workflows are not ready. | Medium | Design auth, authorization, validation, rate limiting, and logging before adding private features. |
| No database/storage layer found | Static app is simpler and safer for now. | Info | Keep user data out until privacy/storage model exists. |

## E. Content Loading and MDX Pipeline Audit

```text
content/*.mdx
  -> fs.readFileSync
  -> gray-matter
  -> TypeScript cast
  -> MDXRemote with remark/rehype plugins
  -> custom components
```

| Risk | Severity | Recommended fix |
| --- | --- | --- |
| No runtime frontmatter validation. | High | Add schemas for content, courses, KB, videos, templates. |
| Raw HTML/MDX safety policy is not explicit. | Medium | Document trusted-only MDX or add sanitization/sandboxing. |
| Missing lesson MDX can render unavailable status. | Medium | Fail release checks for live/reviewed missing lessons. |
| Broken link strategy is incomplete. | Medium | Add rendered route/link crawler. |
| MDX component map is duplicated. | Low | Centralize allowlists by content type. |

## F. Security Audit

| Security issue | Severity | Evidence | Exploit scenario | Recommended fix |
| --- | --- | --- | --- | --- |
| Mermaid SVG injection. | High | `MermaidBlock` plus `dangerouslySetInnerHTML`. | Malicious committed diagram renders unsafe SVG. | Sanitize and use strict Mermaid mode. |
| Inline theme script. | Medium | `src/app/layout.tsx`. | CSP requires inline exception. | Add hash/nonce strategy. |
| Missing security headers. | Medium | `next.config.ts`. | Public deploy lacks baseline browser protections. | Add headers. |
| Dependency advisories. | Medium | `npm audit`. | YAML/CSS processing advisories. | Track safe upgrades. |
| MDX safety policy missing. | Medium | `src/lib/mdx.ts`. | User-submitted MDX would be unsafe. | Keep trusted-only or sandbox. |

## G. Dependency and Supply Chain Audit

| Package | Concern | Severity | Action |
| --- | --- | --- | --- |
| `next@16.2.9` | Audit reports bundled `postcss` advisory. | Medium | Track Next patch; do not force downgrade. |
| `gray-matter@^4.0.3` | Pulls vulnerable `js-yaml` per audit. | Medium | Keep input trusted; evaluate replacement or patched path. |
| `mermaid@11.15.0` | Heavy and tied to SVG injection risk; `11.16.0` available. | Medium | Upgrade after Mermaid safety tests. |
| `react@19.2.4` / `react-dom@19.2.4` | `19.2.7` available. | Low | Patch update after smoke tests. |
| `typescript@5.9.3` | Major `6.0.3` available. | Low | Plan separately. |

## H. Performance Audit

| Issue | Evidence | Impact | Fix |
| --- | --- | --- | --- |
| Image optimization disabled. | `images.unoptimized: true`. | Worse LCP/bandwidth. | Enable optimization or document static-export exception. |
| Large hero asset. | `teaching-teachers-hero.png` about 1.57 MB. | Slow first load if used above fold. | Convert to WebP/AVIF and size variants. |
| Heavy Mermaid module. | Dynamic import is good, but still client-heavy. | Slower diagram pages. | Render on visibility or pre-render trusted diagrams. |
| 662 static pages. | Build output. | Growth increases build time. | Add route budgets and generated manifests. |

## I. Accessibility Audit

| Issue | Severity | Evidence | Fix |
| --- | --- | --- | --- |
| No automated a11y gate found. | Medium | Package gates omit axe/Playwright a11y. | Add axe smoke tests. |
| Mermaid diagrams need required text alternatives. | Medium | Caption is optional. | Require caption or adjacent summary. |
| Video titles can fall back to generic text. | Medium | `VideoEmbed.tsx`. | Require title in video schema. |
| Skip link not confirmed. | Low | Layout/header scan did not show one. | Add skip-to-main link. |

## J. Testing and Quality Audit

Current gates are broad: typecheck, lint, script workflow, root doc truth, route contract, content layout/source truth, blog system, authoring safety, learner-facing checks, doc staleness, uniqueness, instructional depth, readability, release readiness, prompt library, source bank, and course-reader checks.

| Gate | Result |
| --- | --- |
| `npm.cmd run build` | Pass. |
| `npm.cmd test` | Audit snapshot failed at route contract; current status unverified after route-contract edit. |
| Lint phase | 45 warnings, 0 errors. |
| `npm.cmd audit --audit-level=low` | Fail with moderate advisories. |

Missing gates: rendered link crawler, content schema validation, Playwright smoke tests, a11y tests, security header checks, dependency audit policy, bundle budget.

## K. DevOps and Deployment Audit

| Issue | Severity | Evidence | Fix |
| --- | --- | --- | --- |
| No CI workflow found. | High | `.github` discovery did not surface workflow files. | Add GitHub Actions. |
| Build passed but test failed in audit snapshot. | High | Build green; `npm test` route failure at the time. | Rerun after route-contract edit before production deploy. |
| Security headers absent. | Medium | `next.config.ts`. | Add headers. |
| Image optimization disabled. | Medium | `next.config.ts`. | Enable or document. |

## L. Data, State, and Storage Audit

| Issue | Severity | Fix |
| --- | --- | --- |
| No user progress model. | Info | Do not add progress UI until auth/storage/privacy model exists. |
| Theme uses localStorage. | Low | Acceptable if only non-sensitive preferences are stored. |
| Search generated from mixed sources. | Medium | Generate from normalized manifest. |
| Video metadata can silently fallback. | Low | Add freshness/reporting gate. |

## M. Code Maintainability Audit

| File/Pattern | Issue | Severity | Fix |
| --- | --- | --- | --- |
| `src/lib/cyberSafety.ts` | 934-line registry. | Medium | Move to generated content data. |
| `src/lib/courseStructures.ts` | 674-line registry. | High | Generate from content. |
| `src/lib/sourceBank.ts` | 657-line static list. | Medium | Move to schema-validated data. |
| `src/lib/templates.ts` | Data and rendering coupled. | Medium | Split schema/data/rendering. |
| `scripts/` | Write scripts mixed with checks. | Medium | Separate folders and explicit write flags. |

## N. Bug Hunt

| Bug | Evidence | Severity | Repro | Fix |
| --- | --- | --- | --- | --- |
| OTS-000 route-contract drift. | `npm test` failure in audit snapshot; route contract edited afterward. | High | Run `npm.cmd test`. | Verify the edit, then generate route contract. |
| Lint warnings hide signal. | 45 warnings. | Low | Run `npm.cmd test`. | Clean unused imports and thumbnail warning. |
| Dependency advisories. | `npm audit` failure. | Medium | Run `npm.cmd audit --audit-level=low`. | Safe upgrade plan. |
| Stale slug 404 risk. | Recent OTS-000 stale URL. | Medium | Visit old slug. | Alias manifest and tests. |
| Invalid frontmatter can slip through. | Casts in loader. | High | Add malformed MDX frontmatter. | Runtime schema validation. |

## O. Architecture Scalability

| Question | Answer |
| --- | --- |
| Can it scale to 10 courses? | Yes, if route contract drift is verified fixed and eventually generated from source data. |
| Can it scale to 100 courses? | Not comfortably with hand-maintained TS registries. |
| Can it support `/kb`? | Yes, already does, but KB indexing should be normalized. |
| Can it support labs/simulations? | Static labs yes; interactive labs need feature boundaries and sandbox thinking. |
| Can it support video libraries? | Basic support exists; metadata/source gates need hardening. |
| Can it support admin workflows? | Not yet; no auth/admin architecture exists. |
| Can it support search? | Basic generated search exists; scale needs normalized indexes. |
| Can it support progress? | Not until auth/storage/privacy are designed. |

## P. Target Architecture

See `docs/architecture/TARGET_FULL_STACK_ARCHITECTURE.md`.

## Q. Priority Roadmap

See `docs/roadmaps/ENGINEERING_REMEDIATION_ROADMAP.md`.

## R. First Implementation Prompt

Verify the route-contract edit, then harden route stability. Inspect `scripts/check-route-contract.mjs`, `docs/ROUTE_CONTRACT.md`, and `src/lib/courseStructures.ts`. Rerun the route gate, add alias coverage for known stale OTS-000 slugs, and plan/generated route-contract coverage so every course in `COURSE_STRUCTURES` is represented from one manifest. Run `npm.cmd test` and `npm.cmd run build` only when ready to validate. Report remaining failures with exact file and command evidence.

## Direct answers

1. Is this app safe to deploy publicly right now?

Not as production-ready yet. Build passed in the audit snapshot, but the test failure needs rerun after the route-contract edit; security headers are missing, MDX/Mermaid safety needs hardening, and dependency advisories need a plan.

2. What are the most dangerous security issues?

Mermaid SVG injection, missing security headers/CSP, missing MDX safety policy, and dependency advisories.

3. What bugs will break users first?

Route-contract drift and stale slugs.

4. What parts of the architecture are fragile?

Hardcoded course registries, duplicated book route families, manual route contracts, and unvalidated frontmatter.

5. What should be fixed before adding more courses/features?

Route-contract verification/generation, schema validation, unified course registry, security headers, MDX/Mermaid safety policy, and CI gates.

6. What is the first implementation prompt to run next?

Use the prompt in section R.
