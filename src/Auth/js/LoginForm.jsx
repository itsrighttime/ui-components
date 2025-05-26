import { useState } from "react";
import { PasswordField } from "../../InputFields/Security/jsx/PasswordField";
import { TextField } from "../../InputFields/TextInput/jsx/TextField";
import styles from "../css/LoginForm.module.css";
import { Button } from "../../InputFields/Actions/jsx/Button";
import { handleRegister } from "../helper/handleRegister";
import { PlainButton } from "../../InputFields/Actions/jsx/PlainButton";
import { handleForgot } from "../helper/handleForgot";
import { useAuth } from "../../Context/jsx/AuthContext";

const ExtraButtons = ({}) => (
  <div className={styles.extra}>
    <PlainButton
      text={"Oops! I forgot my ID"}
      color={"var(--colorGray4)"}
      onClick={() => handleForgot()}
    />
    <PlainButton
      text={"Ahh! I forgot my password"}
      color={"var(--colorGray4)"}
      onClick={() => handleForgot()}
    />
  </div>
);

export const LoginForm = ({ api, isRegisterButton = true }) => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const { handleLogin } = useAuth();

  return (
    <div className={styles.loginFormWrapper}>
      <div className={styles.loginForm}>
        <p className={styles.title}>Login Page</p>
        <div className={styles.inputs}>
          <TextField
            label={"Any Valid Id"}
            placeholder={"Any Valid Id"}
            setResult={setId}
          />
          <PasswordField setResult={setPassword} />
        </div>
        <div className={styles.buttonsWrapper}>
          <div className={styles.buttons}>
            <Button text={"Login"} onClick={() => handleLogin(id, password)} />
            {isRegisterButton ? (
              <Button
                text={"Register"}
                onClick={handleRegister}
                isBackground={false}
              />
            ) : (
              <ExtraButtons />
            )}
          </div>
          {isRegisterButton && <ExtraButtons />}
        </div>
      </div>
    </div>
  );
};
