import { ChangeEvent, useEffect, useState } from "react";
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
    <footer className="grid grid-cols-3 grid-flow-col row-start-2 row-end-3 col-start-1 col-end-3 h-[90px] bg-[#181818] ">
      <div className="flex items-center p-[10px] ml-[10px] space-x-[10px]">
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

        <div className="w-[60px] h-[60px]  border-2 border-[#04aa6d] ">
          <img
            className="w-full h-full object-contain"
            src={songData.img}
            alt=""
          />
        </div>
        <p className="w-[200px] whitespace-nowrap overflow-hidden text-ellipsis ">
          {songData.artist} -- {songData.song}
        </p>
      </div>
      <div className="flex flex-col p-[10px] items-center space-y-[5px] justify-center ">
        <div className="flex flex-row items-center space-x-[8px] ">
          <Duration className="text-[13px] " seconds={progress.playedSeconds} />
          <input
            className="w-[200px] h-[4px] outline-none appearance-none slider-thumb bg-[#bcbaba] hover:bg-[#d1d1d1] hover:cursor-pointer rounded "
            onMouseDown={() => dispatch(playerActions.onMouseUp())}
            onMouseUp={() => dispatch(playerActions.onMouseDown())}
            onChange={seekHandler}
            type="range"
            min={0}
            max={1}
            step="any"
            value={progress.played}
          />
          <Duration className="text-[13px]" seconds={duration} />
        </div>

        <ul className="w-[200px] flex flex-row justify-center ">
          <li>
            <button className="hover:scale-110">
              <SkipPreviousIcon fontSize="large" />
            </button>
          </li>

          <li>
            <button
              className="hover:scale-110"
              onClick={() => dispatch(playerActions.onPlayPause())}
            >
              {!isPlaying ? (
                <PlayCircleIcon fontSize="large" />
              ) : (
                <PauseCircleFilledIcon fontSize="large" />
              )}
            </button>
          </li>

          <li>
            <button className="hover:scale-110">
              <SkipNextIcon fontSize="large" />
            </button>
          </li>
        </ul>
      </div>
      <div className="flex flex-row items-center justify-center ml-[150px] p-[10px] space-x-[5px]">
        <ul className="flex space-x-[10px]">
          <li>
            <button className="hover:scale-110">
              <DevicesIcon />
            </button>
          </li>
          <li>
            <button className="hover:scale-110" onClick={volumeMuteHandler}>
              {volume === 0 ? <VolumeOffIcon /> : <VolumeUpIcon />}
            </button>
          </li>
        </ul>
        <div className="w-[150px] h-[30px] ">
          <input
            className="w-[150px] h-[4px] outline-none appearance-none slider-thumb bg-[#bcbaba] hover:bg-[#d1d1d1] hover:cursor-pointer rounded "
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
