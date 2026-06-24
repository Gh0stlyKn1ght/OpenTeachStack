import type { Metadata } from "next";
import { SITE_URL } from "./metadata";

const SITE_NAME = "OpenTeachStack";
const DEFAULT_IMAGE = {
  url: "/images/teaching-teachers-hero.png",
  alt: "OpenTeachStack curriculum systems field guide for educators",
};

interface PageMetadataOptions {
  title: string;
  description: string;
  path?: string;
  image?: {
    url: string;
    alt: string;
  };
}

export function createPageMetadata({
  title,
  description,
  path = "/",
  image = DEFAULT_IMAGE,
}: PageMetadataOptions): Metadata {
  return {
    title,
    description,
    alternates: {
      canonical: path,
    },
    openGraph: {
      title,
      description,
      url: path,
      siteName: SITE_NAME,
      type: "website",
      locale: "en_US",
      images: [
        {
          url: image.url,
          alt: image.alt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image.url],
    },
  };
}

export const rootMetadataBase = new URL(SITE_URL);
