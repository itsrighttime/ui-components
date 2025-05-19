// Code: ABAB007
import React from "react";
import style from "../css/CardImg.module.css";

const CardImg = ({
  imgPath,
  title,
  desc,
  link = "#",
  targetLink = "_blank",
}) => {
  return (
    <>
      <article class={style.articleContainer}>
        <div class={style.articleWrapper}>
          <figure>
            <img src={imgPath} alt="" />
          </figure>
          <div class={style.articleBody}>
            <h2>{title}</h2>
            <p>{desc} </p> <br />
            <a href={link} target={targetLink} class={style.readMore}>
              Read more
            </a>
          </div>
        </div>
      </article>
    </>
  );
};

export default CardImg;
