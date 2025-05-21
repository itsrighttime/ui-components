# Developer Guide: Using `Logger`

This guide explains how to use the `Logger` utility for structured, colored, and environment-configurable logging within your React (or frontend) application.

## Introduction

The `UIEssentials` provides:

- Uniform log structure
- Colored, formatted output
- Conditional logging based on allowed types (`error`, `warn`, etc.)
- Optional tracking codes for easier debugging
- Simple wrapper around your custom logger system (similar to `winston`)

## Importing

```js
import { UIEssentials } from "@itsrighttime/ui-components";

const { logger, getTrackingCode, codeTypes } = UIEssentials;
```

## Setup in `.env`

Set the log types you want to enable in development (comma-separated):

```env
# For Vite
VITE_LOG_TYPES=error,warn,info
```

Restart your dev server after modifying `.env`.

## Usage

### Logging Messages

Each log type (`info`, `warn`, `error`, `debug`, etc.) is available via the `logger` object.

```js
logger.info({
  message: "Component loaded",
  context: { component: "MainComponent", userId: 123 },
  code: "UI-101",
});
```

### Logging Errors

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

## Tracking Code

Optionally use `getTrackingCode(type, code)` to generate a formatted tracking code:

```js
const trackingCode = getTrackingCode(codeTypes.warn, "USR-003");
console.log(trackingCode); // ui-components-warn-USR-003
```

This helps identify where the log was triggered from and the type of the event.

## Allowed Log Types

Only logs included in `VITE_LOG_TYPES` will appear in the console. Others will be silently ignored.

Example:

```env
VITE_LOG_TYPES=error,warn
```

Above config will show only `error` and `warn` logs. All `info`, `debug`, etc., will be skipped.

> Note: error & warn are also default. If you do not specify the VITE_LOG_TYPES then these will show

## Log Format (in Console)

```
[ui-components - 14:32:21] info: Component loaded | Code: UI-101
|- Context: {
     "component": "MainComponent",
     "userId": 123
    }
```

Error logs include full stack trace automatically.

## Available Log Levels

Use constants from `codeTypes`:

```js
codeTypes.info; // "info"
codeTypes.warn; // "warn"
codeTypes.error; // "error"
codeTypes.verbose; // "verbose"
codeTypes.debug; // "debug"
codeTypes.silly; // "silly"
```

## Best Practices

- Always include a meaningful `message`.
- Use `code` for error traceability and monitoring.
- Use `context` to attach relevant variables for better debugging.
- Do not log sensitive data in production.

## Example

```js
logger.debug({
  message: "Search executed",
  context: { query: "home decor", userId: "U123" },
  code: "SRCH-004",
});
```

## Export Summary

```js
export const UIEssentials = {
  logger, // Logging methods (info, warn, error, etc.)
  codeTypes, // Standard log level keys
  getTrackingCode, // For generating codes like 'ui-components-info-UI-101'
};
```
