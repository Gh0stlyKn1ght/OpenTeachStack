"use client";

import type { VideoItem } from "@/lib/videos/types";
import VideoCard from "./VideoCard";
import VideoEmptyState from "./VideoEmptyState";

export default function VideoGrid({
  videos,
  onSelect,
}: {
  videos: VideoItem[];
  onSelect: (video: VideoItem) => void;
}) {
  if (videos.length === 0) return <VideoEmptyState />;

  return (
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
      {videos.map((video) => (
        <VideoCard key={video.videoId} video={video} onSelect={onSelect} />
      ))}
    </div>
  );
}
