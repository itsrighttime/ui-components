# Dynamic Context – Developer Usage Guide

## Overview

`DynamicContext` is a lightweight, client-side state management utility built using React Context.
It provides a **dynamic key–value store** that can be accessed and modified anywhere within the provider tree.

This solution is intentionally simple and is designed to cover **non-persistent, UI-centric, and feature-scoped state** without introducing heavier global state libraries.

---

## Why This Exists

In large Next.js / React applications, not all state belongs in:

* URL params
* Redux / Zustand / Jotai
* Server state (React Query / SWR)

`DynamicContext` is ideal when you need:

* Temporary cross-component communication
* Feature-level shared state
* Runtime flags and UI signals
* Decoupled coordination between components

---

## Key Characteristics

* Client-only (`"use client"`)
* Dynamic (keys are not predefined)
* Non-persistent (resets on refresh)
* Minimal API surface
* Zero external dependencies

---

## Architecture

```
DynamicProvider
 ├─ state (Object)
 ├─ setValue(key, value)
 ├─ getValue(key)
 ├─ removeValue(key)
 └─ resetContext()
```

Internally, the context maintains a single object:

```ts
{
  [key: string]: any
}
```

---

## Installation / Setup

### 1. Place the Provider

Wrap the part of your app that needs access to the dynamic context.

**Example (Next.js App Router):**

```tsx
// app/layout.tsx
import { DynamicProvider } from "@/context/DynamicContext";

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <DynamicProvider>
          {children}
        </DynamicProvider>
      </body>
    </html>
  );
}
```

You may also scope it to a **route-level layout** or **feature layout** if global access is not required.

---

## API Reference

### `useDynamicContent()`

Custom hook for interacting with the context.

```ts
const {
  state,
  setValue,
  getValue,
  removeValue,
  resetContext
} = useDynamicContent();
```

---

### `state`

Complete internal store.

```ts
state: Record<string, any>
```

Use sparingly. Prefer `getValue()` for reads to avoid tight coupling.

---

### `setValue(key, value)`

Adds or updates a value.

```ts
setValue("activeModal", "login");
setValue("featureFlag:betaUI", true);
```

* Overwrites existing values
* Keys are case-sensitive
* Values can be any serializable type

---

### `getValue(key)`

Retrieves a stored value.

```ts
const modal = getValue("activeModal");
```

Returns:

* Stored value if present
* `null` if key does not exist

---

### `removeValue(key)`

Deletes a key-value pair.

```ts
removeValue("activeModal");
```

Useful when cleaning up state after feature unmounts.

---

### `resetContext()`

Clears **all** stored values.

```ts
resetContext();
```

Recommended during:

* Logout flows
* Org / workspace switching
* Hard UI resets

---

## Common Usage Patterns

### 1. Modal Coordination

```ts
setValue("activeModal", "login");

// Anywhere else
if (getValue("activeModal") === "login") {
  // render modal
}
```

---

### 2. Feature Flags (Runtime)

```ts
setValue("features:newDashboard", true);

const enabled = getValue("features:newDashboard");
```

---

### 3. Cross-Component Communication

Component A:

```ts
setValue("scrollToSection", "pricing");
```

Component B:

```ts
useEffect(() => {
  const section = getValue("scrollToSection");
  if (section) scroll(section);
}, []);
```

---

### 4. Temporary UI State

```ts
setValue("banner:dismissed", true);
```

---

## Best Practices

### Naming Conventions

Use **namespaced keys** to avoid collisions:

```
modal:login
feature:betaUI
ui:bannerDismissed
route:previousPath
```

---

### Scope the Provider Intentionally

* Global provider → app-wide coordination
* Route-level provider → isolated feature state
* Nested provider → override behavior cleanly

---

### What NOT to Use It For

Do **not** use `DynamicContext` for:

* Authentication state
* Server-fetched data
* Long-lived or persistent data
* Complex derived state
* Performance-critical high-frequency updates

Use dedicated tools for those cases.

---

## Comparison

| Use Case             | Recommended       |
| -------------------- | ----------------- |
| Temporary UI flags   | DynamicContext    |
| Global auth state    | Auth provider     |
| Server data          | React Query / SWR |
| Complex shared logic | Zustand / Redux   |
| URL-driven state     | Router params     |

---

## Extensibility Ideas

If needed, this context can be extended with:

* Type-safe keys (TypeScript generics)
* Scoped reset (by namespace)
* Persistence layer (localStorage/sessionStorage)
* Debug logging in development
* Middleware-like hooks

---

## Summary

`DynamicContext` is a **pragmatic utility**, not a state management framework.

Use it when you need:

* Speed
* Flexibility
* Minimal overhead
* Clean cross-component communication

Keep it simple, scoped, and intentional.

