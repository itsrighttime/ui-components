import { NumberField } from "../../InputFields/NumericInput.jsx/jsx/NumberField.jsx";
import { Slider } from "../../InputFields/NumericInput.jsx/jsx/Slider.jsx";
import { Stepper } from "../../InputFields/NumericInput.jsx/jsx/Stepper.jsx";

export const UseNumberExample = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        width: "100%",
      }}
    >
      <Slider
        setResult={(value) => {
          console.log(value);
        }}
        min={0}
        max={100}
        step={1}
        label={"Slider"}
        showRange={true}
        showValueSide={"none"}
        precision={10}
      />
      <Stepper
        setResult={(value) => {
          console.log(value);
        }}
        min={0}
        max={100}
        step={5}
        label={"Stepper"}
      />
      <NumberField
        setResult={(value) => {
          console.log(value);
        }}
        label={"Number"}
        placeholder={"Enter a number"}
        decimalPlaces={2}
        maxIntegerDigits={10}
        isBorder={true}
        showLabelAlways={false}
        min={0}
        max={100}
      />
    </div>
  );
};
