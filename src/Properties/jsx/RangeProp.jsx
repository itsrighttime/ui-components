import React from "react";
import styles from "../css/PropsCss.module.css";
import Slider from "../../InputFields/NumericInput.jsx/jsx/Slider";
import Stepper from "../../InputFields/NumericInput.jsx/jsx/Stepper";

const RangeProp = ({
  inputType = "slider",
  label,
  setResult,
  color,
  showRange,
  showValueSide,
  min,
  max,
}) => {
  let component;

  switch (inputType) {
    case "stepper":
      component = (
        <Stepper
          min={min}
          max={max}
          label={label}
          setResult={setResult}
          color={color}
          step={1}
        />
      );
      break;
    default:
      component = (
        <Slider
          min={min}
          max={max}
          showRange={showRange}
          showValueSide={showValueSide}
          label={label}
          setResult={setResult}
          color={color}
        />
      );

      break;
  }

  return <div className={styles.rangeProp}>{component}</div>;
};

export default RangeProp;
