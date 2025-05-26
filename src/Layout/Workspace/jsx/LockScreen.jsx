import { useState } from "react";
import styles from "../css/LockScreen.module.css";
import { OtpField } from "../../../InputFields/Security/jsx/OtpField";
import { PlainButton } from "../../../InputFields/Actions/jsx/PlainButton";

export const LockScreen = ({ onUnlock }) => {
  const [error, setError] = useState(null);

  const handleSubmit = (value) => {
    onUnlock();
  };

  return (
    <div className={styles.lockScreen}>
      <OtpField
        setResult={handleSubmit}
        codeToVerified={"123456"}
        setError={setError}
        isNumeric={false}
      />
      {error ? (
        <p className={styles.errorText}>Aahh!, Your bad try again</p>
      ) : (
        <p className={styles.text}>
          Enter Your<span className={styles.magicText}> Magic Phrase</span>,{" "}
          <PlainButton text={"Opps! I forgot it"} isUnderline />
        </p>
      )}
    </div>
  );
};
