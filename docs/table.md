## Feature: `Table` Component

The `Table` component is a **highly customizable, scrollable, and responsive table layout** designed for React applications. It provides a **sticky header**, optional action buttons, and supports dynamic styling and interactivity for better UI/UX in data-heavy views.

## Key Features

- **Sticky Header:** Header remains visible while scrolling vertically.
- **Horizontal Scroll Sync:** Header and body scroll together horizontally.
- **Customizable Columns:** Define headers and control widths with `columns` and `columnWidths`.
- **Cell Clickable Logic:** Make specific columns clickable using `clickableColumns` and `onCellClick`.
- **Style Customization:** Use `styling` prop to set color themes for text, background, and link color.
- **Minimum Width Control:** Enable consistent layout with `isMinimunCellWidth`.
- **Row-Level Actions:** Show action buttons per row when `isAction` is true.
- **Fully Responsive:** Works in narrow containers with smooth horizontal and vertical scrolling.

## How to Use

### 1. **Import and Use Table**

```js
import { UIEssentials } from "@itsrighttime/ui-components";
const { Table } = UIEssentials;
```

### 2. **Define Your Columns and Data**

```js
const columns = [
  { key: "Name", value: "Name" },
  { key: "Role", value: "Role" },
  { key: "Email", value: "Email" },
];
const columnWidths = { Name: "200px", Role: "150px", Email: "250px" };

const data = [
  { Name: "John Doe", Role: "Developer", Email: "john@example.com" },
  { Name: "Jane Smith", Role: "Designer", Email: "jane@example.com" },
];
```

### 3. **Table Eample - 1**

```jsx
<Table
  columns={columns}
  columnWidths={columnWidths}
  data={data}
  isAction={true}
  btns={[
    { label: "Edit", icon: "✏️", onClick: (row) => console.log("Edit", row) },
  ]}
  clickableColumns={["Email"]}
  onCellClick={(row, col) => alert(`${col}: ${row[col]}`)}
  styling={{
    colorLinkText: "#0066cc",
    colorHeaderText: "#333",
    colorBodyText: "#444",
    colorHeaderCellBg: "#f0f0f0",
    colorBodyCellBg: "#fff",
    colorTableBg: "#fff",
  }}
/>
```

### **Table Eample - 2**

```jsx
<Table
  columns={columns}
  columnWidths={columnWidths}
  data={data}
  clickableColumns={["Email"]}
  onCellClick={(row, col) => alert(`${col}: ${row[col]}`)}
/>
```

### **Table Eample - 3**

```jsx
<Table columns={columns} columnWidths={columnWidths} data={data} />
```

### **Table Eample - 4**

```jsx
<Table
  columns={columns}
  columnWidths={columnWidths}
  data={data}
  isMinimunCellWidth
/>
```

## Props Reference

| Prop                 | Type       | Description                                                   |
| -------------------- | ---------- | ------------------------------------------------------------- |
| `columns`            | `string[]` | List of column names to display in header                     |
| `columnWidths`       | `object`   | Optional fixed widths for columns                             |
| `data`               | `object[]` | Array of row data objects                                     |
| `isAction`           | `boolean`  | Whether to display action buttons in each row                 |
| `btns`               | `array`    | Buttons to show in action column (`{ label, icon, onClick }`) |
| `clickableColumns`   | `string[]` | Columns that trigger `onCellClick`                            |
| `onCellClick`        | `function` | Callback when a cell from `clickableColumns` is clicked       |
| `isMinimunCellWidth` | `boolean`  | If true, enforces a minimum width for cells                   |
| `styling`            | `object`   | Customize colors for text, background, links, etc.            |

## Best Practices

- Keep `columnWidths` consistent to maintain a neat layout.
- Use `clickableColumns` for interactive fields like email, ID, or links.
- Combine `isAction` with `btns` to enable row-level editing or management.
- Set `isMinimunCellWidth={false}` when you want the table to auto-fit tight layouts.
- Always pass consistent column names and keys in your data.

Would you like me to:

- Create a test dataset or playground example?
- Help you build a responsive mobile view?

Let me know if you'd like this formatted as a doc or Markdown guide!
