"use client";

import styles from "../css/Markdown.module.css";
// import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
// import {
//   oneDark,
//   coy,
//   materialLight,
// } from "react-syntax-highlighter/dist/esm/styles/prism";
import { MarkdownTable } from "../jsx/MarkdownTable.jsx";

const SyntaxHighlighter = dynamic(
  () => import("react-syntax-highlighter").then((mod) => mod.Prism),
  { ssr: false }
);

const materialLight = dynamic(
  () =>
    import("react-syntax-highlighter/dist/esm/styles/prism").then(
      (mod) => mod.materialLight
    ),
  { ssr: false }
);

export const markdownComponents = {
  h1: ({ children }) => <h1 className={styles.h1}>{children}</h1>,
  h2: ({ children }) => <h2 className={styles.h2}>{children}</h2>,
  h3: ({ children }) => <h3 className={styles.h3}>{children}</h3>,

  // Remove default <p> wrapper for code blocks
  p: ({ node, children }) => {
    // Check if paragraph contains a code block (including nested structures)
    const hasCodeBlock = node.children.some(
      (child) =>
        child.type === "code" ||
        (child.tagName === "code" && !child.properties?.inline)
    );

    if (hasCodeBlock) {
      return <>{children}</>;
    }
    return <p className={styles.p}>{children}</p>;
  },

  a: ({ href, children }) => (
    <a
      href={href}
      className={styles.link}
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
    </a>
  ),

  ul: ({ children }) => <ul className={styles.ul}>{children}</ul>,
  ol: ({ children }) => <ol className={styles.ol}>{children}</ol>,
  li: ({ children }) => <li className={styles.li}>{children}</li>,

  blockquote: ({ children }) => (
    <blockquote className={styles.blockquote}>{children}</blockquote>
  ),

  code: ({ node, className, children, ...props }) => {
    // Alternative check: inline code typically doesn't have className with "language-"
    const match = /language-(\w+)/.exec(className || "");

    // If it has a language specifier, it's definitely a code block
    if (match) {
      return (
        <SyntaxHighlighter language={match[1]} style={materialLight}>
          {String(children).replace(/\n$/, "")}
        </SyntaxHighlighter>
      );
    }

    // Check if children is a simple string (inline) vs has newlines (block)
    const hasNewlines = String(children).includes("\n");

    if (hasNewlines) {
      // Block code without language
      return (
        <pre className={styles.codeBlock}>
          <code className={className}>{children}</code>
        </pre>
      );
    }

    // Inline code
    return <code className={styles.inlineCode}>{children}</code>;
  },

  table: ({ node }) => <MarkdownTable node={node} />,
};
