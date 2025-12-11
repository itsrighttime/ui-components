import React, { useEffect, useState } from "react";
import style from "../css/Header.module.css";
import { crossIcon, linesIcon, redirectURL } from "../../utils/icons.jsx";
import { useLocation, useNavigate } from "react-router";
import { IconButton } from "../../InputFields/Actions/jsx/IconButton.jsx";

const resolveStringToId = (str) => str.replace(/\s+/g, "").toLowerCase();

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
