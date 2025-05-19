import { useState, useRef } from "react";
import styles from "../css/ToolTip.module.css";

const OFFSET = 12;

const Tooltip = ({
  children,
  content,
  color = "#272626",
  backgroundColor = "#eceaea",
}) => {
  const tooltipRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const [style, setStyle] = useState({});
  const [position, setPosition] = useState("bottom"); // "top" or "bottom"

  const updateTooltipPosition = (x, y) => {
    const tooltip = tooltipRef.current;
    if (!tooltip) return;

    const { innerWidth: winW, innerHeight: winH } = window;
    const rect = tooltip.getBoundingClientRect();

    let top = y + OFFSET;
    let left = x;
    let newPosition = "bottom";

    if (y + OFFSET + rect.height > winH) {
      if (y - OFFSET - rect.height > 0) {
        top = y - OFFSET - rect.height;
        newPosition = "top";
      } else {
        top = Math.max(winH - rect.height - 5, 5);
      }
    }

    left = x - rect.width / 2;
    if (left + rect.width > winW) {
      left = winW - rect.width - 5;
    } else if (left < 0) {
      left = 5;
    }

    setStyle({
      position: "fixed",
      top,
      left,
      zIndex: 9999,
      pointerEvents: "none",
      opacity: 1,
      color,
      backgroundColor,
    });

    setPosition(newPosition);
  };

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    requestAnimationFrame(() => updateTooltipPosition(clientX, clientY));
  };

  return (
    <span
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
      onMouseMove={handleMouseMove}
      style={{ position: "relative" }}
    >
      {children}
      {visible && content && (
        <div
          ref={tooltipRef}
          style={style}
          className={`${styles.tooltip} ${styles[position]}`}
        >
          {content}
        </div>
      )}
    </span>
  );
};

export default Tooltip;

/*

import Tooltip from "./Tooltip";
import "./tooltip.css";

function App() {
  return (
    <div style={{ padding: 80 }}>
      <Tooltip content="Smart tooltip near your cursor!" >
        <button>Hover me</button>
      </Tooltip>
    </div>
  );
}


*/
