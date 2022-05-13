import { useState, useEffect } from "react";

import Spotify from "../../Spotify/Spotify";
import Song from "./Content/Song";
import Card from "./Content/Card";
import NavButtons from "../Header/NavButtons";
import BodyContainer from "../Layout/BodyContainer";
import PlayCircleFilledIcon from "@mui/icons-material/PlayCircleFilled";

import { useParams } from "react-router-dom";
import { Image } from "../../Spotify/interfaces";

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
    <BodyContainer>
      <NavButtons />
      <section className="p-[20px] mt-[70px] space-y-[10px] ">
        <div className="flex">
          <div className="w-[232px] h-[232px] ">
            <img
              className="w-full h-full object-contain "
              src={artist ? artist.cover : undefined}
              alt="rep"
            />
          </div>
          <div className="flex flex-col justify-center space-y-[10px] ml-[20px] ">
            <span className="text-[20px] uppercase ">Artist</span>
            <p className="text-[88px] tracking-tighter font-extrabold leading-[72px]  ">
              {artist ? artist.name : null}
            </p>
          </div>
        </div>
        <div>
          <div className="flex ml-[10px] items-center ">
            <button className="w-[75px] h-[75px] hover:scale-105 ">
              <PlayCircleFilledIcon
                style={{ color: "#1db954", width: "62.5px", height: "62.5px" }}
              />
            </button>
            <div className="text-[24px] m-0 font-bold text-center ">
              Popular Songs
            </div>
          </div>

          <div className="p-[15px]">
            <ul className="text-[16px] w-full grid gap-[10px] grid-cols-[0.1fr_1fr_1fr_0.9fr] items-center p-[10px] mx-[5px] my-[10px] h-auto ">
              <li>#</li>
              <li>Title</li>
              <li>Artist</li>
              <li>Album</li>
            </ul>
            <p className="h-[0.5px] w-auto p-[0.5px] mx-[10px] my-[5px] bg-gray-500"></p>
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

            <div className="text-[24px] m-0 py-[10px] font-bold text-center ">
              Albums
            </div>
            <p className="h-[0.5px] w-auto p-[0.5px] mx-[10px] my-[5px] bg-gray-500"></p>
            <div className="p-[15px] grid gap-[16px] grid-cols-fill-c grid-rows[auto]">
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
    </BodyContainer>
  );
};

export default Artists;
