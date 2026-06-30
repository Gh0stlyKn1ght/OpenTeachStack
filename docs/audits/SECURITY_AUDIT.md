# Security Audit

Date: 2026-06-27
Repository audited: `W:\GitHub\Teacher-techops`

## Summary

Security readiness score: 5 / 10.

The app is mostly static, has no discovered auth/admin layer, no database, and one route handler. That keeps exposure smaller. The meaningful risks are content-rendering safety, missing deployment headers, dependency advisories, and future admin/user-data work being added without a security architecture.

## Security risk matrix

| Security issue | Severity | Evidence/File | Exploit scenario | Recommended fix |
| --- | --- | --- | --- | --- |
| Mermaid SVG injection with loose security. | High | `src/components/MermaidBlock.tsx` uses `dangerouslySetInnerHTML` and `securityLevel: "loose"`. | Malicious committed diagram content could render unsafe SVG. | Use strict Mermaid mode where possible, sanitize output, and validate diagrams. |
| Inline theme bootstrap complicates CSP. | Medium | `src/app/layout.tsx` uses `dangerouslySetInnerHTML`. | Strict CSP needs unsafe-inline, nonce, or hash. | Add CSP hash/nonce strategy. |
| Missing security headers. | Medium | `next.config.ts` has no `headers()` config. | Public users lack defense-in-depth against framing, sniffing, referrer leakage, and broad browser permissions. | Add CSP, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`, frame policy. |
| MDX safety policy is not explicit. | Medium | `src/lib/mdx.ts` renders MDX through `next-mdx-remote/rsc`. | User-submitted or compromised MDX would be unsafe. | Keep trusted-only policy or sandbox/sanitize untrusted content. |
| Frontmatter is not schema validated. | Medium | `src/lib/content.ts` casts `data as ContentFrontmatter`. | Bad metadata can create bad routes, broken pages, or unsafe embeds. | Add schemas and fail builds on invalid content. |
| Dependency advisories. | Medium | `npm audit --audit-level=low` reports `js-yaml` and `postcss` advisories. | Crafted YAML/CSS processing could hit vulnerable paths. | Track safe upgrades; do not run force downgrade. |
| Template download route has minimal headers. | Low | `src/app/templates/[slug]/download/route.ts`. | Low sniffing risk for markdown attachment. | Add `X-Content-Type-Options: nosniff`. |
| No auth/admin layer found. | Info | Route discovery found one route handler and no session/auth routes. | Future private features could be added unsafely. | Design auth, authorization, and data privacy before admin/progress. |

## Dependency audit

`npm.cmd audit --audit-level=low` failed.

| Advisory path | Severity | Action |
| --- | --- | --- |
| `gray-matter -> js-yaml` | Moderate | Keep content trusted; evaluate patched transitive dependency or alternative parser. |
| `next -> postcss` | Moderate | Track Next patch; do not use audit's force fix because it proposes breaking/downgrade behavior. |

## Risky pattern findings

| Pattern | Finding |
| --- | --- |
| `dangerouslySetInnerHTML` | Found in layout theme script and Mermaid SVG rendering. |
| `eval` / `new Function` | No matches found in searched `src`/`scripts`. |
| `localStorage` | Theme preference only. |
| `sessionStorage` | No matches found. |
| `process.env` | `NODE_ENV`, `YOUTUBE_API_KEY`, and script subprocess env forwarding. |
| API routes | One template download route. |
| Auth/admin | No real auth/session/admin endpoint found. |

## Recommended security roadmap

| Priority | Control |
| --- | --- |
| P0 | Fix failing route gate before public deploy. |
| P1 | Add security headers. |
| P1 | Add content schema validation. |
| P1 | Harden Mermaid rendering. |
| P2 | Add CSP nonce/hash policy for inline theme bootstrap. |
| P2 | Add dependency audit policy to CI. |
| P2 | Add secret scanning and `.env` policy. |
| P3 | Add Playwright checks for headers and downloads. |
