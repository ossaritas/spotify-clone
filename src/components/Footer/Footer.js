import { useEffect, useState } from "react";
import classes from "./Footer.module.css";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import PauseCircleFilledIcon from "@mui/icons-material/PauseCircleFilled";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import VolumeOffIcon from "@mui/icons-material/VolumeOff";
import DevicesIcon from "@mui/icons-material/Devices";

import {
  HANDLE_SEEK,
  MOUSE_DOWN,
  MOUSE_UP,
  ON_DURATION,
  ON_PROGRESS,
  PLAY,
  PLAY_PAUSE,
  VOLUME_CHANGED,
  VOLUME_TOGGLE,
} from "../../store/actions";
import ReactPlayer from "react-player/youtube";
import Spotify from "../../store/Spotify";
import Duration from "./Duration";
import { useDispatch, useSelector } from "react-redux";

const Footer = () => {
  const isPlaying = useSelector((state) => state.playing);
  const songData = useSelector((state) => state.songData);
  const volume = useSelector((state) => state.volume);
  const muted = useSelector((state) => state.muted);
  const progress = useSelector((state) => state.progress);
  const seeking = useSelector((state) => state.seeking);
  const duration = useSelector((state) => state.duration);
  const searchQ = useSelector((state) => state.searchQ);
  const dispatch = useDispatch();

  let player;
  const ref = (playerRef) => {
    player = playerRef;
  };

  const [url, setUrl] = useState(null);
  useEffect(() => {
    const getDetails = async () => {
      const details = await Spotify.getYoutubeSong(searchQ);
      let { url } = details;
      setUrl(url);
    };
    getDetails();
  }, [searchQ]);

  const playHandler = () => {
    dispatch({ type: PLAY });
  };
  const playPauseHandler = () => {
    dispatch({ type: PLAY_PAUSE });
  };
  const volumeHandler = (e) => {
    if (volume > 0) {
      dispatch({
        type: VOLUME_CHANGED,
        payload: { value: parseFloat(e.target.value), muted: false },
      });
    } else {
      dispatch({
        type: VOLUME_CHANGED,
        payload: { value: parseFloat(e.target.value), muted: true },
      });
    }
  };
  const volumeMuteHandler = () => {
    if (volume > 0) {
      dispatch({ type: VOLUME_TOGGLE, payload: { value: 0, muted: true } });
    } else {
      dispatch({ type: VOLUME_TOGGLE, payload: { value: 0.5, muted: false } });
    }
  };
  const seekMouseUp = (e) => {
    dispatch({ type: MOUSE_DOWN });
    player.seekTo(parseFloat(e.target.value), "fraction");
  };
  const seekMouseDown = () => {
    dispatch({ type: MOUSE_UP });
  };
  const seekHandler = (e) => {
    dispatch({
      type: HANDLE_SEEK,
      payload: { played: parseFloat(e.target.value) },
    });
  };

  const progressHandler = (progress) => {
    if (!seeking) {
      dispatch({ type: ON_PROGRESS, payload: { progress } });
    }
  };

  const durationHandler = (duration) => {
    dispatch({ type: ON_DURATION, payload: { duration } });
  };

  return (
    <footer className={classes["footer-container"]}>
      <div className={classes.info}>
        <ReactPlayer
          ref={ref}
          url={url}
          volume={volume}
          width={0}
          height={0}
          playing={isPlaying}
          muted={muted}
          onSeek={(e) => console.log("onSeek", e)}
          onPlay={() => playHandler}
          onProgress={progressHandler}
          onDuration={durationHandler}
          onError={(e) => console.log("onError", e)}
        />

        <div className={classes["img-container"]}>
          <img src={songData.img} alt="" />
        </div>
        <p>
          {songData.artist} _ {songData.song}
        </p>
      </div>
      <div className={classes.player}>
        <div>
          <Duration
            className={classes.duration}
            seconds={progress.playedSeconds}
          />
          <input
            onMouseDown={seekMouseDown}
            onMouseUp={seekMouseUp}
            onChange={seekHandler}
            type="range"
            min={0}
            max={1}
            step="any"
            value={progress.played}
          />
          <Duration className={classes.duration} seconds={duration} />
        </div>

        <ul className={classes["player-actions"]}>
          <li>
            <button>
              <SkipPreviousIcon fontSize="large" />
            </button>
          </li>

          <li>
            <button onClick={playPauseHandler}>
              {!isPlaying ? (
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
            <button onClick={volumeMuteHandler}>
              {volume === 0 ? <VolumeOffIcon /> : <VolumeUpIcon />}
            </button>
          </li>
        </ul>
        <div className={classes["volume-duration"]}>
          <input
            type="range"
            min={0}
            max={1}
            step="any"
            value={volume}
            onChange={volumeHandler}
          />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
