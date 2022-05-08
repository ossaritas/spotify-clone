import { useState, useEffect, useRef, ChangeEvent } from "react";
import MainContainer from "./MainContainer";
import classes from "./Search.module.css";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import CustomIcon from "../UI/CustomIcon";
import Spotify from "../../Spotify/Spotify";
import Card from "../UI/Card";
import Song from "../Song";

import artistImg from "../../assests/undefined-artist.png";

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
  const [searchText, setSearchText] = useState("");
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

  console.log(searchText);
  console.log(artists);
  console.log(tracks);
  return (
    <MainContainer>
      <form className={classes.search}>
        <label id="search">
          <CustomIcon className={classes.icon}>
            <SearchOutlinedIcon style={{ width: "30px", height: "30px" }} />
          </CustomIcon>
          <input
            type="text"
            ref={inputRef}
            value={searchText}
            onChange={searchHandler}
            placeholder="Search for artists and songs"
          />
        </label>
      </form>
      <div className={classes.browse}>
        <div className={classes["browse-container"]}>
          {artists
            ? artists.items
                ?.slice(0, 12)
                .map((item) => (
                  <Card
                    className={classes.artists}
                    id={item.id}
                    img={item.images[1]?.url || artistImg}
                    type="artists"
                    title={item.name}
                    key={item.id}
                  />
                ))
            : null}
        </div>
      </div>
      <div className={classes.list}>
        {tracks ? (
          <ul className={classes.title}>
            <li>#</li>
            <li>Title</li>
            <li>Artist</li>
            <li>Album</li>
          </ul>
        ) : null}
        <p className={classes.divider}></p>
        {tracks ? (
          tracks.items
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
        ) : (
          <h3
            style={{
              color: "darkgrey",
              padding: "200px",
              fontSize: "30px",
              fontStyle: "italic",
            }}
          >
            Search for artists and songs
          </h3>
        )}
      </div>
    </MainContainer>
  );
};

export default Search;
