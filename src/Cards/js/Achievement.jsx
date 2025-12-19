"use client";

import styles from "../css/CardAchievement.module.css";
import * as Icons from "../../utils/icons.jsx";

export const CardAchievement = ({ title, metric, description, iconName }) => {
  return (
    <div className={styles.achievement}>
      {iconName && Icons[iconName] && (
        <div className={styles.icon}>{Icons[iconName]}</div>
      )}

      <div className={styles.content}>
        {metric && <div className={styles.metric}>{metric}</div>}

        <h4 className={styles.title}>{title}</h4>

        {description && <p className={styles.description}>{description}</p>}
      </div>
    </div>
  );
};

/**


{
  label: "2023",
  side: "right",
  component: {
    type: "achievement",
    data: {
      title: "Active Users",
      value: "10,000+",
      context: "Within first 6 months",
      emphasized: true
    }
  }
}



 */
