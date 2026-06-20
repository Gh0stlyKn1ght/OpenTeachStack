import {
  FOUNDATION_TEMPLATES,
  getFoundationTemplate,
  renderTemplateMarkdown,
} from "@/lib/templates";

interface TemplateDownloadRouteContext {
  params: Promise<{ slug: string }>;
}

export const dynamic = "force-static";

export function generateStaticParams() {
  return FOUNDATION_TEMPLATES.map((template) => ({ slug: template.slug }));
}

export async function GET(
  _request: Request,
  { params }: TemplateDownloadRouteContext,
) {
  const { slug } = await params;
  const template = getFoundationTemplate(slug);

  if (!template) {
    return new Response("Template not found.", { status: 404 });
  }

  const markdown = renderTemplateMarkdown(template);

  return new Response(markdown, {
    headers: {
      "Content-Disposition": `attachment; filename="${template.slug}.md"`,
      "Content-Type": "text/markdown; charset=utf-8",
    },
  });
}
