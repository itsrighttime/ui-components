import styles from "../css/CardProduct.module.css";

export const CardProduct = ({
  name,
  version,
  status = "released",
  tagline,
  highlights,
  links,
}) => {
  return (
    <div className={styles.product}>
      <div className={styles.header}>
        <div className={styles.titleBlock}>
          <h4 className={styles.name}>{name}</h4>
          {version && <span className={styles.version}>{version}</span>}
        </div>

        <span className={`${styles.status} ${styles[status]}`}>{status}</span>
      </div>
      {tagline && <p className={styles.tagline}>{tagline}</p>}

      {highlights && highlights.length > 0 && (
        <ul className={styles.highlights}>
          {highlights.map((change, index) => (
            <li key={index}>{change}</li>
          ))}
        </ul>
      )}

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
  side: "left",
  component: {
    type: "product",
    data: {
      name: "letsSecure",
      version: "v1.0",
      status: "released",
      changes: [
        "Authentication & Authorization engine",
        "Subscription lifecycle management",
        "Audit-ready compliance logs"
      ],
      emphasis: true
    }
  }
}

*/
