"use client";

import Image from "next/image";
import type { VideoItem } from "@/lib/videos/types";

const statusLabels: Record<VideoItem["status"], string> = {
  approved: "Approved",
  needsReview: "Needs review",
  blocked: "Blocked",
  unavailable: "Unavailable",
};

const statusClassNames: Record<VideoItem["status"], string> = {
  approved: "border-green/35 bg-green/10 text-green",
  needsReview: "border-amber/40 bg-amber/10 text-amber",
  blocked: "border-pink/40 bg-pink/10 text-pink",
  unavailable: "border-slate/40 bg-slate/10 text-slate",
};

export default function VideoCard({
  video,
  featured = false,
  onSelect,
}: {
  video: VideoItem;
  featured?: boolean;
  onSelect: (video: VideoItem) => void;
}) {
  return (
    <article
      className={`group grid min-w-0 overflow-hidden border border-border bg-surface transition-colors hover:border-accent/50 ${
        featured ? "md:grid-cols-[minmax(0,1.28fr)_minmax(18rem,0.72fr)]" : ""
      }`}
    >
      <button
        type="button"
        onClick={() => onSelect(video)}
        className="relative aspect-video w-full overflow-hidden bg-code-bg text-left"
        aria-label={`Watch ${video.title}`}
      >
        <Image
          src={video.thumbnail}
          alt=""
          fill
          sizes={featured ? "(min-width: 768px) 56vw, 100vw" : "(min-width: 768px) 33vw, 100vw"}
          className="object-cover transition-transform duration-300 group-hover:scale-[1.025]"
          priority={featured}
        />
        {video.duration && (
          <span className="absolute bottom-3 right-3 rounded-sm bg-background/90 px-2 py-1 font-mono text-xs font-semibold text-foreground">
            {video.duration}
          </span>
        )}
        <span className="absolute left-3 top-3 rounded-sm bg-background/90 px-2 py-1 font-mono text-xs font-semibold uppercase tracking-wider text-foreground">
          Watch
        </span>
      </button>

      <div className="grid gap-4 p-5">
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-sm bg-surface-alt px-2 py-1 font-mono text-[0.68rem] font-semibold uppercase tracking-wider text-foreground/55">
            {video.category}
          </span>
          <span
            className={`rounded-sm border px-2 py-1 font-mono text-[0.68rem] font-semibold uppercase tracking-wider ${statusClassNames[video.status]}`}
          >
            {statusLabels[video.status]}
          </span>
        </div>

        <div>
          <h2
            className={`m-0 font-heading font-bold leading-tight text-foreground ${
              featured ? "text-2xl md:text-3xl" : "text-xl"
            }`}
          >
            {video.title}
          </h2>
          <p className="m-0 mt-2 text-sm font-semibold text-slate">
            {video.channelTitle}
          </p>
        </div>

        {video.notes && (
          <p className="m-0 text-sm leading-relaxed text-foreground/68">
            {video.notes}
          </p>
        )}

        <div className="flex flex-wrap gap-2">
          {video.tags.map((tag) => (
            <span
              key={`${video.videoId}-${tag}`}
              className="rounded-sm border border-border px-2 py-1 font-mono text-[0.68rem] uppercase tracking-wider text-foreground/55"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}
