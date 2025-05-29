Here's a concise, library-style **Markdown guide** specifically for documenting the **`useSmartPosition` hook**, focused on its **features**, **usage**, and **integration** for consumers of your component library:

---

# 🧩 `useSmartPosition` Hook

The `useSmartPosition` hook dynamically calculates the optimal dropdown or popover alignment based on available space in the viewport, preventing overflow and ensuring consistent UI behavior.

---

## ✨ Features

- ✅ Automatically detects available space around the reference element.
- 🔁 Updates position on window resize.
- 📐 Returns `vertical` and `horizontal` values for smart placement:

  - `vertical`: `"top"` or `"bottom"`
  - `horizontal`: `"left"` or `"right"`

---

## Installation

This hook is included in your library. Import it directly:

```js
import { UIHooks } from "@itsrighttime/ui-components";
const { useSmartPosition } = UIHooks;
```

## Return Value

```ts
type Position = {
  vertical: "top" | "bottom";
  horizontal: "left" | "right";
};
```

## Usage

### Attach it to a ref (dropdown, tooltip, etc.)

```jsx
import React, { useRef } from "react";
import { UIHooks } from "@itsrighttime/ui-components";
const { useSmartPosition } = UIHooks;

const MyDropdown = () => {
  const ref = useRef();
  const position = useSmartPosition(ref);

  return (
    <div
      ref={ref}
      className={`dropdown ${position.vertical} ${position.horizontal}`}
    >
      Your dropdown content here
    </div>
  );
};
```

## When to Use

- Dropdown menus
- Tooltips or hints
- Floating buttons
- Custom modals/popovers
- Any element that must avoid overflowing the viewport

## Tip

Use the returned `position.vertical` and `position.horizontal` to apply directional classes or styles.

```css
/* Example CSS */
.dropdown.top {
  bottom: 100%;
}
.dropdown.bottom {
  top: 100%;
}
.dropdown.left {
  right: 0;
}
.dropdown.right {
  left: 0;
}
```
