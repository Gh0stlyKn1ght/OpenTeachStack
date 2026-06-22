# OTS-301 Safe Domain and DNS Examples

Date: 2026-06-22

Status: active guidance

Use reserved placeholder domains in curriculum examples. Do not invent real-looking school domains, student subdomains, or guessed DNS records.

## Reserved Example Domains

Use these domains when an example needs a domain name:

- `example.com`
- `example.org`
- `example.net`
- `example.edu`

Use these paths when an example needs a course URL:

- `https://example.edu/course`
- `https://example.edu/algebra`
- `https://example.org/resources`
- `https://teacher.example.com/course-hub`

## DNS Example Patterns

| Scenario | Safe example | Notes |
| --- | --- | --- |
| Course hub apex | `example.edu` | Use only as a placeholder in public docs. |
| Course subdomain | `course.example.edu` | Do not use a real district domain unless it is a private operational note. |
| CNAME target | `teacher-site.examplehost.com` | Replace with official host documentation when implementing. |
| TXT verification | `example-verification-token` | Never paste real verification tokens into docs or repos. |
| HTTPS check | `https://example.edu` | Launch requires HTTPS on the real site. |

## Safety Rules

- Do not publish real registrar account details, DNS tokens, billing details, or renewal screenshots.
- Do not use real student, teacher, school, or district names in domain examples.
- Keep real domain decisions in private operational notes when they include billing, ownership, or security details.
- Check official registrar and hosting documentation before changing real DNS.
- Record domain owner, renewal date, and notification email in a private maintenance location.
