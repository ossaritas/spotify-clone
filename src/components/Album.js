import { useState, useEffect, useContext } from "react";
import axios from "axios";
import MainContainer from "./Hero/MainContainer";

import Song from "./Song";
import CustomIcon from "./UI/CustomIcon";
import SpotifyProvider from "../store/context";

import PlayCircleFilledIcon from "@mui/icons-material/PlayCircleFilled";
import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";

import classes from "./Album.module.css";

const PLAYLISTS_ENDPOINT =
  "https://api.spotify.com/v1/playlists/37i9dQZF1DXbIeCFU20wRm/tracks";

const Album = () => {
  const ctx = useContext(SpotifyProvider);

  const [data, setData] = useState([]);
  const [art, setArt] = useState([]);

  useEffect(() => {
    const sendGetRequest = async () => {
      try {
        const resp = await axios.get(PLAYLISTS_ENDPOINT, {
          headers: {
            Authorization: "Bearer " + ctx.token,
          },
        });
        setData(resp.data);
      } catch (error) {}
    };
    if (ctx.token) {
      sendGetRequest();
    }
  }, [ctx.token]);
  useEffect(() => {
    const getArtist = async () => {
      try {
        const resp = await axios.get(
          "https://api.spotify.com/v1/artists/0YC192cP3KPCRWx8zr8MfZ",
          {
            headers: {
              Authorization: "Bearer " + ctx.token,
            },
          }
        );
        setArt(resp.data);
      } catch (error) {}
    };
    if (ctx.token) {
      getArtist();
    }
  }, [ctx.token]);

  console.log(art);

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
            <p>ALBUM</p>
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
          </div>
          <div className={classes.songs}></div>
        </div>
      </section>
    </MainContainer>
  );
};

export default Album;
