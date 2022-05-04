import { useEffect, useState } from "react";
import Spotify from "../../Spotify/Spotify";

import MainContainer from "./MainContainer";
import NavBar from "./NavBar";
import classes from "./Browse.module.css";
import Card from "../UI/Card";
import { Routes, Route } from "react-router-dom";
import { Image } from "../../Spotify/interfaces";

type BrowsePlaylist = {
  message: string;
  items: {
    description: string;
    id: string;
    images: Image[];
    name: string;
    owner: { display_name: string };
  }[];
};

type BrowseFeaturedAlbums = {
  available_markets: string[];
  id: string;
  images: Image[];
  name: string;
  release_date: string;
};

const Browse = () => {
  const [playList, setPlayList] = useState<BrowsePlaylist>();
  const [newRelease, setNewRelease] = useState<BrowseFeaturedAlbums[]>([]);
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
      let items = details.albums.items;
      setNewRelease(items);
    };
    getFeaturedAlbums();
  }, []);

  return (
    <MainContainer>
      <NavBar />
      <Routes>
        <Route
          path="/playlist"
          element={
            <div className={classes.browse}>
              <span>{playList ? playList.message : null}</span>
              <div className={classes["browse-container"]}>
                {playList
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
              <span>{playList ? playList.message : null}</span>
              <div className={classes["browse-container"]}>
                {newRelease
                  ? newRelease
                      .filter((item) => item.available_markets.length > 80)
                      .map((item) => {
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
                      })
                  : null}
              </div>
            </div>
          }
        />

        <Route
          path="*"
          element={
            <h3
              style={{
                color: "darkgrey",
                padding: "200px",
                fontSize: "30px",
                fontStyle: "italic",
              }}
            >
              WELCOME TO SPOTIFY CLONE, by O.Serdar Saritas.
            </h3>
          }
        />
      </Routes>
    </MainContainer>
  );
};

export default Browse;