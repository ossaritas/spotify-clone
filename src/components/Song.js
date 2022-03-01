import { useContext } from "react";
import { Link } from "react-router-dom";

import classes from "./Song.module.css";
import PlayCircleOutlinedIcon from "@mui/icons-material/PlayCircleOutlined";
import PauseCircleOutlineOutlinedIcon from "@mui/icons-material/PauseCircleOutlineOutlined";
import PlayerContext from "../store/player-context";

const Song = (props) => {
  const plyCtx = useContext(PlayerContext);
  const getSongData = (aa, bb, cc, dd) => {
    plyCtx.getSongData(aa, bb, cc, dd);
    plyCtx.onPlayPause();
    console.log(dd);
  };
  return (
    <div
      tabIndex="-1"
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
          {plyCtx.songData.id === props.name && plyCtx.playing ? (
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
