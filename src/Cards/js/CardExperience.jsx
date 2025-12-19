import styles from "../css/CardExperience.module.css";

export const CardExperience = ({
  role,
  org,
  period = "~",
  responsibilities,
  skills,
  description,
}) => {
  return (
    <div className={styles.experience}>
      <div className={styles.header}>
        <div className={styles.titleBlock}>
          <h4 className={styles.role}>{role}</h4>
          {org && <span className={styles.organization}>{org}</span>}
        </div>

        <span className={styles.duration}>{period}</span>
      </div>
      {description && <span className={styles.description}>{description}</span>}

      {responsibilities && responsibilities.length > 0 && (
        <ul className={styles.responsibilities}>
          {responsibilities.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      )}

      {skills && skills.length > 0 && (
        <div className={styles.skills}>
          {skills.map((skill, index) => (
            <span key={index} className={styles.skill}>
              {skill}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

/*

{
  label: "2022",
  side: "right",
  component: {
    type: "experience",
    data: {
      role: "Senior Software Engineer",
      organization: "ABC Corp",
      from: "2022",
      responsibilities: [
        "Designed scalable frontend architecture",
        "Led security-first UI initiatives"
      ],
      skills: ["React", "TypeScript", "Security"],
      emphasis: true
    }
  }
}



*/
