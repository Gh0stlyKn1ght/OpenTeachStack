"use client";

import { motion } from "framer-motion";
import GitHubIcon from "./GitHubIcon";
import { appSources } from "@/lib/officialSources";

type Product = (typeof appSources)[number];

const row1 = appSources.slice(0, 10);
const row2 = appSources.slice(10, 20);
const cardStep = 208;

function ProductCard({ product }: { product: Product }) {
  return (
    <a
      href={product.appUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Open ${product.name}`}
      className="group mx-2 block w-48 flex-shrink-0 no-underline"
    >
      <div className="relative bg-surface border border-border rounded-xl p-5 hover:border-accent/50 transition-all duration-300 hover:shadow-lg hover:shadow-accent/5 hover:-translate-y-1">
        <div
          className="w-12 h-12 rounded-lg flex items-center justify-center text-lg font-bold text-white mb-3 font-mono"
          style={{ backgroundColor: product.color }}
        >
          {product.mark === "github" ? (
            <GitHubIcon className="h-6 w-6" title="" />
          ) : (
            product.icon
          )}
        </div>
        <h3 className="font-sans text-sm font-semibold text-foreground mb-1">
          {product.name}
        </h3>
        <p className="text-xs text-foreground/50 font-mono uppercase tracking-wider">
          {product.category}
        </p>
        <div
          className="absolute top-0 right-0 w-20 h-20 rounded-bl-full opacity-5 group-hover:opacity-10 transition-opacity"
          style={{ backgroundColor: product.color }}
        />
      </div>
    </a>
  );
}

function ProductGrid({ items }: { items: Product[] }) {
  return (
    <div className="grid grid-cols-2 gap-3 px-6 sm:grid-cols-3">
      {items.map((product) => (
        <a
          key={product.name}
          href={product.appUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Open ${product.name}`}
          className="group block min-w-0 rounded-lg border border-border bg-surface p-3 no-underline transition-colors hover:border-accent/50"
        >
          <div
            className="mb-3 flex h-9 w-9 items-center justify-center rounded-md font-mono text-sm font-bold text-white"
            style={{ backgroundColor: product.color }}
          >
            {product.mark === "github" ? (
              <GitHubIcon className="h-5 w-5" title="" />
            ) : (
              product.icon
            )}
          </div>
          <h3 className="truncate font-sans text-sm font-semibold text-foreground">
            {product.name}
          </h3>
          <p className="truncate font-mono text-[0.65rem] uppercase tracking-wider text-foreground/50">
            {product.category}
          </p>
        </a>
      ))}
    </div>
  );
}

function InfiniteRow({
  items,
  direction,
  speed,
}: {
  items: Product[];
  direction: "left" | "right";
  speed: number;
}) {
  const doubled = [...items, ...items];

  return (
    <div className="overflow-hidden relative">
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
      <motion.div
        className="flex"
        animate={{
          x:
            direction === "left"
              ? [0, -(items.length * cardStep)]
              : [-(items.length * cardStep), 0],
        }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: speed,
            ease: "linear",
          },
        }}
      >
        {doubled.map((product, i) => (
          <ProductCard key={`${product.name}-${i}`} product={product} />
        ))}
      </motion.div>
    </div>
  );
}

export default function ProductCarousel() {
  return (
    <section className="py-20 overflow-hidden">
      <div className="mx-auto max-w-3xl px-6 mb-12 text-center">
        <h2 className="font-serif text-3xl font-bold text-foreground mb-4">
          Apps Teachers Need to Understand
        </h2>
        <p className="text-foreground/60 max-w-xl mx-auto">
          From Google Workspace to AI assistants, source control, media,
          documentation, and publishing, these are the practical tools behind
          modern curriculum systems.
        </p>
      </div>

      <div className="md:hidden">
        <ProductGrid items={appSources} />
      </div>

      <div className="hidden space-y-6 md:block">
        <InfiniteRow items={row1} direction="left" speed={35} />
        <InfiniteRow items={row2} direction="right" speed={40} />
      </div>
    </section>
  );
}
