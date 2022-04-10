import { useState, useEffect } from "react";

import CustomIcon from "./UI/CustomIcon";
import PlayCircleFilledIcon from "@mui/icons-material/PlayCircleFilled";
import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";

import classes from "./PlaylistElement.module.css";

import MainContainer from "./Hero/MainContainer";
import NavButtons from "./Hero/NavButtons";
import Song from "./Song";

import Spotify from "../store/Spotify";
import { useParams } from "react-router-dom";

const PlaylistElement = () => {
  const params = useParams();
  const trackId = params.trackId;
  const [tracks, setTracks] = useState([]);
  const [img, setImg] = useState([]);
  const [details, setDetails] = useState([]);

  useEffect(() => {
    const getDetails = async () => {
      const details = await Spotify.getPlaylistDetails(trackId);
      setDetails(details);
      let img = details.images[0].url;
      setImg(img);
      let tracks = details.tracks;
      setTracks(tracks);
    };
    getDetails();
  }, [trackId]);

  return (
    <MainContainer>
      <NavButtons />
      <section className={classes.container}>
        <div className={classes.header}>
          <div className={classes["image-container"]}>
            <img src={img} alt="rep" />
          </div>
          <div className={classes.info}>
            <span
              style={{
                fontSize: "20px",
                textTransform: "uppercase",
                color: "white",
              }}
            >
              Playlist
            </span>
            <p>{details.name}</p>
            <span>{details.description}</span>
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
            {tracks.items
              ? tracks.items.map((item) => (
                  <Song
                    key={item.track.id}
                    img={item.track.album.images[2].url}
                    name={item.track.name}
                    artist={item.track.artists[0].name}
                    artist_link={item.track.artists[0].id}
                    album={item.track.album.name}
                    album_link={item.track.album.id}
                  />
                ))
              : null}
          </div>
        </div>
      </section>
    </MainContainer>
  );
};

export default PlaylistElement;
