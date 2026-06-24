import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const withMDX = createMDX({
  extension: /\.mdx$/,
});

const nextConfig: NextConfig = {
  allowedDevOrigins: ["10.5.0.2", "127.0.0.1", "localhost"],
  pageExtensions: ["ts", "tsx", "md", "mdx"],
  images: {
    unoptimized: true,
  },
  turbopack: {
    resolveAlias: {
      "next-mdx-import-source-file": "./src/mdx-components.tsx",
    },
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

export default withMDX(nextConfig);
