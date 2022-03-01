import { useState, useEffect, useContext } from "react";

import Spotify from "../store/Spotify";
import Song from "./Song";
import Card from "./UI/Card";
import NavButtons from "./Hero/NavButtons";
import CustomIcon from "./UI/CustomIcon";
import MainContainer from "./Hero/MainContainer";
import PlayCircleFilledIcon from "@mui/icons-material/PlayCircleFilled";
import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";

import classes from "./Artists.module.css";
import { useParams } from "react-router-dom";

const Artists = () => {
  const [albums, setAlbums] = useState([]);
  const [tracks, setTracks] = useState([]);
  const [artist, setArtist] = useState([]);
  const params = useParams();
  const artistsId = params.artistsId;
  useEffect(() => {
    const getDetails = async () => {
      const details = await Spotify.getArtist(artistsId);
      let { name } = details;
      let followers = details.followers.total;
      let type = details.type;
      let cover = details.images[1].url;

      setArtist({ name, cover, followers, type });
    };
    const getTopTracks = async () => {
      const details = await Spotify.getArtistsTopTracks(artistsId);
      let { tracks } = details;

      setTracks({ tracks });
    };
    const getAlbums = async () => {
      const details = await Spotify.getArtistsAlbums(artistsId);

      setAlbums(details);
    };
    getDetails();
    getTopTracks();
    getAlbums();
  }, [artistsId]);

  console.log(albums);
  console.log(tracks);
  console.log(artist);

  return (
    <MainContainer>
      <NavButtons />
      <section className={classes.container}>
        <div className={classes.header}>
          <div className={classes["image-container"]}>
            <img src={artist.cover} alt="rep" />
          </div>
          <div className={classes.info}>
            <span>{artist.type}</span>
            <p>{artist.name}</p>
          </div>
        </div>
        <div className={classes.list}>
          <div className={classes["head-icons"]}>
            <CustomIcon className={classes.ply}>
              <PlayCircleFilledIcon
                style={{ width: "62.5px", height: "62.5px" }}
              />
            </CustomIcon>
          </div>

          <div>
            <div className={classes.title}>Popular</div>
            <p className={classes.divider}></p>
            <div className={classes["track-container"]}>
              {tracks.tracks
                ? tracks.tracks.map((item) => (
                    <Song
                      key={item.id}
                      img={item.album.images[2].url}
                      name={item.name}
                      artist={item.artists[0].name}
                      artist_link={item.artists[0].id}
                    />
                  ))
                : null}
            </div>
            <div className={classes.title}>Albums</div>
            <p className={classes.divider}></p>
            <div className={classes["browse-container"]}>
              {albums.items
                ? albums.items.map((item) => {
                    if (item.available_markets.length > 80) {
                      return (
                        <Card
                          id={item.id}
                          description={item.release_date}
                          img={item.images[0].url}
                          title={item.name}
                          key={item.id}
                          type="album"
                        />
                      );
                    }
                  })
                : null}
            </div>
          </div>
        </div>
      </section>
    </MainContainer>
  );
};

export default Artists;
