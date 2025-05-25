import { IconButton } from "../../../InputFields/Actions/jsx/IconButton";
import { PlainButton } from "../../../InputFields/Actions/jsx/PlainButton";

export const Tab = ({ mykey, value, icon, onClick, color }) => {
  !onClick &&
    console.warn(
      "You have not pass the onClick in tabs of navigator. Kindly pass onClick"
    );

  let customStyle = {};
  if (mykey === "workspaceName" || mykey === "toggleFullscreen")
    customStyle = {
      textDecoration: "none",
      color: "var(--colorRed)",
      fontWeight: "700",
    };

  return icon ? (
    <IconButton
      icon={icon}
      label={value}
      color={mykey === "toggleFullscreen" ? "#ff5969" : color}
      size={1.2}
      onClick={() => {
        onClick(mykey);
      }}
    />
  ) : (
    <PlainButton
      text={value}
      onClick={() => {
        onClick(mykey);
      }}
      color={color}
      style={customStyle}
    />
  );
};
