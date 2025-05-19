import React, { useState } from "react";
import styles from "../css/PropsCss.module.css";
import Dropdown from "../../InputFields/Selectors/jsx/Dropdown";
import TextInputProp from "./TextInputProp";

const DropDownProp = ({
  options = [],
  multiple = false,
  placeholder = "Select...",
  label,
  setResult,
  color,
  value = [],
  addNew = false,
  setAddedOptions,
  isJson = false,
}) => {
  const [allOptions, setAllOptions] = useState(options);

  const handleJson = (jsonData) => {
    try {
      setAllOptions(JSON.parse(jsonData));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={styles.dropDowpProp}>
      {isJson && (
        <div className={styles.textInput}>
          <TextInputProp inputType={"jsonField"} setResult={handleJson} />
        </div>
      )}
      <Dropdown
        options={allOptions}
        multiple={multiple}
        placeholder={placeholder}
        label={label}
        setResult={setResult}
        color={color}
        value={value}
        addNew={addNew}
        setAddedOptions={setAddedOptions}
      />
    </div>
  );
};

export default DropDownProp;
