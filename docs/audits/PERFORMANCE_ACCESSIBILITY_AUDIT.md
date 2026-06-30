# Performance and Accessibility Audit

Date: 2026-06-27
Repository audited: `W:\GitHub\Teacher-techops`

## Performance summary

Performance readiness score: 6 / 10.

The static rendering model is a good foundation, and build currently completes 662 generated pages. The main risks are disabled image optimization, large assets, Mermaid client cost, and large hand-maintained registry modules.

## Performance findings

| Issue | Evidence | Impact | Recommended fix |
| --- | --- | --- | --- |
| Image optimization disabled globally. | `next.config.ts` sets `images.unoptimized: true`. | Larger downloads and weaker LCP. | Enable optimization or document static-export exception. |
| Large hero image. | `public/images/teaching-teachers-hero.png` is about 1.57 MB. | Slow first load if above the fold. | Convert to WebP/AVIF and create responsive sizes. |
| Video thumbnail uses `<img>`. | Lint warning in `src/components/video/VideoCard.tsx`. | Potential LCP/bandwidth issue. | Use `next/image` or documented exception. |
| Mermaid is heavy client JS. | `MermaidBlock` dynamically imports `mermaid`. | Diagram pages cost more client work. | Render on visibility or pre-render trusted diagrams. |
| Static page count is high. | Build generated 662 pages. | Growth will increase build time. | Add route-generation budgets and generated manifests. |
| Large source modules. | `cyberSafety.ts` 934 lines, `courseStructures.ts` 674 lines, `sourceBank.ts` 657 lines, `templates.ts` 639 lines. | Harder maintainability and possible server bundle churn. | Move to validated data files and generated indexes. |

## Accessibility summary

Accessibility readiness score: 6 / 10 from static inspection. The code shows useful nav labels, dialog roles, and iframe titles, but it needs automated checks and stricter requirements for media and diagrams.

## Accessibility findings

| Issue | Severity | Evidence | Recommended fix |
| --- | --- | --- | --- |
| No automated a11y gate found. | Medium | `package.json` gates do not include axe/Playwright a11y. | Add axe smoke tests. |
| Mermaid diagrams do not require text alternatives. | Medium | `MermaidBlock` caption is optional. | Require caption or adjacent summary. |
| Embedded videos can use generic title. | Medium | `VideoEmbed.tsx` defaults to `Embedded video`. | Require title in video/content schema. |
| Video modal needs keyboard regression coverage. | Low | `VideoEmbedModal.tsx` has dialog/focus logic. | Add tests for open, trap, escape, close, and focus return. |
| Skip link not confirmed. | Low | Layout/header inspection did not show a skip link. | Add visible-on-focus skip-to-main link. |
| Rendered MDX tables/code need checks. | Low | MDX uses GFM and custom pre renderer. | Add rendered a11y tests for tables, headings, code blocks. |

## Recommended tests

| Test | Priority |
| --- | --- |
| Lighthouse/Web Vitals smoke on `/`, `/book/ots-101`, `/book/ots-000`, `/videos`. | P3 |
| Playwright keyboard nav through header, mobile nav, video modal. | P3 |
| Axe checks on home, book section, KB page, videos, template download. | P3 |
| Public asset budget for images over 500 KB. | P4 |
| Bundle analysis budget for Mermaid/video pages. | P4 |
