# OTS-301 Teacher Course Sites Outline

Date: 2026-06-22

Status: Coming Soon outline - frozen until OTS-101 is right.

Course path: Modern Teacher Systems

Prerequisite: OTS-101 plus comfort with files and web publishing concepts

## Course Thesis

A teacher course site should be a durable, navigable home for curriculum. It should make lessons easier to find, cite sources clearly, protect privacy, and remain maintainable after launch.

OTS-301 should turn one-day lesson pages and course materials into a teacher-owned hub with web basics, domain literacy, accessibility checks, and publishing maintenance.

## Course Source Lessons

This outline is backed by course-owned course-site and publishing lesson files:

- `content/lessons/one-day-lesson-site-workflow.mdx`
- `content/field-notes/how-i-built-one-day-lesson-sites.mdx`
- `content/lessons/what-is-a-domain.mdx`
- `content/lessons/dns-explained-for-teachers.mdx`
- `content/lessons/buying-a-domain-safely.mdx`
- `content/lessons/publishing-your-curriculum-hub.mdx`

## Final Artifact

Published course hub

The final artifact should include:

- course site plan
- web concepts map
- course hub sitemap
- source and update notes
- publishing safety checklist
- deployment and maintenance plan
- live or locally verified course hub
- release review note

## Chapter Outline

| Chapter | Focus | Source material | Build artifact |
| --- | --- | --- | --- |
| 01. Course Site Strategy | Define audience, use cases, scope, and the smallest useful public hub. | `one-day-lesson-site-workflow.mdx`, `how-i-built-one-day-lesson-sites.mdx` | Course site plan |
| 02. Web Basics for Teachers | Explain pages, files, HTML, CSS, domains, DNS, hosting, and static sites. | `what-is-a-domain.mdx`, `dns-explained-for-teachers.mdx`, `buying-a-domain-safely.mdx` | Web concepts map |
| 03. Course Hub Structure | Plan homepage, course pages, resources, source notes, and update paths. | `one-day-lesson-site-workflow.mdx`, `publishing-your-curriculum-hub.mdx` | Course hub sitemap |
| 04. Accessibility and Safety | Review readability, links, privacy, public files, embeds, and student data exposure. | `delivery-planning-foundations.mdx`, OTS-280 safety model | Publishing safety checklist |
| 05. Deployment and Maintenance | Use GitHub Pages, Vercel, domains, HTTPS, updates, and broken-link checks responsibly. | `publishing-your-curriculum-hub.mdx`, domain lessons | Maintenance plan |
| 06. Published Course Hub | Assemble, review, publish, and document a maintainable teacher-owned course site. | OTS-301 course lessons and templates | Published course hub |

## Safety Rules

- Do not publish student-identifiable information, class rosters, private schedules, grades, or private document links.
- Keep domain-purchase guidance clear about add-ons, WHOIS privacy, auto-renewal, and renewal costs.
- Verify HTTPS, mobile readability, source notes, and broken links before public sharing.
- Keep deployment instructions tied to official hosting documentation, not memory or screenshots alone.
- Treat public contact methods, forms, analytics, and embeds as privacy decisions.

## Current Route Coverage

The outline is represented in `src/lib/courseStructures.ts` and rendered through the shared course-book routes:

- `/book/ots-301`
- `/book/ots-301/01-course-site-strategy`
- `/book/ots-301/05-deployment-maintenance/05-1`

## Next Content Tasks

1. Continue expanding section-level examples as needed. Chapters 01-06 now have authored section content through the shared course content guide.
2. Course hub sitemap template is documented in `docs/OTS_301_COURSE_HUB_SITEMAP_TEMPLATE.md`.
3. Domain and DNS examples use reserved placeholder domains in `docs/OTS_301_SAFE_DOMAIN_EXAMPLES.md`.
4. MDN, CommonMark, GitHub Pages, Vercel, Cloudflare Pages, DNS, IANA, and W3C accessibility references are attached or queued in `docs/OTS_301_SOURCE_REFERENCES.md`.
5. Live-site privacy, accessibility, and broken-link review is documented in `docs/OTS_301_LIVE_SITE_REVIEW.md`.

