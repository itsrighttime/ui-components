// RepeatableGroup.jsx
import { FieldRenderer } from "./FieldRenderer.jsx";
import { Button } from "../../../InputFields/Actions/jsx/Button.jsx";
import styles from "../css/GenericForm.module.css";
import { FIELDS_PROPS } from "../validation/helper/fields.js";
import { IconButton } from "../../../InputFields/Actions/jsx/IconButton.jsx";
import { crossIcon } from "../../../utils/icons.jsx";
import { useMemo } from "react";
import { useInitializeForm } from "../hooks/useInitializeForm.js";

export function RepeatableGroup({ field, values = [{}], onChange, settings }) {
  const { initialState, initialError } = useInitializeForm(
    field[FIELDS_PROPS.FIELDS]
  );

  // Ensure every item has a unique internal id (for React key)
  const itemsWithIds = useMemo(
    () =>
      values.map((v) => ({
        _uid: v._uid || crypto.randomUUID(),
        ...v,
      })),
    [values]
  );

  const handleItemChange = (index, name, value, isError) => {
    const updated = [...itemsWithIds];
    if (!isError) updated[index][name] = value;
    onChange(updated, isError);
  };

  const handleCrossClick = (indx) => {
    const updated = itemsWithIds.filter((_, i) => i !== indx);
    onChange(updated);
  };

  const handleMore = () => {
    onChange([...values, initialState]);
    // onChange([...values, initialError, true]);
  };

  const color = settings.color;

  return (
    <div className={styles.repeatableGroup}>
      <label>{field[FIELDS_PROPS.LABEL]}</label>
      {itemsWithIds.map((item, idx) => (
        <div key={item._uid} className={styles.repeatableItem}>
          {values.length > 1 && (
            <div className={styles.repeatableCross}>
              <IconButton
                icon={crossIcon}
                color={"var(--colorWhite)"}
                size={1}
                style={{
                  borderRadius: "50%",
                  backgroundColor: "var(--colorRed)",
                }}
                onClick={() => {
                  handleCrossClick(idx);
                }}
              />
            </div>
          )}

          {field[FIELDS_PROPS.FIELDS].map((subField) => (
            <FieldRenderer
              key={subField[FIELDS_PROPS.NAME]}
              field={subField}
              value={item}
              onChange={(name, val, isError) =>
                handleItemChange(idx, name, val, isError)
              }
              settings={settings}
            />
          ))}
        </div>
      ))}
      <Button
        text={field[FIELDS_PROPS.MORE_LABEL]}
        // onClick={() => onChange([...values, {}])}
        onClick={handleMore}
        color={color}
      />
    </div>
  );
}
