---
name: ots-agent-safety
description: Review OTS-320 content and tooling involving permissions, command execution, network access, secrets, destructive operations, school data, or external tools.
---

# OTS Agent Safety

Use this skill whenever an OTS-320 lesson, emulator scenario, capstone task, or code change involves agent authority or external access.

## Review dimensions

Inspect:

- working-directory scope
- filesystem read scope
- filesystem write scope
- command execution
- network access
- environment variables and secrets
- authentication material
- student/school data exposure
- destructive commands
- permission bypasses
- external tools and MCP
- rollback path

## Required questions

1. What can the agent see?
2. What can it change?
3. What can it execute?
4. Can it reach the network?
5. Can it read secrets or credentials?
6. Is any real student or school-sensitive data involved?
7. What action requires human approval?
8. What is the recovery path if the change is wrong?

## Teaching rule

Safety guidance must be specific to the mechanism. Avoid generic disclaimers.

## High-risk examples

Permission-bypass flags, destructive shell commands, secret-handling examples, and external write-capable MCP tools must receive explicit treatment. Do not normalize them as convenient defaults.

## CI boundary

Safety checks can exist as local/provider-agnostic CI scripts. Do not tie them to GitHub Actions or Vercel.
