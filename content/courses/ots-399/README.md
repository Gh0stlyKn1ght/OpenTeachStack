# OTS-399 Capstone Studio

Status: migration complete

Canonical route: `/book/ots-399`

Source registry: `src/lib/courseStructures.ts`

This folder is the course-owned content package for OTS-399. It is designed so the course can be migrated, exported, or maintained without hunting through global content folders.

## Folders

- `lessons/` - chapter and section lesson source files
- `labs/` - hands-on labs, workshops, simulators, or build activities
- `assets/` - course-owned images, diagrams, downloads, and media
- `docs/` - planning, outlines, source queues, reviews, and release notes
- `templates/` - course-specific artifact templates
- `references/` - source queues, citation notes, and platform documentation notes

## Migration Rule

Reader source is now course-owned for OTS-399 sections via the dedicated route scaffold under `src/app/book/ots-399`.
