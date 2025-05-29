import { useNavigate } from "react-router";
import { getProductLogo } from "../../../assets/productsLogo/productLogo.assets";
import styles from "../css/WorkspaceHomePage.module.css";
const { LEVELS, ZONES, POSITIONS } = workspaceLayoutKeys;

import { WorkspaceHomePageTabs } from "../helper/WorspaceHomePageTabs";
import { makeUrl } from "../helper/urlFormatter";
import { workspaceLayoutKeys } from "../helper/workspaceLayoutKeys";

export const WorkspaceHomePage = ({ apps = [], toggleFullscreen }) => {
  const navigate = useNavigate();

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
      <WorkspaceHomePageTabs toggleFullscreen={toggleFullscreen} />

      <div className={styles.products}>
        {apps.map((value) => {
          return (
            <div
              className={styles.product}
              key={value}
              onClick={() => handleClick(value)}
            >
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
