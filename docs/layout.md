## Layout

- [`FlexContainer`](./container.md#flexcontainer)
- [`GridContainer`](./container.md#gridcontainer)
- [`Workspace`](./layout.md#workspace-component--usage-guide)
- [`Header`](./layout.md#header-component--usage-guide)

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

## Header Component – Usage Guide

The `Header` component is a responsive, reusable navigation header for any project.

### Features:

- **Responsive Navigation** with mobile hamburger toggle.
- **Dynamic Tab Highlighting** based on current URL.
- **Login/Register Redirect** with return URL support.
- **Automatic Document Title Updates**.
- **Customizable Logo and Breakpoint Support**.

### Props:

| Prop                   | Type     | Default                       | Description                                                          |
| ---------------------- | -------- | ----------------------------- | -------------------------------------------------------------------- |
| `tabs`                 | `Array`  | `[]`                          | Array of tab objects: `{ name: string, goTo: string }`.              |
| `logoURL`              | `string` | `""`                          | Path or URL of the logo image.                                       |
| `defaultTab`           | `object` | `{ name: "Home", goTo: "/" }` | Tab considered active on root path (`/`).                            |
| `breakpoint`           | `number` | `800`                         | Width (in px) below which mobile nav toggle is activated.            |
| `loginRegisterTabName` | `string` | `"login/register"`            | Name of the login tab (matched via `resolveStringToId`).             |
| `loginRegisterURL`     | `string` | `"/login"`                    | Redirect path for login/register tabs with `?redirectBack=` support. |
| `color`                | `string` | `"var(colorRed)"`             | Tochange the header button color                                     |

---

### Example Usage:

```jsx
import { Header } from "./components/Header";

const tabs = [
  { name: "Home", goTo: "/" },
  { name: "About", goTo: "about" },
  { name: "Contact", goTo: "contact" },
  { name: "Login/Register", goTo: "login" },
];

function AppHeader() {
  return (
    <Header
      tabs={tabs}
      logoURL="/assets/logo.svg"
      defaultTab={{ name: "Home", goTo: "/" }}
      loginRegisterURL="/login"
    />
  );
}
```
