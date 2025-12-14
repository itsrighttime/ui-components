"use client";

import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import style from "../css/Header.module.css";
import { crossIcon, linesIcon } from "./../../../utils/icons.jsx";
import { IconButton } from "../../../InputFields/Actions/jsx/IconButton.jsx";
import { redirectURL } from "../../../utils/redirectURL.js";
import { setDocumentTitle } from "../../../utils/setDocumentTitle.js";

/**
 * Header Component
 *
 * A responsive navigation header that displays a logo and tabs, supporting
 * dynamic active tab highlighting and small-screen toggle behavior.
 *
 * Props:
 * @param {Array<{name: string, goTo: string}>} tabs - Array of tab objects with `name` and `goTo` URL.
 * @param {string} logoURL - URL of the logo image to display in the header.
 * @param {{name: string, goTo: string}} defaultTab - Default active tab if no match with current URL.
 * @param {number} breakpoint - Screen width in pixels to switch to small screen layout (default: 800).
 * @param {string} loginRegisterTabName - Name of the login/register tab that triggers a redirect.
 * @param {string} loginRegisterURL - URL to navigate for login/register, with redirect back parameter.
 * @param {string} color - Primary color used for active tab highlighting and styling.
 * @param {string} brand - Brand name used for setting the document title.
 *
 * Behavior:
 * - Highlights the active tab based on the current URL path.
 * - On small screens (below `breakpoint`), toggles navigation menu with a hamburger icon.
 * - Clicking tabs updates the URL and active state; login/register tab triggers redirect with return URL.
 * - Updates document title to reflect the active tab and brand.
 * - Splits tabs into two columns for larger screen layouts.
 */

export const Header = ({
  tabs = [], // Example: [{ name: "Home", goTo: "/" }, { name: "About", goTo: "about" }]
  logoURL = "",
  defaultTab = { name: "Home", goTo: "/" },
  breakpoint = 800,
  loginRegisterTabName = "login/register",
  loginRegisterURL = "/login",
  color = "var(--colorRed)",
  brand = "itsRIGHTtime",
}) => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(
    window.innerWidth <= breakpoint
  );
  const [activeTab, setActiveTab] = useState(defaultTab.name);

  const navigate = useNavigate();
  const location = useLocation();

  // Handle resize for responsiveness
  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= breakpoint);
      if (window.innerWidth > breakpoint) {
        setIsNavOpen(true);
      } else {
        setIsNavOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Run on mount
    return () => window.removeEventListener("resize", handleResize);
  }, [breakpoint]);

  const setTab = (tab) => {
    setActiveTab(tab);
    setDocumentTitle(`${tab} | ${brand}`);
  };

  // Sync active tab based on URL path
  useEffect(() => {
    const [firstTab] = location.pathname.replace(/^\/+/, "").split("/"); // Remove leading slash
    const matchedTab = tabs.find((tab) => {
      const tabPath = tab.goTo.replace(/^\/+/, "");
      return firstTab === tabPath;
    });

    if (matchedTab) setTab(matchedTab.name);
    else setTab(defaultTab.name);
  }, [location.pathname, tabs, defaultTab, activeTab]);

  // Handle tab clicks
  const handleTabClick = (tab) => {
    const tabId = tab.name;

    if (tabId === loginRegisterTabName) {
      const currentUrl = window.location.href;
      redirectURL(
        `${loginRegisterURL}?redirectBack=${encodeURIComponent(currentUrl)}`
      );
    } else {
      navigate(tab.goTo.startsWith("/") ? tab.goTo : `/${tab.goTo}`);
      setTab(tab.name);
    }

    if (isSmallScreen) {
      setIsNavOpen(false);
    }
  };

  const getButtonStyle = (tabId) => ({
    color: activeTab === tabId ? color : "var(--colorSimple)",
    fontWeight: activeTab === tabId ? "var(--boldL3)" : "var(--bold)",
  });

  const tabsSize = Math.ceil(tabs.length / 2);

  const tabs1 = tabs.slice(0, tabsSize);
  let tabs2 = tabs.slice(tabsSize);

  // if (tabs1.length !== tabs2.length) tabs2.unshift("One");

  const cssVariable = {
    "--color": color,
    "--numOfColTab": tabsSize,
  };

  return (
    <>
      {/* Nav toggle button for small screens */}
      {isSmallScreen && (
        <div className={style.navShowHide} style={cssVariable}>
          {!isNavOpen ? (
            <div className={`${style.show}`}>
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
          )}
        </div>
      )}

      {/* Header container */}
      <div
        style={cssVariable}
        className={`${
          isSmallScreen
            ? style.headerContainerSmallScreen
            : style.headerContainerLargeScreen
        } ${isSmallScreen && isNavOpen ? style.headerOpen : style.headerClose}`}
      >
        {/* Logo */}
        <div className={style.logoImg} onClick={() => navigate("/")}>
          {logoURL && <img src={logoURL} alt="Logo" />}
        </div>

        {/* Tabs split into two parts for layout */}
        <div className={style.tabs}>
          <div className={style.tabs1}>
            {tabs1.map((tab) => (
              <div
                key={tab.name}
                className={style.tab}
                style={getButtonStyle(tab.name)}
                onClick={() => handleTabClick(tab)}
              >
                {tab.name}
              </div>
            ))}
          </div>
          <div className={style.tabs2}>
            {tabs2.map((tab) => (
              <div
                key={tab.name}
                className={style.tab}
                style={getButtonStyle(tab.name)}
                onClick={() => handleTabClick(tab)}
              >
                {tab.name}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
