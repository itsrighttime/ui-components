## Layout

- [`FlexContainer`](./container.md#flexcontainer)
- [`GridContainer`](./container.md#gridcontainer)
- [`Workspace`](./layout.md#workspace-component--usage-guide)
- [`Header`](./layout.md#header-component--usage-guide)

## Workspace Component – Usage Guide

### Features:

- **Nested Routing Support** via `react-router-dom`.
- **Context Providers Injection** using `CombinedProviders`.
- **Fullscreen Control** through `FullscreenWrapper`.
- **Dynamic Workspace Home Page** for selecting between multiple apps.
- **Integrated Auth Route** (`/login`).
- **Wildcard Error Fallback** using `ErrorPage`.

### Props:

| Prop              | Type       | Default         | Description                                                        |
| ----------------- | ---------- | --------------- | ------------------------------------------------------------------ |
| `tabClickHandler` | `Function` | **Required**    | Handles tab click events in your workspace UI.                     |
| `workspace`       | `string`   | `"letsDiscuss"` | The active workspace app (used in layout, home page, and context). |

---

### Routes Handled:

1. `workspace/:workspaceId/:level/:zone/:position/:tabKey`
   → Renders `WorkspaceLayoutWrapper` with dynamic params and fullscreen toggle.

2. `/workspace` (index)
   → Renders `WorkspaceHomePage` with app list and fullscreen toggle.

3. `/workspace/login`
   → Renders `LoginForm` for authentication.

4. All other unmatched paths (`*`)
   → Fallback to `ErrorPage`.

---

## Importing

```js
import { UILayout } from "@itsrighttime/ui-components";

const { Workspace, Form, Header, Footer, WebStructure, KEYS } = UILayout;
```

### Example Usage:

```jsx
function App() {
  const handleTabClick = (tabKey) => {
    console.log("Tab clicked:", tabKey);
  };

  return (
    <Workspace tabClickHandler={handleTabClick} workspace="letsGrowTogether" />
  );
}
```

## Header Component – Usage Guide

The `Header` component is a responsive, reusable navigation header for any project.

### Features:

- **Responsive Navigation** with mobile hamburger toggle.
- **Dynamic Tab Highlighting** based on current URL.
- **Login/Register Redirect** with return URL support.
- **Automatic Document Title Updates**.
- **Customizable Logo and Breakpoint Support**.

### Props:

| Prop                   | Type     | Default                       | Description                                                          |
| ---------------------- | -------- | ----------------------------- | -------------------------------------------------------------------- |
| `tabs`                 | `Array`  | `[]`                          | Array of tab objects: `{ name: string, goTo: string }`.              |
| `logoURL`              | `string` | `""`                          | Path or URL of the logo image.                                       |
| `defaultTab`           | `object` | `{ name: "Home", goTo: "/" }` | Tab considered active on root path (`/`).                            |
| `breakpoint`           | `number` | `800`                         | Width (in px) below which mobile nav toggle is activated.            |
| `loginRegisterTabName` | `string` | `"login/register"`            | Name of the login tab (matched via `resolveStringToId`).             |
| `loginRegisterURL`     | `string` | `"/login"`                    | Redirect path for login/register tabs with `?redirectBack=` support. |
| `color`                | `string` | `"var(colorRed)"`             | Tochange the header button color                                     |

---

### Example Usage:

```jsx
const tabs = [
  { name: "Home", goTo: "/" },
  { name: "About", goTo: "about" },
  { name: "Contact", goTo: "contact" },
  { name: "Login/Register", goTo: "login" },
];

function AppHeader() {
  return (
    <Header
      tabs={tabs}
      logoURL="/assets/logo.svg"
      defaultTab={{ name: "Home", goTo: "/" }}
      loginRegisterURL="/login"
    />
  );
}
```

# Footer Component

The `Footer` component provides a customizable footer layout for your application. It allows for easy integration of branding, navigation links, social media icons, and contact details.

## Features

- **Branding**: Supports dynamic logos and taglines.
- **Navigation**: Allows setting multiple navigation links like "Home", "About", etc.
- **Social Media**: Integrates with social media platforms with customizable icons and links.
- **Contact Information**: Displays contact information like address, phone number, and email.
- **Get In Touch**: A custom button that can link to any relevant page.

## Usage

To use the `Footer` component, pass a `brand` object that contains details like the logo, tagline, social media links, navigation links, and contact information. The component will dynamically display the footer based on the `brand` object properties.

### Example Usage

```jsx
const App = () => {
  return (
    <div>
      <Footer
        brand={[KEYS.FOOTER_BRANDS_KEYS.dev, KEYS.FOOTER_BRANDS_KEYS.workspace]}
      />
    </div>
  );
};
```

# WebStructure Component

The `WebStructure` component provides a layout structure for your web page, integrating a responsive `Header` and `Footer` with customizable content between them. It acts as a container that organizes the main structure of your webpage.

## Features

- **Header Integration**: Includes a dynamic and responsive header.
- **Footer Integration**: Integrates a fully customizable footer.
- **Content Flexibility**: Renders dynamic content passed via the `children` prop.
- **Customizable Tabs & Branding**: Allows for easy customization of header tabs and footer brand information.

## Usage

To use the `WebStructure` component, pass in the required props for the header and footer, and pass any content to be displayed between them via the `children` prop.

### Props

- **children** _(ReactNode)_: The content that will be displayed between the header and footer. This is typically the body of your page.
- **brandFooter** _(Object)_: The brand object used to customize the footer. It should contain information like logo, tagline, social media links, etc.
- **headerTabs** _(Array)_: An array of objects representing the tabs for the header navigation. Each tab should have a `name` and a `goTo` URL.

  - Example: `[{ name: "Home", goTo: "/" }, { name: "About", goTo: "about" }]`

### Example Usage

```jsx
const headerTabs = [
  { name: "Home", goTo: "/" },
  { name: "About", goTo: "/about" },
  { name: "Contact", goTo: "/contact" },
];

const brandFooter = [KEYS.FOOTER_BRANDS_KEYS.dev];

const App = () => {
  return (
    <WebStructure brandFooter={brandFooter} headerTabs={headerTabs}>
      <h1>Welcome to MyBrand</h1>
      <p>Your one-stop solution for business innovation.</p>
    </WebStructure>
  );
};

export default App;
```
