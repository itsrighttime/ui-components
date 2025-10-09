import { IconButton } from "../../../InputFields/Actions/jsx/IconButton";
import { PlainButton } from "../../../InputFields/Actions/jsx/PlainButton";

import styles from "../css/Category.module.css";
import { useSmartNavigate } from "../../../Hooks/useSmartNavigate";
import { getIcon } from "../helper/getIcon";
import { getProductLogo } from "../../../assets/productsLogo/productLogo.assets";
import { BRANDS_PROPS_KEYS } from "../helper/KEYS";

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
