## Feature: `useSmartNavigate` Hook

The `useSmartNavigate` hook is a **smart navigation utility** that automatically detects whether a URL is **internal** (within the app) or **external** (absolute link).
It handles both navigation types seamlessly and supports **Ctrl / Cmd + Click** or **Middle-Click** to open in a new tab — just like a browser link.

### Key Features

- **Automatic URL detection** — no need to specify internal or external.
- **Ctrl / Cmd + Click** and **Middle-Click** support for opening new tabs.
- **Unified handler** for internal and external navigation.
- **No reloads** for internal routes using React Router.
- **Null-safe and lightweight**, with no runtime dependencies.

## Developer Guide

### **Import the Hook**

```js
import { UIHooks } from "@itsrighttime/ui-components";
const { useSmartNavigate } = UIHooks;
```

### **Hook Signature**

```ts
const handleNavigate = useSmartNavigate();
```

#### **Parameters**

| Name    | Type         | Description                                   |
| ------- | ------------ | --------------------------------------------- |
| `event` | `MouseEvent` | The click event used to detect modifier keys. |
| `to`    | `string`     | The URL or route path to navigate to.         |

#### **Returns**

| Name             | Type                                      | Description                                        |
| ---------------- | ----------------------------------------- | -------------------------------------------------- |
| `handleNavigate` | `(event: MouseEvent, to: string) => void` | Function to handle smart navigation automatically. |

### **Usage Examples**

#### Navigate to Internal Route

```jsx
<Button onClick={(e) => handleNavigate(e, "/dashboard")}>
  Go to Dashboard
</Button>
```

#### Navigate to External URL

```jsx
<Button onClick={(e) => handleNavigate(e, "https://example.com")}>
  Visit Example.com
</Button>
```

#### Open in New Tab (Ctrl / Cmd / Middle-Click)

```jsx
<Button onClick={(e) => handleNavigate(e, "/reports")}>Reports</Button>
```

> **Note:** Automatically opens in a new tab if the user holds **Ctrl** (Windows/Linux), **Cmd** (Mac), or uses **Middle-click**.

## Behavior Matrix

| Action Type        | URL Type                 | Behavior                             |
| ------------------ | ------------------------ | ------------------------------------ |
| Left Click         | Internal (`/route`)      | Navigates via React Router           |
| Ctrl / Cmd + Click | Internal                 | Opens route in a new tab             |
| Middle Click       | Internal                 | Opens route in a new tab             |
| Left Click         | External (`https://...`) | Redirects via `window.location.href` |
| Ctrl / Cmd + Click | External                 | Opens link in a new tab              |
| Middle Click       | External                 | Opens link in a new tab              |

## Best Practices

- Always call with the **event** → `onClick={(e) => handleNavigate(e, url)}`.
- No need to pass `isExternal`; the hook auto-detects via the URL scheme.
- Keep internal routes relative (e.g., `/dashboard`) and external as absolute (e.g., `https://...`).
- Use this hook in all navigation elements to keep consistent link behavior across your app.

## Sample Integration

```jsx
import { UIHooks } from "@itsrighttime/ui-components";
const { useSmartNavigate } = UIHooks;

export const NavigationButtons = () => {
  const handleNavigate = useSmartNavigate();

  return (
    <>
      <Button onClick={(e) => handleNavigate(e, "/settings")}>Settings</Button>
      <Button onClick={(e) => handleNavigate(e, "https://github.com")}>
        GitHub
      </Button>
    </>
  );
};
```

Would you like me to include a short **TypeScript definition block (`.d.ts`)** for this version too, so it’s ready for library packaging?
