"use client";

import { useEffect, useRef } from "react";
import type { VideoItem } from "@/lib/videos/types";

export default function VideoEmbedModal({
  video,
  onClose,
}: {
  video: VideoItem | null;
  onClose: () => void;
}) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!video) return;

    const previousActiveElement = document.activeElement as HTMLElement | null;
    closeButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }

      if (event.key !== "Tab" || !modalRef.current) return;

      const focusable = modalRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), iframe, [tabindex]:not([tabindex="-1"])',
      );
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (!first || !last) return;

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
      previousActiveElement?.focus();
    };
  }, [onClose, video]);

  if (!video) return null;

  return (
    <div
      className="fixed inset-0 z-50 grid place-items-center bg-background/88 p-3 backdrop-blur-md"
      role="dialog"
      aria-modal="true"
      aria-labelledby="video-modal-title"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        ref={modalRef}
        className="grid w-full max-w-5xl overflow-hidden border border-border bg-surface shadow-2xl"
      >
        <div className="flex items-start justify-between gap-4 border-b border-border p-4">
          <div>
            <p className="m-0 font-mono text-[0.68rem] font-semibold uppercase tracking-wider text-accent">
              {video.channelTitle}
            </p>
            <h2
              id="video-modal-title"
              className="m-0 mt-1 font-heading text-lg font-bold leading-tight text-foreground md:text-xl"
            >
              {video.title}
            </h2>
          </div>
          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            aria-label="Close video"
            className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-sm border border-border bg-surface-alt text-xl leading-none text-foreground/70 transition-colors hover:border-accent hover:text-foreground"
          >
            x
          </button>
        </div>

        <div className="aspect-video bg-code-bg">
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${video.videoId}`}
            title={video.title}
            className="h-full w-full"
            allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border p-4">
          <p className="m-0 text-sm text-slate">
            Source status: {video.status === "approved" ? "approved" : "review needed"}
          </p>
          <a
            href={video.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex rounded-sm bg-[var(--color-text)] px-4 py-2 text-sm font-semibold text-[var(--color-bg)] no-underline transition-opacity hover:opacity-90"
          >
            Open on YouTube
          </a>
        </div>
      </div>
    </div>
  );
}
