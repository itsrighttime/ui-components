import { useState } from "react";
import { ColorPicker } from "../../InputFields/Selectors/jsx/ColorPicker.jsx";
import { Dropdown } from "../../InputFields/Selectors/jsx/Dropdown.jsx";
import { RadioGroup } from "../../InputFields/Selectors/jsx/RadioGroup.jsx";
import { SearchBox } from "../../InputFields/Selectors/jsx/SearchBox.jsx";
import { Switch } from "../../InputFields/Selectors/jsx/Switch.jsx";
import { CheckboxGroup } from "../../InputFields/Selectors/jsx/CheckboxGroup.jsx";

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

  const suggestions = [
    { name: "Apple", code: "APL1" },
    { name: "Apple", code: "APL2" },
    { name: "Apple", code: "APL3" },
    { name: "Apple", code: "APL4" },
    { name: "Apple", code: "APL5" },
    { name: "Apple", code: "APL6" },
    { name: "Banana", code: "BNN" },
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
      <ColorPicker color="#ff0000" setResult={(color) => console.log(color)} />

      <Dropdown
        label="Choose Option(s)"
        options={["Apple", "Banana", "Orange"]}
        multiple={true}
        placeholder="Select fruits"
        value={["Apple"]}
        setResult={setSelected}
        addNew={true}
        setAddedOptions={(newOptions) =>
          console.log("Updated Options:", newOptions)
        }
        color="#3498db"
        width="350px"
      />

      <SearchBox
        suggestions={suggestions}
        setResult={(code) => console.log(code)}
        placeholder="Search fruits..."
        color="#52c9bd"
      />

      <Switch
        initialValue={false}
        setResult={(state) => console.log("Switch is", state)}
        label="Enable dark mode"
        color="#222"
        customStyles={{
          container: { marginBottom: "1rem" },
          label: { fontWeight: "bold" },
        }}
      />
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
