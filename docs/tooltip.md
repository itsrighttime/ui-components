## Tooltip – Smart Cursor-Following Tooltip

### **Purpose:**

A custom React tooltip component that follows the cursor and smartly adjusts its position to avoid overflowing the viewport. It supports custom text color and background color and is rendered via a portal directly into the DOM's `body`.

---

### **Features:**

- **Cursor Tracking:**
  Tooltip dynamically follows the cursor, updating its position on `mousemove`.

- **Smart Positioning:**
  Automatically places the tooltip _above_ or _below_ the cursor based on space availability in the viewport.

- **Portal Rendering:**
  Uses `ReactDOM.createPortal()` to render the tooltip outside of the normal component hierarchy, ensuring it is not clipped by parent containers.

- **Custom Styling Support:**
  You can customize `color` and `backgroundColor` via props.

- **Smooth Transitions:**
  Fade-in/out animation with opacity and visibility transitions.

- **Viewport Safety:**
  Tooltip prevents itself from rendering off-screen (left/right/top/bottom).

---

### **Props:**

| Prop              | Type        | Default     | Description                                     |
| ----------------- | ----------- | ----------- | ----------------------------------------------- |
| `children`        | `ReactNode` | —           | The element over which tooltip will appear.     |
| `content`         | `string`    | —           | The text/content to display inside the tooltip. |
| `color`           | `string`    | `"#272626"` | Text color of the tooltip.                      |
| `backgroundColor` | `string`    | `"#eceaea"` | Background color of the tooltip.                |
| `width`           | `string`    | `"250px"`   | Control the width of the tooltip.               |
| `delay`           | `string`    | `"1500"`    | Give a delay after hovering on that content.    |

---

### **Usage Example:**

```jsx
import { Tooltip } from "./Tooltip";

function App() {
  return (
    <div style={{ padding: 80 }}>
      <Tooltip content="Smart tooltip near your cursor!">
        <button>Hover me</button>
      </Tooltip>
    </div>
  );
}
```

You can also change the colors:

```jsx
<Tooltip content="Custom colors!" color="#fff" backgroundColor="#333">
  <span>Hover this text</span>
</Tooltip>
```

---

### **How It Works Under the Hood:**

- Uses `useRef` to track the tooltip DOM element.
- On mouse move, calculates cursor position and tooltip size.
- Adjusts tooltip's `top` and `left` styles so it stays within the window.
- Renders the tooltip directly into `document.body` using a portal.
- Fades in/out based on `visible` state from `onMouseEnter` and `onMouseLeave`.
