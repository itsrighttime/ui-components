
import React from "react";
import style from "../css/CardTextSliding.module.css";
import { Button } from "../../InputFields";


const CardTextSliding = ({
  imgPath,
  productName,
  desc,
  setResult = "#",
  productID = null,
  color,
  orientation = "S",
}) => {
  const cardContentCss = `${style.cardContent} | ${style.flow}`;
  const cardContentContainerCss = `${style.cardContentContainer} | ${style.flow}`;
  const orientCss =
    orientation === "V"
      ? "vertical"
      : orientation === "H"
      ? "horizontal"
      : "square";

  const cssVariable = {
    "--color": color || `var(--colorCyan)`,
  };

  return (
    <>
      <div
        className={`${style.mainBox} ${style[orientCss]}`}
        style={cssVariable}
      >
        {/* Main Card Continer */}
        <article className={style.card}>
          {/* Background Image */}
          <img
            className={style.cardBackground}
            src={imgPath}
            alt=""
            width="1920"
            height="2193"
          />

          {/* Content Section */}
          <div className={cardContentCss}>
            <div className={cardContentContainerCss}>
              <h2 className={`${style.cardTitle}`}>
                {productName}
              </h2>
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
          <div className={`${style.productID} textHeadSmall2`}>
            <p className="textHeadSmall2">~ Product ID: {productID}</p>
          </div>
        )}
      </div>
    </>
  );
};

export default CardTextSliding;
