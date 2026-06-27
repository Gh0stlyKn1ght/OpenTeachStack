"use client";

import { useMemo, useState } from "react";
import type { VideoItem, VideoLibraryIndex } from "@/lib/videos/types";
import VideoCard from "./VideoCard";
import VideoEmbedModal from "./VideoEmbedModal";
import VideoFilters from "./VideoFilters";
import VideoGrid from "./VideoGrid";
import VideoHero from "./VideoHero";

const preferredCategories = [
  "All",
  "Featured",
  "AI",
  "Computer Science",
  "Cybersecurity",
  "Robotics",
  "Teacher Workflow",
  "Professional Growth",
];

export default function VideoLibraryPage({
  library,
}: {
  library: VideoLibraryIndex;
}) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedVideo, setSelectedVideo] = useState<VideoItem | null>(null);

  const categories = useMemo(() => {
    const discovered = new Set(library.videos.map((video) => video.category));
    return preferredCategories.filter(
      (category) => category === "All" || discovered.has(category),
    );
  }, [library.videos]);

  const featuredVideo =
    library.videos.find((video) => video.featured && video.status !== "blocked") ??
    library.videos.find((video) => video.status === "approved") ??
    library.videos[0];

  const filteredVideos = library.videos.filter((video) => {
    if (activeCategory === "All") return true;
    if (activeCategory === "Featured") return video.featured;
    return video.category === activeCategory;
  });

  const gridVideos = filteredVideos.filter(
    (video) => !featuredVideo || video.videoId !== featuredVideo.videoId,
  );

  const approvedCount = library.videos.filter(
    (video) => video.status === "approved",
  ).length;

  return (
    <>
      <VideoHero videoCount={library.videos.length} approvedCount={approvedCount} />

      <div className="mx-auto grid w-[min(100%-2rem,76rem)] gap-10 py-10">
        {featuredVideo && (
          <section aria-labelledby="featured-video-title">
            <div className="mb-4 flex items-end justify-between gap-4">
              <div>
                <p className="m-0 font-mono text-[0.72rem] font-bold uppercase tracking-[0.16em] text-accent">
                  Featured
                </p>
                <h2
                  id="featured-video-title"
                  className="m-0 mt-1 font-heading text-2xl font-bold text-foreground"
                >
                  Start here
                </h2>
              </div>
            </div>
            <VideoCard
              video={featuredVideo}
              featured
              onSelect={setSelectedVideo}
            />
          </section>
        )}

        <section id="video-grid" className="grid gap-5" aria-labelledby="video-grid-title">
          <div className="grid gap-4 md:grid-cols-[minmax(0,1fr)_auto] md:items-end">
            <div>
              <p className="m-0 font-mono text-[0.72rem] font-bold uppercase tracking-[0.16em] text-accent">
                Browse
              </p>
              <h2
                id="video-grid-title"
                className="m-0 mt-1 font-heading text-2xl font-bold text-foreground"
              >
                Curated media shelf
              </h2>
            </div>
            <VideoFilters
              categories={categories}
              activeCategory={activeCategory}
              onChange={setActiveCategory}
            />
          </div>

          {library.report && library.report.needsReview > 0 && (
            <div className="border border-amber/40 bg-amber/10 p-4 text-sm leading-relaxed text-foreground/72">
              {library.report.needsReview} video
              {library.report.needsReview === 1 ? "" : "s"} still need a
              maintainer review before being treated as fully approved.
            </div>
          )}

          <VideoGrid videos={gridVideos} onSelect={setSelectedVideo} />
        </section>
      </div>

      <VideoEmbedModal
        video={selectedVideo}
        onClose={() => setSelectedVideo(null)}
      />
    </>
  );
}
