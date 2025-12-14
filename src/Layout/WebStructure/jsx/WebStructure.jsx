import { Footer } from "../../Footer/jsx/Footer.jsx";
import { Header } from "../../Header/jsx/Header.jsx";
import styles from "../css/WebStructure.module.css";

/**
 * WebStructure Component
 *
 * A layout component for standard web pages, providing a consistent
 * header, footer, and main content area.
 *
 * Props:
 * @param {React.ReactNode} children - The main content to render between the header and footer.
 * @param {Object} brandFooter - Configuration for the footer component.
 *   @property {Array} brands - Array of brand objects to render in the footer.
 *   @property {Object} baseURLs - Base URLs for brands.
 * @param {Object} brandHeader - Configuration for the header component.
 *   @property {Array} tabs - Array of tab objects { name, goTo } for navigation.
 *   @property {string} logoURL - URL of the logo image.
 *   @property {Object} defaultTab - Default active tab { name, goTo }.
 *   @property {number} breakpoint - Screen width to toggle mobile/desktop layout.
 *   @property {string} loginRegisterTabName - Name of the login/register tab.
 *   @property {string} loginRegisterURL - URL to navigate to for login/register.
 *   @property {string} color - Primary color for header elements.
 *   @property {string} brand - Brand name used for document title updates.
 *
 * Behavior:
 * - Renders a Header component at the top with navigation tabs and logo.
 * - Renders the `children` as the main content area.
 * - Renders a Footer component at the bottom with brand information.
 * - Provides a standard web page structure with consistent styling.
 */

export const WebStructure = ({ children, brandFooter, brandHeader }) => {
  return (
    <div className={styles.webStructure}>
      <div className={styles.header}>
        <Header
          tabs={brandHeader?.tabs}
          logoURL={brandHeader?.logoURL}
          defaultTab={brandHeader?.defaultTab}
          breakpoint={brandHeader?.breakpoint}
          loginRegisterTabName={brandHeader?.loginRegisterTabName}
          loginRegisterURL={brandHeader?.loginRegisterURL}
          color={brandHeader?.color}
          brand={brandHeader?.brand}
        />
      </div>
      <div className={styles.top} id="body-layout-scroll">
        <div className={styles.body}>{children}</div>
        <div className={styles.footer}>
          <Footer brands={brandFooter.brands} baseURLs={brandFooter.baseURLs} />
        </div>
      </div>
    </div>
  );
};
