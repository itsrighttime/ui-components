import { getColorCode } from "../../utils/COLOR";
import style from "../css/CardImg.module.css";

/**
 * CardImg Component
 *
 * A visually appealing article-style card that displays an image, title, description, and a "Read more" link.
 * Useful for blogs, product previews, or portfolio displays.
 *
 * @component
 * @param {string} img - The image source path.
 * @param {string} title - The title text displayed prominently.
 * @param {string} desc - The supporting description text.
 * @param {string} [targetLink="#"] - The hyperlink URL for the "Read more" anchor.
 * @param {string} [targetTab="_blank"] - Target behavior of the anchor tag (e.g., `_self`, `_blank`).
 * @param {'cyan'|'red'|'yellow'|'green'|'blue'|'gray'} [colorName="red"] - The border theme color.
 * @param {string} [borderRadius="10px"] - Border Radius.
 *
 * @returns {JSX.Element}
 */
export const CardImg = ({
  img,
  title,
  desc,
  targetLink = "#",
  targetTab = "_blank",
  borderRadius = "10px",
  colorName = "red",
}) => {
  return (
    <>
      <article class={style.articleContainer} style={{ borderRadius }}>
        <div class={style.articleWrapper}>
          <figure>
            <img src={img} alt="" />
          </figure>
          <div class={style.articleBody}>
            <h2 style={{ color: `${getColorCode(colorName)}` }}>{title}</h2>
            <p>{desc} </p> <br />
            <a href={targetLink} target={targetTab} class={style.readMore}>
              Read more
            </a>
          </div>
        </div>
      </article>
    </>
  );
};
