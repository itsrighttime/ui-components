"use client";

import { useRef, useState, useEffect } from "react";
import styles from "../css/TimeLineVertical.module.css";
import { getColor } from "../helper/colorHelper.js";
import { TimelineContentRenderer } from "../helper/TimelineContentRenderer.jsx";
import { useMediaQuery } from "../../Hooks/useMediaQuery.js";
import { useScrollPoints } from "../../Hooks/useScrollPoints.js";
import { useOutsideClick } from "../../Hooks/useOutsideClick.js";

/**
 * VerticalTimeline Component
 *
 * Renders a configurable vertical timeline with optional alternating sides,
 * responsive layout handling, scroll-based navigation, and a sticky label panel.
 *
 * @component
 *
 * @param {Object} props
 * @param {Object} props.config - Configuration object for the timeline
 * @param {"left"|"right"|"center"|"custom"} [props.config.layout="center"]
 *        Determines the base layout of the timeline.
 *        - "center": Alternates items left/right (default)
 *        - "left": All items appear on the right
 *        - "right": All items appear on the left
 *        - "custom": Each item controls its own side
 * @param {boolean} [props.config.alternate=true]
 *        Whether items should alternate sides when layout is "center"
 * @param {Array<Object>} props.config.data
 *        Timeline items to render
 * @param {string} props.config.data[].label - Label shown beside the timeline node
 * @param {React.ReactNode|Object} props.config.data[].component
 *        Content rendered inside the timeline item
 * @param {"left"|"right"} [props.config.data[].side]
 *        Used only when layout is "custom"
 * @param {string} [props.config.data[].radius]
 *        Custom radius for the timeline node
 * @param {Object} [props.config.meta]
 *        Metadata configuration
 * @param {string} [props.config.meta.timeLineBtnLabel]
 *        Label for the sticky timeline button
 *
 * @returns {JSX.Element} Rendered VerticalTimeline component
 */

export const VerticalTimeline = ({ config = {} }) => {
  const {
    layout: layout_ = "center",
    alternate = true,
    data,
    meta = {},
  } = config;

  const scrollLabelRef = useRef();
  const { containerRef, registerPoint, scrollTo, isContainerVisible } =
    useScrollPoints();
  const isMobile = useMediaQuery(650);
  const layout = isMobile && layout_ === "center" ? "right" : layout_;

  const [showLabels, setShowLabels] = useState(false);

  useOutsideClick(scrollLabelRef, () => {
    setShowLabels(false);
  });

  return (
    <>
      {/* Timeline */}
      <div
        ref={containerRef}
        className={`${styles.verticalTimeline} ${styles[layout]}`}
      >
        {data.map((item, index) => {
          const resolvedSide =
            layout === "custom"
              ? item.side
              : layout === "center"
              ? alternate
                ? index % 2 === 0
                  ? "left"
                  : "right"
                : item.side || "right"
              : layout === "left"
              ? "right"
              : "left";

          const { color, previousColor } = getColor(index);

          return (
            <div key={index} ref={registerPoint(index)}>
              <TimeLineVertical_
                colorSelf={color}
                colorTop={previousColor}
                radius={item.radius}
                component={item.component}
                side={resolvedSide}
                label={item.label}
              />
            </div>
          );
        })}
      </div>

      {/* Sticky Button */}
      {isContainerVisible && (
        <button
          className={styles.timelineStickyButton}
          onClick={() => setShowLabels((p) => !p)}
        >
          {meta.timeLineBtnLabel || "View Timeline"}
        </button>
      )}

      {/* Labels Panel */}
      {showLabels && (
        <div className={styles.timelineLabelPanel} ref={scrollLabelRef}>
          {data.map((item, index) => (
            <button
              key={index}
              onClick={() => scrollTo(index)}
              className={styles.timelineLabelItem}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </>
  );
};

const TimeLineVertical_ = ({
  colorSelf = "var(--colorCyan)",
  colorTop = "var(--colorDarkBlue)",
  radius = "40px",
  component,
  side = "right",
  label = "YEAR",
}) => {
  const cssVariable = {
    "--colorSelf": colorSelf,
    "--colorTop": colorTop,
    "--radius": radius,
  };

  const component_ = <TimelineContentRenderer component={component} />;

  return (
    <div className={styles.timeline} style={cssVariable}>
      <div className={styles.top}>
        <div
          className={`${styles.topLeft} ${
            side === "left" ? styles.border : ""
          }`}
        >
          {side === "left" && component_}
        </div>
        <div
          className={`${styles.topRight} ${
            side === "right" ? styles.border : ""
          }`}
        >
          {side === "right" && component_}
        </div>
      </div>
      <div className={styles.bottom}>
        <div className={styles.bottomLeft}></div>
        <div className={styles.bottomRight}></div>
      </div>
      <div className={styles.circle}></div>
      <p className={side === "left" ? styles.labelRight : styles.labelLeft}>
        {label}
      </p>
    </div>
  );
};
