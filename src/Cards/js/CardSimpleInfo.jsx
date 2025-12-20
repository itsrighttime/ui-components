import style from "../css/CardSimpleInfo.module.css";

/**
 * CardSimpleInfo component to display a profile-style card with image, name, title, and description.
 *
 * This component renders a bordered card containing an image, a name, an optional title/position,
 * and a description. The card's border color, border radius, and image style can be customized.
 * If `colorName` is "gray", the image will be displayed in grayscale.
 *
 * @component
 *
 * @param {Object} props - Component props
 * @param {string} props.img - URL of the image to display in the card.
 * @param {string} props.name - Name text to display on the card.
 * @param {string} props.desc - Description text displayed below the name/title.
 * @param {string|null} [props.title=null] - Optional title or position displayed under the name.
 * @param {string} [props.colorName="cyan"] - Name of the color to use for border, text, and accents. Maps to a color code via `getColorCode`.
 * @param {string} [props.borderRadius="10px"] - Border radius for the card container.
 *
 * @example
 * <CardSimpleInfo
 *   img="https://example.com/profile.jpg"
 *   name="John Doe"
 *   title="Software Engineer"
 *   desc="John is a front-end developer specializing in React and TypeScript."
 *   colorName="blue"
 *   borderRadius="12px"
 * />
 */
export const CardSimpleInfo = ({
  img,
  name,
  desc,
  title = null,
  colorName = "cyan",
  borderRadius = "10px",
}) => {
  const finalColor = colorName;

  //   Making Inage Grayscale if user pass gray color of the border
  const imgCss =
    colorName === "gray" ? `${style.img} ${style.grayImg}` : `${style.img}`;

  return (
    <>
      <div
        className={style.containerCard}
        style={{ border: `1px solid ${finalColor}`, borderRadius }}
      >
        <img src={img} className={imgCss} alt="" />
        <div>
          <div className={style.namePos}>
            <p className={style.name} style={{ color: `${finalColor}` }}>
              {name}
            </p>
            {title === null ? <></> : <p className={style.position}>{title}</p>}
          </div>
          <p
            className={style.desc}
            style={{ borderTop: `2px solid ${finalColor}` }}
          >
            {desc}
          </p>
        </div>
      </div>
    </>
  );
};
