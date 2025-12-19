# `useScrollPoints` — Developer Usage Guide

A reusable React hook for **smooth scrolling**, **scroll spy**, **key-based navigation**, and **container visibility detection**.
Designed for timelines, carousels, section navigation, steppers, and horizontal scroll experiences.

## Import

```js
import { useScrollPoints } from "@itsrighttime/ui-components";
```

> This hook is **client-side only** and should be used inside components rendered on the client.

## What This Hook Solves

- Scroll smoothly to any DOM point
- Navigate using **keys or indices**
- Track the **currently visible section** (scroll spy)
- Detect whether a container is visible in the viewport
- Works for **vertical and horizontal layouts**
- UI-agnostic (no markup or styling imposed)

## Hook API

### Input Options

```ts
useScrollPoints({
  axis: "vertical" | "horizontal",
  threshold: number,
  scrollBehavior: ScrollBehavior,
  scrollBlock: ScrollLogicalPosition,
});
```

| Option           | Default      | Description                        |
| ---------------- | ------------ | ---------------------------------- |
| `axis`           | `"vertical"` | Scroll direction                   |
| `threshold`      | `0.1`        | Visibility threshold for observers |
| `scrollBehavior` | `"smooth"`   | Native scroll animation            |
| `scrollBlock`    | `"center"`   | Vertical alignment on scroll       |

### Returned Values

```ts
{
  containerRef,
  registerPoint,
  scrollTo,
  activeKey,
  activeIndex,
  isContainerVisible,
}
```

| Name                 | Type                       | Purpose                    |
| -------------------- | -------------------------- | -------------------------- |
| `containerRef`       | `ref`                      | Attach to scroll container |
| `registerPoint`      | `fn`                       | Register scroll targets    |
| `scrollTo`           | `fn`                       | Scroll to a target         |
| `activeKey`          | `string \| number \| null` | Currently visible item key |
| `activeIndex`        | `number \| null`           | Index of active item       |
| `isContainerVisible` | `boolean`                  | Container in viewport      |

## Core Concepts

### 1. Scroll Points

A **scroll point** is any DOM element you want to scroll to or track.

You register points using:

```js
ref={registerPoint(key)}
```

### 2. Keys vs Indexes

#### With explicit keys (recommended)

```jsx
<div ref={registerPoint("2024")} />
```

- Stable
- Works with dynamic lists
- Best for navigation

#### Without keys (auto-index fallback)

```jsx
<div ref={registerPoint()} />
```

- Index assigned automatically
- Useful for simple lists

### 3. Smooth Scrolling

Scroll to a registered point:

```js
scrollTo("2024");
scrollTo(3);
```

Uses native browser scrolling with the configured behavior.

## Usage Examples

## Example 1: Vertical Timeline Navigation

```jsx
const { containerRef, registerPoint, scrollTo, activeKey, isContainerVisible } =
  useScrollPoints();

return (
  <>
    <div ref={containerRef}>
      {timelineData.map((item) => (
        <section key={item.year} ref={registerPoint(item.year)}>
          {item.content}
        </section>
      ))}
    </div>

    {!isContainerVisible && (
      <button onClick={() => scrollTo(timelineData[0].year)}>
        Jump to Timeline
      </button>
    )}
  </>
);
```

## Example 2: Scroll Spy (Active Section Highlight)

```jsx
{
  sections.map((section) => (
    <button
      key={section.id}
      className={activeKey === section.id ? "active" : ""}
      onClick={() => scrollTo(section.id)}
    >
      {section.label}
    </button>
  ));
}
```

- `activeKey` updates automatically while scrolling
- No manual scroll listeners required

## Example 3: Horizontal Carousel

```jsx
const { containerRef, registerPoint, scrollTo, activeIndex } = useScrollPoints({
  axis: "horizontal",
});

return (
  <>
    <div
      ref={containerRef}
      style={{
        display: "flex",
        overflowX: "auto",
      }}
    >
      {items.map((item, i) => (
        <div key={i} ref={registerPoint(i)} style={{ minWidth: 300 }}>
          {item}
        </div>
      ))}
    </div>

    <button onClick={() => scrollTo(activeIndex + 1)}>Next</button>
  </>
);
```

## Example 4: Table of Contents (Docs / Blog)

```jsx
const {
  registerPoint,
  scrollTo,
  activeKey,
} = useScrollPoints();

<aside>
  {headings.map((h) => (
    <a
      key={h.id}
      className={activeKey === h.id ? "active" : ""}
      onClick={() => scrollTo(h.id)}
    >
      {h.title}
    </a>
  ))}
</aside>

<main>
  {headings.map((h) => (
    <section
      key={h.id}
      ref={registerPoint(h.id)}
    >
      {h.content}
    </section>
  ))}
</main>
```

## Container Visibility

`isContainerVisible` tells you when the container enters the viewport.

### Common Use Cases

- Show / hide sticky buttons
- Lazy-load UI
- Trigger animations

```jsx
{
  !isContainerVisible && <StickyCTA />;
}
```

## Configuration Tips

### Adjust visibility sensitivity

```js
useScrollPoints({ threshold: 0.6 });
```

- Higher = more of element must be visible

### Align scroll position

```js
useScrollPoints({ scrollBlock: "start" });
```

Options:

- `"start"`
- `"center"`
- `"end"`
- `"nearest"`

## Important Notes

### 1. Client-Side Only

This hook relies on:

- `IntersectionObserver`
- DOM refs

Use inside `"use client"` components.

### 2. Do Not Conditionally Register Points

**Wrong**

```jsx
{
  isVisible && <div ref={registerPoint(id)} />;
}
```

**Correct**

```jsx
<div ref={registerPoint(id)} />
```

### 3. Stable Keys Recommended

For dynamic lists, **always pass a key** to `registerPoint`.

## Performance

- No scroll listeners
- Uses native browser observers
- Minimal re-renders
- Safe for large lists

## Ideal Use Cases

✔ Timelines
✔ Steppers
✔ Carousels
✔ TOC navigation
✔ Product tours
✔ Feature walkthroughs

## Summary

`useScrollPoints` provides:

- 🔹 Smooth scrolling
- 🔹 Key or index navigation
- 🔹 Scroll spy
- 🔹 Container visibility
- 🔹 Vertical & horizontal support

All in a **single, reusable hook** with **zero UI coupling**.
