import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import style from "../css/Header.module.css";
import { crossIcon, linesIcon } from "./../../../utils/icons";
import { IconButton } from "../../../InputFields/Actions/jsx/IconButton";
import { redirectURL } from "../../../utils/redirectURL";
import { setDocumentTitle } from "../../../utils/setDocumentTitle";

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
    const currentPath = location.pathname.replace(/^\/+/, ""); // Remove leading slash
    const matchedTab = tabs.find((tab) => {
      const tabPath = tab.goTo.replace(/^\/+/, "");
      return currentPath === tabPath;
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

  const cssVariable = {
    "--color": color,
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
        <div className={style.logoImg}>
          {logoURL && <img src={logoURL} alt="Logo" />}
        </div>

        {/* Tabs split into two parts for layout */}
        <div className={style.tabs}>
          <div className={style.tabs1}>
            {tabs.slice(0, Math.ceil(tabs.length / 2)).map((tab) => (
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
            {tabs.slice(Math.ceil(tabs.length / 2)).map((tab) => (
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
