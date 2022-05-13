import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { PlaylistItems } from "../../Spotify/interfaces";

import Spotify from "../../Spotify/Spotify";

const Favourites = () => {
  const [playList, setplayList] = useState<PlaylistItems[]>([]);

  useEffect(() => {
    const getPlaylist = async () => {
      const playList = await Spotify.getPlayList();
      const items = playList.items;
      setplayList(items);
    };
    getPlaylist();
  }, []);

  return (
    <div className="pl-[10px] leading-[20px] overflow-y-scroll ">
      <ul className="pb-[20px] list-none">
        {playList
          ? playList.map((item) => (
              <li
                className="w-[200px] h-[32px] p-[2px] whitespace-nowrap overflow-hidden text-ellipsis"
                key={item.id}
              >
                <Link
                  className="text-[#B8B8B8] hover:text-white active:text-white focus:text-white"
                  to={`/playlists/${item.id}`}
                >
                  {item.name}
                </Link>
              </li>
            ))
          : null}
      </ul>
    </div>
  );
};

export default Favourites;
