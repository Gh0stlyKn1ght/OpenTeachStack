# Target Full Stack Architecture

Date: 2026-06-27
Repository audited: `W:\GitHub\Teacher-techops`

## Goals

Keep the current static-site strengths while removing drift-prone manual registries. The platform should support courses, KB pages, labs, video libraries, source banks, templates, and future admin/progress features without coupling every feature to one large data file.

## Proposed structure

```text
src/
  app/
    book/
    kb/
    labs/
    videos/
    templates/
    api/
  components/
    ui/
    layout/
    navigation/
    mdx/
    course/
    video/
  features/
    courses/
      loaders/
      schemas/
      components/
      urls/
      search/
    kb/
    labs/
    videos/
    templates/
  lib/
    config/
    security/
    validation/
    urls/
    filesystem/
    metadata/
  server/
    api/
    auth/
    storage/
  styles/
  types/

content/
  courses/
  kb/
  labs/
  videos/
  templates/

scripts/
  checks/
  content-tools/
  generated/
  audit/
  security/

tests/
  unit/
  integration/
  e2e/
  a11y/

docs/
  architecture/
  audits/
  roadmaps/
  runbooks/
```

## Boundaries

| Layer | Belongs here | Should not contain |
| --- | --- | --- |
| `src/app` | Thin route files, metadata, redirects, loading/error boundaries. | Large registries or business policy. |
| `components/ui` | Reusable presentation primitives. | Content loading. |
| `components/mdx` | Safe MDX allowlists and wrappers. | Feature data fetching. |
| `features/courses` | Course schemas, loaders, URL helpers, reader components. | KB/video/template logic. |
| `features/kb` | KB schemas, loaders, search metadata. | Course route assumptions. |
| `features/videos` | Video schema, metadata refresh, approval validation. | Generic MDX policy. |
| `lib/security` | Headers, CSP, sanitizers, safe URL helpers. | Feature UI. |
| `content` | Source-of-truth content and metadata. | Generated app code. |
| `scripts/checks` | Non-mutating gates. | Write-capable course generation. |
| `scripts/content-tools` | Explicit opt-in write tools. | Release gates. |

## Content and route manifest flow

```text
content/courses/*/course.json
content/courses/*/status.json
content/courses/*/aliases.json
content/courses/*/lessons/*.mdx
  -> schema validation
  -> generated route manifest
  -> generated search manifest
  -> generateStaticParams
  -> route contract docs/checks
```

## Required changes before growth

| Change | Why |
| --- | --- |
| Generate course manifests from content. | Prevent stale title/slug/route drift. |
| Add schema validation. | Prevent invalid content from becoming runtime bugs. |
| Add alias manifest. | Preserve URL stability after rebuilds. |
| Consolidate special-case book routes. | Reduce duplicated behavior. |
| Add security headers and MDX safety layer. | Prepare for public deployment. |
| Split write scripts from checks. | Prevent accidental dirty trees. |
| Add CI with real gates. | Keep main deployable. |

## Future backend/admin architecture

Do not add admin/progress features directly into the current static app. First define auth provider, session model, server-side authorization, database schema, privacy policy, data retention, audit log, rate limits, and input validation.

## Migration plan

| Phase | Outcome |
| --- | --- |
| 1 | Fix route contract and add schema validation around current loaders. |
| 2 | Generate route/search manifests from content without changing URLs. |
| 3 | Consolidate course reader routes onto generic implementation. |
| 4 | Split feature modules and move large registries into validated data. |
| 5 | Add backend/admin only after auth/storage/privacy design exists. |
