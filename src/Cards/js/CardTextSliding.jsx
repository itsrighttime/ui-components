"use client";

import { Link } from "../../InputFields/Actions/jsx/Link.jsx";
import { Button } from "../../InputFields/Actions/jsx/Button.jsx";
import { getColorCode } from "../../utils/COLOR.js";
import style from "../css/CardTextSliding.module.css";
// import { Button } from "../../InputFields";
/**
 * CardTextSliding component to display a sliding card with image, product name, description, and action button.
 *
 * This component supports vertical, horizontal, or square orientations and allows
 * customizing text color, border radius, and optional Product ID. The card includes
 * a background image with sliding content overlay and an action button.
 *
 * @component
 *
 * @param {Object} props - Component props
 * @param {string} props.img - URL of the background image for the card.
 * @param {string} props.productName - Name of the product displayed as the card title.
 * @param {string} props.desc - Description text for the product.
 * @param {function|string} [props.setResult="#"] - Function or link to handle the action button click.
 * @param {string|null} [props.productID=null] - Optional product ID displayed below the card.
 * @param {string} props.colorName - Name of the color for text and button accents. Maps to a color code via `getColorCode`.
 * @param {('V'|'H'|'S')} [props.orientation='V'] - Card orientation: Vertical ('V'), Horizontal ('H'), or Square ('S').
 * @param {string} [props.borderRadius='10px'] - Border radius for the card container.
 *
 * @example
 * <CardTextSliding
 *   img="https://example.com/product.jpg"
 *   productName="Smart Gadget"
 *   desc="A high-tech gadget with innovative features."
 *   setResult={() => console.log('Get Expert View clicked')}
 *   productID="PROD456"
 *   colorName="blue"
 *   orientation="H"
 *   borderRadius="12px"
 * />
 */
export const CardTextSliding = ({
  img,
  productName,
  desc,
  link = "#",
  productID = null,
  colorLink = "var(--colorCyan)",
  orientation = "V",
  borderRadius = "10px",
  linkLabel,
}) => {
  const cardContentCss = `${style.cardContent} ${style.flow}`;
  const cardContentContainerCss = `${style.cardContentContainer} ${style.flow}`;
  const orientCss =
    orientation === "V"
      ? "vertical"
      : orientation === "H"
      ? "horizontal"
      : "square";

  const cssVariable = {
    "--color": colorLink,
  };

  return (
    <>
      <div
        className={`${style.mainBox} ${style[orientCss]}`}
        style={cssVariable}
      >
        {/* Main Card Continer */}
        <article className={style.card} style={{ borderRadius }}>
          {/* Background Image */}
          <img
            className={style.cardBackground}
            src={img}
            alt=""
            // width="1920"
            // height="2193"
          />

          {/* Content Section */}
          <div className={cardContentCss}>
            <div className={cardContentContainerCss}>
              <h2 className={`${style.cardTitle}`}>{productName}</h2>
              <p className={style.cardDescription}>{desc}</p>
            </div>
            {linkLabel && (
              <div className={style.cardButton}>
                <Link text={linkLabel} url={link} color={colorLink} />
              </div>
            )}
          </div>
        </article>

        {/* For product ID */}
        {productID == null ? (
          <></>
        ) : (
          <p className={style.productID}>{productID}</p>
        )}
      </div>
    </>
  );
};
