import React from "react";
import style from "../css/VideoPlayer.module.css"; // Adjust the path as necessary
import { crossIcon, resetFieldIcon } from "../../../utils/index.js";
import IconButton from "../../Actions/jsx/IconButton";

const VideoPlayer = ({
  videoFile,
  onRemove = null,
  onReupload = null,
  color,
}) => {
  const videoSrc = videoFile ? URL.createObjectURL(videoFile) : null;

  const cssVariable = {
    "--color": color ? color : "var(--colorCyan)",
  };

  return videoSrc ? (
    <div className={style.videoPreview} style={cssVariable}>
      <video controls src={videoSrc} className={style.videoPlayer} />
      <div className={style.resetRemove}>
        {onRemove && (
          <IconButton
            icon={resetFieldIcon}
            onClick={onReupload}
            color={color || "#52C9BD"}
          />
        )}
        {onReupload && (
          <IconButton icon={crossIcon} onClick={onRemove} color="#FF5969" />
        )}
      </div>
    </div>
  ) : (
    <div className={style.noVideo} style={cssVariable}>
      {" "}
      Upload Video
    </div>
  );
};

export default VideoPlayer;
