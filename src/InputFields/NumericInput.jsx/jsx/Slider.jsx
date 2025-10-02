import { useState, useEffect } from "react";
import styles from "../css/Slider.module.css";
import { minusIcon, plusIcon } from "../../../utils/icons";
import { IconButton } from "../../Actions/jsx/IconButton";

export const Slider = ({
  value = 0,
  setResult,
  color,
  min = 0,
  max = 100,
  step = 1,
  label = "",
  showRange = true,
  showValueSide = "none",
  precision = 10,
  width = "300px",
}) => {
  const [sliderValue, setSlidervalue] = useState(value);

   useEffect(() => {
    if (value !== 0 && sliderValue === 0) setSlidervalue(value);
  }, [value]);

  useEffect(() => {
    const updateSliderBackground = (value) => {
      const percentage = ((value - min) / (max - min)) * 100;
      const slider = document.getElementById("slider");
      slider.style.background = `linear-gradient(to right, ${
        color || `var(--colorCyan)`
      } ${percentage}%, var(--colorGray3) ${percentage}%)`;
    };

    updateSliderBackground(sliderValue);
  }, [sliderValue, color, min, max]);

  const roundToPrecision = (value) => {
    return Math.round(value * precision) / precision;
  };

  const handleChange = (event) => {
    const newValue = parseFloat(event.target.value);
    if (!isNaN(newValue)) {
      setSlidervalue(roundToPrecision(newValue));
      setResult(newValue);
    }
  };

  const cssVariable = {
    "--color": color ? color : "var(--colorCyan)",
    "--width": width,
  };

  const handlePlus = () => {
    setSlidervalue((pre) => {
      if (pre + step < max) return roundToPrecision(pre + step);
      else return max;
    });
  };
  const handleMinus = () => {
    setSlidervalue((pre) => {
      if (pre - step > min) return roundToPrecision(pre - step);
      else return min;
    });
  };

  return (
    <div className={styles.sliderContainer} style={cssVariable}>
      {label && <label className={styles.sliderLabel}>{label}</label>}
      <div
        className={`${styles.inputOutputContainer} ${
          showValueSide === "left"
            ? styles.left
            : showValueSide === "right"
            ? styles.right
            : showValueSide === "top"
            ? styles.top
            : styles.bottom
        }`}
      >
        <div className={`${styles.inputContainer}`}>
          {
            <IconButton
              icon={minusIcon}
              onClick={handleMinus}
              color={color}
              style={{ border: "none", borderRadius: "50%" }}
            />
          }
          {showRange ? <p>{min}</p> : null}
          <input
            id="slider"
            type="range"
            value={sliderValue}
            onChange={handleChange}
            min={min}
            max={max}
            step={step}
            className={styles.slider}
          />
          {showRange ? <p>{max}</p> : null}
          <IconButton
            icon={plusIcon}
            onClick={handlePlus}
            color={color}
            style={{ border: "none", borderRadius: "50%" }}
          />
        </div>
        {showValueSide !== "none" && (
          <div className={`${styles.sliderValue}`}>{sliderValue}</div>
        )}
      </div>
    </div>
  );
};
