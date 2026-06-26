"use client";

type ShareButtonProps = {
  title: string;
};

export default function ShareButton({ title }: ShareButtonProps) {
  async function handleShare() {
    const url = window.location.href;

    if (navigator.share) {
      await navigator.share({ title, url });
      return;
    }

    await navigator.clipboard.writeText(url);
  }

  return (
    <button
      type="button"
      className="article-share-button"
      onClick={handleShare}
      aria-label="Share this article"
      title="Share this article"
    >
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        width="20"
        height="20"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M4 12v7a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-7" />
        <path d="M12 16V4" />
        <path d="m8 8 4-4 4 4" />
      </svg>
    </button>
  );
}
