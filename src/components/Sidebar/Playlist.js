import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Spotify from "../../store/Spotify";
import classes from "./Playlist.module.css";

const PlayList = () => {
  const [playList, setplayList] = useState([]);

  useEffect(() => {
    const getPlaylist = async () => {
      const playList = await Spotify.getPlayList();
      setplayList(playList.items);
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
