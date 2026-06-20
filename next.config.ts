import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  pageExtensions: ["ts", "tsx", "md", "mdx"],
  images: {
    unoptimized: true,
  },
  async redirects() {
    return [
      {
        source: "/lessons/what-teacher-techops-is",
        destination: "/lessons/what-open-teachstack-is",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
