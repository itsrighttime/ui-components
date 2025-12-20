import style from "../css/CardTextOn.module.css";

/**
 * CardTextOn component to display a card with author, date, description, and an image.
 *
 * This component supports horizontal, vertical, or square orientation and allows
 * customizing text color and card border radius. Optionally, it can display a
 * Product ID below the card.
 *
 * @component
 *
 * @param {Object} props - Component props
 * @param {string} props.authorName - Name of the author to display as the card title.
 * @param {string} props.date - Date to display on the card.
 * @param {string} props.img - URL of the image to display on the card.
 * @param {string} props.desc - Description text for the card content.
 * @param {string|null} [props.productID=null] - Optional product ID to display below the card.
 * @param {('H'|'V'|'S')} [props.orientation='H'] - Card orientation: Horizontal ('H'), Vertical ('V'), or Square ('S').
 * @param {string} [props.colorName='white'] - Name of the color for text elements. Maps to a color code via `getColorCode`.
 * @param {string} [props.borderRadius='10px'] - Border radius for the card container.
 *
 * @example
 * <CardTextOn
 *   authorName="Jane Doe"
 *   date="2025-12-14"
 *   img="https://example.com/article.jpg"
 *   desc="This is a description for the article card."
 *   productID="PROD123"
 *   orientation="V"
 *   colorName="cyan"
 *   borderRadius="12px"
 * />
 */
export const CardTextOn = ({
  authorName,
  date,
  img,
  desc,
  productID = null,
  orientation = "H",
  colorText = "white",
  colorTitle = "white",
  borderRadius = "10px",
}) => {
  const orientCss =
    orientation === "V"
      ? "vertical"
      : orientation === "H"
      ? "horizontal"
      : "square";

  return (
    <>
      <div className={`${style.mainBox}  ${style[orientCss]}`}>
        <div className={style.articleCard} style={{ borderRadius }}>
          <div className={style.content}>
            <p style={{ color: colorText }} className={style.date}>
              {date}
            </p>
            <p style={{ color: colorTitle }} className={style.title}>
              {authorName}
            </p>
            <p style={{ color: colorText }} className={style.desc}>
              {desc}
            </p>
          </div>
          <img src={img} alt="article-cover" />
        </div>

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
