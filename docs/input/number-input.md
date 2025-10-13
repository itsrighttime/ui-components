## Developer Guide – Input Controls Library

This guide covers how to use the `Slider`, `NumberField`, and `Stepper` components in your React application. These components are styled, configurable, and designed for flexibility in handling numeric inputs.

- [`NumberField`](#numberfield-component)
- [`Stepper`](#stepper-component)
- [`Slider`](#slider-component)

### Shared Features

- All components accept:

  - `value`: Initial value to render.
  - `setResult`: A callback function to return the updated value.
  - `color`: Custom color for UI theming.
  - `label`: Optional label for the input.
  - `width`: Control width of the component.

- All use CSS Modules for scoped styling.
- Recommended: wrap all inputs in a controlled component architecture.

### Import

```jsx
import { UIInputs } from "@itsrighttime/ui-components";

const { Slider, NumberField, Stepper } = UIInputs.Text;
```

## `Slider` Component

**A stylish range input with optional min/max display and side value indicators.**

### Props

| Prop            | Type      | Default       | Description                                                                |
| --------------- | --------- | ------------- | -------------------------------------------------------------------------- |
| `value`         | `number`  | `0`           | Initial slider value                                                       |
| `setResult`     | `func`    | **required**  | Callback to pass updated value                                             |
| `color`         | `string`  | `--colorCyan` | Color for the filled slider portion                                        |
| `min`           | `number`  | `0`           | Minimum value                                                              |
| `max`           | `number`  | `100`         | Maximum value                                                              |
| `step`          | `number`  | `1`           | Slider steps                                                               |
| `label`         | `string`  | `""`          | Optional label                                                             |
| `showRange`     | `bool`    | `true`        | Show min/max beside the slider                                             |
| `showValueSide` | `string`  | `"none"`      | Where to show the current value (`left`, `right`, `top`, `bottom`, `none`) |
| `precision`     | `number`  | `10`          | Rounds value to nearest `1/precision`                                      |
| `width`         | `string`  | `300px`       | Width of the component                                                     |
| `required`      | `boolean` | `false`       | If true, marks input as required                                           |

### Example

```jsx
<Slider
  value={25}
  setResult={(val) => console.log(val)}
  color="tomato"
  label="Volume"
  min={0}
  max={100}
  step={5}
  showRange={true}
  showValueSide="right"
/>
```

## `NumberField` Component

**Controlled numeric input field with customizable formatting.**

### Props

| Prop               | Type            | Default       | Description                          |
| ------------------ | --------------- | ------------- | ------------------------------------ |
| `value`            | `number/string` | `""`          | Initial input value                  |
| `setResult`        | `func`          | **required**  | Callback to return the value on blur |
| `label`            | `string`        | `"Number"`    | Optional label                       |
| `color`            | `string`        | `--colorCyan` | UI theming                           |
| `placeholder`      | `string`        | `""`          | Input placeholder                    |
| `decimalPlaces`    | `number`        | `2`           | Number of decimal digits allowed     |
| `maxIntegerDigits` | `number`        | `10`          | Max digits before decimal            |
| `isBorder`         | `bool`          | `false`       | Add border styling                   |
| `showLabelAlways`  | `bool`          | `false`       | Always show label above input        |
| `min`              | `number`        | `undefined`   | Min allowed value                    |
| `max`              | `number`        | `undefined`   | Max allowed value                    |
| `width`            | `string`        | `300px`       | Component width                      |
| `required`         | `boolean`       | `false`       | If true, marks input as required     |

### Example

```jsx
<NumberField
  value={42}
  setResult={(val) => console.log(val)}
  label="Price"
  color="green"
  placeholder="Enter price"
  decimalPlaces={2}
  maxIntegerDigits={6}
  isBorder={true}
/>
```

## `Stepper` Component

**Basic increment/decrement counter with min/max/step constraints.**

### Props

| Prop        | Type      | Default       | Description                      |
| ----------- | --------- | ------------- | -------------------------------- |
| `value`     | `number`  | `0`           | Initial stepper value            |
| `setResult` | `func`    | **required**  | Callback on step change          |
| `color`     | `string`  | `--colorCyan` | Button & text color              |
| `min`       | `number`  | `0`           | Minimum value allowed            |
| `max`       | `number`  | `100`         | Maximum value allowed            |
| `step`      | `number`  | `5`           | Amount to increment/decrement    |
| `label`     | `string`  | `""`          | Optional label                   |
| `width`     | `string`  | `300px`       | Width of component               |
| `required`  | `boolean` | `false`       | If true, marks input as required |

### Example

```jsx
<Stepper
  value={10}
  setResult={(val) => console.log(val)}
  color="blue"
  label="Quantity"
  min={0}
  max={20}
  step={2}
/>
```

## Tips

- Always pass `setResult` to receive the current state externally.
- Use `color` to match your app's branding or theme.
- Use consistent `width` across components in the same form for better alignment.
- Pair these with validation logic if needed (e.g., form libraries like Formik).

## Styling Notes

Make sure you create and include the following CSS modules:

- `Slider.module.css`
- `NumberField.module.css`
- `Stepper.module.css`

Each of these defines component-specific styles using `CSS Variables`:

- `--color`: Component accent color.
- `--width`: Width of the input.
