import { getProductLogo } from "../../../assets/productsLogo/productLogo.assets";
import styles from "../css/Footer.module.css";
import { Category } from "./Category";

const logoIRT = getProductLogo("itsRIGHTtimeName");
const logo = getProductLogo("itsRIGHTtimeName");
export const Footer = ({ brand }) => {
  const logoBrand = brand?.logo
    ? brand.logo
    : getProductLogo(`${brand?.name}Name`);
  const tabs = [
    { name: "Home", goTo: "/" },
    { name: "About", goTo: "/about" },
    { name: "Contact", goTo: "/contact" },
    { name: "Protfolio", goTo: "/" },
    { name: "Great About", goTo: "/about" },
    { name: "Contact2", goTo: "/contact" },
  ];

  const socialMedia = [
    { name: "youtube", goTo: "/youtube" },
    { name: "linkedin", goTo: "/linkedin" },
    { name: "x", goTo: "/x" },
    { name: "facebook", goTo: "/facebook" },
    { name: "instagram", goTo: "/instagram" },
    { name: "github", goTo: "https://github.com" },
    { name: "pinterest", goTo: "/pinterest" },
  ];

  return (
    <div className={styles.footer}>
      <Category
        logo={logoBrand}
        // name={"itsRIGHTtime"}
        tagLine={brand?.tagLine}
        links={brand?.tabs}
        contactus={brand?.contactus}
        socialMedia={brand?.socialMedia}
        getInTouch={brand?.getInTouch}
      />
      {/* <Category
        logo={logo}
        // name={"itsRIGHTtime"}
        tagLine={"One Stop Solution for all Businesses"}
        links={tabs}
        contactus={{
          address: "Delhi, India, Asia",
          mobile: "+91 95405 14188",
          email: "info@itsrighttime.group",
        }}
        socialMedia={socialMedia}
        getInTouch={{ name: "Get In Touch", goTo: "/go" }}
      /> */}
      <Category
        logo={logoIRT}
        // name={"itsRIGHTtime"}
        tagLine={"One Stop Solution for all Businesses"}
        links={tabs}
        contactus={{
          address: "Delhi, India, Asia",
          mobile: "+91 95405 14188",
          email: "info@itsrighttime.group",
        }}
        socialMedia={socialMedia}
        getInTouch={{ name: "Get In Touch", goTo: "/go" }}
      />
      <p className={styles.copyright}>
        Copyright © 2025 itsRIGHTtime. All rights reserved.
      </p>
    </div>
  );
};
