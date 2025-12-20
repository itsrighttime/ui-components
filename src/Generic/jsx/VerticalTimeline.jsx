"use client";

import { useRef, useState, useEffect } from "react";
import styles from "../css/TimeLineVertical.module.css";
import { getColor } from "../helper/colorHelper.js";
import { TimelineContentRenderer } from "../helper/TimelineContentRenderer.jsx";
import { useMediaQuery } from "../../Hooks/useMediaQuery.js";
import { useScrollPoints } from "../../Hooks/useScrollPoints.js";
import { useOutsideClick } from "../../Hooks/useOutsideClick.js";

// const { useMediaQuery } = MyHooks;

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
