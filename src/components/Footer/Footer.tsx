import { ChangeEvent, useEffect, useState } from "react";
import classes from "./Footer.module.css";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import PauseCircleFilledIcon from "@mui/icons-material/PauseCircleFilled";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import VolumeOffIcon from "@mui/icons-material/VolumeOff";
import DevicesIcon from "@mui/icons-material/Devices";

import ReactPlayer from "react-player/youtube";
import Spotify from "../../Spotify/Spotify";
import Duration from "./Duration";
import { useDispatch, useSelector } from "react-redux";
import { playerActions } from "../../store/player-slice";
import { RootState } from "../../store";

const Footer = () => {
  const isPlaying = useSelector((state: RootState) => state.playing);
  const songData = useSelector((state: RootState) => state.songData);
  const volume = useSelector((state: RootState) => state.volume);
  const muted = useSelector((state: RootState) => state.muted);
  const progress = useSelector((state: RootState) => state.progress);
  const seeking = useSelector((state: RootState) => state.seeking);
  const duration = useSelector((state: RootState) => state.duration);
  const searchQ = useSelector((state: RootState) => state.searchQ);
  const dispatch = useDispatch();

  let player: any;
  const ref = (playerRef: any) => {
    player = playerRef;
  };

  const [url, setUrl] = useState<string>();
  useEffect(() => {
    const getDetails = async () => {
      const details = await Spotify.getYoutubeSong(searchQ);
      let { url } = details;
      setUrl(url);
    };
    getDetails();
  }, [searchQ]);

  const volumeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    if (volume > 0) {
      dispatch(
        playerActions.onVolumeChange({
          value: parseFloat(event.target.value),
          muted: false,
        })
      );
    } else {
      dispatch(
        playerActions.onVolumeChange({
          value: parseFloat(event.target.value),
          muted: true,
        })
      );
    }
  };
  const volumeMuteHandler = () => {
    if (volume > 0) {
      dispatch(playerActions.onVolumeChange({ value: 0, muted: true }));
    } else {
      dispatch(playerActions.onVolumeChange({ value: 0.5, muted: false }));
    }
  };
  const seekHandler = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(
      playerActions.onHandleSeek({ played: parseFloat(event.target.value) })
    );
    player.seekTo(parseFloat(event.target.value), "fraction");
  };

  const progressHandler = (progress: {
    played: number;
    playedSeconds: number;
    loaded: number;
    loadedSeconds: number;
  }) => {
    if (!seeking) {
      dispatch(playerActions.onProgress({ progress }));
    }
    if (progress.played >= 0.997) {
      dispatch(playerActions.onHandleEnd());
    }
  };
  const durationHandler = (duration: number) => {
    dispatch(playerActions.onDuration({ duration }));
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
          onPlay={() => dispatch(playerActions.onPlay())}
          onEnded={() => dispatch(playerActions.onHandleEnd())}
          onProgress={progressHandler}
          onDuration={durationHandler}
          onError={(e) => console.log("onError", e)}
        />

        <div className={classes["img-container"]}>
          <img src={songData.img} alt="" />
        </div>
        <p>
          {songData.artist} -- {songData.song}
        </p>
      </div>
      <div className={classes.player}>
        <div>
          <Duration
            className={classes.duration}
            seconds={progress.playedSeconds}
          />
          <input
            onMouseDown={() => dispatch(playerActions.onMouseUp())}
            onMouseUp={() => dispatch(playerActions.onMouseDown())}
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
            <button onClick={() => dispatch(playerActions.onPlayPause())}>
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
