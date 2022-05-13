import { useState, useEffect } from "react";
import PlayCircleFilledIcon from "@mui/icons-material/PlayCircleFilled";
import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";
import BodyContainer from "../Layout/BodyContainer";
import NavButtons from "../Header/NavButtons";
import Song from "./Content/Song";

import Spotify from "../../Spotify/Spotify";

type Tracks = {
  track: {
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
  };
};
const LikedSongs = () => {
  const [tracks, setTracks] = useState<Tracks[]>([]);

  useEffect(() => {
    const getDetails = async () => {
      const details = await Spotify.getLikedSongs();
      let tracks = details.items;
      setTracks(tracks);
    };
    getDetails();
  }, []);
  return (
    <BodyContainer>
      <NavButtons />
      <section className="p-[20px] mt-[70px] space-y-[10px] ">
        <div className="flex">
          <div className="w-[232px] h-[232px] ">
            <img
              className="w-full h-full object-contain "
              src="https://t.scdn.co/images/3099b3803ad9496896c43f22fe9be8c4.png"
              alt="rep"
            />
          </div>
          <div className="flex flex-col justify-center space-y-[10px] ml-[20px]  ">
            <span className="text-[20px] uppercase ">Liked Songs</span>
          </div>
        </div>
        <div>
          <div className="flex ml-[10px] ">
            <button className="w-[75px] h-[75px] hover:scale-105 ">
              <PlayCircleFilledIcon
                style={{ color: "#1db954", width: "62.5px", height: "62.5px" }}
              />
            </button>
            <button className="w-[75px] h-[75px] hover:scale-105">
              <FavoriteBorderRoundedIcon
                style={{ width: "45px", height: "45px" }}
              />
            </button>
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
              ? tracks.map((item) => (
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
    </BodyContainer>
  );
};

export default LikedSongs;