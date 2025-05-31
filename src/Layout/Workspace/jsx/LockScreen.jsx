import { useState } from "react";
import styles from "../css/LockScreen.module.css";
import { OtpField } from "../../../InputFields/Security/jsx/OtpField";
import { PlainButton } from "../../../InputFields/Actions/jsx/PlainButton";
import { useAuth } from "../../../Context/jsx/AuthContext";

export const LockScreen = ({ handleForgot, handleUnlock }) => {
  const [error, setError] = useState(null);
  const { userDetails } = useAuth();

  if (!userDetails) return <></>;

  const handleSubmit = (value) => {
    handleUnlock(value);
  };

  return (
    <div className={styles.lockScreen}>
      <OtpField
        setResult={handleSubmit}
        verifcationEndpoint={"/verify-otp"}
        userId={userDetails.user.userId}
        setError={setError}
        isNumeric={false}
      />
      {error ? (
        <p className={styles.errorText}>Aahh!, Your bad try again</p>
      ) : (
        <p className={styles.text}>
          Enter Your<span className={styles.magicText}> Magic Phrase</span>,{" "}
          <PlainButton
            text={"Opps! I forgot it"}
            isUnderline
            onClick={handleForgot}
          />
        </p>
      )}
    </div>
  );
};
