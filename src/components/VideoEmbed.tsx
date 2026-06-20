interface VideoEmbedProps {
  url: string;
  title?: string;
  caption?: string;
}

function extractYouTubeId(url: string): string {
  // Already a bare ID (no slashes, no dots)
  if (/^[a-zA-Z0-9_-]{11}$/.test(url)) return url;

  try {
    const parsed = new URL(url);
    // youtu.be/ID
    if (parsed.hostname === 'youtu.be') return parsed.pathname.slice(1);
    // youtube.com/watch?v=ID
    const v = parsed.searchParams.get('v');
    if (v) return v;
    // youtube.com/embed/ID
    const embedMatch = parsed.pathname.match(/\/embed\/([a-zA-Z0-9_-]+)/);
    if (embedMatch) return embedMatch[1];
  } catch {
    // fall through
  }

  return url;
}

export default function VideoEmbed({ url, title, caption }: VideoEmbedProps) {
  const videoId = extractYouTubeId(url);
  const embedUrl = `https://www.youtube-nocookie.com/embed/${videoId}`;

  return (
    <figure className="my-8">
      <div className="relative w-full overflow-hidden rounded-md border border-border" style={{ paddingBottom: '56.25%' }}>
        <iframe
          src={embedUrl}
          title={title ?? 'Embedded video'}
          loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 h-full w-full"
        />
      </div>
      {caption && (
        <figcaption className="mt-2 text-center text-sm text-slate font-sans italic">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
