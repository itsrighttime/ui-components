import { Button } from "../../../InputFields/Actions/jsx/Button.jsx";
import styles from "../css/ShowError.module.css"; // Reuse styles for wrapper and list

export const SuccessMessage = ({
  message = "Form submitted successfully!",
  color = "var(--colorGreen)",
  onHomeClick,
  title = "Success!",
}) => {
  return (
    <div className={styles.errorList}>
      <p className={styles.title} style={{ color }}>
        {title}
      </p>
      <p className={styles.message}>{message}</p>
      <Button color={color} text="Go to Home" onClick={onHomeClick} />
    </div>
  );
};
