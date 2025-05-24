import * as Icons from "../../utils/icons"; // your icon file
import styles from "../css/IconGallery.module.css";
import { IconButton } from "../../InputFields/Actions/jsx/IconButton";
import { AlertContainer } from "../../Alert/js/AlertContainer";
import { useAlerts } from "../../Hooks/useAlert";

const IconGallery = () => {
  const { alertContainer, addAlert, removeAlert } = useAlerts();

  const copyToClipboard = (name) => {
    navigator.clipboard.writeText(name);
    console.log(`Copied: ${name}`);
    addAlert(`Copied: ${name}`, "success");
  };

  return (
    <>
      <AlertContainer
        alertContainer={alertContainer}
        removeAlert={removeAlert}
      />
      <div className={styles.iconGrid}>
        {Object.entries(Icons).map(([name, IconComponent]) => {
          return (
            <div
              key={name}
              onClick={() => copyToClipboard(name)}
              className={styles.iconCard}
            >
              <IconButton icon={IconComponent} size="2" />
              <div className={styles.iconName}>{name}</div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default IconGallery;
