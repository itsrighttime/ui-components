import { OtpField } from "../../InputFields/Security/jsx/OtpField.jsx";
import { PasswordField } from "../../InputFields/Security/jsx/PasswordField.jsx";
import { SecurityQuestion } from "../../InputFields/Security/jsx/SecurityQuestion.jsx";

export const UseSecurityExample = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        width: "100%",
      }}
    >
      <OtpField setResult={() => {}} />
      <PasswordField setResult={() => {}} />
      <SecurityQuestion setResult={() => {}} />
    </div>
  );
};
