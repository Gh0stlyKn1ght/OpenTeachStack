export function extractYouTubeId(input: string): string | null {
  const value = input.trim();

  if (/^[a-zA-Z0-9_-]{11}$/.test(value)) {
    return value;
  }

  try {
    const parsed = new URL(value);
    const host = parsed.hostname.replace(/^www\./, "");

    if (host === "youtu.be") {
      const id = parsed.pathname.split("/").filter(Boolean)[0];
      return id && /^[a-zA-Z0-9_-]{11}$/.test(id) ? id : null;
    }

    if (host === "youtube.com" || host === "m.youtube.com") {
      const watchId = parsed.searchParams.get("v");
      if (watchId && /^[a-zA-Z0-9_-]{11}$/.test(watchId)) {
        return watchId;
      }

      const pathMatch = parsed.pathname.match(
        /^\/(?:embed|shorts)\/([a-zA-Z0-9_-]{11})/,
      );
      return pathMatch?.[1] ?? null;
    }
  } catch {
    return null;
  }

  return null;
}

export function isSupportedYouTubeUrl(input: string): boolean {
  try {
    const parsed = new URL(input.trim());
    const host = parsed.hostname.replace(/^www\./, "");
    return host === "youtube.com" || host === "m.youtube.com" || host === "youtu.be";
  } catch {
    return false;
  }
}
