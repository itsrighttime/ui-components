## `AddressField` Component – Developer Usage Guide

### Overview

`AddressField` is a reusable component that dynamically renders a collection of address input fields. It uses the `TextField` component internally and allows full customization of which fields to show, styling, validation, and layout.

### Import

```jsx
import { UIInputs } from "@itsrighttime/ui-components";

const { AddressField } = UIInputs.Text;
```

### Basic Usage

```jsx
<AddressField setResult={(address) => console.log(address)} />
```

> By default, it renders all fields (house, street, city, state, postal, country, landmark, address line).

### Props

| Prop              | Type     | Default     | Description                                                                       |
| ----------------- | -------- | ----------- | --------------------------------------------------------------------------------- |
| `setResult`       | Function | _required_  | Returns the full address object on any field change                               |
| `color`           | String   | `undefined` | Pass a color name or hex for input underline and label                            |
| `isHouse`         | Boolean  | `true`      | Whether to show the "House No." field                                             |
| `isStreet`        | Boolean  | `true`      | Whether to show the "Street No." field                                            |
| `isCity`          | Boolean  | `true`      | Whether to show the "City" field                                                  |
| `isState`         | Boolean  | `true`      | Whether to show the "State" field                                                 |
| `isPostal`        | Boolean  | `true`      | Whether to show the "Postal Code" field                                           |
| `isCountry`       | Boolean  | `true`      | Whether to show the "Country" field                                               |
| `isAddressLine`   | Boolean  | `true`      | Whether to show the "Additional Address Line" field                               |
| `isLandmark`      | Boolean  | `true`      | Whether to show the "Landmark" field                                              |
| `showLabelAlways` | Boolean  | `false`     | Always show labels above inputs                                                   |
| `width`           | String   | `"300px"`   | Width of the entire address form                                                  |
| `gap`             | String   | `"10px"`    | Spacing between each input field                                                  |
| `isBorder`        | Boolean  | `false`     | If true, TextFields will show borders instead of only underlines                  |
| `setIsFieldValid` | func     | `-`         | Callback to indicate whether the email is valid.                                  |
| `backendError`    | String   | `""`        | To make sure if eny error occurs at the bakend that reaches to the correct field. |
| `values`           | `-`      | `{}`        | Initial value.                                                                    |

> backendError keys - `house`, `street`, `city`, `state`, `postal`, `country`, `landmark`, `addressLine`

### Returned Data Format

The `setResult` callback receives the current address object every time any field changes:

```js
{
  house: "12A",
  street: "Main Road",
  city: "New York",
  state: "NY",
  postal: "10001",
  country: "USA",
  addressLine: "Suite 400",
  landmark: "Near Central Park"
}
```

> Hidden fields return `null` in the result object.

### Custom Example

```jsx
<AddressField
  color="teal"
  width="100%"
  gap="16px"
  isBorder={true}
  showLabelAlways={true}
  isAddressLine={false}
  isLandmark={false}
  setResult={(value) => setAddressData(value)}
/>
```

### Validation Built-in

Each field has built-in validation using regex, min/max lengths, and error messages. You don’t need to manage validation manually.

### Styling

Custom CSS is handled via:

```css
.addressField {
  display: flex;
  flex-direction: column;
}
```

You can override styles via `className`, inline props, or CSS Modules.

### Dependencies

- Uses your custom `<TextField />` component
- Assumes `TextField` supports props like:

  - `setResult`, `label`, `placeholder`, `pattern`, `errorMessage`, etc.

### Common Use Cases

| Use Case                              | Config                                                        |
| ------------------------------------- | ------------------------------------------------------------- |
| Minimal Address (no country/landmark) | `isCountry={false}`, `isLandmark={false}`                     |
| Postal-only address                   | `isHouse={false}` + others false, `isPostal={true}`           |
| Full form but bordered & colored      | `isBorder={true}`, `color="purple"`, `showLabelAlways={true}` |
