import styles from "../css/CardEvent.module.css";

export const CardEvent = ({ name, date, location, description, links }) => {
  return (
    <div className={styles.event}>
      <div className={styles.header}>
        <div className={styles.meta}>
          <h4 className={styles.name}>{name}</h4>
          {location && <span className={styles.location}>{location}</span>}
        </div>
        <span className={styles.date}>{date}</span>
      </div>

      {description && <span className={styles.description}>{description}</span>}

      {links && links.length > 0 && (
        <ul className={styles.links}>
          {links.map((link, index) => (
            <a key={index} href={link.href} className={styles.link}>
              {link.label}
            </a>
          ))}
        </ul>
      )}
    </div>
  );
};

/*

{
  label: "2023",
  side: "right",
  component: {
    type: "event",
    data: {
      name: "Public Beta Launch",
      date: "June 2023",
      location: "Online",
      outcome: "1,000+ signups in first week",
      emphasis: true
    }
  }
}

*/
