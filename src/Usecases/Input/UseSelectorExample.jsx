import { useState } from "react";
import { ColorPicker } from "../../InputFields/Selectors/jsx/ColorPicker";
import { Dropdown } from "../../InputFields/Selectors/jsx/Dropdown";
import { RadioGroup } from "../../InputFields/Selectors/jsx/RadioGroup";
import { SearchBox } from "../../InputFields/Selectors/jsx/SearchBox";
import { Switch } from "../../InputFields/Selectors/jsx/Switch";
import { CheckboxGroup } from "../../InputFields/Selectors/jsx/CheckboxGroup";

export const UseSelectorExample = () => {
  const [selected, setSelected] = useState("male");

  const options = [
    { label: "Male", value: "male" },
    { label: "Female", value: "female" },
    {
      label: "Other",
      value: "other",
      disabled: true,
      help: "Currently unavailable",
    },
  ];

  const [selectedCh, setSelectedCh] = useState(["react"]);

  const optionsCh = [
    { label: "React", value: "react", help: "Most used" },
    { label: "Vue", value: "vue", help: "Gaining popularity" },
    {
      label: "Angular",
      value: "angular",
      disabled: true,
      help: "Not preferred",
    },
  ];

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        width: "100%",
      }}
    >
      <ColorPicker />
      <Dropdown />
      <SearchBox />
      <Switch />

      <RadioGroup
        options={options}
        initialSelectedValue={selected}
        setResult={setSelected}
        label="Gender"
        // layout="horizontal"
        color="#007BFF"
        width="600px"
      />
      <p>Selected: {selected}</p>

      <CheckboxGroup
        options={optionsCh}
        initialSelectedValues={selectedCh}
        setResult={setSelectedCh}
        label="Frameworks"
        // layout="vertical"
        color="#00B894"
      />
      <p>Selected: {selectedCh.join(", ")}</p>
    </div>
  );
};
