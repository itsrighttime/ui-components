import { Button } from "../../InputFields/Actions/jsx/Button.jsx";
import { getColorCode } from "../../utils/COLOR.js";
import style from "../css/CardTextSliding.module.css";
// import { Button } from "../../InputFields";

/**
 * CardTextSliding Component
 *
 * A modern card with animated text overlay and CTA button.
 * Suitable for products, promotions, or interactive storytelling.
 *
 * @component
 * @param {string} imgP - Background image source.
 * @param {string} productName - Title or name of the product/content.
 * @param {string} desc - Description or details.
 * @param {Function|string} [setResult="#"] - Callback function or link to handle CTA click.
 * @param {string|null} [productID=null] - Optional product ID.
 * @param {'cyan'|'red'|'yellow'|'green'|'blue'|'gray' | 'white' | 'black'} [colorName="white"] - The border theme color.
 * @param {'H'|'V'|'S'} [orientation="V"] - Orientation type: Horizontal, Vertical, Square.
 * @param {string} [borderRadius="10px"] - Border Radius.
 *
 * @returns {JSX.Element}
 */

export const CardTextSliding = ({
  img,
  productName,
  desc,
  setResult = "#",
  productID = null,
  colorName,
  orientation = "V",
  borderRadius = "10px",
}) => {
  const cardContentCss = `${style.cardContent} | ${style.flow}`;
  const cardContentContainerCss = `${style.cardContentContainer} | ${style.flow}`;
  const orientCss =
    orientation === "V"
      ? "vertical"
      : orientation === "H"
      ? "horizontal"
      : "square";

  const color = getColorCode(colorName);

  const cssVariable = {
    "--color": color,
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
            <div className={style.cardButton}>
              <Button
                text={"Get Expert View"}
                setResult={setResult}
                color={color}
              />
            </div>
          </div>
        </article>

        {/* For product ID */}
        {productID == null ? (
          <></>
        ) : (
          <p className={style.productID}>~ Product ID: {productID}</p>
        )}
      </div>
    </>
  );
};
