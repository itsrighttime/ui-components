import { Button } from "../../../InputFields/Actions/jsx/Button";
import styles from "../css/ShowError.module.css"; // Reuse styles for wrapper and list

export const SuccessMessage = ({ message = "Form submitted successfully!", color = "var(--colorGreen)", onHomeClick }) => {
  return (
    <div className={styles.errorListWrapper}>
      <div className={styles.errorList}>
        <p className={styles.title} style={{ color }}>
          Success!
        </p>
        <p className={styles.message}>
          {message}
        </p>
        <Button
          color={color}
          text="Go to Home"
          onClick={onHomeClick}
        />
      </div>
    </div>
  );
};
