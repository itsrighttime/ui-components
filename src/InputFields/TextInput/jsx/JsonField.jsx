import { useEffect, useState } from "react";
import { TextArea } from "./TextArea";
import { Button } from "../../Actions/jsx/Button";
import styles from "../css/JsonField.module.css";
import { getCommonCssVariables } from "../../helper/getCommonCssVariables";

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
}) => {
  const [jsonInput, setJsonInput] = useState("");
  const [error, setError] = useState("");
  const [onSave, setOnSave] = useState(true);
  const [formattedJson, setFormattedJson] = useState("");

  useEffect(() => {
    setResult(formattedJson);
  }, [formattedJson, setResult]);

  const handleValidateJson = () => {
    try {
      const parsedJson = JSON.parse(jsonInput);
      setError("");
      setIsFieldValid(true);

      // Format the JSON with indentation (pretty print)
      const prettyJson = JSON.stringify(parsedJson, null, 2);
      setFormattedJson(prettyJson);
      setJsonInput(prettyJson);
      console.log("Formatted JSON:", prettyJson);
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
              placeholder="Please input the JSON data here..."
              showCharacterCount={showCharacterCount}
              showWordCount={showWordCount}
              backendError={backendError}
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
