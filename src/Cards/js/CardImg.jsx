import { getColorCode } from "../../utils/COLOR.js";
import style from "../css/CardImg.module.css";

/**
 * CardImg component to display an image card with title, description, and a link.
 *
 * This component renders a card layout with an image, a title, a description,
 * and a "Read more" link. The card's border radius and title color can be customized.
 *
 * @component
 *
 * @param {Object} props - Component props
 * @param {string} props.img - URL of the image to display in the card.
 * @param {string} props.title - Title text to display on the card.
 * @param {string} props.desc - Description text to display under the title.
 * @param {string} [props.targetLink="#"] - URL to navigate to when "Read more" is clicked.
 * @param {('_self'|'_blank'|'_parent'|'_top')} [props.targetTab="_blank"] - Target for the link.
 * @param {string} [props.borderRadius="10px"] - Border radius for the card container.
 * @param {string} [props.colorName="red"] - Name of the color to apply to the title. Maps to a color code via `getColorCode`.
 *
 * @example
 * <CardImg
 *   img="https://example.com/image.jpg"
 *   title="Card Title"
 *   desc="This is a description for the card."
 *   targetLink="https://example.com"
 *   targetTab="_blank"
 *   borderRadius="15px"
 *   colorName="blue"
 * />
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
