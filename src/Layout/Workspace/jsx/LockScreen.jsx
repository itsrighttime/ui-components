"use client";

import { useState } from "react";
import styles from "../css/LockScreen.module.css";
import { OtpField } from "../../../InputFields/Security/jsx/OtpField.jsx";
import { PlainButton } from "../../../InputFields/Actions/jsx/PlainButton.jsx";
import { useAuth } from "../../../Context/jsx/AuthContext.jsx";

/**
 * LockScreen Component
 *
 * Displays a lock screen UI for user authentication using a magic phrase or OTP.
 *
 * Props:
 * @param {function} handleForgot - Callback function invoked when the user clicks "I forgot it".
 * @param {function} handleUnlock - Callback function invoked with the OTP/magic phrase value to unlock the screen.
 *
 * Behavior:
 * - Retrieves current user details from `useAuth` context.
 * - Renders an `OtpField` for the user to enter their magic phrase or OTP.
 * - Displays an error message if the entered value is incorrect.
 * - Provides a "Forgot it" button for handling recovery.
 * - If no user details are present, renders nothing.
 */
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
