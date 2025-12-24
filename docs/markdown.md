# Markdown Renderer – Developer Using Guide

This guide explains how to **import, configure, and use** the Markdown rendering utilities provided by this library in your project.

---

## What This Library Provides

- A ready-to-use `MarkdownRenderer` React component
- GitHub-flavored Markdown (GFM) support
- Syntax-highlighted code blocks
- Custom-styled Markdown elements
- Secure external links
- Enhanced table rendering

You **do not need to configure `react-markdown` yourself** — everything is pre-wired.

---

## Basic Usage

### Import

```js
import { UILayout } from "@itsrighttime/ui-components";

const { MarkdownRenderer } = UILayout;
```


### Render Markdown

```jsx
const markdownContent = `
# Hello World

This is **Markdown**.

\`\`\`js
console.log("Hello!");
\`\`\`
`;

function App() {
  return <MarkdownRenderer content={markdownContent} />;
}
```

---

## Props

### `<MarkdownRenderer />`

| Prop      | Type     | Required | Description                   |
| --------- | -------- | -------- | ----------------------------- |
| `content` | `string` | ✅       | Raw Markdown string to render |

---

## Supported Markdown Features

The renderer supports all standard Markdown plus **GitHub Flavored Markdown (GFM)**:

- Headings (`#`, `##`, `###`)
- Bold / Italics
- Links (open in new tab)
- Ordered & unordered lists
- Blockquotes
- Inline code
- Code blocks (with or without language)
- Tables
- Fenced code blocks

---

## Code Block Rendering

### Inline Code

```md
`const x = 10`
```

Rendered as styled inline code.

---

### Code Block (No Language)

```md

```

some code

```

```

Rendered as a standard preformatted code block.

---

### Code Block (With Language)

````md
```ts
const x: number = 5;
```
````

````

Rendered with **syntax highlighting** using Prism.

Supported languages depend on Prism defaults (JS, TS, JSON, CSS, etc.).

---

## Table Rendering

Markdown tables are rendered using a custom table component for better styling and control.

```md
| Name | Role |
|------|------|
| Sam  | Dev  |
| Alex | QA   |
````

No extra configuration required.

---

## Styling

The library ships with **built-in styles** for all Markdown elements:

- Headings
- Paragraphs
- Lists
- Code blocks
- Inline code
- Tables
- Blockquotes
- Links

> Styles are encapsulated and safe to use alongside your existing CSS.

---

## Security Considerations

- External links automatically use:

  - `target="_blank"`
  - `rel="noopener noreferrer"`

- HTML injection is not enabled by default

---

## Common Use Cases

- Documentation pages
- README rendering
- Knowledge bases
- Developer portals
- Markdown-powered CMS content

---

## Example: Rendering API Docs

```jsx
import { MarkdownRenderer } from "<your-library-name>";

export function ApiDocs({ docs }) {
  return <MarkdownRenderer content={docs} />;
}
```

---

## Notes & Limitations

- The `content` prop must be a string
- HTML inside Markdown is not rendered unless explicitly enabled by the library
- Large Markdown files may benefit from memoization at the parent level

---

## Troubleshooting

### Markdown not rendering?

- Ensure `content` is a valid string
- Check that Markdown is not escaped

### Code blocks not highlighted?

- Make sure a language is specified after the triple backticks

---

## Summary

To use this library:

1. Install it
2. Import `MarkdownRenderer`
3. Pass a Markdown string

That’s it — no setup, no configuration, no custom wiring required.
