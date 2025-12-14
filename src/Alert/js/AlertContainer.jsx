"use client"

import { Alert } from "./Alert.jsx";
import style from "../css/Alert.module.css";

/**
 * AlertContainer component to render a list of Alert components.
 *
 * This component receives an array of alert objects and maps them to individual
 * Alert components. Each alert can be dismissed individually, either manually
 * or automatically, triggering the `removeAlert` callback.
 *
 * Alerts are stacked vertically with a configurable gap (default: 60px).
 *
 * @component
 *
 * @param {Object} props - Component props
 * @param {Array<Object>} props.alertContainer - Array of alert objects to display.
 *   Each alert object should have the following structure:
 *   @param {string} alert.id - Unique identifier for the alert.
 *   @param {string} alert.message - Text message to display in the alert.
 *   @param {('success'|'error'|'info'|'warning')} alert.type - Type of the alert.
 * @param {function} props.removeAlert - Callback function invoked with the alert's `id`
 *   when it is dismissed.
 *
 * @example
 * const alerts = [
 *   { id: '1', message: 'Data saved!', type: 'success' },
 *   { id: '2', message: 'Error occurred', type: 'error' }
 * ];
 *
 * <AlertContainer
 *   alertContainer={alerts}
 *   removeAlert={(id) => console.log('Remove alert', id)}
 * />
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
