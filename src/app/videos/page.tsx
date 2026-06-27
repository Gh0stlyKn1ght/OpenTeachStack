import type { Metadata } from "next";
import videoIndex from "../../../data/video-index.json";
import VideoLibraryPage from "@/components/video/VideoLibraryPage";
import type { VideoLibraryIndex } from "@/lib/videos/types";
import { createPageMetadata } from "@/lib/siteMetadata";

const library = videoIndex as VideoLibraryIndex;

export const metadata: Metadata = createPageMetadata({
  title: "Video Library — OpenTeachStack",
  description:
    "Curated educational videos for teachers entering technology, AI, computer science, cybersecurity, robotics, and modern instructional design.",
  path: "/videos",
});

export default function VideosPage() {
  return (
    <>
      <link rel="preconnect" href="https://i.ytimg.com" />
      <link rel="preconnect" href="https://www.youtube-nocookie.com" />
      <link rel="preconnect" href="https://www.youtube.com" />
      <VideoLibraryPage library={library} />
    </>
  );
}
