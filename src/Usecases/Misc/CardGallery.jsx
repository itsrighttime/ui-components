import styles from "./css/CardShowcase.module.css";
import { allCardsExample } from "./helper/allcardsExample.jsx";

export const CardShowcase = () => {
  return (
    <div className={styles.grid}>
      {allCardsExample.map((item, index) => (
        <div key={index} className={styles.cardWrapper}>
          <div className={styles.card}>{item.component}</div>
          <div className={styles.label}>{item.name}</div>
        </div>
      ))}
    </div>
  );
};
