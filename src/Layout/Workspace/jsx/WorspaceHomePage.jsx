"use client";

import { useNavigate } from "react-router";
import {
  getProductLogo,
  IMAGE_ASSETS_KEYS as IAK,
} from "../../../assets/productsLogo/productLogo.assets.js";
import styles from "../css/WorkspaceHomePage.module.css";
const { LEVELS, ZONES, POSITIONS } = workspaceLayoutKeys;

import { WorkspaceHomePageTabs } from "../helper/WorspaceHomePageTabs.jsx";
import { makeUrl } from "../helper/urlFormatter.js";
import { workspaceLayoutKeys } from "../helper/workspaceLayoutKeys.js";
import { useState } from "react";

/**
 * WorkspaceHomePage Component
 *
 * Renders the homepage for the workspace, displaying a list of available apps/products.
 * Provides navigation into individual workspace applications.
 *
 * Props:
 * @param {Array<string>} apps - List of workspace apps/products to display (e.g., ["letsSecure", "itsRIGHTtime"]).
 * @param {function} toggleFullscreen - Callback to toggle fullscreen mode for the workspace.
 *
 * State:
 * @state {Array|Object} productNotification - Tracks notifications for individual products (used to show badges or alerts).
 *
 * Behavior:
 * - Renders a `WorkspaceHomePageTabs` component for global navigation and controls.
 * - Displays each product/app as a clickable card with:
 *   - Product logo (`getProductLogo`)
 *   - Name
 *   - Optional notification badge if present in `productNotification`
 * - Clicking a product navigates to its workspace layout using `makeUrl` to format the route.
 *
 * Usage:
 * <WorkspaceHomePage
 *   apps={["letsSecure", "itsRIGHTtime", "CREATIVE"]}
 *   toggleFullscreen={handleFullscreenToggle}
 * />
 */
export const WorkspaceHomePage = ({ apps = [], toggleFullscreen }) => {
  const navigate = useNavigate();
  const [productNotification, setProductNotification] = useState([]);

  const handleClick = (value) => {
    navigate(
      makeUrl(
        {
          level: LEVELS.primary,
          zone: ZONES.commandBar,
          position: POSITIONS.start,
          workspaceId: value,
          key: value,
        },
        true
      )
    );
  };

  return (
    <div className={styles.workspaceHomePage}>
      <WorkspaceHomePageTabs
        toggleFullscreen={toggleFullscreen}
        setProductNotification={setProductNotification}
      />

      <div className={styles.products}>
        {apps.map((value) => {
          const notification = productNotification[value];
          return (
            <div
              className={`${styles.product} ${
                notification ? styles.productNoti : ""
              }`}
              key={value}
              onClick={() => handleClick(value)}
            >
              {notification && (
                <span className={styles.notification}>{notification}</span>
              )}
              <img
                className={styles.image}
                src={getProductLogo(value)}
                alt=""
              />
              <p className={styles.name}>{value}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
