import React, { useState } from "react";
import IconButton from "../../Actions/jsx/IconButton";
import styles from "../css/RepeaterField.module.css";
import { Button } from "../../Actions/jsx/Button";
import { crossIcon } from "../../../utils/index.js";

// Generic RepeaterField Component
const RepeaterField = ({ Component, onValuesChange, initialValues = [] }) => {
  const [fields, setFields] = useState(initialValues);

  const handleAddField = () => {
    setFields([...fields, {}]);
  };

  const handleRemoveField = (index) => {
    const newFields = fields.filter((_, i) => i !== index);
    setFields(newFields);
    onValuesChange(newFields);
  };

  const handleFieldChange = (index, value) => {
    const newFields = fields.map((field, i) => (i === index ? value : field));
    setFields(newFields);
  };

  return (
    <div className={styles.repeaterField}>
      {fields.map((field, index) => (
        <div
          className={styles.btnComp}
          key={index}
          style={{ marginBottom: "10px" }}
        >
          <div className={styles.component}>
            <Component onChange={(value) => handleFieldChange(index, value)} />
          </div>
          <IconButton
            icon={crossIcon}
            onClick={() => handleRemoveField(index)}
            color="#FF5969"
          />
        </div>
      ))}
      <div className={styles.addMorebtn}>
        <Button text={"Add More"} onClick={handleAddField} />
      </div>
    </div>
  );
};

export default RepeaterField;
