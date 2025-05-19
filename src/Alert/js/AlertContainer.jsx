import React from "react";
import Alert from "./Alert";
import style from "../css/Alert.module.css";

const AlertContainer = ({ alertContainer, removeAlert }) => {
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

export default AlertContainer;
