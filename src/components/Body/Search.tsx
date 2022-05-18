import { useState, useEffect, useRef, ChangeEvent } from "react";
import BodyContainer from "../Layout/BodyContainer";
import Spotify from "../../Spotify/Spotify";
import Card from "./Content/Card";
import Song from "./Content/Song";

import artistImg from "../../assests/undefined-artist.png";
import SearchBar from "../Header/SearchBar";
import ElementContainer from "../Layout/ElementContainer";

type searchedArtists = {
  items: {
    id: string;
    images: { height: number; url: string; width: number }[];
    type: string;
    name: string;
  }[];
};

type searchedTracks = {
  items: {
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

const Search = () => {
  const [searchText, setSearchText] = useState<string>("");
  const [artists, setArtists] = useState<searchedArtists>();
  const [tracks, setTracks] = useState<searchedTracks>();

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchText.length > 0) {
        if (inputRef && inputRef.current) {
          if (searchText === inputRef.current.value) {
            const getSearchItems = async () => {
              const details = await Spotify.getSearch(searchText);
              const artists = details.artists;
              const tracks = details.tracks;
              setArtists(artists);
              setTracks(tracks);
            };
            getSearchItems();
          }
        }
      } else {
        setTracks([] as any);
        setArtists([] as any);
      }
    }, 300);
    return () => {
      clearTimeout(timer);
    };
  }, [searchText, inputRef]);

  const searchHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
  };

  return (
    <BodyContainer>
      <SearchBar
        inputRef={inputRef}
        searchText={searchText}
        searchHandler={searchHandler}
      />
      <ElementContainer card={true}>
        {artists
          ? artists.items
              ?.slice(0, 12)
              .map((item) => (
                <Card
                  id={item.id}
                  img={item.images[1]?.url || artistImg}
                  type="artists"
                  title={item.name}
                  key={item.id}
                />
              ))
          : null}
      </ElementContainer>
      <ElementContainer card={false}>
        {tracks
          ? tracks.items
              ?.slice(0, 15)
              .map((item) => (
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
    </BodyContainer>
  );
};

export default Search;
