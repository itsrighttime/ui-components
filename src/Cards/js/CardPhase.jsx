import styles from "../css/CardPhase.module.css";

export const CardPhase = ({ title, period = "~", description, highlights }) => {
  return (
    <div className={styles.phase}>
      <div className={styles.header}>
        <h4 className={styles.title}>{title}</h4>
        <span className={styles.duration}>{period}</span>
      </div>

      {description && <p className={styles.description}>{description}</p>}

      {highlights && highlights.length > 0 && (
        <ul className={styles.highlights}>
          {highlights.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

/*

{
  label: "2018–2020",
  side: "left",
  component: {
    type: "phase",
    data: {
      title: "Foundation Phase",
      from: "2018",
      to: "2020",
      summary: "Focused on research, experimentation, and team building.",
      highlights: [
        "Core team formed",
        "First MVP launched",
        "Early user feedback collected"
      ]
    }
  }
}


*/
