import { useState, useEffect } from "react";
import MainContainer from "./MainContainer";
import classes from "./Search.module.css";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import CustomIcon from "../UI/CustomIcon";
import Spotify from "../../Spotify/Spotify";
import Card from "../UI/Card";
import Song from "../Song";

const Search = () => {
  const [artists, setArtists] = useState([]);
  const [tracks, setTracks] = useState([]);
  const [img, setImg] = useState("");

  useEffect(() => {
    const getSearchItems = async () => {
      const details = await Spotify.getSearch("Eminem");
      const artists = details.artists;
      const img = artists.items.images;
      const tracks = details.tracks;
      setArtists(artists);
      setTracks(tracks);
      setImg(img);
    };
    getSearchItems();
  }, []);

  console.log(artists);
  console.log(tracks);
  return (
    <MainContainer>
      <form className={classes["search-nav"]}>
        <label id="search">
          <CustomIcon>
            <SearchOutlinedIcon />
          </CustomIcon>
          <input type="text" placeholder="Search" />
        </label>
      </form>
      <div className={classes.browse}>
        <div className={classes["browse-container"]}>
          {artists.items
            ? artists.items.map((item) => (
                <Card
                  id={item.id}
                  img={img}
                  type={item.type}
                  title={item.name}
                  key={item.id}
                />
              ))
            : null}
        </div>
      </div>
      <div className={classes.list}>
        <div>
          <ul className={classes.title}>
            <li>#</li>
            <li>Title</li>
            <li>Artist</li>
            <li>Album</li>
          </ul>
          <p className={classes.divider}></p>
          {tracks.items
            ? tracks.items.map((item) => (
                <Song
                  key={item.id}
                  img={item.album.images[2].url}
                  name={item.name}
                  artist={item.artists[0].name}
                  artist_link={item.artists[0].id}
                  album={item.album.name}
                  album_link={item.album.id}
                />
              ))
            : null}
        </div>
      </div>
    </MainContainer>
  );
};

export default Search;
