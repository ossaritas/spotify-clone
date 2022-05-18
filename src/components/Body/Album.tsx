import { useState, useEffect } from "react";
import Spotify from "../../Spotify/Spotify";
import Song from "./Content/Song";
import NavButtons from "../Header/NavButtons";
import BodyContainer from "../Layout/BodyContainer";
import { useParams } from "react-router-dom";
import { AlbumType } from "../../Spotify/interfaces";
import ElementContainer from "../Layout/ElementContainer";
import TitleContainer from "../Layout/TitleContainer";

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
    <BodyContainer img={albums ? albums.cover : undefined}>
      <NavButtons />
      <TitleContainer
        img={albums ? albums.cover : "null"}
        type="Album"
        name={albums ? albums.name : "null"}
        label={albums ? albums.label : "null"}
        releaseDate={albums ? albums.release_date : "null"}
        totalTracks={albums ? albums.total_tracks : 1234}
      />

      <ElementContainer card={false}>
        {albums
          ? albums.items.map((item) => (
              <Song
                key={item.id}
                name={item.name}
                artist={item.artists[0].name}
                artist_link={item.artists[0].id}
                img={albums.cover}
              />
            ))
          : null}
      </ElementContainer>
    </BodyContainer>
  );
};

export default Album;
