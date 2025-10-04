// RepeatableGroup.jsx
import { FieldRenderer } from "./FieldRenderer";
import { Button } from "../../../InputFields/Actions/jsx/Button";
import styles from "../css/GenericForm.module.css";
import { FIELDS_PROPS } from "../validation/helper/fields";

export function RepeatableGroup({ field, values = [{}], onChange, settings }) {
  const handleItemChange = (index, name, value) => {
    const updated = [...values];
    updated[index][name] = value;
    onChange(updated);
  };
  const color = settings.color;

  return (
    <div className={styles.repeatableGroup}>
      <label>{field[FIELDS_PROPS.LABEL]}</label>
      {values.map((item, idx) => (
        <div key={idx} className={styles.repeatableItem}>
          {field[FIELDS_PROPS.FIELDS].map((subField) => (
            <FieldRenderer
              key={subField[FIELDS_PROPS.NAME]}
              field={subField}
              value={item}
              onChange={(name, val) => handleItemChange(idx, name, val)}
              settings={settings}
            />
          ))}
        </div>
      ))}
      <Button
        text={field[FIELDS_PROPS.MORE_LABEL]}
        onClick={() => onChange([...values, {}])}
        color={color}
      />
    </div>
  );
}
