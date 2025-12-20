# VerticalTimeline – Developer Usage Guide

## Overview

`VerticalTimeline` is a client-side React component that renders a vertical, scroll-aware timeline with configurable layout, alternating sides, sticky navigation, and label-based scrolling.

It is designed for:

- Milestones
- Historical timelines
- Step-by-step progress visualization
- Storytelling UI patterns

The component supports responsive behavior, custom layouts, and dynamic content rendering.

---

## Importing the Component

```js
import { UIExtra } from "@itsrighttime/ui-components";
const { VerticalTimeline } = UIExtra;
```

> This is a **client component** and must be used inside a `"use client"` environment (Next.js App Router compatible).

---

## Basic Usage

```jsx
<VerticalTimeline
  config={{
    data: timelineData,
  }}
/>
```

---

## `config` Object API

The component accepts a single prop: `config`.

```ts
VerticalTimeline({
  config?: {
    layout?: "left" | "right" | "center" | "custom";
    alternate?: boolean;
    data: TimelineItem[];
    meta?: MetaConfig;
  }
})
```

### 1. `layout` (optional)

Controls how timeline items are positioned.

| Value    | Behavior                                      |
| -------- | --------------------------------------------- |
| `center` | Items appear on both sides of the center line |
| `left`   | All items render on the right side            |
| `right`  | All items render on the left side             |
| `custom` | Each item controls its own side               |

**Default:** `"center"`

On screens ≤ 650px, `center` layout automatically becomes `right`.

---

### 2. `alternate` (optional)

Only applies when `layout === "center"`.

- `true` → Items alternate left/right automatically
- `false` → Uses each item’s `side` property

**Default:** `true`

---

### 3. `data` (required)

An array of timeline items.

```ts
type TimelineItem = {
  label: string;
  component: ReactNode | ComponentConfig;
  side?: "left" | "right"; // used when layout is "custom" or alternate=false
  radius?: string; // circle radius (CSS value)
};
```

#### Example

```js
const timelineData = [
  {
    label: "2019",
    component: <MyCard title="Started Project" />,
    radius: "36px",
  },
  {
    label: "2021",
    component: {
      type: "text",
      value: "Reached 1M users",
    },
    side: "left",
  },
];
```

> `component` is rendered through `TimelineContentRenderer`, allowing flexible content strategies.

---

### 4. `meta` (optional)

Additional configuration metadata.

```ts
type MetaConfig = {
  timeLineBtnLabel?: string;
};
```

#### Example

```js
meta: {
  timeLineBtnLabel: "View Milestones",
}
```

---

## Sticky Timeline Navigation

When the timeline container is visible:

- A **sticky button** appears
- Clicking it opens a **label panel**
- Clicking a label scrolls to the corresponding timeline point

This behavior is powered by:

- `useScrollPoints`
- `useOutsideClick`

No extra setup required.

---

## Internal Behavior & Hooks

### Responsive Handling

- `useMediaQuery(650)` switches layout for mobile devices

### Scroll Handling

- `useScrollPoints()` provides:

  - Scroll registration per timeline item
  - Smooth scrolling to specific items
  - Visibility detection for sticky controls

### Outside Click Detection

- `useOutsideClick()` automatically closes the label panel when clicking outside


# All the Avaliable cards in that or Example usecase

```
import { VerticalTimeline } from "../../Generic/jsx/VerticalTimeline.jsx";

export const UseTimeLineExample = () => {
  const config = getTimelineConfig();

  return <VerticalTimeline config={config} />;
};

const img =
  "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?q=80&w=1120&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

const getTimelineConfig = () => {
  const timelineItems = [
    /* =====================================================
     1. MILESTONE – LEFT (CUSTOM)
     ===================================================== */
    {
      label: "milestone",
      side: "left",
      component: {
        type: "milestone",
        data: {
          title: "Foundation Started",
          subtitle: "The first step",
          description:
            "This marks the very beginning of the journey with minimal resources but clear vision.",
        },
        iconName: "homeIcon",
        link: {
          label: "Click Me",
          href: "#",
        },
      },
    },

    /* =====================================================
     2. ACHIEVEMENT – RIGHT (CUSTOM)
     ===================================================== */
    {
      label: "achievement",
      side: "right",
      component: {
        type: "achievement",
        data: {
          title: "First Public Release",
          metric: "10K+ users",
          iconName: "homeIcon",
          description:
            "Product was released publicly and reached its first major adoption milestone.",
        },
      },
    },

    /* =====================================================
     3. PHASE – AUTO (CENTER MODE)
     ===================================================== */
    {
      label: "phase",
      component: {
        type: "phase",
        data: {
          title: "Growth Phase",
          period: "2025-2030",
          description:
            "Focused on scaling infrastructure, hiring core team members, and stabilizing operations.",
          highlights: ["This is one of the book.", "Can you still make sense."],
        },
      },
    },

    /* =====================================================
     4. EXPERIENCE – AUTO
     ===================================================== */
    {
      label: "experience",
      component: {
        type: "experience",
        data: {
          role: "Lead Engineer",
          org: "ABC Technologies",
          period: "2019 – 2021",
          description:
            "Led the core engineering team and redesigned the system architecture for scale.",
        },
        responsibilities: ["lead", "Working", "Highlight"],
        skills: ["C++", "Java", "Command"],
      },
    },

    /* =====================================================
     5. PRODUCT – LONG CONTENT (RESPONSIVE TEST)
     ===================================================== */
    {
      label: "product",
      component: {
        type: "product",
        data: {
          name: "Platform v2",
          tagline: "Rebuilt from the ground up",
          version: "v-2.326",
          highlights: [
            "Modular architecture",
            "Performance optimizations",
            "Improved developer experience",
            "Enterprise-grade security",
          ],
          links: [
            { label: "Click", href: "#" },
            { label: "Click", href: "#" },
          ],
        },
      },
    },

    /* =====================================================
     6. DECISION – TURNING POINT
     ===================================================== */
    {
      label: "decision",
      component: {
        type: "decision",
        data: {
          decision: "Pivot to SaaS Model",
          impact: "High",
          reason: "Need to figure it out",
          description:
            "This strategic decision changed the revenue model and accelerated long-term growth.",
        },
      },
    },

    /* =====================================================
     7. EVENT – DATE HEAVY
     ===================================================== */
    {
      label: "event",
      component: {
        type: "event",
        data: {
          name: "Global Launch Event",
          location: "Bangalore, India",
          date: "March 14, 2022",
          description:
            "Official global launch with partners, media coverage, and customer showcases.",
        },
        links: [
          { label: "Click", href: "#" },
          { label: "Click", href: "#" },
        ],
      },
    },

    /* =====================================================
     8. MEDIA – IMAGE
     ===================================================== */
    {
      label: "media",
      component: {
        type: "media",
        data: {
          mediaType: "image",
          src: img,
          caption: "Launch day snapshot",
        },
      },
    },

    /* =====================================================
     9. MEDIA – QUOTE (EMPHASIS)
     ===================================================== */
    {
      label: "media",
      component: {
        type: "media",
        data: {
          mediaType: "quote",
          text: "Building slowly but correctly mattered more than growing fast.",
          caption: "Founder’s note",
          emphasis: true,
        },
      },
    },
    {
      label: "cardImg",
      component: {
        type: "cardImg",
        data: {
          img: img,
          title: "Top 5 Interior Tips",
          desc: "Learn how to maximize space and aesthetics.",
          targetLink: "/blog/interior-tips",
          targetTab: "_self",
          colorName: "cyan",
        },
      },
    },
    {
      label: "cardSimpleInfo",
      component: {
        type: "cardSimpleInfo",
        data: {
          img: img,
          name: "Danishan Farookh",
          desc: "Leading our design department with modern vision.",
          title: "Creative Head",
          colorName: "gray",
        },
      },
    },
    {
      label: "cardTextOn",
      component: {
        type: "cardTextOn",
        data: {
          authorName: "Ayesha Khan",
          date: "May 15, 2025",
          img: img,
          desc: "An in-depth view of how AI is shaping design decisions globally.",
          productID: "AI-UX-22",
          orientation: "H",
          colorText: "white",
          colorTitle: "var(--colorCyan)",
          borderRadius: "10px",
        },
      },
    },
    {
      label: "cardTextSliding",
      component: {
        type: "cardTextSliding",
        data: {
          img: img,
          productName: "Smart Home Kit",
          desc: "Automate your living with our AI-driven devices. Automate your living with our AI-driven devices. Automate your living with our AI-driven devices. Automate your living with our AI-driven devices.",
          link: "#",
          productID: "SHK-2025",
          orientation: "V",
          colorLink: "var(--colorCyan)",
          linkLabel: "Click it to Explore",
        },
      },
    },
  ];

  return {
    layout: "center",
    alternate: true,
    data: timelineItems,
    meta: { timeLineBtnLabel: "View Timeline" },
  };
};


```