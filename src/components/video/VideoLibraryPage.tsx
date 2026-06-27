import type { VideoLibraryIndex } from "@/lib/videos/types";
import VideoHero from "./VideoHero";
import VideoLibraryClient from "./VideoLibraryClient";

export default function VideoLibraryPage({
  library,
}: {
  library: VideoLibraryIndex;
}) {
  const approvedCount = library.videos.filter(
    (video) => video.status === "approved",
  ).length;

  return (
    <>
      <VideoHero videoCount={library.videos.length} approvedCount={approvedCount} />
      <VideoLibraryClient library={library} />
    </>
  );
}
