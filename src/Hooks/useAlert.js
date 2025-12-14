import { useState, useCallback } from "react";

/**
 * useAlerts Hook
 *
 * Custom React hook for managing a queue-based alert system.
 *
 * Provides a simple API to add and remove alerts, each identified
 * by a unique ID. Designed for transient UI notifications such as
 * success messages, warnings, errors, or informational alerts.
 *
 * Alerts are stored in insertion order, making this hook suitable
 * for stacked or toast-style alert containers.
 *
 * @hook
 *
 * @returns {Object} Alert state and handlers
 *
 * @property {Array<{ id: string, message: string, type: string }>} alertContainer
 * Current list of active alerts.
 *
 * @property {Function} addAlert
 * Adds a new alert to the queue.
 * @param {string} message - Alert message to display
 * @param {string} type - Alert type (e.g., "success", "warning", "error", "info")
 *
 * @property {Function} removeAlert
 * Removes an alert from the queue by its unique ID.
 * @param {string} id - Unique identifier of the alert to remove
 *
 * @example
 * const { alertContainer, addAlert, removeAlert } = useAlerts();
 *
 * addAlert("Profile updated successfully", "success");
 *
 * @notes
 * - Each alert is assigned a unique ID using timestamp and random entropy
 * - `useCallback` is used to prevent unnecessary re-renders
 * - Intended to be used alongside a dedicated AlertContainer component
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
