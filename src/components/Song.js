import { useState } from "react";

import classes from "./Song.module.css";
import PlayCircleOutlinedIcon from "@mui/icons-material/PlayCircleOutlined";
import PauseCircleOutlineOutlinedIcon from "@mui/icons-material/PauseCircleOutlineOutlined";

const Song = (props) => {
  const [a, setA] = useState(true);
  const onC = () => {
    setA((prevS) => !prevS);
  };
  return (
    <div tabIndex="-1" className={classes["tracks-container"]}>
      <div className={classes.play}>
        <button onClick={onC} className={classes["play-button"]}>
          {a ? (
            <PlayCircleOutlinedIcon />
          ) : (
            <PauseCircleOutlineOutlinedIcon style={{ color: "crimson" }} />
          )}
        </button>
      </div>
      <div className={classes.title}>{props.name} </div>
      <div className={classes.artist}>
        <a href={props.alink}>{props.artist}</a>
      </div>
      <div className={classes.album}>
        <a href="#">{props.album}</a>
      </div>
    </div>
  );
};

export default Song;
