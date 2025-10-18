import styles from "../css/Footer.module.css";
import { getFooterBrands } from "../helper/footer.config";
import { BRANDS_PROPS_KEYS as BPK } from "../helper/KEYS";
import { Category } from "./Category";

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
