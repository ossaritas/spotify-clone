import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { Image } from "../../Spotify/interfaces";

import Spotify from "../../Spotify/Spotify";
import BodyContainer from "../Layout/BodyContainer";
import NavBar from "../Header/NavBar";
import Card from "./Content/Card";
import { Text } from "@chakra-ui/react";
import BrowseElement from "../Layout/ElementContainer";

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
    <BodyContainer>
      <NavBar />
      <Routes>
        <Route
          path="/playlist"
          element={
            <BrowseElement
              card={true}
              text={playList ? playList.message : "Default description"}
            >
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
            </BrowseElement>
          }
        />
        <Route
          path="/albums"
          element={
            <BrowseElement
              card={true}
              text={playList ? playList.message : "Default description"}
            >
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
            </BrowseElement>
          }
        />

        <Route
          path="*"
          element={
            <Text
              p="52"
              fontSize="3xl"
              fontStyle="italic"
              color="spotify.text-gray"
            >
              WELCOME TO SPOTIFY CLONE, by O.Serdar Sarıtaş
            </Text>
          }
        />
      </Routes>
    </BodyContainer>
  );
};

export default Browse;
