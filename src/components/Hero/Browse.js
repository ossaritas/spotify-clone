import { useEffect, useState } from "react";
import Spotify from "../../store/Spotify";
import { Link } from "react-router-dom";

import MainContainer from "./MainContainer";
import NavBar from "./NavBar";
import classes from "./Browse.module.css";
import Card from "../UI/Card";

const Browse = () => {
  const [playList, setplayList] = useState([]);

  useEffect(() => {
    const getPlaylist = async () => {
      const playList = await Spotify.getPlayList();
      setplayList(playList.items);
    };
    getPlaylist();
  }, []);

  return (
    <MainContainer>
      <NavBar />
      <div className={classes.browse}>
        <div className={classes["browse-container"]}>
          {playList
            ? playList.map((item) => (
                <Card
                  id={item.id}
                  img={item.images[0].url}
                  description={item.owner.display_name}
                  title={item.name}
                  key={item.id}
                />
              ))
            : null}
        </div>
      </div>
    </MainContainer>
  );
};

export default Browse;
