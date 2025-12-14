import { IconButton } from "../../../InputFields/Actions/jsx/IconButton.jsx";
import { PlainButton } from "../../../InputFields/Actions/jsx/PlainButton.jsx";

import styles from "../css/Category.module.css";
import { useSmartNavigate } from "../../../Hooks/useSmartNavigate.js";
import { getIcon } from "../helper/getIcon.js";
import { getProductLogo } from "../../../assets/productsLogo/productLogo.assets.js";
import { BRANDS_PROPS_KEYS } from "../helper/KEYS.js";

/**
 * Category Component
 *
 * Renders a category card with optional logo, name, tagline, links, contact info, and social media icons.
 *
 * Props:
 * @param {string} logo - Key for the category logo, resolved via `getProductLogo`.
 * @param {string} name - Name of the category.
 * @param {string} tagLine - Tagline or description for the category.
 * @param {Array<Object>} links - Array of link objects, each containing a `name` and `goTo` property.
 * @param {Object} contactus - Contact information object containing optional `address`, `email`, and `mobile`.
 * @param {Array<Object>} socialMedia - Array of social media objects, each with `name` and `goTo`.
 * @param {Object} getInTouch - Optional call-to-action object with `name` and `goTo`.
 * @param {string} homeURL - URL to navigate when the logo is clicked.
 *
 * Notes:
 * - Clicking on logo, links, or social media icons uses `useSmartNavigate` for navigation.
 * - Links and social media buttons are rendered with `PlainButton` and `IconButton` respectively.
 *
 * @example
 * Example usage:
 * <Category
 *   logo="dev"
 *   name="Dev Team"
 *   tagLine="Build the future"
 *   links={[{ name: "Projects", goTo: "/projects" }]}
 *   contactus={{ email: "dev@example.com" }}
 *   socialMedia={[{ name: "twitter", goTo: "https://twitter.com/dev" }]}
 *   getInTouch={{ name: "Contact Us", goTo: "/contact" }}
 *   homeURL="/home"
 * />
 */

export const Category = ({
  logo,
  name,
  tagLine,
  links = [],
  contactus = {},
  socialMedia = [],
  getInTouch,
  homeURL = "/",
}) => {
  const handleNavigate = useSmartNavigate();

  return (
    <div className={styles.category}>
      <div className={styles.namelogo}>
        {logo && (
          <img
            src={getProductLogo(logo)}
            className={styles.logo}
            onClick={(e) => handleNavigate(e, homeURL)}
            alt={name || "Category Logo"}
          />
        )}
        {name && !logo && <p className={styles.name}>{name}</p>}
      </div>
      {tagLine && <p className={styles.taglLine}>{tagLine}</p>}
      {links.length > 0 && (
        <div className={styles.links}>
          {links.map((tab) => (
            <div key={tab[BRANDS_PROPS_KEYS.name]} className={styles.link}>
              <PlainButton
                style={{ textDecoration: "underline" }}
                color={"var(--colorGray5)"}
                text={tab[BRANDS_PROPS_KEYS.name]}
                onClick={(e) => handleNavigate(e, tab[BRANDS_PROPS_KEYS.goTo])}
              />
            </div>
          ))}
        </div>
      )}
      {contactus && (
        <div className={styles.contactus}>
          {contactus?.[BRANDS_PROPS_KEYS.address] && (
            <p className={styles.address}>
              {contactus[BRANDS_PROPS_KEYS.contactus]}
            </p>
          )}
          {contactus?.[BRANDS_PROPS_KEYS.email] && (
            <a href={`mailto:${contactus.email}`} className={styles.email}>
              {contactus[BRANDS_PROPS_KEYS.email]}
            </a>
          )}
          {contactus?.[BRANDS_PROPS_KEYS.mobile] && (
            <p className={styles.mobile}>
              {contactus[BRANDS_PROPS_KEYS.mobile]}
            </p>
          )}

          {getInTouch && (
            <PlainButton
              text={getInTouch[BRANDS_PROPS_KEYS.name]}
              onClick={(e) =>
                handleNavigate(e, getInTouch[BRANDS_PROPS_KEYS.goTo])
              }
              style={{ textDecoration: "underline" }}
              color={"var(--colorGray5)"}
            />
          )}
        </div>
      )}

      {socialMedia.length > 0 && (
        <div className={styles.socialMedia}>
          {socialMedia.map((tab) => (
            <div key={tab.name} className={styles.icon}>
              <IconButton
                color={"var(--colorGray5)"}
                icon={getIcon(tab.name)}
                size={1}
                isBorder
                onClick={(e) => handleNavigate(e, tab.goTo, true)}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
