
# **Developer Guide: Using `Logger` (Updated for Library Mode)**

This guide explains how to use the `Logger` system inside your application when using the
`@itsrighttime/ui-components` npm library.

The logger now supports:

* Uniform, structured console logging
* Colored logs
* Environment-based filtering (configured in the *consumer project*)
* Tracking code generation
* Zero runtime errors (safe in all bundlers: Vite, Webpack, Next.js, CRA, etc.)

---

# **1. Importing**

```js
import { UIUtils } from "@itsrighttime/ui-components";

const { logger, getTrackingCode, codeTypes, setAllowedTypes } = UIUtils;
```

---

# **2. Configuring Allowed Log Types (IMPORTANT)**

Since this is now a reusable library, environment variables are **taken from your project**,
**NOT from inside the library**.

### **In your app (e.g., Vite, React app, Next.js, etc.):**

```js

setAllowedTypes(
  import.meta.env.VITE_LOG_TYPES?.split(",") || [codeTypes.error, codeTypes.warn, codeTypes.info]
);
```

### Example `.env`

```env
VITE_LOG_TYPES=error,warn,info
```

✔ You fully control which logs are visible
✔ Library does **not** depend on unstable `import.meta.env`
✔ No crashes when bundled

---

# **3. Logging Messages**

Each level (`info`, `warn`, `debug`, `error`, etc.) is available via `logger`.

```js
logger.info({
  message: "Component loaded",
  context: { component: "MainComponent", userId: 123 },
  code: "UI-101",
});
```

---

# **4. Logging Errors**

```js
try {
  throw new Error("Something went wrong!");
} catch (err) {
  logger.error({
    message: "Failed to fetch user data",
    error: err,
    context: { userId: 123 },
    code: "API-ERR-504",
  });
}
```

---

# **5. Tracking Code**

Tracking codes help uniquely identify log sources.

```js
const trackingCode = getTrackingCode(codeTypes.warn, "USR-003");
console.log(trackingCode); 
// Output: ui-components-warn-USR-003
```

---

# **6. Allowed Log Types Logic**

Only log levels included inside `setAllowedTypes()` will print.

Example:

```env
VITE_LOG_TYPES=error,warn
```

Result:

* `error`, `warn` → **visible**
* `info`, `debug`, `verbose`, `silly` → **ignored**

### Default (if not set):

```js
["error", "warn"]
```

---

# **7. Example Log Output**

```
[ui-components - 14:32:21] info: Component loaded | Code: UI-101
|- Context: {
     "component": "MainComponent",
     "userId": 123
  }
```

---

# **8. Available Log Levels**

```js
codeTypes.info     // "info"
codeTypes.warn     // "warn"
codeTypes.error    // "error"
codeTypes.verbose  // "verbose"
codeTypes.debug    // "debug"
codeTypes.silly    // "silly"
```

---

# **9. Best Practices**

* Always provide meaningful `message`
* Use `code` for tracking and debugging
* Include `context` to make debugging easier
* Do **not** log sensitive data in production
* Configure logs per-environment for performance

---

# **10. Complete Example**

```js

// Initialize logging rules from ENV
setAllowedTypes(
  import.meta.env.VITE_LOG_TYPES?.split(",") || [codeTypes.error, codeTypes.warn, codeTypes.info]
);

const { logger } = UtilsLogger;

logger.debug({
  message: "Search executed",
  context: { query: "home decor", userId: "U123" },
  code: "SRCH-004",
});
```

---

# **11. Export Summary**

```js
export const UtilsLogger = {
  logger,         // Log methods: info, warn, debug, error, etc.
  codeTypes,      // Standard log levels
  getTrackingCode,// Generate codes like ui-components-info-UI-101
  setAllowedTypes // Configure allowed log types (from consumer app)
};
```
