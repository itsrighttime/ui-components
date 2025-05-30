## Layout

- [`FlexContainer`](./container.md#flexcontainer)
- [`GridContainer`](./container.md#gridcontainer)
- [`Workspace`](./layout.md#workspace-component--usage-guide)

## Workspace Component – Usage Guide

### Features:

- **Nested Routing Support** via `react-router-dom`.
- **Context Providers Injection** using `CombinedProviders`.
- **Fullscreen Control** through `FullscreenWrapper`.
- **Dynamic Workspace Home Page** for selecting between multiple apps.
- **Integrated Auth Route** (`/login`).
- **Wildcard Error Fallback** using `ErrorPage`.

### Props:

| Prop              | Type       | Default         | Description                                                        |
| ----------------- | ---------- | --------------- | ------------------------------------------------------------------ |
| `tabClickHandler` | `Function` | **Required**    | Handles tab click events in your workspace UI.                     |
| `workspace`       | `string`   | `"letsDiscuss"` | The active workspace app (used in layout, home page, and context). |

---

### Routes Handled:

1. `workspace/:workspaceId/:level/:zone/:position/:tabKey`
   → Renders `WorkspaceLayoutWrapper` with dynamic params and fullscreen toggle.

2. `/workspace` (index)
   → Renders `WorkspaceHomePage` with app list and fullscreen toggle.

3. `/workspace/login`
   → Renders `LoginForm` for authentication.

4. All other unmatched paths (`*`)
   → Fallback to `ErrorPage`.

---

### Example Usage:

```jsx
import { Workspace } from "./components/Workspace";

function App() {
  const handleTabClick = (tabKey) => {
    console.log("Tab clicked:", tabKey);
  };

  return (
    <Workspace tabClickHandler={handleTabClick} workspace="letsGrowTogether" />
  );
}
```
