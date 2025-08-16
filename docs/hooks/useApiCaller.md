# `useAPICaller` Hook

A **React custom hook** to simplify making API calls and managing their state (loading, error, and data) in functional components. Designed to work with a centralized `apiCaller` function.

## Features:

- Supports **GET**, **POST**, and other HTTP methods.
- Automatic API calling on mount or when dependencies change.
- Returns **data**, **error**, and **loading** states.
- Provides `refetch()` and `reset()` methods.

```js
import { UIHooks } from "@itsrighttime/ui-components";
const { useAPICaller } = UIHooks;

```


## Usage Example:

```jsx

const MyComponent = () => {
  const { data, error, loading, refetch, reset } = useAPICaller({
    endpoint: "/api/products",
    method: "GET",
    headers: { Authorization: "Bearer token" },
    dependencies: [], // optional, specify state variables to auto-trigger fetch
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <button onClick={refetch}>Reload</button>
      <button onClick={reset}>Reset</button>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};
```

## Parameters:

| Parameter      | Type     | Default | Description                                       |
| -------------- | -------- | ------- | ------------------------------------------------- |
| `endpoint`     | `string` | `'/'`   | API endpoint path.                                |
| `method`       | `string` | `'GET'` | HTTP method (`GET`, `POST`, etc.).                |
| `body`         | `any`    | `null`  | Request body (for POST, PUT requests).            |
| `headers`      | `object` | `{}`    | Optional request headers.                         |
| `params`       | `object` | `{}`    | Query parameters as an object.                    |
| `dependencies` | `array`  | `[]`    | Dependency list to trigger refetch automatically. |

## Returns:

| Property  | Type       | Description                                                |
| --------- | ---------- | ---------------------------------------------------------- |
| `data`    | `any`      | API response data (null if error or pending).              |
| `error`   | `any`      | Error object if request failed, else null.                 |
| `loading` | `boolean`  | Indicates whether request is in progress.                  |
| `refetch` | `function` | Manually re-trigger API call.                              |
| `reset`   | `function` | Reset all states (`data`, `error`, `loading`) to defaults. |

## Notes:

- API is called automatically when:

  - The component mounts.
  - `endpoint`, `method`, `body`, `headers`, `params`, or any item in `dependencies` changes.

- For manual re-fetch, use the `refetch()` function.
- Use `reset()` to clear data and error states manually.

## Example Use Cases

### Example 1: Basic GET call

```js
const { data, loading, error } = useAPICaller({ endpoint: "/users" });
```

### Example 2: Auto-call with dynamic param

```js
const { data, refetch } = useAPICaller({
  endpoint: `/users/${userId}`,
  dependencies: [userId],
});
```

### Example 3: POST call on demand

```js
const { loading, refetch } = useAPICaller({
  endpoint: "/auth/login",
  method: "POST",
  body: { username, password },
  dependencies: [], // don't auto-call
});

// Call when form submits
const handleLogin = () => refetch();
```

### Example 4: Reset the state

```js
const { reset } = useAPICaller({
  endpoint: "/dashboard",
  dependencies: [],
});

// on component unmount or tab switch
useEffect(() => {
  return () => reset();
}, []);
```
