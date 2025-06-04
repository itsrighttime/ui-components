## Feature: `useQueryParams` Hook

The `useQueryParams` hook is a lightweight utility built on top of React Router that enables developers to easily **get, set, update, and manage** URL query parameters in a declarative, React-friendly way.

### Key Features

- **Read** query parameters easily (`getParam`)
- **Set or update** query parameters without reloading the page (`setParam`)
- **Delete** specific query parameters (`deleteParam`)
- **Replace** all query parameters at once (`replaceParams`)
- **Toggle** boolean-style query values (`toggleParam`)
- **Append** values to a comma-separated list (`appendParam`)
- **Clear** all query parameters (`clearAllParams`)
- Automatically updates the URL while maintaining current page state
- Replaces history state (no page reload or back-button pollution)

## Developer Guide

### 1. **Import the Hook**

```js
import { UIHooks } from "@itsrighttime/ui-components";
const { useQueryParams } = UIHooks;
```

### **Use Inside a Component**

```jsx
const {
  getParam,
  setParam,
  deleteParam,
  replaceParams,
  toggleParam,
  appendParam,
  clearAllParams,
} = useQueryParams();
```

---

### 3. **Common Use Cases**

#### Read a parameter

```js
const mode = getParam("mode"); // "client" or "developer"
```

#### Set or update a parameter

```js
setParam("view", "grid");
```

#### Delete a parameter

```js
deleteParam("search");
```

#### Replace all parameters

```js
replaceParams({ view: "list", sort: "desc" });
```

#### Toggle a boolean parameter

```js
toggleParam("debug"); // true -> false or false -> true
```

#### Append to comma-separated value

```js
appendParam("tags", "design"); // tags=design,ux,ui...
```

#### Clear everything

```js
clearAllParams(); // resets URL to base path
```

## Best Practices

- Use `setParam` when adding or updating individual parameters.
- Use `replaceParams` when you want a fresh state (e.g., on search submit).
- Use `toggleParam` to manage query-driven UI toggles (like dark mode, debug, fullscreen).
- Avoid using this in server-rendered logic unless the route is fully client-side.

## Bonus: Sample Integration

```jsx
<Button
  text="Client Mode"
  onClick={() => setParam("mode", "client")}
/>

<Button
  text="Toggle Debug Mode"
  onClick={() => toggleParam("debug")}
/>
```
