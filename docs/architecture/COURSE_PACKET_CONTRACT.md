# Course Packet Contract

A course packet is the maintained source package for one OpenTeachStack course.

The packet lives under:

```txt
content/courses/{course}
```

## Required Files

Every course keeps the current compatibility files:

```txt
README.md
course.json
status.json
lessons/
labs/
assets/
docs/
templates/
references/
```

Packetized courses also add:

```txt
course.packet.json
```

Do not remove `course.json` during migration. Existing readers and checks still depend on it.

## Packet Manifest

`course.packet.json` is the stronger architecture contract. It records:

- schema version
- course code
- slug
- title
- owner model
- canonical route
- reader type
- source root
- content roots
- draft root
- exports root
- reports root
- generated root
- required checks
- release policy

The manifest should agree with `course.json` and `status.json`.

## Status Contract

`status.json` remains the release-truth file.

Allowed status values:

- `planned`
- `draft`
- `review`
- `live`
- `archived`

A course is not live unless `status.json` says `status: "live"` and `humanReviewed: true`.

Build success does not change course status.

## Source And Export Rule

Course source belongs in the packet.

Exports belong downstream.

The validator should never treat a Teachable package, route index, PDF, or upload folder as proof that the course is authored or reviewed.

## Lesson Rule

A lesson file is only useful when it teaches.

The packet contract can confirm structure, but the course still needs human review for usefulness, voice, safety, source quality, accessibility, and classroom fit.

## Migration Rule

Packetize OTS-000 and OTS-101 first.

Leave later courses on their current compatibility shape until the CourseOS layer is proven.
