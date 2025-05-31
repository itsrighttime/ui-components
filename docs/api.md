# Developer Guide: `apiCaller` & `useAPI`

## `apiCaller`: Low-Level API Utility

Use this **outside React components** or in event-driven code like service files, Redux actions, or button click handlers.

## Importing

```js
import { UIEssentials } from "@itsrighttime/ui-components";

const { apiCaller, useAPI } = UIEssentials;
```

## Setup in `.env`

Set the log types you want to enable in development (comma-separated):

```js
# For Vite
VITE_LOG_TYPES=error,warn,info
// VITE_APP_SERVER_API_PROXY="http://localhost:4999" // TODO: In updated version will remove from here 
VITE_PRINT_API_RESULT=true
```

### Usage

```js

const handleCreateUser = async () => {
  try {
    const result = await apiCaller({
      endpoint: "http://localhost:4999/users/create",
      method: "POST",
      body: { name: "Danishan", role: "admin" },
      headers: { "Content-Type": "application/json" },
    });
    console.log("Success:", result);
  } catch (error) {
    console.error("API Error:", error);
  }
};
```

### Parameters

| Param    | Type     | Default | Description             |
| -------- | -------- | ------- | ----------------------- |
| endpoint | `string` | `"/"`   | Relative endpoint       |
| method   | `string` | `"GET"` | HTTP method             |
| body     | `object` | `null`  | Request payload         |
| headers  | `object` | `{}`    | Optional custom headers |
| params   | `object` | `{}`    | URL query params        |
| timeout  | `number` | `10000` | Request timeout (ms)    |

### Features

- Logs requests (`debug`), responses (`info`), and errors (`error`) via `UtilsLogger`.
- Automatically throws Axios response data or a fallback.
- Works with `VITE_APP_SERVER_API_PROXY` and prints result if `VITE_PRINT_API_RESULT` is `"true"`.



## `useAPI`: React Hook for Auto-Fetching

Use this **inside React components** where data should be loaded and updated based on props, filters, or user selections.

### Usage

```jsx

const UserList = ({ activeTab }) => {
  const { data, loading, error } = useAPI({
    endpoint: "http://localhost:4999/users",
    params: { role: "admin" },
    activeTab, // refetches when this changes
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message || "Something went wrong"}</p>;

  return (
    <ul>
      {data?.map((user) => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
};
```

### Parameters

| Param     | Type     | Default | Description                     |
| --------- | -------- | ------- | ------------------------------- |
| endpoint  | `string` | `"/"`   | API endpoint path               |
| method    | `string` | `"GET"` | HTTP method                     |
| body      | `object` | `null`  | Request body for POST/PUT       |
| headers   | `object` | `{}`    | Custom headers                  |
| params    | `object` | `{}`    | Query parameters                |
| activeTab | `any`    | `null`  | Refetch when this value changes |

### Notes

- Only `endpoint` and `activeTab` are dependencies. This avoids infinite re-renders.
- `loading`, `error`, and `data` states are built-in and component-safe.
- Includes internal `isMounted` flag to prevent setting state on unmounted components.
- `apiCaller` handles all internal logging — no need to log manually in your component.

## Logger Output Sample

```js
logger.debug({
  message: `API Call → GET http://localhost:4999/users`,
  context: { method: "GET", params: { role: "admin" } },
  code: "00002",
});

logger.info({
  message: `API Success → GET http://localhost:4999/users`,
  context: { status: 200 },
  code: "00003",
});

logger.error({
  message: `API Error → GET http://localhost:4999/users`,
  context: { params: { role: "admin" } },
  code: "00004",
  error,
});
```

## Best Practices Summary

| Scenario                                 | Use         |
| ---------------------------------------- | ----------- |
| Button click or form submit              | `apiCaller` |
| Auto-load data on mount or tab/filter    | `useAPI`    |
| Outside React (e.g., services, CLI, SSR) | `apiCaller` |
| Internal component data fetch            | `useAPI`    |
