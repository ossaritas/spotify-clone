import { useState, useEffect } from "react";
import BodyContainer from "../Layout/BodyContainer";
import NavButtons from "../Header/NavButtons";
import Song from "./Content/Song";

import Spotify from "../../Spotify/Spotify";
import { useParams } from "react-router-dom";
import ElementContainer from "../Layout/ElementContainer";
import TitleContainer from "../Layout/TitleContainer";

type TrackType = {
  items: {
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
  }[];
};

const Playlist = () => {
  const { trackId } = useParams() as { trackId: string };
  const [tracks, setTracks] = useState<TrackType>();
  const [img, setImg] = useState<string>();
  const [details, setDetails] = useState<{
    name: string;
    description: string;
  }>();

  useEffect(() => {
    const getDetails = async () => {
      const details = await Spotify.getPlaylistDetails(trackId);
      setDetails(details);
      let img = details.images[0].url;
      setImg(img);
      let tracks = details.tracks;
      setTracks(tracks);
    };
    getDetails();
  }, [trackId]);
  return (
    <BodyContainer img={img}>
      <NavButtons />
      <TitleContainer
        img={img ? img : "null"}
        type="Playlist"
        name={details ? details.name : "null"}
        description={details ? details.description : "null"}
      />
      <ElementContainer card={false}>
        {tracks
          ? tracks.items.map((item) => (
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
      </ElementContainer>
    </BodyContainer>
  );
};

export default Playlist;
