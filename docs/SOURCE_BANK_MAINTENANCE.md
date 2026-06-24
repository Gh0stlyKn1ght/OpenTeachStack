# Source Bank Maintenance Workflow

The Source Bank is the shared link system for OpenTeachStack. It should stay boring, checked, and useful. A random list of links is not enough.

## Source Of Truth

Primary data file:

- `src/lib/sourceBank.ts`

Public page:

- `/kb/source-bank`

Link check script:

- `npm run check:source-bank`

## When To Add A Resource

Add a resource when it meets at least one of these conditions:

- It is used by an OTS course, lesson, template, prompt, or example.
- It is an official documentation source for software, platforms, AI tools, web tools, or curriculum systems.
- It is a high-value free or education-friendly learning resource teachers are likely to assign or adapt.
- It fills a clear gap in an existing course pathway.

Do not add a resource just because it is popular. The Source Bank is evidence, not a bookmark dump.

## Required Fields

Every Source Bank item must include:

- stable `id`
- `name`
- official or direct URL
- category
- audience
- cost note
- account requirement
- verification status
- teacher setup note
- privacy or age note
- best use
- tags

If a link cannot be fully verified but is still useful, mark it as direct or limited verification and explain the risk in the note.

## Verification Status Rules

Use `verified-active` when:

- the URL returns a normal successful response
- the destination matches the intended resource
- the page is still usable as a teacher-facing source

Use `verified-active-redirect` when:

- the URL redirects to a current official page
- the final page is still the intended destination

Use `verified-js-app-not-404` when:

- the page is a JavaScript-heavy app shell
- the request does not prove the full app content
- the link is still not a 404

Use `verified-rate-limited-not-404` when:

- the host blocks repeated automated checks
- the response indicates rate limiting instead of a missing page
- the resource was manually or recently verified

Use `fetch-blocked-403-not-404` when:

- the host blocks automated fetches
- the URL is still a known active resource
- the risk note tells reviewers to manually verify if needed

Use `direct-unverified` only when:

- the source is useful enough to include
- the exact verification is incomplete
- the note clearly says what still needs checking

## Review Cadence

Before each public release:

- Run `npm run check:source-bank`.
- Review every redirect.
- Review every 403, 429, app-shell, or direct-unverified item.
- Update retired or replaced resources.
- Confirm privacy/account notes still match the current platform.

Quarterly:

- Re-run the link check.
- Spot-check high-risk student-facing platforms.
- Check whether tools changed pricing, account requirements, age rules, or classroom policies.

When a course changes:

- Add any new official documentation sources.
- Remove course links that no longer support an active lesson.
- Move advanced resources to the correct pathway course instead of forcing them into OTS-101.

## Contributor Checklist

Before opening a PR that changes Source Bank data:

- I checked the official URL.
- I checked whether students need accounts.
- I checked whether teachers need setup time.
- I added a privacy or age note.
- I added a best-use note that explains why the resource belongs.
- I did not invent citations, license terms, or verification claims.
- I ran `npm run check:source-bank` or clearly stated why I could not.

## Retired Resources

Do not silently delete retired resources if lessons mention them. Mark them as retired or replaced, explain the replacement path, and update the relevant course content.

Retired resources should stay only when they help teachers understand migration, replacement, or why an older link should not be assigned anymore.

