"use client";

import { useCallback, useEffect, useId, useMemo, useRef, useState } from "react";

type MermaidApi = typeof import("mermaid").default;
let mermaidPromise: Promise<MermaidApi> | null = null;

function loadMermaid() {
  mermaidPromise ??= import("mermaid").then((module) => module.default);
  return mermaidPromise;
}

interface MermaidBlockProps {
  chart?: string;
  caption?: string;
}

type RenderState =
  | { status: "idle"; svg: ""; error: "" }
  | { status: "rendered"; svg: string; error: "" }
  | { status: "failed"; svg: ""; error: string };

function normalizeChart(chart?: string) {
  return (chart ?? "")
    .replace(/^\n+/, "")
    .replace(/\n+$/, "")
    .split("\n")
    .map((line) => line.trimEnd())
    .join("\n");
}

function sanitizeMermaidSvg(svg: string) {
  return svg
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<foreignObject[\s\S]*?<\/foreignObject>/gi, "")
    .replace(/<(iframe|object|embed|link|meta)\b[\s\S]*?<\/\1>/gi, "")
    .replace(/<(iframe|object|embed|link|meta)\b[^>]*\/?>/gi, "")
    .replace(/\s+on[a-zA-Z]+\s*=\s*"[^"]*"/g, "")
    .replace(/\s+on[a-zA-Z]+\s*=\s*'[^']*'/g, "")
    .replace(/\s+(href|xlink:href|src)\s*=\s*(['"])\s*javascript:[\s\S]*?\2/gi, "");
}

export default function MermaidBlock({ chart, caption }: MermaidBlockProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [renderState, setRenderState] = useState<RenderState>({
    status: "idle",
    svg: "",
    error: "",
  });
  const reactId = useId();
  const mermaidBaseId = useMemo(
    () => `mermaid-${reactId.replace(/[^a-zA-Z0-9_-]/g, "")}`,
    [reactId],
  );
  const normalizedChart = useMemo(() => normalizeChart(chart), [chart]);
  const renderCountRef = useRef(0);
  const idRef = useRef(mermaidBaseId);

  const initializeMermaid = useCallback(() => {
    const isDark = document.documentElement.classList.contains("dark");

    return loadMermaid().then((mermaid) => {
      mermaid.initialize({
        startOnLoad: false,
        securityLevel: "strict",
        theme: isDark ? "dark" : "default",
        fontFamily: '"Source Sans 3", sans-serif',
        themeVariables: isDark
          ? {
              primaryColor: "#24283b",
              primaryTextColor: "#c0caf5",
              primaryBorderColor: "#7aa2f7",
              lineColor: "#787c99",
              secondaryColor: "#28344a",
              tertiaryColor: "#1a1b2c",
            }
          : {
              primaryColor: "#e6e7ed",
              primaryTextColor: "#343b58",
              primaryBorderColor: "#34548a",
              lineColor: "#5d647f",
              secondaryColor: "#cbcdd7",
              tertiaryColor: "#d5d6db",
            },
      });

      return mermaid;
    });
  }, []);

  const renderDiagram = useCallback(async () => {
    if (!normalizedChart.trim()) {
      setRenderState({
        status: "failed",
        svg: "",
        error: "No Mermaid chart source was provided.",
      });
      return;
    }

    const mermaid = await initializeMermaid();
    renderCountRef.current += 1;
    idRef.current = `${mermaidBaseId}-${renderCountRef.current}`;

    try {
      await mermaid.parse(normalizedChart);
      const { svg: rendered } = await mermaid.render(
        idRef.current,
        normalizedChart,
      );
      setRenderState({
        status: "rendered",
        svg: sanitizeMermaidSvg(rendered),
        error: "",
      });
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Unknown Mermaid render error";
      console.error("Mermaid diagram failed to render", {
        error,
        chart: normalizedChart,
      });
      setRenderState({ status: "failed", svg: "", error: message });
    }
  }, [initializeMermaid, mermaidBaseId, normalizedChart]);

  useEffect(() => {
    queueMicrotask(() => {
      renderDiagram();
    });
  }, [renderDiagram]);

  useEffect(() => {
    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        if (
          mutation.type === "attributes" &&
          mutation.attributeName === "class"
        ) {
          renderDiagram();
        }
      }
    });

    observer.observe(document.documentElement, { attributes: true });
    return () => observer.disconnect();
  }, [renderDiagram]);

  return (
    <figure className="my-8">
      <div
        ref={containerRef}
        className="rounded-md border border-border bg-surface p-4 md:p-6"
      >
        {renderState.status === "rendered" ? (
          <div className="overflow-x-auto rounded-sm bg-background/40 p-3">
            <div
              className="mermaid-svg"
              dangerouslySetInnerHTML={{ __html: renderState.svg }}
            />
          </div>
        ) : renderState.status === "failed" ? (
          <div className="w-full text-left">
            <p className="mb-3 text-sm font-mono text-red-600 dark:text-red-400">
              Failed to render Mermaid diagram.
            </p>
            <details className="text-sm text-slate">
              <summary className="cursor-pointer font-mono text-xs uppercase tracking-wider">
                Show diagram source
              </summary>
              <pre className="mt-3 whitespace-pre-wrap text-xs">
                <code>{normalizedChart}</code>
              </pre>
              <p className="mt-2 text-xs font-mono text-foreground/45">
                {renderState.error}
              </p>
            </details>
          </div>
        ) : (
          <p className="text-sm font-mono text-slate">Rendering diagram...</p>
        )}
      </div>
      {caption && (
        <figcaption className="mt-2 text-center text-sm text-slate font-sans italic">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
