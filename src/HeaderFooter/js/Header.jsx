"use client";

import React, { useEffect, useState } from "react";
import style from "../css/Header.module.css";
import { crossIcon, linesIcon, redirectURL } from "../../utils/icons.jsx";
import { useLocation, useNavigate } from "react-router";
import { IconButton } from "../../InputFields/Actions/jsx/IconButton.jsx";

/**
 * resolveStringToId
 *
 * Utility function to normalize tab labels into
 * lowercase, whitespace-free identifiers.
 *
 * @param {string} str - Input string to normalize
 * @returns {string} Normalized string ID
 */

const resolveStringToId = (str) => str.replace(/\s+/g, "").toLowerCase();

/**
 * Header Component
 *
 * Responsive navigation header component that renders a logo and
 * a set of navigation tabs with active-state handling and
 * mobile-friendly toggle behavior.
 *
 * The header adapts its layout based on a configurable breakpoint,
 * supports URL-synced active tab state, and handles special redirect
 * flows (e.g., login/register via external auth proxy).
 *
 * @component
 *
 * @param {Object} props - Component props
 *
 * @param {string[]} [props.tabs=[]]
 * List of tab labels displayed in the header navigation.
 * Each label is normalized to a route-friendly ID.
 *
 * @param {string|Object} [props.logoURL={}]
 * Source URL for the header logo image.
 *
 * @param {string} [props.defaultTab="home"]
 * Default active tab when the route path is `/`.
 *
 * @param {number} [props.breakpoint=800]
 * Screen width (in pixels) at which the header switches
 * between mobile and desktop layouts.
 *
 * @returns {JSX.Element} Responsive navigation header
 *
 * @example
 * <Header
 *   logoURL="/logo.svg"
 *   tabs={[
 *     "Home",
 *     "About",
 *     "Projects",
 *     "Login/Register"
 *   ]}
 *   defaultTab="home"
 * />
 *
 * @notes
 * - Automatically syncs active tab with `react-router` location
 * - Splits tabs into two columns for large-screen layouts
 * - Collapsible navigation for small screens
 * - Handles external auth redirection for `login/register`
 */

const Header = ({
  tabs = [],
  logoURL = {},
  defaultTab = "home",
  breakpoint = 800,
}) => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const [activeTab, setActiveTab] = useState(defaultTab);

  const handleTabClick = (tab) => {
    if (tab === "login/register") {
      const IRT_APP_PROXY = process.env.REACT_APP_IRTAPP_PROXY;
      const currentUrl = window.location.href;
      redirectURL(
        `${IRT_APP_PROXY}/login?redirectBack=${encodeURIComponent(currentUrl)}`
      );
    } else navigate(`/${tab}`);

    setActiveTab(tab);

    if (window.innerWidth < breakpoint) {
      setIsNavOpen(false);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > breakpoint) {
        setIsNavOpen(true);
        setIsSmallScreen(false);
      } else {
        setIsSmallScreen(true);
        setIsNavOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [breakpoint, setIsNavOpen, setIsSmallScreen]);

  useEffect(() => {
    if (window.innerWidth > breakpoint) setIsSmallScreen(false);
    else setIsSmallScreen(true);
  }, [breakpoint]);

  // Update activeTab when the URL changes
  useEffect(() => {
    if (location.pathname === "/") {
      setActiveTab(defaultTab);
    } else {
      const pathArray = location.pathname.split("/").filter(Boolean);
      const firstPart = pathArray[0];

      if (activeTab !== firstPart) {
        setActiveTab(firstPart);
      }
    }
  }, [location, activeTab, defaultTab, setActiveTab]);

  const getButtonStyle = (tabId) => ({
    color: activeTab === tabId ? "var(--colorRed)" : "var(--colorSimple)",
    fontWeight: activeTab === tabId ? "var(--boldL3)" : "var(--bold)",
  });

  return (
    <>
      <div className={style.navShowHide}>
        {isSmallScreen &&
          (!isNavOpen ? (
            <div className={`${style.show} ${!isNavOpen ? "open" : ""}`}>
              <IconButton
                icon={linesIcon}
                onClick={() => setIsNavOpen(true)}
                style={{ border: "none" }}
                size="1.5"
              />
            </div>
          ) : (
            <div className={style.hide}>
              <IconButton
                icon={crossIcon}
                onClick={() => setIsNavOpen(false)}
                style={{ border: "none" }}
                size="1.5"
              />
            </div>
          ))}
      </div>

      <div
        className={`${
          isSmallScreen
            ? style.headerContainerSmallScreen
            : style.headerContainerLargeScreen
        } ${isSmallScreen && isNavOpen ? style.headerOpen : style.headerClose}`}
      >
        <div className={style.logoImg}>
          {logoURL && <img src={logoURL} alt="Logo" />}
        </div>
        <div className={`${style.tabs}`}>
          <div className={`${style.tabs1}`}>
            {tabs.slice(0, Math.ceil(tabs.length / 2)).map((tab) => (
              <div
                key={tab}
                className={style.tab}
                style={getButtonStyle(resolveStringToId(tab))}
                onClick={() => handleTabClick(resolveStringToId(tab))}
              >
                {tab}
              </div>
            ))}
          </div>
          <div className={`${style.tabs2}`}>
            {tabs.slice(Math.ceil(tabs.length / 2)).map((tab) => (
              <div
                key={tab}
                className={style.tab}
                style={getButtonStyle(resolveStringToId(tab))}
                onClick={() => handleTabClick(resolveStringToId(tab))}
              >
                {tab}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
