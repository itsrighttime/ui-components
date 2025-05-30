## Custom React Hooks – Features & Usage Guide

- [`useAlerts`](#6-usealerts--manage-alert-queue) [`2`](./alert.md)
- [`useAPICaller`](#7-useapicaller--easy-api-requests-with-lifecycle-management) [`2`](./api.md#useapi-react-hook-for-auto-fetching) [`3`](./hooks/useApiCaller.md)
- [`useSmartPosition`](#8-usesmartposition--dynamic-popuptooltip-positioning) [`2`](./hooks/useSmartPosition.md)
- [`useInfiniteScroll`](#9-useinfinitescroll--paginated-scroll-window-with-smart-restore)
- [`useLazyLoad`](#1-uselazyloadref)
- [`useMediaQuery`](#2-usemediaquerybreakpoint)
- [`useOutsideClick`](#3-useoutsideclickref-handler)
- [`useUserActiveOnTab`](#4-useuseractiveontabtimeoutinminutes)
- [`useUserPresentOnTab`](#5-useuserpresentontab-onfocus-onblur-)

### 1. **`useLazyLoad(ref)`**

#### **Features**

- Detects when an element enters the viewport.
- Ideal for lazy-loading images, animations, or components.
- Uses `IntersectionObserver` for performance.

#### **Returns**

- `boolean` — `true` when the element is visible in the viewport.

#### **Example Usage**

```js
const ref = useRef();
const isVisible = useLazyLoad(ref);

return <div ref={ref}>{isVisible && <MyHeavyComponent />}</div>;
```

---

### 2. **`useMediaQuery(breakpoint)`**

#### **Features**

- Monitors screen width for responsiveness.
- Recalculates on window resize.
- Useful for conditionally rendering components for mobile/tablet/desktop.

#### **Returns**

- `boolean` — `true` if `window.innerWidth <= breakpoint`.

#### **Example Usage**

```js
const isMobile = useMediaQuery(768);

return isMobile ? <MobileNav /> : <DesktopNav />;
```

---

### 3. **`useOutsideClick(ref, handler)`**

#### **Features**

- Detects clicks outside a referenced element.
- Commonly used for closing modals, dropdowns, or sidebars.

#### **Example Usage**

```js
const ref = useRef();

useOutsideClick(ref, () => {
  setOpen(false);
});

return open && <div ref={ref}>This is a modal</div>;
```

---

### 4. **`useUserActiveOnTab(timeoutInMinutes)`**

#### **Features**

- Tracks if user is active on the current tab.
- Detects interactions like mouse move, scroll, key press, etc.
- Auto-flags user as inactive after timeout.

#### **Returns**

- `boolean` — `true` if user is active, `false` if idle.

#### **Example Usage**

```js
const isActive = useUserActiveOnTab(3); // Timeout after 3 mins

useEffect(() => {
  if (!isActive) {
    alert("You've been inactive.");
  }
}, [isActive]);
```

---

### 5. **`useUserPresentOnTab({ onFocus, onBlur })`**

#### **Features**

- Detects when the user switches tabs or applications.
- Can differentiate between:

  - `TAB_HIDDEN`, `TAB_VISIBLE`
  - `WINDOW_BLUR`, `WINDOW_FOCUS`

- Useful for analytics, autosave, session handling.

---

### 6. `useAlerts` – Manage Alert Queue

**Purpose:**
Manages a queue of alert messages (such as success, error, or info) and provides methods to add or remove them.

**Features:**

- Maintains a list (`alertContainer`) of alerts.
- Allows addition of new alerts with a unique ID, message, and type.
- Supports removal of specific alerts by ID.
- Ideal for toast-like alert systems.

**Usage Example:**

```jsx
const { alertContainer, addAlert, removeAlert } = useAlerts();

// Add an alert
addAlert("Something went wrong!", "error");

// Render alerts
{
  alertContainer.map((alert) => (
    <Alert
      key={alert.id}
      type={alert.type}
      onClose={() => removeAlert(alert.id)}
    >
      {alert.message}
    </Alert>
  ));
}
```

---

### 7. `useAPICaller` – Easy API Requests with Lifecycle Management

**Purpose:**
Simplifies API calls with loading, error, and response state, plus built-in dependency-based auto-fetching.

**Features:**

- Customizable endpoint, method, headers, body, and params.
- Automatically re-fetches when dependencies change.
- Exposes `data`, `loading`, `error`, `refetch()`, and `reset()`.

**Usage Example:**

```jsx
const { data, loading, error, refetch, reset } = useAPICaller({
  endpoint: "/api/users",
  method: "GET",
  dependencies: [],
});

if (loading) return <Spinner />;
if (error) return <ErrorMessage msg={error.message} />;
return <UserList users={data} />;
```

---

### 8. `useSmartPosition` – Dynamic Popup/Tooltip Positioning

**Purpose:**
Dynamically calculates optimal position (top/bottom, left/right) based on available space in the viewport.

**Features:**

- Detects whether there's more space above/below and left/right of an element.
- Automatically adjusts positioning on window resize.
- Useful for dropdowns, modals, and tooltips.

**Usage Example:**

```jsx
const ref = useRef();
const { vertical, horizontal } = useSmartPosition(ref);

<Tooltip ref={ref} position={`${vertical}-${horizontal}`}>
  I auto-position smartly!
</Tooltip>;
```

---

### 9. `useInfiniteScroll` – Paginated Scroll Window with Smart Restore

**Purpose:**
Implements memory-efficient infinite scrolling for long lists by loading more data as needed and limiting what stays visible.

**Features:**

- Shows initial chunk of data and appends more as user scrolls down.
- Keeps visible list within a defined size (`maxItems`).
- Restores previously removed items when scrolling back up.
- Uses throttling to ensure smooth scroll experience.
- Compatible with any scrollable container using `scrollContainerRef`.

**Usage Example:**

```jsx
const scrollRef = useRef();
const { visibleData } = useInfiniteScroll({
  data: allItems,
  initialChunk: 10,
  chunkSize: 10,
  maxItems: 50,
  scrollContainerRef: scrollRef,
});

return (
  <div ref={scrollRef} style={{ height: 300, overflowY: "auto" }}>
    {visibleData.map((item) => (
      <Item key={item.id} {...item} />
    ))}
  </div>
);
```
