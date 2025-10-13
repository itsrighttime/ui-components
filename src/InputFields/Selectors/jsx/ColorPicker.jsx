import styles from "../css/ColorPicker.module.css";

export const ColorPicker = ({ color, setResult, required = false }) => {
  return (
    <div className={styles.colorPicker}>
      <input
        type="color"
        value={color || "#52c9bd"}
        onChange={(e) => setResult(e.target.value)}
        className={styles.input}
      />
      {required && <p className={styles.required}>*</p>}
    </div>
  );
};
