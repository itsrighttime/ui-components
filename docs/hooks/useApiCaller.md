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
