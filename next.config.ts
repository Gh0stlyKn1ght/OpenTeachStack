import type { NextConfig } from "next";
import nextra from "nextra";

const withNextra = nextra({
  contentDirBasePath: "/__nextra-content",
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

export default withNextra(nextConfig);
