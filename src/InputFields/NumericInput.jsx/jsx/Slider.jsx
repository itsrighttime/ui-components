import { useState, useEffect, useRef } from "react";
import styles from "../css/Slider.module.css";
import { minusIcon, plusIcon } from "../../../utils/icons.jsx";
import { IconButton } from "../../Actions/jsx/IconButton.jsx";

/**
 * Slider Component
 *
 * A customizable slider input component with optional plus/minus buttons,
 * dynamic background fill, label, min/max display, and value positioning.
 * Supports controlled value via `value` prop and notifies parent via `setResult`.
 *
 * @component
 *
 * @param {Object} props - Slider configuration props
 * @param {number} [props.value=0] - Initial slider value
 * @param {function} props.setResult - Callback invoked with the current slider value
 * @param {string} [props.color] - Slider color (fill and buttons)
 * @param {number} [props.min=0] - Minimum slider value
 * @param {number} [props.max=100] - Maximum slider value
 * @param {number} [props.step=1] - Step size for slider
 * @param {string} [props.label=""] - Label displayed above the slider
 * @param {boolean} [props.showRange=true] - Show min/max values next to the slider
 * @param {"none"|"left"|"right"|"top"|"bottom"} [props.showValueSide="none"] - Position of the current value relative to slider
 * @param {number} [props.precision=10] - Precision for rounding slider value
 * @param {string} [props.width="300px"] - Width of the slider component
 * @param {boolean} [props.required=false] - Mark slider as required (displays asterisk)
 *
 * @returns {JSX.Element} Rendered Slider component
 *
 * @example
 * <Slider
 *   value={50}
 *   setResult={(val) => console.log(val)}
 *   min={0}
 *   max={100}
 *   step={5}
 *   label="Volume"
 *   showRange
 *   showValueSide="right"
 *   color="#1E90FF"
 *   width="400px"
 *   required
 * />
 *
 * @notes
 * - Supports increment/decrement via plus and minus buttons.
 * - Updates slider background dynamically to reflect current value.
 * - `setResult` is called whenever the slider value changes.
 * - Handles rounding according to specified precision to avoid floating-point issues.
 */
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
  required = false,
}) => {
  const [sliderValue, setSlidervalue] = useState(value || 0);
  const sliderRef = useRef(null);

  useEffect(() => {
    if (value !== 0 && sliderValue === 0) setSlidervalue(value || 0);
  }, [value]);

  useEffect(() => {
    const updateSliderBackground = (value) => {
      const percentage = ((value - min) / (max - min)) * 100;
      if (sliderRef.current) {
        sliderRef.current.style.background = `linear-gradient(to right, ${
          color || `var(--colorCyan)`
        } ${percentage}%, var(--colorGray3) ${percentage}%)`;
      }
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
            ref={sliderRef}
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
          {required && <p className={styles.required}>*</p>}
        </div>
        {showValueSide !== "none" && (
          <div className={`${styles.sliderValue}`}>{sliderValue}</div>
        )}
      </div>
    </div>
  );
};
