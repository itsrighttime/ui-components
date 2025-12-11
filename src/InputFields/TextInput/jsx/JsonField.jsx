import { useEffect, useState } from "react";
import { TextArea } from "./TextArea.jsx";
import { Button } from "../../Actions/jsx/Button.jsx";
import styles from "../css/JsonField.module.css";
import { getCommonCssVariables } from "../../helper/getCommonCssVariables.js";

export const JsonField = ({
  label,
  setResult,
  setIsFieldValid,
  color,
  hideOnSave = false,
  showCharacterCount = false,
  showWordCount = false,
  width = "300px",
  isBorder = false,
  backendError = "",
  value = "",
  required = false,
}) => {
  const [jsonInput, setJsonInput] = useState(value);
  const [error, setError] = useState("");
  const [onSave, setOnSave] = useState(true);
  const [formattedJson, setFormattedJson] = useState("");

  // Sync value from external props
  useEffect(() => {
    if (value !== "" && jsonInput === "") setJsonInput(value); // Sync with external value
  }, [value]);

  useEffect(() => {
    setResult(formattedJson);
  }, [formattedJson]);

  const handleValidateJson = () => {
    try {
      const parsedJson = JSON.parse(jsonInput);
      setError("");
      setIsFieldValid(true);

      // Format the JSON with indentation (pretty print)
      const prettyJson = JSON.stringify(parsedJson, null, 2);
      setFormattedJson(prettyJson);
      setJsonInput(prettyJson);
      hideOnSave && setOnSave(false);
    } catch (err) {
      console.error("Invalid JSON format:", err);
      setError("Invalid JSON format");
      setFormattedJson("");
      setIsFieldValid(false);
      setOnSave(true);
    }
  };

  const cssVariable = {
    ...getCommonCssVariables(isBorder, color, width),
  };

  return (
    <div className={styles.jsonField} style={{ width: width, ...cssVariable }}>
      {onSave ? (
        <>
          <div className={styles.textInput}>
            <TextArea
              color={color}
              label={label}
              value={jsonInput}
              setResult={setJsonInput}
              placeholder="Write JSON here..."
              showCharacterCount={showCharacterCount}
              showWordCount={showWordCount}
              backendError={backendError}
              width="100%"
              required={required}
            />
          </div>

          <div className={styles.errBtn}>
            {error !== "" ? (
              <div className={styles.error}>{error}</div>
            ) : (
              <div></div>
            )}
            <div className={styles.btn}>
              <Button
                text={"Validate & Save"}
                color={color}
                onClick={handleValidateJson}
                width={"150px"}
              />
            </div>
          </div>
        </>
      ) : (
        <div className={styles.onDataSave}>Data saved Successfully</div>
      )}
    </div>
  );
};
