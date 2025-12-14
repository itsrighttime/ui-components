import { useState } from "react";
import { PasswordField } from "../../InputFields/Security/jsx/PasswordField.jsx";
import { TextField } from "../../InputFields/TextInput/jsx/TextField.jsx";
import styles from "../css/LoginForm.module.css";
import { Button } from "../../InputFields/Actions/jsx/Button.jsx";
import { PlainButton } from "../../InputFields/Actions/jsx/PlainButton.jsx";
import { IconButton } from "../../InputFields/Actions/jsx/IconButton.jsx";
import { screenModeIcon } from "../../utils/icons.jsx";
import { workspaceLabels } from "../../Layout/Workspace/helper/workspaceLabels.js";

/**
 * ExtraButtons Component
 *
 * Renders secondary action buttons for login-related recovery flows
 * such as "Forgot ID" and "Forgot Password".
 *
 * Buttons are rendered conditionally based on the availability
 * of their respective handler functions.
 *
 * @component
 *
 * @param {Object} props - Component props
 * @param {Function|null} props.handleForgotId - Callback triggered when "Forgot ID" is clicked
 * @param {Function|null} props.handleForgotPassword - Callback triggered when "Forgot Password" is clicked
 *
 * @returns {JSX.Element}
 */

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

/**
 * LoginForm Component
 *
 * A reusable authentication form for user login workflows.
 * Supports optional fullscreen toggle, registration flow,
 * password/ID recovery actions, and error display.
 *
 * Designed to be flexible for multiple authentication contexts
 * within the workspace ecosystem.
 *
 * @component
 *
 * @param {Object} props - Component props
 *
 * @param {Function|null} [props.handleToggleFullscreen=null]
 * Callback for toggling fullscreen / screen mode.
 *
 * @param {Function|null} [props.handleForgotId=null]
 * Callback for handling "Forgot ID" recovery flow.
 *
 * @param {Function|null} [props.handleForgotPassword=null]
 * Callback for handling "Forgot Password" recovery flow.
 *
 * @param {Function|null} [props.handleRegister=null]
 * Callback for navigating to the registration flow.
 *
 * @param {Function} [props.handleLogin]
 * Login handler invoked with user credentials.
 * @param {string} id - User-entered identifier
 * @param {string} password - User-entered password
 *
 * @param {string} [props.formTitle="Welcome Back"]
 * Title text displayed at the top of the login form.
 *
 * @param {string|null} [props.formIcon=null]
 * Optional image source for the form icon / logo.
 *
 * @param {string} [props.errorMsg=""]
 * Error message displayed below the form when login fails.
 *
 * @returns {JSX.Element} Rendered login form UI
 *
 * @example
 * <LoginForm
 *   handleLogin={(id, password) => authenticate(id, password)}
 *   handleForgotPassword={openForgotPasswordModal}
 * />
 *
 * @example
 * <LoginForm
 *   formTitle="Sign in to WorkSpace"
 *   formIcon="/logo.svg"
 *   handleRegister={navigateToRegister}
 *   handleToggleFullscreen={toggleFullscreen}
 * />
 */
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
