import { useNavigate } from "react-router";
import { getProductLogo } from "../../../assets/productsLogo/productLogo.assets";
import styles from "../css/WorkspaceHomePage.module.css";
const { LEVELS, ZONES, POSITIONS } = workspaceLayoutKeys;

import { WorkspaceHomePageTabs } from "../helper/WorspaceHomePageTabs";
import { makeUrl } from "../helper/urlFormatter";
import { workspaceLayoutKeys } from "../helper/workspaceLayoutKeys";
import { useState } from "react";

export const WorkspaceHomePage = ({ apps = [], toggleFullscreen }) => {
  const navigate = useNavigate();
  const [productNotification, setProductNotification] = useState([]);

  const handleClick = (value) => {
    navigate(
      makeUrl(
        {
          level: LEVELS.primary,
          zone: ZONES.commandBar,
          position: POSITIONS.start,
          workspaceId: value,
          key: value,
        },
        true
      )
    );
  };

  return (
    <div className={styles.workspaceHomePage}>
      <WorkspaceHomePageTabs
        toggleFullscreen={toggleFullscreen}
        setProductNotification={setProductNotification}
      />

      <div className={styles.products}>
        {apps.map((value) => {
          const notification = productNotification[value];
          return (
            <div
              className={`${styles.product} ${
                notification ? styles.productNoti : ""
              }`}
              key={value}
              onClick={() => handleClick(value)}
            >
              {notification && (
                <span className={styles.notification}>{notification}</span>
              )}
              <img
                className={styles.image}
                src={getProductLogo(value)}
                alt=""
              />
              <p className={styles.name}>{value}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
