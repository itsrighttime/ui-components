import { Button } from "../../../InputFields/Actions/jsx/Button";
import { IconButton } from "../../../InputFields/Actions/jsx/IconButton";
import { arrowLeftIcon, arrowRightIcon, crossIcon } from "../../../utils/icons";
import styles from "../css/GenericForm.module.css";
import { FIELDS_PROPS as FPs } from "../validation/helper/fields";

export function FormFooter({
  mode,
  config,
  currentStep,
  color,
  submitLabel,
  next,
  back,
  handleSubmit,
  clearFormPersistence,
}) {
  return (
    <div className={styles.footer}>
      {mode === "multi" && config[FPs.STEP].length > 1 ? (
        <div className={styles.stepButtons}>
          {currentStep > 0 && (
            <IconButton
              icon={arrowLeftIcon}
              label="Back"
              onClick={back}
              size="2"
              color={color}
            />
          )}

          <IconButton
            icon={crossIcon}
            label="Clear Every Thing"
            onClick={clearFormPersistence}
            size="2"
            color={'var(--colorRed)'}
          />

          {currentStep < config[FPs.STEP].length - 1 ? (
            <IconButton
              icon={arrowRightIcon}
              label="Next"
              onClick={next}
              size="2"
              color={color}
            />
          ) : (
            <Button text={submitLabel} onClick={handleSubmit} color={color} />
          )}
        </div>
      ) : (
        <Button text={submitLabel} onClick={handleSubmit} color={color} />
      )}

      {mode === "multi" && (
        <>
          <div className={styles.progressBarWrapper}>
            <div
              className={styles.progressBar}
              style={{
                width: `${
                  ((currentStep + 1) / config[FPs.STEP].length) * 100
                }%`,
                backgroundColor: color,
              }}
            />
          </div>
          <div className={styles.progressStatus}>
            Step {currentStep + 1} of {config[FPs.STEP].length}
          </div>
        </>
      )}
    </div>
  );
}
