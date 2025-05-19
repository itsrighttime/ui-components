// Code: ABAB00A
import React from "react";
import style from "../css/CardTextOn.module.css";

const CardTextOn = ({
  authorName,
  date,
  imgPath,
  desc,
  productID = null,
  orientation = "H",
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
        <div className={`${style.articleCard}`}>
          <div className={style.content}>
            <p className={`${style.date} textHeadSmall1`}>{date}</p>
            <p className={`${style.title} textHead2`}>{authorName}</p>
            <p className={`${style.desc} textHeadSmall1`}>{desc}</p>
          </div>
          <img src={imgPath} alt="article-cover" />
        </div>
        
        {/* For product ID */}
        {productID == null ? (
          <></>
        ) : (
          <div className={`${style.productID} textHeadSmall2`}>
            <p className="textHeadSmall2 colorGray5">~ Product ID: {productID}</p>
          </div>
        )}
      </div>
    </>
  );
};

export default CardTextOn;
