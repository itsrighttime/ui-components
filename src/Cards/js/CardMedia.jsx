import styles from "../css/CardMedia.module.css";

export const CardMedia = ({ mediaType, text, src, caption }) => {
  return (
    <div className={styles.media}>
      {mediaType === "image" && src && (
        <img
          src={src}
          alt={caption || "timeline media"}
          className={styles.image}
        />
      )}

      {mediaType === "video" && src && (
        <video src={src} controls className={styles.video} />
      )}

      {mediaType === "quote" && text && (
        <blockquote className={styles.quote}>“{text}”</blockquote>
      )}

      {caption && <p className={styles.caption}>{caption}</p>}
    </div>
  );
};

/*

// Image

{
  label: "2020",
  side: "left",
  component: {
    type: "media",
    data: {
      mediaType: "image",
      src: "/images/mvp-launch.png",
      caption: "First MVP launch day"
    }
  }
}


// Quote
{
  label: "Turning Point",
  side: "right",
  component: {
    type: "media",
    data: {
      mediaType: "quote",
      text: "This pivot redefined how we build products.",
      caption: "Founder’s note",
      emphasis: true
    }
  }
}


*/
