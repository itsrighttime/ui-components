import { Alert } from "./Alert";
import style from "../css/Alert.module.css";

/**
 * AlertContainer Component - Displays multiple alert messages in a stacked layout.
 *
 * @component
 * @param {Object} props
 * @param {Array} props.alertContainer - Array of alert objects ({id, message, type}).
 * @param {Function} props.removeAlert - Function to remove an alert by ID.
 */

export const AlertContainer = ({ alertContainer, removeAlert }) => {
  return (
    <div className={style.alertContainer}>
      {alertContainer.map((alert, index) => (
        <Alert
          key={alert.id}
          message={alert.message}
          type={alert.type}
          onDismiss={() => removeAlert(alert.id)}
          style={{ top: `${index * 60}px` }} // Adjust the gap as needed
        />
      ))}
    </div>
  );
};
