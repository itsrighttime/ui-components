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
 * Default Values:
 *  - type = "CubesLoader"
 *  - display = "top"
 *  - position = "relative"
 *  - windowHeight = "100vh"
 *  - windowWidth = "100vw"
 * type can be [CubesLoader || FoldingLoader || BounceLoader || PulseLoader || LoadingChat]
 * @param type Allow to change based on this
 * @param display Allow to chage type of Screen [top || block]
 * @param windowHeight Loading page Height
 * @param windowWidth Loading page Width
 * @returns jsx
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
