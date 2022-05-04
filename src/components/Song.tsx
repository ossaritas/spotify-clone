import { useDispatch, useSelector } from "react-redux";
import { playerActions } from "../store/player-slice";
import { Link } from "react-router-dom";

import classes from "./Song.module.css";
import PlayCircleOutlinedIcon from "@mui/icons-material/PlayCircleOutlined";
import PauseCircleOutlineOutlinedIcon from "@mui/icons-material/PauseCircleOutlineOutlined";
import { RootState } from "../store";

const Song = (props: {
  name: string;
  className?: string;
  artist: string;
  img: string;
  artist_link?: string;
  album_link?: string;
  album?: string;
}) => {
  const songData = useSelector((state: RootState) => state.songData);
  const progress = useSelector((state: RootState) => state.progress);
  const playing = useSelector((state: RootState) => state.playing);
  const dispatch = useDispatch();

  const getSongData = (
    artist: string,
    song: string,
    img: string,
    id: string
  ) => {
    let searchParam = `${artist} ${song}`;
    const paramsString = encodeURIComponent(searchParam);
    let mySearchParams = new URLSearchParams(`q=${paramsString}`);
    let searchQ = new URL(
      `http://46.101.218.180:2000/api/search?${mySearchParams}`
    );
    const searchData = searchQ.href;

    if (songData.id !== props.name) {
      dispatch(
        playerActions.onSongData({
          songData: {
            artist: artist,
            song: song,
            img: img,
            id: id,
          },
          searchQ: searchData,
        })
      );
      dispatch(playerActions.onPlay());
    }
    if (progress.played >= 0.001 && songData.id === props.name) {
      dispatch(playerActions.onPlayPause());
    }
  };
  return (
    <div
      tabIndex={-1}
      className={`${classes["tracks-container"]} ${
        props.className ? props.className : ""
      }`}
    >
      <div className={classes.play}>
        <button
          onClick={() =>
            getSongData(props.artist, props.name, props.img, props.name)
          }
          className={classes["play-button"]}
        >
          {songData.id === props.name && playing ? (
            <PauseCircleOutlineOutlinedIcon
              style={{ color: "#04aa6d", width: "32px", height: "32px" }}
            />
          ) : (
            <PlayCircleOutlinedIcon style={{ width: "32px", height: "32px" }} />
          )}
        </button>
      </div>
      <div className={classes.title}>
        <div className={classes["img-container"]}>
          <img src={props.img} alt="" />
        </div>
        <p>{props.name}</p>
      </div>
      <div className={classes.artist}>
        <Link to={`/artists/${props.artist_link}`}>{props.artist}</Link>
      </div>
      <div className={classes.album}>
        <Link to={`/album/${props.album_link}`}>{props.album}</Link>
      </div>
    </div>
  );
};

export default Song;
