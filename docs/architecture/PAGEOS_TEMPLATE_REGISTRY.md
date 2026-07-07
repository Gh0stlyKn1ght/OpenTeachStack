# PageOS Template Registry

Date: 2026-07-07

PageOS is the route-level boilerplate contract for OpenTeachStack. It answers the practical question: is a page using an intentional template family, or did it quietly become a one-off page?

The machine-readable source is `docs/architecture/page-template-registry.json`. The guard is:

```bash
npm.cmd run check:page-templates
```

That check is also part of `npm test` and `npm run verify:release`.

## Template Families

`courseos-packet`

Used for `/book/...` course packet routes. These pages must render through the shared CourseOS packet templates:

- `CoursePacketOverviewTemplate`
- `CoursePacketChapterTemplate`
- `CoursePacketLessonTemplate`
- `CoursePacketUnavailableTemplate`

This is the learning-template system for real course packet reading surfaces.

`field-guide`

Used for article-like site pages, indexes, audits, public docs, resource pages, and pathway pages that share the `FieldGuidePage` shell.

`learning-resource`

Used for the older detail-page resource layouts:

- `LessonLayout`
- `LabLayout`
- `FieldNoteLayout`

These are registered honestly as legacy resource readers. They are not CourseOS course packet pages.

`template-detail`

Used for individual downloadable template pages backed by `getFoundationTemplate`.

`video-library`

Used for the video library route backed by `VideoLibraryPage`.

`redirect`

Used for route aliases that intentionally call `redirect(...)`.

`re-export`

Used for route aliases that intentionally re-export another page module.

`home`

Used for the custom home page. This is allowed as a bespoke entry surface, but it is still registered.

## Adding A Page

1. Pick the family before building the route.
2. Reuse the family template instead of hand-building a new shell.
3. Add the page to `docs/architecture/page-template-registry.json`.
4. Run `npm.cmd run check:page-templates`.

If a page really needs a new family, add the reusable component first, then update `scripts/check-page-template-registry.mjs` so the family is enforceable.

## Current Answer

The course reader pages are now CourseOS-backed. The rest of the project is not all CourseOS, and it should not be: static docs, redirects, resource pages, and the home page have different jobs. They are now PageOS-backed by declared families, and drift is blocked by release verification.
