import { useState, useEffect, useContext } from "react";

import Spotify from "../store/Spotify";
import Song from "./Song";
import NavButtons from "./Hero/NavButtons";
import CustomIcon from "./UI/CustomIcon";
import MainContainer from "./Hero/MainContainer";
import PlayCircleFilledIcon from "@mui/icons-material/PlayCircleFilled";
import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";

import classes from "./Album.module.css";
import { useParams } from "react-router-dom";

const Album = () => {
  const [albums, setAlbums] = useState([]);
  const params = useParams();
  const albumId = params.albumId;
  useEffect(() => {
    const getDetails = async () => {
      const details = await Spotify.getAlbums(albumId);
      let { name, label, release_date, total_tracks } = details;
      let cover = details.images[1].url;
      let items = details.tracks.items;

      setAlbums({
        name,
        cover,
        items,
        label,
        release_date,
        total_tracks,
      });
    };
    getDetails();
  }, [albumId]);

  return (
    <MainContainer>
      <NavButtons />
      <section className={classes.container}>
        <div className={classes.header}>
          <div className={classes["image-container"]}>
            <img src={albums.cover} alt="rep" />
          </div>
          <div className={classes.info}>
            <p>{albums.name}</p>
            <span>Label: {albums.label}</span>
            <span>Release Date: {albums.release_date}</span>
            <span>Total Tracks: {albums.total_tracks}</span>
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
              <li> #</li>
              <li>Title</li>
              <li>Artist</li>
            </ul>
            <p className={classes.divider}></p>
            <div className={classes["track-container"]}>
              {albums.items
                ? albums.items.map((item) => (
                    <Song
                      className={classes["album-tracks"]}
                      key={item.id}
                      name={item.name}
                      artist={item.artists[0].name}
                      artist_link={item.artists[0].id}
                      img={albums.cover}
                    />
                  ))
                : null}
            </div>
          </div>
          <div className={classes.songs}></div>
        </div>
      </section>
    </MainContainer>
  );
};

export default Album;
