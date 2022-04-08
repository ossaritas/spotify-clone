import { useEffect, useState, useContext } from "react";
import classes from "./Footer.module.css";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import PauseCircleFilledIcon from "@mui/icons-material/PauseCircleFilled";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import VolumeOffIcon from "@mui/icons-material/VolumeOff";
import DevicesIcon from "@mui/icons-material/Devices";

import ReactPlayer from "react-player/youtube";
import PlayerContext from "../../store/player-context";
import Spotify from "../../store/Spotify";
import Duration from "./Duration";

const Footer = () => {
  const [url, setUrl] = useState(null);
  const plyCtx = useContext(PlayerContext);
  useEffect(() => {
    const getDetails = async () => {
      const details = await Spotify.getYoutubeSong(plyCtx.searchQ);
      let { url } = details;
      setUrl(url);
    };
    getDetails();
  }, [plyCtx.searchQ]);

  const seekMouseUp = (e) => {
    plyCtx.onMouseUp();
    player.seekTo(parseFloat(e.target.value), "fraction");
  };

  let player;
  const ref = (playerRef) => {
    player = playerRef;
  };

  return (
    <footer className={classes["footer-container"]}>
      <div className={classes.info}>
        <ReactPlayer
          ref={ref}
          url={url}
          volume={plyCtx.volume}
          width={0}
          height={0}
          playing={plyCtx.playing}
          muted={plyCtx.muted}
          onSeek={() => plyCtx.onHandleSeek}
          onPlay={() => plyCtx.onPlay}
          onProgress={plyCtx.onProgress}
          onDuration={plyCtx.onDuration}
        />

        <div className={classes["img-container"]}>
          <img src={plyCtx.songData.img} alt="" />
        </div>
        <p>
          {plyCtx.songData.artist} _ {plyCtx.songData.song}
        </p>
      </div>
      <div className={classes.player}>
        <div>
          <Duration
            className={classes.duration}
            seconds={plyCtx.progress.playedSeconds}
          />
          <input
            onMouseDown={plyCtx.onMouseDown}
            onMouseUp={seekMouseUp}
            onChange={plyCtx.onHandleSeek}
            type="range"
            min={0}
            max={1}
            step="any"
            value={plyCtx.progress.played}
          />
          <Duration className={classes.duration} seconds={plyCtx.duration} />
        </div>

        <ul className={classes["player-actions"]}>
          <li>
            <button>
              <SkipPreviousIcon fontSize="large" />
            </button>
          </li>

          <li>
            <button onClick={plyCtx.onPlayPause}>
              {!plyCtx.playing ? (
                <PlayCircleIcon fontSize="large" />
              ) : (
                <PauseCircleFilledIcon fontSize="large" />
              )}
            </button>
          </li>

          <li>
            <button>
              <SkipNextIcon fontSize="large" />
            </button>
          </li>
        </ul>
      </div>
      <div className={classes.volume}>
        <ul className={classes["volume-actions"]}>
          <li>
            <button>
              <DevicesIcon />
            </button>
          </li>
          <li>
            <button onClick={plyCtx.onVolumeToggle}>
              {plyCtx.volume === 0 ? <VolumeOffIcon /> : <VolumeUpIcon />}
            </button>
          </li>
        </ul>
        <div className={classes["volume-duration"]}>
          <input
            type="range"
            min={0}
            max={1}
            step="any"
            value={plyCtx.volume}
            onChange={plyCtx.onVolumechange}
          />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
