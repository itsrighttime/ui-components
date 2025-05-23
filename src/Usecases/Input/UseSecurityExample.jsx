import { OtpField } from "../../InputFields/Security/jsx/OtpField";
import { PasswordField } from "../../InputFields/Security/jsx/PasswordField";
import { SecurityQuestion } from "../../InputFields/Security/jsx/SecurityQuestion";

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
