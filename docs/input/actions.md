# Developer Guide – UI Components

This guide explains how to use the following reusable React components:

- [`<PlainButton />`](#button-component)
- [`<Button />`](#button-component)
- [`<IconButton />`](#iconbutton-component)
- [`<ImageButton />`](#imagebutton-component)
- [`<Link />`](#link-component)

Each component supports inline customization via props and uses CSS modules for styling.

## Installation

Make sure the relevant component files and CSS modules are correctly imported:

```jsx
import { UIInputs } from "@itsrighttime/ui-components";

const { PlainButton, Button, IconButton, ImageButton, Link } = UIInputs.Actions;
```

Each component’s CSS should also be included via module imports (e.g., `../css/Button.module.css`).

## PlainButton Component

### Description

A customizable standard button with dynamic styles using CSS variables.

### Props

| Prop          | Type     | Default    | Description                           |
| ------------- | -------- | ---------- | ------------------------------------- |
| `onClick`     | function | —          | Function executed on click.           |
| `text`        | string   | "Click Me" | The button's label.                   |
| `color`       | string   | "#52C9BD"  | Primary color for background or text. |
| `fontSize`    | number   | `1`        | Font size.                            |
| `fontWeight`  | number   | 400        | To set the boldness of the label.     |
| `isUnderline` | boolean  | false      | underline on hover                    |
| `style`       | object   | `{}`       | Additional inline styles.             |

### Example

```jsx
<PlainButton
  text="Submit"
  color="#007bff"
  onClick={() => alert("Submitted")}
  isUnderline={true}
/>
```

## Button Component

### Description

A customizable standard button with dynamic styles using CSS variables.

### Props

| Prop           | Type     | Default    | Description                                        |
| -------------- | -------- | ---------- | -------------------------------------------------- |
| `onClick`      | function | —          | Function executed on click.                        |
| `text`         | string   | "Click Me" | The button's label.                                |
| `color`        | string   | "#52C9BD"  | Primary color for background or text.              |
| `isBackground` | boolean  | `true`     | If `true`, uses color as background; else as text. |
| `height`       | string   | "30px"     | Height of the button.                              |
| `width`        | string   | "100px"    | Width of the button.                               |
| `borderRadius` | string   | "5px"      | Corner radius.                                     |
| `style`        | object   | `{}`       | Additional inline styles.                          |

### Example

```jsx
<Button
  text="Submit"
  color="#007bff"
  onClick={() => alert("Submitted")}
  width="120px"
  isBackground={true}
/>
```

## IconButton Component

### Description

A circular or square icon-only button with tooltip support.

### Props

| Prop      | Type        | Default   | Description                                |
| --------- | ----------- | --------- | ------------------------------------------ |
| `icon`    | JSX.Element | —         | Icon component (e.g., from `react-icons`). |
| `onClick` | function    | —         | Click event handler.                       |
| `color`   | string      | "#52C9BD" | Icon color.                                |
| `size`    | string      | "1"       | Scale factor (multiplies icon size).       |
| `label`   | string      | `null`    | Tooltip text.                              |
| `style`   | object      | `{}`      | Inline styles.                             |

### Example

```jsx
import { FaTrash } from "react-icons/fa";

<IconButton
  icon={<FaTrash />}
  color="#e74c3c"
  size="1.5"
  label="Delete item"
  onClick={() => console.log("Deleted")}
/>;
```

## ImageButton Component

### Description

A button with a background image and optional overlay text.

### Props

| Prop              | Type     | Default   | Description                             |
| ----------------- | -------- | --------- | --------------------------------------- |
| `text`            | string   | —         | Optional label shown on top.            |
| `onClick`         | function | —         | Click handler.                          |
| `backgroundImage` | string   | —         | URL of the background image.            |
| `imageStyle`      | object   | `{}`      | Custom styles for the button container. |
| `height`          | string   | "100px"   | Button height.                          |
| `width`           | string   | "100px"   | Button width.                           |
| `borderRadius`    | string   | "5px"     | Rounded corners.                        |
| `textColor`       | string   | "#52C9BD" | Color of the overlay label.             |
| `textStyle`       | object   | `{}`      | Inline styles for the text label.       |

### Example

```jsx
<ImageButton
  text="Gallery"
  backgroundImage="/images/gallery.jpg"
  height="150px"
  width="150px"
  borderRadius="10px"
  onClick={() => alert("Image Clicked")}
/>
```

## Link Component

### Description

A styled hyperlink component with full typography control.

### Props

| Prop            | Type   | Default   | Description                                |
| --------------- | ------ | --------- | ------------------------------------------ |
| `text`          | string | —         | The link's visible text.                   |
| `url`           | string | "#"       | The hyperlink target.                      |
| `color`         | string | "#00b0f0" | Text color.                                |
| `fontSize`      | string | —         | Font size.                                 |
| `fontWeight`    | string | —         | Font weight (e.g., `bold`, `500`).         |
| `textAlign`     | string | —         | Text alignment.                            |
| `textTransform` | string | —         | Capitalization (`uppercase`, `lowercase`). |
| `letterSpacing` | string | —         | Spacing between letters.                   |
| `lineHeight`    | string | —         | Line height.                               |
| `fontFamily`    | string | —         | Font family name.                          |
| `style`         | object | `{}`      | Inline custom styles.                      |

### Example

```jsx
<Link
  text="Visit our site"
  url="https://example.com"
  fontSize="16px"
  fontWeight="bold"
  color="#333"
/>
```

## Styling

All components use **CSS Modules**, allowing styles to remain scoped locally. Each component supports dynamic inline styles through CSS variables or style objects, giving maximum flexibility.

> **Tip:** You can override any style using the `style` prop or customize the default values using the component's props.

## Best Practices

- Keep your icon size relative using `size` scaling in `<IconButton />` rather than fixed `px`.
- For consistent design, use theme-based values via a central theme config (e.g., for colors or sizes).
- Always wrap `<Link />` in accessible text content even when used with icons or other visual elements.
- Use `<Tooltip />` to improve UX for icon-only buttons or ambiguous visuals.
