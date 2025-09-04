import { useNavigate } from "react-router";
import { IconButton } from "../../../InputFields/Actions/jsx/IconButton";
import { PlainButton } from "../../../InputFields/Actions/jsx/PlainButton";
import {
  socialFacebookIcon,
  socialGitHubIcon,
  socialInstaIcon,
  socialLinkedinIcon,
  socialPinterestIcon,
  socialXIcon,
  socialYouTubeIcon,
  squareFilledIcon,
} from "../../../utils/icons";
import styles from "../css/Category.module.css";

const getIcon = (key) => {
  const iconMap = {
    facebook: socialFacebookIcon,
    github: socialGitHubIcon,
    instagram: socialInstaIcon,
    linkedin: socialLinkedinIcon,
    pinterest: socialPinterestIcon,
    x: socialXIcon,
    youtube: socialYouTubeIcon,
  };

  return iconMap[key] || squareFilledIcon;
};

export const Category = ({
  logo,
  name,
  tagLine,
  links = [],
  contactus = {},
  socialMedia = [],
  getInTouch,
}) => {
  const navigate = useNavigate();

  const handleClick = (to) => {
    navigate(to);
  };
  const handleSocialMedia = (to) => {
    window.open(to, "_blank");
  };

  return (
    <div className={styles.category}>
      <div className={styles.namelogo}>
        {logo && (
          <img
            src={logo}
            className={styles.logo}
            onClick={() => {
              navigate("/");
            }}
            alt={name || "Category Logo"}
          />
        )}
        {name && <p className={styles.name}>{name}</p>}
      </div>
      {tagLine && <p className={styles.taglLine}>{tagLine}</p>}
      {links.length > 0 && (
        <div className={styles.links}>
          {links.map((tab) => (
            <div key={tab.name} className={styles.link}>
              <PlainButton
                style={{ textDecoration: "underline" }}
                color={"var(--colorGray5)"}
                text={tab.name}
                onClick={() => handleClick(tab.goTo)}
              />
            </div>
          ))}
        </div>
      )}
      {contactus && (
        <div className={styles.contactus}>
          {contactus?.address && (
            <p className={styles.address}>{contactus.address}</p>
          )}
          {contactus?.email && (
            <p className={styles.email}>{contactus.email}</p>
          )}
          {contactus?.mobile && (
            <p className={styles.mobile}>{contactus.mobile}</p>
          )}

          {getInTouch && (
            <PlainButton
              text={getInTouch.name}
              onClick={() => handleClick(getInTouch.goTo)}
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
                onClick={() => handleSocialMedia(tab.goTo)}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
