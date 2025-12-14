"use client";

import { useState, useRef, useEffect } from "react";
import ReactDOM from "react-dom";
import styles from "../css/ToolTip.module.css";

const OFFSET = 15;

/**
 * Tooltip Component
 *
 * A cursor-following, portal-based tooltip component that displays
 * contextual content on hover with configurable delay, positioning,
 * and styling.
 *
 * The tooltip dynamically adjusts its position to remain within
 * the viewport and renders using `ReactDOM.createPortal` to avoid
 * layout and overflow issues.
 *
 * @component
 *
 * @param {Object} props - Component props
 *
 * @param {React.ReactNode} props.children
 * The element that triggers the tooltip on hover.
 *
 * @param {React.ReactNode|string} props.content
 * Content rendered inside the tooltip.
 *
 * @param {string} [props.color="#272626"]
 * Text color of the tooltip content.
 *
 * @param {string} [props.backgroundColor="#eceaea"]
 * Background color of the tooltip container.
 *
 * @param {string} [props.width="250px"]
 * CSS width of the tooltip. Passed as a CSS custom property.
 *
 * @param {number} [props.delay=1500]
 * Delay in milliseconds before the tooltip becomes visible on hover.
 *
 * @returns {JSX.Element} Tooltip wrapper with portal-rendered content
 *
 * @example
 * <Tooltip content="Smart tooltip near your cursor">
 *   <button>Hover me</button>
 * </Tooltip>
 *
 * @notes
 * - Tooltip follows the cursor and repositions using `requestAnimationFrame`
 * - Automatically flips between top and bottom when near viewport edges
 * - Pointer events are disabled on tooltip to avoid hover conflicts
 * - Cleans up timers on component unmount
 */
export const Tooltip = ({
  children,
  content,
  color = "#272626",
  backgroundColor = "#eceaea",
  width = "250px",
  delay = 1500,
}) => {
  const tooltipRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const [style, setStyle] = useState({});
  const [position, setPosition] = useState("bottom");
  const [mounted, setMounted] = useState(false); // ✅ Add mounted state
  const timerRef = useRef(null);

  // ✅ Set mounted on client-side only
  useEffect(() => {
    setMounted(true);
  }, []);

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
      color,
      backgroundColor,
      "--width": width,
    });

    setPosition(newPosition);
  };

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    requestAnimationFrame(() => updateTooltipPosition(clientX, clientY));
  };

  const handleMouseEnter = () => {
    timerRef.current = setTimeout(() => {
      setVisible(true);
    }, delay);
  };

  const handleMouseLeave = () => {
    clearTimeout(timerRef.current);
    setVisible(false);
  };

  useEffect(() => {
    return () => clearTimeout(timerRef.current); // cleanup on unmount
  }, []);

  return (
    <>
      <span
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onMouseMove={handleMouseMove}
        style={{ display: "inline-block" }}
      >
        {children}
      </span>

      {/* ✅ Only render portal when mounted (client-side) */}
      {mounted &&
        ReactDOM.createPortal(
          <div
            ref={tooltipRef}
            style={{
              ...style,
              opacity: visible ? 1 : 0,
              visibility: visible && content ? "visible" : "hidden",
              transition: "opacity 0.15s ease, visibility 0.15s ease",
            }}
            className={`${styles.tooltip} ${styles[position]}`}
          >
            {content}
          </div>,
          document.body
        )}
    </>
  );
};
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
