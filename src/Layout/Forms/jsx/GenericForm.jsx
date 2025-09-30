import { useState, useEffect } from "react";
import { FieldRenderer } from "./FieldRenderer";
import { Button } from "../../../InputFields/Actions/jsx/Button";
import styles from "../css/GenericForm.module.css";

export function GenericForm({
  config,
  onSubmit,
  submitLabel = "Submit",
  style,
  settings = {},
}) {
  const [formData, setFormData] = useState({});
  const [currentStep, setCurrentStep] = useState(0);
  const mode = config.mode || "single";

  const _settings = {
    showLabelAlways: settings?.showLabelAlways || false,
    gap: settings?.gap || "2rem",
    color: settings?.color || "var(--colorCyan)",
  };

  useEffect(() => {
    const initialState = {};
    const fields =
      mode === "multi" ? config.steps.flatMap((s) => s.fields) : config.fields;
    fields.forEach(
      (f) =>
        (initialState[f.name] = f.defaultValue || (f.repeatable ? [{}] : ""))
    );

    console.log("DDDD Generic Form", initialState);

    setFormData(initialState);
  }, [config, mode]);

  const handleChange = (name, value) => {
    console.log("DDDD ", name, value)
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const fieldsToRender =
    mode === "multi" ? config.steps[currentStep].fields : config.fields;

  const handleSubmit = async (e) => {
    e.preventDefault();
    await onSubmit(formData);
  };

  return (
    <form className={styles.form} style={style} onSubmit={handleSubmit}>
      {mode === "multi" && (
        <div className={styles.stepHeader}>
          <h2>{config.steps[currentStep].title}</h2>
          {config.steps[currentStep].description && (
            <p>{config.steps[currentStep].description}</p>
          )}
        </div>
      )}

      {fieldsToRender.map((field) => (
        <FieldRenderer
          key={field.name}
          field={field}
          value={formData}
          onChange={handleChange}
          settings={_settings}
        />
      ))}

      {mode === "multi" && config.steps.length > 1 && (
        <div className={styles.stepButtons}>
          {currentStep > 0 && (
            <Button
              text="Back"
              onClick={() => setCurrentStep((prev) => prev - 1)}
            />
          )}
          {currentStep < config.steps.length - 1 ? (
            <Button
              text="Next"
              onClick={() => setCurrentStep((prev) => prev + 1)}
            />
          ) : (
            <Button text={submitLabel} onClick={handleSubmit} />
          )}
        </div>
      )}

      {mode === "single" && (
        <Button text={submitLabel} onClick={handleSubmit} />
      )}
    </form>
  );
}
