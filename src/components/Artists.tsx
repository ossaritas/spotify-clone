import { useState, useEffect } from "react";

import Spotify from "../Spotify/Spotify";
import Song from "./Song";
import Card from "./UI/Card";
import NavButtons from "./Hero/NavButtons";
import CustomIcon from "./UI/CustomIcon";
import MainContainer from "./Hero/MainContainer";
import PlayCircleFilledIcon from "@mui/icons-material/PlayCircleFilled";

import classes from "./Artists.module.css";
import { useParams } from "react-router-dom";
import { Image } from "../Spotify/interfaces";

type Artist = {
  name: string;
  cover: string;
  type: string;
};

type ArtistTracks = {
  tracks: {
    album: {
      id: string;
      images: { height: number; url: string; width: number }[];
      name: string;
    };
    artists: {
      id: string;
      name: string;
    }[];

    id: string;

    name: string;
  }[];
};

type ArtistAlbums = {
  items: {
    available_markets: string;
    id: string;
    images: Image[];
    name: string;
    release_date: string;
    type: string;
  }[];
};

const Artists = () => {
  const params = useParams() as { artistsId: string };
  const [albums, setAlbums] = useState<ArtistAlbums>();
  const [tracks, setTracks] = useState<ArtistTracks>();
  const [artist, setArtist] = useState<Artist>();

  useEffect(() => {
    const getDetails = async () => {
      const details = await Spotify.getArtist(params.artistsId);
      let { name } = details;
      let type = details.type;
      let cover = details.images[1].url;

      setArtist({ name, cover, type });
    };
    const getTopTracks = async () => {
      const details = await Spotify.getArtistsTopTracks(params.artistsId);
      let { tracks } = details;

      setTracks({ tracks });
    };
    const getAlbums = async () => {
      const details = await Spotify.getArtistsAlbums(params.artistsId);
      let items = details.items;

      setAlbums({ items });
    };
    getDetails();
    getTopTracks();
    getAlbums();
  }, [params.artistsId]);

  return (
    <MainContainer>
      <NavButtons />
      <section className={classes.container}>
        <div className={classes.header}>
          <div className={classes["image-container"]}>
            <img src={artist ? artist.cover : undefined} alt="rep" />
          </div>
          <div className={classes.info}>
            <span>{artist ? artist.type : null}</span>
            <p>{artist ? artist.name : null}</p>
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
              {tracks
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
              {albums
                ? albums.items
                    .filter((item) => item.available_markets.length > 80)
                    .map((item) => {
                      return (
                        <Card
                          id={item.id}
                          description={item.release_date}
                          img={item.images[0].url}
                          title={item.name}
                          key={item.id}
                          type={item.type}
                        />
                      );
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
