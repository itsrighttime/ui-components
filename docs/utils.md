## Utility Functions – Features & Usage Guide

## [Utilities]

- [`apiCaller`](./api.md)
- [`logger` (with `codeTypes` and `getTrackingCode`)](./logger.md)
- [`camelToKebab`](#cameltokebabstr)
- [`kebabToCamel`](#kebabtocamelstr)
- [`getColorCode`](#getcolorcodecolorname)
- [`delay`](#delayms)
- [`redirectURL`](#redirecturltarget)
- [`redirectUrlWithBack`](#redirecttourlwithback-to-from-)
- [`getRedirectBackUrl`](#getredirectbackurlurl)
- [`setDocumentTitle`](#setdocumenttitletitle)
- [`setFavicon`](#setfaviconlogoname-extension--png)

### 1. **String Conversion Utilities**

#### `camelToKebab(str)`

**Purpose:**
Converts a `camelCase` string into `kebab-case`.

**Example Usage:**

```js
camelToKebab("myComponentName"); // "my-component-name"
```

---

#### `kebabToCamel(str)`

**Purpose:**
Converts a `kebab-case` string into `camelCase`.

**Example Usage:**

```js
kebabToCamel("my-component-name"); // "myComponentName"
```

---

### 2. **Color Utilities**

#### `getColorCode(colorName)`

**Purpose:**
Fetches the corresponding color code from a predefined `COLOR` object. Defaults to cyan if the name is not found.

**Example Usage:**

```js
getColorCode("blue"); // Returns COLOR.blue
getColorCode("unknown"); // Returns COLOR.cyan
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
