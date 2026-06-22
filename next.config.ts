import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const withMDX = createMDX({
  extension: /\.mdx$/,
});

const nextConfig: NextConfig = {
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
