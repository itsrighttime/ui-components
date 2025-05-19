import React from "react";
import styles from "../css/PropsCss.module.css";
import TextField from "../../InputFields/TextInput/jsx/TextField";
import TextArea from "../../InputFields/TextInput/jsx/TextArea";
import JsonField from "../../InputFields/TextInput/jsx/JsonField";

const TextInputProp = ({
  inputType,
  label,
  placeholder,
  setResult,
  color,
  setIsFieldValid = () => {},
  prefix,
  suffix,
  style = {},
  icon,
  hideOnSave,
  showLabelAlways,
}) => {
  const cssStyle = {
    borderRadius: "5px",
    ...style,
  };

  let component;

  switch (inputType) {
    case "textArea":
      component = (
        <TextArea
          color={color}
          style={style}
          setResult={setResult}
          setIsFieldValid={setIsFieldValid}
          label={label}
          placeholder={placeholder}
        />
      );
      break;
    case "jsonField":
      component = (
        <JsonField
          color={color}
          setResult={setResult}
          setIsFieldValid={setIsFieldValid}
          label={label}
          hideOnSave={hideOnSave}
        />
      );
      break;
    default:
      component = (
        <TextField
          label={label}
          placeholder={placeholder}
          setResult={setResult}
          setIsFieldValid={setIsFieldValid}
          color={color}
          prefix={prefix}
          suffix={suffix}
          style={cssStyle}
          icon={icon}
          maxLength={50}
          isBorder={true}
          errorMessage={"Maximum 50 character"}
          showLabelAlways={showLabelAlways}
        />
      );
      break;
  }

  return <div className={styles.textInputProp}>{component}</div>;
};

export default TextInputProp;
