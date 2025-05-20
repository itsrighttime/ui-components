import Tooltip from "./Tooltip";
import "./tooltip.css";

export const UseTooltipExample = () => {
  return (
    <div style={{ padding: 80 }}>
      <Tooltip content="Smart tooltip near your cursor!">
        <button>Hover me</button>
      </Tooltip>
    </div>
  );
};
