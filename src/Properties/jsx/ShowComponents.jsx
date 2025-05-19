import React from "react";
import styles from "../css/ShowComponents.module.css";

const fields = [
  {
    Text: [
      { key: "A026", value: "Label" },
      { key: "A025", value: "Text Field" },
      { key: "A024", value: "Text Area" },
      { key: "A034", value: "JSON" },
    ],
  },
  {
    Number: [
      { key: "A013", value: "Number" },
      { key: "A014", value: "Slider" },
      { key: "A015", value: "Stepper" },
    ],
  },
  {
    Actions: [
      { key: "A002", value: "Button" },
      { key: "A003", value: "Icon Button" },
      { key: "A005", value: "Image Button" },
      { key: "A004", value: "Link" },
    ],
  },
  {
    Upload: [
      { key: "A026", value: "File Upload" },
      { key: "A030", value: "Image Upload" },
      { key: "A028", value: "Audio Upload" },
      { key: "A031", value: "Video Upload" },
    ],
  },
  {
    Security: [
      { key: "A016", value: "OTP" },
      { key: "A017", value: "Password" },
      { key: "A018", value: "Security Question" },
    ],
  },
  {
    Selector: [
      { key: "A019", value: "Check Box" },
      { key: "A020", value: "Dropdown" },
      { key: "A021", value: "Radio" },
      { key: "A023", value: "Switch" },
      { key: "A022", value: "Search" },
      { key: "A035", value: "Color Picker" },
    ],
  },
  {
    Communication: [
      { key: "A006", value: "Email Id" },
      { key: "A007", value: "Mobile No." },
    ],
  },
  {
    "Date Time": [
      { key: "A010", value: "Date" },
      { key: "A011", value: "Time" },
      { key: "A009", value: "Calendar" },
    ],
  },
  { Location: [{ key: "A012", value: "Address" }] },
];

const ShowComponents = ({ setFieldId, color }) => {
  const cssVariables = {
    "--color": color || `var(--colorCyan)`,
  };

  return (
    <div className={styles.showComponents} style={cssVariables}>
      {fields.map((field) => {
        const key = Object.keys(field)[0];

        return (
          <div key={key} className={styles.fieldLabel}>
            <p className={styles.label}>{key}</p>
            <div className={styles.fields}>
              {field[key].map((component) => {
                return (
                  <div
                    key={`${key}-${component.key}`}
                    className={styles.component}
                    onClick={() => setFieldId(component.key)}
                  >
                    {component.value}
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ShowComponents;
