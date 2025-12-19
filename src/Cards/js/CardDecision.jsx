import styles from "../css/CardDecision.module.css";

export const CardDecision = ({
  decision,
  reason,
  impact,
  description,
}) => {
  return (
    <div className={styles.decision}>
      <h4 className={styles.decisionText}>{decision}</h4>
      {description && <p className={styles.description}>{description}</p>}

      {reason && (
        <p className={styles.reason}>
          <span>Why:</span> {reason}
        </p>
      )}

      {impact && (
        <p className={styles.impact}>
          <span>Impact:</span> {impact}
        </p>
      )}
    </div>
  );
};

/*-

{
  label: "2021",
  side: "left",
  component: {
    type: "decision",
    data: {
      decision: "Shifted to compliance-first architecture",
      reason: "Enterprise clients required audit-ready systems",
      impact: "Platform redesign with security and legal separation",
      emphasis: true
    }
  }
}

*/
