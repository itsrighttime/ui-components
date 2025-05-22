import { EmailField } from "../../InputFields/CommunicationInput/jsx/EmailInput";
import { MobileField } from "../../InputFields/CommunicationInput/jsx/MobileInput";
import { JsonField } from "../../InputFields/TextInput/jsx/JsonField";
import { Label } from "../../InputFields/TextInput/jsx/Label";
import { TextArea } from "../../InputFields/TextInput/jsx/TextArea";
import { TextField } from "../../InputFields/TextInput/jsx/TextField";

export const UseCommunicationExample = () => {
  return (
    <div style={{ display: "flex", gap: "20px", width: "100%" }}>
      <EmailField
        setResult={(value) => {
          console.log(value);
        }}
      />
      <MobileField
        setResult={(value) => {
          console.log(value);
        }}
      />

      <TextField
        setResult={(value) => {
          console.log(value);
        }}
        showCharacterCount={true}
      />
      <JsonField
        setResult={(value) => {
          console.log(value);
        }}
        setIsFieldValid={() => {}}
        showCharacterCount
        showWordCount
      />
      <TextArea
        setResult={(value) => {
          console.log(value);
        }}
        setIsFieldValid={() => {}}
      />
      <Label text={"Label"} />
    </div>
  );
};
