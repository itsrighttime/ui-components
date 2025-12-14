import { useEffect, useState } from "react";
import { TextArea } from "./TextArea.jsx";
import { Button } from "../../Actions/jsx/Button.jsx";
import styles from "../css/JsonField.module.css";
import { getCommonCssVariables } from "../../helper/getCommonCssVariables.js";

/**
 * `JsonField` is a React component that allows users to input, validate, and format JSON data.
 * It provides a text area for raw JSON input, validation on save, and optional character/word count.
 *
 * @component
 *
 * @param {Object} props - Component props.
 * @param {string} [props.label] - Optional label displayed above the text area.
 * @param {function} props.setResult - Callback fired when JSON is successfully validated and formatted. Receives the formatted JSON string.
 * @param {function} props.setIsFieldValid - Callback to notify the parent about the validity of the field. Receives a boolean.
 * @param {string} [props.color] - Optional color for borders and buttons.
 * @param {boolean} [props.hideOnSave=false] - If true, hides the input area after successful validation and saving.
 * @param {boolean} [props.showCharacterCount=false] - If true, shows character count of the JSON input.
 * @param {boolean} [props.showWordCount=false] - If true, shows word count of the JSON input.
 * @param {string} [props.width="300px"] - Width of the component.
 * @param {boolean} [props.isBorder=false] - If true, displays border around the text area.
 * @param {string} [props.backendError=""] - Optional error message coming from backend validation.
 * @param {string} [props.value=""] - Initial JSON value for the input field.
 * @param {boolean} [props.required=false] - If true, marks the field as required.
 *
 * @example
 * <JsonField
 *   label="Configuration"
 *   setResult={(json) => console.log(json)}
 *   setIsFieldValid={(isValid) => console.log(isValid)}
 *   color="var(--colorCyan)"
 *   width="400px"
 *   showCharacterCount={true}
 *   showWordCount={true}
 *   required={true}
 * />
 *
 * @returns {JSX.Element} A JSON input field with validation, formatting, and optional save feedback.
 */
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
