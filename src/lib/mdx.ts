import type { MDXRemoteProps } from "next-mdx-remote/rsc";
import type { ComponentPropsWithoutRef, JSX } from "react";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

/**
 * Map of custom React components that can be used inside MDX content.
 *
 * Keys are HTML element names or custom component names; values are React
 * components that receive the corresponding props.
 */
export type MDXComponentsMap = {
  [element in keyof JSX.IntrinsicElements]?: (
    props: ComponentPropsWithoutRef<element>,
  ) => JSX.Element;
} & {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [customComponent: string]: (props: any) => JSX.Element;
};

// ---------------------------------------------------------------------------
// MDX options (remark / rehype plugin pipeline)
// ---------------------------------------------------------------------------

/**
 * Shared MDX compiler options used by every page that renders MDX content.
 *
 * Includes:
 * - **remark-gfm** — GitHub Flavored Markdown (tables, task lists, strikethrough, autolinks)
 * - **rehype-slug** — adds `id` attributes to headings
 * - **rehype-autolink-headings** — wraps headings with anchor links for easy sharing
 */
export const mdxOptions: NonNullable<MDXRemoteProps["options"]> = {
  mdxOptions: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      rehypeSlug,
      [
        rehypeAutolinkHeadings,
        {
          behavior: "wrap",
          properties: {
            className: ["heading-anchor"],
            ariaLabel: "Link to this section",
          },
        },
      ],
    ],
  },
};

// ---------------------------------------------------------------------------
// compileMDX helper
// ---------------------------------------------------------------------------

/**
 * Compile a raw MDX source string into a React element using
 * `next-mdx-remote/rsc`'s `MDXRemote` component.
 *
 * This is designed for use in React Server Components. Call it from a `page.tsx`
 * or layout and render the returned element directly:
 *
 * ```tsx
 * import { compileMDX } from "@/lib/mdx";
 *
 * export default async function LessonPage() {
 *   const element = await compileMDX(rawSource, components);
 *   return <article>{element}</article>;
 * }
 * ```
 *
 * @param source  - The raw MDX string (typically from `getContentBySlug`).
 * @param components - Optional map of custom components available inside the MDX.
 * @returns A React element ready to be rendered in an RSC tree.
 */
export async function compileMDX(
  source: string,
  components?: MDXComponentsMap,
): Promise<React.ReactElement> {
  // Dynamic import keeps the RSC dependency out of the module graph for files
  // that only import types or options from this module.
  const { MDXRemote } = await import("next-mdx-remote/rsc");

  return MDXRemote({
    source,
    options: mdxOptions,
    components: components as MDXRemoteProps["components"],
  });
}
