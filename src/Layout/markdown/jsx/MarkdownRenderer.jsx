"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import styles from "../css/Markdown.module.css";
import { markdownComponents } from "../helper/MarkdownComponents.jsx";

/**
 * MarkdownRenderer
 *
 * Renders a Markdown string as styled HTML using `react-markdown`
 * with GitHub Flavored Markdown (GFM) support and custom renderers.
 *
 * This component is intended to be used as a drop-in Markdown viewer
 * within consuming applications. It handles:
 * - GFM features (tables, task lists, strikethrough, etc.)
 * - Custom rendering for headings, links, lists, code blocks, and tables
 * - Syntax highlighting for fenced code blocks
 * - Scoped styling via CSS modules
 *
 * @component
 *
 * @param {Object} props - Component props
 * @param {string} props.content - Raw Markdown content to be rendered
 *
 * @returns {JSX.Element} Rendered Markdown wrapped in a styled article element
 *
 * @example
 * ```jsx
 * import { MarkdownRenderer } from "<your-library-name>";
 *
 * const markdown = `
 * # Hello World
 *
 * \`\`\`js
 * console.log("Hello!");
 * \`\`\`
 * `;
 *
 * <MarkdownRenderer content={markdown} />
 * ```
 */
export function MarkdownRenderer({ content }) {
  return (
    <article className={styles.markdown}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={markdownComponents}
      >
        {content}
      </ReactMarkdown>
    </article>
  );
}
