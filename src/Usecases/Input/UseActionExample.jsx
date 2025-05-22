import img from "../../Images/danishan.jpeg";
import { Button } from "../../InputFields/Actions/jsx/Button";
import { IconButton } from "../../InputFields/Actions/jsx/IconButton";
import { ImageButton } from "../../InputFields/Actions/jsx/ImageButton";
import { Link } from "../../InputFields/Actions/jsx/Link";
import { resetFieldIcon } from "../../utils/icons";

export const UseActionExample = () => {
  return (
    <div style={{ display: "flex", gap: "20px" }}>
      <IconButton
        icon={resetFieldIcon}
        onClick={() => {
          console.log("Clicked");
        }}
        label={"This is a label"}
        size="2"
      />

      <Button text="Click Me" isBackground={true} />
      <div style={{ width: "200px", height: "200px" }}>
        <ImageButton text={"Image"} padding={"20px"} backgroundImage={img} />
      </div>

      <Link text={"This is a link"}/>
    </div>
  );
};
