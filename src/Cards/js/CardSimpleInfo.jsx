// Code : ABAB008

import React from "react";
import style from "../css/CardSimpleInfo.module.css";

const CardSimpleInfo = ({
  imgPath,
  name,
  desc,
  title = null,
  borderCol = "cyan",
}) => {
  // Selecting Border Color according the prop passed through the Component
  const classA =
    borderCol === "cyan"
      ? `${style.containerCard} ${style.cyan}`
      : borderCol === "red"
      ? `${style.containerCard} ${style.red}`
      : borderCol === "yellow"
      ? `${style.containerCard} ${style.yellow}`
      : borderCol === "green"
      ? `${style.containerCard} ${style.green}`
      : borderCol === "blue"
      ? `${style.containerCard} ${style.blue}`
      : `${style.containerCard} ${style.gray}`;

  // Selecting User Name Color according the prop passed through the Component
  const nameCss =
    borderCol === "cyan"
      ? `${style.name} textHead3 colorCyan`
      : borderCol === "red"
      ? `${style.name} textHead3 colorRed`
      : borderCol === "yellow"
      ? `${style.name} textHead3 colorYellow`
      : borderCol === "green"
      ? `${style.name} textHead3 colorGreen`
      : borderCol === "blue"
      ? `${style.name} textHead3 colorBlue`
      : `${style.name} textHead3 colorGray5`;

  //   Making Inage Grayscale if user pass gray color of the border
  const imgCss =
    borderCol === "gray" ? `${style.img} ${style.grayImg}` : `${style.img}`;

  //
  // Making the Component
  const positionCss = `${style.position} textHeadSmall1`;
  return (
    <>
      <div className={classA}>
        <img src={imgPath} className={imgCss} alt="" />
        <div className={style.namePos}>
          <p className={nameCss}>{name}</p>
          {title === null ? <></> : <p className={positionCss}>{title}</p>}
          <p className={style.desc}>{desc}</p>
        </div>
      </div>
    </>
  );
};

export default CardSimpleInfo;
