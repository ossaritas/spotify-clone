import { useState, useEffect } from "react";

import Spotify from "../../Spotify/Spotify";
import Song from "./Content/Song";
import Card from "./Content/Card";
import NavButtons from "../Header/NavButtons";
import BodyContainer from "../Layout/BodyContainer";

import { useParams } from "react-router-dom";
import { Image } from "../../Spotify/interfaces";
import TitleContainer from "../Layout/TitleContainer";
import ElementContainer from "../Layout/ElementContainer";

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
  console.log(albums);
  console.log(artist);
  console.log(tracks);
  return (
    <BodyContainer img={artist ? artist.cover : "null"}>
      <NavButtons />
      <TitleContainer
        img={artist ? artist.cover : "null"}
        name={artist ? artist.name : "null"}
        type="Artist"
      />
      <ElementContainer card={false}>
        {tracks
          ? tracks.tracks.map((item) => (
              <Song
                key={item.id}
                img={item.album.images[2].url}
                name={item.name}
                artist={item.artists[0].name}
                artist_link={item.artists[0].id}
                album={item.album.name}
                album_link={item.album.id}
              />
            ))
          : null}
      </ElementContainer>
      <ElementContainer card={true}>
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
      </ElementContainer>
    </BodyContainer>
  );
};

export default Artists;
