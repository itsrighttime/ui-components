import { useState, useCallback } from "react";

/**
 * useAlerts - A custom React hook to manage a queue of alerts.
 *
 * @returns {{
 *   alertContainer: Array<{id: string, message: string, type: string}>,
 *   addAlert: (message: string, type: string) => void,
 *   removeAlert: (id: string) => void
 * }}
 */

export const useAlerts = () => {
  const [alertContainer, setAlertContainer] = useState([]);

  const addAlert = useCallback((message, type) => {
    const uniqueId = Date.now() + Math.random().toString(36).substring(2, 9);
    setAlertContainer((prevAlerts) => [
      ...prevAlerts,
      {
        id: uniqueId,
        message,
        type,
      },
    ]);
  }, []);

  const removeAlert = useCallback((id) => {
    setAlertContainer((prevAlerts) =>
      prevAlerts.filter((alert) => alert.id !== id)
    );
  }, []);

  return {
    alertContainer,
    addAlert,
    removeAlert,
  };
};

/*

import React from "react";
import useAlerts from "./hooks/useAlerts";
import AlertContainer from "./AlertContainer";

const MyComponent = () => {
  const { alertContainer, addAlert, removeAlert } = useAlerts();



  return (
    <div>
      <button onClick={() => addAlert("This is a warning!", "warning")}>
        Show Alert
      </button>

      <AlertContainer alertContainer={alertContainer} removeAlert={removeAlert} />
    </div>
  );
};

export default MyComponent;







*/
