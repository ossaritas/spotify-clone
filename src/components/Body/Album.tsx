import { useState, useEffect } from "react";

import Spotify from "../../Spotify/Spotify";
import Song from "./Content/Song";
import NavButtons from "../Header/NavButtons";
import BodyContainer from "../Layout/BodyContainer";
import PlayCircleFilledIcon from "@mui/icons-material/PlayCircleFilled";
import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";

import { useParams } from "react-router-dom";
import { AlbumType } from "../../Spotify/interfaces";

const Album = () => {
  const [albums, setAlbums] = useState<AlbumType>();
  const { albumId } = useParams() as { albumId: string };
  console.log(albums);
  useEffect(() => {
    const getDetails = async () => {
      const details = await Spotify.getAlbums(albumId);
      let { name, label, release_date, total_tracks } = details;
      let cover = details.images[1].url;
      let items = details.tracks.items;
      setAlbums({
        name,
        cover,
        items,
        label,
        release_date,
        total_tracks,
      });
    };
    getDetails();
  }, [albumId]);

  return (
    <BodyContainer>
      <NavButtons />
      <section className="p-[20px] mt-[70px] space-y-[10px] ">
        <div className="flex">
          <div className="w-[232px] h-[232px] ">
            <img
              className="w-full h-full object-contain "
              src={albums ? albums.cover : undefined}
              alt="rep"
            />
          </div>
          <div className="flex flex-col justify-center space-y-[5px] ml-[20px] ">
            <p className="text-[20px] uppercase "> Album</p>
            <p className="text-[62px] tracking-tighter font-extrabold leading-[72px]">
              {" "}
              {albums ? albums.name : null}
            </p>
            <span className="text-[#b3b3b3] pt-[5px] ">
              Label: {albums ? albums.label : null}
            </span>
            <span className="text-[#b3b3b3] pt-[5px] ">
              Release Date: {albums ? albums.release_date : null}
            </span>
            <span className="text-[#b3b3b3] pt-[5px] ">
              Total Tracks: {albums ? albums.total_tracks : null}
            </span>
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

          <div>
            <ul className="text-[16px] w-full grid gap-[10px] grid-cols-[0.1fr_1fr_1fr_0.9fr] items-center p-[10px] mx-[5px] my-[10px] h-auto ">
              <li> #</li>
              <li>Title</li>
              <li>Artist</li>
            </ul>
            <p className="h-[0.5px] w-auto p-[0.5px] mx-[10px] my-[5px] bg-gray-500"></p>
            {albums
              ? albums.items.map((item) => (
                  <Song
                    className="text-[16px] w-full grid gap-[10px] grid-cols-[0.1fr_1fr_1fr_0.9fr] items-center p-[10px] mx-[5px] my-[10px] h-auto "
                    key={item.id}
                    name={item.name}
                    artist={item.artists[0].name}
                    artist_link={item.artists[0].id}
                    img={albums.cover}
                  />
                ))
              : null}
          </div>
        </div>
      </section>
    </BodyContainer>
  );
};

export default Album;
