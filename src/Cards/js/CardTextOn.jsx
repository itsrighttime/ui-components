import { getColorCode } from "../../utils/COLOR.js";
import style from "../css/CardTextOn.module.css";

/**
 * CardTextOn Component
 *
 * Text-overlay card component featuring image, author name, date, and optional product ID.
 * Suited for content previews, blog cards, or testimonial sections.
 *
 * @component
 * @param {string} authorName - The name or title of the content creator.
 * @param {string} date - Display date, usually publication or creation date.
 * @param {string} img - Background image.
 * @param {string} desc - Short content summary or context text.
 * @param {string|null} [productID=null] - Optional unique product ID or identifier.
 * @param {'H'|'V'|'S'} [orientation="H"] - Card layout type: Horizontal, Vertical, or Square.
 * @param {'cyan'|'red'|'yellow'|'green'|'blue'|'gray' | 'white' | 'black'} [colorName="white"] - The border theme color.
 * @param {string} [borderRadius="10px"] - Border Radius.
 *
 * @returns {JSX.Element}
 */

export const CardTextOn = ({
  authorName,
  date,
  img,
  desc,
  productID = null,
  orientation = "H",
  colorName = "white",
  borderRadius = "10px",
}) => {
  const orientCss =
    orientation === "V"
      ? "vertical"
      : orientation === "H"
      ? "horizontal"
      : "square";

  const color = getColorCode(colorName);

  return (
    <>
      <div className={`${style.mainBox}  ${style[orientCss]}`}>
        <div className={style.articleCard} style={{ borderRadius }}>
          <div className={style.content}>
            <p style={{ color }} className={style.date}>
              {date}
            </p>
            <p style={{ color }} className={style.title}>
              {authorName}
            </p>
            <p style={{ color }} className={style.desc}>
              {desc}
            </p>
          </div>
          <img src={img} alt="article-cover" />
        </div>

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
