import { isValidElement, type ComponentPropsWithoutRef } from "react";
import MermaidBlock from "./MermaidBlock";

interface CodeElementProps {
  className?: string;
  children?: unknown;
}

export default function MDXPre(props: ComponentPropsWithoutRef<"pre">) {
  const child = props.children;

  if (isValidElement<CodeElementProps>(child)) {
    const className = child.props.className ?? "";
    const code = child.props.children;

    if (className.includes("language-mermaid") && typeof code === "string") {
      return <MermaidBlock chart={code} />;
    }
  }

  return <pre {...props} />;
}
