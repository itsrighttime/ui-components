# Developer Guide for `FlexContainer` & `GridContainer`

## Importing

```js
import { UILayout } from "@itsrighttime/ui-components";

const { FlexContainer, GridContainer } = UILayout;
```

## Usage Examples

### FlexContainer

```jsx
<FlexContainer
  direction="row" // "row" or "column"
  justify="between" // "start" | "center" | "end" | "between" | "around" | "evenly"
  align="center" // "start" | "center" | "end" | "stretch"
  wrap="wrap" // "wrap" | "nowrap" | "wrap-reverse"
  gap="16px" // CSS gap value as string ("8px", "1rem", etc.)
  className="myFlex" // Optional: additional class names
  style={{ height: "100vh" }} // Optional: inline styles
>
  {/* Children here */}
</FlexContainer>
```

### GridContainer

```jsx
<GridContainer
  cols={3} // Number of columns (numeric)
  gap="12px" // Gap between grid items, CSS value string
  className="myGrid" // Optional: additional class names
  style={{ width: "100%" }} // Optional: inline styles
>
  {/* Children here */}
</GridContainer>
```

## What Props Do

| Prop Name   | Type   | Default     | Description                                                                                            |
| ----------- | ------ | ----------- | ------------------------------------------------------------------------------------------------------ |
| `direction` | string | `"row"`     | Flex direction: `"row"` or `"column"`                                                                  |
| `justify`   | string | `"start"`   | Flex justify-content with aliases: `"start"`, `"center"`, `"end"`, `"between"`, `"around"`, `"evenly"` |
| `align`     | string | `"stretch"` | Flex align-items: `"start"`, `"center"`, `"end"`, `"stretch"`                                          |
| `wrap`      | string | `"wrap"`    | Flex wrap options: `"wrap"`, `"nowrap"`, `"wrap-reverse"`                                              |
| `gap`       | string | `"8px"`     | Gap between flex/grid items, must be a valid CSS length string                                         |
| `cols`      | number | `2`         | Number of columns for grid layout                                                                      |
| `className` | string | `""`        | Additional CSS classes (optional)                                                                      |
| `style`     | object | `{}`        | Inline styles object (optional)                                                                        |

## How to Extend or Customize

- Pass additional CSS classes via `className`
- Override inline styles via `style` prop
- Add other CSS variables or inline styles as needed
- Keep gaps as CSS strings for units flexibility (`"8px"`, `"0.5rem"`)

## Example in a React Component

```jsx
import { UILayout } from "@itsrighttime/ui-components";
const { FlexContainer, GridContainer } = UILayout;

export default function Example() {
  return (
    <>
      <FlexContainer
        direction="column"
        justify="center"
        align="center"
        gap="20px"
        style={{ height: "100vh" }}
      >
        <div>Flex Item 1</div>
        <div>Flex Item 2</div>
      </FlexContainer>

      <GridContainer cols={4} gap="12px" style={{ marginTop: "2rem" }}>
        {[...Array(8)].map((_, i) => (
          <div key={i} style={{ background: "#eee", padding: "1rem" }}>
            Grid Item {i + 1}
          </div>
        ))}
      </GridContainer>
    </>
  );
}
```

### Example: Using `className` with FlexContainer and GridContainer

```jsx
import React from "react";
import { UILayout } from "@itsrighttime/ui-components";
import styles from "../css/CustomStyles.module.css"; // Your custom CSS module

const { FlexContainer, GridContainer } = UILayout;

export default function Example() {
  return (
    <>
      <FlexContainer
        direction="row"
        justify="between"
        align="center"
        gap="16px"
        className={styles.customFlex} // Adding custom styles
        style={{ height: "100px", backgroundColor: "#f0f0f0" }}
      >
        <div>Item 1</div>
        <div>Item 2</div>
        <div>Item 3</div>
      </FlexContainer>

      <GridContainer
        cols={3}
        gap="12px"
        className={styles.customGrid} // Adding custom styles
        style={{ marginTop: "2rem" }}
      >
        <div>Grid 1</div>
        <div>Grid 2</div>
        <div>Grid 3</div>
        <div>Grid 4</div>
      </GridContainer>
    </>
  );
}
```


### Example CSS Module (`CustomStyles.module.css`)

```css
.customFlex {
  border: 2px solid #007bff;
  padding: 10px;
  border-radius: 8px;
}

.customGrid {
  background-color: #e7f3ff;
  padding: 15px;
  border-radius: 6px;
}
```

### What Happens?

- Your containers keep all their default layout behavior via CSS variables.
- The `className` prop adds **additional styling** from your custom CSS module.
- You can still override or add inline styles via the `style` prop.
- This keeps your components flexible and reusable with customizable looks.
