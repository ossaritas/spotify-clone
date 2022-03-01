import { useEffect, useState } from "react";
import Spotify from "../../store/Spotify";

import MainContainer from "./MainContainer";
import NavBar from "./NavBar";
import classes from "./Browse.module.css";
import Card from "../UI/Card";
import { Routes, Route } from "react-router-dom";

const Browse = () => {
  const [playList, setPlayList] = useState([]);
  const [newRelease, setNewRelease] = useState([]);
  const [likedSongs, setLikedSongs] = useState([]);

  useEffect(() => {
    const getFeaturedPlaylists = async () => {
      const playList = await Spotify.getFeaturedPlaylists();
      let items = playList.playlists.items;
      let message = playList.message;
      setPlayList({ items, message });
    };
    getFeaturedPlaylists();
  }, []);
  useEffect(() => {
    const getFeaturedAlbums = async () => {
      const details = await Spotify.getNewReleases();
      let items = details.albums;
      setNewRelease(items);
    };
    getFeaturedAlbums();
  }, []);
  useEffect(() => {
    const getLikedSongs = async () => {
      const details = await Spotify.getLikedSongs();
      let items = details.albums;
      setLikedSongs(details);
    };
    getLikedSongs();
  }, []);

  console.log(likedSongs);

  return (
    <MainContainer>
      <NavBar />

      <Routes>
        <Route
          path="/playlist"
          element={
            <div className={classes.browse}>
              <span>{playList.message}</span>
              <div className={classes["browse-container"]}>
                {playList.items
                  ? playList.items.map((item) => (
                      <Card
                        id={item.id}
                        img={item.images[0].url}
                        description={item.owner.display_name}
                        title={item.name}
                        key={item.id}
                        type="playlists"
                      />
                    ))
                  : null}
              </div>
            </div>
          }
        />
        <Route
          path="/albums"
          element={
            <div className={classes.browse}>
              <span>{playList.message}</span>
              <div className={classes["browse-container"]}>
                {newRelease.items
                  ? newRelease.items.map((item) => {
                      if (item.available_markets.length > 80) {
                        return (
                          <Card
                            id={item.id}
                            description={item.release_date}
                            img={item.images[0].url}
                            title={item.name}
                            key={item.id}
                            type="album"
                          />
                        );
                      }
                    })
                  : null}
              </div>
            </div>
          }
        />

        <Route
          path="*"
          element={
            <h3 style={{ padding: "200px", fontSize: "50px" }}>
              WELCOME TO SPOTIFY CLONE FEEL FREE TO MOVE AROUND
            </h3>
          }
        />
      </Routes>
    </MainContainer>
  );
};

export default Browse;
