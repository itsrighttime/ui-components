# WebStructure Developer Guide

## Overview

The `WebStructure` component provides a standardized layout wrapper for React pages. It includes a customizable `Header`, `Footer`, and a `children` area to render page-specific content. This component is ideal for building brand-consistent pages with a shared structure and environment-aware URLs.

## Importing

```js
import { UILayout } from "@itsrighttime/ui-components";

const { WebStructure } = UILayout;
```

## Component Breakdown

```jsx
<WebStructure brandHeader={...} brandFooter={...}>
  {/* Page content goes here */}
</WebStructure>
```

### Components Used:

- `Header`: A responsive navigation bar with dynamic tab highlighting.
- `Footer`: A brand-aware footer with dynamic URLs and customizable links, contact info, and social media.
- `children`: Injected main content of the page.

## Usage

### Basic Example

```jsx
import { WebStructure } from "path-to/WebStructure";
import { baseURL } from "path-to/baseURL";
import { FOOTER_BRANDS } from "path-to/footer.config";

const baseURLs = baseURL({
  itsrighttime: "https://itsrighttime.com",
  dev: "https://dev.itsrighttime.com",
  creative: "https://creative.itsrighttime.com",
  workspace: "https://workspace.itsrighttime.com",
});

const brandHeader = {
  tabs: [
    { name: "Home", goTo: "/" },
    { name: "About", goTo: "/about" },
    { name: "Login", goTo: "/login" },
  ],
  logoURL: "/assets/logo.png",
  defaultTab: { name: "Home", goTo: "/" },
  breakpoint: 768,
  loginRegisterTabName: "Login",
  loginRegisterURL: "/login",
  color: "#E63946",
  brand: "itsRIGHTtime",
};

const brandFooter = {
  brands: ["itsrighttime", "dev"], // brand keys
  baseURLs, // inject URLs
};

const Page = () => (
  <WebStructure brandHeader={brandHeader} brandFooter={brandFooter}>
    <h1>Welcome</h1>
    <p>This is the homepage content.</p>
  </WebStructure>
);
```

## WebStructure Props

| Prop          | Type     | Description                                 |
| ------------- | -------- | ------------------------------------------- |
| `children`    | `node`   | Content to render between header and footer |
| `brandHeader` | `object` | Header configuration object                 |
| `brandFooter` | `object` | Footer configuration object                 |

## Header Configuration (`brandHeader`)

| Prop                   | Type     | Description                                                |
| ---------------------- | -------- | ---------------------------------------------------------- |
| `tabs`                 | `array`  | Navigation tabs: `{ name, goTo }[]`                        |
| `logoURL`              | `string` | Logo image source                                          |
| `defaultTab`           | `object` | Default active tab: `{ name, goTo }`                       |
| `breakpoint`           | `number` | Responsive threshold for switching to mobile nav           |
| `loginRegisterTabName` | `string` | Tab label for login/register (triggers redirect)           |
| `loginRegisterURL`     | `string` | Login/register page path                                   |
| `color`                | `string` | Primary color for active tab styling                       |
| `brand`                | `string` | Brand name, used in document title and fallback logo logic |

**Behavior Notes**:

- Responsive behavior based on `breakpoint`.
- Active tab automatically syncs with the current URL.
- Special behavior for `loginRegisterTabName` — redirects to login with return URL.

## Footer Configuration (`brandFooter`)

| Prop       | Type     | Description                                                |
| ---------- | -------- | ---------------------------------------------------------- |
| `brands`   | `array`  | Brand keys to render, e.g., `["itsrighttime", "dev"]`      |
| `baseURLs` | `object` | `baseURL` instance providing environment-aware URL methods |

### `FOOTER_BRANDS_KEYS`

`FOOTER_BRANDS_KEYS` is an object containing predefined keys for each supported brand:

```js
export const FOOTER_BRANDS_KEYS = {
  itsrighttime: "itsrighttime",
  dev: "dev",
  creative: "creative",
  workspace: "workspace",
};
```

- Use these keys when specifying which brands to render in the footer.
- Ensures consistency between code and data-driven footer rendering.

### Footer Brands (`FOOTER_BRANDS(urls)`)

Each brand object contains:

| Prop          | Type     | Description                                 |
| ------------- | -------- | ------------------------------------------- |
| `name`        | `string` | Brand key name (`FOOTER_BRANDS_KEYS`)       |
| `logo`        | `string` | Optional logo override                      |
| `tagLine`     | `string` | Brand tagline or motto                      |
| `tabs`        | `array`  | Footer navigation links: `{ name, goTo }[]` |
| `contactus`   | `object` | Contact details: `address`, `email`         |
| `socialMedia` | `array`  | Social links: `{ name, goTo }[]`            |
| `getInTouch`  | `object` | Call-to-action link: `{ name, goTo }`       |

**URL Handling**:

- All links (`tabs`, `getInTouch`) are generated dynamically using the injected `baseURLs` instance.
- Example: `urls.getIrtUrl("/about-us")` for `itsrighttime`, `urls.getDevUrl("/contact")` for `dev`, etc.

## Behavior Summary

### Header

- Mobile-first navigation with toggle icon.
- Automatic tab highlighting based on URL.
- Redirection logic for `loginRegisterTabName`.
- Uses React Router (`useNavigate`, `useLocation`).

### Footer

- Renders multiple brands dynamically using `FOOTER_BRANDS(urls)`.
- Brand URLs are environment-aware via `baseURLs`.
- Renders contact info, navigation links, CTA buttons.
- Social media links passed as data, not hardcoded.

## Best Practices

- Keep navigation tabs consistent between `Header` and `Footer`.
- Always provide `baseURLs` to ensure environment-aware URLs.
- Use `brands` keys (`FOOTER_BRANDS_KEYS`) to selectively render footer brands.
- Include `WebStructure` at the route layout level, not inside individual components.
