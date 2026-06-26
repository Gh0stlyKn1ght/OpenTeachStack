import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import readingTime from "reading-time";

export type BlogSection = "author-blog" | "build-notes";

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  category: string;
  summary: string;
  section: BlogSection;
  author: string;
  readingTime: string;
  content: string;
}

const postsDir = path.join(process.cwd(), "content", "blog", "posts");

function normalizeSection(value: unknown): BlogSection {
  return value === "author-blog" ? "author-blog" : "build-notes";
}

export function getPublishedBlogPosts(section?: BlogSection): BlogPost[] {
  if (!fs.existsSync(postsDir)) return [];

  return fs
    .readdirSync(postsDir)
    .filter((file) => /\.(md|mdx)$/i.test(file))
    .map((file) => {
      const fullPath = path.join(postsDir, file);
      const { data, content } = matter(fs.readFileSync(fullPath, "utf8"));

      return {
        slug: data.slug ?? file.replace(/\.(md|mdx)$/i, ""),
        title: data.title ?? "Untitled",
        date: data.date ?? "",
        category: data.category ?? "Build Log",
        summary: data.summary ?? "",
        section: normalizeSection(data.section),
        author: data.author ?? "",
        readingTime: readingTime(content).text,
        status: data.status,
        published: data.published,
        humanReviewed: data.humanReviewed,
        content,
      };
    })
    .filter(
      (post) =>
        post.status === "published" &&
        post.published === true &&
        post.humanReviewed === true &&
        (!section || post.section === section),
    )
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getPublishedBlogPost(slug: string, section?: BlogSection) {
  return getPublishedBlogPosts(section).find((post) => post.slug === slug);
}
