import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import classes from "./Song.module.css";
import PlayCircleOutlinedIcon from "@mui/icons-material/PlayCircleOutlined";
import PauseCircleOutlineOutlinedIcon from "@mui/icons-material/PauseCircleOutlineOutlined";
import { PLAY_PAUSE, SONG_DATA } from "../store/actions";

const Song = (props) => {
  const songData = useSelector((state) => state.songData);
  const playing = useSelector((state) => state.playing);
  const dispatch = useDispatch();

  const getSongData = (artist, song, img, id) => {
    let searchParam = `${artist} ${song}`;
    const paramsString = encodeURIComponent(searchParam);
    let mySearchParams = new URLSearchParams(`q=${paramsString}`);
    let searchQ = new URL(
      `http://46.101.218.180:2000/api/search?${mySearchParams}`
    );
    const searchData = searchQ.href;
    dispatch({
      type: SONG_DATA,
      payload: {
        searchQ: searchData,
        songData: {
          artist: artist,
          song: song,
          img: img,
          id: id,
        },
      },
    });
    dispatch({ type: PLAY_PAUSE });
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
