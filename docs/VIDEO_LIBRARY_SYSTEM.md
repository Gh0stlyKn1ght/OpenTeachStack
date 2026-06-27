# OpenTeachStack Video Library System

The video library is a site-wide resource at `/videos`. It is not attached to a course route.

## Add a Video

Paste a YouTube link into `content/videos/approved-videos.md` under the closest topic heading.

Optional metadata hints can sit above the link:

```md
tags: ai, teaching, workflow
category: AI
level: beginner
notes: Useful for a teacher discussion starter.
featured: true

https://www.youtube.com/watch?v=exampleId
```

Supported links:

- `youtube.com/watch?v=...`
- `youtu.be/...`
- `youtube.com/shorts/...`
- `youtube.com/embed/...`

## Update the Library

Run:

```bash
npm run videos:build
```

That command scans `approved-videos.md`, refreshes `content/videos/video-cache.json`, validates source approval, and writes `data/video-index.json`.

The page renders from `data/video-index.json`, so the public site does not call YouTube from the browser to build the library.

## Metadata

If `YOUTUBE_API_KEY` is available, the update script uses the YouTube Data API for title, channel, duration, publish date, description, and thumbnails.

Without `YOUTUBE_API_KEY`, the script uses YouTube oEmbed when available and then falls back to a thumbnail URL plus `Metadata unavailable`. Missing metadata does not break the build; it marks the video for review.

Cached metadata is refreshed after seven days.

## Approved Channels

Approved and blocked channels live in `content/videos/approved-channels.json`.

Current shape:

```json
{
  "allowUnlistedManualReview": true,
  "approvedChannels": ["https://www.youtube.com/@TEDx"],
  "blockedChannels": [],
  "approvedDomains": ["youtube.com", "youtu.be"]
}
```

Add a channel URL or exact channel title to `approvedChannels` when repeated manual review is no longer useful.

## Statuses

- `approved`: channel is in the approved list.
- `needsReview`: channel is not approved yet, or metadata is incomplete.
- `blocked`: channel is blocked or unlisted sources are not allowed.
- `unavailable`: reserved for future checks when a video is known to be unavailable.

## Troubleshooting

If a video appears with `Metadata unavailable`, run `npm run videos:update` again later or add `YOUTUBE_API_KEY` before running `npm run videos:build`.

If a video does not appear, check that the URL is a supported YouTube format and that it is not a duplicate of a video already listed.

If a video stays in review even though the channel is approved, refresh the metadata cache so the channel URL can be detected.

## Classroom Safety

Approved channel status only answers the source-review question. Teachers still need to check age fit, captions, classroom context, accessibility alternatives, and whether the video directly supports the lesson.
