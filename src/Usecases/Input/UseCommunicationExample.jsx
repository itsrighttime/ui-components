import { EmailField } from "../../InputFields/CommunicationInput/jsx/EmailInput";
import { MobileField } from "../../InputFields/CommunicationInput/jsx/MobileInput";
import { AddressField } from "../../InputFields/Location/jsx/AddressField";
import { JsonField } from "../../InputFields/TextInput/jsx/JsonField";
import { Label } from "../../InputFields/TextInput/jsx/Label";
import { TextArea } from "../../InputFields/TextInput/jsx/TextArea";
import { TextField } from "../../InputFields/TextInput/jsx/TextField";

export const UseCommunicationExample = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        width: "100%",
      }}
    >
      <EmailField
        setResult={(value) => {
          console.log(value);
        }}
        isBorder
      />
      <MobileField
        setResult={(value) => {
          console.log(value);
        }}
        isBorder
      />

      <TextField
        setResult={(value) => {
          console.log(value);
        }}
        showCharacterCount={true}
        isBorder
      />
      <JsonField
        setResult={(value) => {
          console.log(value);
        }}
        setIsFieldValid={() => {}}
        showCharacterCount
        showWordCount
        isBorder
      />
      <TextArea
        setResult={(value) => {
          console.log(value);
        }}
        setIsFieldValid={() => {}}
        isBorder
      />
      <Label text={"Label"} isBorder />

      <AddressField
        setResult={(value) => {
          console.log(value);
        }}
        isBorder
      />
    </div>
  );
};
