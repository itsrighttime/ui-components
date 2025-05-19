import React, { useRef, useState, useEffect } from "react";
import style from "../css/AudioPlayer.module.css"; // Adjust the path as necessary
import {
  crossIcon,
  muteIcon,
  pauseIcon,
  playIcon,
  resetFieldIcon,
  speakerIcon,
} from "../../../utils/index.js";
import IconButton from "../../Actions/jsx/IconButton";
import Slider from "../../NumericInput.jsx/jsx/Slider";

const AudioPlayer = ({
  audioSrc,
  onRemove = null,
  color,
  onReupload = null,
}) => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(1); // Default volume (range from 0 to 1)
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [hoverTime, setHoverTime] = useState(null);

  // Handle play/pause functionality
  const handlePlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  // Handle mute/unmute
  const handleMute = () => {
    const audio = audioRef.current;
    setIsMuted(!isMuted);
    audio.volume = isMuted ? volume : 0; // Set volume to 0 if muted
  };

  const handleVolume = (value) => {
    setVolume(value);
    audioRef.current.volume = value;

    if (value === 0) {
      setIsMuted(true);
    } else {
      setIsMuted(false);
    }
  };

  // Update current time and duration
  useEffect(() => {
    const updateTime = () => {
      setCurrentTime(audioRef.current.currentTime);
      setDuration(audioRef.current.duration);
    };

    const audio = audioRef.current;
    audio.addEventListener("timeupdate", updateTime);

    return () => {
      audio.removeEventListener("timeupdate", updateTime);
    };
  }, [isPlaying]);

  // Format time in minutes and seconds
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
  };

  // Calculate the percentage of the track completed
  const calculateTrackWidth = () => {
    return (currentTime / duration) * 100;
  };

  // Handle seeking to a point in the audio
  const handleSeek = (e) => {
    const newTime = (e.nativeEvent.offsetX / e.target.clientWidth) * duration;
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  // Handle hover over the track to show time at that point
  const handleHover = (e) => {
    const newTime = (e.nativeEvent.offsetX / e.target.clientWidth) * duration;
    setHoverTime(newTime);
  };

  // Reset hover time when not hovering
  const handleHoverOut = () => {
    setHoverTime(null);
  };

  const cssVariable = {
    "--color": color ? color : "var(--colorCyan)",
  };

  return (
    <div className={style.audioPreview} style={cssVariable}>
      <audio ref={audioRef} src={audioSrc} />
      <div className={style.customControls}>
        <div className={style.player}>
          <IconButton
            icon={isPlaying ? pauseIcon : playIcon}
            onClick={handlePlayPause}
            color={isPlaying ? color || "#52C9BD" : "#FF5969"}
            size="1.2"
            style={{ border: "none" }}
          />

          <div className={style.timeInfo}>
            {formatTime(currentTime)}
            {hoverTime !== null && (
              <div className={style.hoverTime}>{formatTime(hoverTime)}</div>
            )}
          </div>

          <div
            className={style.trackContainer}
            onClick={handleSeek}
            onMouseMove={handleHover}
            onMouseLeave={handleHoverOut}
          >
            <div
              className={style.track}
              style={{ width: `${calculateTrackWidth()}%` }}
            />
            <div
              className={style.progressCircle}
              style={{ left: `${calculateTrackWidth()}%` }}
            />
          </div>

          <div className={style.timeInfo}>{formatTime(duration)}</div>
        </div>

        <div className={style.controlers}>
          <div className={style.volumeControls}>
            <IconButton
              icon={isMuted ? muteIcon : speakerIcon}
              onClick={handleMute}
              color={color || "#52C9BD"}
            />

            <Slider
              setResult={(value) => handleVolume(value / 100)}
              showValueSide="left"
              color={color}
              showRange={false}
              value={0.3}
            />
          </div>

          <div className={style.resetRemove}>
            {onReupload && (
              <IconButton
                icon={resetFieldIcon}
                onClick={onReupload}
                color={color || "#52C9BD"}
              />
            )}
            {onRemove && (
              <IconButton icon={crossIcon} onClick={onRemove} color="#FF5969" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AudioPlayer;
