import style from "../css/VideoPlayer.module.css";
import { crossIcon, videoNotIcon, resetFieldIcon } from "../../../utils/icons";
import { IconButton } from "../../Actions/jsx/IconButton";
import { IconError } from "../../../SpecialPages/js/IconError";

export const VideoPlayer = ({
  videoFile,
  onRemove = null,
  onReupload = null,
  color,
  width = "400px",
  height = "200px",
}) => {
  let videoSrc = null;
  if (videoFile) {
    if (videoFile instanceof Blob) {
      videoSrc = URL.createObjectURL(videoFile);
    } else if (typeof videoFile === "string") {
      videoSrc = videoFile;
    }
  }

  const cssVariable = {
    "--color": color || "var(--colorCyan)",
    "--width": width,
    "--height": height,
  };

  return (
    <div className={style.videoContainer} style={cssVariable}>
      {videoSrc ? (
        <div className={style.videoPreview}>
          <video
            controls
            controlsList="nodownload"
            muted
            autoPlay
            src={videoSrc}
            className={style.videoPlayer}
          />
          <div className={style.resetRemove}>
            {onReupload && (
              <IconButton
                icon={resetFieldIcon}
                onClick={onReupload}
                color={color || "#52C9BD"}
                label={"Re-Upload"}
              />
            )}
            {onRemove && (
              <IconButton icon={crossIcon} onClick={onRemove} color="#FF5969" />
            )}
          </div>
        </div>
      ) : (
        <IconError
          icon={videoNotIcon}
          messgae={"Ah!! Looks live video not fount"}
          size={2.5}
        />
      )}
    </div>
  );
};
