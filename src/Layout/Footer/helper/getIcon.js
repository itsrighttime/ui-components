import {
  socialFacebookIcon,
  socialGitHubIcon,
  socialInstaIcon,
  socialLinkedinIcon,
  socialPinterestIcon,
  socialXIcon,
  socialYouTubeIcon,
  squareFilledIcon,
} from "../../../utils/icons.jsx";

const SM = {
  facebook: "facebook",
  github: "github",
  instagram: "instagram",
  linkedin: "linkedin",
  pinterest: "pinterest",
  x: "x",
  youtube: "youtube",
};

export const getIcon = (key) => {
  const iconMap = {
    [SM.facebook]: socialFacebookIcon,
    [SM.github]: socialGitHubIcon,
    [SM.instagram]: socialInstaIcon,
    [SM.linkedin]: socialLinkedinIcon,
    [SM.pinterest]: socialPinterestIcon,
    [SM.x]: socialXIcon,
    [SM.youtube]: socialYouTubeIcon,
  };

  return iconMap[key] || squareFilledIcon;
};

export const SOCIAL_MEDIA_KEYS = SM;
