# Completed Teacher Builder Starter Kit

Example context: a middle school media-literacy teacher preparing to build and maintain a small course website with Markdown lessons, GitHub review, and occasional AI help.

This example uses fictional project details. Do not copy account names, private URLs, or student information into your own kit.

## 1. Setup Summary

| Question | Example answer |
|---|---|
| Primary device | Personal Windows laptop |
| Operating system | Windows 11 |
| Browser workflow I can use now | GitHub reading, official docs, LMS preview, source checks |
| Local workflow I can use now | VS Code editing, terminal preview, Markdown writing |
| Accounts I need | GitHub, school LMS, approved AI tool account |
| What is ready | VS Code installed, GitHub account active, browser updated |
| What is blocked | School Chromebook cannot run local preview |
| What I will not do on this device | Store student rosters, API keys, or private school exports in project folders |

## 2. Teacher Builder Vocabulary Map

| Word | Plain meaning | Teacher use | Safety question | Related course |
|---|---|---|---|---|
| Source of truth | The file or folder that owns the real version | Prevents editing stale exports | Am I editing the source or a copy? | OTS-101 |
| Project folder | The folder that holds the whole project | Open this in VS Code | Am I at the project root? | OTS-000 |
| Repository | A project folder with version history | Review changes and collaborate | Is this public or private? | OTS-240 |
| Deployment | Sending a site update to the host | Publish updated course pages | Did I check student view after deploy? | OTS-301 |
| MCP | A way for AI tools to connect to systems | Let agents use approved tools | What can the agent read or change? | OTS-320 |

## 3. Workstation Checklist

| Area | Current state | Ready? | Next action |
|---|---|---|---|
| Device | personal Windows laptop | yes | keep OS/browser updated |
| Browser | Chrome current | yes | bookmark official docs |
| Install permissions | personal admin rights | yes | do not install untrusted tools |
| Storage and RAM | enough for small web projects | yes | clean old downloads monthly |
| VS Code | installed | yes | keep extension list short |
| GitHub account | active with MFA | yes | review public profile |
| Backup method | Git history plus cloud backup for non-secret docs | partly | confirm project folder backup rules |

## 4. Project-Folder Map

| Folder or file | Holds | Type | Safe to edit? | Who should review? | Notes |
|---|---|---|---|---|---|
| `content/courses` | course source files | source | yes, with review | teacher/content lead | real course materials |
| `src/app` | site routes and UI | code | only with help | technical reviewer | affects visible site |
| `public/images` | images served by site | asset | yes, with checks | teacher/content lead | check rights and size |
| `docs/reports` | audit outputs | docs/output | usually no | technical reviewer | may be generated |
| `package.json` | commands and dependencies | config | review before editing | technical reviewer | use to read scripts |

## 5. VS Code Survival Sheet

| Task | Safe move |
|---|---|
| Open | Open the project root, not one random file |
| Find | Use Explorer after checking folder names |
| Search | Search first, edit only after reading context |
| Edit | Prefer lesson body edits; pause on frontmatter/config |
| Preview | Preview Markdown or run documented local preview |
| Run | Check current folder before terminal commands |
| Review | Use Source Control or Git diff before accepting work |
| Do not | Do not paste secrets, student data, or private exports |

## 6. Terminal Cheat Sheet

| Command | Plain meaning | Where to run it | Reads or changes? | Stop if |
|---|---|---|---|---|
| `pwd` | show current folder | anywhere | reads | output is not the project path |
| `ls` | list files/folders | current folder | reads | I see private files I should not touch |
| `cd folder-name` | move into a folder | terminal | moves | I do not know where I am going |
| `npm run dev` | start local preview | project root | starts process | README does not list it |
| `npm run test` | run project checks | project root | reads/checks | output mentions secrets or destructive steps |

## 7. GitHub Project-Reading Checklist

| Question | Example notes |
|---|---|
| What is the repo for? | Course-site project for media literacy lessons |
| What does the README say? | Source content lives in `content/courses`; run preview with documented command |
| Where is source content? | `content/courses/media-literacy` |
| What changed recently? | Recent commits edited lesson structure and publishing checklist |
| Is there a license or reuse note? | Content reuse requires attribution and noncommercial use |
| Are there open issues or warnings? | One issue notes broken video links |
| What is the safe next action? | Read only, then make one small branch for a lesson edit |

## 8. Documentation Bookmark Pack

| Tool | Official docs | Page type | Date checked | Why I need it | Risk or warning |
|---|---|---|---|---|---|
| VS Code | official VS Code docs | install/docs | 2026-06-27 | editor setup | extensions need care |
| GitHub | official GitHub Docs | docs | 2026-06-27 | repo reading and review | public/private repo boundary |
| Node.js | official Node.js site | install | 2026-06-27 | local project tools | version may matter |
| Markdown | Markdown guide or project docs | reference | 2026-06-27 | lesson formatting | site may support custom MDX |
| Vercel | official Vercel docs | hosting docs | 2026-06-27 | deployment vocabulary | project settings need review |

## 9. Starter Markdown Lesson

```md
# Evaluating a Website Source

## Learning Target
I can identify who created a website source and explain why it may or may not be useful for class research.

## Why This Matters
Search results can look polished even when the source is weak, outdated, or trying to sell something.

## Directions
1. Open the source your teacher assigned.
2. Find the creator or organization.
3. Identify the purpose of the page.
4. Write one reason the source is useful or limited.

## Example
The page was created by a museum, so it may be useful for historical artifacts. I still need to check the date and whether the page explains its sources.

## Before You Submit
- I named the creator or organization.
- I explained the purpose.
- I gave one usefulness or limitation reason.

## Safety or Source Note
Do not enter personal information into a website while evaluating it.
```

## 10. Website Publishing Flow

```text
Source files -> local preview -> build -> deployment -> published URL -> student-view check -> revision note
```

| Step | What I check | What can go wrong | Evidence I save |
|---|---|---|---|
| Source files | lesson title, directions, links | wrong file edited | changed-file list |
| Local preview | page renders and links appear | preview not running from project root | screenshot or note |
| Build | project can build | syntax or route error | command output summary |
| Deployment | host receives update | deployment fails | deployment URL/status |
| Student view | student can open and use page | permissions, blocked media, hidden files | release note |

## 11. Project Stack Card

| Layer | Tool | Job | Edit boundary |
|---|---|---|---|
| Content | Markdown/MDX | lesson and resource pages | teacher-editable with review |
| Interface | React/Next.js route files | page layout and routing | technical review |
| Styling | Tailwind/CSS | visual design | review for accessibility |
| Tooling | Node/npm | local commands and checks | run documented commands only |
| Hosting | Vercel or similar | published site | deployment settings need review |
| Automation | GitHub checks | verify changes | do not disable casually |

## 12. AI / MCP Access Map

| Tool or connection | Best use | Can read | Can change | Review needed | Do not use for |
|---|---|---|---|---|---|
| Chat assistant | explain concepts, draft examples | prompt text | no project files | source/fact check | private data |
| Repo agent | scoped file edits and audits | project files | yes, if permitted | diff and tests | broad rewrites |
| MCP GitHub connection | inspect issues or PRs | repo metadata/files depending on setup | sometimes | permission boundary | secrets or student data |

## 13. Safe AI Builder Checklist

| Safety check | Example notes |
|---|---|
| Backup or Git checkpoint exists | clean branch before agent work |
| Allowed files are named | only one lesson folder |
| Protected files are named | do not touch config, secrets, unrelated courses |
| Student data removed | practice uses fake examples |
| Secrets protected | no `.env`, tokens, or private links in prompts |
| Draft location named | suggestions go in draft note first |
| Diff review required | inspect changed files before accepting |
| Verification step named | run agreed content/readability check |
| Human approval before publish | teacher reviews before student view |

## Final Reflection

```text
I can now explain:
The difference between source files, project tools, publishing, and AI access.

I can now navigate:
A project folder, VS Code, GitHub, docs, and basic terminal commands with less guessing.

I will be careful with:
Secrets, student data, broad AI edits, deployment claims, and unofficial setup instructions.

I still need help with:
Advanced Git branches, deployment settings, and repo-agent workflows.

My next OpenTeachStack course should be:
OTS-101 if I am building course content, or OTS-240 if I need deeper GitHub practice first.
```
