"use client";

import React, { lazy, Suspense, useEffect, useState } from "react";
import { SecondaryLoading } from "./SecondaryLoading.jsx";
import styles from "../css/Loading.module.css";

const CubesLoader = lazy(() =>
  import("./LoadingStyle.jsx").then((module) => ({
    default: module.CubesLoader,
  }))
);
const FoldingLoader = lazy(() =>
  import("./LoadingStyle.jsx").then((module) => ({
    default: module.FoldingLoader,
  }))
);
const BounceLoader = lazy(() =>
  import("./LoadingStyle.jsx").then((module) => ({
    default: module.BounceLoader,
  }))
);
const PulseLoader = lazy(() =>
  import("./LoadingStyle.jsx").then((module) => ({
    default: module.PulseLoader,
  }))
);
const LoadingChat = lazy(() =>
  import("./LoadingChat.jsx").then((module) => ({
    default: module.LoadingChat,
  }))
);

/**
 * Loading component to display a customizable loader with optional text.
 *
 * This component supports multiple loader types, optional display positions,
 * window sizing, and dynamic loading text animation with dots.
 *
 * @component
 *
 * @param {Object} props - Component props
 * @param {('CubesLoader'|'FoldingLoader'|'BounceLoader'|'PulseLoader'|'LoadingChat')} [props.type='CubesLoader'] - Type of loader to display.
 * @param {('top'|'center')} [props.display='top'] - Determines where the loader is displayed.
 * @param {('relative'|'absolute')} [props.position='relative'] - CSS position property for the loader container.
 * @param {string} [props.windowHeight='100%'] - Height of the loader container.
 * @param {string} [props.windowWidth='100%'] - Width of the loader container.
 * @param {string} [props.color] - Color for the loader component.
 * @param {boolean} [props.showText=false] - Whether to show loading text below the loader.
 * @param {string} [props.text='Loading'] - Text to display alongside the loading dots.
 *
 * @example
 * <Loading
 *   type="BounceLoader"
 *   display="top"
 *   position="relative"
 *   windowHeight="200px"
 *   windowWidth="200px"
 *   color="#00f"
 *   showText={true}
 *   text="Loading data"
 * />
 */
export const Loading = ({
  type = "CubesLoader",
  display = "top",
  position = "relative",
  windowHeight = "100%",
  windowWidth = "100%",
  color,
  showText = false,
  text = "Loading",
}) => {
  const [loadingText, setLoadingText] = useState("");

  useEffect(() => {
    const dots = ["", ".", "..", "..."];
    let index = 0;

    const intervalId = setInterval(() => {
      setLoadingText(dots[index]);
      index = (index + 1) % dots.length;
    }, 500);

    return () => clearInterval(intervalId);
  }, []);

  let LoaderComponent;

  switch (type) {
    case "CubesLoader":
      LoaderComponent = <CubesLoader color={color} />;
      break;
    case "FoldingLoader":
      LoaderComponent = <FoldingLoader color={color} />;
      break;
    case "BounceLoader":
      LoaderComponent = <BounceLoader color={color} />;
      break;
    case "PulseLoader":
      LoaderComponent = <PulseLoader color={color} />;
      break;
    case "LoadingChat":
      LoaderComponent = <LoadingChat color={color} />;
      break;
    default:
      LoaderComponent = <CubesLoader color={color} />;
  }

  const loadingStyle =
    display === "top" ? `${styles.loading} ${styles.top}` : styles.loading;

  const positionStyle =
    display === "top" && position === "relative"
      ? { position: "relative" }
      : { position: "absolute" };

  const cssVariables = {
    "--color": color || "var(--colorCyan)",
  };

  return (
    <div
      style={{
        height: windowHeight,
        width: windowWidth,
        ...positionStyle,
        ...cssVariables,
      }}
      className={loadingStyle}
    >
      <Suspense fallback={<SecondaryLoading />}>
        {LoaderComponent}
        {showText && (
          <div className={styles.loadingTextWrapper}>
            <p className={styles.text}>{text}</p>
            <p className={styles.loadingText}>{loadingText}</p>
          </div>
        )}
      </Suspense>
    </div>
  );
};
