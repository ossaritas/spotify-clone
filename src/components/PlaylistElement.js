import { useState, useEffect } from "react";

import CustomIcon from "./UI/CustomIcon";
import PlayCircleFilledIcon from "@mui/icons-material/PlayCircleFilled";
import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";

import classes from "./PlaylistElement.module.css";

import MainContainer from "./Hero/MainContainer";
import Song from "./Song";

import Spotify from "../store/Spotify";
import { useParams } from "react-router-dom";

const PlaylistElement = () => {
  const [tracks, setTracks] = useState([]);

  useEffect(() => {
    const getTracks = async () => {
      const tracks = await Spotify.getTracks();
      setTracks(tracks);
    };
    getTracks();
  }, []);

  console.log(tracks);

  return (
    <MainContainer>
      <section className={classes.container}>
        <div className={classes.header}>
          <div className={classes["image-container"]}>
            <img
              src="https://i.scdn.co/image/ab67706f00000003543c9b8ccbe5fc781758f0d8"
              alt="rep"
            />
          </div>
          <div className={classes.info}>
            <p>Atmospheric Sci-fi Soundtracks</p>
          </div>
        </div>
        <div className={classes.list}>
          <div className={classes["head-icons"]}>
            <CustomIcon className={classes.ply}>
              <PlayCircleFilledIcon
                style={{ width: "62.5px", height: "62.5px" }}
              />
            </CustomIcon>
            <CustomIcon className={classes.fav}>
              <FavoriteBorderRoundedIcon
                style={{ width: "45px", height: "45px" }}
              />
            </CustomIcon>
          </div>

          <div>
            <ul className={classes.title}>
              <li>#</li>
              <li>Title</li>
              <li>Artist</li>
              <li>Album</li>
            </ul>
            <p className={classes.divider}></p>
            {/* {data.items
            ? data.items.map((item) => (
                <Song
                  key={item.track.name}
                  name={item.track.name}
                  artist={item.track.artists[0].name}
                  album={item.track.album.name}
                />
              ))
            : null} */}
          </div>
          <div className={classes.songs}></div>
        </div>
      </section>
    </MainContainer>
  );
};

export default PlaylistElement;
