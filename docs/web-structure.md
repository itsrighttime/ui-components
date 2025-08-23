# WebStructure Developer Guide

## Overview

The `WebStructure` component provides a standardized layout wrapper for React pages. It includes a customizable `Header`, `Footer`, and a `children` area to render page-specific content. This component is ideal for building brand-consistent pages with a shared structure.

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
- `Footer`: A brand-aware footer with customizable links, contact info, and social media.
- `children`: Injected main content of the page.

## Usage

### Basic Example

```jsx
import { WebStructure } from "path-to/WebStructure";

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
  brand: "myBrandName",
};

const brandFooter = {
  name: "myBrandName",
  logo: "/assets/logo.png",
  tagLine: "Empowering Innovation.",
  tabs: [
    { name: "Home", goTo: "/" },
    { name: "Contact", goTo: "/contact" },
  ],
  contactus: {
    address: "City, Country",
    mobile: "+1234567890",
    email: "info@mybrand.com",
  },
  socialMedia: [
    { name: "linkedin", goTo: "https://linkedin.com/company/mybrand" },
    { name: "github", goTo: "https://github.com/mybrand" },
  ],
  getInTouch: { name: "Get In Touch", goTo: "/contact" },
};

const Page = () => {
  return (
    <WebStructure brandHeader={brandHeader} brandFooter={brandFooter}>
      <h1>Welcome</h1>
      <p>This is the homepage content.</p>
    </WebStructure>
  );
};
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

| Prop          | Type     | Description                                              |
| ------------- | -------- | -------------------------------------------------------- |
| `name`        | `string` | Brand name used to derive a default logo if not supplied |
| `logo`        | `string` | Optional logo override                                   |
| `tagLine`     | `string` | Brand tagline or motto                                   |
| `tabs`        | `array`  | Footer navigation links: `{ name, goTo }[]`              |
| `contactus`   | `object` | Contact details: `address`, `mobile`, `email`            |
| `socialMedia` | `array`  | Social links: `{ name, goTo }[]`                         |
| `getInTouch`  | `object` | Call-to-action link: `{ name, goTo }`                    |

**Rendering Notes**:

- Uses `getProductLogo(brand.name)` if no logo is provided.
- Multiple `Category` sections may be rendered, including a default fallback.
- Copyright message is included.

## Behavior Summary

### Header

- Mobile-first navigation with toggle icon
- Automatic tab highlighting based on path
- Redirection logic for login/register tab
- Uses React Router (`useNavigate`, `useLocation`)

### Footer

- Renders branding, contact info, and navigation links
- Supports dynamic or static footer sections
- Social media links are passed as data, not hardcoded

## Best Practices

- Keep navigation tabs consistent between `Header` and `Footer`.
- Use `loginRegisterTabName` only when redirection is required.
- Use environment-based `logoURL` or pass via `getProductLogo()`.
- Include `WebStructure` at the route layout level, not within individual components.
