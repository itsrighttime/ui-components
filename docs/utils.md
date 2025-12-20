## Utility Functions – Features & Usage Guide

## [Utilities]

- [`apiCaller`](./api.md)
- [`logger` (with `codeTypes` and `getTrackingCode`)](./logger.md)
- [`toKebabCase`](#tokebabcasestr)
- [`fromKebabCase`](#fromkebabcasestr-format)
- [`getColorCode`](#getcolorcodecolorname)
- [`delay`](#delayms)
- [`redirectURL`](#redirecturltarget)
- [`redirectUrlWithBack`](#redirecttourlwithback-to-from-)
- [`getRedirectBackUrl`](#getredirectbackurlurl)
- [`setDocumentTitle`](#setdocumenttitletitle)
- [`setFavicon`](#setfaviconlogoname-extension--png)

### 1. **String Conversion Utilities**

Reusable utility functions to convert between different naming formats like camelCase, kebab-case, snake_case, PascalCase, and more.

---

### `toKebabCase(str)`

**Purpose:**
Converts any string from `camelCase`, `PascalCase`, `snake_case`, or `Sentence Case` to `kebab-case`.

**Behavior:**

- Converts camel or Pascal case to kebab
- Replaces spaces and underscores with hyphens
- Outputs lowercase only

**Example:**

```js
toKebabCase("myComponentName"); // "my-component-name"
toKebabCase("My_Component Name"); // "my-component-name"
```

---

### `fromKebabCase(str, format)`

**Purpose:**
Converts a `kebab-case` string into another format like camelCase, PascalCase, snake_case, or Sentence Case.

**Available Formats:**

- `"camel"` → camelCase
- `"pascal"` → PascalCase
- `"snake"` → snake_case
- `"snake-upper"` → SNAKE_CASE
- `"sentence"` → Sentence case
- `"capitalized"` → Capital First Letter Of Each Word
- _Defaults to returning original string if format is unrecognized_

**Example:**

```js
fromKebabCase("my-component-name", "camel"); // "myComponentName"
fromKebabCase("my-component-name", "pascal"); // "MyComponentName"
fromKebabCase("my-component-name", "snake"); // "my_component_name"
fromKebabCase("my-component-name", "snake-upper"); // "MY_COMPONENT_NAME"
fromKebabCase("my-component-name", "sentence"); // "My component name"
fromKebabCase("my-component-name", "capitalized"); // "My Component Name"
```

---

### ✅ Use Case Scenarios

- Converting filenames to component names
- Dynamic key formatting for APIs
- Uniform variable naming
- Display formatting in UI

Would you like to generate a complete helper module file or integrate this into your UI library?

### 2. **Color Utilities**

#### `getColorCode(colorName)`

**Purpose:**
Fetches the corresponding color code from a predefined `COLOR` object. Defaults to cyan if the name is not found.

**Example Usage:**

```js
getColorCode("blue"); // Returns COLOR.blue
getColorCode("unknown"); // Returns COLOR.cyan
```

#### `BRAND_COLORS`

```js
export const BRAND_COLORS = {
  BLUE: "#00b0f0",
  DARK_BLUE: "#5b9bd5",
  YELLOW: "#dbac2b",
  RED: "#ff5969",
  CYAN: "#52c9bd",
  GREEN: "#92d050",
  SKY_BLUE: "#05e1e7",
  GRAY1: "#f7f7f7",
  GRAY2: "#f2f2f2",
  GRAY3: "#d9d9d9",
  GRAY4: "#bbb9b9",
  GRAY5: "#7f7f7f",
  GRAY6: "#404040",
  WHITE: "#fff",

  V_BLUE: "var(--colorBlue)",
  V_DARK_BLUE: "var(--colorDarkBlue)",
  V_YELLOW: "var(--colorYellow)",
  V_RED: "var(--colorRed)",
  V_CYAN: "var(--colorCyan)",
  V_GREEN: "var(--colorGreen)",
  V_SKY_BLUE: "var(--colorSkyBlue)",
};
```

---

### 3. **Async Utility**

#### `delay(ms)`

**Purpose:**
Returns a promise that resolves after a specified number of milliseconds.

**Example Usage:**

```js
await delay(1000); // Waits for 1 second
```

---

### 4. **Redirect Utilities**

#### `redirectToUrlWithBack({ to, from })`

**Purpose:**
Redirects to a URL and attaches the `from` page as a query parameter (`redirectBack`), allowing easy return navigation.

**Example Usage:**

```js
redirectToUrlWithBack({ to: "/login", from: window.location.href });
// Redirects to "/login?redirectBack=<current-page>"
```

---

#### `getRedirectBackUrl(url)`

**Purpose:**
Extracts the `redirectBack` query parameter from a given URL if it belongs to the same origin.

**Example Usage:**

```js
getRedirectBackUrl(
  "https://myapp.com/login?redirectBack=https%3A%2F%2Fmyapp.com%2Fdashboard"
);
// Returns "https://myapp.com/dashboard"
```

---

#### `redirectURL(target)`

**Purpose:**
Performs a direct full-page redirect to a given URL.

**Example Usage:**

```js
redirectURL("https://myapp.com/home");
```

---

### 5. **Document Management**

#### `setDocumentTitle(title)`

**Purpose:**
Updates the browser tab's title.

**Example Usage:**

```js
setDocumentTitle("Dashboard – Admin Panel");
```

---

#### `setFavicon(logoName, extension = "png")`

**Purpose:**
Dynamically sets the favicon of the page.

**Example Usage:**

```js
setFavicon("my-logo"); // Uses 'my-logo.png' from `/icon/`
setFavicon("my-logo", "ico"); // Uses 'my-logo.ico' from `/icon/`
```

---

### 6. **Data Structure Utility**

#### `Stack` (class)

**Purpose:**
Implements a classic Last-In-First-Out (LIFO) stack structure.

**Available Methods:**

- `.push(element)` – Add item
- `.pop()` – Remove and return top item
- `.peek()` – Return top item without removing
- `.isEmpty()` – Check if stack is empty
- `.size()` – Get total number of items
- `.clear()` – Reset the stack

**Example Usage:**

```js
const historyStack = new Stack();
historyStack.push("Home");
historyStack.push("About");
console.log(historyStack.peek()); // "About"
historyStack.pop(); // Removes "About"
```
