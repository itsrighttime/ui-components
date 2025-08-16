import { useState } from "react";
import { PasswordField } from "../../InputFields/Security/jsx/PasswordField";
import { TextField } from "../../InputFields/TextInput/jsx/TextField";
import styles from "../css/LoginForm.module.css";
import { Button } from "../../InputFields/Actions/jsx/Button";
import { PlainButton } from "../../InputFields/Actions/jsx/PlainButton";
import { IconButton } from "../../InputFields/Actions/jsx/IconButton";
import { screenModeIcon } from "../../utils/icons";
import { workspaceLabels } from "../../Layout/Workspace/helper/workspaceLabels";

const ExtraButtons = ({ handleForgotId, handleForgotPassword }) => (
  <div className={styles.extra}>
    {handleForgotId && (
      <PlainButton
        text={"Oops! I forgot my ID"}
        color={"var(--colorGray4)"}
        onClick={handleForgotId}
      />
    )}
    {handleForgotPassword && (
      <PlainButton
        text={"Ahh! I forgot my password"}
        color={"var(--colorGray4)"}
        onClick={handleForgotPassword}
      />
    )}
  </div>
);

export const LoginForm = ({
  handleToggleFullscreen = null,
  handleForgotId = null,
  handleForgotPassword = null,
  handleRegister = null,
  handleLogin = (id, password) => {
    console.warn("handle Login is passed as the prop");
  },
  formTitle = "Welcome Back",
  formIcon = null,
  errorMsg = "",
}) => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className={styles.loginFormWrapper}>
      {handleToggleFullscreen && (
        <div className={styles.extraIcons}>
          <IconButton
            icon={screenModeIcon}
            label={workspaceLabels.toggleFullscreen}
            onClick={handleToggleFullscreen}
            size={1.2}
            color={"var(--colorRed)"}
          />
        </div>
      )}
      <div className={styles.loginForm}>
        <div className={styles.formMeta}>
          {formIcon && <img src={formIcon} className={styles.formIcon} />}
          <p className={styles.title}>{formTitle}</p>
        </div>
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
            {handleRegister ? (
              <Button
                text={"Register"}
                onClick={handleRegister}
                isBackground={false}
              />
            ) : (
              <ExtraButtons
                handleForgotId={handleForgotId}
                handleForgotPassword={handleForgotPassword}
              />
            )}
          </div>
          {handleRegister && (
            <ExtraButtons
              handleForgotId={handleForgotId}
              handleForgotPassword={handleForgotPassword}
            />
          )}
        </div>
        {errorMsg && <p className={styles.error}>{errorMsg}</p>}
      </div>
    </div>
  );
};
