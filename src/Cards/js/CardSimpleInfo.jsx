import { getColorCode } from "../../utils/COLOR.js";
import style from "../css/CardSimpleInfo.module.css";

/**
 * CardSimpleInfo Component
 *
 * Displays a compact profile/info card with optional border colors and title.
 * Ideal for showcasing team members, speakers, or clients.
 *
 * @component
 * @param {string} img - Image path to be shown.
 * @param {string} name - Primary name to display.
 * @param {string} desc - Description or details about the person.
 * @param {string|null} [title=null] - Optional position or role title.
 * @param {'cyan'|'red'|'yellow'|'green'|'blue'|'gray'} [colorName="cyan"] - The border theme color.
 * @param {string} [borderRadius="10px"] - Border Radius.
 
 * @returns {JSX.Element}
 */

export const CardSimpleInfo = ({
  img,
  name,
  desc,
  title = null,
  colorName = "cyan",
  borderRadius = "10px",
}) => {
  const finalColor = getColorCode(colorName);

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
