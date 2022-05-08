import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { PlaylistItems } from "../../Spotify/interfaces";

import Spotify from "../../Spotify/Spotify";
import classes from "./Playlist.module.css";

const PlayList = () => {
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
    <div className={classes["playlist-container"]}>
      <ul className={classes.playlist}>
        {playList
          ? playList.map((item) => (
              <li key={item.id}>
                <Link to={`/playlists/${item.id}`}>{item.name}</Link>
              </li>
            ))
          : null}
      </ul>
    </div>
  );
};

export default PlayList;
