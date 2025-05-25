import { IconButton } from "../../../InputFields/Actions/jsx/IconButton";
import { PlainButton } from "../../../InputFields/Actions/jsx/PlainButton";

export const Tab = ({ mykey, value, icon, onClick, color }) => {
  !onClick &&
    console.warn(
      "You have not pass the onClick in tabs of navigator. Kindly pass onClick"
    );

  //   console.log(icon);

  return icon ? (
    <IconButton
      icon={icon}
      label={value}
      color={color}
      size={1.4}
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
    />
  );
};
