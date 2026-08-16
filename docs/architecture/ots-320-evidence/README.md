# OTS-320 CLI Evidence Library

This directory is the Phase 3 technical evidence layer for **OTS-320 — Command Line AI for Teacher Builders**.

It is not learner-facing course content. It records verified provider behavior before lesson authoring begins.

## Rules

- Provider-specific technical behavior must come from current first-party documentation.
- Command syntax that is presented as executable must have a source ID and verification date.
- Evidence is classified as `documented`, `captured`, or `emulated`.
- Phase 3 starts with `documented` evidence. Real local captures may be added later when deliberately run.
- Never label synthetic output as captured output.
- Dangerous permission-bypass behavior must be marked `high` risk and must not be taught as the normal workflow.
- Volatile items such as model names, exact version numbers, and permission labels should be rechecked before publication.
- CI validates structure and provenance. CI does not decide instructional quality.
- GitHub Actions and Vercel are not used for this initiative.

## Files

- `codex-cli.json` — OpenAI Codex CLI evidence.
- `claude-code.json` — Anthropic Claude Code evidence.
- `antigravity-cli.json` — Google Antigravity CLI (`agy`) evidence.

## Minimum evidence shape

Each evidence item records:

```json
{
  "id": "provider-behavior-id",
  "kind": "command | behavior | permission | skill | mcp | safety",
  "evidenceType": "documented | captured | emulated",
  "syntax": "optional executable syntax",
  "claim": "short paraphrased technical claim",
  "risk": "low | medium | high",
  "volatile": false,
  "sourceId": "official-source-registry-id",
  "verifiedAt": "YYYY-MM-DD",
  "courseUse": ["chapter identifiers"]
}
```

The source registry remains `docs/architecture/ots-320-official-sources.json`.