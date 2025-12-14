"use client";

import styles from "../css/Footer.module.css";
import { getFooterBrands } from "../helper/footer.config.js";
import { BRANDS_PROPS_KEYS as BPK } from "../helper/KEYS.js";
import { Category } from "./Category.jsx";

/**
 * Footer Component
 *
 * Renders the website footer with multiple brand categories.
 *
 * Props:
 * @param {Array<Object>} brands - Array of brand objects containing name, logo, tagline, links, contact info, and social media.
 * @param {Object} baseURLs - Base URLs used by `getFooterBrands` to resolve brand links.
 *
 * Notes:
 * - Each brand is rendered using the `Category` component.
 * - Footer also displays a copyright notice with the current year.
 *
 * @example
 * Example usage:
 * <Footer brands={brandsArray} baseURLs={{ home: "/", contact: "/contact" }} />
 */

export const Footer = ({ brands = [], baseURLs }) => {
  const brandsToRender = getFooterBrands(brands, baseURLs);

  return (
    <footer className={styles.footer}>
      {brandsToRender.map((brand, index) => (
        <Category
          name={brand[BPK.name]}
          key={index}
          logo={brand[BPK.logo]}
          tagLine={brand[BPK.tagLine]}
          links={brand[BPK.tabs]}
          contactus={brand[BPK.contactus]}
          socialMedia={brand[BPK.socialMedia]}
          getInTouch={brand[BPK.getInTouch]}
        />
      ))}

      <p className={styles.copyright}>
        Copyright © {new Date().getFullYear()} itsRIGHTtime. All rights
        reserved.
      </p>
    </footer>
  );
};
