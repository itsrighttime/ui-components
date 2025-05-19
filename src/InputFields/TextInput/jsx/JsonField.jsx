import React, { useEffect, useState } from "react";
import TextArea from "./TextArea";
import { Button } from "../../Actions/jsx/Button";
import styles from "../css/JsonField.module.css";

const JsonField = ({
  label,
  setResult,
  setIsFieldValid,
  color,
  hideOnSave = false,
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
      hideOnSave && setOnSave(false);
    } catch (err) {
      setError("Invalid JSON format");
      setFormattedJson("");
      setIsFieldValid(false);
      setOnSave(true);
    }
  };

  return (
    <div className={styles.jsonField}>
      {onSave ? (
        <>
          <div className={styles.textInput}>
            <TextArea
              color={color}
              label={label}
              setResult={setJsonInput}
              placeholder="Please input the JSON data here..."
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

export default JsonField;
