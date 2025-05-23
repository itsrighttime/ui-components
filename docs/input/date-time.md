
## Component: `Calendar`

### Purpose

The `Calendar` component is a **fully-featured, customizable, and dynamic calendar UI** that supports:

- Day, month, and year views.
- Navigation with restrictions.
- Dynamic sizing.
- Lazy loading of internal components.
- Use in both large and small layouts.

---

## Props

| Prop                   | Type                 | Default  | Description                                           |
| ---------------------- | -------------------- | -------- | ----------------------------------------------------- |
| `isSmall`              | `boolean`            | `false`  | If `true`, renders a compact version of the calendar. |
| `setResult`            | `function`           | —        | Callback triggered when a date is selected.           |
| `color`                | `string`             | —        | CSS color used for button highlights.                 |
| `restrictionStartDate` | `string` (formatted) | `null`   | Start boundary (inclusive) for selectable dates.      |
| `restrictionEndDate`   | `string` (formatted) | `null`   | End boundary (inclusive) for selectable dates.        |
| `height`               | `string`             | `"100%"` | Sets the height of the calendar container.            |
| `width`                | `string`             | `"100%"` | Sets the width of the calendar container.             |



## State Management

- `currentDate`: Stores the current active date (defaults to today or a mid-point between restriction dates).
- `view`: `"calendar"`, `"months"`, or `"years"` – used to toggle between views.


## Logic Breakdown

###. **Date Restrictions**

- `restrictionStartDate` and `restrictionEndDate` are **converted from string to `Date` objects** using `convertStrDate2Date`.
- A sanity check ensures **start date is not after end date**.
- If the current date is **outside the restriction**, a **central fallback date** is calculated.

###. **Navigation (Prev/Next)**

- Navigation is disabled based on view and restriction boundaries using `canMovePrev()` and `canMoveNext()`.
- Navigation logic (month/year switching) is handled using `handlePrev()` and `handleNext()`.

###. **View Switching**

- Click on the header toggles between calendar → months → years.
- Month and year clicks use `handleMonthSelection()` and `handleYearSelection()` to set new state.

###. **Lazy Loading**

- `RenderCalendar`, `RenderMonths`, and `RenderYears` are dynamically imported for **performance optimization**.
- Wrapped in `React.Suspense` with a fallback loader.


## Use Case Scenarios

### **Generic Date Picker**

Perfect for use in:

- Booking systems
- Form inputs
- Custom dashboards
- Availability selectors

### **Restricted Calendars**

Ideal when:

- Users can only choose between specific date ranges (e.g., leave requests, scheduling, reports).
- A date must fall between a start and end limit.

### **View-based Navigation**

Useful in:

- Applications where the year and month need to be selected separately.
- Compact UIs (e.g., mobile apps, embedded popups).


## Example Usage

```jsx
<Calendar
  isSmall={true}
  color="#FF9800"
  restrictionStartDate="01-01-2024"
  restrictionEndDate="12-31-2025"
  setResult={(date) => console.log("Selected Date:", date)}
/>
```



## Highlights

- **Highly customizable UI** via CSS variables (`--color`, `--height`, `--width`).
- **Resilient initialization** based on restrictions.
- **Optimized with lazy loading** for performance.
- **Scalable and extensible**: Clean separation of logic via helper functions (`helperCalendar.js`).



## `DatePicker` Component

The `DatePicker` is a customizable, reusable date selection component built in React. It combines visual flexibility with functionality and encapsulates behavior like opening/closing on user interaction, outside click detection, and date restrictions.

### Features:

* **Initial State Handling:**
  Displays either a provided initial date, a label, or a placeholder text like `"Select a Date"`.

* **Calendar Integration:**
  Integrates a custom `Calendar` component, passing props like size, color, and restriction ranges (`restrictionStartDate`, `restrictionEndDate`).

* **Click Outside Detection:**
  Uses a `useRef` (`pickerRef`) with `useEffect` to detect and close the calendar when a user clicks outside the date picker.

* **Styling via CSS Variables:**
  Dynamic inline styles are used for customizable themes including:

  * `--color` for accent color,
  * `--borderRadius`, `--border*` for border styles,
  * `--width` to control component width.

### Props:

| Prop                   | Type               | Description                          |
| ---------------------- | ------------------ | ------------------------------------ |
| `label`                | `string`           | Placeholder or label text            |
| `initialDate`          | `string` or `null` | Pre-selected date value              |
| `restrictionStartDate` | `Date` or `null`   | Prevent selection before this date   |
| `restrictionEndDate`   | `Date` or `null`   | Prevent selection after this date    |
| `color`                | `string`           | Custom highlight color               |
| `setResult`            | `function`         | Callback to return the selected date |
| `isSmall`              | `boolean`          | Controls calendar compactness        |
| `isBorder`             | `boolean`          | Toggle border visibility             |
| `width`                | `string`           | CSS width for layout flexibility     |


## `TimePicker` Component

The `TimePicker` allows users to manually select time by choosing **hour**, **minutes**, and **AM/PM** from dropdowns. It is cleanly separated into three controls and is fully controlled via internal state.

### Features:

* **Three-Step Selection:**
  Users select:

  * Hours (01–12),
  * Minutes (00–59),
  * Period (AM/PM).

* **Dynamic Formatting:**
  Once all three fields are selected, it composes and returns a formatted time string like `08:45 PM` via the `setResult` callback.

* **Dropdown UI:**
  Uses a shared `CustomDropdown` component for consistent styling and interaction.

* **Default Display:**
  Defaults to `"--"` until the user makes selections, ensuring visual clarity.

### Props:

| Prop        | Type       | Description                                    |
| ----------- | ---------- | ---------------------------------------------- |
| `label`     | `string`   | Optional label displayed above the input       |
| `setResult` | `function` | Callback triggered once valid time is selected |
| `color`     | `string`   | Custom accent color                            |
| `width`     | `string`   | Max width of the input container               |


## Styling Notes

Both components rely on **modular CSS**:

* `DatePicker.module.css`
* `TimePicker.module.css`

This modular approach keeps the components isolated in terms of design and easier to maintain across large projects.


## Integration Example

Here’s how you might use both in a form:

```jsx
<DatePicker
  label="Select Start Date"
  color="#28a745"
  setResult={(date) => console.log("Selected Date:", date)}
  isBorder
/>

<TimePicker
  label="Select Time"
  color="#007bff"
  setResult={(time) => console.log("Selected Time:", time)}
/>
```


## Summary

The `Calendar` component is a robust, flexible, and visually adaptable calendar widget suitable for any web application that requires **customized, navigable date selection**. With support for view toggling, lazy loading, and dynamic restrictions, it’s well-suited for both small UIs and full-featured forms.

These two components are well-designed building blocks for any scheduling, booking, or form-based application. `DatePicker` focuses on clear interaction with calendar-based input, while `TimePicker` ensures precise time entry through dropdowns. Both emphasize reusability, controlled input logic, and a clean user experience.
