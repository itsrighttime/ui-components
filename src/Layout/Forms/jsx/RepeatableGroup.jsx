// RepeatableGroup.jsx
import { FieldRenderer } from "./FieldRenderer";
import { Button } from "../../../InputFields/Actions/jsx/Button";
import styles from "../css/GenericForm.module.css";

export function RepeatableGroup({ field, values = [{}], onChange, settings }) {
  const handleItemChange = (index, name, value) => {
    const updated = [...values];
    updated[index][name] = value;
    onChange(updated);
  };
  const color = settings.color;

  return (
    <div className={styles.repeatableGroup}>
      <label>{field.label}</label>
      {values.map((item, idx) => (
        <div key={idx} className={styles.repeatableItem}>
          {field.fields.map((subField) => (
            <FieldRenderer
              key={subField.name}
              field={subField}
              value={item}
              onChange={(name, val) => handleItemChange(idx, name, val)}
              settings={settings}
            />
          ))}
        </div>
      ))}
      <Button
        text={field.moreLabel}
        onClick={() => onChange([...values, {}])}
        color={color}
      />
    </div>
  );
}
