import { useState, useEffect } from "react";
import BodyContainer from "../Layout/BodyContainer";
import NavButtons from "../Header/NavButtons";
import Song from "./Content/Song";

import Spotify from "../../Spotify/Spotify";
import BrowseElement from "../Layout/ElementContainer";
import TitleContainer from "../Layout/TitleContainer";

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
  const img = "https://t.scdn.co/images/3099b3803ad9496896c43f22fe9be8c4.png";

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
      <TitleContainer img={img} type="Liked Songs" />
      <BrowseElement card={false}>
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
      </BrowseElement>
    </BodyContainer>
  );
};

export default LikedSongs;
