import { AlertContainer } from "../../Alert/js/AlertContainer.jsx";
import { useAlerts } from "../../Hooks/useAlert.js";

const UseAlertsExample = () => {
  const { alertContainer, addAlert, removeAlert } = useAlerts();

  return (
    <>
      {/* Component - 1  */}
      <div style={{ padding: "40px" }}>
        <button onClick={() => addAlert("This is a success alert!", "success")}>
          Show Success Alert
        </button>
        <button onClick={() => addAlert("Something went wrong!", "error")}>
          Show Error Alert
        </button>
        <AlertContainer
          alertContainer={alertContainer}
          removeAlert={removeAlert}
        />
      </div>

      {/* Component - 2  */}
      <div style={{ padding: "40px" }}>
        <button onClick={() => addAlert("This is a success alert!", "success")}>
          Show Success Alert
        </button>
        <button onClick={() => addAlert("Something went wrong!", "error")}>
          Show Error Alert
        </button>
        <AlertContainer
          alertContainer={alertContainer}
          removeAlert={removeAlert}
        />
      </div>
    </>
  );
};

export default UseAlertsExample;
