## Feature: `useQueryParams` Hook

The `useQueryParams` hook is a **powerful and reusable utility** built on React Router, designed to simplify **reading, updating, and managing** query parameters in a React-friendly, declarative way.

---

### Key Features

- **Read** query parameters easily with `getParam`
- **Check** if a parameter exists with `hasParam`
- **Set/Update** parameters without reloading using `setParam`
- **Delete** specific parameters with `deleteParam`
- **Replace** all query parameters in one go using `replaceParams`
- **Toggle** boolean-style values (`"true"` ↔ `"false"`)
- **Append** to comma-separated parameters (e.g., for filters)
- **Clear** all query parameters from the URL
- **Support navigation options** like `{ replace: false }`
- URL updates automatically without page reload or back-button issues

---

## Developer Guide

### **Import the Hook**

```js
import { UIHooks } from "@itsrighttime/ui-components";
const { useQueryParams } = UIHooks;
```

---

### **Use Inside a Component**

```jsx
const {
  getParam,
  hasParam,
  setParam,
  deleteParam,
  replaceParams,
  toggleParam,
  appendParam,
  clearAllParams,
} = useQueryParams({ navigate, location });
```

---

### **Common Use Cases**

#### Get a Query Param

```js
const mode = getParam("mode"); // "client" or "developer"
```

#### Check if a Param Exists

```js
if (hasParam("sort")) {
  // do something
}
```

#### Set or Update a Param

```js
setParam("view", "grid");
```

#### Delete a Param

```js
deleteParam("search");
```

#### Replace All Params

```js
replaceParams({ view: "list", sort: "desc" });
```

#### Toggle Boolean Param

```js
toggleParam("debug"); // true ↔ false
```

#### Append to Comma-Separated List

```js
appendParam("tags", "design"); // tags=ui,ux,design
```

#### Clear All Parameters

```js
clearAllParams(); // resets URL to base path
```

---

## Best Practices

- Use `setParam` for granular updates.
- Use `replaceParams` when resetting the full URL state (e.g., on new searches).
- Use `appendParam` for multi-select filters or tags.
- Use `toggleParam` for boolean flags like `debug`, `preview`, etc.
- Use `hasParam` before relying on `getParam` in conditional flows.

---

## Sample Integration

```jsx
<Button
  text="Activate Client Mode"
  onClick={() => setParam("mode", "client")}
/>

<Button
  text="Toggle Debug"
  onClick={() => toggleParam("debug")}
/>

<Button
  text="Reset Filters"
  onClick={() => clearAllParams()}
/>
```
