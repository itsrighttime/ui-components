### Using `className` vs `style` prop — When to use which?

- **Use `className` when:**

  - You want **reusable, maintainable, and consistent styles** across multiple components.
  - Styles involve multiple CSS properties or complex selectors (hover, media queries, pseudo-elements).
  - You want to leverage CSS Modules or CSS-in-JS for better organization.
  - You want to keep styling concerns separate from JavaScript logic.

- **Use `style` prop when:**

  - You need to apply **dynamic, one-off, or inline styles** calculated or passed as props.
  - The style is specific to a single instance or depends on runtime values (e.g., widths, colors, gaps that come from user input or component state).
  - The style is simple and unlikely to be reused.

### Should you avoid `style` when using `className`?

- **Not necessarily.** They complement each other.
- It’s **fine to use both**:

  - `className` for **base styles and layout**.
  - `style` for **dynamic overrides or inline tweaks**.

- But if you find yourself passing many inline styles repeatedly, **consider moving them into a class instead** for maintainability.

### Summary

| Goal                    | Recommended Approach          |
| ----------------------- | ----------------------------- |
| Shared, reusable styles | Use `className`               |
| One-time dynamic style  | Use `style` prop              |
| Complex CSS features    | Use `className` (CSS modules) |
| Small dynamic tweaks    | Use `style` prop              |

### Example:

```jsx
<FlexContainer
  className={styles.baseFlex} // shared reusable styles
  style={{ gap: dynamicGap }} // small dynamic tweak
>
  ...
</FlexContainer>
```

**In short:** Use `className` for _most_ styling, and use `style` only when you have a good reason for inline or dynamic styles. This keeps code clean and maintainable without losing flexibility.
