import { useState, useEffect, useRef, ChangeEvent } from "react";
import BodyContainer from "../Layout/BodyContainer";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import Spotify from "../../Spotify/Spotify";
import Card from "./Content/Card";
import Song from "./Content/Song";

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

  console.log(searchText);
  console.log(artists);
  console.log(tracks);
  return (
    <BodyContainer>
      <form className="w-full h-[70px] flex items-center bg-gradient-to-r from-[#000000] to-[#200000]">
        <label id="search" className="flex items-center">
          <button className="w-[75px] h-[75px] hover:scale-105 ">
            <SearchOutlinedIcon style={{ width: "25px", height: "25px" }} />
          </button>
          <input
            className="w-[200px] rounded whitespace-nowrap text-ellipsis pl-[5px] text-black focus:w-[360px] ease-in-out duration-300 outline-none italic"
            type="text"
            ref={inputRef}
            value={searchText}
            onChange={searchHandler}
            placeholder="Search for artists and songs"
          />
        </label>
      </form>
      <div className="w-full h-auto grid text-white">
        <div className="p-[15px] grid gap-[16px] grid-cols-fill-c grid-rows[auto]">
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
        </div>
      </div>
      <div className="p-[15px]">
        {tracks ? (
          <ul className="text-[16px] w-full grid gap-[10px] grid-cols-[0.1fr_1fr_1fr_0.9fr] items-center p-[10px] mx-[5px] my-[10px] h-auto ">
            <li>#</li>
            <li>Title</li>
            <li>Artist</li>
            <li>Album</li>
          </ul>
        ) : null}
        <p className="h-[1px] w-auto mx-[10px] my-[5px] bg-gray-500"></p>
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
    </BodyContainer>
  );
};

export default Search;
