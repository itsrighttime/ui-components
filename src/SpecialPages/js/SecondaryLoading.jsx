import React from "react";
import { CubesLoader } from "./LoadingStyle.jsx";

/**
 * SecondaryLoading Component
 *
 * Displays a full-screen loading overlay using the CubesLoader animation.
 * Useful for secondary or full-page loading states.
 *
 * @example
 * Usage:
 * <SecondaryLoading />
 */

export const SecondaryLoading = () => {
  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <CubesLoader />
    </div>
  );
};
