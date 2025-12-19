import styles from "../css/CardMilestone.module.css";
import * as Icons from "../../utils/icons.jsx";

export const CardMilestone = ({
  title,
  description,
  iconName,
  link,
  subtitle,
}) => {
  return (
    <div className={styles.milestone}>
      {iconName && Icons[iconName] && (
        <div className={styles.icon}>{Icons[iconName]}</div>
      )}

      <div className={styles.content}>
        <h4 className={styles.title}>{title}</h4>

        {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
        {description && <p className={styles.description}>{description}</p>}

        {link && (
          <a href={link.href} className={styles.link}>
            {link.label}
          </a>
        )}
      </div>
    </div>
  );
};
