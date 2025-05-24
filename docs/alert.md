# `Alert` System – Integration Guide for Component Developers

This guide is meant for developers working inside a shared codebase or design system who want to **integrate alert functionality into components**. It covers how to **trigger alerts**, **customize them**, and **maintain clean UX** across your feature modules.

## Purpose

The `Alert` system allows **non-intrusive notifications** within your components for:

- Success messages (e.g., "Saved successfully")
- Error handling (e.g., "Failed to fetch data")
- Info messages (e.g., "Changes will apply next time")

## What’s Available

| Export           | Description                               |
| ---------------- | ----------------------------------------- |
| `useAlerts()`    | Custom hook to manage alerts (add/remove) |
| `AlertContainer` | Component that renders current alerts     |
| `Alert`          | Internal component used by the container  |

You only need to **use `useAlerts` and `AlertContainer`** in your feature component. `Alert` is auto-managed.

## Step-by-Step Usage

### 1. Importing

```js
import { UIAlert } from "@itsrighttime/ui-components";

const { Alert, AlertContainer, useAlerts } = UIAlert;
```

### 2. Set Up Alerts in Your Component

```jsx
const MyComponent = () => {
  const { alertContainer, addAlert, removeAlert } = useAlerts();

  const handleSave = () => {
    // Your save logic here...

    // Then show an alert
    addAlert("Data saved successfully", "success");
  };

  return (
    <>
      <button onClick={handleSave}>Save</button>

      {/* Attach this once at the bottom of your component layout */}
      <AlertContainer
        alertContainer={alertContainer}
        removeAlert={removeAlert}
      />
    </>
  );
};
```

## `addAlert()` Signature

```js
addAlert(message: string, type: "success" | "error" | "info")
```

- `message`: Required string (what the user sees).
- `type`: Controls visual styling (border + status bar).

**Best practice**: keep messages short and actionable.

## Dismissal

- **Manual Dismiss:** Every alert includes a cross icon for manual dismissal.
- **Auto Dismiss:** Alerts auto-dismiss in 10 seconds, with a countdown bar at the bottom.

You **don’t need to handle this yourself** — it's baked in via `Alert.jsx`.

## Alert Behavior

| Feature       | Behavior                                                         |
| ------------- | ---------------------------------------------------------------- |
| Position      | Alerts appear top-right, stacked vertically                      |
| Transition    | Fade-out effect on removal (manual or auto)                      |
| Styling       | Controlled via `Alert.module.css`, type-specific styles included |
| Countdown Bar | Width shrinks based on time left                                 |

## When to Use Alerts

| Use Case                          | Alert Type                    |
| --------------------------------- | ----------------------------- |
| Save successful                   | `success`                     |
| Failed to fetch data              | `error`                       |
| Temporary info like "Coming Soon" | `info`                        |
| Form field validation?            | No, Use inline errors instead |

## Design System Guidelines

As a component developer:

- **Do**: Use `addAlert()` inside handlers after logic completes (e.g., API response).
- **Don’t**: Trigger alerts inside rendering logic or loops.
- **Customize**: Use consistent alert types to match UX expectations.
- **Clean Up**: The system handles timer cleanup automatically.

## Tips for Consistent Integration

- Place `<AlertContainer />` **once per page or layout**, preferably near the root of your component tree.
- Avoid duplicate alerts for the same message; de-dupe if necessary.
- If you want to add different durations or custom transitions, the base `Alert` supports internal logic and can be extended.

## Final Words

The alert system is simple, lightweight, and built for **component-level integration without any global state management required**. It's an excellent way to inform users of actions or status updates without disrupting workflow.
